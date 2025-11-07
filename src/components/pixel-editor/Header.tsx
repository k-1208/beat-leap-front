import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-6xl md:text-8xl font-bold tracking-widest text-white">
        BEAT LEAP
      </h1>
      <p 
        className="text-2xl md:text-3xl text-[#d371ff] mt-2 tracking-wider"
        style={{ textShadow: '0 0 5px #d371ff, 0 0 10px #d371ff' }}
      >
        Pixel Fog
      </p>
    </header>
  );
};

export default Header;