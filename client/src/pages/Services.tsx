import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Website Redesign",
      price: "$149.99",
      description: "Transform your existing website with modern design and functionality",
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
      popular: false
    },
    {
      title: "New Website Build",
      price: "$199.99",
      description: "Complete custom website built from scratch for your brand",
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
      popular: true
    },
    {
      title: "Secure Hosting",
      price: "$24.99",
      period: "/mo",
      description: "Professional hosting with enterprise-level security and support",
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
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional web development services designed to help your business succeed online.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <div className="text-4xl font-black text-primary mb-4">
                    {service.price}
                    {service.period && (
                      <span className="text-lg font-normal text-muted-foreground">
                        {service.period}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
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
                  className={`w-full py-4 text-lg font-bold h-auto ${
                    service.popular 
                      ? 'btn-primary' 
                      : 'bg-muted-foreground text-foreground hover:bg-muted-foreground/80'
                  }`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Add-On Services */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Optional <span className="text-primary">Add-On Services</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your website with these powerful add-ons. Each service includes professional setup, training, and support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* E-Commerce Setup */}
            <div className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold">E-Commerce Setup</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Transform your website into a powerful online store with our e-commerce integration.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">$149</div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Add 3 products at no extra cost</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Intuitive dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Setup setup & integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Database setup & integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">1-on-1 training + 30-day support</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>

            {/* Blog Section Setup */}
            <div className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">📝</span>
                </div>
                <h3 className="text-xl font-bold">Blog Section Setup</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Boost your SEO rankings and engage your audience with a professional blog section.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">$149</div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Add 3 blog posts</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Intuitive dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Database setup & integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">1-on-1 training + 30-day support</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>

            {/* Custom Menu Management */}
            <div className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold">Custom Menu Management</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Perfect for restaurants and food businesses with dynamic menu updates.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">$99</div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Add 3 menus/categories at no extra cost</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Intuitive dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Database setup & integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">1-on-1 training + 30-day support</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>

            {/* Image Gallery Setup */}
            <div className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">📸</span>
                </div>
                <h3 className="text-xl font-bold">Image Gallery Setup</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Showcase your work with a professional image gallery.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">$99</div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Add 3 images at no extra cost</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Intuitive dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Database setup & integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">1-on-1 training + 30-day support</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>

            {/* Social Media Setup */}
            <div className="service-card rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">📱</span>
                </div>
                <h3 className="text-xl font-bold">Social Media Setup</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Connect and grow your social media presence.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">
                $99<span className="text-lg font-normal text-muted-foreground">/platform</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Professional account setup</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">3 sample posts per platform</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Platform integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">1-on-1 training + 30-day support</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>

            {/* Complete Add-On Bundle */}
            <div className="service-card rounded-2xl p-6 border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-2">
                  Best Value
                </Badge>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-primary text-xl">💎</span>
                </div>
                <h3 className="text-xl font-bold">Complete Add-On Bundle</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Get all add-ons at a discounted price and save $100.
              </p>
              
              <div className="text-3xl font-black text-primary mb-6">$499</div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">All the add-ons included</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Extended 60-day support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-primary mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Save $100 vs individual pricing</span>
                </li>
              </ul>
              
              <Button className="w-full btn-primary">Add to Package</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
