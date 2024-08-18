import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
interface props {
    show:{
        name:string,
        poster_path:string,
        overview:string,
      
    },
    handleClick:(show?:any,id?:string) => {},
    buttonText:string,

  
}
const Card = ({show,handleClick,buttonText}:props) => {
    const [loading, setLoading] = useState(false);

    const addToWish = async () => {
        setLoading(true);
        const result = await handleClick(show);
        if (result) {
            setLoading(false);
        }
    }
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <div onClick={() => addToWish()} className='w-fit max-w-full flex sm:flex-row flex-col sm:h-[300px] shadow-md gap-6 pr-3 '> 
 
    <div className='sm:w-[230px] sm:h-[300px] h-[420px] max-w-full relative'>
    <Image  alt='img' 
    src={`${BASE_IMAGE_URL}${show.poster_path}`}
     fill
    />
    </div>
    <div className='w-[400px] max-w-full sm:h-full overflow-y-scroll  p-4 flex flex-col items-center justify-start'>
        
    <h1 className='text-xl text-center mb-3 font-medium'>{show.name}</h1>
    <button className='bg-black sm:px-6 px-4 py-2 text-white rounded-md mt-2 mb-4 w-full' disabled={loading}>{loading?"Loading...":buttonText}</button>
    <p className='text-sm '>{show.overview}</p>
    </div>
    </div>
  )
}

export default Card
