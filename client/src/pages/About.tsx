import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Shield, Clock, Users, Zap, Star, Award } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-10">
            <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
              <span className="block text-white">About</span>
              <span className="block gradient-text">Perfect Pixel AI</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed font-medium max-w-4xl mx-auto">
              Revolutionizing web development through AI innovation and delivering exceptional results at unbeatable rates.
            </p>
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-primary to-yellow-400 px-8 py-4 rounded-full shadow-2xl">
                <span className="text-black font-bold text-xl">🚀 Building Tomorrow's Web Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">🚀 Revolutionary Approach</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a new company dedicated to revolutionizing web development through AI innovation, we're offering our services at unbeatable rates. This introductory pricing allows us to build a strong foundation while providing exceptional value to every client.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">💎 Limited-Time Opportunity</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Take advantage of our introductory pricing for brand new, full-featured, custom-built websites at a fraction of the market rate. This limited-time pricing allows us to build our portfolio, but rates are set to double soon as we establish ourselves in the market.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-4 text-primary">⚡ Act Now</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Don't miss this opportunity to get a professional, AI-powered website at our introductory rate. Contact us today to lock in these special rates and be part of our growing success story.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-10 rounded-3xl text-center">
                <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl p-10 mb-8">
                  <div className="text-primary text-8xl font-black mb-4">AI</div>
                  <div className="text-2xl font-bold gradient-text">Perfect Pixel AI</div>
                  <div className="text-lg text-muted-foreground mt-4">Next-Gen AI-Powered Websites</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-4">
                    <div className="flex items-center justify-center">
                      <Zap className="text-primary mr-3 h-6 w-6" />
                      <span className="text-lg font-semibold">Lightning Fast Development</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-4">
                    <div className="flex items-center justify-center">
                      <Star className="text-primary mr-3 h-6 w-6" />
                      <span className="text-lg font-semibold">Premium Quality Design</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-4">
                    <div className="flex items-center justify-center">
                      <Award className="text-primary mr-3 h-6 w-6" />
                      <span className="text-lg font-semibold">Unbeatable Value</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Our <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground">Transparent, affordable, and unbeatable value</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card text-center p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-6">
                <Check className="text-primary mx-auto mb-4 h-16 w-16" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">$199</div>
              <div className="text-lg font-semibold mb-2">Custom Website</div>
              <div className="text-sm text-muted-foreground">5 Page Professional Site</div>
            </div>
            
            <div className="glass-card text-center p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-6">
                <Shield className="text-primary mx-auto mb-4 h-16 w-16" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">$149</div>
              <div className="text-lg font-semibold mb-2">Website Redesign</div>
              <div className="text-sm text-muted-foreground">Complete Makeover</div>
            </div>
            
            <div className="glass-card text-center p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-6">
                <Users className="text-primary mx-auto mb-4 h-16 w-16" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">$24</div>
              <div className="text-lg font-semibold mb-2">Premium Hosting</div>
              <div className="text-sm text-muted-foreground">Fully Loaded Monthly</div>
            </div>
            
            <div className="glass-card text-center p-8 rounded-3xl hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-6">
                <Clock className="text-primary mx-auto mb-4 h-16 w-16" />
              </div>
              <div className="text-4xl font-black gradient-text mb-3">24/7</div>
              <div className="text-lg font-semibold mb-2">Support</div>
              <div className="text-sm text-muted-foreground">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tight">
              Our <span className="gradient-text">Values</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-yellow-400 mx-auto mb-8"></div>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide our work and relationships with every client.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Innovation</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We continuously explore new technologies and techniques to deliver cutting-edge solutions that push boundaries.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">💎</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Quality</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are committed to excellence in every aspect of our work, from code to design to client interactions.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Transparency</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe in clear communication and keeping our clients informed throughout the entire process.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Collaboration</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We work closely with our clients to ensure their vision is realized and their goals are achieved.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Adaptability</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We embrace change and quickly adapt to new challenges and opportunities in the digital landscape.
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Client Success</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We measure our success by the success of our clients and the value we add to their businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tight">
              Ready to Transform Your <span className="gradient-text">Online Presence?</span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Let's collaborate to create a website that truly represents your brand and drives results with our AI-powered development process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="btn-primary px-12 py-6 text-xl font-bold h-auto rounded-full shadow-2xl hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
              >
                🚀 Get My Site for $199
              </Button>
              <Button 
                variant="outline" 
                className="border-3 border-primary text-primary hover:bg-primary hover:text-black px-12 py-6 text-xl font-bold h-auto rounded-full backdrop-blur-sm bg-primary/10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                View Our Work ✨
              </Button>
            </div>
            <div className="mt-12">
              <div className="bg-gradient-to-r from-primary to-yellow-400 px-8 py-4 rounded-full shadow-2xl inline-block">
                <span className="text-black font-bold text-xl">⚡ Limited Time: Introductory Pricing!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}