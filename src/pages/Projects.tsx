
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";

const Projects = () => {
  // Categories focused on Backend, DevOps, and AI
  const categories = ["All", "Backend", "DevOps", "AI/ML", "Cloud"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Backend, DevOps, and AI projects
  const projects = [
    {
      title: "Distributed Data Processing Pipeline",
      description: "High-throughput data processing system using Apache Kafka and Spring Boot microservices",
      imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Spring Boot", "Kafka", "Elasticsearch", "Redis", "Docker"],
      link: "/projects/data-pipeline",
      category: "Backend",
    },
    {
      title: "Auto-Scaling Kubernetes Cluster",
      description: "Self-healing Kubernetes infrastructure with custom metrics-based auto-scaling",
      imageSrc: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Kubernetes", "Prometheus", "Terraform", "AWS EKS", "Helm"],
      link: "/projects/kubernetes-cluster",
      category: "DevOps",
    },
    {
      title: "Serverless ETL Framework",
      description: "Event-driven ETL system using AWS Lambda for real-time data transformation",
      imageSrc: "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["AWS Lambda", "DynamoDB", "S3", "CloudWatch", "Python"],
      link: "/projects/serverless-etl",
      category: "Cloud",
    },
    {
      title: "Predictive Maintenance System",
      description: "ML system that predicts equipment failures before they occur using sensor data",
      imageSrc: "https://images.unsplash.com/photo-1581092921461-7239f2160855?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["TensorFlow", "Python", "Time Series Analysis", "AWS SageMaker", "IoT"],
      link: "/projects/predictive-maintenance",
      category: "AI/ML",
    },
    {
      title: "Multi-Region Database Replication",
      description: "Fault-tolerant database system with multi-region replication and automatic failover",
      imageSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["PostgreSQL", "AWS RDS", "DMS", "Route 53", "CloudFormation"],
      link: "/projects/multi-region-db",
      category: "Cloud",
    },
    {
      title: "Sentiment Analysis API",
      description: "Microservice for real-time sentiment analysis of customer feedback using NLP",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "BERT", "FastAPI", "Redis", "Docker"],
      link: "/projects/sentiment-api",
      category: "AI/ML",
    },
    {
      title: "Infrastructure as Code Framework",
      description: "Custom IaC tooling for consistent environment provisioning across multiple clouds",
      imageSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Terraform", "AWS CDK", "Python", "Bash", "GitHub Actions"],
      link: "/projects/iac-framework",
      category: "DevOps",
    },
    {
      title: "Real-time Event Processing System",
      description: "Highly scalable event processing platform with exactly-once delivery guarantees",
      imageSrc: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Java", "Apache Flink", "Kafka", "Redis", "Spring Boot"],
      link: "/projects/event-processing",
      category: "Backend",
    },
    {
      title: "Automated Error Classification",
      description: "AI system that categorizes application errors and suggests resolution steps",
      imageSrc: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "NLP", "Scikit-learn", "Elasticsearch", "Flask"],
      link: "/projects/error-classification",
      category: "AI/ML",
    },
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">My Projects</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A collection of my technical work in backend development, DevOps, cloud architecture, and AI integration.
          </p>
        </div>
      </section>
      
      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-10 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                technologies={project.technologies}
                link={project.link}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-600">No projects found in this category. Please check back later!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-6">Have a project in mind?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            I'm always open to discussing technical challenges and innovative solutions. Let's collaborate on building your next scalable system.
          </p>
          <Button href="/about#contact">Get in Touch</Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Projects;
