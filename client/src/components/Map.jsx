import React from 'react';

const Map = ({ place, city, api_key}) => (
  <div>
    <iframe
      width="600"
      height="450"
      frameBorder="0"
      style={{ border:0 }}
      src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${place},${city}`} allowFullScreen>
    </iframe>
  </div>
);

export default Map;
