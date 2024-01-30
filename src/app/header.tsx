'use client';

import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='border-b'>
      <div className='h-16 container flex flex-row items-center justify-between'>
        <p>Tester</p>
        <div>
          <SignedIn>
            <Link href={'/create'}>Create Test </Link>
          </SignedIn>
          <SignedOut>
            <Link href={'/about'}>Pricing</Link>
          </SignedOut>
        </div>
        <div className='flex gap-4 items-center'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
