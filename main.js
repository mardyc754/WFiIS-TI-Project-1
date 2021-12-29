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

window.onload = (event) => { changeContent(event, 'definition'); }