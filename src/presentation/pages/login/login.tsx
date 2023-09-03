import React from 'react';
import Styles from './login-styles.module.scss';
import { Footer, Input, FormStatus, LoginHeader } from '../../components';


const Login: React.FC = () => {
  return <div className={ Styles.login }>
    <LoginHeader />
    <form className={ Styles.form }>
      <h2>Login</h2>
      <Input type="email" name="email" placeholder='Digite seu email' />
      <Input type="password" name="password" placeholder='Digite sua senha' />

      <button className={ Styles.submitButton } type="submit">Entrar</button>
      <span className={ Styles.createAccountLink }>Criar conta</span>
      <FormStatus />
    </form>
    <Footer />
  </div>;
};

export default Login;