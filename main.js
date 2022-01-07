const canvas = document.getElementById("canvas");
let bst = new DrawableBST(canvas);

document.getElementById("number-of-nodes").innerHTML = 0;
document.getElementById("bst-height").innerHTML = 0;

bst.createDrawableTree();
    
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

function makeNodeInteractive(){
    if(bst.root != null){
        canvas.addEventListener("mousemove",  makeHowerable);
        canvas.addEventListener("click",  findNodeForDelete);
        document.getElementById("empty-tree-info").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("empty-tree-info").innerHTML = "Drzewo jest puste";
        return false;
    }
}

function addNode(isRandom){
    bst.addNode(isRandom);
    document.getElementById("empty-tree-info").innerHTML = "";
}

function displaySubmenu(menuMode){
    let isConditionSatisfied = true; 
    if(menuMode === "remove-menu"){
        isConditionSatisfied = makeNodeInteractive();
    }

    if(isConditionSatisfied){
        document.getElementById("normal-menu").style.display = "none";
        document.getElementById(menuMode).style.display = "block";
    }
}

function returnToMainMenu(menuMode){
    if(menuMode === "remove-menu"){
        canvas.removeEventListener("mousemove", makeHowerable);
        bst.canvas.style.cursor = "default";
        canvas.removeEventListener("click",  findNodeForDelete);
    }
    document.getElementById(menuMode).style.display = "none";
    document.getElementById("normal-menu").style.display = "block";
}

function clearTree(){
    bst.clear();
}

function traverseTree(){
    if(bst.root != null){
        const select = document.getElementById("traversal-select");
        let option = select.options[select.selectedIndex];
        bst.drawTraversal(option.value);
    } else{
        document.getElementById("empty-tree-info").innerHTML = "Drzewo jest puste";
    }
}

function displayAddNodeMenu(isMainMenuActive){
    if(isMainMenuActive){
        document.getElementById("normal-menu").style.display = "none";
        document.getElementById("add-menu").style.display = "block";
        document.getElementById("add-node-info").innerHTML = "";
    }else{
        document.getElementById("add-menu").style.display = "none";
        document.getElementById("normal-menu").style.display = "block";
    }
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


let isSidebarVisible = true;

function showOrHideSidebar(){
    if(isSidebarVisible){
        document.querySelector('nav').style.display = "none";
        isSidebarVisible = false;
    }
    else{
        document.querySelector('nav').style.display = "block";
        isSidebarVisible = true;
    }
}