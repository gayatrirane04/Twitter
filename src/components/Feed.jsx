'use client';

import React, { useEffect, useState } from 'react'
import Post from './Post'

export default function Feed(){
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await fetch('/api/post/all', {
          method: 'POST',
          cache: 'no-store'
        });
        
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        
        const posts = await result.json();
        console.log('Fetched posts:', posts);
        setData(posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className='p-4 text-center'>Loading posts...</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

