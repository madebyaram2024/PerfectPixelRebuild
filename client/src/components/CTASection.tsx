import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function CTASection() {
  const handleBuyNow = () => {
    trackEvent('cta_click', 'footer', 'buy_now');
  };

  const handleViewWork = () => {
    trackEvent('cta_click', 'footer', 'view_work');
  };

  return (
    <section className="py-24 relative overflow-hidden bg-teal-500">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
          Ready to Transform Your 
          <span className="text-yellow-300"> Online Presence?</span>
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Let's collaborate to create a website that truly represents your brand and drives results.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            className="bg-white text-teal-500 hover:bg-gray-100 px-10 py-5 text-xl font-bold h-auto"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-teal-500 px-10 py-5 text-xl font-bold h-auto"
            onClick={handleViewWork}
          >
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
}
