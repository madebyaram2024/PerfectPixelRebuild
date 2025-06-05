
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start with a comprehensive consultation to understand your brand, goals, and target audience.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
        </svg>
      ),
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      number: "02", 
      title: "AI-Powered Design",
      description: "Our AI tools generate multiple design concepts, which our designers refine to perfection.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        </svg>
      ),
      gradient: "from-blue-400 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      number: "03",
      title: "Development", 
      description: "We build your site using the latest technologies, ensuring speed, security, and scalability.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="16,18 22,12 16,6"/>
          <polyline points="8,6 2,12 8,18"/>
        </svg>
      ),
      gradient: "from-green-400 to-teal-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "After thorough testing, we launch your site and provide ongoing optimization support.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l12-12c1.5-1.5 1.5-3.5 0-5s-3.5-1.5-5 0l-3 3-6-6-3 3z"/>
          <path d="m15 5 4 4"/>
        </svg>
      ),
      gradient: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Our Process
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            From Concept to Launch in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              7 Days
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our streamlined, AI-enhanced workflow delivers professional websites faster than traditional agencies, 
            without compromising on quality or creativity.
          </p>
        </div>
        
        {/* Process Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  {/* Icon and Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg text-white`}>
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-muted-foreground/50">{step.number}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timeline Visualization */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          
          <div className="relative flex justify-center items-center space-x-8 py-8">
            <div className="flex items-center space-x-8">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-lg"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg"></div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground font-medium">
              Complete project delivery in just one week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
