import { Physics } from "@react-three/cannon"
import { Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Player } from "../components/Player"
import { Ground } from "../components/Ground"
import { FPV } from "../components/FPV"
import { Cubes } from "../components/Cubes"
import { TextureSelector } from "../components/TextureSelector"
import { Menu } from "../components/Menu"

const isMobile = /Mobi|Tablet|iPad|iPhone|Android/i.test(navigator.userAgent)

function App() {
  if (isMobile) {
    return <p>Please use your desktop computer</p>
  } else {
    return (
      <>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={1.5} />
          <FPV />
          <Physics>
            <Player />
            <Cubes />
            <Ground />
          </Physics>
        </Canvas>
        <div className="absolute centered cursor">+</div>
        <TextureSelector />
        <Menu />
      </>
    )
  }
}

export default App
