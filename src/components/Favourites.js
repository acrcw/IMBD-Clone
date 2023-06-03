import React, { useState, useEffect } from 'react'
import sortup from '../images/sort-up.png'
import sortdown from '../images/sort-down.png'
import { Vortex } from 'react-loader-spinner';
import Pagination from './Pagination'
function Favourites() {
  // favourites page ui
  // searching,sorting ,filtering
  // connecting both page local storage,preserving reloads
  // hosting
  //tables 
  // update and deployment
  const [rows,setrows]=useState(5);
  const [favourites, setFavourites] = useState([]); // aall fav movie object
  const [fgenres, setfgenres] = useState([]); //list all fav generes
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setrating] = useState(0); // ascending means 1 decending means -1 neutra;l 0
  const [popularity, setpopularity] = useState(0);//  ascending means 1 decending means -1 neutra;l 0
  const [currentGenre, setcurrentGenre] = useState('All Genres'); // current genre
  const [search, setsearch] = useState("");
  const [currpage,setpage]=useState(1);
  const genreids = { 0:'All Genres',28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentry', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller', 10752: 'War' }

  useEffect(() => {
    let oldfav = JSON.parse(localStorage.getItem("imdb"));
    if(oldfav==null)
    {
      setFavourites([]);
    }
    else
    setFavourites([...oldfav])
    setIsLoading(false)
    //  console.log(favourites);  
  },[])



  useEffect(() => {
    // addgenreid();
    setIsLoading(true);
    // let temparray=favourites.map((movie)=>{movie.genre_ids.map((gid)=>{temparray.filter((obj)=>{gid!=obj})})})
    let temparray = [];
    for (let i = 0; i < favourites.length; i++) {
      let genreslistmovie = favourites[i].genre_ids;
      for (let j = 0; j < genreslistmovie.length; j++) {

        if (temparray.indexOf(genreslistmovie[j]) == -1) {
          temparray.push(genreslistmovie[j]);
        }



      }



    }
    // console.log(temparray);
    setfgenres([0,...temparray])
    setIsLoading(false);
  },[currentGenre,favourites])


  // setTimeout(setIsLoading(false),2000)
  // 

  let removemovie = (movie) => {
    let newarray = favourites.filter((m) => m.id != movie.id)
    setFavourites([...newarray])
    localStorage.setItem("imdb", JSON.stringify(newarray));
    console.log(newarray);
  }
  let filteredMovies=[];
  // filteredMovies=currentGenre=="All Genres"?fgenres:fgenres.filter((id)=>favourites.genre_ids.forEach(gid => {gid==id })) 
  if(currentGenre=="All Genres")
  filteredMovies=favourites;
  else
  {
    for(let mov=0;mov<favourites.length;mov++)
    {
      let genrelist=favourites[mov].genre_ids;
      // let flag=false;
      for(let i=0;i<genrelist.length;i++)
      {
        if(genreids[genrelist[i]].toString()===currentGenre)
        {
          if(filteredMovies.indexOf(favourites[mov])==-1)
          {
            filteredMovies.push(favourites[mov]);
          }
        }
      }
    }
  }
  if(rating==-1)
  {
    filteredMovies=filteredMovies.sort((obj1,obj2)=>{return obj1.vote_average-obj2.vote_average})
  }
  else if(rating==1)
  {
    filteredMovies=filteredMovies.sort((obj1,obj2)=>{return obj2.vote_average-obj1.vote_average})
  }

  if(popularity==-1)
  {
    filteredMovies=filteredMovies.sort((obj1,obj2)=>{return obj1.popularity-obj2.popularity})
  }
  else if(popularity==1)
  {
    filteredMovies=filteredMovies.sort((obj1,obj2)=>{return obj2.popularity-obj1.popularity})
  }
  if(search!=="")
  filteredMovies=filteredMovies.filter((movie)=>{ if(movie.title.toLowerCase().indexOf(search.toLowerCase())>-1)
  {
    return movie;
  }})
  else
  filteredMovies=filteredMovies;
  let maxpage=Math.ceil(filteredMovies.length/rows);
  let startindex=(currpage-1)*rows; // currpage =1 // 1-1==0 0*5==0
  let endindex=startindex+rows; // startindex=0 // 1-1==0 0*5==0
  filteredMovies=filteredMovies.slice(startindex,endindex);
  let prev=()=>{
    if(currpage>1)
    {
      setpage(currpage-1)
    }
  }

    let next=()=>
    {
      if(currpage<maxpage)
      {
        setpage(currpage+1)
      }
    }

  return <>

    <div className='flex justify-center flex-wrap flex-row space-x-2 space-y-2 mt-4' >
      <br />
      

      {!isLoading?fgenres.map((id)=>
      <button className={currentGenre===genreids[id]
        ? 'text-lg px-2 bg-green-400 p-2  rounded-xl font-bold text-white border-green-400 border-2'
        :'text-lg px-2 bg-white-400 p-2  rounded-xl font-bold bg-white text-green-400 border-green-400 border-2'
      } onClick={()=>{setcurrentGenre(genreids[id].toString())
      setpage(1)
      setsearch("")}}>{genreids[id]}</button>
      ):console.log("not found")}
        
    </div>

    <div className='flex flex-row  justify-center'>
      <input placeholder='Search' value={search} onChange={(e)=>{setsearch(e.target.value)}} type='text' className='border-2 m-2 text-center'></input>
      <input placeholder='Rows' value={rows} onChange={(e)=>{setrows(e.target.value)}} type='number' min="1" max="10" className='border-2 m-2 text-center'></input>
    </div>


    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Movie
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className='flex flex-row '> <img className='space-x-2 cursor-pointer' src={`${sortup}`} onClick={()=>{setrating(-1) 
                  setpopularity(0)}}></img> Rating <img className='space-x-2 cursor-pointer' src={`${sortdown}`} onClick={()=>{setrating(1)
                    setpopularity(0)}}></img></div>
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className='flex flex-row '> <img className='space-x-2 cursor-pointer' src={`${sortup}`} onClick={()=>{setpopularity(-1) 
                setrating(0)}}></img> Popularity <img className='space-x-2 cursor-pointer' src={`${sortdown}`} onClick={()=>{setpopularity(1)
                setrating(0)}}></img></div>
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Genre
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <div className='flex ml-[50vw]'><Vortex
              visible={true}
              height="230"
              width="90"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['green', 'green', 'green', 'green', 'green', 'green']}
            /></div> : filteredMovies.map((mov) => (
              <tr key={mov.id}>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-20 h-15">
                      <img class="w-full h-full "
                        src={`https://image.tmdb.org/t/p/w500/${mov.backdrop_path}`}
                        alt="" />
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {mov.title}
                        {/* {console.log(mov)} */}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{mov.vote_average}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {mov.popularity}
                  </p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 space-x-2 space-y-2 bg-white text-sm">
                  {mov.genre_ids.map((id) => (
                    <span class="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                      <span aria-hidden class="absolute inset-0  opacity-50 bg-blue-100 rounded-full"></span>
                      <span class="relative">{genreids[id]}</span>
                    </span>

                  ))}



                </td>
                <td class="px-5 py-5 text-sm ">
                  <button class="relative inline-block px-3 py-1 font-semibold  leading-tight text-white-100 rounded-full hover:cursor-pointer hover:border-2 hover:border-red-700 hover:text-red-700" onClick={() => removemovie(mov)}>
                    Remove
                    {/* <span class="relative">Remove</span> */}

                  </button>


                </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div
          class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

          <div class="inline-flex mt-2 xs:mt-0">
            <button
              class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l" onClick={()=>{prev()}}>
              Prev
            </button>
            <button
              class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"  onClick={()=>{next()}}>
              Next
            </button>
          </div>
        </div>


        
      </div>
    </div>





    {/* <div className='mt-4'><Pagination /></div> */}
  </>
}

export default Favourites