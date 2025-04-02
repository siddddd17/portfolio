
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ActivationFunction = {
  name: string;
  fn: (x: number) => number;
  description: string;
  color: string;
};

const activationFunctions: ActivationFunction[] = [
  {
    name: "ReLU",
    fn: (x: number) => Math.max(0, x),
    description: "Returns 0 for negative inputs and x for positive inputs. Used in hidden layers of deep neural networks.",
    color: "#ff4747"
  },
  {
    name: "Sigmoid",
    fn: (x: number) => 1 / (1 + Math.exp(-x)),
    description: "Squashes values between 0 and 1. Used for binary classification output layers.",
    color: "#4287f5"
  },
  {
    name: "Tanh",
    fn: (x: number) => Math.tanh(x),
    description: "Squashes values between -1 and 1. Similar to sigmoid but zero-centered.",
    color: "#42f59e"
  },
  {
    name: "Softplus",
    fn: (x: number) => Math.log(1 + Math.exp(x)),
    description: "A smooth approximation to ReLU with better mathematical properties.",
    color: "#f542e0"
  },
  {
    name: "Linear",
    fn: (x: number) => x,
    description: "Simple identity function. Used in regression output layers.",
    color: "#f5a742"
  }
];

const ThreeDFunctionVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);
  
  const [selectedFunction, setSelectedFunction] = useState<ActivationFunction>(activationFunctions[0]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [userInputX, setUserInputX] = useState<string>("0");
  const [outputValue, setOutputValue] = useState<string>("0");
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.5);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0xcccccc);
    scene.add(gridHelper);
    
    // Create coordinate axis
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // Add axis labels
    const createTextSprite = (text: string, position: THREE.Vector3, color: number = 0x000000) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;
      
      canvas.width = 128;
      canvas.height = 64;
      
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.font = '48px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.set(0.5, 0.25, 1);
      
      scene.add(sprite);
    };
    
    createTextSprite("X", new THREE.Vector3(5.3, 0, 0), 0xff0000);
    createTextSprite("Y", new THREE.Vector3(0, 5.3, 0), 0x00ff00);
    createTextSprite("Z", new THREE.Vector3(0, 0, 5.3), 0x0000ff);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      
      scene.clear();
      renderer.dispose();
    };
  }, []);
  
  // Create or update function visualization
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Clear previous meshes
    meshesRef.current.forEach(mesh => {
      sceneRef.current?.remove(mesh);
    });
    meshesRef.current = [];
    
    // Parameters for the 3D visualization
    const xRange = 5;
    const zRange = 5;
    const resolution = 50;
    const xSegments = resolution;
    const zSegments = resolution;
    
    // Create surface geometry
    const geometry = new THREE.PlaneGeometry(
      xRange * 2, 
      zRange * 2, 
      xSegments, 
      zSegments
    );
    
    // Update vertices based on the selected function
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      
      // Apply the activation function to x to get y
      const y = selectedFunction.fn(x);
      
      // Set the new y position
      positions.setY(i, y);
    }
    
    geometry.computeVertexNormals();
    
    // Create material with color from the selected function
    const material = new THREE.MeshPhongMaterial({
      color: selectedFunction.color,
      side: THREE.DoubleSide,
      flatShading: false,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    
    // Create surface mesh
    const mesh = new THREE.Mesh(geometry, material);
    sceneRef.current.add(mesh);
    meshesRef.current.push(mesh);
    
    // Create wireframe mesh
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    sceneRef.current.add(wireframe);
    meshesRef.current.push(wireframe);
    
    // Create a sphere to represent a point on the function
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0x440000,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sceneRef.current.add(sphere);
    meshesRef.current.push(sphere);
    
    // Create a vertical line to show the output value
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    sceneRef.current.add(line);
    meshesRef.current.push(line as unknown as THREE.Mesh);
    
    // Animation function
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      if (isAnimating) {
        // Calculate time-based position for the sphere
        const time = performance.now() * 0.001 * (animationSpeed / 50);
        const x = Math.sin(time) * 3;
        
        // Update sphere position
        const y = selectedFunction.fn(x);
        sphere.position.set(x, y, 0);
        
        // Update the line points
        const linePositions = (line as THREE.Line).geometry.attributes.position;
        linePositions.setXYZ(0, x, 0, 0);
        linePositions.setXYZ(1, x, y, 0);
        linePositions.needsUpdate = true;
        
        // Update output value display
        setOutputValue(y.toFixed(4));
      }
      
      // Rotate the function visualization
      if (rotationSpeed > 0) {
        meshesRef.current.slice(0, 2).forEach(mesh => {
          mesh.rotation.y += 0.002 * rotationSpeed;
        });
      }
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    frameIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [selectedFunction, animationSpeed, isAnimating, rotationSpeed]);
  
  // Update when user changes input manually
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const x = parseFloat(userInputX);
    if (isNaN(x)) return;
    
    const sphere = meshesRef.current[2];
    const line = meshesRef.current[3] as unknown as THREE.Line;
    
    if (sphere && line) {
      const y = selectedFunction.fn(x);
      sphere.position.set(x, y, 0);
      
      // Update the line points
      const linePositions = line.geometry.attributes.position;
      linePositions.setXYZ(0, x, 0, 0);
      linePositions.setXYZ(1, x, y, 0);
      linePositions.needsUpdate = true;
      
      setOutputValue(y.toFixed(4));
    }
  }, [userInputX, selectedFunction]);
  
  // Handle function selection
  const handleFunctionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = activationFunctions.find(fn => fn.name === event.target.value);
    if (selected) {
      setSelectedFunction(selected);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col space-y-2 w-full md:w-auto">
          <label htmlFor="function-select" className="text-sm font-medium">
            Activation Function:
          </label>
          <select
            id="function-select"
            className="border rounded px-2 py-1"
            value={selectedFunction.name}
            onChange={handleFunctionChange}
          >
            {activationFunctions.map(fn => (
              <option key={fn.name} value={fn.name}>
                {fn.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col space-y-2 w-full md:w-auto">
          <span className="text-sm font-medium">
            Rotation Speed:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-sm">{rotationSpeed.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 w-full md:w-auto">
          <span className="text-sm font-medium">
            Animation Speed:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="100"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm">{animationSpeed}%</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          >
            {isAnimating ? "Pause" : "Play"}
          </button>
          
          <Dialog open={showHelp} onOpenChange={setShowHelp}>
            <DialogTrigger asChild>
              <button className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200">
                Help
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>3D Activation Function Visualizer</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <p className="mb-4">
                  This visualizer shows a 3D representation of various activation functions 
                  used in neural networks.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Rotation Speed:</strong> Controls how fast the function rotates</li>
                  <li><strong>Animation Speed:</strong> Controls how fast the red point moves along the function</li>
                  <li><strong>Play/Pause:</strong> Toggles the animation of the point</li>
                  <li><strong>Manual Input:</strong> Enter a specific x value to see its output</li>
                </ul>
                <p className="mt-4">
                  The red point represents an input value (x) being transformed by 
                  the activation function to produce an output value (y).
                </p>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">{selectedFunction.name}: {selectedFunction.description}</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/4">
            <div ref={containerRef} className="w-full h-96 bg-gray-50 rounded-lg">
              <canvas ref={canvasRef} />
            </div>
          </div>
          
          <div className="w-full md:w-1/4 space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Manual Testing</h4>
              <div className="flex flex-col space-y-2">
                <label htmlFor="x-input" className="text-xs text-gray-600">
                  Input (x):
                </label>
                <input
                  id="x-input"
                  type="number"
                  value={userInputX}
                  onChange={(e) => setUserInputX(e.target.value)}
                  className="border rounded px-2 py-1"
                  step="0.1"
                />
                
                <label className="text-xs text-gray-600">
                  Output (y):
                </label>
                <div className="border rounded px-2 py-1 bg-gray-50">
                  {outputValue}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Animation Progress</h4>
              <Progress value={isAnimating ? (parseInt(outputValue) * 10 + 50) : 0} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDFunctionVisualizer;
