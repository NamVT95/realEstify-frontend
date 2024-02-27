import React from 'react'
import Background from "@/assets/hero.jpg"
export default function AuthenticationLayout({
    children
    }: {
    children: React.ReactNode
}) {
  return (
    <div className='w-screen h-screen flex'>
        <div className='flex-1'>
            <img src={Background} alt='auth-background' className='w-full h-full object-cover' />
        </div>
        <div className='flex-1'>
            {children}
        </div>
    </div>
  )
}
