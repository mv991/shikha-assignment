'use client'
import Image from "next/image";
import Feed from "./components/Feed";
import Form from "./components/Form";
import { useAuth } from '../AuthContext';
export default function Home() {
  
const {user} = useAuth();
console.log("user",user)
  return (
    <main className=''>
      <Form/>
     
    </main>
  );
}
