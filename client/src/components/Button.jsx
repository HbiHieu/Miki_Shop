import React from 'react';

function Button({ ref, className, title, type, onClick }) {
  return (
    <div>
      <button ref={ref} type={type} className={className} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default Button;
