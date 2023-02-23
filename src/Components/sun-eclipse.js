import * as React from 'react';
import { TextureLoader, THREE } from 'expo-three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import moonImg from '../../assets/moon.jpeg';
import sunImg from '../../assets/sun.jpg';

function SunCore() {
  const ref = React.useRef();
  const map = useLoader(TextureLoader, sunImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = -(clock.getElapsedTime() / 100);
    // ref.current.rotation.x = -(clock.getElapsedTime() / 100);
  });
  return (
    <group ref={ref}>
      <rectAreaLight
        intensity={1}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <rectAreaLight
        intensity={1}
        position={[-10, -10, -10]}
        width={1000}
        height={10}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <mesh visible castShadow position={[0, 0, 0]} rotateOnAxis>
        <sphereGeometry args={[4, 64, 32]} />
        <meshPhongMaterial map={map} />
      </mesh>
    </group>
  );
}

function Sun() {
  const ref = React.useRef();
  return (
    <group ref={ref} position={[0, 0, -20]}>
      <SunCore />
    </group>
  );
}

function MoonCore() {
  const ref = React.useRef();
  const map = useLoader(TextureLoader, moonImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 200;
  });
  return (
    <group ref={ref}>
      <rectAreaLight
        intensity={1}
        position={[10, 10, 10]}
        width={10}
        height={1000}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <rectAreaLight
        intensity={1}
        position={[-10, -10, -10]}
        width={1000}
        height={10}
        onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
      />
      <mesh visible castShadow position={[0, 0, -5]}>
        <sphereGeometry args={[1, 64, 32]} />
        <meshPhongMaterial map={map} />
      </mesh>
    </group>
  );
}

export default function SunEclipse() {
  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 40, far: 10000 }}>
      <React.Suspense>
        <pointLight position={[0, 0, -6]} intensity={20} />
        <Sun />
        <MoonCore />
      </React.Suspense>
    </Canvas>
  );
}
