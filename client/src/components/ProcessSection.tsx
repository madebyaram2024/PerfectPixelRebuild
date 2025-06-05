import { Card, CardContent } from '@/components/ui/card';

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We understand your vision, goals, and target audience through strategic consultation.",
      icon: "💭"
    },
    {
      number: "02", 
      title: "AI Design",
      description: "Our AI generates stunning concepts, refined by our expert design team.",
      icon: "✨"
    },
    {
      number: "03",
      title: "Development", 
      description: "Built with cutting-edge technology for speed, security, and scalability.",
      icon: "⚡"
    },
    {
      number: "04",
      title: "Launch",
      description: "Thorough testing, deployment, and ongoing optimization support.",
      icon: "🚀"
    }
  ];

  return (
    <section className="py-24 bg-black/95 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary/10 border border-primary/30 rounded-full px-8 py-4 mb-8">
            <span className="text-primary text-sm font-bold tracking-wide">HOW WE WORK</span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black mb-6 text-white">
            Our <span className="gradient-text">Process</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From concept to launch in just 7 days with our streamlined, AI-powered workflow
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0"></div>
              )}

              <Card className="relative z-10 bg-gray-900/50 border-gray-800 hover:border-primary/50 transition-all duration-500 group-hover:scale-105">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                    <span className="text-2xl font-black text-primary">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gray-900/50 border border-gray-800 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Ready in 7 days</span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Starting at</span>
              <span className="text-primary font-bold text-xl">$199</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}