import React from 'react';

function Button({ ref, className, title, type, onClick }) {
  return (
    <button ref={ref} type={type} className={`${className}`} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
