export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Initial consultation to understand your needs and goals",
      color: "from-primary to-yellow-600",
      textColor: "text-primary"
    },
    {
      number: "02",
      title: "AI Design",
      description: "Creating your custom design using advanced AI tools",
      color: "from-accent to-blue-600",
      textColor: "text-accent"
    },
    {
      number: "03",
      title: "Development",
      description: "Building your site with cutting-edge technology",
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-500"
    },
    {
      number: "04",
      title: "Launch",
      description: "Final testing and deployment of your website",
      color: "from-purple-500 to-violet-600",
      textColor: "text-purple-500"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Process</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined approach ensures a smooth and efficient website development journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl font-bold text-white">{step.number}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${step.textColor}`}>{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
