var busy = false;

function setProject(projectNumber) {
    let oldEntry = document.getElementsByClassName("active-entry")[0];
    if (oldEntry.classList.contains("entry-project-" + projectNumber) || busy)
        return;
    busy = true;
    oldEntry.style.transform = "translateX(10000px)";
    let navLinks = document.getElementsByClassName("nav-link");
    // Eliminar div de sombra seleccionada de todos los elementos de navegación
    var shadowDivs = document.querySelectorAll('.nav-shadow-selected');
    shadowDivs.forEach(function (div) {
        div.remove();
    });

    setTimeout(function () {
        // Crear el nodo principal
        var projectContainer = document.createElement('div');
        projectContainer.className = 'active-entry entry-project-' + projectNumber + ' col-lg-10 col-sm-12 d-flex flex-row';
        projectContainer.style.transform = "translateX(-20000px)";

        // Crear el nodo de la barra lateral del proyecto
        var projectSideBar = document.createElement('div');
        projectSideBar.className = 'project-side-bar me-5 d-none d-sm-none d-md-block';

        var imageEntry = document.createElement('div');
        imageEntry.className = 'image-entry image-project-' + projectNumber;
        projectSideBar.appendChild(imageEntry);

        // Crear el nodo del cuerpo del proyecto
        var projectBodyDescription = document.createElement('div');
        projectBodyDescription.className = 'project-body-description';

        var headerText = document.createElement('h1');
        headerText.className = 'header-text';
        headerText.textContent = 'Proyecto'+projectNumber;

        var projectDescription = document.createElement('p');
        projectDescription.className = 'project-description-' + projectNumber + ' header-text fs-2';
        projectDescription.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, sapien non varius tincidunt, elit ipsum dictum libero, eu imperdiet odio nulla eu est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vel justo nec ligula cursus laoreet. Integer auctor leo eu quam tincidunt, id fringilla eros pellentesque. Vivamus eu diam id tellus auctor vulputate.';

        // Adjuntar nodos hijos al nodo principal
        projectContainer.appendChild(projectSideBar);
        projectContainer.appendChild(projectBodyDescription);

        projectBodyDescription.appendChild(headerText);
        projectBodyDescription.appendChild(projectDescription);

        document.getElementById("content").appendChild(projectContainer);
        
        var shadowDiv = document.createElement('div');
        shadowDiv.className = 'nav-shadow-selected';
        document.querySelector('.nav-item:nth-child(' + (projectNumber + 1) + ')').appendChild(shadowDiv);
      
        setTimeout(function () {
            projectContainer.style.transform = "translateX(0px)";
        }, 100);
        setTimeout(function () {
            oldEntry.remove();
            busy = false;
        }, 700);
    }, 100);

}