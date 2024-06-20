// Header.js
import React from "react";

function Header({ toggleModal }) { 

  return (
    <header className="w-full p-4 bg-zinc-800 text-white flex flex-wrap items-center justify-between shadow-lg">
      <div className="text-2xl font-light font-roboto mb-2 sm:mb-0">
        QuickDocs
      </div>
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 py-2 px-4 rounded bg-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 sm:flex-none"
        />
        <button
          className="bg-zinc-600 hover:bg-zinc-900 text-white font-semibold py-2 px-4 rounded"
          onClick={toggleModal} 
        >
          Add Note
        </button>
      </div>
    </header>
  );
}

export default Header;