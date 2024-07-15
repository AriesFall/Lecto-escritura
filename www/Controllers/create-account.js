async function registerUser(event) {
  event.preventDefault();
  
  const nombreCompleto = document.getElementById('nombreCompleto').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const nivelCuenta = 3;

  const response = await fetch(createaccount_route, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nombreCompleto,
          correo,
          contrasena,
          nivelCuenta
      })
  });

  const result = await response.text();

  if (response.ok) {
      //Mostrar el mensaje de error
      const successMessage = document.getElementById('success-message');
      successMessage.textContent = "Cuenta creada exitosamente";
      successMessage.classList.remove('hidden');
  } else {
      // Mostrar el mensaje de error
      const errorMsg = document.getElementById('error-msg');
      errorMsg.textContent = "Ya existe una cuenta con el correo que estas ingresando";
      errorMsg.classList.remove('hidden');
  }
}
