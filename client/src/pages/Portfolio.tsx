import { useQuery } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Project } from '@shared/schema';

export default function Portfolio() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our latest projects showcasing cutting-edge design and development.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-destructive">Error Loading Projects</h3>
              <p className="text-muted-foreground">Unable to load portfolio items at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="w-full h-64 rounded-xl" />
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              ) : projects && projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold">View Project</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge 
                        variant="secondary"
                        className={`mb-3 ${
                          project.category === 'corporate' ? 'bg-primary/20 text-primary' :
                          project.category === 'web-app' ? 'bg-accent/20 text-accent' :
                          'bg-green-500/20 text-green-500'
                        }`}
                      >
                        {project.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No Projects Available</h3>
                  <p className="text-muted-foreground">Check back soon for our latest work.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
