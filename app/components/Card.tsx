import React from 'react'
import Image from 'next/image'
interface props {
    show:{
        name:string,
        poster_path:string,
        overview:string,
      
    },
    handleClick:(show?:any,id?:string) => {},
    buttonText:string
}
const Card = ({show,handleClick,buttonText}:props) => {
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <div onClick={() => handleClick(show)} className='w-fit flex h-[300px] shadow-md gap-6 pr-3 '> 

    <div className='w-[230px] h-[300px] relative'>
    <Image  alt='img' 
    src={`${BASE_IMAGE_URL}${show.poster_path}`}
     fill
    />
    </div>
    <div className='w-[400px] h-full overflow-y-scroll  p-4 flex flex-col items-center justify-start'>
        
    <h1 className='text-xl text-center mb-3 font-medium'>{show.name}</h1>
    <button className='bg-black px-6 py-2 text-white rounded-md mt-2 mb-4 w-full'>{buttonText}</button>
    <p className='text-sm '>{show.overview}</p>
    </div>
    </div>
  )
}

export default Card
