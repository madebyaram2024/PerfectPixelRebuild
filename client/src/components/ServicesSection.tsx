
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
      buttonClass: "bg-teal-400 hover:bg-teal-500 text-white font-bold text-lg py-4",
      bgClass: "bg-gray-800",
      borderClass: "border-gray-600",
      textColor: "text-white"
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
      buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-4",
      bgClass: "bg-teal-500",
      borderClass: "border-teal-400",
      textColor: "text-white"
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
      buttonClass: "bg-teal-400 hover:bg-teal-500 text-white font-bold text-lg py-4",
      bgClass: "bg-gray-800",
      borderClass: "border-gray-600",
      textColor: "text-white"
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
              className={`rounded-2xl p-8 relative border-2 transition-all duration-300 hover:scale-105 ${service.bgClass} ${service.borderClass}`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-teal-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-4 ${service.textColor}`}>
                  {service.title}
                </h3>
                <div className="text-4xl font-bold mb-6" style={{ color: service.popular ? '#FDE047' : '#FDE047' }}>
                  {service.price}
                  {service.period && (
                    <span className="text-xl font-normal text-gray-300">
                      {service.period}
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`mr-3 mt-1 h-5 w-5 flex-shrink-0 ${
                      service.popular ? 'text-white' : 'text-yellow-500'
                    }`} />
                    <span className={`text-base leading-relaxed ${service.textColor}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full text-lg font-bold h-auto transition-all duration-300 ${service.buttonClass}`}
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
