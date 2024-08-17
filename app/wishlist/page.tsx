'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs ,doc,deleteDoc} from 'firebase/firestore';
import { useAuth } from '@/AuthContext';
import Card from '../components/Card';

const WishListPage = () => {
    const {user} = useAuth();
    const [wishlistData,setWishlistData] = useState<any>([]);
    const [loading,setLoading] = useState(true);

     async function deleteItemById(show:any) {
        try {
       
            const q = query(collection(db, 'wishlist'), where('id', '==', show.id));
            const querySnapshot = await getDocs(q);
            const docRef = doc(db, 'wishlist', querySnapshot.docs[0].id); // Use Firestore-generated document ID for deletion
            await deleteDoc(docRef);
          console.log(`Document with ID ${show.id} deleted successfully`);
       
           const newWishListData =  wishlistData.filter((p:any) => p.id !== show.id);
           setWishlistData(newWishListData)
         
          alert("Item Removed from Wishlist")
        } catch (error) {
          console.error('Error deleting document: ', error);
        }finally {
            setLoading(false);
        }
      }
    useEffect(() => {
        async function fetchItemsByUserId(userId:string) {
            setLoading(true)
            const itemsCollection = collection(db, 'wishlist'); // Replace 'items' with your collection name
            const q = query(itemsCollection, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            const items: any[] = [];
            querySnapshot.forEach((doc) => {
              items.push({ id: doc.id, ...doc.data() });
            });
            const reducedItems:any =   items.map((item,index) => item.data);
            setLoading(false)
            setWishlistData(reducedItems)
          }
         if(user!==null && user.uid) {
        
             fetchItemsByUserId(user.uid);
         
         }
    },[user])

  return (
    <div className='w-screen h-screen overflow-x-hidden justify-center p-12 flex flex-wrap gap-6'>
        {wishlistData?.map((wishItem:any,index:number) => <Card  show={wishItem} handleClick={deleteItemById} key={index} buttonText={"Remove from Whishlist"}/>)}
        { wishlistData.length===0 && !loading && <h1>You have no Shows in your Wishlist</h1>}
    </div>
  )
}

export default WishListPage
