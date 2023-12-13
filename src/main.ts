import { Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3 } from "babylonjs";

// Get the canvas DOM element
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Load the 3D engine
const engine = new Engine(canvas, true);

// CreateScene function that creates and return the scene
const createScene = () => {
    // Create a basic BJS Scene object
    let scene = new Scene(engine);

    // Create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    let camera = new FreeCamera('camera1', new Vector3(0, 5,-10), scene);

    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, false);

    // Create a basic light, aiming 0,1,0 - meaning, to the sky
    new HemisphericLight('light1', new Vector3(0,1,0), scene);

    // Create a built-in "sphere" shape; with 16 segments and diameter of 2
    let sphere = Mesh.CreateSphere('sphere1', 16, 2, scene);

    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;

    // Create a built-in "ground" shape
    Mesh.CreateGround('ground1', 6, 6, 2, scene);

    return scene;
};

// call the createScene function
const scene = createScene();

// run the render loop
engine.runRenderLoop(() => {
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', () => {
    engine.resize();
});
