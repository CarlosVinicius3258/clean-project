import React from 'react';
import Styles from './form-status-styles.module.scss';
import { Spinner } from '../../components';
interface FormStatusProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> { }

const FormStatus: React.FC<FormStatusProps> = (props) => {
  return (
    <div className={ Styles.errorWrap }>
      <Spinner className={ Styles.spinner } />
      <span className={ Styles.error }>
        Erro
      </span>
    </div>
  );
};

export default FormStatus;