/*
    klasa Game
*/
function Game() {
    var model = false;
    var mapa = false;
    var dis_ray = false;
    var local_stage = 1;
    var kat = 0;
    var kompas = new Kompas();
    kompas.init();

    var clock = new THREE.Clock();
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, // kąt patrzenia kamery (FOV - field of view)
        (window.innerWidth) / (window.innerHeight - 20), // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );
    var raycaster = new THREE.Raycaster();
    var mixer = "undefined";
    this.init = function () {

        var animacje = [];
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000); // kolor tła renderer'a
        renderer.setSize(window.innerWidth, window.innerHeight - 20); // wielkość renderer'a
        document.getElementById("container").appendChild(renderer.domElement);
        var geometry = new THREE.PlaneBufferGeometry(800, 800, 20, 20); //podloga
        var material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: false,
            map: THREE.ImageUtils.loadTexture("mats/floor.png")
        });
        var podloga = new THREE.Mesh(geometry, material);
        podloga.rotateX(0.5 * Math.PI);
        podloga.material.map.repeat.set(80, 80); //gęstość powtarzania
        podloga.material.map.wrapS = podloga.material.map.wrapT = THREE.RepeatWrapping;
        scene.add(podloga);
        //-----Swiatlo sceny---------

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        light.position.set(0, 400, 0);
        light.name = "light"
        //container.add(light);
        light.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
        scene.add(light)
        light.castShadow = false;
        //-------------------------------Kamera-------------------------------      
        var kat = 0;
        camera.position.x = Math.cos(kat) * 200
        camera.position.z = Math.sin(kat) * 200
        camera.position.y = 200;
        camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        });
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.addEventListener('change', function () {
            renderer.render(scene, camera)
        });
        var axis = new THREE.AxisHelper(500); // 200 - wielkość
        //scene.add(axis);
        var stats = new Stats();
        stats.showPanel(0);
        document.getElementById("stats").appendChild(stats.dom);
        //-------------------------Postac------------------------------------


        //genmodel();
        //-------------------------Animate scene-----------------------------
        function animateScene() {
            stats.begin();
            requestAnimationFrame(animateScene);
            renderer.render(scene, camera);
            camera.updateProjectionMatrix();
            camera.lookAt({
                x: 0,
                y: 0,
                z: 0
            });
            var delta = clock.getDelta();
            if (typeof mixer != "undefined") {
                mixer.update(delta)
            }
            //kamera
            if (document.getElementById("ch_kamera").checked == true) {
                var camVect = new THREE.Vector3(document.getElementById("range_1").value, document.getElementById("range_2").value, document.getElementById("range_3").value)
                //var camVect = new THREE.Vector3(200, 100, 0)
                var camPos = camVect.applyMatrix4(meshModel.matrixWorld);
                camera.position.x = camPos.x
                camera.position.y = camPos.y + 30
                camera.position.z = camPos.z
                camera.lookAt({
                    x: meshModel.position.x,
                    y: meshModel.position.y + 20,
                    z: meshModel.position.z
                })
            }
            ///------ray kolizja??-------
            var raycaster = new THREE.Raycaster();
            var player_vector1 = meshModel.position //pozycja playera
            var object_vector2 = meshModel.getWorldDirection() //pozycja obiektu przed nami
            object_vector2.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            var ray = new THREE.Ray(player_vector1, object_vector2)
            raycaster.ray = ray
            var intersects1 = raycaster.intersectObjects(plansza.children);
            //poruszanie
            if (w_up == true) {
                if (intersects1[0].distance > 15) {
                    meshModel.translateX(-1.5)
                }
                mixer.clipAction("stand").stop()
                mixer.clipAction("run").play();
                aktualna_animacja = "run";
            }
            if (s_down == true) {
                /*meshModel.translateX(1.5)
                mixer.clipAction("stand").stop()
                mixer.clipAction("run").play();
                aktualna_animacja = "run";*/
            }
            if (d_right == true) {
                kat -= 3;
                meshModel.rotation.y = (kat * (Math.PI / 180))
                //meshModel.rotation.y -= 0.05
                //console.log(meshModel.rotation.y)
                kompas.drawKompas(kat)

            }
            if (a_left == true) {
                kat += 3;
                meshModel.rotation.y = (kat * (Math.PI / 180))
                kompas.drawKompas(kat)
            }
            if (w_up == false && s_down == false) {
                mixer.clipAction("stand").play()
                mixer.clipAction("run").stop();
            }
            stats.end();
        }
        //animateScene();
        //------------------------Klawisze-----------------------------------
        var w_up = false
        var s_down = false
        var d_right = false
        var a_left = false
        var settings = false;
        document.addEventListener("keydown", onKeyDown, false); // naciśnięcie dowolnego klawisza
        document.addEventListener("keyup", onKeyUp, false); //zwolnienie dowolnego klawisza
        function onKeyDown(e) {
            var keyCode = e.which;
            //console.log(keyCode);
            if (e.which == 65) {
                a_left = true
            }
            if (e.which == 87) {
                w_up = true
            }
            if (e.which == 68) {
                d_right = true
            }
            if (e.which == 83) {
                s_down = true
            }
            if (e.which == 192) {
                if (settings == false) {
                    document.getElementById("options").style = "left:0"
                    settings = true
                } else {
                    document.getElementById("options").style = "left:-200"
                    settings = false
                }
            }
        }

        function onKeyUp(e) {
            var keyCode = e.which;
            if (e.which == 65) {
                a_left = false
            }
            if (e.which == 87) {
                w_up = false
            }
            if (e.which == 68) {
                d_right = false
            }
            if (e.which == 83) {
                s_down = false
            }

        }

        var interval = setInterval(function () {
            if (model == true && mapa == true) {
                animateScene();
                clearInterval(interval)
                //ekran aldowania
            }

        }, 1000)

    }

    //-------------------------------raycasting-------------------------
    document.addEventListener("mousedown", onMouseDown, false);
    // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // wektor (x,y) wykorzystany będzie do określenie pozycji myszy na ekranie


    function onMouseDown(event) {
        if (dis_ray == false) {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            var intersects = raycaster.intersectObjects(scene.children, true);
            console.log(intersects[0])
            if (intersects[0].object.name == "door1" || intersects[0].object.name == "door2" || intersects[0].object.name == "door3") {
                console.log("Widze drzwii")
                //window.alert("czy idzie czas????")
                var mojprom = ui.promptDrzwi(local_stage, intersects[0].object.name.split("r")[1])
                document.body.appendChild(mojprom)
                dis_ray = true
                //level.openDoor(intersects[0].object.name)
            } else if (intersects[0].object.name == "teleport") {
                console.log("zmiana stage")
                net.lvlUp();
            }
        }

    }
    //----  
    var walls = [];
    var answers = [];
    var doors = [];
    var directions = [];
    var start;
    var plansza;
    var levelData;
    var level;
    this.loadMap = function (stage) {
        local_stage = stage;
        scene.remove(plansza)
        walls = [];
        answers = [];
        doors = [];
        directions = [];
        levelData = new LevelData()
        level = new Level(levelData.getLevelData(stage), stage)
        plansza = level.getLevel()
        //console.log(plansza.children)
        for (var t = 0; t < plansza.children.length; t++) {
            //conosle.log(plansza.children[t].name)
            switch (plansza.children[t].name) {
                case "wall":
                    walls.push(plansza.children[t])
                    break;
                case "answer":
                    answers.push(plansza.children[t])
                    break;
                case "door1":
                    doors.push(plansza.children[t])
                    break;
                case "door2":
                    doors.push(plansza.children[t])
                    break;
                case "door3":
                    doors.push(plansza.children[t])
                    break;
                case "start":
                    start = plansza.children[t]
                    if (model == true) {
                        meshModel.position.x = start.position.x
                        meshModel.position.z = start.position.z
                    }
                    break;
                case "direction":
                    directions.push(plansza.children[t])
                    break;
            }
        }
        scene.add(plansza)

        mapa = true;
    }
    this.unray = function () {
        dis_ray = false;
    }
    this.openDoor = function (nrDrzwi) {
        var openig = setInterval(function () {
            //console.log(doors)    
            if (doors[nrDrzwi - 1].position.y < -39) {
                clearInterval(openig)
                dis_ray = false
            } else {
                level.openDoor(doors[nrDrzwi - 1].name)
            }
        }, 50)
    }

    this.loadGracz1 = function () {
        if (model == false) {
            console.log("Laduje gracza1");
            genmodel(modelMaterial1);
        }


    }
    this.loadGracz2 = function () {
        if (model == false) {
            console.log("Laduje gracza2");
            genmodel(modelMaterial2);
        }


    }
    this.removeGracz = function () {
        if (model == true) {
            console.log("remove gracza")
            scene.remove(meshModel);
            model = false;
        }
    }
    //===================
    var modelMaterial1 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("models/skeleton_blue.png"),
        morphTargets: true
    });
    var modelMaterial2 = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture("models/skeleton_red.png"),
        morphTargets: true
    });

    function genmodel(Materia) {
        var loader = new THREE.JSONLoader();
        loader.load('models/skeleton.js', function (geometry) {
            meshModel = new THREE.Mesh(geometry, Materia)
            meshModel.name = "skeleton";
            meshModel.position.y = 16.7;
            //meshModel.position.x = -20
            //meshModel.position.z = -20
            meshModel.position.x = start.position.x
            meshModel.position.z = start.position.z
            meshModel.scale.set(0.7, 0.7, 0.7);
            scene.add(meshModel);
            meshModel.castShadow = true;
            mixer = new THREE.AnimationMixer(meshModel);
            mixer.clipAction("stand").play();
            var aktualna_animacja = "Stand"
            scene.add(meshModel)
            model = true;


        });
    }

}
