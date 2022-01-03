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

    //document.getElementById(section).style.display = "block";
    document.getElementById(section).style.opacity = 1;
    document.getElementById(section).style.height = "auto";
    event.currentTarget.className += " active";
}

let bst = new Tree();

function drawFloor(ctx, numOfFloor){
    let numOfNodes = 2**(numOfFloor-1);
    let nodeRadius = numOfFloor == 1 ? 50 : 90/numOfFloor;
    ctx.font = nodeRadius + "px Arial";
    for(let i=1; i<=numOfNodes; i++){
        
        //Wypisywanie wartości klucza
        // dla liczb 3-cyfrowych
        if(i / 100 >= 1){
            ctx.fillText(i, i*canvas.width/(numOfNodes+1)-3*nodeRadius/4, 70+(numOfFloor-1)*150+nodeRadius/3);
        } // dla liczb 2-cyfrowych
        else if(i / 10 >= 1){ 
            ctx.fillText(i, i*canvas.width/(numOfNodes+1)-nodeRadius/2, 70+(numOfFloor-1)*150+nodeRadius/3);
        } // dla cyfr
        else{
         ctx.fillText(i, i*canvas.width/(numOfNodes+1)-nodeRadius/3, 70+(numOfFloor-1)*150+nodeRadius/3);   
        }

        // rysowanie węzła
        ctx.beginPath();
        ctx.arc(i*canvas.width/(numOfNodes+1), 70+(numOfFloor-1)*150, nodeRadius, 0, Math.PI*2, true);
        ctx.stroke();
    }
}

/*function drawEdges(ctx, numOfFloor){

}*/

function drawTree(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    console.log("width=" + canvas.width + ", height=" + canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    
    for(let i=1; i<=6; i++){
        drawFloor(ctx, i);
    }
}

function addNode(){
    const key = Number(document.getElementById("form-key").value);
    //bst.insert(key);
    drawTree();
}

function removeNode(){
    //bst.insert(key);
    drawTree();
}

window.onload = (event) => { 
    changeContent(event, 'simulation');
    //drawTree(); 
}