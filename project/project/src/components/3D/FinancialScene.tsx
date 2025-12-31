import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const CoinStack = () => {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={group}>
      {[...Array(5)].map((_, index) => (
        <mesh
          key={index}
          position={[0, index * 0.2, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[1, 1, 0.2, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

const GrowthChart = () => {
  const points = [];
  for (let i = 0; i < 5; i++) {
    points.push(new THREE.Vector3(i - 2, Math.pow(1.5, i) - 2, 0));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group position={[3, 0, 0]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#4CAF50" linewidth={2} />
      </line>
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
      ))}
    </group>
  );
};

const PiggyBank = () => {
  return (
    <group position={[-3, 0, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      {/* Snout */}
      <mesh position={[0.7, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.4, 0.8, 0.4]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
      <mesh position={[-0.4, 0.8, -0.4]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FF69B4" />
      </mesh>
    </group>
  );
};

const FinancialScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float
            speed={1.4}
            rotationIntensity={1}
            floatIntensity={2}
            floatingRange={[0, 0.5]}
          >
            <CoinStack />
            <GrowthChart />
            <PiggyBank />
          </Float>
        </PresentationControls>

        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
      </Canvas>
    </div>
  );
};

export default FinancialScene;
