import React, { useState } from 'react';
import ThreeJSProductViewer from './products/ThreeJSProductViewer';
import ThreeJSObjectViewer from './products/ThreeJSObjectViewer';

const ModelTest = () => {
  const [selectedModel, setSelectedModel] = useState('smartglasses');
  const [viewerType, setViewerType] = useState('object'); // 'product' or 'object'
  
  const models = [
    { id: 'smartwatch', name: 'Smartwatch' },
    { id: 'laptop', name: 'Laptop' },
    { id: 'smartphone', name: 'Smartphone' },
    { id: 'headphones', name: 'Headphones' },
    { id: 'smartglasses', name: 'Smart Glasses' },
    { id: '/assets/models/smartwatch.gltf', name: 'Smartwatch (Full Path)' },
    { id: '/assets/models/smartGlasses.gltf', name: 'Smart Glasses (Full Path)' },
    { id: '/models/smartwatch/model.gltf', name: 'Smartwatch (Model Path)' },
    { id: '/test-cube.gltf', name: 'Test Cube' },
    { id: '/duck.glb', name: 'Duck (GLB)' }
  ];
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">3D Model Test</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-medium mb-2">Select viewer type:</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setViewerType('product')}
            className={`px-4 py-2 rounded-md ${
              viewerType === 'product' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            GLTF Loader (Original)
          </button>
          <button
            onClick={() => setViewerType('object')}
            className={`px-4 py-2 rounded-md ${
              viewerType === 'object' 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Image Placeholder
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Select a model:</h2>
        <div className="flex flex-wrap gap-2">
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`px-4 py-2 rounded-md ${
                selectedModel === model.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Viewing: {models.find(m => m.id === selectedModel)?.name} with {viewerType === 'product' ? 'GLTF Loader' : 'Image Placeholder'}
        </h2>
        <p className="text-gray-500 mb-4">
          Model path: <code className="bg-gray-100 px-2 py-1 rounded">{selectedModel}</code>
        </p>
        
        <div className="h-[500px] border border-gray-200 rounded-lg">
          {viewerType === 'product' ? (
            <ThreeJSProductViewer 
              modelUrl={selectedModel}
              backgroundColor="#f8fafc"
            />
          ) : (
            <ThreeJSObjectViewer 
              modelUrl={selectedModel}
              backgroundColor="#f8fafc"
            />
          )}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Notice</h2>
        <p className="text-sm mb-2">
          <strong>3D models have been temporarily replaced with product images.</strong>
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          <li>This is a temporary solution until the 3D model functionality is updated</li>
          <li>Each product type displays a relevant image placeholder</li>
          <li>The full 3D functionality will be restored in a future update</li>
        </ul>
      </div>
    </div>
  );
};

export default ModelTest; 