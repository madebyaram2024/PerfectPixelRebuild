import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';
import type { Testimonial } from '@shared/schema';

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (error) {
    return (
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Client Testimonials</h2>
            <p className="text-destructive">Unable to load testimonials at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Client Testimonials</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about working with us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-background/50 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-20 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
            ))
          ) : testimonials && testimonials.length > 0 ? (
            // Testimonials data
            testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-background/50 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="flex text-primary">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={`${testimonial.name} profile`}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Testimonials Available</h3>
              <p className="text-muted-foreground">Check back soon for client feedback.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
