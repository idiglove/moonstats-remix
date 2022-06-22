import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Input from '~/components/Common/Input/Input'
import Button from '~/components/Common/Button/Button'

export const validator = withZod(
  z.object({
    pricePerCoin: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Should be a number',
    }),
    symbol: z.string().min(1, { message: 'Coin is required' }),
    quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Should be a number',
    }),
  })
)

const LoginForm = () => {
  return (
    <div>
      <ValidatedForm validator={validator} method="post">
        <Input
          name="email"
          placeholder="Email"
          label="Email"
          type="email"
        />
        <Input
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <Button buttonLabel="Submit" />
      </ValidatedForm>
    </div>
  )
}

export default LoginForm
