import React from "react";

function Tooltip({ children, content, position = "top" }) {
  const getPositionClasses = (position) => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  return (
    <div className="relative group">
      {children}
      <div className={`absolute ${getPositionClasses(position)} px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10`}>
        {content}
      </div>
    </div>
  );
}

export default Tooltip; 