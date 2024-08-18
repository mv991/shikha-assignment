'use client'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { db, collection, addDoc } from '../../firebaseConfig';
import {query,where,getDocs,doc} from "firebase/firestore";
import { useAuth } from '../../AuthContext';
import Card from './Card';
const Feed = () => {
const [data,setData] = useState<any>([]);
const [buttonLoading,setButtonLoading] = useState(false);
const [loading,setLoading] = useState(true)
const [wishlistItems, setWishlistItems] = useState<any>([])
const {user} = useAuth();

const pageRef = useRef(1);
const handleClick = async (data:any) => {
    if (!data) {
      return;
    }

    setButtonLoading(true);


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
      alert("Item added to Wishlist");
      setWishlistItems([...wishlistItems,data.id]);
      return true

    } catch (e) {
     
      alert('Error adding to Wishlist');
      return false
    } finally {
      setButtonLoading(false);
    }
  };
const fetchData = () => {

    pageRef.current+=1;
    axios.get(`https://api.themoviedb.org/3/discover/tv?page=${pageRef.current}`, {
        headers:{
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQwZWU0MDU5MmYzNjUzMzUwMzcxNTRiNmQxMjA4NCIsIm5iZiI6MTcyMzkwNDAwNS44ODY3NCwic3ViIjoiNjVmOWFlZDg3OThjOTQwMTg1MTY4ZjFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F-y-vdiBhfSVIDODXe1Kil4qS0cJOESZv9kIuWCuwSw`
        }
       }).then(res => setData([...data,...res.data.results]))
}
console.log(wishlistItems,"ee")
useEffect(() => {
  if(user) {

  
   axios.get(`https://api.themoviedb.org/3/discover/tv?page=${pageRef.current}`, {
    headers:{
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDQwZWU0MDU5MmYzNjUzMzUwMzcxNTRiNmQxMjA4NCIsIm5iZiI6MTcyMzkwNDAwNS44ODY3NCwic3ViIjoiNjVmOWFlZDg3OThjOTQwMTg1MTY4ZjFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F-y-vdiBhfSVIDODXe1Kil4qS0cJOESZv9kIuWCuwSw`
    }
   }).then(async(res) => {
    
    const q = query(collection(db, 'wishlist'),  where("userId", "==", user?.uid));
       
    try {
     const querySnapshot = await getDocs(q);
     const items = querySnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
     }));
       const itemIds = items.map(i => i.id)
      setWishlistItems(itemIds);
      setLoading(false)
  
      setData(res.data.results)
   
 } catch (error) {
     console.error("Error getting documents: ", error);
 }
  
  
  })


}
},[user]);

  return (
    <>
    {!loading? (
  
      <InfiniteScroll
       pageStart={pageRef.current}
       loadMore={fetchData}
       hasMore={true}
       loader={<div className="loader" key={0}>Loading ...</div>}
   >
         <div className='flex sm:gap-4 gap-6 flex-wrap sm:p-12 p-6 justify-center'>  {data.map(((tvShow:any,index:number) => {
             console.log(wishlistItems.includes(tvShow.id),"hfjrhfuhruhfu")
         
           return <Card  show={tvShow} handleClick={handleClick}  key={tvShow.id} buttonText={wishlistItems.includes(tvShow.id)?"Added in Wishlist":"Add to Wishlist"} />
          
          
          }
          ))}
        
           </div>
     </InfiniteScroll>
   
    ):"Loading..."}
</>
  )
}

export default Feed
