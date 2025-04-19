import * as THREE from 'three';

/**
 * Utility class to generate custom 3D models as fallbacks
 * These models are more detailed than simple cubes
 */
export class CustomModelGenerator {
  /**
   * Create a stylized laptop model
   * @param {THREE.Scene} scene - The scene to add the model to
   * @returns {THREE.Group} The laptop model
   */
  static createLaptop() {
    const laptop = new THREE.Group();
    
    // Base/bottom part
    const baseGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    laptop.add(base);
    
    // Screen/top part
    const screenGeometry = new THREE.BoxGeometry(1.9, 0.05, 1.4);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = 0.7;
    screen.position.z = -0.7;
    screen.rotation.x = Math.PI / 6; // Angle the screen a bit
    laptop.add(screen);
    
    // Screen display
    const displayGeometry = new THREE.PlaneGeometry(1.8, 1.2);
    const displayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3366ff, 
      emissive: 0x1a1a1a,
      emissiveIntensity: 0.2,
      metalness: 0, 
      roughness: 0.1 
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.y = 0.7;
    display.position.z = -0.65;
    display.rotation.x = Math.PI / 6; // Match the screen angle
    display.position.y += 0.025; // Offset slightly from screen
    laptop.add(display);
    
    // Keyboard area
    const keyboardGeometry = new THREE.PlaneGeometry(1.8, 1.2);
    const keyboardMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444, 
      metalness: 0.2, 
      roughness: 0.8 
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.y = 0.05;
    keyboard.rotation.x = -Math.PI / 2;
    laptop.add(keyboard);
    
    // Setup shadows
    laptop.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    return laptop;
  }
  
  /**
   * Create a stylized headphones model
   * @returns {THREE.Group} The headphones model
   */
  static createHeadphones() {
    const headphones = new THREE.Group();
    
    // Headband
    const curve = new THREE.EllipseCurve(
      0, 0,                // Center x, y
      1, 1,                // x radius, y radius
      Math.PI, 0,          // Start angle, end angle
      true,                // Counterclockwise
      0                    // Rotation
    );
    
    const points = curve.getPoints(50);
    const bandGeometry = new THREE.BufferGeometry().setFromPoints(points);
    bandGeometry.setAttribute('position', new THREE.Float32BufferAttribute(
      points.map(p => [p.x, p.y, 0]).flat(), 3
    ));
    
    // Create a tube around the curve
    const path = new THREE.CatmullRomCurve3(
      points.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const tubeGeometry = new THREE.TubeGeometry(path, 64, 0.05, 16, false);
    
    const bandMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      metalness: 0.5, 
      roughness: 0.5 
    });
    const band = new THREE.Mesh(tubeGeometry, bandMaterial);
    headphones.add(band);
    
    // Left earpiece
    const earGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
    const earMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      metalness: 0.7, 
      roughness: 0.3 
    });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-1, 0, 0);
    leftEar.rotation.x = Math.PI / 2;
    headphones.add(leftEar);
    
    // Right earpiece
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(1, 0, 0);
    rightEar.rotation.x = Math.PI / 2;
    headphones.add(rightEar);
    
    // Left ear pad
    const padGeometry = new THREE.TorusGeometry(0.25, 0.08, 16, 32);
    const padMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      metalness: 0.2, 
      roughness: 0.9 
    });
    const leftPad = new THREE.Mesh(padGeometry, padMaterial);
    leftPad.position.set(-1, 0, 0);
    leftPad.rotation.x = Math.PI / 2;
    headphones.add(leftPad);
    
    // Right ear pad
    const rightPad = new THREE.Mesh(padGeometry, padMaterial);
    rightPad.position.set(1, 0, 0);
    rightPad.rotation.x = Math.PI / 2;
    headphones.add(rightPad);
    
    // Setup shadows
    headphones.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    return headphones;
  }
  
  /**
   * Create a stylized smartphone model
   * @returns {THREE.Group} The smartphone model
   */
  static createSmartphone() {
    const smartphone = new THREE.Group();
    
    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.08);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    smartphone.add(body);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(0.75, 1.5);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444, 
      emissive: 0x1a1a1a,
      emissiveIntensity: 0.3,
      metalness: 0, 
      roughness: 0.1 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.041;
    smartphone.add(screen);
    
    // Camera bump
    const cameraBumpGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.02);
    const cameraBumpMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      metalness: 0.9, 
      roughness: 0.1 
    });
    const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
    cameraBump.position.set(-0.25, 0.6, -0.05);
    smartphone.add(cameraBump);
    
    // Camera lens
    const lensGeometry = new THREE.CircleGeometry(0.05, 32);
    const lensMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111, 
      metalness: 1.0, 
      roughness: 0 
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(-0.25, 0.6, -0.035);
    smartphone.add(lens);
    
    // Home button
    const buttonGeometry = new THREE.CircleGeometry(0.06, 32);
    const buttonMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.z = 0.041;
    button.position.y = -0.7;
    smartphone.add(button);
    
    // Setup shadows
    smartphone.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    return smartphone;
  }
  
  /**
   * Create a stylized smartwatch model
   * @returns {THREE.Group} The smartwatch model
   */
  static createSmartwatch() {
    const smartwatch = new THREE.Group();
    
    // Watch body
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      metalness: 0.9, 
      roughness: 0.1 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    smartwatch.add(body);
    
    // Watch screen
    const screenGeometry = new THREE.CircleGeometry(0.4, 32);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      emissive: 0x1a1a1a,
      emissiveIntensity: 0.3,
      metalness: 0, 
      roughness: 0.1 
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.051;
    smartwatch.add(screen);
    
    // Watch band (top)
    const bandTopGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.05);
    const bandMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x444444, 
      metalness: 0.1, 
      roughness: 0.9 
    });
    const bandTop = new THREE.Mesh(bandTopGeometry, bandMaterial);
    bandTop.position.y = 0.6;
    smartwatch.add(bandTop);
    
    // Watch band (bottom)
    const bandBottomGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.05);
    const bandBottom = new THREE.Mesh(bandBottomGeometry, bandMaterial);
    bandBottom.position.y = -0.6;
    smartwatch.add(bandBottom);
    
    // Digital time display
    const timeGeometry = new THREE.PlaneGeometry(0.3, 0.15);
    const timeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00, 
      emissive: 0x00ff00,
      emissiveIntensity: 0.5,
      metalness: 0, 
      roughness: 0 
    });
    const timeDisplay = new THREE.Mesh(timeGeometry, timeMaterial);
    timeDisplay.position.z = 0.052;
    smartwatch.add(timeDisplay);
    
    // Crown/button
    const crownGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 16);
    const crownMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x888888, 
      metalness: 1.0, 
      roughness: 0.1 
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.rotation.z = Math.PI / 2;
    crown.position.set(0.55, 0, 0);
    smartwatch.add(crown);
    
    // Setup shadows
    smartwatch.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    return smartwatch;
  }
  
  /**
   * Create a stylized smart glasses model
   * @returns {THREE.Group} The smart glasses model
   */
  static createSmartGlasses() {
    const smartGlasses = new THREE.Group();
    
    // Glasses frame (top bar)
    const frameGeometry = new THREE.BoxGeometry(1.6, 0.05, 0.05);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222, 
      metalness: 0.8, 
      roughness: 0.2 
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.y = 0.1;
    smartGlasses.add(frame);
    
    // Nose bridge
    const bridgeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
    bridge.position.y = 0.05;
    smartGlasses.add(bridge);
    
    // Left lens
    const lensGeometry = new THREE.CircleGeometry(0.3, 32);
    const lensMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x88ccff, 
      transparent: true,
      opacity: 0.5,
      metalness: 0.2, 
      roughness: 0.1 
    });
    const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
    leftLens.position.set(-0.45, 0.1, 0.02);
    smartGlasses.add(leftLens);
    
    // Right lens
    const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
    rightLens.position.set(0.45, 0.1, 0.02);
    smartGlasses.add(rightLens);
    
    // Left temple/arm
    const templeGeometry = new THREE.BoxGeometry(0.05, 0.05, 1);
    const leftTemple = new THREE.Mesh(templeGeometry, frameMaterial);
    leftTemple.position.set(-0.8, 0.1, -0.5);
    leftTemple.rotation.x = Math.PI * 0.05; // Slight angle down
    smartGlasses.add(leftTemple);
    
    // Right temple/arm
    const rightTemple = new THREE.Mesh(templeGeometry, frameMaterial);
    rightTemple.position.set(0.8, 0.1, -0.5);
    rightTemple.rotation.x = Math.PI * 0.05; // Slight angle down
    smartGlasses.add(rightTemple);
    
    // Small LED indicator (tech feature)
    const ledGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.02);
    const ledMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00, 
      emissive: 0x00ff00,
      emissiveIntensity: 0.7,
      metalness: 0, 
      roughness: 0 
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(0.7, 0.15, 0.05);
    smartGlasses.add(led);
    
    // Setup shadows
    smartGlasses.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    
    return smartGlasses;
  }
  
  /**
   * Get a custom model based on the requested type
   * @param {string} modelType - The type of model to create (laptop, headphones, smartphone, smartwatch, smartglasses)
   * @returns {THREE.Group} The created model
   */
  static getModel(modelType) {
    console.log('CustomModelGenerator - getModel called with:', modelType);
    
    if (!modelType) {
      console.warn('CustomModelGenerator - No model type provided, defaulting to laptop');
      return this.createLaptop();
    }
    
    let type = modelType;
    
    // If a path is provided, extract the model type from it
    if (typeof modelType === 'string' && modelType.includes('/')) {
      console.log('CustomModelGenerator - Extracting model type from path:', modelType);
      const fileName = modelType.split('/').pop().toLowerCase();
      
      if (fileName.includes('laptop')) type = 'laptop';
      else if (fileName.includes('headphone')) type = 'headphones';
      else if (fileName.includes('smartphone') || fileName.includes('phone')) type = 'smartphone';
      else if (fileName.includes('smartwatch') || fileName.includes('watch')) type = 'smartwatch';
      else if (fileName.includes('smartglasses') || fileName.includes('glasses')) type = 'smartglasses';
      else {
        console.warn('CustomModelGenerator - Could not determine model type from path, defaulting to laptop');
        type = 'laptop';
      }
      
      console.log('CustomModelGenerator - Extracted model type:', type);
    }
    
    // Normalize the type string
    if (typeof type === 'string') {
      type = type.toLowerCase();
    }
    
    console.log('CustomModelGenerator - Creating model of type:', type);
    
    switch(type) {
      case 'laptop':
        return this.createLaptop();
      case 'headphones':
        return this.createHeadphones();
      case 'smartphone':
        return this.createSmartphone();
      case 'smartwatch':
        return this.createSmartwatch();
      case 'smartglasses':
        return this.createSmartGlasses();
      default:
        // Default fallback is a laptop
        console.warn('CustomModelGenerator - Unknown model type, defaulting to laptop for:', type);
        return this.createLaptop();
    }
  }
} 