import { useCallback, useEffect, useState } from "react"

type KeyAction =
  | "moveForward"
  | "moveBackward"
  | "moveLeft"
  | "moveRight"
  | "jump"
  | "dirt"
  | "grass"
  | "glass"
  | "wood"
  | "log"

function actionByKey(key: string): KeyAction {
  const keyActionMap: Record<string, KeyAction> = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  }
  return keyActionMap[key]
}

export const useKeyboard = (): Record<KeyAction, boolean> => {
  const [actions, setActions] = useState<Record<KeyAction, boolean>>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  })

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code)
    if (actionByKey(event.code)) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        }
      })
    }
  }, [])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code)
    if (actionByKey(event.code)) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        }
      })
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return actions
}
