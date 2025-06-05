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
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
            Custom-Built 
            <span className="text-primary"> 5 Page</span> 
            Websites for only 
            <span className="text-primary"> $199</span>
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
            No gimmicks. No hidden fees. Real devs, AI-boosted workflow, done fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="btn-primary px-8 py-4 text-lg font-bold h-auto"
              onClick={() => {
                handleGetSiteClick();
                window.open('https://buy.stripe.com/your-stripe-payment-link', '_blank');
              }}
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
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-primary/20 px-4 py-2 rounded-full">
              <span className="text-primary font-bold">Go LIVE in 7 Days!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
