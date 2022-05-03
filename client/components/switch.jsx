import React, { useState } from 'react';

const Switch = props => {
  const [checked, setChecked] = useState(() => {
    if (props.theme === 'dark') {
      return true;
    } else {
      return false;
    }
  });

  const handleClick = () => {
    if (checked) {
      setChecked(false);
    } else if (!checked) {
      setChecked(true);
    }
  };

  return (
    <label className="switch" >
      <input type="checkbox" checked={checked} onClick={handleClick} readOnly/>
      <span onClick={props.handleTheme} className="slider" />
    </label>
  );
};

export default Switch;
