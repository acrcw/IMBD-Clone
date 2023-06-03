import React, { useState, useEffect } from 'react'
import transformer from '../images/wall.jpg'
import left from '../images/left.png'
import Movies from '../components/Movies.js'
import right from '../images/right.png'
import axios from 'axios';
function Banner() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setindex] = useState(0);
  // state-> page change it with setpage()
  function goAhead() {
    
    setindex((index + 1)%20)
  }
  function goback() {
    if (index > -1)
      setindex(index - 1)
  }
  let interval = setInterval(function () {
    setIsLoading(false);
    clearInterval(interval);
    goAhead()

  }, 6000);

  useEffect(function () {
    
    axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=4f2b04c8b1dffccd33d5130478903ae1&page=1").then((response) => {
      {
        setMovies(response.data.results);
        if (movies.length > 0) {
          setIsLoading(false);

        }




        // console.table(response.data.results);


      }
    })
  })
  return <>
    {

      isLoading == true ?
        <div className={`bg-[url(${transformer})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center`}>
          <div className='text-xl md:text-3xl text-white p-2 bg-lime-400 bg-opacity-20 w-full flex justify-center'>Title</div>
        </div>
        :

        <div className={`bg-[url(https://image.tmdb.org/t/p/original/${movies[index].backdrop_path})] h-[40vh] md:h-[70vh] bg-center  bg-cover flex flex-row relative items-end justify-center`}>

          <div className='text-xl md:text-3xl text-white p-2 bg-lime-400 bg-opacity-20 w-full flex justify-center'>{movies[index].title}</div>
        </div>
    }
    </>
  



}

export default Banner