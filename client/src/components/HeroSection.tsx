import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function HeroSection() {
  const handleGetSiteClick = () => {
    trackEvent('cta_click', 'hero', 'get_site_199');
  };

  const handleSeeIncludedClick = () => {
    trackEvent('cta_click', 'hero', 'see_included');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 cyber-grid flowing-bg">
        {/* Animated Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-accent/30 to-primary/30 rounded-full blur-xl animate-flow"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Custom-Built 
              <span className="text-primary"> 5 Page</span> 
              Websites for only 
              <span className="text-primary"> $199</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              No gimmicks. No hidden fees. Real devs, AI-boosted workflow, done fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="btn-primary px-8 py-4 text-lg font-bold h-auto"
                onClick={handleGetSiteClick}
              >
                Get My Site for $199
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-bold h-auto"
                onClick={handleSeeIncludedClick}
              >
                See What's Included <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="bg-primary/20 px-4 py-2 rounded-full">
                <span className="text-primary font-bold">Go LIVE in 7 Days!</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image Placeholder */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Hero Video/Image Container */}
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-primary/30">
                <div className="text-center">
                  <i className="fas fa-play-circle text-6xl text-primary mb-4"></i>
                  <p className="text-lg font-semibold">Hero Video Background</p>
                  <p className="text-sm text-muted-foreground">Upload your video file</p>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute -top-4 -right-4 bg-card/80 backdrop-blur p-4 rounded-xl border border-primary/30 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono">AI Active</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur p-4 rounded-xl border border-primary/30 animate-float" style={{animationDelay: '-2s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-xs">Days to Launch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
