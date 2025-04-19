import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CustomModelGenerator } from '../CustomModelGenerator';

const ThreeJSProductViewer = ({ modelUrl, backgroundColor = "#f5f5f5", autoRotate = true }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  console.log("ThreeJSProductViewer - Rendering with modelUrl:", modelUrl);

  // Set up the Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    console.log("ThreeJSProductViewer - Setting up Three.js scene");

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(backgroundColor);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add directional lights from multiple angles with shadows
    const createDirectionalLight = (color, intensity, position) => {
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(...position);
      light.castShadow = true;
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      scene.add(light);
      return light;
    };

    // Main key light
    createDirectionalLight(0xffffff, 1.0, [1, 1, 1]);
    
    // Fill light
    createDirectionalLight(0xffffff, 0.5, [-1, 0.5, -1]);
    
    // Rim light for better definition
    createDirectionalLight(0xffffff, 0.3, [0, -1, 0]);

    // Create camera
    const container = containerRef.current;
    const aspectRatio = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls with improved settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8; // Reduced for smoother rotation
    controlsRef.current = controls;

    // Animation loop with performance optimization
    let frameId = null;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize more efficiently
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    // Throttled resize listener for better performance
    let resizeTimeout;
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleResize();
        }, 200);
      }
    };
    
    window.addEventListener('resize', throttledResize);
    
    console.log("ThreeJSProductViewer - Scene setup complete");

    // Clean up
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      window.removeEventListener('resize', throttledResize);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = null;
      }
      
      controls.dispose();
      renderer.dispose();
      console.log("ThreeJSProductViewer - Cleanup complete");
    };
  }, [backgroundColor, autoRotate]);

  // Load the 3D model
  useEffect(() => {
    if (!sceneRef.current || !modelUrl) {
      console.log("ThreeJSProductViewer - Cannot load model, scene or modelUrl not available", { 
        sceneAvailable: !!sceneRef.current, 
        modelUrl 
      });
      return;
    }

    console.log("ThreeJSProductViewer - Starting model load for:", modelUrl);
    setIsLoading(true);
    setError(null);

    // Remove previous model if it exists
    if (modelRef.current) {
      console.log("ThreeJSProductViewer - Removing previous model");
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    // Example model URLs to use
    const modelsMap = {
      'laptop': '/models/laptop/model.gltf',
      'headphones': '/models/headphones/model.gltf',
      'smartphone': '/models/smartphone/model.gltf',
      'smartwatch': '/models/smartwatch/model.gltf',
    };

    // Use the provided modelUrl or fallback to pre-defined models
    const modelToLoad = modelsMap[modelUrl] || modelUrl;
    console.log("ThreeJSProductViewer - Will attempt to load model from:", modelToLoad);
    
    const loader = new GLTFLoader();
    
    // Create a fallback model in case of loading failure
    const createFallbackModel = (errorMsg) => {
      console.log('ThreeJSProductViewer - Using fallback model due to:', errorMsg);
      
      try {
        // Use our custom model generator instead of a simple cube
        const customModel = CustomModelGenerator.getModel(modelUrl);
        
        if (!customModel) {
          console.error('ThreeJSProductViewer - CustomModelGenerator failed to create a model');
          setError('Failed to create fallback model');
          setIsLoading(false);
          return;
        }
        
        // Center and position the model
        customModel.position.set(0, 0, 0);
        customModel.scale.multiplyScalar(1.2); // Adjust scale as needed
        
        // Add model to scene
        sceneRef.current.add(customModel);
        modelRef.current = customModel;
        
        // Reset controls
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
        
        console.log('ThreeJSProductViewer - Fallback model created successfully');
        setModelLoaded(true);
        setIsLoading(false);
      } catch (fallbackError) {
        console.error('ThreeJSProductViewer - Error creating fallback model:', fallbackError);
        setError(`Failed to create fallback model: ${fallbackError.message}`);
        setIsLoading(false);
      }
    };
    
    // Try both potential paths if modelUrl is a key
    const tryAlternativePath = () => {
      if (modelsMap[modelUrl]) {
        const alternativePath = `/assets/models/${modelUrl}.gltf`;
        console.log("ThreeJSProductViewer - Trying alternative path:", alternativePath);
        
        loader.load(
          alternativePath,
          handleModelLoaded,
          handleLoadProgress,
          (error) => {
            console.error('ThreeJSProductViewer - Error loading alternative model:', error);
            createFallbackModel(error.message);
          }
        );
      } else {
        createFallbackModel("Model not found in predefined maps");
      }
    };
    
    const handleModelLoaded = (gltf) => {
      try {
        console.log('ThreeJSProductViewer - Model loaded successfully:', gltf);
        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Get the max dimension to normalize scale
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; // Scale model to fit in a 2x2x2 box
        
        model.position.sub(center); // Center model
        model.scale.multiplyScalar(scale); // Normalize scale
        
        // Apply initial rotation if needed
        model.rotation.set(0, Math.PI / 4, 0);
        
        // Enhance materials for more realistic rendering
        model.traverse((node) => {
          if (node.isMesh) {
            // Enable shadows
            node.castShadow = true;
            node.receiveShadow = true;
            
            // Enhance materials if they're basic
            if (node.material && 
               (node.material.isMeshBasicMaterial || 
                (node.material.type && node.material.type === 'MeshBasicMaterial'))) {
              const color = node.material.color ? node.material.color : new THREE.Color(0.8, 0.8, 0.8);
              node.material = new THREE.MeshStandardMaterial({
                color: color,
                metalness: 0.4,
                roughness: 0.6,
                envMapIntensity: 1.0
              });
            }
          }
        });
        
        // Add model to scene
        sceneRef.current.add(model);
        modelRef.current = model;
        
        // Position camera
        cameraRef.current.position.z = 3;
        
        // Reset controls
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
        
        console.log('ThreeJSProductViewer - Model setup complete and added to scene');
        setModelLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error('ThreeJSProductViewer - Error setting up model:', error);
        tryAlternativePath();
      }
    };
    
    const handleLoadProgress = (xhr) => {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`ThreeJSProductViewer - Model loading: ${percentComplete.toFixed(2)}% complete`);
      }
    };
    
    const handleLoadError = (error) => {
      console.error('ThreeJSProductViewer - Error loading model:', error);
      console.log('ThreeJSProductViewer - Will try alternative path');
      tryAlternativePath();
    };
    
    // First attempt to load the model
    try {
      console.log(`ThreeJSProductViewer - Loading model from: ${modelToLoad}`);
      loader.load(
        modelToLoad,
        handleModelLoaded,
        handleLoadProgress,
        handleLoadError
      );
    } catch (error) {
      console.error('ThreeJSProductViewer - Exception during model load:', error);
      createFallbackModel(error.message);
    }
  }, [modelUrl]);

  return (
    <div className="relative w-full h-80 md:h-96">
      {isLoading && !modelLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 z-10">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neutral-600">Loading 3D Model...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-10">
          <div className="text-red-500 text-center p-4">
            <p className="font-semibold">Error Loading Model</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      )}
      
      <div
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden shadow-lg"
      />
      
      {!isLoading && modelLoaded && (
        <motion.div 
          className="absolute bottom-4 left-4 right-4 text-center z-10 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm font-medium text-neutral-800">
            <span className="text-primary">✓</span> 3D Model loaded successfully. 
            <span className="block text-xs text-neutral-600 mt-1">Drag to rotate, scroll to zoom</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeJSProductViewer; 