
// Allows us to use animation frames with the canvas
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame
})();

// keeps track of the context from the canvas
var canvas;
var context;
var messages = ["Do", "You", "Know", "The", "Way", "My", "Bruddah?"];
var changeColorTimer = 0;

// State of warping the frame
var warped = false;

// Keeps track of the bubbles and bubble 
var bubbles = [], bubble;

var iterate = 0;

// Randomize the RGB values
var r = Math.round(Math.random() * 255);
var g = Math.round(Math.random() * 255);
var b = Math.round(Math.random() * 255);

window.onload = function() {
    canvas = document.getElementById("spaceCraft");
    context = canvas.getContext("2d");
    initializeBubbles();
    executeFrame();
    setInterval(function() {
        $("#messages").html(messages[iterate++ % messages.length]);
        $("#messages").fadeIn(1500);
        $("#messages").fadeOut(1500);
    }, 3000);

    $(window).keydown(function(event) {
        if(event.keyCode == 32) {
            warped = !warped;
        }
    });
}

// Renders a frame onto our canvas
function executeFrame() {
    requestAnimationFrame(executeFrame);
    checkLocation();
    drawBubbles();
}

// Sets up all of the bubbles that we need.
function initializeBubbles() {
    bubbles = [];
    var xForward, yFoward;
    for(i = 0; i < 1000; i++) {
        xForward = Math.round(Math.random()) == 0 ? true : false;
        yForward = Math.round(Math.random()) == 0 ? true : false;
        bubble = {
            x:Math.random() * canvas.width,
            y:Math.random() * canvas.height,
            xVelocity: Math.random() * (xForward? 2 : -2),
            yVelocity: Math.random() * (yForward? 2 : -2),
            radius: Math.random() * 2 + 3
        }
        bubbles.push(bubble);
    }
}


// Checks to see if the bubble is still visible on the screen, if not change the appropriate directionality
function checkLocation() {
    for(var i = 0; i < bubbles.length; i++) {
        bubble = bubbles[i];
        bubble.x += bubble.xVelocity;
        bubble.y += bubble.yVelocity;
        if(bubble.x > window.innerWidth - 5 || bubble.x < 5) {
            bubble.xVelocity *= -1;
        }
        if(bubble.y > window.innerHeight - 5 || bubble.y < 5) {
            bubble.yVelocity *= -1;
        }
    }
}


// Draws out the location of each bubble with respect the canvas.
function drawBubbles() {
    if(canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeBubbles();
    }

    if(!warped) {
        context.fillStyle = "rgba(0, 10, 20, 1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    for(var i = 0; i < bubbles.length; i++) {
        bubble = bubbles[i];
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI, false);
        if(++changeColorTimer % 100000 == 0) {
            r = Math.round(Math.random() * 255);
            g = Math.round(Math.random() * 255);
            b = Math.round(Math.random() * 255);
        }
        context.fillStyle = "rgba(" + r
            + ","  + g
            + "," + b
            + "," + 1 + ")";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#003300';
        context.stroke();
    }
}
