import React, { useState } from 'react';

function AddSongForm({ onAddSong }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const isValidYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrlError('');

    if (!title.trim()) {
      alert('Por favor, ingresa el título de la canción.');
      return;
    }

    if (!url.trim()) {
      alert('Por favor, ingresa la URL de YouTube.');
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setUrlError('Por favor, ingresa una URL de YouTube válida.');
      return;
    }

    onAddSong({ title, url, reproductions: 0 });
    setTitle('');
    setUrl('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{
        backgroundColor: '#f9f9f9', // Un color de fondo claro
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sutil sombra
        width: '80%',
        maxWidth: '450px', // Un poco más ancho que antes
        marginBottom: '20px', // Espacio entre los cuadros
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>Agregar Canción</h2> {/* Reintroducimos el título dentro del cuadro */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>Nombre de la canción:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="url" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', textAlign: 'left' }}>URL de YouTube:</label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            {urlError && <p style={{ color: 'red', fontSize: '0.9em', marginTop: '5px' }}>{urlError}</p>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#5cb85c', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}>Agregar</button> {/* Cambiamos el texto del botón */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSongForm;