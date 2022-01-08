function changeContent(event, section){
    let articles, links;
    articles = document.getElementsByTagName("article");
    for(let i = 0; i<articles.length; i++){
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

function displaySubmenu(menuMode){
    let isGettingToSubmenuPossible = true; 
    if(menuMode === "remove-menu"){
        isGettingToSubmenuPossible = makeNodeInteractive();
    }

    if(isGettingToSubmenuPossible){
        document.getElementById("normal-menu").style.display = "none";
        document.getElementById(menuMode).style.display = "block";
    }
}


const canvas = document.getElementById("canvas");
let bst = new DrawnBST(canvas);

document.getElementById("number-of-nodes").innerHTML = 0;
document.getElementById("bst-height").innerHTML = 0;

bst.createDrawnTree();


function returnToMainMenu(menuMode){
    if(menuMode === "remove-menu"){
        canvas.removeEventListener("mousemove", activateTree);
        bst.canvas.style.cursor = "default";
        canvas.removeEventListener("click",  removeNode);
    }
    document.getElementById(menuMode).style.display = "none";
    document.getElementById("normal-menu").style.display = "block";
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

function addNode(isRandom){
    bst.addNode(isRandom);
    document.getElementById("empty-tree-info").innerHTML = "";
}

let activateTree = (e) => {
    bst.ctx.clearRect(0,0,canvas.width, canvas.height);
    bst.interactiveTree(bst.root, 0, 1, e);
    bst.canvas.style.cursor = "pointer";
};

let removeNode = (e) => {
    bst.removeNode(e);
}

function makeNodeInteractive(){
    if(bst.root != null){
        canvas.addEventListener("mousemove",  activateTree);
        canvas.addEventListener("click",  removeNode);
        document.getElementById("empty-tree-info").innerHTML = "";
        return true;
    }
    else{
        document.getElementById("empty-tree-info").innerHTML = "Drzewo jest puste";
        return false;
    }
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

function clearTree(){
    bst.clear();
}