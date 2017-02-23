const changeClass = ( id, className ) => {

    document.querySelectorAll('.nav-link').forEach( x => x.classList.remove(className));
    document.getElementById(id).classList.add(className);
}