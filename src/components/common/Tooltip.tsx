import React from 'react';

interface Props {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = ({ text, children }) => {
  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-content">
        {text}
      </div>
    </div>
  );
};