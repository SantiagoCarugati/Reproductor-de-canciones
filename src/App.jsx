import React, { useState, useEffect } from 'react';
import AddSongForm from './components/AddSongForm.jsx';
import SongList from './components/SongList.jsx';
import './index.css';

function App() {
  const [songs, setSongs] = useState(() => {
    const storedSongs = localStorage.getItem('youtubeSongs');
    return storedSongs
      ? JSON.parse(storedSongs).map(song => ({ ...song, reproductions: song.reproductions || 0 }))
      : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filteredSongs, setFilteredSongs] = useState(songs);

  useEffect(() => {
    localStorage.setItem('youtubeSongs', JSON.stringify(songs));
    setFilteredSongs(sortAndFilterSongs(songs, searchTerm, sortBy, sortDirection));
  }, [songs, searchTerm, sortBy, sortDirection]);

  const handleAddSong = (newSong) => {
    setSongs([...songs, { ...newSong, reproductions: 0 }]);
  };

  const handleRemoveSong = (indexToRemove) => {
    const updatedSongs = songs.filter((_, index) => index !== indexToRemove);
    setSongs(updatedSongs);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortBy = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
  };

  const incrementReproductionCount = (url) => {
    const updatedSongs = songs.map(song =>
      song.url === url ? { ...song, reproductions: song.reproductions + 1 } : song
    );
    setSongs(updatedSongs);
  };

  const sortAndFilterSongs = (songList, term, sortKey, direction) => {
    let sortedAndFiltered = [...songList];

    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      sortedAndFiltered = sortedAndFiltered.filter(song =>
        song.title.toLowerCase().includes(lowerCaseTerm)
      );
    }

    if (sortKey === 'title') {
      sortedAndFiltered.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return direction === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      });
    } else if (sortKey === 'reproductions') {
      sortedAndFiltered.sort((a, b) => b.reproductions - a.reproductions);
    }

    return sortedAndFiltered;
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="app-background-container" style={{
        backgroundColor: '#f9f9f9', // Un color de fondo claro para el contenedor
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '80%', // Ajusta el ancho según tu dibujo
        maxWidth: '900px', // Un ancho máximo razonable
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1>Reproductor de Canciones</h1>
        <AddSongForm onAddSong={handleAddSong} />
        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          width: '100%', // Ocupa el ancho del contenedor principal
          maxWidth: '450px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <label htmlFor="search" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Buscar canción:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Ingresa el título"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', marginBottom: '10px' }}
          />
          {songs.length > 0 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ fontWeight: 'bold' }}>Ordenar por:</label>
              <button onClick={() => handleSortBy('title')} style={{ backgroundColor: '#5cb85c', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>Título {sortBy === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}</button>
              <button onClick={() => handleSortBy('reproductions')} style={{ backgroundColor: '#5cb85c', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em' }}>Reproducciones {sortBy === 'reproductions' && '▼'}</button>
            </div>
          )}
        </div>
        <h2 style={{ marginBottom: '15px', color: '#333' }}>Lista de Canciones</h2>
        <SongList
          songs={filteredSongs}
          onRemoveSong={handleRemoveSong}
          onPlaySong={incrementReproductionCount}
        />
      </div>
    </div>
  );
}

export default App;