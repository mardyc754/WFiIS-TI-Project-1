function createDrawableTree(tree, mode){
    tree.ctx.clearRect(0,0,tree.canvas.width, tree.canvas.height);
    tree.drawableNodes = [];
    tree.listAllDrawableNodes(tree.root, 0, 1, mode);

    // przejście preorder tworzy nadmiarowe węzły, które trzeba usunąć
    if(mode === "preorder"){
        let existingKeys = [];
        for(let i=0; i<tree.drawableNodes.length; i++){
            if(existingKeys.includes(tree.drawableNodes[i].key)){
                tree.drawableNodes.splice(i, 1);
                i--;
            }
            else{
                existingKeys.push(tree.drawableNodes[i].key);
            }
        }
    }
}