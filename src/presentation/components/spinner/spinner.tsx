import React from 'react';
import Styles from './spinner-styles.module.scss';
import { PulseLoader } from 'react-spinners';

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> { }

const Spinner: React.FC<SpinnerProps> = (props) => {
  return (
    <PulseLoader data-testid='spinner' color={ '#BC477B' } className={ [Styles.loadingSpinner, props.className].join(' ') } />
  );
};

export default Spinner;