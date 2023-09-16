import Link from 'next/link';
import { useState } from 'react';
import { GoThreeBars } from 'react-icons/go';
import '../pages/calendar'


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // Set as always logged in for development

  const handleClick = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div id="navbar">
      <header className="flex flex-col justify-center bg-[#] z-[99999999] min-h-[7vh] py-2 lg:py-4">
        <div className="container px-4 mx-auto lg:flex lg:items-center m-30 mt-12">
          <div className="flex justify-between items-center">
            <Link legacyBehavior href="/">
              <a>
                <h2 className="text-4xl text-[#484141] font-title ml-16 font-extrabold text-shadow-5xl">
                  Keynote
                </h2>
              </a>
            </Link>

            <button
              className="border border-solid border-gray-200 px-3 py-1 rounded text-gray-200 opacity-50 hover:opacity-75 lg:hidden cursor-pointer"
              aria-label="Menu"
              data-test-id="navbar-menu"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            >
              <GoThreeBars />
            </button>
          </div>

          <div
            className={`${
              showDropdown ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row lg:ml-auto mt-3 lg:mt-0`}
            data-test-id="navbar"
          >
            {loggedIn === true ? (
              <div className='mx-24  '>
                <Link className="ml-8  hover:bg-red-100 hover:text-[#7C2D12] text-center  mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors" href="/calendar"> 
                 Calendar</Link>
                 <Link className="ml-12 hover:bg-red-100 hover:text-[#7C2D12] text-center  mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"  href="/docs "> 
                 Docs</Link>
                <Link
                  href="/"
                  className="text-[#484141] hover:bg-red-100 hover:text-[#7C2D12] text-center border border-solid border-orange-800 mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                  data-test-id={`navbar-logout`}
                  onClick={() => handleClick()}>
                  
                    Log out
                  
                </Link>
              </div>
            ) : (
              <div>
                

                <Link  legacyBehavior href="/login">
                  <a
                    className="text-[#484141] hover:bg-red-200 hover:text-[#7C2D12] text-center border border-solid border-orange-800 mt-1 mr-16 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                    data-test-id={`navbar-login`}
                    onClick={(e) => handleClick()}
                  >
                    Log in
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
