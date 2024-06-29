async function registerUser(event) {
    event.preventDefault();
    
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const nivelCuenta = 3;

    const response = await fetch('http://localhost:3000/register', {
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
    alert(result);
  }