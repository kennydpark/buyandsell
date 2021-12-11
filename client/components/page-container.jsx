import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div>
      <div className="page-container">
        {children}
      </div>
    </div>
  );
}
