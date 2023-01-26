import { useState, useEffect, useContext } from 'react'
import ReactPlayer from 'react-player'
import movieTrailer from 'movie-trailer'
import { AiOutlineClose } from 'react-icons/ai'
import { Container } from '../components/Navbar'

const TrailerTvShows = ({ TvShowsTitle, setTrailer, showData }) => {
  const [video, setVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showError, setShowError] = useState(false);
  const { toggle } = useContext(Container);
  function handleSearch() {
    setVideo(TvShowsTitle)
	movieTrailer(video).then((res) => {
	setVideoUrl(res);
	});
}

useEffect(() => {
    handleSearch();
    let timeoutId = setTimeout(() => {
      if (!videoUrl) {
          setShowError(true)
      }
  }, 7000)
  return () => clearTimeout(timeoutId);
}, [videoUrl]);
  return (
    <>
        <div className='Container'>
        </div>

        <div className='trailer-container'>
            {!videoUrl && showError ? <p onClick={() => setShowError(false)} className="error">sorry 😔 No trailer available</p> : <ReactPlayer url={videoUrl} playing={false} controls={true} muted={false} className="play"  />}
            <AiOutlineClose fontSize={30} className={!videoUrl && showError ? 'close-btn1' : 'close-btn'} color="#fff" cursor="pointer" onClick={() => setTrailer(true)} 
/>

             {/* Display the overview below the video */}
             {showData.filter(movie => movie.name === TvShowsTitle).map(filteredMovie => (
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: '.9em', textAlign: 'center', width: '80%' }} className={toggle ? 'mainColor' : 'secondaryColor'}>{filteredMovie.overview}</p>
                    <p style={{ fontSize: '1.3em' }} className={toggle ? 'mainColor' : 'secondaryColor'}>release date: {filteredMovie.first_air_date}</p>
                </div>
            ))}
            
        </div>
    </>
  )
}

export default TrailerTvShows
