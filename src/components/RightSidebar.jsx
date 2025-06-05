'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import News from './News';

export default function RightSidebar() {
    const[input,setInput] = useState('');
    const router = useRouter();

    const handleSubmit=(e) => {
      e.prventDefault();
      if(!input.trim()) return;
      router.push(`/search/${input}`);
      setTimeout(() => {
        router.refresh();  
      },100);
  };  
  return (
     <>
       <div width={70} className='rounded-xl' >
         <form onSubmit={handleSubmit}>
           <input type="text"
            placeholder='Search'
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            className='bg-gray-100 border border-gray-200 rounded-3xl text-gray-900 text-sm w-full px-4 py-2'
           />
         </form>
       </div>
        <News/>
     </>
  )
}
