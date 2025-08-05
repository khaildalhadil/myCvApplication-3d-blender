import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        className='r3f'
        shadows
        camera={{ position: [6, 3, 5], fov: 45, rotation: [0, .5, 0] }}
    >
        <Experience />
    </Canvas>
)