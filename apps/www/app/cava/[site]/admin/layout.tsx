/* eslint-disable tailwindcss/classnames-order */
import React, { Suspense } from 'react'

import { MainNav } from './components/main-nav';
import { LoginButton } from '@/components/login';
import { getUserSession } from '@/lib/user';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getUserSession()

  if (!session){
  return (
    <div className="grid h-screen place-items-center">


      <div className="place-items-center">
     
        <div className="rounded-full bg-[#2D32A9] from-green-400 to-blue-500 p-2 px-10 text-white hover:from-pink-500 hover:to-yellow-500">
       
          <LoginButton /> 
        </div></div></div>

  )}

  return (
    <>
      <div className="container">
        <MainNav />
      </div>
      {children}</>



  )
}
