import React,{useState} from 'react'
// anything that changes put it in state

function Pagination({pageProp,goback,goAhead}) {
  
  return <>
  {/* <div className='w-full flex justify-center'>
    <button className='p-2 border-2 border-lime-400 text-lime-400 border-r-0 rounded-l-xl' 
    onClick={goback}
     >Previous</button>
    <button className='p-2 border-2 border-lime-400 text-lime-400 '>
      {pageProp}
      </button> 
    <button className='p-2 border-2 border-lime-400 text-lime-400 border-l-0 rounded-r-xl' 
    onClick={goAhead}
    >
      Next</button>
  </div> */}

<div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

          <div class="inline-flex mt-2 xs:mt-0">
            <button class={"text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"} onClick={()=>{goback()}}>
              Prev
            </button>
            <button class={"text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"}  onClick={()=>{goAhead()}}>
              Next
            </button>
          </div>
        </div>
  </>
   
}

export default Pagination