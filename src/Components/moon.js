import * as React from 'react';
import { TextureLoader, THREE } from 'expo-three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import moonImg from '../../assets/moon.jpeg';

function MoonCore() {
  const ref = React.useRef();
  const map = useLoader(TextureLoader, moonImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = -(clock.getElapsedTime() / 20);
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
      <mesh visible castShadow position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial map={map} />
      </mesh>
    </group>
  );
}

function MoonEclipse({ opacity }) {
  const ref = React.useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 200;
  });
  return (
    <mesh visible ref={ref}>
      <sphereGeometry args={[2.01, 64, 32]} />
      <meshPhongMaterial color="red" transparent={true} opacity={0.4} />
    </mesh>
  );
}

export default function Moon(props) {
  const [isMoonEclipse, setIsMoonEclipse] = React.useState(true);
  const [eclipseDarkness, setEclipseDarkness] = React.useState(0.4);
  const [intensity, setIntensity] = React.useState(1);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [z, setZ] = React.useState(10);
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
      <React.Suspense>
        <pointLight position={[x, y, z]} intensity={intensity} />
        <MoonCore />
        {isMoonEclipse && <MoonEclipse opacity={eclipseDarkness} />}
      </React.Suspense>
    </Canvas>
  );
}
