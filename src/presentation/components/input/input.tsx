import React, { useContext } from 'react';
import Styles from './input-styles.module.scss';
import Context from '@/presentation/context/form/form-context';
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

const Input: React.FC<InputProps> = (props) => {
  const { state, setState } = useContext(Context);
  const value = state;
  const error = value[`${props.name}Error`];
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

  const handleChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div className={ Styles.inputWrap }>
      <input data-testid={ props.name } readOnly onFocus={ enableInput } { ...props } onChange={ handleChange } />
      <span data-testid={ `${props.name}-status` } title={ getTitle() } className={ Styles.status }>{ getStatus() }</span>
    </div>
  );
};

export default Input;