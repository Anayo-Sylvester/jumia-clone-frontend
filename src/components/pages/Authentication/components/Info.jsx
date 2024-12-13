import { Link } from "react-router-dom"; 
import React from "react"; 

// Info Component
export default function Info() {
  return (
    <div className="text-center">
      {/* Navigating to the homepage using Link */}
      <Link to={'/'}>
        <img src={`${process.env.PUBLIC_URL}/icons/favicon.svg`} alt="jumia logo" className="h-16 mx-auto" />
      </Link>

      {/* Welcome message */}
      <h2 className="text-[20px] font-semibold">Welcome to Jumia Clone</h2>

      {/* Instructional text for logging in */}
      <p className="text-gray-500">Sign in to continue shopping and explore great deals</p>

      {/* Note indicating this is a clone project */}
      <p className="text-red-500">NOTE: This is not the real Jumia site, it's a clone project!</p>
    </div>
  );
}
