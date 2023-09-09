import React, { useContext } from 'react';
import Styles from './form-status-styles.module.scss';
import { Spinner } from '../../components';
import Context from '@/presentation/context/form/form-context';
interface FormStatusProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> { }

const FormStatus: React.FC<FormStatusProps> = (props) => {

  const { state } = useContext(Context);
  const { isLoading, mainError } = state;

  return (
    <div data-testid='error-wrap' className={ Styles.errorWrap }>
      { isLoading && <Spinner className={ Styles.spinner } /> }
      {
        mainError && <span className={ Styles.error }>{ mainError }</span>
      }
    </div>
  );
};

export default FormStatus;