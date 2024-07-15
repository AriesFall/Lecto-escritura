async function loginUser(event) {
  event.preventDefault();

  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const errorMsg = document.getElementById('error-msg');
  
  const response = await fetch(login_route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      correo,
      contrasena
    })
  });

  const result = await response.json();
  if (response.ok) {
    // Guardar el token en sessionStorage
    sessionStorage.setItem('token', result.token);
    window.location.href = './Views/admin.html'; // Redirigir al usuario
  } else {
    // Mostrar el mensaje de error
    errorMsg.textContent = "Correo o contraseña incorrectos";
    errorMsg.classList.remove('hidden');
  }
}
