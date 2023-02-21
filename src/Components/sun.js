import * as React from 'react';
import { TextureLoader, THREE } from 'expo-three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import sunImg from '../../assets/sun.jpg';

function Globe() {
  const ref = React.useRef();
  const map = useLoader(TextureLoader, sunImg);
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
        <sphereGeometry args={[2.001, 64, 32]} />
        <meshPhongMaterial map={map} />
      </mesh>
    </group>
  );
}

export default function Sun(props) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
      <React.Suspense>
        <pointLight position={[0, 0, 10]} intensity={15} />
        <Globe />
        {/* <OrbitControls autoRotate enableZoom={false} /> */}
      </React.Suspense>
    </Canvas>
  );
}
