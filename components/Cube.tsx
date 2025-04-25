import { Mesh } from "three"
import { useBox } from "@react-three/cannon"
import * as textures from "../src/images/textures"
import { useStore } from "../hooks/useStore"
import { useState } from "react"

interface CubeProps {
  position: [number, number, number]
  texture: string
}

export const Cube: React.FC<CubeProps> = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }))

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ])

  const activeTexture = textures[(texture + "Texture") as keyof typeof textures]

  return (
    <mesh
      ref={ref as React.MutableRefObject<Mesh>}
      onPointerMove={(event) => {
        event.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setIsHovered(false)
      }}
      onClick={(event) => {
        event.stopPropagation()
        let faceIndex: number = 0
        if (typeof event.faceIndex !== "undefined") {
          faceIndex = event.faceIndex
        } else {
          faceIndex = 1
        }
        const clickedFace = Math.floor(faceIndex / 2)
        const { x, y, z } = ref.current?.position || { x: 0, y: 0, z: 0 }
        if (event.altKey) {
          removeCube(x, y, z)
          return
        }

        switch (clickedFace) {
          case 0:
            addCube(x + 1, y, z)
            break
          case 1:
            addCube(x - 1, y, z)
            break
          case 2:
            addCube(x, y + 1, z)
            break
          case 3:
            addCube(x, y - 1, z)
            break
          case 4:
            addCube(x, y, z + 1)
            break
          case 5:
            addCube(x, y, z - 1)
            break
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  )
}
