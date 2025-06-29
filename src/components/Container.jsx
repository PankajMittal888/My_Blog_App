
import React from 'react'

function Container({ children }) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {children}
    </div>
  );
}
export default Container