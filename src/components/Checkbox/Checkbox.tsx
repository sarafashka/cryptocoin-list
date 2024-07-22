import React from 'react';
import styles from './Checkbox.module.scss';

const { checkbox, checkbox__mark } = styles;

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className={checkbox}>
      <input
        checked={checked}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={checkbox__mark}></div>
    </label>
  );
};

export default Checkbox;
