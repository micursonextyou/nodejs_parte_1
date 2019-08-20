var color = "#000000";
var tamano = 10;



function init() {



    let mouse = {
            click: false,
            move: false,
            pos: { x: 0, y: 0 },
            pos_prev: false
        }
        //canvas
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 300;

    //io
    const socket = io();

    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
    });

    canvas.addEventListener('mouseup', (e) => {
        mouse.click = false;
    });
    canvas.addEventListener('mousemove', (e) => {
        mouse.pos.x = e.layerX;
        mouse.pos.y = e.layerY;
        mouse.move = true;

    });
    socket.on('re_draw_lines', data => {
        const line = data.line;

        context.lineJoin = context.lineCap = 'round';
        context.strokeStyle = color;
        context.lineWidth = tamano;
        context.beginPath();


        context.moveTo(line[0].x, line[0].y);
        context.lineTo(line[1].x, line[1].y);
        context.stroke();

    });

    function dibujarLoop() {
        if (mouse.click && mouse.move && mouse.pos_prev) {
            socket.emit('draw_lines', { line: [mouse.pos, mouse.pos_prev] });

        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(dibujarLoop, 25);
    }
    dibujarLoop();

}

function pasar(id) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = id;

    ctx.drawImage(img, 0, 0);

}

document.getElementById("colores").addEventListener("change", function() {
    color = document.getElementById("colores").value;
    console.log(color);
});


document.getElementById("size").addEventListener("change", function() {
    tamano = document.getElementById("size").value;
    console.log(tamano);
});


document.getElementById("Close").addEventListener("click", function() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("limpio");
});





document.getElementById("Save").addEventListener("click", function() {
    var canvas = document.getElementById("canvas");
    var imagen = canvas.toDataURL("image/png");
    this.href = imagen;
});
document.addEventListener('DOMContentLoaded', init());