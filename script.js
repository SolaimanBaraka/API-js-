const getBrightness = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000;
const adjustColor = (r, g, b) => getBrightness(r, g, b) > 128 ? 
    `rgb(${Math.max(r-40,0)},${Math.max(g-40,0)},${Math.max(b-40,0)})` : 
    `rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)})`;

document.getElementById('boton-buscar').addEventListener('click', async () => {
    const anime = document.getElementById('anime').value.trim();
    if (!anime) return alert("Ingresa un nombre de anime");
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultado').innerHTML = '';
    
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&limit=1`);
        const { data } = await response.json();
        
        if (!data?.length) return mostrarError();
        
        document.getElementById('resultado').innerHTML = crearTemplate(data[0]);
        procesarImagen(data[0].images.jpg.image_url);
        
    } catch (error) {
        console.error(error);
        mostrarError();
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});

const crearTemplate = ({ title, type, episodes, status, score, synopsis, images }) => `
    <div class="anime-info">
        <img id="anime-image" src="${images.jpg.image_url}" alt="${title}" crossorigin="anonymous">
        <h2>${title}</h2>
        <p><strong>Tipo:</strong> ${type}</p>
        <p><strong>Episodios:</strong> ${episodes}</p>
        <p><strong>Estado:</strong> ${status}</p>
        <p><strong>Puntuación:</strong> ${score}</p>
        <p><strong>Sinopsis:</strong> ${synopsis}</p>
    </div>
`;

const procesarImagen = (url) => {
    const image = new Image();
    image.crossOrigin = 'Anonymous'; 
    image.src = url;
    
    image.onload = () => {
        const colorThief = new ColorThief();
        try {
            const [r, g, b] = colorThief.getColor(image);
            document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
            document.getElementById('titulo').style.color = getBrightness(r,g,b) > 128 ? '#333' : '#fff';
            document.getElementById('boton-buscar').style.backgroundColor = adjustColor(r,g,b);
        } catch (error) {
            console.error('Error al procesar imagen:', error);
        }
    };
};

const mostrarError = () => {
    document.body.style.backgroundColor = '#f4f4f4';
    document.getElementById('titulo').style.color = '#333';
    document.getElementById('boton-buscar').style.backgroundColor = '#87CEEB';
    document.getElementById('resultado').innerHTML = '<p>No se encontró el anime</p>';
};