import React from "react";

const NavBar = () => {
  return (
    <div
      className="
navbar fixed top-0 left-0 z-50 w-full

bg-gradient-to-r from-red-500 via-blue-700 to-red-400
bg-[length:200%_200%]
animate-gradient

backdrop-blur-md bg-opacity-90
text-neutral-content

shadow-lg
transition-all duration-500
hover:shadow-[0_0_25px_rgba(255,165,0,0.6)]
"
    >
      {/* Left */}
      <div className="flex-1 ml-8">
        <a className="btn btn-ghost text-xl font-bold tracking-wide text-white hover:text-orange-300 transition">
          devTinder {"</>"}
        </a>
      </div>

      {/* Right */}
      <div className="flex gap-2 mr-6">

        <div className="dropdown dropdown-end">

          {/* Avatar */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-110 transition"
          >
            <div className="w-10 rounded-full ring ring-orange-400 ring-offset-base-100 ring-offset-2">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          {/* Dropdown */}
          <ul
            tabIndex={0}
            className="
menu menu-sm dropdown-content
bg-black/70 backdrop-blur-md
text-white
rounded-xl z-50 mt-3 w-52 p-2 shadow-xl
border border-white/20
"
          >
            <li>
              <a className="justify-between hover:bg-orange-500/30">
                Profile
                <span className="badge badge-warning">New</span>
              </a>
            </li>

            <li>
              <a className="hover:bg-orange-500/30">Settings</a>
            </li>

            <li>
              <a className="hover:bg-red-500/30">Logout</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
