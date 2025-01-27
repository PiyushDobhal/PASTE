import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex flex-col sm:flex-row bg-black/95 text-xl sm:text-2xl text-red-400 gap-4 sm:gap-7 justify-evenly p-4'>
      <NavLink to="/">
        <h1>Home</h1>
      </NavLink>
      <NavLink to="/pastes">
        <h1>Paste</h1>
      </NavLink>
    </div>
  );
}

export default Navbar;
