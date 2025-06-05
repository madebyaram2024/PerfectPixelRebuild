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
        <div className="space-y-10">
            <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="block text-white">Custom-Built</span>
            <span className="block text-primary drop-shadow-lg">5 Page Websites</span> 
            <span className="block text-white">for only</span>
            <span className="block text-primary text-7xl lg:text-9xl drop-shadow-lg">$199</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-white/90 mb-10 leading-relaxed font-medium max-w-4xl mx-auto">
            No gimmicks. No hidden fees. Real devs, AI-boosted workflow, done fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              className="btn-primary px-12 py-6 text-xl font-bold h-auto rounded-full shadow-2xl hover:shadow-primary/50 transform hover:scale-105 transition-all duration-300"
              onClick={() => {
                handleGetSiteClick();
                window.open('https://buy.stripe.com/your-stripe-payment-link', '_blank');
              }}
            >
              🚀 Get My Site for $199
            </Button>
            <Button 
              variant="outline"
              className="border-3 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-bold h-auto rounded-full backdrop-blur-sm bg-white/10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={handleSeeIncludedClick}
            >
              See What's Included ✨
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center">
            <div className="bg-gradient-to-r from-primary to-yellow-400 px-8 py-4 rounded-full shadow-2xl animate-pulse">
              <span className="text-black font-bold text-xl">⚡ Go LIVE in 7 Days!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
