function MyLight(kolor) {
    var container = new THREE.Object3D();

    function init() {
        var geometry = new THREE.ConeGeometry(5, 5, 5);
        var material = new THREE.MeshBasicMaterial({
            color: kolor,
            side: THREE.DoubleSide,
            wireframe: true
        });
        var cone = new THREE.Mesh(geometry, material);
        container.add(cone)
        var light = new THREE.PointLight(kolor, 5, 200, 3.14);
        light.position.set(0, 0, 0);
        light.name = "light"
        container.add(light);
        light.lookAt({
            x: 0,
            y: 50,
            z: 0
        });
        container.add(light)
        light.castShadow = false;
    }
    init();
    this.getLight = function () {
        return container;
    }
    this.changeLightColor = function (color) {
        light.color.setHex(color)
        console.log("zmiana koloru na " + color)
    }

}
