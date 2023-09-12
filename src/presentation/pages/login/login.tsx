import React, { useState, useEffect } from 'react';
import Styles from './login-styles.module.scss';
import { Footer, Input, FormStatus, LoginHeader } from '../../components';
import Context from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/usecases';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
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



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      });
      localStorage.setItem('accessToken', account.accesstoken);
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }

  };
  return <div className={ Styles.login }>
    <LoginHeader />

    <Context.Provider value={ { state, setState } }>
      <form data-testid='form' className={ Styles.form } onSubmit={ handleSubmit }>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder='Digite seu email' />
        <Input type="password" name="password" placeholder='Digite sua senha' />

        <button data-testid='submit' disabled={ !!state.emailError || !!state.passwordError } className={ Styles.submitButton } type="submit">Entrar</button>
        <span className={ Styles.createAccountLink }>Criar conta</span>
        <FormStatus />
      </form>


    </Context.Provider>
    <Footer />
  </div>;
};

export default Login;