import React from 'react';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string | null;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={ validationStub } />);
  return {
    sut,
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

});