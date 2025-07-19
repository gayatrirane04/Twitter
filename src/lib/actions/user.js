import User from '../models/user.model';
import {connect} from '../mongodb/mongoose';


export const createOrUpdateUser = async(
    id,
    first_name,
    last_name, 
    image_url,
    email_addresses,
    username
) => {
    try{
        await connect();
        const safeUsername =
  username ||
  (first_name && first_name.toLowerCase().replace(/\\s+/g, '')) ||
  (email_addresses && email_addresses[0]?.email_address?.split('@')[0]) ||
  'user' + Date.now();
        console.log('username:', username, 'first_name:', first_name, 'email_addresses:', email_addresses, 'safeUsername:', safeUsername);
        const user = await User.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                    firstName: first_name,
                    lastName: last_name,
                    avatar: image_url,
                    email: email_addresses[0]?.email_address,
                    username: safeUsername,
                },
            },
            { new: true , upsert : true}
        ); 
        console.log('User inserted/updated:', user);
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