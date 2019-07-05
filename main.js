var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraser = document.getElementById('eraser');
var eraserEnabled = false;
var valve = false;
var lastposition = {
    x: undefined,
    y: undefined
};

function pageSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

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
pageSize();
window.onresize = function () {
    pageSize();
}
canvas.onmousedown = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    valve = true;
    if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10);
    } else
        lastposition = {
            'x': x,
            'y': y
        }


}
canvas.onmousemove = function (e) {
    var x = e.clientX;
    var y = e.clientY;
    if (eraserEnabled) {
        if (valve) {
            context.clearRect(x - 5, y - 5, 10, 10);
        }

    } else {
        if (valve) {
            var newposition = {
                'x': x,
                'y': y
            };
            drawCircle(x, y, 1);
            drawLine(lastposition.x, lastposition.y, newposition.x, newposition.y);
            lastposition = newposition;
        }
    }
}
canvas.onmouseup = function () {
    valve = false;
}
eraser.onclick = function () {
    eraserEnabled = !eraserEnabled;
}