'use client';
import { useMutation } from 'convex/react';
import { UploadButton, UploadFileResponse } from '@xixixao/uploadstuff/react';
import '@xixixao/uploadstuff/react/styles.css';
import { api } from '../../../convex/_generated/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { title } from 'process';

export default function CreatePage() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useMutation(api.thumbnail.createThumbnail);
  const router = useRouter();

  const [imageA, setImageA] = useState('');
  const [imageB, setImageB] = useState('');

  return (
    <div className='pt-16'>
      <h1 className='text-4xl font-semibold'>Create a Thumbnail test</h1>
      <p className='text-lg max-w-lg'>
        Create your test Thumbnail so you can get a pre-post opinion
      </p>

      <form
        className='mt-20'
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const title = formData.get('title') as string;
          console.log(title);

          const thumbnailId = await createThumbnail({
            title,
            aImage: imageA,
            bImage: imageB,
          });

          router.push(`/thumbnails/${thumbnailId}`);
        }}
      >
        <Label htmlFor='title'>Your title</Label>
        <Input
          required
          placeholder='Type a title..'
          type='text'
          id='title'
          name='title'
          className='max-w-md my-2'
        />
        <div className='grid grid-cols-2 mt-10'>
          <div>
            <h2 className='text-2xl font-bold'>Test Image A</h2>
            {imageA && (
              <Image
                alt='First image'
                width='200'
                height='200'
                src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageA}`}
              />
            )}
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={['.pdf', 'image/*']}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                setImageA((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.

                toast.error(`ERROR! ${error}`);
              }}
            />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Test Image B</h2>
            {imageB && (
              <Image
                alt='Second image'
                width='200'
                height='200'
                src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageB}`}
              />
            )}
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={['.pdf', 'image/*']}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                setImageB((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                toast.error(`ERROR! ${error}`);
              }}
            />
          </div>
        </div>

        <Button type='submit' disabled={!imageA || !imageB} className='mt-10'>
          Create Thumbnail
        </Button>
      </form>

      {/* UPLOADER */}
    </div>
  );
}
