import { useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import ParallaxSection from "../components/ParallaxSection";
import Button from "../components/Button";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  
  // Backend, DevOps, and AI focused featured projects
  const featuredProjects = [
    {
      title: "Scalable Microservices Architecture",
      description: "Designed and implemented a resilient microservices ecosystem using Spring Boot and Kubernetes",
      imageSrc: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Java", "Spring Boot", "Kubernetes", "Docker", "MongoDB"],
      link: "/projects/microservices-architecture",
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Built an end-to-end CI/CD pipeline with infrastructure as code and automated deployment",
      imageSrc: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["AWS", "Jenkins", "Terraform", "GitHub Actions", "Docker"],
      link: "/projects/cicd-pipeline",
    },
    {
      title: "AI-Enhanced Log Analytics System",
      description: "Developed an AI system that identifies anomalies in server logs and predicts potential failures",
      imageSrc: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      technologies: ["Python", "TensorFlow", "ELK Stack", "AWS Lambda", "Cloud Watch"],
      link: "/projects/log-analytics",
    },
  ];

  // Apple-style poly line animation for hero section
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Points for connected lines
    const points: {x: number, y: number, vx: number, vy: number}[] = [];
    const numPoints = 80;
    const maxDistance = 150;
    const lineOpacity = 0.1;
    
    // Create points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
    
    // Animation variables for parallax on mouse move
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Mouse move event for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetX = mouseX - width / 2;
      targetY = mouseY - height / 2;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw points and connections
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Add slight movement from mouse position (parallax)
        const parallaxX = targetX * 0.01;
        const parallaxY = targetY * 0.01;
        
        // Update point position
        p.x += p.vx + parallaxX * 0.02;
        p.y += p.vy + parallaxY * 0.02;
        
        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Draw connections to nearby points (Apple-style mesh)
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = (1 - distance / maxDistance) * lineOpacity;
            
            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Draw point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Resize event handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Parallax effect for hero elements on scroll
  useEffect(() => {
    if (!heroSectionRef.current) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = heroSectionRef.current;
      if (!heroSection) return;
      
      const title = heroSection.querySelector('.hero-title');
      const subtitle = heroSection.querySelector('.hero-subtitle');
      const buttons = heroSection.querySelector('.hero-buttons');
      
      if (title) {
        (title as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      if (subtitle) {
        (subtitle as HTMLElement).style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      
      if (buttons) {
        (buttons as HTMLElement).style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Apple-style Poly Lines */}
      <div ref={heroSectionRef} className="relative min-h-screen flex items-center">
        {/* Canvas for animated poly lines */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-0"
        />
        
        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center pt-20">
          <h1 className="hero-title text-5xl md:text-7xl font-medium leading-tight mb-6 max-w-4xl">
            Engineering Robust Backend & Cloud Infrastructure
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
            I'm Siddharth Ajith, a backend developer and DevOps engineer 
            crafting resilient systems that power the digital world.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button href="/projects" size="lg" className="apple-hover">
              View My Work
            </Button>
            <Button href="/about" variant="outline" size="lg" className="apple-hover">
              Learn About Me
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
            <div className="w-1 h-4 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Featured Projects Section */}
      <ParallaxSection className="section-padding bg-gray-50" intensity="medium" withPolygons={true}>
        <div className="container mx-auto">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Technical Work"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-fade-in">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageSrc={project.imageSrc}
                technologies={project.technologies}
                link={project.link}
                className="apple-card"
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline" className="apple-hover">
              View All Projects
            </Button>
          </div>
        </div>
      </ParallaxSection>
      
      {/* About Preview Section with Parallax */}
      <ParallaxSection className="py-24 bg-white" direction="down" intensity="light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-6">I build robust backend systems and scalable cloud infrastructure</h2>
              <p className="text-gray-600 mb-8">
                With expertise in Java, Spring Boot, AWS, and emerging AI technologies, I approach each project with a focus on performance, reliability, and maintainability.
              </p>
              <Button href="/about" className="apple-hover">More About Me</Button>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden apple-card">
                {/* Code snippet background */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center overflow-hidden">
                  <pre className="text-[0.4rem] text-left p-4 transform scale-90">
                    {`@Service
public class DataProcessingService {
    
    private final DataRepository dataRepository;
    private final KafkaTemplate<String, DataEvent> kafkaTemplate;
    
    @Autowired
    public DataProcessingService(
            DataRepository dataRepository,
            KafkaTemplate<String, DataEvent> kafkaTemplate) {
        this.dataRepository = dataRepository;
        this.kafkaTemplate = kafkaTemplate;
    }
    
    @Transactional
    public void processData(DataRequest request) {
        DataEntity entity = mapRequestToEntity(request);
        dataRepository.save(entity);
        
        // Publish event to Kafka
        DataEvent event = new DataEvent(entity.getId(), "DATA_CREATED");
        kafkaTemplate.send("data-topic", event);
    }
}`}
                  </pre>
                </div>
                
                {/* Floating elements */}
                <div className="absolute w-3/4 h-3/4 bg-gray-200/50 rounded-full animate-float blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gray-300/50 rounded-tr-full blur-lg"></div>
                <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full blur-sm"></div>
                
                {/* AWS Architecture diagram */}
                <div className="relative z-10 w-2/3 h-2/3 bg-white rounded-lg shadow-lg flex items-center justify-center p-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                    <rect x="40" y="15" width="20" height="15" rx="2" fill="#232F3E" />
                    <rect x="15" y="50" width="20" height="15" rx="2" fill="#232F3E" />
                    <rect x="65" y="50" width="20" height="15" rx="2" fill="#232F3E" />
                    <rect x="40" y="75" width="20" height="15" rx="2" fill="#232F3E" />
                    
                    <line x1="50" y1="30" x2="50" y2="40" stroke="#232F3E" strokeWidth="1.5" />
                    <line x1="35" y1="50" x2="40" y2="50" stroke="#232F3E" strokeWidth="1.5" />
                    <line x1="60" y1="50" x2="65" y2="50" stroke="#232F3E" strokeWidth="1.5" />
                    <line x1="50" y1="65" x2="50" y2="75" stroke="#232F3E" strokeWidth="1.5" />
                    
                    <circle cx="50" cy="50" r="10" fill="#FF9900" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Call to Action */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="soundwave">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={i} 
                className="soundwave-bar"
                style={{ 
                  left: `${(i * 100 / 30)}%`,
                  animationDelay: `${i * 0.05}s`,
                  height: `${20 + Math.sin(i/3) * 30}%`,
                  opacity: 0.3 - (Math.abs(i - 15) * 0.01)
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-medium mb-8 max-w-3xl mx-auto">
            Let's build resilient systems together
          </h2>
          <p className="text-gray-300 mb-12 max-w-xl mx-auto">
            Whether you need a scalable backend solution, cloud infrastructure design, or exploring AI integration, I'm here to transform your technical challenges into robust solutions.
          </p>
          <Button 
            href="/about" 
            className="bg-white text-black hover:bg-gray-200 apple-hover"
            size="lg"
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
