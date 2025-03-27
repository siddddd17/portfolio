
import MainLayout from "../layouts/MainLayout";
import SectionHeading from "../components/SectionHeading";
import ParallaxSection from "../components/ParallaxSection";
import SocialLinks from "../components/SocialLinks";
import Button from "../components/Button";
import ProfileSection from "../components/ProfileSection";
import { Server, Database, Cloud, Cpu, 
         GitBranch, Braces, Award, Briefcase, 
         GraduationCap, Bookmark, Layers, GitCommit,
         Terminal, Code, Building } from "lucide-react";

const About = () => {
  const skills = [
    { 
      icon: <Server className="h-6 w-6" />, 
      name: "Backend Development", 
      description: "Building robust, scalable server-side applications with Java, Spring Boot, and Python" 
    },
    { 
      icon: <Cloud className="h-6 w-6" />, 
      name: "DevOps & Cloud", 
      description: "Architecting AWS solutions using EC2, Lambda, ECS, Auto Scaling, CloudWatch, and implementing CI/CD pipelines" 
    },
    { 
      icon: <Database className="h-6 w-6" />, 
      name: "Data Engineering", 
      description: "Constructing ETL pipelines using the Medallion architecture for data transformation and analytics" 
    },
    { 
      icon: <Cpu className="h-6 w-6" />, 
      name: "Machine Learning", 
      description: "Implementing NLP models, neural networks, and deep learning algorithms for real-world applications" 
    },
    { 
      icon: <Braces className="h-6 w-6" />, 
      name: "System Architecture", 
      description: "Designing microservices, RESTful APIs, and distributed systems for scalability and resilience" 
    },
    { 
      icon: <GitBranch className="h-6 w-6" />, 
      name: "Version Control & CI/CD", 
      description: "Managing Git workflows and implementing automated testing, build, and deployment pipelines" 
    },
  ];

  const experiences = [
    {
      company: "Skellam AI",
      roles: [
        {
          title: "Software Engineer - 1",
          period: "Jan 2024 - Present",
          description: "Leading backend development and DevOps initiatives, architecting scalable systems using Spring Boot and AWS cloud infrastructure. Implementing CI/CD pipelines with Docker and automated monitoring with Datadog for AI-powered applications."
        },
        {
          title: "Associate Software Engineer",
          period: "Oct 2023 - Jan 2024",
          description: "Developed and maintained robust backend services by writing comprehensive unit and integration tests for RESTful APIs. Implemented POS integration solutions, enhancing system interoperability. Contributed to AWS infrastructure management and backend development tasks, ensuring scalable and reliable application performance."
        }
      ],
      location: "Karnataka, India"
    },
    {
      company: "AI Quantum Solutions Pvt. Ltd",
      roles: [
        {
          title: "Intern",
          period: "April 2023 - May 2023",
          description: "Implemented natural language processing models for sentiment analysis, comparing performance of neural networks, CNNs, and LSTMs using the IMDB dataset. Gained expertise in data preprocessing, model training, and evaluation methodologies for AI applications."
        }
      ],
      location: "Karnataka, India"
    }
  ];

  const projects = [
    {
      title: "Employee Manager Application",
      description: "A comprehensive web application built with Angular frontend and Spring Boot backend, featuring JWT authentication, role-based access control, and RESTful API architecture."
    },
    {
      title: "User Sales Insight Pipeline",
      description: "Advanced data pipeline utilizing Medallion architecture to process sales data, implementing ETL processes for data transformation and generating actionable insights on customer behavior and product performance."
    },
    {
      title: "Deep Learning Models for Sentiment Analysis",
      description: "Conducted rigorous comparative analysis of various deep learning models for sentiment analysis, demonstrating LSTM's superior performance in capturing contextual cues in natural language."
    },
    {
      title: "Eye Blink Detection System",
      description: "Innovative assistive technology enabling paralyzed individuals to communicate through eye blinks, converting detected patterns to sentences and audio output using computer vision algorithms."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section with Soundwave Animation and Profile Picture */}
      <ProfileSection />

      {/* Experience Section */}
      <ParallaxSection className="py-24 bg-white" withPolygons={true}>
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Professional Experience" 
            subtitle="Career Path"
            centered
          />
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-16 last:mb-0 relative">
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute top-0 left-6 bottom-0 w-px bg-gray-200 ml-0.5"></div>
                )}
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-3 h-3 rounded-full bg-black mt-2"></div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium flex items-center">
                          <Building className="h-5 w-5 mr-2" />
                          {exp.company}
                        </h3>
                        <p className="text-gray-600 text-sm ml-7">{exp.location}</p>
                      </div>
                    </div>
                    
                    {/* Roles at this company */}
                    <div className="ml-7 space-y-6 mt-4">
                      {exp.roles.map((role, roleIndex) => (
                        <div key={roleIndex} className="border-l-2 border-gray-200 pl-4 pb-2">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-lg font-medium">{role.title}</h4>
                            <span className="text-gray-600 text-sm md:text-base">
                              {role.period}
                            </span>
                          </div>
                          <p className="text-gray-600">{role.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Education Section */}
      <ParallaxSection className="py-24 bg-gray-50" direction="down" intensity="light">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Education & Certifications" 
            subtitle="Academic Background"
            centered
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-medium mb-6 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" /> Education
              </h3>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-medium">B.Tech in Electronics and Communication Engineering</h4>
                  <p className="text-gray-800">Govt. Model Engineering College</p>
                  <p className="text-gray-600">June 2023 | Kerala, India</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-medium">Higher Secondary Education</h4>
                  <p className="text-gray-800">Cochin Refineries School</p>
                  <p className="text-gray-600">April 2019 | Kerala, India</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-6 flex items-center">
                <Bookmark className="h-5 w-5 mr-2" /> Certifications
              </h3>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <ul className="space-y-4">
                  <li className="flex items-start transform transition hover:translate-x-1">
                    <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    <span>Java Backend Development - Skellam AI</span>
                  </li>
                  <li className="flex items-start transform transition hover:translate-x-1">
                    <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    <span>Data Engineering - Skellam AI</span>
                  </li>
                  <li className="flex items-start transform transition hover:translate-x-1">
                    <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    <span>SQL (Basic) - HackerRank</span>
                  </li>
                  <li className="flex items-start transform transition hover:translate-x-1">
                    <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    <span>Deep Learning - Indian Institute of Technology, Madras</span>
                  </li>
                  <li className="flex items-start transform transition hover:translate-x-1">
                    <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    <span>Optimization for Machine Learning - Indraprastha Institute of Information Technology, Delhi</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Projects Section */}
      <ParallaxSection className="py-24 bg-white" intensity="medium" withPolygons={true}>
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Notable Projects" 
            subtitle="Engineering Work"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <GitCommit className="h-5 w-5 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-medium">{project.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>
      
      {/* Skills Section - Enhanced with better readability and hover effects */}
      <ParallaxSection className="py-24 bg-gray-50" direction="down" intensity="medium">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title="Technical Expertise" 
            subtitle="Skills"
            centered
          />
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:translate-y-[-5px] transition-transform duration-300">
                <h4 className="font-medium mb-4 flex items-center">
                  <Terminal className="h-4 w-4 mr-2" /> Programming
                </h4>
                <p className="text-sm text-gray-600 mb-2">Over 5000 lines:</p>
                <p className="text-sm font-medium mb-3">Java • Python • SQL</p>
                <p className="text-sm text-gray-600 mb-2">Over 1000 lines:</p>
                <p className="text-sm font-medium">C++ • JavaScript • Bash</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:translate-y-[-5px] transition-transform duration-300">
                <h4 className="font-medium mb-4 flex items-center">
                  <Code className="h-4 w-4 mr-2" /> Frameworks
                </h4>
                <p className="text-sm font-medium">SpringBoot • Angular • MySQL</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:translate-y-[-5px] transition-transform duration-300">
                <h4 className="font-medium mb-4 flex items-center">
                  <Cloud className="h-4 w-4 mr-2" /> Cloud & DevOps
                </h4>
                <p className="text-sm mb-2">AWS services including:</p>
                <p className="text-sm">Route53 • LoadBalancer • Auto Scaling Group • EC2 • Lambda • CloudWatch • RDS • EBS • ECS • CloudFormation • IAM • VPC</p>
                <p className="text-sm mt-2">Datadog • Docker</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:translate-y-[-8px] group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4 group-hover:bg-gray-200 transition-colors">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 group-hover:text-black transition-colors">{skill.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>
      
      {/* Achievements Section */}
      <ParallaxSection className="py-24 bg-white" intensity="light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <SectionHeading 
              title="Achievements" 
              subtitle="Recognition"
              centered
            />
            
            <div className="space-y-6">
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mr-4">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">First Prize in Cartooning</h3>
                  <p className="text-gray-600">Layatharang 2021, Annual Arts Fest, Govt. Model Engineering College</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mr-4">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Third Prize in Men's High Jump</h3>
                  <p className="text-gray-600">Chakravyukh 2022, Annual Sports Fest, Govt. Model Engineering College</p>
                </div>
              </div>
              
              <div className="flex items-start bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mr-4">
                  <Award className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Entry Level Award in Music Performance</h3>
                  <p className="text-gray-600">Graded Exam in Music Performance: Initial Electronic Keyboards with Distinction, Trinity College London</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading 
              title="Get in Touch" 
              subtitle="Contact"
              centered
            />
            
            <p className="text-xl text-gray-600 mb-8">
              I'm always open to discussing backend development, DevOps solutions, or exploring opportunities in AI/ML technologies.
            </p>
            
            <div className="flex flex-col space-y-4">
              <a 
                href="mailto:email@example.com" 
                className="text-lg hover:text-gray-700 transition-colors"
              >
                email@example.com
              </a>
              
              <div className="mt-6">
                <SocialLinks iconSize={24} className="flex justify-center space-x-8" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
