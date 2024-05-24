import React from "react";

function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <div>
      <label></label>
      <input
        type="checkbox"
        name="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </div>
  );
}

export default Checkbox;
