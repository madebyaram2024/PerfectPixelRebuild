import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Shield, Clock, Users } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=1080')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social Media Icons */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-6">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              <SiFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              <SiInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              <SiX className="h-6 w-6" />
            </a>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              About <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our mission is simple: to deliver such a great experience that choosing us again is an easy decision.
            </p>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Special <span className="text-primary">Offer</span>
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                As a new company dedicated to revolutionizing web development through AI innovation, we're offering our services at unbeatable rates. This introductory pricing allows us to build a strong foundation while providing exceptional value to every client.
              </p>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Take advantage of our introductory pricing for a brand new offering full-featured, custom-built websites at a fraction of the market rate. This limited-time pricing allows us to build our portfolio goals, but rates are set to double soon as we establish ourselves in the market.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Don't miss this opportunity to get a professional, AI-powered website at our introductory rate. Contact us today to lock in these special rates and be part of our growing success story.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-muted/50 rounded-2xl p-8 text-center">
                <div className="bg-primary/20 rounded-lg p-8 mb-6">
                  <div className="text-primary text-6xl font-bold mb-2">AI</div>
                  <div className="text-lg font-semibold">Perfect Pixel AI</div>
                  <div className="text-sm text-muted-foreground mt-2">AI Powered Website</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-background rounded-lg p-3">
                    <div className="flex items-center">
                      <Check className="text-primary mr-2 h-4 w-4" />
                      <span className="text-sm">AI Perfect Website</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-background rounded-2xl p-8">
              <Check className="text-primary mx-auto mb-4 h-12 w-12" />
              <div className="text-3xl font-bold text-primary mb-2">$199</div>
              <div className="text-sm text-muted-foreground">5 Page Custom Website</div>
            </div>
            
            <div className="text-center bg-background rounded-2xl p-8">
              <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
              <div className="text-3xl font-bold text-primary mb-2">$149</div>
              <div className="text-sm text-muted-foreground">Re-Design Old Website</div>
            </div>
            
            <div className="text-center bg-background rounded-2xl p-8">
              <Users className="text-primary mx-auto mb-4 h-12 w-12" />
              <div className="text-3xl font-bold text-primary mb-2">$24</div>
              <div className="text-sm text-muted-foreground">Fully Loaded Premium Hosting</div>
            </div>
            
            <div className="text-center bg-background rounded-2xl p-8">
              <Clock className="text-primary mx-auto mb-4 h-12 w-12" />
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide our work and relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously explore new technologies and techniques to deliver cutting-edge solutions.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We are committed to excellence in every aspect of our work, from code to design to client interactions.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in clear communication and keeping our clients informed throughout the entire process.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-muted-foreground">
                We work closely with our clients to ensure their vision is realized and their goals are achieved.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Adaptability</h3>
              <p className="text-muted-foreground">
                We embrace change and quickly adapt to new challenges and opportunities in the digital landscape.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Client Success</h3>
              <p className="text-muted-foreground">
                We measure our success by the success of our clients and the value we add to their businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Online Presence?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's collaborate to create a website that truly represents your brand and drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 font-bold"
              >
                Buy Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-bold"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
