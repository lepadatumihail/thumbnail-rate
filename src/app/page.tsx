'use client';

import { SignInButton, SignOutButton, auth, useSession } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const { isSignedIn } = useSession();
  const createThumbnail = useMutation(api.thumbnail.createThumbnail);
  const thumbnails = useQuery(api.thumbnail.getThumbnailsForUser);
  console.log(thumbnails);

  return (
    <main className=''>
      {isSignedIn && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get('title') as string;
            // createThumbnail({ title });
            e.currentTarget.reset();
          }}
        >
          <label>Title</label>
          <input name='title' />
          <button type='submit'>create</button>
        </form>
      )}
      {thumbnails?.map((thumb) => (
        <div key={thumb._id}>{thumb.title}</div>
      ))}
    </main>
  );
}
