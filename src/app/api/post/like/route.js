import Post from '../../../../lib/models/post.model';
import {connect} from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const PUT = async(req) =>{
    const user = await currentUser();
        try{
            await connect();
            const data = await req.json();
            if(!user){
                return new Response('Unauthorized', {status: 401});
            }
            
            const post = await Post.findById(data.postId);
            if(post.likes.includes(user.id)){
                const updatedPost = await Post.findByIdAndUpdate(
                    data.postId,
                    {$pull: {likes: user.id}},
                    {new: true}
                );
                return new Response(JSON.stringify(updatedPost), {status: 200});
            }
            else {
                const updatedPost = await Post.findByIdAndUpdate(
                    data.postId,
                    {$addToSet: {likes: user.id}},
                    {new: true}
                );
                return new Response(JSON.stringify(updatedPost), {status: 200});
            }
        }
        catch(error){
            console.log('Error liking post:', error);
            return new Response('Error liking post', {status: 500});
     }
};