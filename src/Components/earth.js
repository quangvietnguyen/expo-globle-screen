import * as React from 'react';
import { TextureLoader, THREE } from 'expo-three';
import { Canvas, useFrame, useLoader } from '@react-three/fiber/native';
import earthDayImg from '../../assets/earth.jpeg';
import earthNightImg from '../../assets/earth-night.jpeg';
import bumpImg from '../../assets/bump.jpeg';
import cloudImg from '../../assets/cloud.png';
import { OrbitControls } from '@react-three/drei/native';

function Globe() {
  const ref = React.useRef();
  const [earthImg, setEarthImg] = React.useState(earthDayImg);
  const handlerTap = () => {
    setEarthImg((previousState) =>
      previousState === earthDayImg ? earthNightImg : earthDayImg
    );
  };
  const map = useLoader(TextureLoader, earthImg);
  const bumpMap = useLoader(TextureLoader, bumpImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = -(clock.getElapsedTime() / 12);
  });
  return (
    <group ref={ref} onClick={handlerTap}>
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
        <meshPhongMaterial map={map} bumpMap={bumpMap} />
      </mesh>
    </group>
  );
}

function Cloud() {
  const ref = React.useRef();
  const cloud = useLoader(TextureLoader, cloudImg);
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() / 200;
  });
  return (
    <mesh visible ref={ref}>
      <sphereGeometry args={[2.01, 64, 32]} />
      <meshPhongMaterial map={cloud} transparent={true} />
    </mesh>
  );
}

function Circle() {
  return (
    <mesh>
      <circleGeometry args={[2.2, 64]} />
      <meshBasicMaterial color="white" transparent={true} opacity={0.12} />
    </mesh>
  );
}

export default function ReactThreeFiber(props) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 40, far: 10000 }}>
      <React.Suspense>
        <pointLight position={[5, 5, 10]} />
        <Globe />
        <Cloud />
        {/* <Circle /> */}
        <OrbitControls />
      </React.Suspense>
    </Canvas>
  );
}
