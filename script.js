
    /* 1. Contador Regresivo */
    const eventDate = new Date(2026, 8, 19, 21, 0, 0).getTime();

    setInterval(function() {
      const now = new Date().getTime();
      const distance = eventDate - now;

      document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
      document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);

    /* 2. Reproductor de Música */
    const music = document.getElementById('bg-music');
  const icon = document.getElementById('music-icon');
  let isPlaying = false;

  function toggleMusic() {
    if (isPlaying) {
      music.pause();
      icon.textContent = '🎵';
      isPlaying = false;
    } else {
      music.play().then(() => {
        icon.textContent = '🔊';
        isPlaying = true;
      }).catch(error => {
        console.log("Reproducción bloqueada:", error);
      });
    }
  }

  // Intentar reproducir automáticamente al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    music.play().then(() => {
      // Si el navegador permite el autoplay sin interacción
      icon.textContent = '🔊';
      isPlaying = true;
    }).catch(() => {
      // Si el navegador lo bloquea, esperamos al primer clic del usuario en la página
      console.log("Autoplay bloqueado por el navegador. Esperando interacción del usuario...");
      
      const unlockAudio = () => {
        music.play().then(() => {
          icon.textContent = '🔊';
          isPlaying = true;
          // Removemos los escuchadores una vez que se reproduzca
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        }).catch(err => console.log(err));
      };

      document.addEventListener('click', unlockAudio);
      document.addEventListener('keydown', unlockAudio);
    });
  });

    /* 3. Carrusel de Fotos */
    let currentSlide = 0;
    function moveSlide(direction) {
      const slider = document.getElementById("slider");
      const totalSlides = slider.children.length;
      currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    /* 4. Confeti y Confirmación por WhatsApp */
    function confirmAssistance() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });           

      setTimeout(() => {
        const phone = "5491154783151"; // Reemplazar por tu número real
        const text = encodeURIComponent("¡Hola! Quiero confirmar mi asistencia a los 15 de Abril ✨");
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      }, 1000);
    }

    /* 5. Modal de Regalos */
    function openModal() { document.getElementById("gift-modal").style.display = "flex"; }
    function closeModal() { document.getElementById("gift-modal").style.display = "none"; }

    function copyAlias() {
      const alias = document.getElementById("alias-text").innerText;
      navigator.clipboard.writeText(alias);
      alert("¡Alias copiado al portapapeles!");
    }
