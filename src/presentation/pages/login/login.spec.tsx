import React from 'react';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';


class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string | null;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={ validationStub } authentication={authenticationSpy} />);
  return {
    sut,
    authenticationSpy
  };
};


describe('Login Component', () => {
  afterEach(cleanup);

  test('Should not render spinner and error message on start', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });
  test('Should start with initial state', () => {
    const errorMessage = faker.word.sample();
    const { sut } = makeSut({ validationError: errorMessage });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(errorMessage);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });


  test('Should show email error if Validation fails', () => {
    const errorMessage = faker.word.sample();

    const { sut } = makeSut({ validationError: errorMessage });
    const emailInput = sut.getByTestId('email');
    const fakeremail = faker.internet.email();

    fireEvent.input(emailInput, { target: { value: fakeremail } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if Validation fails', () => {
    const errorMessage = faker.word.sample();
    const { sut } = makeSut({ validationError: errorMessage });
    const passwordInput = sut.getByTestId('password');
    const fakerpassword = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: fakerpassword } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');
    const fakeremail = faker.internet.email();

    fireEvent.input(emailInput, { target: { value: fakeremail } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const fakerpassword = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: fakerpassword } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    const passwordInput = sut.getByTestId('password');
    const fakerpassword = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: fakerpassword } });

    const emailInput = sut.getByTestId('email');
    const fakeremail = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: fakeremail } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test('Should show Spinner on submit', () => {
    const { sut } = makeSut();

    const passwordInput = sut.getByTestId('password');
    const fakerpassword = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: fakerpassword } });

    const emailInput = sut.getByTestId('email');
    const fakeremail = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: fakeremail } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();

    const passwordInput = sut.getByTestId('password');
    const fakerpassword = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: fakerpassword } });

    const emailInput = sut.getByTestId('email');
    const fakeremail = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: fakeremail } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({
      email: fakeremail,
      password: fakerpassword,
    });
  });

});