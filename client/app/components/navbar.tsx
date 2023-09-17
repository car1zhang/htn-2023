import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // Set as always logged in for development

  const handleClick = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div id="navbar">
      <header className="flex flex-col justify-center bg-[#] z-[99999999] min-h-[7vh] py-2 lg:py-4">
        <div className="container px-72 mx-auto lg:flex lg:items-center mt-12">
          <div className="flex justify-between items-center">
            <Link legacyBehavior href="/">
              <a>
                <h2 className="text-5xl text-black font-title font-bold text-shadow-5xl">
                  Keynotes
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
              <FaBars />
            </button>
          </div>

          <div
            className={`${
              showDropdown ? 'flex' : 'hidden'
            } lg:flex flex-col lg:flex-row lg:ml-auto mt-3 lg:mt-0`}
            data-test-id="navbar"
          >
            {loggedIn === true ? (
              <div>
                <Link className="ml-8 text-black text-center  mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 lg:mx-4 rounded duration-300 transition-colors hover:border-[#7C2D12] bg-transparent hover:bg-red-400/50 hover:text-[#7C2D12]" href="/calendar"> 
                 Calendar</Link>
                 <Link className="ml-12 text-black text-center  mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 lg:mx-4 rounded duration-300 transition-colors hover:border-[#7C2D12] bg-transparent hover:bg-red-400/50 hover:text-[#7C2D12]"  href="/docs "> 
                 Docs</Link>
                 <Link
                  href="/"
                  className="text-black hover:border-[#7C2D12] hover:text-[#7C2D12]  text-center border border-solid border-black bg-red-200 mt-1 lg:mt-0 lg:ml-4 mr-48 ml-48 p-2 lg:px-4 lg:mx-4 rounded duration-300 shadow-md "
                  data-test-id={`navbar-logout`}
                  onClick={() => handleClick()}
                >
                  Log out
                </Link>

              </div>
            ) : (
              <div>
                

                <Link legacyBehavior href="/">
                  <a
                    className="text-black hover:bg-red-200 hover:text-[#7C2D12] text-center border border-solid border-orange-800 mt-1 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors shadow-md"
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
