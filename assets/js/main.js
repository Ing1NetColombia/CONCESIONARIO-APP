// Se verifica si el usuario está logueado
const user_success = JSON.parse(localStorage.getItem('usuarioLogueado')) || false;

if (!user_success) {

    const sesion = document.getElementById('sesion');
    sesion.innerHTML = `<li class="nav-item"><a href="login/index.html" class="nav-link px-2 ">Iniciar Sesión</a></li>`;

    cargarContenido('../Principal/card.html');

} else {

    cargarNavbarLi();
    cargarContenido('../Principal/bienvenido.html');
}

// ********** Cargar Contenido **********
function cargarContenido(url) {

    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + url;
    var urlP = new URL(baseUrl);
    var id = urlP.searchParams.get("id");

    if (id != null) {
        localStorage.setItem("id", id);
    }

    fetch(url)
        .then(response => response.text())
        .then(html => {
            contenido.innerHTML = html;
            
            ejecutarScriptsEnContenido(document.querySelector('#contenido'));
        })
}

// ********** Ejecutar Scripts **********
function ejecutarScriptsEnContenido(elemento) {
    const scripts = elemento.querySelectorAll('script');

    scripts.forEach(script => {
        const nuevoScript = document.createElement('script');
        
        // Se adiciona el src que no lo tenia la función:
        nuevoScript.text = script.text;
        nuevoScript.src = script.src;
        script.parentNode.replaceChild(nuevoScript, script);
    });
}
// ********** Redireccionar **********
function redireccionar(page) {
    window.location.href = page;
}

// ********** Cerrar Sesión **********
document.getElementById('cerrar').addEventListener('click', (e) => {
  //  alert('Sesión cerrada con éxito');
    localStorage.removeItem('usuarioLogueado');
    redireccionar('../index.html');
});

// ********** Cargar Navbar Li **********
function cargarNavbarLi() {
    // Opciones izquierda
    var vehiculos = document.getElementById('sVehiculos');
    var modelos = document.getElementById('sModelos');
    var versiones = document.getElementById('sVersiones');
    // var usuarios = document.getElementById('sUsuarios');

    vehiculos.innerHTML = `<li class="nav-item"><a href="#"  onclick="cargarContenido('../Vehiculos/index.html')" class= "nav-link link-body-emphasis px-2">Vehiculos</a></li>`;
    modelos.innerHTML = `<li class="nav-item"><a href="#" onclick="cargarContenido('../Modelos/index.html')" class="nav-link link-body-emphasis px-2">Modelos</a></li>`;
    versiones.innerHTML = `<li class="nav-item"><a href="#" onclick="cargarContenido('../Versiones/index.html')" class="nav-link link-body-emphasis px-2">Versiones</a></li>`;
    // usuarios.innerHTML = `<li class="nav-item"><a href="#" onclick="cargarContenido('../Registro/index.html')" class="nav-link link-body-emphasis px-2">Usuarios</a></li>`;

    // Opciones derecha
    var usuario_logueado = document.getElementById('usuario_logueado');
    var sesion = document.getElementById('sesion');

    usuario_logueado.innerHTML = `<li class="nav-item"><a href="#" class="nav-link px-2 ">@${user_success.usuario}</a></li>`;
    sesion.innerHTML = `<li class="nav-item" id="cerrar"><a href="#" class="nav-link px-2 ">Cerrar Sesión</a></li>`;
}








