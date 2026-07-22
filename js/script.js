// =============================================
// Menú de navegación (versión móvil)
// =============================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (mainNav) mainNav.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', false);
  });
});

// =============================================
// Año actual en el footer
// =============================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// =============================================
// FUNCIÓN PARA LA ALERTA FLOTANTE PERSONALIZADA (Inmune a bloqueos)
// =============================================
function mostrarAlertaExitosa(titulo, mensaje) {
  // Crear el contenedor del fondo
  const modal = document.createElement('div');
  modal.className = 'modal-alerta';

  // Crear la caja del mensaje
  modal.innerHTML = `
    <div class="modal-contenido">
      <h3>${titulo}</h3>
      <p>${mensaje}</p>
      <button class="modal-btn">Entendido</button>
    </div>
  `;

  // Agregar el modal a la página
  document.body.appendChild(modal);

  // Escuchar el clic en el botón para cerrar la alerta
  modal.querySelector('.modal-btn').addEventListener('click', function() {
    modal.remove();
  });
}


// =============================================
// Formulario de donaciones
// =============================================
const formDonaciones = document.getElementById('formDonaciones');

if (formDonaciones) {
  formDonaciones.addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Ejecutamos nuestra alerta personalizada nativa
    mostrarAlertaExitosa(
      '¡Donación Exitosa!', 
      'Muchas gracias por tu valioso apoyo a los ajolotes. Pronto recibirás un correo electrónico con la confirmación.'
    );
    
    formDonaciones.reset();
  });
}

// =============================================
// Formulario de voluntariado
// =============================================
const formVoluntariado = document.getElementById('formVoluntariado');

if (formVoluntariado) {
  formVoluntariado.addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Ejecutamos nuestra alerta personalizada nativa
    mostrarAlertaExitosa(
      '¡Registro Exitoso!', 
      'Tu información se guardó correctamente. Nos pondremos en contacto contigo muy pronto para iniciar el voluntariado.'
    );
    
    formVoluntariado.reset();
  });
}
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar el año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Enviar Formulario Voluntariado
  const formVoluntariado = document.getElementById('formVoluntariado');
  if (formVoluntariado) {
    formVoluntariado.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(formVoluntariado);

      try {
        const response = await fetch('guardar_voluntario.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.status === 'success') {
          Swal.fire('¡Gracias!', result.message, 'success');
          formVoluntariado.reset();
        } else {
          Swal.fire('Error', result.message, 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {

  // Lógica para enviar el formulario de Donaciones sin recargar la página
  const formDonaciones = document.getElementById('formDonaciones');
  
  if (formDonaciones) {
    formDonaciones.addEventListener('submit', async (event) => {
      event.preventDefault(); // Evita recargar la página

      const formData = new FormData(formDonaciones);

      try {
        const response = await fetch('guardar_donacion.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
          // Si tienes integrado SweetAlert2:
          if (typeof Swal !== 'undefined') {
            Swal.fire('¡Éxito!', result.message, 'success');
          } else {
            alert(result.message);
          }
          formDonaciones.reset(); // Limpia los campos del formulario
        } else {
          if (typeof Swal !== 'undefined') {
            Swal.fire('Atención', result.message, 'warning');
          } else {
            alert(result.message);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        if (typeof Swal !== 'undefined') {
          Swal.fire('Error', 'No se pudo procesar la donación.', 'error');
        } else {
          alert('No se pudo procesar la donación.');
        }
      }
    });
  }

});