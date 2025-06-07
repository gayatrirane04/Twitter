import User from '../models/user.model';
import {connect} from '../mongodb/mongoose';

export const createOrUpdateUser = async(
    id,
    first_name,
    last_name,
    image_url,
    email_addressses,
    username
) => {
    try{
        await connect();
        const user = await User.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                    first_name: first_name,
                    last_name: last_name,
                    avatar: image_url,
                    email: email_addressses[0].email_address,
                    username,
                },
            },
            { new: true , upsert : true}
        );
        return user;
      } catch(error){
        console.log('Error creating or updating user:',error);
      }
    };
        
    export const deleteUser = async(id) => {
        try{
            await connect();
            await User.findOneAndDelete({ clerkId : id});
        } catch (error) {
            console.log('Error deleting user:' , error);
        }    
    };