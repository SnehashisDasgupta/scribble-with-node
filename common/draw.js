const draw = {};

draw.path = (ctx, path, color="black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    // moves the drawing point to the starting point of the path, which is the first point in the 'path' array
    ctx.moveTo(...path[0]);

    // 'for' loop connects the remaining points with lines using 'ctx.lineTo(...path[i])';
    for(let i=1; i<path.length; i++){
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round"; // ending of the line should be rounded, it creates smoother appearence
    ctx.lineJoin = "round";// its pecify that corners should be rounded, it creates a smoother transition between connected line segments
    ctx.stroke(); //draws the path on the canvas using the specified color and line width
}

// to draw multiple paths, it is used to draw multiple drawing without clearing the canvas
draw.paths = (ctx, paths, color="black") => {
    for(const path of paths){
        draw.path(ctx, path, color);
    }
}

if(typeof module !== 'undefined'){
    module.exports = draw;
}