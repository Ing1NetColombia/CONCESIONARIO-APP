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
        <td>${obVersion.nombre}</td>
        <td>${obVersion.bloqueado ? "Bloqueado" : "Activo"}</td>
        <td>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="editarModelo(${obVersion.codigo})">Editar</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarModelo(${obVersion.codigo})">Eliminar</button>
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
              
  var ls_versiones = JSON.parse(localStorage.getItem("versiones")) || []; 

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  
  var obVersion = {
    codigo: oTxtCodigo.value,
    codigo_vehiculo: oCmbCodigoVehiculo.value,
    codigo_modelo: oCmbCodigoModelo.value,
    nombre: oTxtNombre.value,
    bloqueado: oChkBloqueado.checked
  };  

  // Validar que los campos no esten vacios
  if (obVersion.codigo == "" || obVersion.nombre == "") {
    alert("Los campos no pueden estar vacios");
    return;
  }

  ls_modelos.push(obModelo);
  localStorage.setItem("modelos", JSON.stringify(ls_modelos));
  frmVersiones.reset();
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

oCmbCodigoModelo.addEventListener("change", function(){
    
    var codigo_vehiculo = oCmbCodigoModelo.value;
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
});