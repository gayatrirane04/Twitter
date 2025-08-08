'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function FollowButton({user: userFromProfilePage}) {
    const router = useRouter();
    const {user} = useUser();

    const handleFollowClick =async () => {
        try{
          const res = await fetch(`/api/user/follow`, {
             method:'POST',
             body : JSON.stringify({
                userId: userFromProfilePage._id,
                user: user.publicMetadata.userMongoId
             }),
          });

          if(res.status === 200){
            router.refresh();
          }
        }catch(error){
            console.error("failed to follow user",error);
        }
    };
     return (
    <button  onClick={handleFollowClick}
      className='bg-blue-500 text-white px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
      disabled={
        !user || user.publicMetadata.userMongoId === userFromProfilePage._id
      } >
            {user &&
      userFromProfilePage.followers.includes(user.publicMetadata.userMongoId)
        ? 'Unfollow'
        : 'Follow'}
    </button>
     );
}

