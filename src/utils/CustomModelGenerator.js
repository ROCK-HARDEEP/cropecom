/**
 * Creates a smartwatch model
 * @returns {THREE.Group} The smartwatch model
 */
createSmartwatch() {
  const group = new THREE.Group();
  
  // Watch body (main frame)
  const bodyGeometry = new THREE.BoxGeometry(1, 1.2, 0.1);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.9,
    roughness: 0.2
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  group.add(body);

  // Watch screen (slightly raised from the body)
  const screenGeometry = new THREE.BoxGeometry(0.9, 1.1, 0.02);
  const screenMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0x222222,
    roughness: 0.1,
    metalness: 0.0
  });
  const screen = new THREE.Mesh(screenGeometry, screenMaterial);
  screen.position.z = 0.06;
  group.add(screen);

  // Screen display content (time)
  const displayGeometry = new THREE.PlaneGeometry(0.85, 1.05);
  const displayMaterial = new THREE.MeshBasicMaterial({
    color: 0x3388ff,
    transparent: true,
    opacity: 0.9
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.z = 0.07;
  group.add(display);

  // Watch bands (top and bottom)
  const bandGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.05);
  const bandMaterial = new THREE.MeshStandardMaterial({
    color: 0x505050,
    roughness: 0.7,
    metalness: 0.1
  });
  
  // Top band
  const topBand = new THREE.Mesh(bandGeometry, bandMaterial);
  topBand.position.y = 1.2;
  topBand.rotation.x = -Math.PI / 8;
  group.add(topBand);
  
  // Bottom band
  const bottomBand = new THREE.Mesh(bandGeometry, bandMaterial);
  bottomBand.position.y = -1.2;
  bottomBand.rotation.x = Math.PI / 8;
  group.add(bottomBand);

  // Side button
  const buttonGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 12);
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.8,
    roughness: 0.2
  });
  const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button.rotation.z = Math.PI / 2;
  button.position.set(0.55, 0, 0);
  group.add(button);

  // Create a small light to illuminate the watch
  const light = new THREE.PointLight(0xffffff, 0.5);
  light.position.set(0, 0, 2);
  group.add(light);

  // Add shadow casting for all meshes
  group.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return group;
}

/**
 * Get a model based on the type
 * @param {string} type - The type of model to get
 * @returns {THREE.Object3D} The model
 */
getModel(type) {
  // Default to laptop if type is not recognized
  if (!type) return this.createLaptop();
  
  // Try to determine model type from URL if a URL is passed
  if (type.includes('/')) {
    const fileName = type.split('/').pop().toLowerCase();
    
    if (fileName.includes('laptop')) return this.createLaptop();
    if (fileName.includes('headphone')) return this.createHeadphones();
    if (fileName.includes('smartphone') || fileName.includes('phone')) return this.createSmartphone();
    if (fileName.includes('smartwatch') || fileName.includes('watch')) return this.createSmartwatch();
    
    // Default fallback
    return this.createLaptop();
  }
  
  // Direct type matching
  type = type.toLowerCase();
  if (type.includes('laptop')) return this.createLaptop();
  if (type.includes('headphone')) return this.createHeadphones();
  if (type.includes('smartphone') || type.includes('phone')) return this.createSmartphone();
  if (type.includes('smartwatch') || type.includes('watch')) return this.createSmartwatch();
  
  return this.createLaptop();
} 