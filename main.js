var canvas = document.getElementById('canvas');
var context      = canvas.getContext('2d');
var valve        = false;
var lastposition = {
    x: undefined,
    y: undefined
};

function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(x1, y1)
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
canvas.onmousedown = function (e) {
        valve        = true;
    var x            = e.clientX;
    var y            = e.clientY;
        lastposition = {
        'x': x,
        'y': y
    };
    drawCircle(x, y, 1);
}
canvas.onmousemove = function (e) {
    if (valve) {
        var x           = e.clientX;
        var y           = e.clientY;
        var newposition = {
            'x': x,
            'y': y
        };
        drawCircle(x, y, 1);
        drawLine(lastposition.x, lastposition.y, newposition.x, newposition.y);
        lastposition = newposition;
    }
}
canvas.onmouseup = function () {
    valve = false;
}