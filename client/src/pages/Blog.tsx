import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development with AI",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we build websites and web applications.",
      category: "AI Technology",
      date: "December 15, 2024",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "5 Essential Features Every Modern Website Needs",
      excerpt: "Learn about the must-have features that can make or break your website's success in 2024.",
      category: "Web Design",
      date: "December 10, 2024",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "SEO Best Practices for Small Business Websites",
      excerpt: "A comprehensive guide to optimizing your website for search engines and increasing organic traffic.",
      category: "SEO",
      date: "December 5, 2024",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Mobile-First Design: Why It Matters More Than Ever",
      excerpt: "Understanding the importance of mobile-first design in today's mobile-dominated world.",
      category: "Mobile Design",
      date: "November 30, 2024",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Converting Visitors to Customers: Landing Page Optimization",
      excerpt: "Learn proven techniques to improve your website's conversion rates and drive more sales.",
      category: "Conversion",
      date: "November 25, 2024",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "The Psychology of Color in Web Design",
      excerpt: "How color choices impact user behavior and how to use them strategically in your website design.",
      category: "Design Psychology",
      date: "November 20, 2024",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tips, and trends in web development, design, and digital marketing.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-primary font-medium group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="btn-primary px-8 py-3 rounded-lg font-semibold">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
