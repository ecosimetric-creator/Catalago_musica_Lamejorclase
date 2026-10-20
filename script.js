document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('artist-form');
    const grid = document.getElementById('artist-grid');
    
    // Cargar artistas desde localStorage al iniciar
    let artists = JSON.parse(localStorage.getItem('artists')) || [];

    // Función para renderizar los artistas en pantalla
    function renderArtists() {
        grid.innerHTML = ''; // Limpiar el grid actual
        
        if (artists.length === 0) {
            grid.innerHTML = '<p style="color: #b3b3b3; grid-column: 1 / -1; text-align: center;">No has agregado ningún artista aún.</p>';
            return;
        }

        artists.forEach((artist, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Renderizamos la estructura de la tarjeta
            card.innerHTML = `
                <img src="${artist.photo}" alt="${artist.name}">
                <h3>${artist.name}</h3>
                <p>${artist.genre}</p>
                <button class="delete-btn" onclick="deleteArtist(${index})">Eliminar</button>
            `;
            grid.appendChild(card);
        });
    }

    // Función global para eliminar artistas
    window.deleteArtist = (index) => {
        artists.splice(index, 1);
        localStorage.setItem('artists', JSON.stringify(artists)); // Actualizar almacenamiento
        renderArtists();
    };

    // Escuchar el evento de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que la página se recargue
        
        const name = document.getElementById('artist-name').value;
        const genre = document.getElementById('artist-genre').value;
        const fileInput = document.getElementById('artist-photo');
        
        // Verificar si se seleccionó un archivo
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            
            // Evento que se dispara cuando la imagen termina de cargarse en memoria
            reader.onload = (event) => {
                const newArtist = {
                    name: name,
                    genre: genre,
                    photo: event.target.result // Base64 de la imagen
                };
                
                artists.push(newArtist);
                localStorage.setItem('artists', JSON.stringify(artists));
                
                renderArtists(); // Actualizar la vista
                form.reset();    // Limpiar el formulario
            };
            
            // Leer el archivo como una URL de datos (Base64)
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    // Renderizar al inicio
    renderArtists();
});
