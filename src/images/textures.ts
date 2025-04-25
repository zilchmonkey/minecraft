import {
  LoadingManager,
  NearestFilter,
  TextureLoader,
  RepeatWrapping,
  Texture,
} from "three"
import { dirtImg, logImg, grassImg, glassImg, woodImg } from "./images"

const loadingManager = new LoadingManager()
const textureLoader = new TextureLoader(loadingManager)

const dirtTexture = textureLoader.load(dirtImg)
const logTexture = textureLoader.load(logImg)
const grassTexture = textureLoader.load(grassImg)
const glassTexture = textureLoader.load(glassImg)
const woodTexture = textureLoader.load(woodImg)
const groundTexture = textureLoader.load(grassImg)

dirtTexture.magFilter = NearestFilter
logTexture.magFilter = NearestFilter
grassTexture.magFilter = NearestFilter
glassTexture.magFilter = NearestFilter
woodTexture.magFilter = NearestFilter

const groundTextureType = groundTexture as Texture
groundTextureType.magFilter = NearestFilter
groundTextureType.wrapS = RepeatWrapping
groundTextureType.wrapT = RepeatWrapping

export {
  dirtTexture,
  logTexture,
  grassTexture,
  glassTexture,
  woodTexture,
  groundTexture,
}
