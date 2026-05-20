'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { damp } from '@/lib/damp';

const MAX_TILT = (15 * Math.PI) / 180; // ±15°
const DEG = Math.PI / 180;

type OrbitConfig = {
  rx: number;
  ry: number;
  rotZ: number;
  color: string;
  nodes: { offset: number; speed: number; color: string }[];
};

const ORBITS: OrbitConfig[] = [
  {
    rx: 3.2,
    ry: 0.8,
    rotZ: 0,
    color: '#5DCAA5',
    nodes: [{ offset: 0, speed: 0.5, color: '#5DCAA5' }],
  },
  {
    rx: 3.5,
    ry: 1.2,
    rotZ: 35 * DEG,
    color: '#5DCAA5',
    nodes: [
      { offset: 0, speed: 0.4, color: '#378ADD' },
      { offset: Math.PI, speed: 0.4, color: '#5DCAA5' },
    ],
  },
  {
    rx: 3.0,
    ry: 1.0,
    rotZ: -25 * DEG,
    color: '#5DCAA5',
    nodes: [{ offset: Math.PI / 2, speed: 0.6, color: '#185FA5' }],
  },
];

function ellipsePoints(rx: number, ry: number, segments = 128) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, 0));
  }
  return pts;
}

function OrbitNode({
  rx,
  ry,
  offset,
  speed,
  color,
}: {
  rx: number;
  ry: number;
  offset: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const a = offset + state.clock.elapsedTime * speed;
    ref.current.position.set(Math.cos(a) * rx, Math.sin(a) * ry, 0);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={4}
        toneMapped={false}
      />
    </mesh>
  );
}

function Orbit({ rx, ry, rotZ, color, nodes }: OrbitConfig) {
  const points = useMemo(() => ellipsePoints(rx, ry), [rx, ry]);
  return (
    <group rotation={[0, 0, rotZ]}>
      <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.3} />
      {nodes.map((n, i) => (
        <OrbitNode key={i} rx={rx} ry={ry} offset={n.offset} speed={n.speed} color={n.color} />
      ))}
    </group>
  );
}

export default function GlassOrb() {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    // Slow self-rotation (inner group only).
    if (spin.current) spin.current.rotation.y += 0.001;

    // Mouse parallax tilt (outer group), smoothed with damp.
    if (tilt.current) {
      const targetX = state.pointer.y * MAX_TILT;
      const targetY = state.pointer.x * MAX_TILT;
      tilt.current.rotation.x = damp(tilt.current.rotation.x, targetX, 4, dt);
      tilt.current.rotation.y = damp(tilt.current.rotation.y, targetY, 4, dt);
    }
  });

  return (
    <group ref={tilt}>
      {/* Cool-toned lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 4]} intensity={1.6} color="#cfe6ff" />

      <group ref={spin}>
        {/* Main glass sphere */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshTransmissionMaterial
            thickness={0.5}
            transmission={1}
            roughness={0.1}
            ior={1.4}
            chromaticAberration={0.05}
            anisotropy={0.3}
            color="#5DCAA5"
            samples={6}
            resolution={256}
            backside={false}
          />
        </mesh>

        {/* Inner colored core */}
        <mesh>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshBasicMaterial color="#378ADD" transparent opacity={0.4} toneMapped={false} />
        </mesh>

        {/* Orbits + glowing nodes */}
        {ORBITS.map((o, i) => (
          <Orbit key={i} {...o} />
        ))}
      </group>
    </group>
  );
}

export function GlassOrbCanvas({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 7], fov: 45 }}
    >
      <Suspense fallback={null}>
        <GlassOrb />
      </Suspense>
    </Canvas>
  );
}
