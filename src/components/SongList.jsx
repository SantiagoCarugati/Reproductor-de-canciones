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
      <h2>Lista de Canciones</h2>
      {songs.length === 0 ? (
        <p>No hay canciones guardadas aún.</p>
      ) : (
        <ul>
          {songs.map((song, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', paddingRight: '10px' }}>
              <span style={{ flexGrow: 1 }}>{song.title}</span>
              <div>
                <button onClick={() => togglePlayerVisibility(song.url)} style={{
                  marginLeft: '0',
                  marginRight: '10px',
                  padding: '5px 10px',
                  fontSize: '0.9em',
                }}>
                  Reproductor
                </button>
                <a href={song.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0', marginRight: '10px' }}>
                  Abrir en YouTube
                </a>
                <button onClick={() => onRemoveSong(index)} style={{ marginLeft: '10', color: 'red', border: '1px solid red', background: 'white', cursor: 'pointer' }}>
                  Eliminar
                </button>
              </div>
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