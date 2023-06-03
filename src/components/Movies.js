import React, { useState, useEffect } from 'react'
import transformer from '../images/wall.jpg';
import blackstar from '../images/blackstar.png'
import { Vortex } from 'react-loader-spinner';
import Pagination from './Pagination';
import axios from 'axios';
function Movies() 
{
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hover, setHover] = useState('');
  const [favourites, setFavourites] = useState([]);
  // state-> page change it with setpage()
  function goAhead()
  {
    setpage(page + 1)
  }
  function goback()
  {
    if (page > 1)
      setpage(page - 1)
  }
  let interval = setInterval(function () {
    setIsLoading(false);
    clearInterval(interval);
    // setindex(index + 1)
  }, 3000);
  useEffect( function () {
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=4f2b04c8b1dffccd33d5130478903ae1&page=${page}`).then((response) => {
      {
        setMovies(response.data.results);
        console.table(response.data.results);
        if (movies.length == 0) {
          setIsLoading(true);
        }
        else {
          setIsLoading(false);
        }
        // let oldfav=;
        let oldfav=JSON.parse(localStorage.getItem("imdb"));
        if(oldfav==null)
        {
          localStorage.setItem("imdb",JSON.stringify([])); // initailize local storage
          setFavourites([])
        }
        else
        setFavourites([...oldfav])    
      }
    })
  },[page,isLoading])
   
  let add =(movie)=>
  {
    // let newarray=[];
    if(favourites.length==0 || favourites==null)
    {
      setFavourites([movie])
    }
    else
    {
      //  newarray=[]
      setFavourites([...favourites,movie])
    }
    
    console.log(favourites)
    localStorage.setItem("imdb",JSON.stringify(favourites));

  }


  let removemovie =(movie)=>{
    
      let newarray=favourites.filter((m)=>m.id!=movie.id)
      setFavourites([...newarray])
      localStorage.setItem("imdb",JSON.stringify(favourites));
      console.log(favourites);
      
     
      
    // console.log(newarray)
  }
  return <>
  <div className='mb-8'>
    <div className='mt-8 mb-8 font-bold text-2xl text-center'>Trending Movies</div>
    <div className='flex flex-wrap justify-center '>
      { //javascript
        isLoading == false ?
          movies.map((movie) => (
            <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] rounded-xl md:h-[40vh] md:w-[200px] h-[25vh] w-[150vh] bg-center bg-cover relative flex items-end m-8 hover:scale-110 transition delay-10 duration-200 ease-in-out`}
            onMouseEnter={()=>{setHover(movie.id)
              console.log(movie.id)
            }}
            onMouseLeave={()=>setHover("")}
            >

              {
                hover==movie.id &&    <>
                {favourites.find((m)=>m.id==movie.id)? <div className={`absolute top-4 right-2 cursor-pointer` } onClick={()=>removemovie(movie)}> ✖ </div>: <div className={`absolute top-4 right-2 cursor-pointer` } onClick={()=>add(movie)}> 🤍 </div>}
               
               
                </>
              }
            
              <div className='bg-lime-400 bg-opacity-30 w-full text-white text-s py-2 text-center rounded-b-xl'>  {movie.title}    </div>
            </div>
          ))
          : <div className={` bg-slate-100 justify-center  rounded-xl md:h-[40vh] md:w-[200px] h-[25vh] w-[150vh] bg-center bg-cover flex items-end m-8 `}>
            <Vortex
              visible={true}
              height="230"
              width="90"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['green', 'green', 'green', 'green', 'green', 'green']}
            /></div>

      }
    </div>

  </div>
  <Pagination pageProp={page} goback={goback} goAhead={goAhead} />
</>
}
export default Movies 