import { useIsSubmitting } from 'remix-validated-form'

const Button = ({ buttonLabel = 'Submit' }: Props) => {
  const isSubmitting = useIsSubmitting()
  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : buttonLabel}
    </button>
  )
}

type Props = {
  buttonLabel: string
}

export default Button
