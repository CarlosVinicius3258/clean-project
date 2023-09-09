import React from 'react';
import { RenderResult, cleanup, fireEvent, render } from '@testing-library/react';
import Login from './login';
import { ValidationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={ validationSpy } />);
  return {
    sut,
    validationSpy
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
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('*Campo Obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('*Campo Obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email fields', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    const fakerEmail = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: fakerEmail } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(fakerEmail);
  });

  test('Should call validation with correct password fields', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const fakerPassword = faker.internet.password();

    fireEvent.input(passwordInput, { target: { value: fakerPassword } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(fakerPassword);
  });
});