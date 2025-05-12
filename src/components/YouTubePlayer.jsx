import React from 'react';
import PropTypes from 'prop-types';

function YouTubePlayer({ url }) {
  const extractVideoId = (url) => {
    const regExp = /^.*((http:\/\/googleusercontent\.com\/youtube\.com\/3\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7] && match[7].length === 11) ? match[7] : false;
  };

  const videoId = extractVideoId(url);

  if (!videoId) {
    return <p>URL de YouTube no válida.</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-player">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

YouTubePlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

export default YouTubePlayer;
