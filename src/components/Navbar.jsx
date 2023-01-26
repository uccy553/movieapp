import React, { useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Movies from './Movies';
import Trends from './Trends';
import TvShows from './TvShows';

export const Container = React.createContext();

const Navbar = () => {
    const [toggle, setToggle] = useState(true);
    const [inputValue, setInputValue] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

  return (
    <Container.Provider value={{toggle, inputValue}}>
         <header>
      <nav className={toggle ? '' : 'navBarColor'} >
        <div className='nav-options'>
            <NavLink to="/" onClick={() => setIsOpen(false)}>
                <h1 id={toggle ? '' : 'heading'}>UFLIX</h1>
            </NavLink>

            <div className={isOpen ? "responsive-menu open" : "responsive-menu"}>
              <NavLink to="/" onClick={() => setIsOpen(false)} style={({activeClassName}) => {return {color: activeClassName ? '#ff206e' : '#fff'}}}>
                  <span id={toggle ? 'Movies' : 'MoviesLight'} className={location.pathname === "/" ? "active" : ""}>Movies</span>
              </NavLink>

              <NavLink to="/TvShows" onClick={() => setIsOpen(false)}>
                  <span id={toggle ? 'Movies' : 'MoviesLight'}  className={location.pathname === "/TvShows" ? "active" : ""}>TV shows</span>
              </NavLink>

              <NavLink to="/Trends" onClick={() => setIsOpen(false)}>
                  <span id={toggle ? 'Movies' : 'MoviesLight'} className={location.pathname === "/Trends" ? "active" : ""}>Trending</span>
              </NavLink>
            </div>

            
            <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
              <div className="hamburger"></div>
            </div>

        </div>

        <div className='input-group'>
        <input type="text" placeholder="search movies and shows" onChange={(e) => setInputValue(e.target.value)} className="input" />
        <HiSearch fontSize={21} color="black" id="search" />
        <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
            <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>
        </div>
        </div>
      </nav>

          </header>
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='TvShows' element={<TvShows />} />
        <Route path='Trends' element={<Trends />} />
      </Routes>
    </Container.Provider>
 )
}

export default Navbar
