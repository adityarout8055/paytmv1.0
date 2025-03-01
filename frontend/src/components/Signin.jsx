import { useState } from 'react'
import Button from './Button'
import Heading from './Heading'
import Textinput from './Textinput'
import Subheading from './Subheading'


export default function Signin(){
    return(
        <div className="flex items-center justify-center min-h-screen bg-slate-300">
        <div className="flex flex-col p-3 w-auto border border-gray-300 rounded-lg md:w-xs items-center justify-center bg-white">
        <Heading>Sign in</Heading>
        <Subheading>Sign in to your account</Subheading>
        <Textinput label={"enter email"} placeholder="email@example.com" />
        <Textinput label={"enter password"}  placeholder="Password" />
        <Button onClick={() => alert('clicked')}>Sign in</Button>
        </div>
        </div>
    )
}