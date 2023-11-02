import React, { useRef, useEffect } from "react";

const ContextMenu = ({ options, coordinates, contextMenu, setContextMenu }) => {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "context-opener") {
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (e, callBack) => {
    e.stopPropagation();
    setContextMenu(false);
    callBack();
  };

  return (
    <div
      className='bg-dropdown-background fixed py-3 px-2 z-[100] shadow-xl rounded-sm'
      ref={contextMenuRef}
      style={{
        top: coordinates.y,
        left: coordinates.x,
      }}>
      <ul>
        {options.map(({ name, callBack }) => (
          <li
            key={name}
            onClick={(e) => handleClick(e, callBack)}
            className='rounded-md px-6 py-3 cursor-pointer hover:bg-background-default-hover'>
            <span className='text-white font-semibold'>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
