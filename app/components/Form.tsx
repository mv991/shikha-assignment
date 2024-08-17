'use client'
import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from '@/firebaseConfig';
import  { useRouter } from 'next/navigation';
const Form = () => {
    const router = useRouter()
    const loginWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(firebaseAuth,provider);
        router.push("/tvShows")
    }
  return (
    <div>
       <button type='submit' onClick={() => loginWithGoogle()}>Log in With Google</button>
    </div>
  )
}

export default Form
