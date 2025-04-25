import { Mesh, Texture } from "three"
import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../src/images/textures"
import { useStore } from "../hooks/useStore"

export const Ground = (): JSX.Element => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }))

  const [addCube] = useStore((state) => [state.addCube])

  const groundTextureType = groundTexture as Texture

  groundTextureType.repeat.set(100, 100)

  return (
    <mesh
      onClick={(event) => {
        event.stopPropagation()
        const [x, y, z] = Object.values(event.point).map((val) =>
          Math.ceil(val)
        )
        addCube(x, y, z)
      }}
      ref={ref as React.MutableRefObject<Mesh>}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTextureType} />
    </mesh>
  )
}
