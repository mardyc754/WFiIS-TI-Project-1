class DrawableBST extends Tree{

    constructor(canvas){
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.drawableNodes = [];
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

            return { area: circle, 
                     current: node,
                     left: node.left, 
                     right: node.right, 
                     key: node.key, 
                     color: fillcolor,
                     depth: depth,
                     rowPosition: i };
        }
        return null;
    }

    createDrawableNode(node, depth, i, fillcolor){
        this.drawableNodes.push(this.drawNode(node, depth, i, fillcolor));
    }

    async drawTraversal(mode){
        this.createDrawableTree(mode);
        if(this.drawableNodes.length > 0){
            for(let i=0; i<this.drawableNodes.length; i++){
                let currentNode = this.drawableNodes[i];
                this.drawNode(currentNode.current, currentNode.depth, currentNode.rowPosition, "lime");
                await new Promise(r => setTimeout(r, 500));
            }
        }
        this.createDrawableTree(mode);
    }

    listAllDrawableNodes(node, depth, i, mode){
        if(node != null){
            if(mode == "preorder"){
                this.drawableNodes.push(this.drawNode(node, depth, i, "white"));
                this.listAllDrawableNodes(node.left, depth+1, 2*i-1, "preorder");
                this.listAllDrawableNodes(node.right, depth+1, 2*i, "preorder");
            }
            if(mode == "postorder"){
                this.listAllDrawableNodes(node.left, depth+1, 2*i-1, "postorder");
                this.listAllDrawableNodes(node.right, depth+1, 2*i, "postorder");
                this.drawableNodes.push(this.drawNode(node, depth, i, "white"));
            }
            else{
                this.listAllDrawableNodes(node.left, depth+1, 2*i-1);
                this.drawableNodes.push(this.drawNode(node, depth, i, "white"));
                this.listAllDrawableNodes(node.right, depth+1, 2*i);
            }
        }
    }

    createDrawableTree(mode){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.drawableNodes = [];
        this.listAllDrawableNodes(this.root, 0, 1, mode);

        // przejście preorder tworzy nadmiarowe węzły, które trzeba usunąć
        if(mode === "preorder"){
            let existingKeys = [];
            for(let i=0; i<this.drawableNodes.length; i++){
                if(existingKeys.includes(this.drawableNodes[i].key)){
                    this.drawableNodes.splice(i, 1);
                    i--;
                }
                else{
                    existingKeys.push(this.drawableNodes[i].key);
                }
            }
        }
    }

    addNode(isRandom){
        const key = isRandom ? Math.floor(Math.random()*1000) : Number(document.getElementById("form-key").value);
        this.insert(key);
        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.createDrawableTree();
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
        if(nodeContent.area != null){
            if (this.ctx.isPointInPath(nodeContent.area, pos.x, pos.y)) {
                fillcolor = "lime";
            }
            else {
                fillcolor = "white";
            }
            nodeContent = this.drawNode(node, depth, i, fillcolor);
        }
        return nodeContent;
    }

    searchPointedNode(node, key, depth, i, event){
        if(node == null)
        return null;

        else if(key < node.key)
            return this.searchPointedNode(node.left, key, depth+1, 2*i-1, event);

        else if(key > node.key)
            return this.searchPointedNode(node.right, key,  depth+1, 2*i, event);
        else{
            console.log(this.createHowerableNode(node, depth, i, event));
            return this.createHowerableNode(node, depth, i, event);
        }
    }

    removeNode(event){
        let pos = this.getMousePosition(event);
        this.drawableNodes.forEach((node) =>{
            if(this.ctx.isPointInPath(node.area, pos.x, pos.y)){
                this.remove(node.key);
                //this.numOfNodes--;
            }
        });

        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.createDrawableTree();
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
        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
    }

}