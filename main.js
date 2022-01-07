const canvas = document.getElementById("canvas");
let bst = new DrawableBST(canvas);

bst.createDrawableTree(mode);
    
function startWorker() {
    if (typeof(Worker) !== "undefined") {
      if (typeof(w) == "undefined") {
        w = new Worker("create_tree.js");
      }
      w.onmessage = function(event) {
        console.log(event.data);
      };
    } else {
      //document.getElementById("cnn_wrapper").innerHTML = "Sorry! No Web Worker support.";
    }
  }
  
  function stopWorker() {
    w.terminate();
    w = undefined;
  }


let makeHowerable = (e) => {
    bst.ctx.clearRect(0,0,canvas.width, canvas.height);
    bst.howerableTree(bst.root, 0, 1, e);
    bst.canvas.style.cursor = "pointer";
};

let findNodeForDelete = (e) => {
    bst.removeNode(e);
}

function nodeDeletion(){
    if(bst.root != null){
        document.getElementById("normal-content").style.display = "none";
        document.getElementById("remove-content").style.display = "block";
        canvas.addEventListener("mousemove",  makeHowerable);
        canvas.addEventListener("click",  findNodeForDelete);
        document.getElementById("removal-info").innerHTML = "";
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
    canvas.removeEventListener("click",  findNodeForDelete);
}

function addNode(isRandom){
    bst.addNode(isRandom);
}

function clearTree(){
    bst.clear();
}

function traverseTree(){
    const select = document.getElementById("traversal-select");
    let option = select.options[select.selectedIndex];
    bst.drawTraversal(option.value);
}


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