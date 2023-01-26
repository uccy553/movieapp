import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { AiOutlineClose, AiFillPlayCircle } from 'react-icons/ai'
import TrailerTrending from '../trailers/TrailerTrending'
import { Container } from '../components/Navbar';
import noi from '../assets/noi.png'

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const { toggle, inputValue } = useContext(Container);
  const [trailer, setTrailer] = useState(true);
  const [trendTitle, setTrendTitle] = useState('')
  
  const input = inputValue
  const shown = '/trending/all/week'
  const API = `https://api.themoviedb.org/3/trending/all/week?api_key=db082cf4f9bb9efd32884473afa84d3f`;
  const image = 'https://image.tmdb.org/t/p/w500/';

  const trending = async () => {
    const data = await axios.get(API, {
        params: {
            query: inputValue
        }
    });

    const result = data.data.results
    setTrends(result)
  }

  useEffect(() => {
    trending()
  },[input]);
  
  const TrendTitle = (trend) => {
    setTrendTitle(trend.title);
    setTrailer(!trailer)

  }
  return (
    <>
        <div>
            <div className={toggle ? 'mainBgColor' : 'secondaryBgColor'}>
                <div className='movies-container'>
                    {trends.map((trend) => (
                        <div key={trend.id} id={trailer ? 'container' : 'NoContainer'} style={{ position: 'relative', top: '5em' }}>
                            <AiFillPlayCircle color='#fff' fontSize={40} id={trailer ? "playIcon" : 'hide'} onClick={() => TrendTitle(trend)} style={{ zIndex: '1' }} />

                            <img src={trend.poster_path ? `${image}${trend.poster_path}` : noi} alt={trend.name} onClick={() => TrendTitle(trend)} />
                            <h3 id='smaller-text' className={toggle ? 'mainColor' : 'secondaryColor'} >{trend.title} {trend.name}</h3>
                        </div>
                    ))}
                    {trailer ? '' : <TrailerTrending trends={trends} trendTitle={trendTitle} setTrailer={setTrailer} /> }
                </div>
            </div>
        </div>

    </>
  )
}

export default Trends
