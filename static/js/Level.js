function Level(obj, stage) {
    //geometrys
    var geometry1 = new THREE.CubeGeometry(40, 80, 40, 1, 2, 1);
    var geometry2 = new THREE.PlaneBufferGeometry(40, 40, 20, 20); //podloga   
    //materials
    var material1 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/wall.png")
    });
    var material2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: false,
        map: THREE.ImageUtils.loadTexture("mats/floor.png")
    });
    var material3 = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/" + stage + "/direct_block.png")
    });
    var material4 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/door.png")
    });
    var material5 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/" + stage + "/answer1.png")
    });
    var material6 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/" + stage + "/answer2.png")

    });
    var material7 = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/" + stage + "/answer3.png")
    });
    var material8 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/empty.png")
    });
    var material9 = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0xffffff,
        shininess: 50,
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture("mats/teleport.png")
    });

    //--------------------------------------------------------------------------------------------


    var typ = ""
    var doors = []
    var container = new THREE.Object3D();
    for (i = 0; i < obj.level.length; i++) {

        typ = obj.level[i].type;
        //console.log(typ, i)
        switch (typ) {
            case "wall":
                var mesh = new THREE.Mesh(geometry1, material1);
                mesh.name = "wall"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                mesh.material.map.repeat.set(1, 2, 1); //gęstość powtarzania
                mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping;
                container.add(mesh);
                break;
            case "light":
                var myLight = new MyLight("rgb(255,140,0)").getLight();
                myLight.position.set(obj.level[i].x * 40 - 380, 8, obj.level[i].z * 40 - 380);
                container.add(myLight);
                break;
            case "direction":
                var mesh = new THREE.Mesh(geometry1, material3);
                mesh.name = "direction"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                container.add(mesh);
                break;
            case "door_quest1":
                var mesh = new THREE.Mesh(geometry1, material4);
                mesh.name = "door1"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                mesh.material.map.repeat.set(1, 2, 1); //gęstość powtarzania
                mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping;
                container.add(mesh);
                doors.push(mesh)
                break;
            case "door_quest2":
                var mesh = new THREE.Mesh(geometry1, material4);
                mesh.name = "door2"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                mesh.material.map.repeat.set(1, 2, 1); //gęstość powtarzania
                mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping;
                container.add(mesh);
                doors.push(mesh)
                break;
            case "door_quest3":
                var mesh = new THREE.Mesh(geometry1, material4);
                mesh.name = "door3"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                mesh.material.map.repeat.set(1, 2, 1); //gęstość powtarzania
                mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping;
                container.add(mesh);
                doors.push(mesh)
                break;
            case "answer1":
                var plane = new THREE.Mesh(geometry2, material5);
                plane.position.set(obj.level[i].x * 40 - 380, 1, obj.level[i].z * 40 - 380);
                plane.rotateX(Math.PI / 2);
                plane.name = "answer";
                plane.material.map.repeat.set(4, 4); //gęstość powtarzania
                plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
                container.add(plane)
                break;
            case "answer2":
                var plane = new THREE.Mesh(geometry2, material6);
                plane.position.set(obj.level[i].x * 40 - 380, 1, obj.level[i].z * 40 - 380);
                plane.rotateX(Math.PI / 2);
                plane.name = "answer";
                plane.material.map.repeat.set(4, 4);
                plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
                container.add(plane)
                break;
            case "answer3":
                var plane = new THREE.Mesh(geometry2, material7);
                plane.position.set(obj.level[i].x * 40 - 380, 1, obj.level[i].z * 40 - 380);
                plane.rotateX(Math.PI / 2);
                plane.name = "answer";
                plane.material.map.repeat.set(4, 4);
                plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
                container.add(plane)
                break;
            case "starter":
                var plane = new THREE.Mesh(geometry2, material2);
                plane.position.set(obj.level[i].x * 40 - 380, 1, obj.level[i].z * 40 - 380);
                plane.rotateX(Math.PI / 2);
                plane.name = "start";
                plane.material.map.repeat.set(4, 4);
                plane.material.map.wrapS = plane.material.map.wrapT = THREE.RepeatWrapping;
                container.add(plane)
                break;
            case "empty":
                var mesh = new THREE.Mesh(geometry1, material8);
                mesh.name = "empty"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                container.add(mesh);
                break;
            case "teleport":
                var mesh = new THREE.Mesh(geometry1, material9);
                mesh.name = "teleport"
                mesh.position.set(obj.level[i].x * 40 - 380, 40, obj.level[i].z * 40 - 380);
                mesh.castShadow = true;
                container.add(mesh);
                break;
        }

    }

    this.getLevel = function () {
        return container
    }
    this.openDoor = function (name) {
        for (var g = 0; g < doors.length; g++) {
            if (doors[g].name == name) {
                doors[g].position.y -= 0.5
            }
        }
    }
}
