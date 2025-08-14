import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense, useState } from 'react'
import { Html } from '@react-three/drei'
import Loader from './components/Loader.jsx'

export default function App() {
  const [ showGoBack , setShowGoBack] = useState(false)
  const [goBack, setGoBack] = useState(false)
  
  function handleChangeGoBack() {
    setShowGoBack(true);
  }

  function handleGoBack() {
    setShowGoBack(false)
    setGoBack(true)
  }

  return (
    <>
      <Canvas className='r3f' camera={{ 
        position: [1, 1, 1],
        fov: 45, rotation: [0, .5, 0] 
        }}>
          
        <Suspense fallback={<Html><Loader /></Html>}>
          <Experience handleChangeGoBack={handleChangeGoBack} goBack={goBack} setGoBack={setGoBack} />
        </Suspense>
      </Canvas >
      
      {showGoBack && 
        <div className='content-btn'>
          <button className='btn' onClick={handleGoBack}>
            Go Back → 
          </button>
        </div>
      }
    </>
  )
}
