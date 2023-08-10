class SketchPad{
    constructor (container, size=400){
        this.canvas = document.createElement("canvas");  
        this.canvas.width = size
        this.canvas.height = size
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black
        `;
        container.appendChild(this.canvas);

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        //'getContext("2d")' returns obj that provide methods for drawing on the canvas in a 2D context
        // 'this.ctx' is used to store the 2D drawing context
        this.ctx = this.canvas.getContext("2d");

        this.reset();

        this.#addEventListeners();
    }

    reset(){
        this.paths = [];
        this.isDrawing = false;
        this.#redraw(); //disable the 'UNDO' button when refreshed
    }

    #addEventListeners(){

        // FOR PC
        // method will run when left click button is pressed on mouse.['mousedown' event]
        this.canvas.onmousedown= (evt) =>{
            const mouse = this.#getMouse(evt);
            // 'this.path': is an array that will be used to store the points or coordinates of the drawing path as the user moves the mouse.
            //The mouse variable contains the initial mouse coordinates captured when the mousedown event occurred 
            this.paths.push([mouse]);
            // This is a boolean flag that indicates whether the user is currently drawing. 
            this.isDrawing = true;
        }

        //When the user moves the mouse over the canvas, this event listener function will be triggered
        this.canvas.onmousemove= (evt) =>{
            if (this.isDrawing){
                
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length-1];
                lastPath.push(mouse);
                this.#redraw();
            }
        }

        document.onmouseup= () =>{
            this.isDrawing = false;
        }

        // FOR SMARTPHONE
        //'ontouchstart' functionality work on touch devices like smartphones
        this.canvas.ontouchstart= (evt) =>{
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove= (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        document.ontouchend= () =>{
            document.onmouseup();
        }


        // UNDO function
        this.undoBtn.onclick= () =>{
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw(){
        // clears the entire canvas
        this.ctx.clearRect(0,0,
            this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
        // if canvas is clean, then disable 'UNDO' button
        if(this.paths.length > 0){
            this.undoBtn.disabled = false;
        }else{
            this.undoBtn.disabled = true;
        }
    }

    #getMouse= (evt) => {
        // used to get the bounding rectangle of the canvas relative to the viewport. 
        const rect = this.canvas.getBoundingClientRect();
        //calculated mouse array holds the x and y coordinates of the mouse relative to the top-left corner of the canvas
        // top-left coordinate: (0,0)
        // bottom-right coordinate: (400,400) [by default]
        return [
            // 'evt.clientX' & 'evt.clientY' represent the mouse's position in the viewport 
            // 'rect.left' & 'rect.top' represent the left and top offsets of the canvas's bounding rectangle,
            // Math.round(): round-off the float value into integer
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }
}