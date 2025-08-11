import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { useState } from 'react'

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
        }}
        >
        <Experience handleChangeGoBack={handleChangeGoBack} goBack={goBack} setGoBack={setGoBack} />
        
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
