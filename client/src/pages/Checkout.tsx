import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'redesign',
    name: 'Website Redesign',
    price: 14999, // $149.99 in cents
    description: 'Transform your existing website with modern design and improved user experience',
    features: [
      'Complete visual redesign',
      'Mobile-responsive layout',
      'SEO optimization',
      'Performance improvements',
      '30-day support'
    ]
  },
  {
    id: 'new-build',
    name: 'New Website Build',
    price: 19999, // $199.99 in cents
    description: 'Complete custom website built from scratch with cutting-edge technology',
    features: [
      'Custom design & development',
      'Content management system',
      'E-commerce integration',
      'Advanced SEO setup',
      'Analytics integration',
      '60-day support'
    ],
    popular: true
  },
  {
    id: 'hosting',
    name: 'Premium Hosting',
    price: 2499, // $24.99 in cents (monthly)
    description: 'High-performance hosting with 99.9% uptime guarantee',
    features: [
      'Lightning-fast servers',
      'SSL certificate included',
      'Daily backups',
      'Security monitoring',
      '24/7 support'
    ]
  }
];

const CheckoutForm = ({ selectedPackage }: { selectedPackage: ServicePackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! We'll be in touch soon.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Complete Your Purchase</h1>
          <p className="text-slate-300">Secure payment processing powered by Stripe</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                {selectedPackage.name}
                {selectedPackage.popular && <Badge className="bg-yellow-500 text-black">Popular</Badge>}
              </CardTitle>
              <span className="text-2xl font-bold text-yellow-400">
                ${(selectedPackage.price / 100).toFixed(2)}
              </span>
            </div>
            <CardDescription className="text-slate-300">
              {selectedPackage.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">What's included:</h4>
              <ul className="space-y-1">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="text-slate-300 flex items-center gap-2">
                    <span className="text-yellow-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <PaymentElement 
                  options={{
                    layout: "tabs"
                  }}
                />
              </div>
              <Button 
                type="submit" 
                disabled={!stripe || isLoading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 text-lg"
              >
                {isLoading ? "Processing..." : `Pay $${(selectedPackage.price / 100).toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [showPackages, setShowPackages] = useState(true);

  useEffect(() => {
    // Check URL params for package selection
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('package');
    if (packageId) {
      const pkg = SERVICE_PACKAGES.find(p => p.id === packageId);
      if (pkg) {
        setSelectedPackage(pkg);
        setShowPackages(false);
        createPaymentIntent(pkg);
      }
    }
  }, []);

  const createPaymentIntent = async (pkg: ServicePackage) => {
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        amount: pkg.price,
        packageId: pkg.id,
        packageName: pkg.name
      });
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const selectPackage = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setShowPackages(false);
    createPaymentIntent(pkg);
  };

  if (showPackages) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Service</h1>
            <p className="text-slate-300 text-lg">Professional web development services tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_PACKAGES.map((pkg) => (
              <Card key={pkg.id} className={`bg-slate-800/50 border-slate-700 backdrop-blur transition-transform hover:scale-105 ${pkg.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{pkg.name}</CardTitle>
                    {pkg.popular && <Badge className="bg-yellow-500 text-black">Popular</Badge>}
                  </div>
                  <div className="text-3xl font-bold text-yellow-400">
                    ${(pkg.price / 100).toFixed(2)}
                    {pkg.id === 'hosting' && <span className="text-sm text-slate-400">/month</span>}
                  </div>
                  <CardDescription className="text-slate-300">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-slate-300 flex items-center gap-2">
                        <span className="text-yellow-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => selectPackage(pkg)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret || !selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-white text-lg">Setting up your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm selectedPackage={selectedPackage} />
    </Elements>
  );
}