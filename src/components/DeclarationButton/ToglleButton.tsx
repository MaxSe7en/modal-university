import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const ActiveButton = dynamic(() => import('./ActiveButton'));
const InactiveButton = dynamic(() => import('./InactiveButton'));

const ToggleButton = () => {
  const [declareState, setDeclareState] = useState(false);

  return (
    <div>
      {declareState ? (
        <ActiveButton onClick={() => setDeclareState(!declareState)} />
      ) : (
        <InactiveButton onClick={() => setDeclareState(!declareState)} />
      )}
    </div>
  );
};

export default ToggleButton;
