import { Float, Html, OrbitControls, Text, useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import CoffeeSmoke from './components/CoffeeSmoke';
import { HiMiniCursorArrowRays } from "react-icons/hi2";

export default function Experience()
{

     const [havered, setHavered] = useState(false);

     const [isCameraFocused, setIsCameraFocused] = useState(false);
     const chairTopRef = useRef(null);
     const coffeeCap = useRef(null);

     const controlsRef = useRef(null);

    const {nodes} = useGLTF("myRoomFinalOne.glb");
    const textuer = useTexture("/uv.jpg")
    textuer.flipY = false;
    console.log(nodes)

    useFrame((state) => {
     const time = state.clock.getElapsedTime();
     const baseAmplitude = Math.PI / 6;
     const bias = -1;


     if (chairTopRef.current) {
          const rotationOffset =baseAmplitude * (Math.sin (time * 0.5) - bias);
          chairTopRef.current.rotation.y = rotationOffset
     }
    })
    useEffect(() => {
         document.body.style.cursor = havered ? 'pointer': 'auto'

    }, [havered])

    function handleMoveCamera() {
     alert("Move the camera")
    }


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


        <color args={["#444"]} attach="background" />
          <mesh  geometry={nodes.Plane009.geometry}  position-y={-2}>
               <meshBasicMaterial map={textuer} />
               <Html
                    transform
                    wrapperClass='htmlScreen'
                    distanceFactor={ .676}
                    rotation-y={20.42}
                    position-x={-1.86}
                    position-z={-.383}
                    position-y={2.686}
                    occlude={'blending'}
               >
                    <iframe src='https://papaya-shortbread-ad861c.netlify.app/' />
               </Html>


          </mesh>

          <mesh ref={chairTopRef} geometry={nodes.chair.geometry} position={nodes.chair.position} rotation={nodes.chair.rotation} position-y={-0.8} >
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh geometry={nodes.light1.geometry} position={nodes.light1.position} rotation={nodes.light1.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh geometry={nodes.light2.geometry} position={nodes.light2.position} rotation={nodes.light2.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh geometry={nodes.light3.geometry} position={nodes.light3.position} rotation={nodes.light3.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh geometry={nodes.light4.geometry} position={nodes.light4.position} rotation={nodes.light4.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>

          <mesh geometry={nodes.light5.geometry} position={nodes.light5.position} rotation={nodes.light5.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh ref={coffeeCap} geometry={nodes.cop.geometry} position={nodes.cop.position} rotation={nodes.cop.rotation} position-y={-2}>
               <meshBasicMaterial map={textuer} />
          </mesh>
          <mesh 
               onClick={handleMoveCamera} 
               geometry={nodes.screen.geometry} 
               position={nodes.screen.position} 
               rotation={nodes.screen.rotation} 
               position-y={-2}
               // wrapperClass="test"
          >

               {/* <Float> */}
                    <Text
                         wrapperClass="text"
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
                         {/* <HiMiniCursorArrowRays /> */}
                         👆🏻click
                         {/* 👆🏻click The chair to 
                         use The computer */}
                    </Text>

               {/* </Float> */}

               {/* <Html 
                    transform
                    color='transparent'
                    distanceFactor={2}
                    position={[-.93, 2.02, -.3]}
                    rotation={[0, 1.57, 0]}
                    occlude={'blending'}
                    // zIndexRange={[10, 0]}
                    wrapperClass='textintop'
                    
               >
                    <HiMiniCursorArrowRays />
               </Html> */}
               {/* <meshBasicMaterial map={textuer} /> */}
          </mesh>
          {/* <mesh geometry={nodes.pan1.geometry} position={nodes.pan1.position} rotation={nodes.pan1.rotation}>
               <meshBasicMaterial map={textuer} />
          </mesh> */}
{/*


               <mesh geometry={nodes.topCop.geometry} position={nodes.topCop.position} rotation={nodes.topCop.rotation}>
                    <meshBasicMaterial map={textuer} />
               </mesh>
               


               <mesh geometry={nodes.Cube011.geometry} position={nodes.Cube011.position} rotation={nodes.Cube011.rotation}>
                    <meshBasicMaterial map={textuer} />
               </mesh> */}

               {/* <mesh geometry={nodes.pan.geometry} position={nodes.pan.position} rotation={nodes.pan.rotation} scale={3}>
                    <meshBasicMaterial map={textuer} />
               </mesh> */}

          <CoffeeSmoke coffeeCap={coffeeCap} />
    </>
}