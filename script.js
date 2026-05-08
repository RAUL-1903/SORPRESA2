document.addEventListener('DOMContentLoaded', () => {
    
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const btnCerrar = document.getElementById('btn-cerrar-inicio');
    const cancionInicio = document.getElementById('cancion1');
    const contenedorLluvia = document.getElementById('lluvia-romantica');
    
    const muteBtn = document.getElementById('mute-control');
    const muteIcon = document.getElementById('mute-icon');
    
    const playMusicBtn = document.getElementById('playMusic');
    const bgMusic = document.getElementById('bgMusic');
    const playIcon = document.getElementById('play-icon');

    // Elementos de la nueva animación interactiva
    const fotoSorpresa = document.getElementById('foto-sorpresa');
    const seccionMensaje = document.getElementById('seccion-mensaje');
    const textoInstruccion = document.getElementById('texto-instruccion');

    let isMuted = false;

    // 1. LLUVIA DE ROSAS
    if (contenedorLluvia) {
        for (let i = 0; i < 35; i++) {
            let elemento = document.createElement('div');
            elemento.classList.add('elemento-cayendo');
            elemento.innerHTML = '🌹'; 
            elemento.style.left = Math.random() * 100 + 'vw';
            elemento.style.animationDuration = Math.random() * 3 + 4 + 's'; 
            elemento.style.animationDelay = Math.random() * 5 + 's';
            contenedorLluvia.appendChild(elemento);
        }
    }

    // 2. AUDIO PANTALLA INICIO
    const activarAudio = () => {
        if (cancionInicio.paused) {
            cancionInicio.play().catch(e => console.log("Esperando clic del usuario..."));
        }
        pantallaInicio.removeEventListener('click', activarAudio);
    };
    pantallaInicio.addEventListener('click', activarAudio);

    // 3. BOTÓN DE SILENCIO GLOBAL
    muteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        isMuted = !isMuted;
        cancionInicio.muted = isMuted;
        bgMusic.muted = isMuted;
        muteIcon.textContent = isMuted ? '🔇' : '🔊';
    });

// 4. BOTÓN "ENTRAR ❤️"
    if (btnCerrar && pantallaInicio) {
        btnCerrar.addEventListener('click', (e) => {
            e.stopPropagation();
            pantallaInicio.style.opacity = '0';
            
            // Ocultamos la pantalla después de la transición,
            // ¡pero la canción 1 sigue reproduciéndose intacta!
            setTimeout(() => {
                pantallaInicio.style.visibility = 'hidden';
            }, 800);
        });
    }

    // 5. EFECTO REVELAR AL HACER CLIC EN LA FOTO
    if (fotoSorpresa && seccionMensaje) {
        fotoSorpresa.addEventListener('click', () => {
            fotoSorpresa.classList.add('foto-animacion-abrir');
            
            if(textoInstruccion) {
                textoInstruccion.style.opacity = '0';
                setTimeout(() => textoInstruccion.style.display = 'none', 300);
            }
            seccionMensaje.classList.add('abierto');
        }, { once: true });
    }

    // 6. REPRODUCTOR CANCIÓN PRINCIPAL (Canción 2)
    if (playMusicBtn && bgMusic) {
        let isMainPlaying = false;
        playMusicBtn.addEventListener('click', () => {
            if (isMainPlaying) {
                bgMusic.pause();
                playIcon.textContent = '▶';
                playMusicBtn.innerHTML = '<span id="play-icon">▶</span> Reproducir';
            } else {
                // AQUÍ DETENEMOS LA CANCIÓN 1 CUANDO SE REPRODUCE LA 2
                if (cancionInicio && !cancionInicio.paused) {
                    cancionInicio.pause();
                }
                
                bgMusic.play();
                playIcon.textContent = '⏸';
                playMusicBtn.innerHTML = '<span id="play-icon">⏸</span> Pausar';
            }
            isMainPlaying = !isMainPlaying;
        });
    }
});