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
    
    bst.drawTree();
    
    //const ctx = canvas.getContext("2d");
    //ctx.clearRect(0,0,canvas.width, canvas.height);

    let makeHowerable =  (e) => {
        bst.howerableTree(bst.root, 0, 1, e);
    };

    document.getElementById("node-remove").onclick = () =>{
        if(bst.root != null){
            document.getElementById("normal-content").style.display = "none";
            document.getElementById("remove-content").style.display = "block";
            canvas.addEventListener("mousemove",  makeHowerable);
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
    }

    document.getElementById("insert-node").onclick = () => {
        bst.addNode(false);
    }

    document.getElementById("insert-random-node").onclick = () => {
        bst.addNode(true);
    }

    document.getElementById("clear-tree").onclick = () => {
        bst.clear();
    }
}
