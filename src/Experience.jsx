import { Html, OrbitControls, Text, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CoffeeSmoke from './components/CoffeeSmoke';
import gsap from 'gsap';
import * as THREE from 'three'
import { useMediaQuery } from 'react-responsive';

export default function Experience({handleChangeGoBack, goBack, setGoBack})
{

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [havered, setHavered] = useState(false);
  const [cameraClicked, setCameraClicked] = useState(false);
  // const [goBack, setGoBack] = useState(false)

  const [isCameraFocused, setIsCameraFocused] = useState(false);

  const chairTopRef = useRef(null);
  const coffeeCap = useRef(null);
  const groupRef = useRef(null);
  const glassPcpRef = useRef(null);
  const fan1 = useRef(null);
  const fan2 = useRef(null);
  const fan3 = useRef(null);

  const light1 = useRef(null);
  const light2 = useRef(null);
  const light3 = useRef(null);
  const light4 = useRef(null);
  const light5 = useRef(null);

  const controlsRef = useRef(null);
  const fansRef = useRef([]);

  const {nodes, scene} = useGLTF("myroom101_1.glb");
  const textuer = useTexture("/uv.webp")
  textuer.flipY = false;

  const {camera} = useThree();
  // console

  const environmentMap = new THREE.CubeTextureLoader()
    .setPath("skybox/")
    .load(["px.webp", "nx.webp", "py.webp", "ny.webp", "pz.webp", "nz.webp"]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes("pan")) {
         fansRef.current.push(child)
        }
      }
    });
  }, []);

    useEffect(() => {
      document.body.style.cursor = havered ? 'pointer': 'auto'
  }, [havered])

  // start postion
  useEffect(()=> {
      const tl = gsap.timeline({ease: 'power3.inOut'});
        tl.to(controlsRef.current.target, {
          x: isMobile ? 0.6943328891248476: 0.7651620114051008, 
          y: isMobile ? -0.5415665344991122: -0.5846945902584408,  
          z: isMobile ? 0.7166176792648505: 0.9677167197419472, 
          duration: 1
        })
        .to(camera.position, {
          x: isMobile? 9.318816387641604: 7.941026650323495,
          y: isMobile? 3.8715643590415527:1.7428696234005099, 
          z: isMobile? 7.984761599917075: 5.723373563724143,
        duration: 1}, 
        "-=1").call(() => {
          setCameraClicked(false)
        })
    // }
    setGoBack(false)
  }, [goBack])

  //cmaera clieced
  const handleKeyBoardClick = () => {
    if (isCameraFocused) return;
    // alert("HI")
    
    const tl = gsap.timeline({ease: 'power3.inOut'});
    tl.to(controlsRef.current.target, {
    x: isMobile? 0.5826066144984808: 0.0003335239686205252,
    y: isMobile? 0.1534613877540698: -0.03151868130506477, 
    z: isMobile? 1.1373112804022782: 1.144902345647147,
    duration: 1
    })
    .to(camera.position, {
    x: isMobile? 4.112949019862329:  2.340809749751318,
    y: isMobile? 0.15346138775407003: 0.008371321272778991, 
    z: isMobile? 1.2932962249994788: 1.2179671664594345,
    duration: 1}, 
    "-=1")
    .call(() => {
          setCameraClicked(true)
    })

    handleChangeGoBack()
  }
  
  useFrame((state) => {
    if (fan1.current) {
      fan1.current.rotation.z -= 0.015;
    }
    if (fan2.current){
      fan2.current.rotation.z -= 0.015;
    }
    if (fan3.current){
      fan3.current.rotation.z -= 0.015;
    }
    const time = state.clock.getElapsedTime();
    const baseAmplitude = Math.PI / 6;
    const bias = -1;

    if (chairTopRef.current) {
        const rotationOffset =baseAmplitude * (Math.sin (time * 0.5) - bias);
        chairTopRef.current.rotation.y = rotationOffset
    }
    if (isMobile) {
      if (chairTopRef.current) {
        if (cameraClicked) {
  
          chairTopRef.current.rotation.y = .9
        } else {
          gsap.to(chairTopRef.current.rotation, {
            y: .6,
            duration: .8
          })
        }
      }
    }
    })
  return <>

  <OrbitControls
    ref={controlsRef}
    enableDamping
    enablePan={false}
    enableRotate={!isCameraFocused}
    minPolarAngle={0}
    maxPolarAngle={Math.PI / 2}
    minAzimuthAngle={0}
    maxAzimuthAngle={Math.PI / 2}
    maxDistance={50}
    minDistance={1}  
  />

  <color args={["#444"]} attach="background"  />

  <group position={[2, -0.6, 1.5]} rotation={[0, 0, 0]} ref={groupRef}>
    <mesh  geometry={nodes.room.geometry}  position-y={-2}>
      <meshBasicMaterial map={textuer} />
      <Html
          transform
          wrapperClass='htmlScreen'
          distanceFactor={ .676}
          rotation-y={20.42}
          position-x={-1.86}
          position-z={-.378}
          position-y={2.686}
          occlude={'blending'}
      >
          <iframe src='https://creative-rolypoly-4bbeb4.netlify.app/' />
      </Html>
    </mesh>

    <mesh position={[-1.88, .4, -2.6]}geometry={nodes.glassPc.geometry}>
      <planeGeometry args={[1.1, .78, 2]}  /> 

      <meshPhysicalMaterial
            transmission={1}
            opacity={1}
            color={0xfbfbfb}
            metalness={0}
            roughness={0}
            ior={3}
            thickness={0.01}
            specularIntensity={1}
            envMap={environmentMap}
            envMapIntensity={1}
            depthWrite={false}
            specularColor={0xfbfbfb}
      />
    </mesh>

    <mesh ref={chairTopRef} geometry={nodes.chair.geometry} position={nodes.chair.position} rotation={nodes.chair.rotation} position-y={-0.8}>
          <meshBasicMaterial map={textuer} />
    </mesh>
    <mesh ref={light1} geometry={nodes.light1.geometry} position={nodes.light1.position} rotation={nodes.light1.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} color={"#7F55B1"} />
    </mesh>
    <mesh ref={light2} geometry={nodes.light2.geometry} position={nodes.light2.position} rotation={nodes.light2.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} color={"#9B7EBD"}  />
    </mesh>
    <mesh ref={light3} geometry={nodes.light3.geometry} position={nodes.light3.position} rotation={nodes.light3.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} color={"#F49BAB"} />
    </mesh>
    <mesh ref={light4} geometry={nodes.light4.geometry} position={nodes.light4.position} rotation={nodes.light4.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} color={"#FFE1E0"} />
    </mesh>

    <mesh ref={light5} geometry={nodes.light5.geometry} position={nodes.light5.position} rotation={nodes.light5.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} color={"#F564A9"}/>
    </mesh>

    <mesh ref={coffeeCap} geometry={nodes.cop.geometry} position={nodes.cop.position} rotation={nodes.cop.rotation} position-y={-2}>
          <meshBasicMaterial map={textuer} />
    </mesh>

    <mesh ref={fan1} geometry={nodes.fan1.geometry} position={nodes.fan2.position}  position-y={.642} position-x={-1.47}>
          <meshBasicMaterial color={"#ffffff"} />
    </mesh>
    <mesh ref={fan2} geometry={nodes.fan2.geometry} position={nodes.fan2.position}  position-y={.39}>
          <meshBasicMaterial color={"#ffffff"}/>
    </mesh>
    <mesh ref={fan3} geometry={nodes.fan3.geometry} position={nodes.fan3.position}  position-y={.13}>
          <meshBasicMaterial  color={"#ffffff"} />
    </mesh>

    <mesh 
      onClick={() => setCameraClicked(true)} 
      geometry={nodes.screen.geometry} 
      position={nodes.screen.position} 
      rotation={nodes.screen.rotation} 
      position-y={-2}
      // wrapperClass="test"
    >

    {!cameraClicked && <Text
          wrapperClass="text"
          onClick={handleKeyBoardClick}
          font='bangers-v20-latin-regular.woff'
          fontSize={.3}
          color="#fff"
          onPointerOver={() => setHavered(true)}
          onPointerOut={() => setHavered(false)}
          position={[-1.2, 2.1, -.3]}
          rotation={[0, 1.6, 0]}
          maxWidth={2}
          
          textAlign='center'
          >
          👆🏻click
    </Text>
    }
    </mesh>
  </group> 
  <CoffeeSmoke coffeeCap={coffeeCap} />

  </>
}