'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { db, collection, addDoc } from '../../firebaseConfig';
import { useAuth } from '../..//AuthContext';
import Image from 'next/image';
import Card from './Card';
const Feed = () => {
const [data,setData] = useState<any>([]);
const [dataLoading,setDataLoading] = useState(false);
const {user,loading} = useAuth();

const pageRef = useRef(1);
const [error, setError] = useState<string | null>(null);
const handleClick = async (data:any) => {
    if (!data) {
      return;
    }

    setDataLoading(true);
    setError(null);

    try {
      const docRef = await addDoc(collection(db, 'wishlist'), {
        data,
        userId:user?.uid,
        timestamp: new Date(),
        id:data.id
      });
      console.log('Document written with ID: ', docRef.id);
 // Clear the input after successful submission
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Error adding document');
    } finally {
      setDataLoading(false);
    }
  };
const fetchData = () => {
    console.log("ran")
    pageRef.current+=1;
    axios.get(`https://api.themoviedb.org/3/discover/tv?page=${pageRef.current}`, {
        headers:{
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQwZWU0MDU5MmYzNjUzMzUwMzcxNTRiNmQxMjA4NCIsIm5iZiI6MTcyMzkwNDAwNS44ODY3NCwic3ViIjoiNjVmOWFlZDg3OThjOTQwMTg1MTY4ZjFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F-y-vdiBhfSVIDODXe1Kil4qS0cJOESZv9kIuWCuwSw`
        }
       }).then(res => setData([...data,...res.data.results]))
}
useEffect(() => {
   axios.get(`https://api.themoviedb.org/3/discover/tv?page=${pageRef.current}`, {
    headers:{
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQwZWU0MDU5MmYzNjUzMzUwMzcxNTRiNmQxMjA4NCIsIm5iZiI6MTcyMzkwNDAwNS44ODY3NCwic3ViIjoiNjVmOWFlZDg3OThjOTQwMTg1MTY4ZjFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F-y-vdiBhfSVIDODXe1Kil4qS0cJOESZv9kIuWCuwSw`
    }
   }).then(res => setData(res.data.results))
},[])
  return (
    <>
    {user? (
  
      <InfiniteScroll
       pageStart={pageRef.current}
       loadMore={fetchData}
       hasMore={true}
       loader={<div className="loader" key={0}>Loading ...</div>}
   >
         <div className='flex gap-4 flex-wrap p-12 justify-center'>  {data.map(((tvShow:any,index:number) => <Card key={index} show={tvShow} handleClick={handleClick} buttonText={"Add to Wishlist"}/>))}</div>
     </InfiniteScroll>
   
    ):"Loading..."}
</>
  )
}

export default Feed
