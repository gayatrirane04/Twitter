import { currentUser } from "@clerk/nextjs/dist/types/server";
import { connect } from '../../../../lib/mongodb/mongoose.js';
import User from '../../../../lib/models/user.model.js';

export const POST = async (req) => {
  try{
     await connect();
     const user = await currentUser();
     const data = await req.json();

     const userProfileId = data.userProfileId; // profile i m following
     const userFollowId = data.userFollowId;  // me the follower 

     if(!user || user.publicMetadata.userMongoId !== userFollowId){  // security check (match id card with ur face)
       return new Response('Unauthorized', { status: 401 });
     }

     const userfollowfromdb = await User.findById(userFollowId); // full follwers object body 
        if(!userfollowfromdb){
        return new Response('User not found', { status: 404 });
        }

        const userProfileFromDb = await User.findById(userProfileId); // the profile beign followed or viewed 
        if(!userProfileFromDb){
        return new Response('User profile not found', { status: 404 });
        } 

        if(userProfileFromDb._id.toString() ===  userfollowfromdb._id.toString()){
            return new Response('Cannot follow yourself', { status: 400 });
        }  
        
        const isFollowing = userfollowfromdb.following.find(
            (item) => item.toString() === userProfileFromDb._id.toString()
        );  // means check my following array if profile is aleardy present or not
        
            if(isFollowing){
            await Promise.all([
                 User.findByIdAndUpdate(userProfileId, {
                $pull: { followers: userFollowId },
                 }),
                 User.findByIdAndUpdate(userFollowId, {
                $pull: { followers: userProfileId  },
                 })
            ]);
            return new Response('Unfollowed', { status: 200 });
             }
            else{
             await Promise.all([
                 User.findByIdAndUpdate(userProfileId, {
                $addToSet: { following: userFollowId },
                 }),
                 User.findByIdAndUpdate(userFollowId, {
                $addToSet: { following: userProfileId  },
                 })
            ]);
            return new Response('Followed', { status: 200 });
            }
    }
    catch(error){
    console.error('Error following user:', error);
    return new Response('Error following user', { status: 500 });   
  }    

};