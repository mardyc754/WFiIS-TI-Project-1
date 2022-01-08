class DrawnBST extends Tree{

    constructor(canvas){
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.drawnNodes = [];
        this.existingKeys = [];
    }

    listAllDrawnNodes(node, depth, i, mode){
        if(node != null){
            let drawnNode = new DrawnNode(node, depth, i, this.canvas); 
            if(mode === "preorder"){
                this.drawnNodes.push(drawnNode);
                drawnNode.draw("white");
                this.listAllDrawnNodes(node.left, depth+1, 2*i-1, "preorder");
                this.listAllDrawnNodes(node.right, depth+1, 2*i, "preorder");
            }
            if(mode === "postorder"){
                this.listAllDrawnNodes(node.left, depth+1, 2*i-1, "postorder");
                this.listAllDrawnNodes(node.right, depth+1, 2*i, "postorder");
                this.drawnNodes.push(drawnNode);
                drawnNode.draw("white");
            }
            else{
                this.listAllDrawnNodes(node.left, depth+1, 2*i-1);
                this.drawnNodes.push(drawnNode);
                drawnNode.draw("white");
                this.listAllDrawnNodes(node.right, depth+1, 2*i);
            }
        }
    }

    filterKeys(){
        this.existingKeys = [];
        for(let i=0; i<this.drawnNodes.length; i++){
            if(this.existingKeys.includes(this.drawnNodes[i].key)){
                this.drawnNodes.splice(i, 1);
                i--;
            }
            else{
                this.existingKeys.push(this.drawnNodes[i].key);
            }
        }
        return this.existingKeys;
    }

    createDrawnTree(mode){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.drawnNodes = [];
        this.listAllDrawnNodes(this.root, 0, 1, mode);

        // przejście preorder tworzy nadmiarowe węzły, które trzeba usunąć
        this.filterKeys();
    }


    addNode(isRandom){
        const info = document.getElementById("add-node-info");
        let key = false;
        if(isRandom){
            key = generateRandomNode(this);
        } else{
            key = generateNodeByKey(this);
        }
        
        if(key){
            this.insert(key);
        }

        if(this.height(this.root) > 6){
            info.innerHTML = "Nie można wstawić węzła, maksymalna wysokość drzewa to 6";
            this.remove(key);
        }
        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.createDrawnTree();
    }

    createInteractiveNode(node, depth, i, event){
        let pos = getMousePosition(event, this.canvas);
        let drawnNode = new DrawnNode(node, depth, i, this.canvas); 
        
        let fillcolor = "white";
        if(drawnNode.area != null){
            if (this.ctx.isPointInPath(drawnNode.area, pos.x, pos.y)) {
                fillcolor = "lime";
            }
            else {
                fillcolor = "white";
            }
            drawnNode.draw(fillcolor);
        }
        return drawnNode;
    }


    interactiveTree(node, depth, i, event){
        if(node != null){
            this.createInteractiveNode(node, depth, i, event);
            this.interactiveTree(node.left, depth+1, 2*i-1, event);
            this.interactiveTree(node.right, depth+1, 2*i, event);
        }
    }

    removeNode(event){
        let pos = getMousePosition(event, this.canvas);
        this.drawnNodes.forEach((node) =>{
            if(this.ctx.isPointInPath(node.area, pos.x, pos.y)){
                this.remove(node.key);
            }
        });

        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
        this.createDrawnTree();
    }

    async drawTraversal(mode){
        this.createDrawnTree(mode);
        if(this.drawnNodes.length > 0){
            for(let i=0; i<this.drawnNodes.length; i++){
                let currentNode = this.drawnNodes[i];
                currentNode.draw("lime");
                await new Promise(r => setTimeout(r, 500));
            }
        }
        this.createDrawnTree(mode);
    }

    clear(){
        super.clear();
        this.drawnNodes = [];
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        document.getElementById("bst-height").innerHTML = this.height(this.root);
        document.getElementById("number-of-nodes").innerHTML = this.numOfNodes;
    }

}