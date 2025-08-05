import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';
import Post from '@/components/Post';
import Comment from '@/components/Comment';

async function getPost(id) {
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/post/all`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  const posts = await res.json();
  return posts.find(post => post._id === id);
}

export default async function Postpage({ params }) {
  const post = await getPost(params.id);
  
  if (!post) {
    return (
      <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
        <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
          <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
            <HiArrowLeft className='h-5 w-5'/>
          </Link>
          <h2 className='sm:text-lg'>Back</h2>
        </div>
        <div className='p-4 text-center'>Post not found</div>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5'/>
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      
      <Post post={post} />
      
      {post.comments && post.comments.length > 0 && (
        <div>
          {post.comments.map((comment, index) => (
            <Comment key={index} comment={comment} id={post._id} />
          ))}
        </div>
      )}
    </div>
  );
}

