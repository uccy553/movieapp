import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai'
import noi from '../assets/noi.png'
import  { Container } from './Navbar'
import TrailerTvShows from '../trailers/TrailerTvShows'

const TvShows = () => {
    const { toggle, inputValue } = useContext(Container);
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("")

  const input = inputValue
  const shown = input ? 'search' : 'discover'
  const API = `https://api.themoviedb.org/3/${shown}/tv?api_key=db082cf4f9bb9efd32884473afa84d3f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
  const image = 'https://image.tmdb.org/t/p/w500/';

  const Tvshows = async () => {
    const data = await axios.get(API, {
      params: {
        query: input
      }
    });
    const result = data.data.results;
    setShowData(result) 
  }

  useEffect(() => {
    Tvshows();
  },[input]);

  const TvShowTitle = (data) => {
    setTitle(data.name);
    setTrailer(!trailer)
  }

  return (
    <>
    <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
        <div className='movies-container'>
      {showData.map((data) => (
        <div key={data.id} style={{ marginTop: '5em' }}>
            <div id={trailer ? 'container' : 'NoContainer'}>
                <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => TvShowTitle(data)} style={{ zIndex: '1' }} />
                <img src={data.poster_path ? `${image}${data.poster_path}` : noi} alt={data.name} onClick={() => TvShowTitle(data)} />
                <h3 id={data.name.length > 28 ? 'smaller-text' : ""} className={toggle ? 'mainColor' : 'secondaryColor'} >{data.name}</h3>
            </div>
        </div>
      ))}
      {trailer ? '' : <TrailerTvShows showData={showData} TvShowsTitle={title} setTrailer={setTrailer} /> }

        </div>
      </div>
    </>

  )
}

export default TvShows