
import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import ExperimentCard from "../components/ExperimentCard";
import Button from "../components/Button";
import ThreeDFunctionVisualizer from "../components/ThreeDFunctionVisualizer";

const Experimental = () => {
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">Experimental Lab</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Where backend engineering, mathematical concepts, and AI research converge to create innovative solutions.
          </p>
        </div>
      </section>
      
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Neural Network Activation Functions" 
            subtitle="Interactive 3D Visualization"
          />
          
          <ThreeDFunctionVisualizer />
        </div>
      </section>
      
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
