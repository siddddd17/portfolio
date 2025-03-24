import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import ExperimentCard from "../components/ExperimentCard";
import Button from "../components/Button";
import { useEffect, useState } from "react";

const Experimental = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading (would be replaced with actual data fetching)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Updated experiments data focused on AI, Backend Engineering, and Mathematics
  const experiments = [
    {
      title: "Distributed ML Training Pipeline",
      description: "Building a scalable distributed system for training large language models across multiple GPU clusters",
      technologies: ["Kubernetes", "PyTorch", "CUDA", "RabbitMQ", "Docker"],
      link: "https://github.com",
    },
    {
      title: "Adaptive Microservices Architecture",
      description: "Experimental architecture that dynamically scales and adapts microservices based on real-time traffic patterns",
      technologies: ["Spring Boot", "Service Mesh", "Istio", "gRPC", "Prometheus"],
      link: "https://github.com",
    },
    {
      title: "Neural Network Optimization Algorithms",
      description: "Exploring novel mathematical approaches to optimize neural network convergence and reduce training time",
      technologies: ["Python", "TensorFlow", "Mathematical Modeling", "Calculus", "Optimization"],
      link: "https://github.com",
    },
    {
      title: "Serverless ETL for Real-time Analytics",
      description: "Building event-driven, serverless data pipelines that transform and analyze data in near real-time",
      technologies: ["AWS Lambda", "Kinesis", "DynamoDB", "Apache Flink", "Terraform"],
      link: "https://github.com",
    },
    {
      title: "Graph Theory for Network Optimization",
      description: "Applying advanced graph algorithms to optimize cloud infrastructure networking and reduce latency",
      technologies: ["Graph Algorithms", "Network Theory", "Python", "Neo4j", "AWS"],
      link: "https://github.com",
    },
    {
      title: "Quantum-Inspired Algorithms",
      description: "Implementing classical algorithms inspired by quantum computing principles for optimization problems",
      technologies: ["Quantum Computing", "Python", "Linear Algebra", "Optimization", "NumPy"],
      link: "https://github.com",
    },
    {
      title: "Zero-Knowledge Proof Systems",
      description: "Experimenting with cryptographic protocols that enable verification without revealing underlying data",
      technologies: ["Cryptography", "Zero-Knowledge Proofs", "Blockchain", "Java", "Rust"],
      link: "https://github.com",
    },
    {
      title: "Differential Privacy in ML Models",
      description: "Techniques for training machine learning models that preserve privacy while maintaining utility",
      technologies: ["Differential Privacy", "TensorFlow Privacy", "Statistics", "Python", "Data Science"],
      link: "https://github.com",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">Experimental Lab</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Where backend engineering, mathematical concepts, and AI research converge to create innovative solutions.
          </p>
        </div>
      </section>
      
      {/* Interactive Demo */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Featured Experiment" 
            subtitle="Interactive Demo"
          />
          
          <div className="bg-gray-50 rounded-xl p-6 md:p-10 h-72 md:h-96 flex items-center justify-center overflow-hidden relative">
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <div className="text-center relative z-10 w-full">
                <h3 className="text-xl mb-4">Neural Network Visualization</h3>
                <p className="text-gray-600 mb-6">A real-time visualization of a neural network training process</p>
                
                <div className="flex justify-center w-full">
                  <div className="neural-network-visualization">
                    {/* Neural Network Layers Visualization */}
                    <div className="flex space-x-16 md:space-x-20 justify-center items-center max-w-2xl mx-auto">
                      {/* Input Layer */}
                      <div className="flex flex-col space-y-4">
                        {[...Array(4)].map((_, i) => (
                          <div 
                            key={`input-${i}`} 
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black/80"
                            style={{
                              animation: `pulse 1.5s infinite ${i * 0.2}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Hidden Layer 1 */}
                      <div className="flex flex-col space-y-4">
                        {[...Array(6)].map((_, i) => (
                          <div 
                            key={`hidden1-${i}`} 
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black/70"
                            style={{
                              animation: `pulse 1.8s infinite ${i * 0.15}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Hidden Layer 2 */}
                      <div className="flex flex-col space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={`hidden2-${i}`} 
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black/70"
                            style={{
                              animation: `pulse 2s infinite ${i * 0.1}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                      
                      {/* Output Layer */}
                      <div className="flex flex-col space-y-4">
                        {[...Array(2)].map((_, i) => (
                          <div 
                            key={`output-${i}`} 
                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black/90"
                            style={{
                              animation: `pulse 1.2s infinite ${i * 0.3}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"></div>
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experiments Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Experimental Projects" 
            subtitle="R&D Work"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment, index) => (
              <ExperimentCard
                key={index}
                title={experiment.title}
                description={experiment.description}
                technologies={experiment.technologies}
                link={experiment.link}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Approach Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading 
              title="My Approach to Experimentation" 
              subtitle="Methodology"
            />
            
            <div className="space-y-6 text-gray-700">
              <p>
                Experimentation is at the core of my creative and technical process. Rather than being bound by established patterns, I believe in exploring the edges of what's possible to discover new solutions.
              </p>
              
              <p>
                My approach follows a cycle of research, prototyping, testing, and refinement:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Research & Exploration:</strong> I begin by deeply researching emerging technologies and techniques, understanding their capabilities and limitations.
                </li>
                <li>
                  <strong>Rapid Prototyping:</strong> Building quick, focused prototypes allows me to test concepts without getting bogged down in implementation details.
                </li>
                <li>
                  <strong>Iterative Testing:</strong> I constantly test my assumptions, refine approaches, and explore alternative solutions.
                </li>
                <li>
                  <strong>Knowledge Integration:</strong> Successful experiments inform my broader work, while failures provide equally valuable insights.
                </li>
              </ul>
              
              <p>
                This experimental mindset keeps my skills sharp and my solutions innovative, ensuring I'm always pushing the boundaries of what's possible in digital design and development.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Interested in collaborating on experiments?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            I'm always looking to collaborate with fellow engineers and researchers on challenging technical problems.
          </p>
          <Button 
            href="/about#contact" 
            className="bg-white text-black hover:bg-gray-200"
          >
            Get in Touch
          </Button>
        </div>
      </section>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </MainLayout>
  );
};

export default Experimental;
