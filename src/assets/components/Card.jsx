import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { motion } from "framer-motion";

const Card = ({ note, deleteNote, handleEdit, appRef }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      handleEdit(note);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={appRef}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-gray-800 text-white m-4 shadow-md rounded-[16px] p-4 w-64 h-72 overflow-hidden"
    >
      <div onClick={handleClick} className="mb-4 cursor-pointer">
        <p className="text-lg font-semibold">{note.title}</p>
      </div>
      <div onClick={handleClick} className="h-40 cursor-pointer mb-4 overflow-hidden relative">
        <p className="text-gray-400 line-clamp-6 overflow-hidden text-ellipsis h-full">
          {note.description}
        </p>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 to-transparent h-6 pointer-events-none"></div>
      </div>
      <div className="flex items-center justify-between text-gray-400">
        <span className="text-sm">{note.date}</span>
        <span
          className="cursor-pointer text-gray-500 hover:text-red-500"
          style={{ fontSize: '1.5rem' }}
          onClick={() => deleteNote(note.id)}
        >
          <MdDeleteOutline />
        </span>
      </div>
    </motion.div>
  );
};

export default Card;
