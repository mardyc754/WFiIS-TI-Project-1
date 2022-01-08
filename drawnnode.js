class DrawnNode{
    constructor(node, depth, rowPosition, canvas){
        this.left = node.left;
        this.right = node.right;
        this.current = node;
        this.key = node.key;
        this.parent = node.parent;
        this.depth = depth;
        this.rowPosition = rowPosition;
        this.canvas = canvas;
        this.nodeRadius = depth == 0 ? 50 : 90/(depth+1);
        this.ctx = canvas.getContext("2d");
        this.area = this.drawCircle(); 
    }

    drawCircle(color){
        let maxNumOfNodes = 2**this.depth;
        const circle = new Path2D();
        circle.arc(this.rowPosition*this.canvas.width/(maxNumOfNodes+1), 70+this.depth*150, this.nodeRadius, 0, Math.PI*2, true);
        this.ctx.fillStyle = color;
        this.ctx.fill(circle);
        this.ctx.stroke(circle);
        return circle;
    }

    drawKey(){
        let maxNumOfNodes = 2**this.depth;

        this.ctx.font = this.nodeRadius + "px Arial";
        this.ctx.fillStyle = "black";
        let xPos = null;
        let yPos = 70+this.depth*150+this.nodeRadius/3;
        if(this.key / 100 >= 1){
            xPos = this.rowPosition*this.canvas.width/(maxNumOfNodes+1)-3*this.nodeRadius/4;
        } // dla liczb 2-cyfrowych
        else if(this.key / 10 >= 1){ 
            xPos = this.rowPosition*this.canvas.width/(maxNumOfNodes+1)-this.nodeRadius/2;
        } // dla cyfr
        else{
            xPos = this.rowPosition*this.canvas.width/(maxNumOfNodes+1)-this.nodeRadius/3;   
        }
        this.ctx.fillText(this.key, xPos, yPos);  
    }

    drawEdge(){
        let maxNumOfNodes = 2**this.depth;

        if(this.parent != null){
            let oldNodeRadius = this.depth-1 == 0 ? 50 : 90/this.depth;
            let oldMaxNumOfNodes = maxNumOfNodes/2;

            let x1 = this.rowPosition*this.canvas.width/(maxNumOfNodes+1);
            let y1 = 70+this.depth*150-this.nodeRadius;
            let x2 = null;
            let y2 = 70+(this.depth-1)*150+oldNodeRadius/Math.sqrt(2);


            if(this.current == this.parent.left){
                x2 = (this.rowPosition+1)/2*this.canvas.width/(oldMaxNumOfNodes+1)-oldNodeRadius/Math.sqrt(2);
            }
            else{
                x2 = this.rowPosition/2*this.canvas.width/(oldMaxNumOfNodes+1)+oldNodeRadius/Math.sqrt(2);
            }

            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    draw(color){
        this.drawCircle(color);
        this.drawKey();
        this.drawEdge();

    }
}