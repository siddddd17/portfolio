
import React, { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";

interface FunctionNode {
  x: number;
  y: number;
  radius: number;
  active: boolean;
}

const AIFunctionVisualizer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [currentEquation, setCurrentEquation] = useState("f(x) = e^x");
  const animationFrameRef = useRef<number | null>(null);
  
  const mathFunctions = [
    { name: "Exponential", formula: "f(x) = e^x", color: "rgba(0, 122, 255, 0.8)" },
    { name: "Sigmoid", formula: "f(x) = 1/(1+e^(-x))", color: "rgba(255, 59, 48, 0.8)" },
    { name: "ReLU", formula: "f(x) = max(0, x)", color: "rgba(52, 199, 89, 0.8)" },
    { name: "Tanh", formula: "f(x) = tanh(x)", color: "rgba(88, 86, 214, 0.8)" }
  ];
  
  useEffect(() => {
    // Loading animation
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 10;
          if (newProgress >= 100) {
            clearInterval(interval as NodeJS.Timeout);
            setTimeout(() => setIsLoading(false), 200);
            return 100;
          }
          return newProgress;
        });
      }, 80);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);
  
  useEffect(() => {
    if (!isLoading) {
      initializeVisualizer();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoading]);
  
  const initializeVisualizer = () => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    };
    
    const handleMouseDown = () => {
      setIsClicked(true);
      const nextIndex = mathFunctions.findIndex(f => f.formula === currentEquation) + 1;
      setCurrentEquation(mathFunctions[nextIndex % mathFunctions.length].formula);
    };
    
    const handleMouseUp = () => {
      setIsClicked(false);
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mouseup', handleMouseUp);
    
    // Initial resize and draw
    handleResize();
    drawCanvas();
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
        containerRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  };
  
  const handleResize = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawCanvas();
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    drawCanvas();
  }, [cursorPos, isClicked, currentEquation]);
  
  const drawCanvas = () => {
    if (!canvasRef.current || isLoading) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gridSize = 20;
    const nodes: FunctionNode[] = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const originX = canvas.width / 2;
    const originY = canvas.height / 2;
    const axisLength = Math.min(canvas.width, canvas.height) * 0.8;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)';
    ctx.lineWidth = 1;
    
    for (let x = originX % gridSize; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    for (let y = originY % gridSize; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(originX - axisLength / 2, originY);
    ctx.lineTo(originX + axisLength / 2, originY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(originX, originY - axisLength / 2);
    ctx.lineTo(originX, originY + axisLength / 2);
    ctx.stroke();
    
    // Draw function
    ctx.strokeStyle = mathFunctions.find(f => f.formula === currentEquation)?.color || 'rgba(0, 122, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    const scale = axisLength / 8;
    
    for (let i = -axisLength / 2; i <= axisLength / 2; i += 1) {
      const x = i;
      let y;
      
      switch (currentEquation) {
        case "f(x) = e^x":
          y = -Math.exp(x / scale) * scale / 10;
          break;
        case "f(x) = 1/(1+e^(-x))":
          y = -scale * (1 / (1 + Math.exp(-x / (scale / 5))) - 0.5) * 2;
          break;
        case "f(x) = max(0, x)":
          y = x < 0 ? 0 : -x;
          break;
        case "f(x) = tanh(x)":
          y = -Math.tanh(x / (scale / 5)) * scale;
          break;
        default:
          y = -Math.exp(x / scale) * scale / 10;
      }
      
      if (y < -axisLength / 2) y = -axisLength / 2;
      if (y > axisLength / 2) y = axisLength / 2;
      
      if (i === -axisLength / 2) {
        ctx.moveTo(originX + x, originY + y);
      } else {
        ctx.lineTo(originX + x, originY + y);
      }
    }
    ctx.stroke();
    
    // Generate nodes along the function
    const nodeCount = 20;
    const range = axisLength / 2;
    
    for (let i = 0; i < nodeCount; i++) {
      const x = -range + (range * 2) * (i / (nodeCount - 1));
      let y;
      
      switch (currentEquation) {
        case "f(x) = e^x":
          y = -Math.exp(x / scale) * scale / 10;
          break;
        case "f(x) = 1/(1+e^(-x))":
          y = -scale * (1 / (1 + Math.exp(-x / (scale / 5))) - 0.5) * 2;
          break;
        case "f(x) = max(0, x)":
          y = x < 0 ? 0 : -x;
          break;
        case "f(x) = tanh(x)":
          y = -Math.tanh(x / (scale / 5)) * scale;
          break;
        default:
          y = -Math.exp(x / scale) * scale / 10;
      }
      
      if (y < -axisLength / 2) y = -axisLength / 2;
      if (y > axisLength / 2) y = axisLength / 2;
      
      nodes.push({
        x: originX + x,
        y: originY + y,
        radius: 6,
        active: false
      });
    }
    
    // Handle node interactions
    nodes.forEach((node, index) => {
      const dx = node.x - cursorPos.x;
      const dy = node.y - cursorPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 30) {
        node.radius = 8;
        node.active = true;
        setActiveNode(index);
      } else {
        node.radius = 6;
        node.active = false;
      }
      
      // Draw nodes
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      
      if (node.active) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, mathFunctions.find(f => f.formula === currentEquation)?.color || 'rgba(0, 122, 255, 0.8)');
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = mathFunctions.find(f => f.formula === currentEquation)?.color || 'rgba(0, 122, 255, 0.8)';
      }
      
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Show coordinates on hover
      if (node.active) {
        const normalizedX = ((node.x - originX) / scale).toFixed(2);
        const normalizedY = (-(node.y - originY) / scale).toFixed(2);
        
        ctx.font = '14px SF Pro Display, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
        ctx.fillText(`(${normalizedX}, ${normalizedY})`, node.x + 15, node.y - 15);
      }
    });
    
    // Connect nodes with lines
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length - 1; i++) {
      const nodeA = nodes[i];
      const nodeB = nodes[i + 1];
      
      if (nodeA.active || nodeB.active) {
        const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        gradient.addColorStop(0, 'rgba(0, 122, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 122, 255, 0.4)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
      }
      
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();
    }
    
    // Draw cursor effects
    if (cursorPos.x !== 0 && cursorPos.y !== 0) {
      ctx.beginPath();
      ctx.arc(cursorPos.x, cursorPos.y, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 122, 255, 0.05)';
      ctx.fill();
      
      if (isClicked) {
        ctx.beginPath();
        ctx.arc(cursorPos.x, cursorPos.y, 60, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 122, 255, 0.2)';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }
    
    // Display function info
    const currentFunction = mathFunctions.find(f => f.formula === currentEquation);
    if (currentFunction) {
      ctx.font = 'bold 16px SF Pro Display, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
      ctx.fillText(currentFunction.name + " Function:", 20, 30);
      
      ctx.font = '16px SF Pro Display, system-ui, sans-serif';
      ctx.fillStyle = currentFunction.color;
      ctx.fillText(currentFunction.formula, 20, 55);
      
      ctx.font = '14px SF Pro Display, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
      ctx.fillText("Click anywhere to change function", 20, 80);
    }
    
    // Request next animation frame
    animationFrameRef.current = requestAnimationFrame(drawCanvas);
  };
  
  return (
    <div 
      ref={containerRef}
      className="bg-gray-50 rounded-xl p-6 md:p-10 min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden relative"
    >
      {isLoading ? (
        <div className="animate-pulse flex flex-col items-center space-y-4 w-full max-w-md">
          <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <Progress value={progress} className="h-2 w-full" />
          </div>
        </div>
      ) : (
        <div className="text-center relative z-10 w-full h-full">
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          ></canvas>
          
          <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">AI Activation Functions Explorer</h3>
            <p className="text-sm text-gray-600">
              Hover over nodes to see coordinates and click anywhere to cycle through different activation functions used in neural networks. This visualization demonstrates how different mathematical functions transform input data.
            </p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 opacity-5 pointer-events-none">
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
  );
};

export default AIFunctionVisualizer;
