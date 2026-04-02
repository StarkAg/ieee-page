import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particlePositions = new Float32Array(
  Array.from({ length: 150 }, () => [
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.1) * 8,
    (Math.random() - 0.5) * 10,
  ]).flat(),
);

function Drift({ children, position, speed = 1, amplitude = 0.35 }) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(elapsed * speed) * amplitude;
    group.current.rotation.x += 0.0015;
    group.current.rotation.y += 0.0025;
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}

function Compass(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.18;
    group.current.rotation.y += 0.004;
  });

  return (
    <group ref={group} {...props}>
      <mesh>
        <torusGeometry args={[0.9, 0.08, 18, 72]} />
        <meshStandardMaterial color="#c7a35c" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.14, 1.2, 0.08]} />
        <meshStandardMaterial color="#e8d9bd" metalness={0.2} roughness={0.42} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.14, 1.2, 0.08]} />
        <meshStandardMaterial color="#7a96d6" metalness={0.28} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.2, 0.2, 0.18, 32]} />
        <meshStandardMaterial color="#3b2412" metalness={0.55} roughness={0.25} />
      </mesh>
    </group>
  );
}

function OrbitRing(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    group.current.rotation.x = 0.8 + Math.sin(elapsed * 0.6) * 0.08;
    group.current.rotation.y = elapsed * 0.28;
  });

  return (
    <group ref={group} {...props}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.03, 16, 72]} />
        <meshStandardMaterial color="#c18b3f" emissive="#6b4118" emissiveIntensity={0.4} />
      </mesh>
      <mesh rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[1.4, 0.015, 16, 72]} />
        <meshStandardMaterial color="#c7a35c" emissive="#7d5f2d" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function CoinStack(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = state.clock.getElapsedTime() * 0.24;
  });

  return (
    <group ref={group} {...props}>
      {[-0.42, -0.14, 0.14, 0.42].map((x, index) => (
        <mesh key={x} position={[x, index * 0.11, 0]}>
          <cylinderGeometry args={[0.17, 0.17, 0.08, 28]} />
          <meshStandardMaterial color="#d3b06a" metalness={0.92} roughness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function TreasureChest(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    group.current.rotation.y = -0.28 + Math.sin(elapsed * 0.5) * 0.12;
    group.current.position.y = props.position[1] + Math.sin(elapsed * 1.1) * 0.07;
  });

  return (
    <group ref={group} {...props}>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.15, 0.68, 0.82]} />
        <meshStandardMaterial color="#4b2c19" metalness={0.2} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.38, -0.08]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[1.18, 0.34, 0.8]} />
        <meshStandardMaterial color="#754422" metalness={0.18} roughness={0.66} />
      </mesh>
      <mesh position={[0, 0.02, 0.42]}>
        <boxGeometry args={[0.16, 0.24, 0.08]} />
        <meshStandardMaterial color="#d6b35d" metalness={0.85} roughness={0.22} />
      </mesh>
    </group>
  );
}

function ContractSheets(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    group.current.rotation.x = -0.18 + Math.sin(elapsed * 0.8) * 0.08;
    group.current.rotation.z = Math.cos(elapsed * 0.7) * 0.12;
  });

  return (
    <group ref={group} {...props}>
      <mesh>
        <boxGeometry args={[1.08, 0.04, 1.42]} />
        <meshStandardMaterial color="#eadfc7" roughness={0.94} />
      </mesh>
      <mesh position={[0.12, 0.05, 0.05]} rotation={[0.06, 0.1, 0.08]}>
        <boxGeometry args={[1, 0.03, 1.3]} />
        <meshStandardMaterial color="#f3ead7" roughness={0.92} />
      </mesh>
      <mesh position={[-0.28, 0.06, 0.2]}>
        <boxGeometry args={[0.18, 0.06, 0.18]} />
        <meshStandardMaterial color="#4f7fff" metalness={0.3} roughness={0.35} />
      </mesh>
    </group>
  );
}

function SignalCrystal(props) {
  const mesh = useRef(null);

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    mesh.current.rotation.x += 0.008;
    mesh.current.rotation.y += 0.011;
    mesh.current.position.y = props.position[1] + Math.sin(elapsed * 1.6) * 0.12;
  });

  return (
    <mesh ref={mesh} {...props}>
      <icosahedronGeometry args={[0.56, 0]} />
      <meshStandardMaterial color="#d27a35" emissive="#7a3115" emissiveIntensity={0.72} />
    </mesh>
  );
}

function GrowthBars(props) {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.45) * 0.16;
  });

  return (
    <group ref={group} {...props}>
      {[0.6, 1, 1.45].map((height, index) => (
        <mesh key={height} position={[index * 0.38 - 0.38, height / 2 - 0.25, 0]}>
          <boxGeometry args={[0.24, height, 0.24]} />
          <meshStandardMaterial
            color={index === 2 ? "#d3b06a" : "#a6492e"}
            emissive={index === 2 ? "#725a2a" : "#5d170d"}
            emissiveIntensity={0.24}
            metalness={0.45}
            roughness={0.34}
          />
        </mesh>
      ))}
    </group>
  );
}

function OceanPlane() {
  const mesh = useRef(null);

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const geometry = mesh.current.geometry;
    const position = geometry.attributes.position;

    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const wave =
        Math.sin(x * 1 + elapsed * 0.9) * 0.12 + Math.cos(y * 1.45 + elapsed * 1.18) * 0.08;
      position.setZ(index, wave);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2.24, 0, 0]} position={[0, -2.45, -3.1]}>
      <planeGeometry args={[18, 12, 32, 32]} />
      <meshStandardMaterial
        color="#3d2516"
        metalness={0.14}
        roughness={0.24}
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

function ParticleField() {
  return (
    <points position={[0, 0, -1.2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#d8b875" size={0.05} transparent opacity={0.42} />
    </points>
  );
}

function SceneRig() {
  const rig = useRef(null);

  useFrame((state) => {
    if (!rig.current) {
      return;
    }

    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, state.pointer.y * 0.16, 0.04);
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.2, 0.04);
  });

  return (
    <group ref={rig}>
      <Drift position={[-2.9, 1.2, 0.3]} speed={1.25} amplitude={0.42}>
        <Compass />
      </Drift>
      <Drift position={[-2.95, 1.18, 0.25]} speed={0.8} amplitude={0.18}>
        <OrbitRing />
      </Drift>
      <Drift position={[1.8, 0.3, 1.1]} speed={1.1} amplitude={0.28}>
        <CoinStack />
      </Drift>
      <Drift position={[2.85, -0.2, -0.4]} speed={1.15} amplitude={0.28}>
        <TreasureChest position={[0, 0, 0]} />
      </Drift>
      <Drift position={[-0.35, -0.15, 1.85]} speed={1.05} amplitude={0.22}>
        <ContractSheets rotation={[0.3, -0.4, -0.15]} />
      </Drift>
      <Drift position={[-1.05, 0.42, 2.2]} speed={1.4} amplitude={0.34}>
        <SignalCrystal position={[0, 0, 0]} />
      </Drift>
      <Drift position={[0.95, 1.05, 0.4]} speed={1.2} amplitude={0.3}>
        <GrowthBars />
      </Drift>
      <OceanPlane />
      <ParticleField />
    </group>
  );
}

export function OceanScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.45, 8], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <fog attach="fog" args={["#090705", 7, 17]} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 4, 5]} intensity={1.9} color="#f2d8a0" />
      <pointLight position={[-4, 2, 4]} intensity={12} distance={18} color="#b96a2f" />
      <pointLight position={[4, 0, 3]} intensity={7} distance={12} color="#d3ab5f" />
      <pointLight position={[0, -1, 2]} intensity={5} distance={10} color="#7c2a17" />
      <SceneRig />
    </Canvas>
  );
}
