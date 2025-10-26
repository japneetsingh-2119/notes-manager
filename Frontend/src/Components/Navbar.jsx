import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [active, setActive] = useState('')

  return (
    <>
      <div className="bg-gray-900 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
        <div className="text-xl font-semibold mb-2 sm:mb-0">
          Notes Manager
        </div>
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link
            onClick={() => setActive('home')}
            to="/"
            className={`relative pb-1 transition duration-200 hover:text-neutral-300 ${
              active === 'home' ? 'text-neutral-300' : ''
            }`}
          >
            Home
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-neutral-300 transition-all duration-300 ${
                active === 'home' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            ></span>
          </Link>
          <Link
            onClick={() => setActive('login')}
            to="/login-page"
            className={`relative pb-1 transition duration-200 hover:text-neutral-300 ${
              active === 'login' ? 'text-neutral-300' : ''
            }`}
          >
            Login
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-neutral-300 transition-all duration-300 ${
                active === 'login' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            ></span>
          </Link>
          <Link
            onClick={() => setActive('register')}
            to="/register"
            className={`relative pb-1 transition duration-200 hover:text-neutral-300 ${
              active === 'register' ? 'text-neutral-300' : ''
            }`}
          >
            Register
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-neutral-300 transition-all duration-300 ${
                active === 'register' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            ></span>
          </Link>
          <Link
            onClick={() => setActive('dashboard')}
            to="/dashboard"
            className={`relative pb-1 transition duration-200 hover:text-neutral-300 ${
              active === 'dashboard' ? 'text-neutral-300' : ''
            }`}
          >
            Dashboard
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full bg-neutral-300 transition-all duration-300 ${
                active === 'dashboard' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            ></span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar