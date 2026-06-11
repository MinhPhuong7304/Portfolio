import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDRobot({ mode }) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    blinkTimer: 0,
    isBlinking: false,
    blinkDuration: 0.15,
    blinkElapsed: 0,
    currentColor: new THREE.Color('#f43f5e'),
    targetColor: new THREE.Color('#f43f5e'),
    scrollOffset: 0
  });

  const getAccentColor = () => {
    return mode === 'tester' ? '#10b981' : '#f43f5e'; // Emerald vs Rose
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.0; // Optimized camera depth for full viewport tracking

    let visibleHeight = 2 * Math.tan((45 * Math.PI) / 360) * camera.position.z;
    let visibleWidth = visibleHeight * (width / height);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    // Emissive glowing point lights inside/near drone eyes/engines
    const glowColor = new THREE.Color(getAccentColor());
    const glowLight = new THREE.PointLight(glowColor, 3.5, 10);
    glowLight.position.set(0, 0.2, 1);
    scene.add(glowLight);

    // 3. Robot Mesh Group
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Common Materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f293d,
      roughness: 0.15,
      metalness: 0.85,
      bumpScale: 0.05
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xecf0f3,
      roughness: 0.2,
      metalness: 0.1
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.95
    });

    // --- ROBOT HEAD ---
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.35;
    robotGroup.add(headGroup);

    // Head base (Spherical shape)
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32);
    headGeo.scale(1.15, 0.9, 1.0); // Squash head slightly for cute appearance
    const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
    headGroup.add(headMesh);

    // Visor black band (glass plate)
    const visorGeo = new THREE.SphereGeometry(0.505, 32, 16, 0, Math.PI * 2, 0.7, 0.6);
    visorGeo.scale(1.15, 0.5, 1.0);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      roughness: 0.05,
      metalness: 0.9
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.05, 0.02);
    headGroup.add(visorMesh);

    // Left and Right Eyes (Glowing cylinders)
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    eyeGeo.scale(1.3, 1.0, 0.3); // Make them oval horizontal screens
    
    const leftEye = new THREE.Mesh(eyeGeo, glowMaterial);
    leftEye.position.set(-0.16, 0.05, 0.44);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, glowMaterial);
    rightEye.position.set(0.16, 0.05, 0.44);
    headGroup.add(rightEye);

    // Ear bolts / antennas on sides
    const earGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
    const earL = new THREE.Mesh(earGeo, metalMaterial);
    earL.rotation.z = Math.PI / 2;
    earL.position.set(-0.58, 0.05, 0);
    headGroup.add(earL);

    const earR = new THREE.Mesh(earGeo, metalMaterial);
    earR.rotation.z = -Math.PI / 2;
    earR.position.set(0.58, 0.05, 0);
    headGroup.add(earR);

    // Small antennas
    const antGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 8);
    const antL = new THREE.Mesh(antGeo, metalMaterial);
    antL.rotation.z = -Math.PI / 8;
    antL.position.set(-0.52, 0.22, 0);
    headGroup.add(antL);

    const antR = new THREE.Mesh(antGeo, metalMaterial);
    antR.rotation.z = Math.PI / 8;
    antR.position.set(0.52, 0.22, 0);
    headGroup.add(antR);

    // Antenna tips
    const tipGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const tipL = new THREE.Mesh(tipGeo, glowMaterial);
    tipL.position.set(-0.56, 0.32, 0);
    headGroup.add(tipL);

    const tipR = new THREE.Mesh(tipGeo, glowMaterial);
    tipR.position.set(0.56, 0.32, 0);
    headGroup.add(tipR);

    // --- ROBOT BODY ---
    const bodyGroup = new THREE.Group();
    bodyGroup.position.y = -0.32;
    robotGroup.add(bodyGroup);

    // Neck joint
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
    const neckMesh = new THREE.Mesh(neckGeo, metalMaterial);
    neckMesh.position.y = 0.52;
    bodyGroup.add(neckMesh);

    // Main torso body (shield/egg shape)
    const torsoGeo = new THREE.SphereGeometry(0.32, 32, 32);
    torsoGeo.scale(1.0, 1.25, 0.9);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMaterial);
    torsoMesh.position.y = 0.15;
    bodyGroup.add(torsoMesh);

    // Torso metal armor plate chest
    const chestGeo = new THREE.SphereGeometry(0.28, 16, 16, 0, Math.PI, 0.2, 1.2);
    chestGeo.scale(0.9, 1.0, 1.0);
    const chestMesh = new THREE.Mesh(chestGeo, metalMaterial);
    chestMesh.position.set(0, 0.16, 0.08);
    chestMesh.rotation.y = Math.PI / 2;
    bodyGroup.add(chestMesh);

    // Left and Right thruster engines (on body sides)
    const thrusterGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.22, 16);
    const engineL = new THREE.Mesh(thrusterGeo, metalMaterial);
    engineL.rotation.z = Math.PI / 10;
    engineL.position.set(-0.36, 0.05, 0);
    bodyGroup.add(engineL);

    const engineR = new THREE.Mesh(thrusterGeo, metalMaterial);
    engineR.rotation.z = -Math.PI / 10;
    engineR.position.set(0.36, 0.05, 0);
    bodyGroup.add(engineR);

    // Engine exhaust glow rings
    const exhaustGeo = new THREE.RingGeometry(0.04, 0.07, 16);
    const exhaustL = new THREE.Mesh(exhaustGeo, glowMaterial);
    exhaustL.rotation.x = Math.PI / 2;
    exhaustL.position.set(-0.38, -0.07, 0);
    bodyGroup.add(exhaustL);

    const exhaustR = new THREE.Mesh(exhaustGeo, glowMaterial);
    exhaustR.rotation.x = Math.PI / 2;
    exhaustR.position.set(0.38, -0.07, 0);
    bodyGroup.add(exhaustR);

    // --- BOOST FIRE PARTICLE SYSTEM ---
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);
    const initialPositions = []; // To keep track of source thruster

    for (let i = 0; i < particleCount; i++) {
      // Half left engine, half right engine
      const isLeft = i < particleCount / 2;
      const startX = isLeft ? -0.38 : 0.38;
      const startY = -0.32 - 0.07;
      const startZ = 0;

      initialPositions.push({ x: startX, y: startY, z: startZ, left: isLeft });

      positions[i * 3] = startX;
      positions[i * 3 + 1] = startY - Math.random() * 0.8;
      positions[i * 3 + 2] = startZ;
      lifetimes[i] = Math.random(); // Start at random phase
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: glowColor,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const thrusterParticles = new THREE.Points(particleGeo, particleMat);
    robotGroup.add(thrusterParticles);




    // 4. Mouse movement tracking
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates relative to the window viewport [-1, 1]
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouseX = x;
      stateRef.current.targetMouseY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll lag tracking
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      // Convert scroll diff to translation offset and clamp it to prevent flying off canvas
      const rawOffset = diff * 0.015;
      stateRef.current.scrollOffset = Math.max(-1.5, Math.min(1.5, rawOffset));
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 5. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();
      const state = stateRef.current;

      // Color lerp
      state.targetColor.set(getAccentColor());
      state.currentColor.lerp(state.targetColor, 0.08);
      glowMaterial.color.copy(state.currentColor);
      glowLight.color.copy(state.currentColor);
      particleMat.color.copy(state.currentColor);

      // Blinking Eyes logic
      state.blinkTimer += delta;
      if (!state.isBlinking && state.blinkTimer > 3.2) {
        // Blinking triggers every ~3-4s
        state.isBlinking = true;
        state.blinkElapsed = 0;
        state.blinkTimer = Math.random() * 1.5; // Randomize next interval
      }

      if (state.isBlinking) {
        state.blinkElapsed += delta;
        const progress = state.blinkElapsed / state.blinkDuration;
        
        let eyeScaleY = 1.0;
        if (progress < 0.5) {
          // Closing eye
          eyeScaleY = THREE.MathUtils.lerp(1.0, 0.05, progress * 2);
        } else if (progress < 1.0) {
          // Opening eye
          eyeScaleY = THREE.MathUtils.lerp(0.05, 1.0, (progress - 0.5) * 2);
        } else {
          // Finished blink
          eyeScaleY = 1.0;
          state.isBlinking = false;
        }

        leftEye.scale.y = eyeScaleY;
        rightEye.scale.y = eyeScaleY;
      }

      // Hovering up and down floating animation
      const hoverY = Math.sin(time * 1.8) * 0.12;

      // Decay scroll lag offset
      state.scrollOffset += (0 - state.scrollOffset) * 0.06;

      // Compute target coordinates: restrict horizontal boundary to the right side of the screen
      // visibleWidth/2 is the right edge of screen. We keep the robot in the right-side margin.
      const minX = Math.min(visibleWidth * 0.18, visibleWidth / 2 - 1.2);
      const maxX = visibleWidth / 2 - 0.7;
      const marginY = visibleHeight / 2 - 0.7;
      
      // Map mouse X position from [-1, 1] to [minX, maxX] so it glides along the right side
      const tX = (state.targetMouseX + 1) / 2; // Normalize mouse X to [0, 1]
      const targetMouseWorldX = minX + tX * (maxX - minX);
      const targetMouseWorldY = state.targetMouseY * (visibleHeight / 2);

      const clampedTargetX = Math.max(minX, Math.min(maxX, targetMouseWorldX));
      const clampedTargetY = Math.max(-marginY, Math.min(marginY, targetMouseWorldY));

      // Ease current position towards target coordinates (flight physics)
      const flyEase = 0.035;
      const oldX = robotGroup.position.x;
      const oldY = robotGroup.position.y;
      
      robotGroup.position.x += (clampedTargetX - robotGroup.position.x) * flyEase;
      
      // Add scroll offset for Y inertia
      const targetY = clampedTargetY + hoverY + state.scrollOffset;
      robotGroup.position.y += (targetY - robotGroup.position.y) * flyEase;

      // Compute travel velocities
      const velX = robotGroup.position.x - oldX;
      const velY = robotGroup.position.y - oldY;
      const moveSpeed = Math.sqrt(velX * velX + velY * velY) / delta;

      // Push depth z back slightly when moving fast to create 3D travel depth
      const targetZ = Math.max(-0.6, -moveSpeed * 0.05);
      robotGroup.position.z += (targetZ - robotGroup.position.z) * 0.05;

      // Pitch tilt based on scroll velocity (leaning forward when moving down, backward when moving up)
      const scrollTiltX = -state.scrollOffset * 0.5;

      // Tilting body to bank into flight direction
      const targetTorsoRotZ = -Math.max(-0.4, Math.min(0.4, velX * 1.8)); // Roll bank tilt
      const targetTorsoRotX = Math.max(-0.3, Math.min(0.3, velY * 1.2)) + scrollTiltX; // Pitch bank tilt
      const targetTorsoRotY = Math.max(-0.4, Math.min(0.4, velX * 1.5)); // Yaw turn direction

      bodyGroup.rotation.y += (targetTorsoRotY - bodyGroup.rotation.y) * 0.08;
      bodyGroup.rotation.z += (targetTorsoRotZ - bodyGroup.rotation.z) * 0.08;
      bodyGroup.rotation.x += (targetTorsoRotX - bodyGroup.rotation.x) * 0.08;
      
      // Head tracks mouse relative to robot's current position to look directly at target
      const headTargetRotY = Math.max(-0.8, Math.min(0.8, (state.targetMouseX * (visibleWidth / 2) - robotGroup.position.x) * 0.25));
      const headTargetRotX = Math.max(-0.6, Math.min(0.6, -(state.targetMouseY * (visibleHeight / 2) - robotGroup.position.y) * 0.2));

      headGroup.rotation.y += (headTargetRotY - headGroup.rotation.y) * 0.1;
      headGroup.rotation.x += (headTargetRotX - headGroup.rotation.x) * 0.1;

      // Scale booster flame particles based on scroll velocity and fly speed (boosting)
      const scrollSpeed = Math.abs(state.scrollOffset);
      const totalSpeed = Math.max(scrollSpeed, moveSpeed * 0.08);
      particleMat.size = 0.045 + Math.min(0.08, totalSpeed * 0.06);
      particleMat.opacity = Math.min(0.95, 0.7 + totalSpeed * 0.4);

      // Update booster flames/fire particles
      const positionsAttr = thrusterParticles.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        lifetimes[i] += delta * (1.6 + totalSpeed * 2.0); // Animate faster when boosting
        if (lifetimes[i] > 1.0) {
          lifetimes[i] = 0.0;
        }

        const origin = initialPositions[i];
        
        // Thrusters flow downwards, dispersing on X/Z axis
        const t = lifetimes[i];
        
        // Tilt particle flow direction slightly matching drone movement
        const driftX = -velX * 1.5;
        const driftZ = -velY * 1.5;

        positionsAttr.setX(i, origin.x + driftX * t + (Math.random() - 0.5) * 0.1 * t);
        positionsAttr.setY(i, origin.y + hoverY - t * (0.8 + totalSpeed * 1.5)); // Spray longer when boosting
        positionsAttr.setZ(i, origin.z + driftZ * t + (Math.random() - 0.5) * 0.1 * t);
      }
      positionsAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      visibleHeight = 2 * Math.tan((45 * Math.PI) / 360) * camera.position.z;
      visibleWidth = visibleHeight * camera.aspect;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      headGeo.dispose();
      bodyMaterial.dispose();
      metalMaterial.dispose();
      glowMaterial.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      earGeo.dispose();
      antGeo.dispose();
      tipGeo.dispose();
      neckGeo.dispose();
      torsoGeo.dispose();
      chestGeo.dispose();
      thrusterGeo.dispose();
      exhaustGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

    };
  }, [mode]);

  return (
    <div className="three-robot-canvas-container">
      <div className="three-robot-canvas" ref={containerRef} />
    </div>
  );
}
