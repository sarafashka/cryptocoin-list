import React from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './Checkbox.type';

const { checkbox, checkbox__mark } = styles;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, id }) => {
  return (
    <label className={checkbox} data-testid={id}>
      <input
        checked={checked}
        type="checkbox"
        role="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={checkbox__mark}></div>
    </label>
  );
};

export default Checkbox;
