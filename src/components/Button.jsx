import React from 'react';

const Button3D = ({ label = 'GO', onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        px-8 py-4
        font-bold text-white
        bg-gradient-to-br from-cyan-500 to-blue-600
        rounded-lg
        shadow-lg
        hover:shadow-xl
        active:shadow-md
        transform
        transition-all duration-150 ease-in-out
        focus:outline-none
        focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50
        overflow-hidden // Ensures pseudo-elements for depth don't spill out

        // Base 3D effect - a slightly darker bottom edge
        before:content-['']
        before:absolute
        before:bottom-0
        before:left-0
        before:w-full
        before:h-[6px] // Height of the "bottom edge"
        before:bg-blue-700 // Darker shade of the main bg
        before:rounded-b-lg
        before:transition-all before:duration-150 before:ease-in-out

        // Hover effect: lift the button slightly and make bottom edge more prominent
        hover:translate-y-[-2px]
        hover:before:h-[8px]
        hover:before:bottom-[-2px] // Adjust to keep it flush

        // Active (pressed) effect: push the button down, reduce bottom edge
        active:translate-y-[2px]
        active:before:h-[2px]
        active:before:bottom-0
        ${className}
      `}>
      {/* Top surface of the button */}
      <span className='relative z-10 block px-1 py-0.5 '>{label}</span>
    </button>
  );
};

export default Button3D;
