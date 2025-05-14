import React, { useState } from 'react';
import YouTubePlayer from './YouTubePlayer.jsx';

function SongList({ songs, onRemoveSong, onPlaySong }) {
  const [visiblePlayers, setVisiblePlayers] = useState({});

  const togglePlayerVisibility = (url) => {
    setVisiblePlayers(prevState => {
      const newState = {
        ...prevState,
        [url]: !prevState[url]
      };
      if (newState[url]) {
        onPlaySong(url);
      }
      return newState;
    });
  };

  return (
    <div>
      {songs.length > 0 && <h2 style={{ marginBottom: '15px', color: '#333' }}>Lista de Canciones</h2>} 
      {songs.length === 0 ? (
        <p>No hay canciones guardadas aún.</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index} style={{
              padding: '10px 0',
              borderBottom: '1px solid #eee',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <span>{song.title} (Reproducciones: {song.reproductions})</span>
              <button onClick={() => togglePlayerVisibility(song.url)} style={{
                padding: '5px 10px',
                fontSize: '0.9em',
                marginTop: '5px',
                backgroundColor: '#5cb85c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>
                {visiblePlayers[song.url] ? 'Salir del reproductor' : 'Reproducir'}
              </button>
              <button onClick={() => window.open(song.url, '_blank')} style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px',
                fontSize: '0.9em',
                marginTop: '5px',
                borderRadius: '4px',
              }}>
                Abrir en YouTube
              </button>
              <button onClick={() => onRemoveSong(index)} style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px',
                fontSize: '0.9em',
                marginTop: '5px',
                borderRadius: '4px',
              }}>
                Eliminar
              </button>
              {visiblePlayers[song.url] && (
                <div style={{ marginTop: '10px' }}>
                  <YouTubePlayer url={song.url} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongList;