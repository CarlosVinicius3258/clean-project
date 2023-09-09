import React, { useState, useEffect } from 'react';
import Styles from './login-styles.module.scss';
import { Footer, Input, FormStatus, LoginHeader } from '../../components';
import Context from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

type LoginProps = {
  validation: Validation;
};

const Login: React.FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: '',


  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),

    });
    validation.validate('email', state.email);
  }, [state.email, state.password]);


  return <div className={ Styles.login }>
    <LoginHeader />

    <Context.Provider value={ { state, setState } }>
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