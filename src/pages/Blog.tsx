
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import { Search } from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Backend, DevOps, and AI-focused blog posts
  const blogPosts = [
    {
      id: "microservices-resilience",
      title: "Building Resilient Microservices with Circuit Breakers",
      excerpt: "How to use patterns like circuit breakers, bulkheads, and rate limiters to create fault-tolerant distributed systems.",
      imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "June 12, 2023",
      readTime: "8 min read",
      tags: ["Backend", "Microservices", "Resilience"],
    },
    {
      id: "kubernetes-autoscaling",
      title: "Advanced Kubernetes Autoscaling Strategies",
      excerpt: "Beyond basic HPA: implementing custom metrics, predictive scaling, and cost optimization in Kubernetes clusters.",
      imageSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "May 23, 2023",
      readTime: "10 min read",
      tags: ["DevOps", "Kubernetes", "Autoscaling"],
    },
    {
      id: "nlp-production-systems",
      title: "Deploying NLP Models in Production",
      excerpt: "Best practices for serving natural language processing models at scale with monitoring and continuous deployment.",
      imageSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "April 18, 2023",
      readTime: "12 min read",
      tags: ["AI/ML", "NLP", "Production"],
    },
    {
      id: "database-sharding",
      title: "Database Sharding Strategies for Scale",
      excerpt: "Techniques for horizontally scaling databases while maintaining data integrity and query performance.",
      imageSrc: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "March 7, 2023",
      readTime: "9 min read",
      tags: ["Backend", "Databases", "Scaling"],
    },
    {
      id: "gitops-workflows",
      title: "Implementing GitOps for Infrastructure Management",
      excerpt: "How to use Git as the single source of truth for infrastructure changes with automated reconciliation.",
      imageSrc: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "February 15, 2023",
      readTime: "11 min read",
      tags: ["DevOps", "GitOps", "Infrastructure"],
    },
    {
      id: "ai-ops-monitoring",
      title: "AI-Powered Observability: Beyond Traditional Monitoring",
      excerpt: "Using machine learning to detect anomalies, predict failures, and automate incident response in complex systems.",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "January 28, 2023",
      readTime: "10 min read",
      tags: ["DevOps", "AI/ML", "Observability"],
    },
  ];
  
  // Filter blog posts based on search query - improved to be more effective
  const filteredPosts = searchQuery.trim() === "" 
    ? blogPosts 
    : blogPosts.filter((post) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      });

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">Technical Insights</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Thoughts and explorations on backend development, DevOps practices, cloud architecture, and AI integration.
          </p>
          
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Featured Article" 
            subtitle="Editor's Pick"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="h-96 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Infrastructure as Code: The Evolution and Best Practices"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <span>July 15, 2023</span>
                <span>14 min read</span>
              </div>
              
              <h2 className="text-3xl font-medium mb-4">Infrastructure as Code: The Evolution and Best Practices</h2>
              
              <p className="text-gray-600 mb-6">
                Infrastructure as Code has transformed the way we manage cloud resources, enabling repeatable, 
                version-controlled deployments. This article explores the evolution from manual scripting to 
                sophisticated declarative tooling, and shares battle-tested practices for scalable infrastructure management.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">DevOps</span>
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">Infrastructure</span>
                <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">Cloud</span>
              </div>
              
              <Button href="/blog/infrastructure-as-code-evolution">
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Latest Articles" 
            subtitle="Technical Insights"
            centered
          />
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageSrc={post.imageSrc}
                  date={post.date}
                  readTime={post.readTime}
                  className={`animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No articles found matching your search criteria.</p>
              <Button 
                onClick={() => setSearchQuery("")}
                variant="outline"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-4">Subscribe to Technical Updates</h2>
            <p className="text-gray-600 mb-8">
              Get notified about new articles on backend development, DevOps practices, and AI integration. No spam, ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              />
              <Button>
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
