import React, { useContext } from 'react';
import Styles from './form-status-styles.module.scss';
import { Spinner } from '../../components';
import Context from '@/presentation/context/form/form-context';
interface FormStatusProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> { }

const FormStatus: React.FC<FormStatusProps> = (props) => {
  const { isLoading, errorMessage } = useContext(Context);
  return (
    <div data-testid='error-wrap' className={ Styles.errorWrap }>
      { isLoading && <Spinner className={ Styles.spinner } /> }
      {
        errorMessage && <span className={ Styles.error }>{ errorMessage }</span>
      }
    </div>
  );
};

export default FormStatus;