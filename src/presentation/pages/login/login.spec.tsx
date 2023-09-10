import React from 'react';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import Login from './login';




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
  const sut = render(<Login validation={ validationStub } authentication={ authenticationSpy } />);
  return {
    sut,
    authenticationSpy
  };
};

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
  fireEvent.click(submitButton);
};

const populateEmailField = (sut: RenderResult, email = faker.internet.email()) => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};
const populatePasswordField = (sut: RenderResult, password = faker.internet.password()) => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};
const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string) => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
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
    simulateStatusForField(sut, 'email', errorMessage);
    simulateStatusForField(sut, 'password', errorMessage);

  });


  test('Should show email error if Validation fails', () => {
    const errorMessage = faker.word.sample();

    const { sut } = makeSut({ validationError: errorMessage });
    populateEmailField(sut);
    simulateStatusForField(sut, 'email', errorMessage);

  });

  test('Should show password error if Validation fails', () => {
    const errorMessage = faker.word.sample();
    const { sut } = makeSut({ validationError: errorMessage });
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', errorMessage);

  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);

    simulateStatusForField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
  test('Should show Spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);


    expect(authenticationSpy.params).toEqual({
      email: email,
      password: password,
    });
  });

});