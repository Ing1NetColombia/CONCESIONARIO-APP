document.getElementById("frmLogin").addEventListener("submit", function (element) {
    
    element.preventDefault();

    // Crear el vector de usuarios
    var ls_usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    var objUsuario = {
        usuario_correo: document.getElementById("usuario_correo").value,
        usuario_clave: document.getElementById("usuario_clave").value
    };  

    var usuario_credencial = ls_usuarios.find(function (usuario) {
        return usuario.email == objUsuario.usuario_correo && usuario.password == objUsuario.usuario_clave;
    });

    if (usuario_credencial) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario_credencial)); 
        redireccionar("../index.html");
    }else{
        var errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "Usuario y/o Contraseña incorrecto. Por favor, verificar nuevamente.";
        errorMessage.style.display = "block";
    }
})



