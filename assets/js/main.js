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

// Aqui ya se cargo los contenidos
var cerrar = document.getElementById('cerrar');


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

if (cerrar != null){
    document.getElementById('cerrar').addEventListener('click', (e) => {
        localStorage.removeItem('usuarioLogueado');
        redireccionar('../index.html');
      });
}

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

function buscar(codigo, tipo){

    var retorno = "";

    if (codigo == null || codigo == ""){

    }else{
      var ls_tipo = JSON.parse(localStorage.getItem(tipo)) || [];

      var obTipo = ls_tipo.find(function(obTipo){
        return obTipo.codigo == codigo;
      });

      retorno = obTipo.nombre;
    }

    return retorno;
}

function listarTarjetasVersiones(){

    // cargar las versiones disponibles
    var ls_versiones = JSON.parse(localStorage.getItem('versiones')) || [];
    
    ls_versiones = ls_versiones.filter(function(obVersion){
        return obVersion.bloqueado != true;
    });
    
    var tarjetas = document.getElementById('tarjetas');
    
    tarjetas.innerHTML = "";
    
    ls_versiones.forEach(function (obVersion) {
        var cadena = 
        `
            <div class="col">
                <div class="card shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="50%" height="225" src="assets/img/_kia1.jpg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c">
                    <div class="card-body">
                        <h5 class="font-weight-bold card-text font-weight-bold">${buscar(obVersion.codigo_vehiculo, "vehiculos")+" "+buscar(obVersion.codigo_modelo, "modelos")}</h5>    
                        <h6 class="font-weight-bold card-text font-weight-bold">${obVersion.nombre}</h6 >
                        <h6>Precio sugerido: $${obVersion.precio}</h6>
                        
                        
                        
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Vista</button>
                                
                            </div>
                            <small class="text-body-secondary">9 mins</small>
                        </div>
                    </div>
                </div>
            </div>
        ` 
        tarjetas.innerHTML += cadena;
    });
    
    }
    







