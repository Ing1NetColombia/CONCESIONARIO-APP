document.getElementById('frmRegistro').addEventListener('submit', function(e){  
    e.preventDefault();


    var nombre = document.getElementById('nombre').value;
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('usuario_correo').value;
    var password = document.getElementById('usuario_clave').value;

    var objUsuario = {
        nombre: nombre,
        usuario: usuario,
        email: email,
        password: password
    };

    if(nombre == '' || usuario == '' || email == '' || password == ''){
        var mensaje = document.getElementById('error-message');
        mensaje.textContent = 'Todos los campos son obligatorios';
        return;
    }
    
    // Obtengo los usuarios que se encuentran en el localStorage
    var ls_usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Valido que el usuario que se esta registrando no exista
    var existeUsuario = ls_usuarios.find(function(usuario){
        // valido que el usuario y el correo sean iguales, evitar que se registre el mismo usuario por correo
        return usuario.usuario == objUsuario.usuario || usuario.email == objUsuario.email;
    });

    if(existeUsuario){
        var mensaje = document.getElementById('error-message');
        mensaje.textContent = 'El usuario ya se encuentra registrado';
    }else{
        ls_usuarios.push(objUsuario);
        localStorage.setItem('usuarios', JSON.stringify(ls_usuarios));
        // alert('Usuario registrado correctamente');
        redireccionar('../login/index.html');
    }
});
