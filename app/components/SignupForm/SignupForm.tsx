import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm } from 'remix-validated-form'
import { Link, useActionData } from '@remix-run/react'
import { z } from 'zod'
import Input from '~/components/Common/Input/Input'
import Button from '~/components/Common/Button/Button'
import React from 'react'

export const validator = withZod(
  z.object({
    firstName: z
      .string()
      .regex(/^[A-Za-z\s]+$/)
      .min(1, { message: 'First name is required' }),
    lastName: z
      .string()
      .regex(/^[A-Za-z\s]+$/)
      .optional(),
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  })
)

const SignupForm = () => {
  const actionData = useActionData()
  const { success } = actionData ?? {}

  return (
    <React.Fragment>
      <ValidatedForm validator={validator} method="post">
        <h2>Signup Form</h2>
        <Input
          name="firstName"
          placeholder="First Name"
          label="First Name"
          type="text"
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          label="Last Name"
          type="text"
        />
        <Input name="email" placeholder="Email" label="Email" type="email" />
        <Input
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        {success === false && <div className="input-error">Signup Failed</div>}
        <Button buttonLabel="Submit" />
        {success === true ? (
          <>
            <div>Signup Success</div>
            <Link className="below-submit-link" to="/">
              Login page
            </Link>
          </>
        ) : (
          <Link className="below-submit-link" to="/">
            Have an account? Login instead.
          </Link>
        )}
      </ValidatedForm>
    </React.Fragment>
  )
}

export default SignupForm
