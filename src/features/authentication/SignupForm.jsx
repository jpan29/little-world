import { useForm } from 'react-hook-form'

import Button from '../../ui/Button'
import Form from '../../ui/Form'

import FormRowVertical from '../../ui/FormRowVertical'
import Input from '../../ui/Input'
import Links from '../../ui/Links'
import useSignup from './useSignup'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup()
  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState

  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: reset })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          defaultValue={''}
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          defaultValue={''}
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs at least 8 characters',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Repeat password"
        error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords are not same',
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        {/* type is an HTML attribute! */}
        {/* <Button variation="secondary" type="reset" disabled={isLoading}>
          Reset
        </Button> */}
        <Button disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Create new user'}
        </Button>
      </FormRowVertical>
      <Links to="/login">Already have an account</Links>
    </Form>
  )
}

export default SignupForm
