import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export default async function Postpage({ params }) {
    return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen' >
    <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
      <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2' >
        <HiArrowLeft className='h-5 w-5'/>
      </Link>
      <h2 className='sm:text-lg'>Back</h2>
    </div>
      hellooo guys
    </div>
  )
}


