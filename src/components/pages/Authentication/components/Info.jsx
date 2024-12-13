import { Link } from "react-router-dom"
import React from "react"

export default function Info(){
  return (
    <div className="text-center">
      <Link to={'/'}>
        <img src={`${process.env.PUBLIC_URL}/icons/favicon.svg`} alt="jumia logo" className="h-16 mx-auto"/>
      </Link>
      <h2 className="text-[20px] font-semibold">Welcome to Jumia Clone</h2>
      <p className="text-gray-500">Enter your email to log in </p>
      <p className="text-red-500">NOTE: This is not the real jumia site it's a clone project!</p>
    </div>
  )
}
