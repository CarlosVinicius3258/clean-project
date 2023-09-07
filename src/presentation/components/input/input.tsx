import React, { memo } from 'react';
import Styles from './input-styles.module.scss';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

const Input: React.FC<InputProps> = (props) => {

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  return (
    <div className={ Styles.inputWrap }>
      <input readOnly onFocus={ enableInput } { ...props } />
      <span className={ Styles.status }>🔴</span>
    </div>
  );
};

export default Input;