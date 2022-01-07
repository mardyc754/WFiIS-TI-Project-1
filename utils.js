function generateRandomNode(tree){

    let key = false;

    const min = parseInt(document.getElementById("min-key").value);
    const max = parseInt(document.getElementById("max-key").value);
    const info = document.getElementById("add-node-info");

    if(min < 1 || min > 999){
        info.innerHTML = "Wartość \"Od\" musi mieć wartość od 0 do 999";
        return;
    }

    if(max < 1 || max > 999){
        info.innerHTML = "Wartość \"Do\" musi mieć wartość od 0 do 999";
        return;
    }

    if(min < 1 || max < 1){
        info.innerHTML = "Wartości \"Od\" oraz \"Do\" muszą być większe od 0";
        return;
    }
    if(min > max){
        info.innerHTML = "Wartość \"Do\" musi być większa od wartości \"Od\"";
        return;
    }

    let possibleKeys = Array.from({length: max-min+1}, (x, i) => i+min);
    tree.existingKeys = tree.findExistingKeys();
    const commonKeys = possibleKeys.filter(value => tree.existingKeys.includes(value));
    if(commonKeys.length === possibleKeys.length){
        info.innerHTML = "Nie można wygenerować węzła o podanym zakresie wartości";
        return false;
    }
    else if(tree.existingKeys.length >= 128){
        info.innerHTML = "Drzewo już zapełnione";
        return false;
    }
    else{
        do{
            key = parseInt(Math.random() * (max - min + 1)) + parseInt(min);
        }while (tree.existingKeys.includes(key));
        info.innerHTML = "";
    }
    return key;
}

function addNodeByKey(tree){
    const info = document.getElementById("add-node-info");

    let key = false;
    
    let tempKey = Number(document.getElementById("key").value);
    tree.existingKeys = tree.findExistingKeys();
    if(tempKey < 1 || tempKey > 999){
        info.innerHTML = "Wartość klucza musi się znajdować między 1 a 999";
    }
    else if(tree.existingKeys.includes(tempKey)){
        info.innerHTML = "Klucz o podanej wartości istnieje już w drzewie binarnym";
    }
    else{
        key = tempKey;
        info.innerHTML = "";
    }
    return key;
}

function getMousePosition(e, canvas){
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    let x = parseInt((e.clientX-rect.left)*scaleX);
    let y = parseInt((e.clientY-rect.top)*scaleY);

    let xNew = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    let yNew = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;

    return {
        x: x,
        y: y
    };
}
