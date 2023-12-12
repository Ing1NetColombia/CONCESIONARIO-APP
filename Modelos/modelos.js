console.log("se cargo el script de modelos.js");

var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];
var frmModelos = document.getElementById("frmModelos");


listarVehiculos();
listarModelos();
  
// Sección de botones
var oBtnAgregar = document.getElementById("btn_agregar");
var oBtnCancelar = document.getElementById("btn_cancelar");
var oBtnGuardar = document.getElementById("btn_guardar");

// Seccion de campos
var oTxtCodigo = document.getElementById("codigo");
var oCmbCodigoVehiculo = document.getElementById("codigo_vehiculo");
var oTxtNombre = document.getElementById("nombre");
var oChkBloqueado = document.getElementById("bloqueado");

function listarModelos(){
    var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];
    var oTblModelos = document.getElementById("tbl_modelos");

    if (oTblModelos == null) return;

    oTblModelos.innerHTML = "";

    ls_modelos.forEach(function(obModelo){
    var cadena = `
      <tr>
        <td>${obModelo.codigo}</td>
        <td>${obModelo.codigo_vehiculo}</td>
        <td>${obModelo.nombre}</td>
        <td>${obModelo.bloqueado ? "Bloqueado" : "Activo"}</td>
        <td>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="editarModelo(${obModelo.codigo})">Editar</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarModelo(${obModelo.codigo})">Eliminar</button>
        </td>
      </tr>
    `;
    oTblModelos.innerHTML += cadena;  
  });
}

function listarVehiculos(){
    //Se crea para cargar el combo de vehiculos.
    var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    var oCmbVehiculos = document.getElementById("codigo_vehiculo");

    if (oCmbVehiculos == null) return;

    oCmbVehiculos.innerHTML = "";

    ls_vehiculos = ls_vehiculos.filter(function(obVehiculo){
        return obVehiculo.bloqueado != true;
    });

    ls_vehiculos.forEach(function(obVehiculo)
    {
        var cadena = 
        `
            <option value="${obVehiculo.codigo}">${obVehiculo.nombre}</option>
        `;
        
        oCmbVehiculos.innerHTML += cadena;
    });   
}

function editarModelo(codigo){
  var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];

  var obModelo = ls_modelos.find(function(obModelo){
    return obModelo.codigo == codigo;
  });

  document.getElementById("codigo").value = obModelo.codigo;
  document.getElementById("codigo_vehiculo").value = obModelo.codigo;
  document.getElementById("nombre").value = obModelo.nombre;
  document.getElementById("bloqueado").checked = obModelo.bloqueado;

  eliminarModelo(codigo);

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);
}

function eliminarModelo(codigo){
    var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];

  var ls_modelos = ls_modelos.filter(function(obModelo){
    return obModelo.codigo != codigo;
  });

  // Se carga menos el codigo filtrado es decir se elimina
  localStorage.setItem("modelos", JSON.stringify(ls_modelos));
  listarModelos();
}

// Boton Agregar
oBtnAgregar.addEventListener("click", function(){
    var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  if (ls_modelos.length > 0) {
    oTxtCodigo.value = ls_modelos.length + 1;
  } else {
    oTxtCodigo.value = 1;
  }
});

// Boton Cancelar   
oBtnCancelar.addEventListener("click", function(){
              
  // Limpar los campos  
  oTxtCodigo.value = "";
  oCmbCodigoVehiculo.value = "";
  oTxtNombre.value = "";
  oChkBloqueado.checked = false;

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);
}); 

// Boton Guardar 
oBtnGuardar.addEventListener("click", function(){
              
  var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || []; 

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  
  var obModelo = {
    codigo: oTxtCodigo.value,
    codigo_vehiculo: oCmbCodigoVehiculo.value,
    nombre: oTxtNombre.value,
    bloqueado: oChkBloqueado.checked
  };  

  // Validar que los campos no esten vacios
  if (obModelo.codigo == "" || obModelo.nombre == "") {
    alert("Los campos no pueden estar vacios");
    return;
  }

  ls_modelos.push(obModelo);
  localStorage.setItem("modelos", JSON.stringify(ls_modelos));
  frmModelos.reset();
  listarModelos();
});

function myFieldSet(boolean){
  document.getElementById("myFieldSet").disabled = boolean;
  oTxtCodigo.disabled = true;
  oTxtNombre.focus();
}

function myBotones(tipo){
            
  switch (tipo) {
    case "AE":
      oBtnAgregar.disabled = true;
      oBtnCancelar.disabled = false;
    
      break;
    case "GC":
      oBtnAgregar.disabled = false;
      oBtnCancelar.disabled = true;
      break;
  
    default:
      break;
  }
}