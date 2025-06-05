
export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "Initial consultation to understand your needs and goals",
      icon: "fas fa-lightbulb",
      color: "from-primary to-yellow-600",
      textColor: "text-primary"
    },
    {
      number: "02", 
      title: "AI Design",
      description: "Creating your custom design using advanced AI tools",
      icon: "fas fa-robot",
      color: "from-accent to-blue-600",
      textColor: "text-accent"
    },
    {
      number: "03",
      title: "Development", 
      description: "Building your site with cutting-edge technology",
      icon: "fas fa-code",
      color: "from-green-500 to-emerald-600",
      textColor: "text-green-500"
    },
    {
      number: "04",
      title: "Launch",
      description: "Final testing and deployment of your website",
      icon: "fas fa-rocket",
      color: "from-purple-500 to-violet-600", 
      textColor: "text-purple-500"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Streamlined Process</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to launch in just 7 days - here's how we make it happen.
          </p>
        </div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent via-green-500 to-purple-500 transform -translate-y-1/2"></div>
          <div className="grid lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg relative`}>
                  <i className={`${step.icon} text-2xl text-white`}></i>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-gray-800">{step.number}</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 min-h-[160px] flex flex-col">
                  <h3 className={`text-2xl font-bold mb-4 ${step.textColor}`}>{step.title}</h3>
                  <p className="text-gray-800 dark:text-gray-700 leading-relaxed flex-1 font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center flex-shrink-0 relative`}>
                <i className={`${step.icon} text-xl text-white`}></i>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">{step.number}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-card rounded-xl p-6 shadow-lg flex-1">
                <h3 className={`text-xl font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
                <p className="text-gray-800 dark:text-gray-700 font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
