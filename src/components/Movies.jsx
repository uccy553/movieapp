import axios from 'axios'
import MoviesTrailer from '../trailers/MoviesTrailer'
import React, { useEffect, useContext, useState } from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import noi from '../assets/noi.png'
import { Container } from './Navbar'

const Movies = () => {
    const [movieData, setMovieData] = useState([]);
    const [trailer, setTrailer] = useState(true);
    const [movieTitle, setMovieTitle] = useState("")
    const { toggle, inputValue } = useContext(Container);
    const input = inputValue
    const shown = input ? 'search' : 'discover'
    const image = 'https://image.tmdb.org/t/p/w500/';
    const API = `https://api.themoviedb.org/3/${shown}/movie?api_key=db082cf4f9bb9efd32884473afa84d3f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

    const MovieCall = async () => {
      try {
        const data = await axios.get(API, {
            params: {
                query: inputValue
            }
        })
        const result = data.data.results
        setMovieData(result);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

  useEffect(() => {
    MovieCall()
  },[input]);

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }
  return (
    <>
    <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
            {movieData.map((movie) => (
                <div key={movie.id} style={{ marginTop: '5em' }}>
                    <div id={trailer ? 'container' : 'NoContainer'}>
                    <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? 'playIcon' : 'hide'} onClick={() => MoviesTitle(movie)} style={{ zIndex: '1' }} />
                    <img src={movie.poster_path ? `${image}${movie.poster_path}` : noi} alt="movie-poster" onClick={() => MoviesTitle(movie)} />
                    <h3 id={movie.title.length > 20 ? 'smaller-Text' : ''} className={toggle ? 'mainColor' : 'secondaryColor'}> {movie.title}</h3>
                    </div>
                </div>
            ))}
            {/* <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} fontSize={40} color="#fff" cursor="pointer" className={toggle ? 'DarkTheme' : 'LightThemeClose'} onClick={() => setTrailer(true)} /> */}
        </div>
        {trailer ? '' : <MoviesTrailer movieData={movieData} moviesTitle={movieTitle} setTrailer={setTrailer} /> }
    </div>
    </>
  )
}

export default Movies
