
function switchStat(id){
    selected=false;
    var element = document.getElementsByClassName("pieza-"+id);
    element.classList.forEach(element => {
        if(element=="selected")
            selected = true;
    });

    if(selected){
        element.classList.remove("selected");
    }else{
        element.classList.add("selected");
    }
}