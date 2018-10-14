import * as BABYLON from 'babylonjs';


var canvas = document.getElementById('renderCanvas');


// Инициализация самого BABYLON

var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});


 var createScene = function () {


    // Создание сцены

    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    // scene.clearColor = new BABYLON.Color4(0,0,0,0.001); 
    scene.clearColor = new BABYLON.Color4(0,0,0,0.11); 



    // Инициализация камеры

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI/ 2, 22, new BABYLON.Vector3(0, 4, 0), scene);

    camera.attachControl(canvas, true);



    camera.panningSensibility = 0;


    // Отключение возможности обзора с помощью мыши/тача
    camera.inputs.clear();



    // Свет - вообще он тут, возможно, не нужон, но пускай будет
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

    // var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);






     /**
      *  Creating and animating cube-emitter 
      *  Создание и анимация куба-эмитера
      *  
      */


    var aniBox = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

    aniBox.position = new BABYLON.Vector3(0, 30, 0);



    var rotatingX = new BABYLON.Animation(

        "rotation",

        "rotation.x",

        15,

        BABYLON.Animation.ANIMATIONTYPE_FLOAT,

        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE

    );

     var rotatingY = new BABYLON.Animation(

        "rotation",

        "rotation.y",

        15,

        BABYLON.Animation.ANIMATIONTYPE_FLOAT,

        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE

    );



    const ykeys = [

        {frame: 0, value: Math.PI},

        {frame: 60, value: 4 * Math.PI / 2 }

    ];



    const xkeys = [

        {frame: 0, value: Math.PI / 8 },

        {frame: 30, value:  0},

        {frame: 60, value:  -(Math.PI / 8) }

    ];





    rotatingX.setKeys(xkeys);

    rotatingY.setKeys(ykeys);

    

    aniBox.animations.push(rotatingX);

    aniBox.animations.push(rotatingY);



    scene.beginAnimation(aniBox, 0, 100, true);













     /**
      *  Animating ArcRotateCamera
      *  Анимация перемещения орбитальной камеры
      */
    const animCamAlpha = new BABYLON.Animation("animCam", "alpha", 5,

            BABYLON.Animation.ANIMATIONTYPE_FLOAT,

            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);



    let keysAlpha = [];

    keysAlpha.push({

            frame: 0,

            value: 0

    });

    keysAlpha.push({

            frame: 100,

            value: 2 * Math.PI

    });





    animCamAlpha.setKeys(keysAlpha);



    camera.animations.push(animCamAlpha);

    scene.beginAnimation(camera, 0, 100, true);












    /**

     * Particle System 

     */




    // При возможности используем рендеринг на gpu
    if(BABYLON.GPUParticleSystem.IsSupported){

        var particleSystem = new BABYLON.GPUParticleSystem("particles", { capacity:70000 }, scene);

    }

    else{

        var particleSystem = new BABYLON.ParticleSystem("particles", 20000, scene);

    }

    

   



    //Текстура частицы
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);


    // Параметры эмитера
    particleSystem.emitter = aniBox;

    particleSystem.minEmitBox = new BABYLON.Vector3(-15, -0.5, -10); 

    particleSystem.maxEmitBox = new BABYLON.Vector3(15, -0.5, 10);

    // particleSystem.minEmitBox = new BABYLON.Vector3(-1, -0.5, -1); 

    // particleSystem.maxEmitBox = new BABYLON.Vector3(1, -0.5, 1);



    

    // Начальное ускорение частиц
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 1.5;


    // 
    // particleSystem.updateSpeed = 0.005;







    // Установка цветов - странный rgb(a?) - значение каждого канала в диапазоне 0-1

    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);

    particleSystem.colorDead = new BABYLON.Color4(0.2, 0.2, 0.2, 0.0);





    // Время жизни частицы
    particleSystem.minLifeTime = 2;

    particleSystem.maxLifeTime = 5;



    // Интенсивность генерации

    particleSystem.emitRate = 10000;



    // Диапазон размеров частиц

    particleSystem.minSize = 0.08;

    particleSystem.maxSize = 0.15;





    // Вектора, определяющие направление созданной частицы
    particleSystem.direction1 = new BABYLON.Vector3(-20, -10, 15);

    particleSystem.direction2 = new BABYLON.Vector3(15, 5, -20);



    
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);



    

     // штука изменяет ускорение частицы в зависимости от прожитого ей времени
    particleSystem.addVelocityGradient(0, 1);

    // particleSystem.addVelocityGradient(0.5, 0);

    particleSystem.addVelocityGradient(1, 0.2);



    // particleSystem.addLimitVelocityGradient(0, 0.5);

    // particleSystem.addLimitVelocityGradient(1.0, 3);

    //  particleSystem.addLimitVelocityGradient(0, 15);

    //  particleSystem.addLimitVelocityGradient(1, 15);    

    // particleSystem.addLimitVelocityGradient(0, 0.5, 0.8);

    // particleSystem.addLimitVelocityGradient(1.0, 3, 4);

    



    



    particleSystem.start();











    

    








     /*********************************Start World Axes********************/



     /*

    var showAxis = function (size) {

        var makeTextPlane = function (text, color, size) {

            var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);

            dynamicTexture.hasAlpha = true;

            dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);

            var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);

            plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);

            plane.material.backFaceCulling = false;

            plane.material.specularColor = new BABYLON.Color3(0, 0, 0);

            plane.material.diffuseTexture = dynamicTexture;

            return plane;

        };



        var axisX = BABYLON.Mesh.CreateLines("axisX", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),

            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)

        ], scene);

        axisX.color = new BABYLON.Color3(1, 0, 0);

        var xChar = makeTextPlane("X", "red", size / 10);

        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

        var axisY = BABYLON.Mesh.CreateLines("axisY", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),

            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)

        ], scene);

        axisY.color = new BABYLON.Color3(0, 1, 0);

        var yChar = makeTextPlane("Y", "green", size / 10);

        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),

            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)

        ], scene);

        axisZ.color = new BABYLON.Color3(0, 0, 1);

        var zChar = makeTextPlane("Z", "blue", size / 10);

        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    };



    */

    

    /***************************End World Axes***************************/



    // showAxis(8);



    /*******************************Local Axes****************************/

    /*

    function localAxes(size) {

        var pilot_local_axisX = BABYLON.Mesh.CreateLines("pilot_local_axisX", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),

            new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)

        ], scene);

        pilot_local_axisX.color = new BABYLON.Color3(1, 0, 0);



        pilot_local_axisY = BABYLON.Mesh.CreateLines("pilot_local_axisY", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),

            new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)

        ], scene);

        pilot_local_axisY.color = new BABYLON.Color3(0, 1, 0);



        var pilot_local_axisZ = BABYLON.Mesh.CreateLines("pilot_local_axisZ", [

            new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),

            new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)

        ], scene);

        pilot_local_axisZ.color = new BABYLON.Color3(0, 0, 1);



        var local_origin = BABYLON.MeshBuilder.CreateBox("local_origin", { size: 1 }, scene);

        local_origin.isVisible = false;



        pilot_local_axisX.parent = local_origin;

        pilot_local_axisY.parent = local_origin;

        pilot_local_axisZ.parent = local_origin;



        return local_origin;



    }

    */

    /*******************************End Local Axes****************************/






    return scene;



};



// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
  engine.resize();
});
