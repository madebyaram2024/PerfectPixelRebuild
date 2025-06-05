import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      description: "10+ years in web development and AI technology integration."
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      description: "Full-stack developer specializing in modern web technologies."
    },
    {
      name: "Emily Johnson",
      role: "Design Director",
      description: "Expert in UX/UI design with a focus on conversion optimization."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            About <span className="text-primary">PerfectPixel AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a team of passionate developers and designers creating custom websites with AI-powered efficiency.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At PerfectPixel AI, we believe every business deserves a professional website that drives results. 
              By combining human creativity with AI efficiency, we deliver custom websites faster and more 
              affordably than traditional agencies, without compromising on quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-bolt text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Speed</h3>
                <p className="text-muted-foreground">AI-boosted workflow enables 7-day delivery without sacrificing quality.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-palette text-accent text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Creativity</h3>
                <p className="text-muted-foreground">Human designers ensure every website is unique and brand-aligned.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-dollar-sign text-green-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Value</h3>
                <p className="text-muted-foreground">Professional results at a fraction of traditional agency costs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the experts behind PerfectPixel AI's success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-user text-3xl text-primary"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
