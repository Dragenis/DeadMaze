function Kompas() {
    var img = null,
        needle = null,
        ctx = null,
        degrees = 0;

    function clearCanvas() {
        ctx.clearRect(0, 0, 200, 200);
    }

    function draw() {
        clearCanvas();
        ctx.drawImage(img, 0, 0);
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate(0);
        ctx.drawImage(needle, -100, -100);
        ctx.restore();
        degrees += 5;
    }

    function imgLoaded() {
        draw()
    }
    this.drawKompas = function (kat) {
        clearCanvas();
        ctx.drawImage(img, 0, 0);
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate(-kat * (Math.PI / 180));
        ctx.drawImage(needle, -100, -100);
        ctx.restore();

    }
    this.init = function () {
        var canvas = document.getElementById('kompas');

        if (canvas.getContext('2d')) {
            ctx = canvas.getContext('2d');
            needle = new Image();
            needle.src = 'mats/kompas/needle.png';
            img = new Image();
            img.src = 'mats/kompas/compass.png';

            img.onload = imgLoaded;
        } else {
            console.log("Canvas not supported!");
        }
    }
}
