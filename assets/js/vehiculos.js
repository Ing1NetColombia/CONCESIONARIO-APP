var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
var frmVehiculos = document.getElementById("frmVehiculos");

listarVehiculos();
  
// Sección de botones
var oBtnAgregar = document.getElementById("btn_agregar");
var oBtnCancelar = document.getElementById("btn_cancelar");
var oBtnGuardar = document.getElementById("btn_guardar");

// Seccion de campos
var oTxtCodigo = document.getElementById("codigo");
var oTxtNombre = document.getElementById("nombre");
var oChkBloqueado = document.getElementById("bloqueado");

function listarVehiculos(){
  var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

  var oTblVehiculos = document.getElementById("tbl_vehiculos");

  if (oTblVehiculos == null) return;

  oTblVehiculos.innerHTML = "";

  ls_vehiculos.forEach(function(obVehiculo){
    var cadena = `
      <tr>
        <td>${obVehiculo.codigo}</td>
        <td>${obVehiculo.nombre}</td>
        <td>${obVehiculo.bloqueado ? "Bloqueado" : "Activo"}</td>
        <td>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" onclick="editarVehiculo(${obVehiculo.codigo})">Editar</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="eliminarVehiculo(${obVehiculo.codigo})">Eliminar</button>
        </td>
      </tr>
    `;
    oTblVehiculos.innerHTML += cadena;  
  });
}

function editarVehiculo(codigo){
  var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

  var obVehiculo = ls_vehiculos.find(function(obVehiculo){
    return obVehiculo.codigo == codigo;
  });

  document.getElementById("codigo").value = obVehiculo.codigo;
  document.getElementById("nombre").value = obVehiculo.nombre;
  document.getElementById("bloqueado").checked = obVehiculo.bloqueado;

  eliminarVehiculo(codigo);

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);
}

function eliminarVehiculo(codigo){
  var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

  var ls_vehiculos = ls_vehiculos.filter(function(obVehiculo){
    return obVehiculo.codigo != codigo;
  });

  // Se carga menos el codigo filtrado es decir se elimina
  localStorage.setItem("vehiculos", JSON.stringify(ls_vehiculos));
  listarVehiculos();
}

// Boton Agregar
oBtnAgregar.addEventListener("click", function(){
  var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

  myBotones("AE");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  if (ls_vehiculos.length > 0) {
    oTxtCodigo.value = ls_vehiculos.length + 1;
  } else {
    oTxtCodigo.value = 1;
  }
});

// Boton Cancelar   
oBtnCancelar.addEventListener("click", function(){
              
  // Limpar los campos  
  oTxtCodigo.value = "";
  oTxtNombre.value = "";
  oChkBloqueado.checked = false;

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);
}); 

// Boton Guardar 
oBtnGuardar.addEventListener("click", function(){
              
  var ls_vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || []; 

  myBotones("GC");
  myFieldSet(!document.getElementById("myFieldSet").disabled);

  var obVehiculo = {
    codigo: oTxtCodigo.value,
    nombre: oTxtNombre.value,
    bloqueado: oChkBloqueado.checked
  };  

  // Validar que los campos no esten vacios
  if (obVehiculo.codigo == "" || obVehiculo.nombre == "") {
    alert("Los campos no pueden estar vacios");
    return;
  }

  ls_vehiculos.push(obVehiculo);
  localStorage.setItem("vehiculos", JSON.stringify(ls_vehiculos));
  frmVehiculos.reset();
  listarVehiculos();
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