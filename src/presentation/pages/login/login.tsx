import React, { useState } from 'react';
import Styles from './login-styles.module.scss';
import { Footer, Input, FormStatus, LoginHeader } from '../../components';
import Context from '@/presentation/context/form/form-context';


const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',

  });
  const [errorState] = useState({

    email: '*Campo Obrigatório',
    password: '*Campo Obrigatório',
  });

  return <div className={ Styles.login }>
    <LoginHeader />

    <Context.Provider value={ { state, errorState } }>
      <form className={ Styles.form }>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder='Digite seu email' />
        <Input type="password" name="password" placeholder='Digite sua senha' />

        <button data-testid='submit' disabled className={ Styles.submitButton } type="submit">Entrar</button>
        <span className={ Styles.createAccountLink }>Criar conta</span>
        <FormStatus />
      </form>


    </Context.Provider>
    <Footer />
  </div>;
};

export default Login;