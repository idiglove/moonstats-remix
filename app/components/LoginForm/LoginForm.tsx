import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm } from 'remix-validated-form'
import { Link, useActionData } from '@remix-run/react'
import { z } from 'zod'
import Input from '~/components/Common/Input/Input'
import Button from '~/components/Common/Button/Button'
import React from 'react'

export const validator = withZod(
  z.object({
    email: z.string().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  })
)

const LoginForm = () => {
  const actionData = useActionData()
  const { res } = actionData ?? {}

  return (
    <React.Fragment>
      <ValidatedForm validator={validator} method="post">
        <h2>Login Form</h2>
        <Input name="email" placeholder="Email" label="Email" type="email" />
        <Input
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        {res?.success === false && (
          <div className="input-error">Login Failed</div>
        )}
        <Button buttonLabel="Submit" />
        <Link className='below-submit-link' to='/signup'>No account? Sign up instead.</Link>
      </ValidatedForm>
    </React.Fragment>
  )
}

export default LoginForm
