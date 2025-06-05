
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start with a comprehensive consultation to understand your brand, goals, and target audience.",
      icon: "fas fa-lightbulb",
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      number: "02", 
      title: "AI-Powered Design",
      description: "Our AI tools generate multiple design concepts, which our designers refine to perfection.",
      icon: "fas fa-magic",
      gradient: "from-blue-400 to-purple-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      number: "03",
      title: "Development", 
      description: "We build your site using the latest technologies, ensuring speed, security, and scalability.",
      icon: "fas fa-code",
      gradient: "from-green-400 to-teal-500",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "After thorough testing, we launch your site and provide ongoing optimization support.",
      icon: "fas fa-rocket",
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
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <i className={`${step.icon} text-white text-xl`}></i>
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
