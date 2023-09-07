import React, { useContext } from 'react';
import Styles from './input-styles.module.scss';
import Context from '@/presentation/context/form/form-context';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

const Input: React.FC<InputProps> = (props) => {
  const { errorState } = useContext(Context);
  const value = errorState;
  const error = value[`${props.name}`];
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false;
  };

  const getStatus = (): string => {
    return '🔴';
  };

  const getTitle = (): string => {
    console.log('title', error, value);
    return error;
  };

  return (
    <div className={ Styles.inputWrap }>
      <input readOnly onFocus={ enableInput } { ...props } />
      <span data-testid={ `${props.name}-status` } title={ getTitle() } className={ Styles.status }>{ getStatus() }</span>
    </div>
  );
};

export default Input;