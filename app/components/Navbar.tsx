import React from 'react'
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '@/firebaseConfig';
import  { useRouter } from 'next/navigation';
import { useAuth } from '@/AuthContext';
import Link from 'next/link';
const Navbar = () => {
 const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      router.push("/")
    } catch (err) {
      
    }
  };
  const {user,loading} = useAuth()
  return (
    <div className='w-full md:h-20 h-fit md:py-0 py-3  bg-black flex justify-between items-center  px-8 flex-wrap '>
        <div>
                <h1 className='text-white '>Hello,<br/>{user?.email?user.email:"Guest"}</h1>
                
        </div>
        {user&& 
        <div>
       <Link href={'/tvShows'}><button className='h-10 px-4 mr-2 md:mr-0 rounded-sm bg-white' >Browse TV Shows</button></Link>
       <Link href={'/wishlist'}><button className='h-10 px-4 md:mx-3 my-3 mr-2 rounded-sm bg-white' >See Whislist Items</button></Link>
        <button className='h-10 w-32 rounded-sm bg-white md:mx-0 mr-2' onClick={handleSignOut}>Sign Out</button>
     
       
        </div>
        }
    </div>
  )
}

export default Navbar
