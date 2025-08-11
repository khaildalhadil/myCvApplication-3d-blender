import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react'

import coffeeSmokeVertexShader from '../shaders/vertex.glsl';
import coffeeSmokeFregmentShader from '../shaders/fregment.glsl';

export default function CoffeeSmoke() {

  const meshRef = useRef();

  const perlinTextuer = useLoader(THREE.TextureLoader, "perlin.png");
  perlinTextuer.wrapS = perlinTextuer.wrapT = THREE.RepeatWrapping;

  const materialRef = useRef();

  const unifromRef = useRef({
    uTime: {value: 0},
    uPerlinTextuer: {value: perlinTextuer}
  })

  useFrame(({clock})=> {

    if (materialRef.current) {
      unifromRef.current.uTime.value = clock.getElapsedTime();
    }

  })


  return (
    
    <mesh
      ref={meshRef}
      position={[.85, -1, 2.34]}
    >
      <planeGeometry
        args={[1, 1, 16, 64]}
        onUpdate={(geometry) => {
          geometry.translate(0, 0.5, 0)
          geometry.scale(0.36, 0.9, 0.43)
        }}

      />

      <shaderMaterial 
        ref={materialRef}
        vertexShader={coffeeSmokeVertexShader}
        fragmentShader={coffeeSmokeFregmentShader}
        uniforms={unifromRef.current}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />

    </mesh>
  )
}
