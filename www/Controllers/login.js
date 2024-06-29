async function loginUser(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const response = await fetch('http://localhost:3000/login', {
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
      alert(result.mensaje);
      // Guardar el token en sessionStorage
      sessionStorage.setItem('token', result.token);
      window.location.href = '/www/index.html'; // Redirigir al usuario
    } else {
      alert(result);
    }
  }