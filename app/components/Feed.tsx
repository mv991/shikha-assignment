'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { db, collection, addDoc ,} from '../../firebaseConfig';
import {query,where,getDocs} from "firebase/firestore";

import { useAuth } from '../..//AuthContext';
import Image from 'next/image';
import Card from './Card';
const Feed = () => {
const [data,setData] = useState<any>([]);
const [dataLoading,setDataLoading] = useState(false);
const {user,loading} = useAuth();

const pageRef = useRef(1);
const handleClick = async (data:any) => {
    if (!data) {
      return;
    }

    setDataLoading(true);


    try {
      const q = query(collection(db, 'wishlist'), where("id", "==", data.id), where("userId", "==", user?.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          alert("Item is already in your Wishlist");
          return true;
      }
      const docRef = await addDoc(collection(db, 'wishlist'), {
        data,
        userId:user?.uid,
        timestamp: new Date(),
        id:data.id
      });
      alert("Item added to Wishlist")
      return true

    } catch (e) {
     
      alert('Error adding to Wishlist');
      return false
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
         <div className='flex gap-4 flex-wrap p-12 justify-center'>  {data.map(((tvShow:any,index:number) => {

         
           return <Card  show={tvShow} handleClick={handleClick} buttonText={"Add to Wishlist"}  key={tvShow.id} />
          
          
          }
          ))}
        
           </div>
     </InfiniteScroll>
   
    ):"Loading..."}
</>
  )
}

export default Feed
