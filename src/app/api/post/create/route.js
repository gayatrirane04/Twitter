import Post from '../../../../lib/models/post.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export const POST = async (req) => {
  const user = await currentUser();
  
  // Production: Require authenticated user
  if (!user) {
    return new Response('Un  authorized', { status: 401 });
  }
  
  try {
    await connect();
    const data = await req.json();
    
    // Production: Validate required fields
    if (!data.text || !data.name || !data.username) {
      return new Response('Missing required fields', { status: 400 });
    }

    const newPost = await Post.create({
      user: user.id,
      name: data.name,
      username: data.username,
      text: data.text,
      profileImg: data.profileImg,
      image: data.image,
    });
    
    return new Response(JSON.stringify(newPost), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response('Error creating post', { status: 500 });
  }
};