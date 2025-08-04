import User from '../../../../lib/models/user.model.js';
import { connect } from '../../../../lib/mongodb/mongoose.js';

export const POST = async (req) => {
  try {
    await connect();
    const { username } = await req.json();
    
    if (!username) {
      return new Response('Username is required', { status: 400 });
    }

    const user = await User.findOne({ username });
    
    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return new Response('Error getting user', { status: 500 });
  }
};