import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import type { Project } from '@shared/schema';

export default function ProjectsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (error) {
    return (
      <section id="portfolio" className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-destructive">Unable to load projects at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore some of our recent work that showcases our expertise and creativity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="w-full h-64 rounded-xl" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          ) : projects && projects.length > 0 ? (
            // Projects data
            projects.slice(0, 3).map((project) => (
              <div key={project.id} className="group">
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(project.imageUrl)}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg"
                  />
                </div>
                <div className="p-6">
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
            // Empty state
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Projects Available</h3>
              <p className="text-muted-foreground">Check back soon for our latest work.</p>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <Button className="btn-primary px-8 py-4 text-lg font-bold h-auto">
            View All Projects
          </Button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <img 
              src={selectedImage}
              alt="Project preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
