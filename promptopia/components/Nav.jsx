"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {

  const isUserLoggedIn = true;
  const [providers, setproviders ] = useState(null);
  const [toogleDropdown, settoogleDropdown] = useState(true)

  useEffect(()=>{
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setProviders();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
        {/*Desktop navigation*/}
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href={"/create-prompt"} className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ): (
          <div>
            {providers && Object.values(providers).map((provider)=>{
              return <button
                type='button'
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className='black_btn'
              >
                Sign in
              </button>
            })}
          </div>
        )}
        {/*Mobile navigation*/}
        <div className='sm:hidden flex relative'>
            {isUserLoggedIn ? (
              <div className='flex'>
                <Image
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  onClick={() => settoogleDropdown((prev) => !prev)}
                />

            {toogleDropdown && (
              <div>
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => settoogleDropdown(false)}>
                    My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className='dropdown_link'
                  onClick={() => settoogleDropdown(false)}>
                    Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    settoogleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign out
                </button>
              </div>
            )}
              </div>
            ):(
              <div>
                {providers && Object.values(providers).map((provider)=>{
                  return <button
                    type='button'
                    key={provider.name}
                    onClick={()=> signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                })}
              </div>
            )}
        </div>
      </Link>
    </nav>
  )
}

export default Nav
