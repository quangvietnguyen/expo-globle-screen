import * as React from 'react';
import { TextureLoader, THREE } from 'expo-three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import saturnImg from '../../assets/saturn.jpeg';
import saturnRingImg from '../../assets/saturn-ring.png';

function Globe() {
  const ref = React.useRef();
  const map = useLoader(TextureLoader, saturnImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = -(clock.getElapsedTime() / 12);
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

function Ring() {
  const ref = React.useRef();
  const ring = useLoader(TextureLoader, saturnRingImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 200;
  });
  return (
    <mesh visible ref={ref}>
      <ringGeometry args={[2.5, 3, 100, 100, 6, 6]} />
      <meshPhongMaterial map={ring} />
    </mesh>
  );
}

export default function Mars(props) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
      <React.Suspense>
        <pointLight position={[0, 0, 10]} />
        <Globe />
        {/* <Ring /> */}
      </React.Suspense>
    </Canvas>
  );
}
