import Post from '../../../../../lib/models/post.model.js';
import { connect } from '../../../../../lib/mongodb/mongoose.js';

export const POST = async (req) => {
  try {
    await connect();
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error getting user posts:', error);
    return new Response('Error getting user posts', { status: 500 });
  }
};