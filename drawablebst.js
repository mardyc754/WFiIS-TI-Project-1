class DrawableBST extends Tree{

    constructor(canvas){
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    drawNode(node, depth, i, fillcolor){
        let nodeRadius = depth == 0 ? 50 : 90/(depth+1);
        let maxNumOfNodes = 2**depth;
        
        if(node != null){
            const circle = new Path2D();
            circle.arc(i*this.canvas.width/(maxNumOfNodes+1), 70+depth*150, nodeRadius, 0, Math.PI*2, true);
            this.ctx.fillStyle = fillcolor;
            this.ctx.fill(circle);
            this.ctx.stroke(circle);
            
            // rysowanie wartości
            this.ctx.font = nodeRadius + "px Arial";
            this.ctx.fillStyle = "black";
            if(node.key / 100 >= 1){
                this.ctx.fillText(node.key, i*this.canvas.width/(maxNumOfNodes+1)-3*nodeRadius/4, 70+depth*150+nodeRadius/3);
            } // dla liczb 2-cyfrowych
            else if(node.key / 10 >= 1){ 
                this.ctx.fillText(node.key, i*this.canvas.width/(maxNumOfNodes+1)-nodeRadius/2, 70+depth*150+nodeRadius/3);
            } // dla cyfr
            else{
            this.ctx.fillText(node.key, i*this.canvas.width/(maxNumOfNodes+1)-nodeRadius/3, 70+depth*150+nodeRadius/3);   
            }

            return { circle: circle, key: node.key };
        }
        return null;
    }

    preorderDraw(node, depth, i){
        if(node != null){
            let nodeRadius = depth == 0 ? 50 : 90/(depth+1);
            let maxNumOfNodes = 2**depth;
            
            this.drawNode(node, depth, i, "white");

            // rysowanie linii łączących węzły
            if(node.parent != null){
                let oldNodeRadius = depth-1 == 0 ? 50 : 90/depth;
                let oldMaxNumOfNodes = maxNumOfNodes/2;
                this.ctx.beginPath();
                if(node == node.parent.left){
                    this.ctx.beginPath();
                    this.ctx.moveTo(i*this.canvas.width/(maxNumOfNodes+1), 70+depth*150-nodeRadius);
                    this.ctx.lineTo((i+1)/2*this.canvas.width/(oldMaxNumOfNodes+1)-oldNodeRadius/Math.sqrt(2), 70+(depth-1)*150+oldNodeRadius/Math.sqrt(2));
                }
                else{
                    this.ctx.moveTo(i*this.canvas.width/(maxNumOfNodes+1), 70+depth*150-nodeRadius);
                    this.ctx.lineTo(i/2*this.canvas.width/(oldMaxNumOfNodes+1)+oldNodeRadius/Math.sqrt(2), 70+(depth-1)*150+oldNodeRadius/Math.sqrt(2));
                }
                this.ctx.stroke();
            }
            
            this.preorderDraw(node.left, depth+1, 2*i-1);
            this.preorderDraw(node.right, depth+1, 2*i);
        }
    }

    drawTree(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "black";
        this.preorderDraw(this.root, 0, 1);
    }

    addNode(isRandom){
        const key = isRandom ? Math.floor(Math.random()*1000) : Number(document.getElementById("form-key").value);
        this.insert(key);
        document.getElementById("bst-height").innerHTML = this.height();
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.drawTree();
    }

    removeNode(){
        const key = Number(document.getElementById("form-key").value);
        //this.remove(key);
        document.getElementById("bst-height").innerHTML = this.height();
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.drawTree();
    }

    getMousePosition(e){
        let rect = this.canvas.getBoundingClientRect();
        let scaleX = this.canvas.width / rect.width;
        let scaleY = this.canvas.height / rect.height;
    
        let x = parseInt((e.clientX-rect.left)*scaleX);
        let y = parseInt((e.clientY-rect.top)*scaleY);
    
        let xNew = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
        let yNew = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
    
        return {
            x: x,
            y: y
        };
    }

    createHowerableNode(node, depth, i, event){
        let pos = this.getMousePosition(event);
        let nodeContent = this.drawNode(node, depth, i, "white");
    
        let fillcolor = "white";
        if(nodeContent.circle != null){
            if (this.ctx.isPointInPath(nodeContent.circle, pos.x, pos.y)) {
                fillcolor = "green";
            }
            else {
                fillcolor = "white";
            }
            nodeContent = this.drawNode(node, depth, i, fillcolor);
        }
    }
    
    howerableTree(node, depth, i, event){
        if(node != null){
            this.createHowerableNode(node, depth, i, event);
    
            this.howerableTree(node.left, depth+1, 2*i-1, event);
            this.howerableTree(node.right, depth+1, 2*i, event);
        }
    }

    clear(){
        super.clear();
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

}