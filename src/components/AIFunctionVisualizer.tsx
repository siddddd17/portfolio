
import React, { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Point {
  x: number;
  y: number;
}

const AIFunctionVisualizer = () => {
  // Canvas and animation references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [time, setTime] = useState(0);
  const [showDerivative, setShowDerivative] = useState(false);
  
  // Function selection state
  const [selectedFunction, setSelectedFunction] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  
  // Input values for manual testing
  const [inputValue, setInputValue] = useState(0);
  const [manualResult, setManualResult] = useState<number | null>(null);
  
  const { toast } = useToast();

  // Define mathematical functions
  const mathFunctions = [
    { 
      name: "Sigmoid", 
      formula: "f(x) = 1/(1+e^(-x))", 
      color: "#ff3b30",
      description: "Squashes values between 0 and 1, useful for output layers in classification problems.",
      fn: (x: number) => 1 / (1 + Math.exp(-x)),
      derivative: (x: number) => {
        const sig = 1 / (1 + Math.exp(-x));
        return sig * (1 - sig);
      }
    },
    { 
      name: "ReLU", 
      formula: "f(x) = max(0, x)", 
      color: "#34c759",
      description: "Returns x if positive, otherwise 0. Popular in hidden layers for its computational efficiency.",
      fn: (x: number) => Math.max(0, x),
      derivative: (x: number) => x > 0 ? 1 : 0
    },
    { 
      name: "Tanh", 
      formula: "f(x) = tanh(x)", 
      color: "#5856d6",
      description: "Similar to sigmoid but outputs values between -1 and 1, often better for hidden layers.",
      fn: (x: number) => Math.tanh(x),
      derivative: (x: number) => 1 - Math.pow(Math.tanh(x), 2)
    },
    { 
      name: "Sine Wave", 
      formula: "f(x) = sin(x)", 
      color: "#007aff",
      description: "Periodic function useful for modeling cyclical patterns.",
      fn: (x: number) => Math.sin(x),
      derivative: (x: number) => Math.cos(x)
    },
    { 
      name: "Gaussian", 
      formula: "f(x) = e^(-x²)", 
      color: "#ff9500",
      description: "Bell-shaped curve that peaks at x=0, used in radial basis function networks.",
      fn: (x: number) => Math.exp(-x * x),
      derivative: (x: number) => -2 * x * Math.exp(-x * x)
    },
  ];

  // Loading animation
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 300);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Initialize canvas when loading is complete
  useEffect(() => {
    if (!isLoading) {
      const handleResize = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const container = canvas.parentElement;
          if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            drawAnimation(time);
          }
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      
      // Start animation
      startAnimation();
      
      // Show welcome toast
      toast({
        title: "Interactive Function Visualizer",
        description: "Watch activation functions animate and test input values",
      });

      return () => {
        stopAnimation();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isLoading, toast]);

  // Animation effect
  useEffect(() => {
    if (!isLoading) {
      if (isPlaying) {
        startAnimation();
      } else {
        stopAnimation();
      }
    }
    
    return () => stopAnimation();
  }, [isPlaying, selectedFunction, showDerivative, animationSpeed, isLoading]);

  // Calculate result for manual input value
  useEffect(() => {
    const func = mathFunctions[selectedFunction];
    const result = func.fn(inputValue);
    setManualResult(result);
  }, [inputValue, selectedFunction]);

  const startAnimation = () => {
    stopAnimation();
    
    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) * 0.001 * animationSpeed;
      lastTime = currentTime;
      
      setTime(prev => (prev + deltaTime) % 10);
      drawAnimation(time + deltaTime);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const drawAnimation = (currentTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const xAxisY = height / 2;
    const yAxisX = width / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = yAxisX; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(yAxisX - (x - yAxisX), padding);
      ctx.lineTo(yAxisX - (x - yAxisX), height - padding);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = xAxisY; y < height - padding; y += 50) {
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(padding, xAxisY - (y - xAxisY));
      ctx.lineTo(width - padding, xAxisY - (y - xAxisY));
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.8)';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, xAxisY);
    ctx.lineTo(width - padding, xAxisY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(yAxisX, padding);
    ctx.lineTo(yAxisX, height - padding);
    ctx.stroke();
    
    // Selected function
    const func = mathFunctions[selectedFunction];
    const scale = 100; // Scale factor for the function
    const step = 2; // Step size for plotting
    const xRange = (width - 2 * padding) / 2;
    
    // Animation pulse - controls the visual pulse effect
    const pulse = Math.sin(currentTime * 3) * 0.2 + 0.8;
    
    // Function path
    ctx.beginPath();
    ctx.strokeStyle = func.color;
    ctx.lineWidth = 3;
    
    const points: Point[] = [];
    
    for (let i = -xRange; i <= xRange; i += step) {
      const x = yAxisX + i;
      const xVal = i / scale;
      const yVal = func.fn(xVal);
      const y = xAxisY - yVal * scale;
      
      if (i === -xRange) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      points.push({ x, y });
    }
    
    ctx.stroke();
    
    // Draw derivative if enabled
    if (showDerivative) {
      ctx.beginPath();
      ctx.strokeStyle = `${func.color}88`;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      for (let i = -xRange; i <= xRange; i += step) {
        const x = yAxisX + i;
        const xVal = i / scale;
        const yVal = func.derivative(xVal);
        const y = xAxisY - yVal * scale;
        
        if (i === -xRange) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw animated point traveling along the function
    const animationX = Math.sin(currentTime * 2) * xRange;
    const x = yAxisX + animationX;
    const xVal = animationX / scale;
    const yVal = func.fn(xVal);
    const y = xAxisY - yVal * scale;
    
    // Glowing point
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20 * pulse);
    gradient.addColorStop(0, `${func.color}`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 20 * pulse, 0, Math.PI * 2);
    ctx.fill();
    
    // Solid point
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = func.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Show coordinate values
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText(`x: ${xVal.toFixed(2)}, y: ${yVal.toFixed(2)}`, x + 10, y - 10);
    
    // Draw input value marker if manual input is being used
    if (!isNaN(inputValue)) {
      const inputX = yAxisX + inputValue * scale;
      // Only draw if within visible range
      if (inputX >= padding && inputX <= width - padding) {
        const inputY = xAxisY - func.fn(inputValue) * scale;
        
        // Draw vertical line to mark input
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.moveTo(inputX, xAxisY);
        ctx.lineTo(inputX, inputY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw filled circle at the point
        ctx.fillStyle = func.color;
        ctx.beginPath();
        ctx.arc(inputX, inputY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Show input value
        ctx.fillStyle = '#000';
        ctx.fillText(`Input: ${inputValue.toFixed(2)}, Output: ${func.fn(inputValue).toFixed(3)}`, 
                    inputX + 10, inputY - 25);
      }
    }
    
    // Draw the function name and formula
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText(func.name, padding + 10, padding + 20);
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillStyle = func.color;
    ctx.fillText(func.formula, padding + 10, padding + 45);
    
    if (showDerivative) {
      ctx.fillStyle = `${func.color}88`;
      ctx.fillText(`f'(x) = derivative`, padding + 10, padding + 70);
    }
  };

  const handleFunctionChange = (index: number) => {
    setSelectedFunction(index);
    toast({
      title: `${mathFunctions[index].name} Function`,
      description: mathFunctions[index].formula,
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setTime(0);
    if (!isPlaying) {
      drawAnimation(0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px] animate-pulse">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-300"></div>
          <div className="space-y-2 w-full max-w-md">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <div className="p-4 flex items-center justify-between bg-white border-b">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isPlaying ? "outline" : "default"}
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={resetAnimation}
              >
                <RefreshCw size={16} />
                Reset
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <Slider 
                  value={[animationSpeed]} 
                  min={0.1} 
                  max={3} 
                  step={0.1} 
                  className="w-32" 
                  onValueChange={([value]) => setAnimationSpeed(value)}
                />
                <span className="text-sm w-8">{animationSpeed.toFixed(1)}x</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2"
                      onClick={() => setShowHelp(!showHelp)}
                    >
                      <HelpCircle size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle help overlay</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {showHelp && (
            <div className="p-3 bg-blue-50 border-b border-blue-200">
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-2 rounded">
                  <HelpCircle size={18} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">How to use this visualization:</h3>
                  <ul className="text-xs text-blue-700 mt-1 list-disc pl-4 space-y-1">
                    <li>Watch the animation to see how activation functions transform input values</li>
                    <li>Select different functions from the list below to compare their behaviors</li>
                    <li>Use the manual input slider to test specific x values and see the output</li>
                    <li>Toggle the derivative view to understand how gradients work</li>
                  </ul>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="ml-auto text-xs" 
                  onClick={() => setShowHelp(false)}
                >
                  Hide
                </Button>
              </div>
            </div>
          )}
          
          <div className="relative">
            <div className="min-h-[400px]">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full"
              />
            </div>
            
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                size="sm"
                variant={showDerivative ? "default" : "outline"}
                onClick={() => setShowDerivative(!showDerivative)}
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                {showDerivative ? "Hide Derivative" : "Show Derivative"}
              </Button>
            </div>
          </div>
          
          {/* Manual input testing section */}
          <div className="bg-gray-50 p-4 border-t">
            <h3 className="font-medium mb-3">Test with your own input</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                </div>
                <Slider
                  value={[inputValue]}
                  min={-3}
                  max={3}
                  step={0.1}
                  onValueChange={([val]) => setInputValue(val)}
                  className="mb-2"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={inputValue}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
            </div>
            <div className="mt-2 p-3 bg-white rounded border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Input (x):</span> {inputValue.toFixed(2)}
                </div>
                <div>
                  <span className="font-medium">Output (y):</span> {manualResult !== null ? manualResult.toFixed(4) : 'N/A'}
                </div>
                {showDerivative && (
                  <div>
                    <span className="font-medium">Derivative at x:</span> {
                      mathFunctions[selectedFunction].derivative(inputValue).toFixed(4)
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Collapsible 
            open={isExpanded} 
            onOpenChange={setIsExpanded}
            className="border-t"
          >
            <CollapsibleTrigger className="flex items-center justify-center w-full p-2 bg-white hover:bg-gray-50">
              <span className="text-sm font-medium">
                {isExpanded ? "Hide Functions" : "Show All Functions"}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {mathFunctions.map((func, index) => (
                    <button
                      key={func.name}
                      className={`p-3 rounded text-left transition-all ${
                        selectedFunction === index
                          ? `bg-${func.color.replace('#', '')} bg-opacity-10 border-l-4`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      style={{ borderLeftColor: selectedFunction === index ? func.color : 'transparent' }}
                      onClick={() => handleFunctionChange(index)}
                    >
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: func.color }}></span>
                        <h4 className="font-medium">{func.name}</h4>
                      </div>
                      <p className="text-xs mt-1 text-gray-600">{func.formula}</p>
                    </button>
                  ))}
                </div>
                
                {/* Description of selected function */}
                <div className="p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">{mathFunctions[selectedFunction].name}</h4>
                  <p className="text-sm text-gray-700">{mathFunctions[selectedFunction].description}</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="bg-white p-4 border-t">
            <h3 className="text-lg font-medium mb-2">About Activation Functions</h3>
            <p className="text-sm text-gray-600">
              Activation functions determine the output of a neural network node. They transform 
              the input signal to an output signal, and are critical in enabling neural networks 
              to learn complex patterns. Different activation functions have different properties, 
              making them suitable for different types of machine learning tasks.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center">
                <Switch 
                  id="auto-play"
                  checked={isPlaying}
                  onCheckedChange={setIsPlaying}
                  className="mr-2"
                />
                <Label htmlFor="auto-play">Auto-animate</Label>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowHelp(true)}
              >
                Show Help
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIFunctionVisualizer;
