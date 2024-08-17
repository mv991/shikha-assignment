'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs ,doc,deleteDoc} from 'firebase/firestore';
import { useAuth } from '@/AuthContext';
import Card from '../components/Card';

const page = () => {
    const {user} = useAuth();
    const [wishlistData,setWishlistData] = useState<any>([])

     async function deleteItemById(show:any) {
        try {
            const q = query(collection(db, 'wishlist'), where('id', '==', show.id));
            const querySnapshot = await getDocs(q);
            const docRef = doc(db, 'wishlist', querySnapshot.docs[0].id); // Use Firestore-generated document ID for deletion
            await deleteDoc(docRef);
          console.log(`Document with ID ${show.id} deleted successfully`);
          setWishlistData((prev:any) => {
            prev.filter((p:any) => p.id !== show.id)
          })
        } catch (error) {
          console.error('Error deleting document: ', error);
        }
      }
    useEffect(() => {
        async function fetchItemsByUserId(userId:string) {
            const itemsCollection = collection(db, 'wishlist'); // Replace 'items' with your collection name
            const q = query(itemsCollection, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot,"hfrugurg")
            const items: any[] = [];
            querySnapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() });
            });
            const reducedItems:any =   items.map((item,index) => item.data);
            setWishlistData(reducedItems)
          }
         if(user!==null && user.uid) {
        
             fetchItemsByUserId(user.uid);
         
         }
    },[user])
   console.log(wishlistData)
  return (
    <div className='w-screen h-screen overflow-x-hidden justify-center p-12 flex flex-wrap'>
        {wishlistData?.map((wishItem:any,index:number) => <Card  show={wishItem} handleClick={deleteItemById} key={index} buttonText={"Remove from Whishlist"}/>)}
    </div>
  )
}

export default page
