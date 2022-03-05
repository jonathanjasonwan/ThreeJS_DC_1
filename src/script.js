import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three'

// Loader
const textureLoader  = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/bricknormal.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// const geometry = new THREE.SphereBufferGeometry(.5,64,64);
const geometry = new THREE.BoxGeometry(1,1,1);



// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0xffffff)
material.normalMap = normalTexture

// Mesh
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000,7) //2nd para is intensity
pointLight2.position.set(-1.5,1.5,-3)
// pointLight2.intensity = 1
scene.add(pointLight2)

//GUI for light 2
// const light2 = gui.addFolder("Light 2")

// light2.add(pointLight2.position,"x",-6, 6, 0.01) //gui.add(pointLight2.position,"x").min(-6).max(6).step(0.01)
// light2.add(pointLight2.position,"y",-3, 3, 0.01)
// light2.add(pointLight2.position,"z",-3, 3, 0.01)
// light2.add(pointLight2, "intensity",0,10,0.01)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper2)

// Light 3
const pointLight3 = new THREE.PointLight(0x18cdeb,7) //2nd param is intensity
pointLight3.position.set(2.2,-3,-2)
// pointLight2.intensity = 1
scene.add(pointLight3)

//GUI for light 3
// const light3 = gui.addFolder("Light 3")

// light3.add(pointLight3.position,"x",-6, 6, 0.01) //gui.add(pointLight3.position,"x").min(-6).max(6).step(0.01)
// light3.add(pointLight3.position,"y",-3, 3, 0.01)
// light3.add(pointLight3.position,"z",-3, 3, 0.01)
// light3.add(pointLight3, "intensity",0,10,0.01)

// const pointLightHelper3= new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointLightHelper3)

// const light3Color = {
//     color: 0xff0000
// }

// light3.addColor(light3Color,"color")
//     .onChange(()=>{
//         pointLight3.color.set(light3Color.color)
//     })

const rotGui = gui.addFolder("Rotation")
rotGui.add(cube.rotation,"x", -(Math.PI/180*90),(Math.PI/180*90),0.01)
rotGui.add(cube.rotation,"y", -(Math.PI/180*90),(Math.PI/180*90),0.01)
rotGui.add(cube.rotation,"z", -(Math.PI/180*90),(Math.PI/180*90),0.01)



/* Sizes  */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2
console.log(window.innerWidth)

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
    // console.log(event.clientX)
    // console.log(event.clientY)

}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // cube.rotation.y = .2 * elapsedTime

    cube.rotation.y += .5 * (targetX - cube.rotation.y)
    cube.rotation.x += .5 * (targetY - cube.rotation.x)
    cube.position.z += 1.5 * (targetY - cube.rotation.x)
    // console.log(targetY)
    // console.log(mouseY)
    // console.log(cube.rotation.x) //cube rotation x is vertical up down while target y is vertical position on the webpage as well
    // console.log(cube.rotation.y)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()