import { useIsSubmitting } from 'remix-validated-form'

const Button = ({ buttonLabel = 'Submit', onClick }: Props) => {
  const isSubmitting = useIsSubmitting()
  return (
    <button type="submit" disabled={isSubmitting} onClick={onClick}>
      {isSubmitting ? 'Submitting...' : buttonLabel}
    </button>
  )
}

type Props = {
  buttonLabel: string
  onClick?: () => void
}

export default Button
