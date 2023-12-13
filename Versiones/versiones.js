console.log("se cargo el script de versiones.js");

var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || [];
var frmVersiones = document.getElementById("frmVersiones");

listarModelos();
listarVersiones();
  
// Sección de botones
var oBtnAgregar = document.getElementById("btn_agregar");
var oBtnCancelar = document.getElementById("btn_cancelar");
var oBtnGuardar = document.getElementById("btn_guardar");
var oCmbCodigoModelo = document.getElementById("codigo_modelo");

// Seccion de campos
var oTxtCodigo = document.getElementById("codigo");
var oCmbCodigoVehiculo = document.getElementById("codigo_vehiculo");
var oCmbCodigoModelo = document.getElementById("codigo_modelo");
var oTxtNombre = document.getElementById("nombre");
var oTxtPrecio = document.getElementById("precio");
var oChkBloqueado = document.getElementById("bloqueado");

function listarVersiones(){
    var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || [];
    var oTblVersiones = document.getElementById("tbl_versiones");

    if (oTblVersiones == null) return;

    oTblVersiones.innerHTML = "";

    ls_versiones.forEach(function(obVersion){
    var cadena = `
      <tr>
        <td>${obVersion.codigo}</td>
        <td>${obVersion.codigo_vehiculo}</td>
        <td>${obVersion.codigo_modelo}</td>
        <td>${obVersion.nombre}</td>
        <td>${obVersion.precio}</td>
        <td>${obVersion.bloqueado ? "Bloqueado" : "Activo"}</td>
        <td>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="editarVersion(${obVersion.codigo})">Editar</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarVersion(${obVersion.codigo})">Eliminar</button>
        </td>
      </tr>
    `;
    oTblVersiones.innerHTML += cadena;  
  });
}

function listarModelos(){
    //Se crea para cargar el combo de vehiculos.
    var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];
    var oCmbModelos = document.getElementById("codigo_modelo");

    if (oCmbModelos == null) return;

    oCmbModelos.innerHTML = "";

    ls_modelos = ls_modelos.filter(function(obModelo){
        return obModelo.bloqueado != true;
    });

    ls_modelos.forEach(function(obModelo)
    {
        var cadena = 
        `
            <option value="${obModelo.codigo}">${obModelo.nombre}</option>
        `;
        
        oCmbModelos.innerHTML += cadena;
    });   
}

function editarVersion(codigo){
  var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || [];

  var obVersion = ls_versiones.find(function(obVersion){
    return obVersion.codigo == codigo;
  });

  document.getElementById("codigo").value = obVersion.codigo;
  document.getElementById("codigo_modelo").value = obVersion.codigo_modelo;
  document.getElementById("codigo_vehiculo").value = obVersion.codigo_vehiculo;
  document.getElementById("nombre").value = obVersion.nombre;
  document.getElementById("precio").value = obVersion.precio;
  document.getElementById("bloqueado").checked = obVersion.bloqueado;

  eliminarVersion(codigo);

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);
}

function eliminarVersion(codigo){
    var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || [];

  var ls_versiones = ls_versiones.filter(function(obVersion){
    return obVersion.codigo != codigo;
  });

  // Se carga menos el codigo filtrado es decir se elimina
  localStorage.setItem("versiones", JSON.stringify(ls_versiones));
  listarVersiones();
}

// Boton Agregar
oBtnAgregar.addEventListener("click", function(){
    var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || [];

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  if (ls_versiones.length > 0) {
    oTxtCodigo.value = ls_versiones.length + 1;
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
              
  alert("Se guardo correctamente");
  var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || []; 

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  alert(oTxtPrecio.value);

  var obVersion = {
    codigo: oTxtCodigo.value,
    codigo_vehiculo: oCmbCodigoVehiculo.value,
    codigo_modelo: oCmbCodigoModelo.value,
    nombre: oTxtNombre.value,
    precio: oTxtPrecio.value,
    bloqueado: oChkBloqueado.checked
  };  

  // Validar que los campos no esten vacios
  if (obVersion.codigo == "" || obVersion.nombre == "" || obVersion.precio == "") {
    alert("Los campos no pueden estar vacios");
    return;
  }

  ls_versiones.push(obVersion);
  localStorage.setItem("versiones", JSON.stringify(ls_versiones));
  frmVersiones.reset();
  listarVersiones();
});

function myFieldSet(boolean){
  document.getElementById("myFieldSet").disabled = boolean;
  oTxtCodigo.disabled = true;
  oCmbCodigoVehiculo.disabled = true;
  oCmbCodigoModelo.focus();
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

// Change del combo de modelos
oCmbCodigoModelo.addEventListener("change", function(){
    
    //Se crea para cargar el combo de vehiculos.
    var oCmbModelos = document.getElementById("codigo_modelo");
    var ls_modelos = JSON.parse(localStorage.getItem("modelos")) || [];

    var obModelo = ls_modelos.find(function(obModelo){
        return obModelo.codigo == oCmbModelos.value;
    });

    var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    var oCmbVehiculos = document.getElementById("codigo_vehiculo");

    if (oCmbVehiculos == null) return;

    oCmbVehiculos.innerHTML = "";

    var obVehiculo = ls_vehiculos.find(function(obVehiculo){
        return obVehiculo.codigo == obModelo.codigo_vehiculo;
    });

    oCmbVehiculos.innerHTML = `<option value="${obVehiculo.codigo}">${obVehiculo.nombre}</option> `;
  
});