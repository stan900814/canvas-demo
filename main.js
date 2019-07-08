var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraser = document.getElementById('eraser');
var eraserEnabled = false;
var actions = document.getElementById('actions');
var brush = document.getElementById('pen');
var valve = false;
var red = document.getElementById('red');
var yellow = document.getElementById('yellow');
var blue = document.getElementById('blue');
var clear = document.getElementById('clear');
var save = document.getElementById('save');
var a = document.createElement('a');
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
    // context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black';
    context.moveTo(x1, y1)
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//特性检测
if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        valve = true;
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10);
        } else
            lastposition = {
                'x': x,
                'y': y
            }
    }
    canvas.ontouchmove = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
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
    canvas.ontouchend = function (e) {
        valve = false;
    }
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
    eraser.classList.add('active');
    pen.classList.remove('active');
    eraserEnabled = true;
}
pen.onclick = function () {
    pen.classList.add('active');
    eraser.classList.remove('active');
    eraserEnabled = false;
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
save.onclick = function () {
    document.body.appendChild(a);
    a.href = canvas.toDataURL('image/png');
    a.download = '我的作品';
    a.click();

}
black.onclick = function () {
    context.fillStyle = 'black';
    context.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
}
red.onclick = function () {
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    red.classList.add('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
yellow.onclick = function () {
    context.fillStyle = 'yellow';
    context.strokeStyle = 'yellow';
    red.classList.remove('active');
    yellow.classList.add('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
blue.onclick = function () {
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.add('active');
    black.classList.remove('active');
}