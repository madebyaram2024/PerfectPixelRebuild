import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ServicesSection() {
  const handleBuyNow = (service: string, price: string) => {
    trackEvent('service_buy_click', 'services', service, parseFloat(price.replace('$', '')));
  };

  const services = [
    {
      title: "Website Redesign",
      price: "$149.99",
      features: [
        "Landing page + 4 additional pages as needed",
        "Rebuilt with AI modern and responsive website",
        "Mobile-responsive layout",
        "Enhanced SEO optimization",
        "Fast 7-day delivery",
        "Full ownership of files",
        "2 rounds of revision",
        "Basic contact form"
      ],
      popular: false,
      buttonClass: "bg-muted-foreground text-foreground hover:bg-muted-foreground/80"
    },
    {
      title: "New Website Build",
      price: "$199.99",
      features: [
        "Landing page + 4 additional pages as needed",
        "Custom design built with AI tailored to your brand",
        "Mobile-responsive layout",
        "Enhanced SEO optimization",
        "Fast 7-day delivery",
        "Full ownership of files",
        "2 rounds of revision",
        "Basic contact form"
      ],
      popular: true,
      buttonClass: "btn-primary animate-glow"
    },
    {
      title: "Secure Hosting",
      price: "$24.99",
      period: "/mo",
      features: [
        "Free .com domain name included",
        "Unlimited e-mail accounts and sub-domains",
        "Enterprise level security",
        "Blazing fast servers",
        "99.99% Uptime",
        "Reliable support",
        "24/7 Chat Support",
        "100% US Based"
      ],
      popular: false,
      buttonClass: "bg-accent text-accent-foreground hover:bg-accent/80"
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business needs and budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`service-card rounded-2xl p-8 relative ${
                service.popular ? 'border-primary' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-2">
                    Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <div className="text-4xl font-black text-primary mb-2">
                  {service.price}
                  {service.period && (
                    <span className="text-lg font-normal text-muted-foreground">
                      {service.period}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="text-primary mr-3 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-4 text-lg font-bold h-auto ${service.buttonClass}`}
                onClick={() => handleBuyNow(service.title, service.price)}
              >
                BUY NOW
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
