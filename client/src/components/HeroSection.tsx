import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGetSiteClick = () => {
    trackEvent('cta_click', 'hero', 'get_site_199');
  };

  const handleSeeIncludedClick = () => {
    trackEvent('cta_click', 'hero', 'see_included');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e: Event) => console.error('Video error:', e);

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;

      if (duration && currentTime) {
        // Calculate progress (0 to 1)
        const progress = currentTime / duration;

        // Start slowing down at 70% through the video
        if (progress > 0.7) {
          // Calculate slowdown factor (from 1 to 0.1)
          const slowdownProgress = (progress - 0.7) / 0.3; // 0 to 1 over last 30%
          const playbackRate = Math.max(0.1, 1 - (slowdownProgress * 0.9));
          video.playbackRate = playbackRate;

          // Freeze at 95% through
          if (progress > 0.95) {
            video.pause();
            video.style.filter = 'brightness(0.8)'; // Slightly darken frozen frame
          }
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-cover transition-all duration-1000"
          onLoadStart={() => console.log("Video load started")}
          onLoadedData={() => console.log("Video loaded data")}
          onCanPlay={() => console.log("Video can play")}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-12">
          {/* Premium Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
            <span className="text-primary text-sm font-semibold mr-2">✨ PREMIUM WEB DESIGN</span>
            <span className="text-white/80 text-sm">Trusted by 500+ Businesses</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-black mb-8 leading-[0.9] tracking-tight">
            <span className="block text-white drop-shadow-2xl">Stunning</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-2xl">Websites</span> 
            <span className="block text-white drop-shadow-2xl">that Convert</span>
            <div className="mt-4">
              <span className="inline-block bg-gradient-to-r from-secondary to-accent text-black px-8 py-4 rounded-2xl text-4xl lg:text-6xl font-black shadow-2xl">
                Only $199
              </span>
            </div>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed font-medium max-w-5xl mx-auto">
            Premium web design meets AI efficiency. Get a custom 5-page website that elevates your brand and drives results – delivered in just 7 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="group relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent text-black px-14 py-6 text-xl font-black h-auto rounded-full shadow-2xl hover:shadow-primary/60 transform hover:scale-105 transition-all duration-500 border-2 border-primary"
              onClick={() => {
                handleGetSiteClick();
                window.open('https://buy.stripe.com/your-stripe-payment-link', '_blank');
              }}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3 text-2xl">🚀</span>
                Start My Project
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
            <Button 
              variant="outline"
              className="group border-2 border-white/30 text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-bold h-auto rounded-full backdrop-blur-md bg-white/5 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500"
              onClick={handleSeeIncludedClick}
            >
              <span className="flex items-center">
                View Portfolio
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center space-y-6">
            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">7-Day Delivery</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">100% Satisfaction</span>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Full Ownership</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 backdrop-blur-sm border border-primary/30 px-8 py-4 rounded-2xl">
              <span className="text-white font-bold text-lg">⚡ Limited Time: Introductory Pricing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}