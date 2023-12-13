var nombre = document.getElementById("nombre_completo");

if (nombre == null) {
    // solo aparece cuando esta logueado
}else{
    nombre.innerHTML = `<h4>Bievenido ${user_success.nombre}</h4>`
}

listarTarjetasVersiones();


