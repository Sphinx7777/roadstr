import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { InputComponent } from '../login/renderFields';
import formValidator from '../login/formValidator';


interface IAuthFormProps {
initialValues?: Partial<FormData>;
}

const AuthForm = (props: IAuthFormProps & InjectedFormProps) => {
  const { error, handleSubmit, pristine, reset, submitting, submitSucceeded, onSubmit } = props;
  return (
    <div className="bg-blue-200 max-w-4xl mt-4 mx-auto border-2 border-blue-600 rounded-lg overflow-hidden p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center">
        <Field
          name="email"
          type="text"
          component={InputComponent}
          label="Email or name"
          placeholder='Email or name'
          maxLength="100"
        />
        <Field
          name="password"
          type="password"
          placeholder='Password'
          component={InputComponent}
          label="Password"
          maxLength="100"
        />
        <div className='flex justify-around text-center flex-wrap mb-5'>
          <div>
            <button
              className=" border-solid border-white border-2 rounded-lg px-1 "
              type="submit"
              disabled={pristine || submitting}
            >
              Sign Up
            </button>
            <button
              className=" border-solid border-white border-2 rounded-lg ml-5 px-1"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
    form: 'authForm'
  })(AuthForm);