
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
      buttonClass: "bg-yellow-500 text-black hover:bg-yellow-600 font-bold border-2 border-gray-300"
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
      buttonClass: "bg-white text-black hover:bg-gray-100 font-bold"
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
      buttonClass: "bg-yellow-500 text-black hover:bg-yellow-600 font-bold border-2 border-gray-300"
    }
  ];

  return (
    <section id="services" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs and budget.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-8 relative border-2 transition-all duration-300 hover:scale-105 ${
                service.popular 
                  ? 'bg-teal-500 border-teal-400 shadow-2xl shadow-teal-500/50' 
                  : 'bg-gray-900 border-gray-700 hover:border-gray-500'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-white text-teal-500 px-6 py-2 text-lg font-bold">
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-3xl font-bold mb-4 ${service.popular ? 'text-white' : 'text-white'}`}>
                  {service.title}
                </h3>
                <div className={`text-5xl font-black mb-2 ${service.popular ? 'text-white' : 'text-primary'}`}>
                  {service.price}
                  {service.period && (
                    <span className="text-xl font-normal text-gray-400">
                      {service.period}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`mr-4 mt-1 h-6 w-6 flex-shrink-0 ${
                      service.popular ? 'text-white' : 'text-primary'
                    }`} />
                    <span className={`text-lg leading-relaxed ${
                      service.popular ? 'text-white' : 'text-gray-300'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-6 text-xl font-bold h-auto transition-all duration-300 ${service.buttonClass}`}
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
