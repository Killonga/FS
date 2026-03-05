// JavaScript para manejar el formulario de waitlist
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('validationCustomEmail').value;
  if (email) {
    fetch('/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).then(response => {
      if (response.ok) {
        new bootstrap.Modal(document.getElementById('waitlistSuccessModal')).show();
      } else {
        alert('Error al unirse a la lista de espera');
      }
    });
  }
});