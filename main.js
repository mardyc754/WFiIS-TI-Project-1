function changeContent(event, section){
    let articles, links;
    articles = document.getElementsByTagName("article");
    for(let i = 0; i<articles.length; i++){
        //articles[i].style.display = "none";
        articles[i].style.opacity = 0;
        articles[i].style.height = 0;
        articles[i].style.overflow = "hidden";
    }

    links = document.getElementsByClassName("link");
    for(let i=0; i<links.length; i++){
        links[i].className = links[i].className.replace(" active", "");
    }

    document.getElementById(section).style.opacity = 1;
    document.getElementById(section).style.height = "auto";
    event.currentTarget.className += " active";
}


window.onload = (event) => { 
    changeContent(event, 'simulation');

    const canvas = document.getElementById("canvas");
    let bst = new DrawableBST(canvas);
    
    bst.createDrawableTree();
    
    //const ctx = canvas.getContext("2d");
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    let makeHowerable = (e) => {
        bst.ctx.clearRect(0,0,canvas.width, canvas.height);
        bst.howerableTree(bst.root, 0, 1, e);
        bst.canvas.style.cursor = "pointer";
    };

    let findNodeForDelete = (e) => {
        bst.removeNode(e);
    }

    document.getElementById("node-remove").onclick = () =>{
        if(bst.root != null){
            document.getElementById("normal-content").style.display = "none";
            document.getElementById("remove-content").style.display = "block";
            canvas.addEventListener("mousemove",  makeHowerable);
            canvas.addEventListener("mousedown",  findNodeForDelete);
            document.getElementById("removal-info").innerHTML = ""
        }
        else{
            document.getElementById("removal-info").innerHTML = "Drzewo jest puste";
        }
    }

    document.getElementById("cancel-remove").onclick = () =>{
        document.getElementById("normal-content").style.display = "block";
        document.getElementById("remove-content").style.display = "none";
        canvas.removeEventListener("mousemove", makeHowerable);
        bst.canvas.style.cursor = "default";
        canvas.removeEventListener("mousedown",  findNodeForDelete);
    }

    document.getElementById("insert-node").onclick = () => {
        bst.addNode(false);
        bst.inorder(bst.root);
    }

    document.getElementById("insert-random-node").onclick = () => {
        bst.addNode(true);
        bst.inorder(bst.root);
    }

    document.getElementById("clear-tree").onclick = () => {
        bst.clear();
    }

    document.getElementById("traversal-button").onclick = () => {
        // pobranie wartości z select
        const select = document.getElementById("traversal-select");
        let option = select.options[select.selectedIndex];
        bst.drawTraversal(option.value);
    }
}
