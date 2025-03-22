
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
  
  // Sample experiments data
  const experiments = [
    {
      title: "Interactive 3D Physics Simulation",
      description: "Exploring WebGL and Three.js to create interactive 3D physics simulations in the browser",
      technologies: ["Three.js", "WebGL", "React", "Physics Engine"],
      link: "https://github.com",
    },
    {
      title: "AI-driven Content Generation",
      description: "Experimenting with GPT-3 to generate creative content and explore the boundaries of AI assistance",
      technologies: ["OpenAI API", "Next.js", "NLP", "Python"],
      link: "https://github.com",
    },
    {
      title: "Gesture Recognition System",
      description: "Using computer vision to recognize hand gestures and translate them into interface commands",
      technologies: ["TensorFlow.js", "Computer Vision", "WebRTC", "Canvas API"],
      link: "https://github.com",
    },
    {
      title: "Generative Art Algorithms",
      description: "Creating algorithmic art using mathematical principles and randomization",
      technologies: ["P5.js", "Canvas API", "Algorithms", "Generative Design"],
      link: "https://github.com",
    },
    {
      title: "Voice-Controlled Home Automation",
      description: "Building a voice recognition system for smart home control with privacy-focused processing",
      technologies: ["WebSpeech API", "IoT", "Node.js", "MQTT"],
      link: "https://github.com",
    },
    {
      title: "Interactive Data Visualization",
      description: "Exploring novel ways to visualize complex datasets through interactive and immersive interfaces",
      technologies: ["D3.js", "SVG", "WebGL", "Data Processing"],
      link: "https://github.com",
    },
    {
      title: "AR Web Experiences",
      description: "Creating augmented reality experiences that run directly in the browser without requiring an app",
      technologies: ["WebXR", "AR.js", "Three.js", "JavaScript"],
      link: "https://github.com",
    },
    {
      title: "Custom CSS Animation Engine",
      description: "Building a lightweight animation engine for complex CSS animations with precise timing control",
      technologies: ["CSS", "JavaScript", "Web Animation API", "GSAP"],
      link: "https://github.com",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-medium mb-6">Experimental Lab</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A playground for exploring new technologies, pushing boundaries, and learning through experimentation.
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
          
          <div className="bg-gray-100 rounded-xl p-6 md:p-10 h-72 md:h-96 flex items-center justify-center">
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl mb-4">Interactive Canvas Experiment</h3>
                <p className="text-gray-600 mb-6">Move your mouse or touch the screen to interact</p>
                <div 
                  id="canvas-container" 
                  className="w-full h-40 bg-white rounded-lg shadow-inner overflow-hidden"
                >
                  {/* Canvas would be inserted here with JavaScript */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Interactive canvas demo
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Experiments Grid */}
      <section className="section-padding bg-white">
        <div className="container mx-auto">
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
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading 
              title="My Approach to Experimentation" 
              subtitle="Methodology"
            />
            
            <div className="space-y-6 text-gray-700">
              <p>
                Experimentation is at the core of my creative and technical process. Rather than being bound 
                by established patterns, I believe in exploring the edges of what's possible to discover new solutions.
              </p>
              
              <p>
                My approach follows a cycle of research, prototyping, testing, and refinement:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Research & Exploration:</strong> I begin by deeply researching emerging technologies 
                  and techniques, understanding their capabilities and limitations.
                </li>
                <li>
                  <strong>Rapid Prototyping:</strong> Building quick, focused prototypes allows me to test concepts 
                  without getting bogged down in implementation details.
                </li>
                <li>
                  <strong>Iterative Testing:</strong> I constantly test my assumptions, refine approaches, and 
                  explore alternative solutions.
                </li>
                <li>
                  <strong>Knowledge Integration:</strong> Successful experiments inform my broader work, while 
                  failures provide equally valuable insights.
                </li>
              </ul>
              
              <p>
                This experimental mindset keeps my skills sharp and my solutions innovative, ensuring I'm 
                always pushing the boundaries of what's possible in digital design and development.
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
            I'm always looking for fellow creators and developers to collaborate with on experimental projects.
          </p>
          <Button 
            href="/about#contact" 
            className="bg-white text-black hover:bg-gray-200"
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Experimental;
