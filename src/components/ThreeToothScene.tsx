import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Eye } from 'lucide-react';

interface ThreeToothSceneProps {
  className?: string;
  badgeText?: string;
  autoRotateSpeed?: number;
}

export const ThreeToothScene: React.FC<ThreeToothSceneProps> = ({
  className = '',
  badgeText = 'Interactive 3D Dental Model',
  autoRotateSpeed = 0.008,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const initialCamZ = width < 480 ? 4.6 : 4.2;
    camera.position.set(0, 0.4, initialCamZ);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Tooth Group
    const toothGroup = new THREE.Group();
    scene.add(toothGroup);

    // Materials: Realistic Enamel (Pearly white with subtle cyan-blue subsurface glow)
    const enamelMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      emissive: new THREE.Color('#E0F2FE'),
      emissiveIntensity: 0.12,
      roughness: 0.18,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transmission: 0.25, // pearlescent translucency
      ior: 1.54,
      reflectivity: 0.9,
    });

    const rootMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F1F5F9'),
      roughness: 0.45,
      metalness: 0.02,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
    });

    // Crown: Sculpted molar crown with 4 distinct cusps and smooth anatomical contour
    const crownGroup = new THREE.Group();

    // Central crown body
    const crownBodyGeo = new THREE.CylinderGeometry(0.85, 0.7, 1.1, 32, 16);
    // Smooth deformation for organic tooth shape
    const pos = crownBodyGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Waist in the middle, flared top
      const factor = 1 + 0.15 * Math.sin((y + 0.5) * Math.PI);
      pos.setX(i, x * factor);
      pos.setZ(i, z * factor);
    }
    crownBodyGeo.computeVertexNormals();
    const crownBody = new THREE.Mesh(crownBodyGeo, enamelMaterial);
    crownBody.position.y = 0.5;
    crownGroup.add(crownBody);

    // 4 Cusps on top of crown
    const cuspGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const cuspOffsets = [
      { x: -0.42, z: -0.38, y: 1.05 },
      { x: 0.42, z: -0.38, y: 1.05 },
      { x: -0.44, z: 0.38, y: 1.05 },
      { x: 0.44, z: 0.38, y: 1.05 },
    ];

    cuspOffsets.forEach((offset) => {
      const cuspMesh = new THREE.Mesh(cuspGeo, enamelMaterial);
      cuspMesh.position.set(offset.x, offset.y, offset.z);
      cuspMesh.scale.set(1.0, 0.85, 1.0);
      crownGroup.add(cuspMesh);
    });

    toothGroup.add(crownGroup);

    // Roots: Double roots tapering smoothly down
    const createRoot = (xOffset: number, curveDir: number) => {
      const rootCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(xOffset * 0.5, 0.0, 0),
        new THREE.Vector3(xOffset * 0.7, -0.6, curveDir * 0.1),
        new THREE.Vector3(xOffset * 0.85, -1.2, curveDir * 0.15),
        new THREE.Vector3(xOffset * 0.65, -1.75, curveDir * 0.05),
      ]);
      const rootGeo = new THREE.TubeGeometry(rootCurve, 24, 0.32, 16, false);
      const rootMesh = new THREE.Mesh(rootGeo, rootMaterial);
      return rootMesh;
    };

    const rootLeft = createRoot(-0.6, -0.2);
    const rootRight = createRoot(0.6, 0.2);
    toothGroup.add(rootLeft);
    toothGroup.add(rootRight);

    // Orbiting Enamel Protection Shield Ring
    const ringCurve = new THREE.EllipseCurve(0, 0, 1.6, 1.6, 0, 2 * Math.PI, false, 0);
    const ringPoints = ringCurve.getPoints(64);
    const ringGeo = new THREE.BufferGeometry().setFromPoints(
      ringPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4, // cyan-500
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing = new THREE.Line(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    scene.add(orbitRing);

    // Floating Sparkle Particles around the tooth
    const particlesCount = 35;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 1.3 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[i] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i + 1] = radius * Math.sin(phi) + 0.2;
      particlePositions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8, // light blue/turquoise
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Studio Lighting setup
    // 1. Ambient light for soft filling
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 2. Main Key Light (Soft Warm Clinical White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // 3. Rim Light (Turquoise / Cyan accent reflection)
    const rimLight = new THREE.PointLight(0x06b6d4, 2.2, 10);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // 4. Soft Fill light
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-2, -1, 3);
    scene.add(fillLight);

    // Position tooth nicely centered
    toothGroup.position.set(0, 0.1, 0);
    toothGroup.rotation.set(0.15, -0.3, 0);

    // Mouse & Touch Drag Interaction Variables
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.15;
    let targetRotationY = -0.3;
    let targetTiltZ = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) {
        // Subtle hover tilt
        const rect = container.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const normX = (clientX - rect.left) / rect.width - 0.5;
        const normY = (clientY - rect.top) / rect.height - 0.5;
        targetRotationY += normX * 0.01;
        targetRotationX += normY * 0.01;
        return;
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      targetRotationY += deltaX * 0.012;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-0.6, Math.min(0.8, targetRotationX));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Responsive Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newW = entry.contentRect.width;
        const newH = entry.contentRect.height;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle auto-rotation when not dragging
      if (!isDragging) {
        targetRotationY += autoRotateSpeed;
      }

      // Smooth damping interpolation
      toothGroup.rotation.y += (targetRotationY - toothGroup.rotation.y) * 0.08;
      toothGroup.rotation.x += (targetRotationX - toothGroup.rotation.x) * 0.08;
      toothGroup.rotation.z += (targetTiltZ - toothGroup.rotation.z) * 0.08;

      // Floating oscillation
      toothGroup.position.y = 0.08 + Math.sin(elapsedTime * 1.8) * 0.07;

      // Orbit ring spin
      orbitRing.rotation.z = elapsedTime * 0.3;
      orbitRing.position.y = 0.1 + Math.sin(elapsedTime * 1.8) * 0.05;

      // Particles rotation
      particles.rotation.y = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      resizeObserver.disconnect();

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotateSpeed]);

  return (
    <div
      className={`relative w-full h-[250px] sm:h-[320px] lg:h-[400px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-400/20 via-sky-300/10 to-transparent blur-2xl pointer-events-none rounded-full transform scale-90" />

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
      />

      {/* Fallback if WebGL disabled */}
      {!webglSupported && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-50/90 rounded-3xl border border-slate-200">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 to-cyan-300 flex items-center justify-center text-white shadow-lg mb-4">
            <Sparkles className="w-12 h-12" />
          </div>
          <p className="font-semibold text-slate-800">SmileCraft Precision 3D Dental Model</p>
          <p className="text-xs text-slate-500 mt-1">Advanced 3D enamel visualization</p>
        </div>
      )}

      {/* Interactive Micro Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-sky-100 text-xs text-slate-600 font-medium">
          <RotateCw className="w-3.5 h-3.5 text-cyan-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{badgeText}</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>
      </div>

      {/* Floating feature pills around 3D tooth */}
      <div className="hidden sm:flex absolute top-6 -left-2 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-100 text-xs font-semibold text-slate-700 animate-bounce duration-1000">
        <span className="w-2 h-2 rounded-full bg-cyan-500" />
        <span>Biocompatible Enamel</span>
      </div>

      <div className="hidden sm:flex absolute bottom-14 -right-2 z-20 items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-100 text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500" />
        <span>3D Guided Precision</span>
      </div>
    </div>
  );
};
