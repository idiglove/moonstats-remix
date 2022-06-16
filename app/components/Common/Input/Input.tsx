import { useField } from 'remix-validated-form'

const Input = ({ name, label, placeholder }: MyInputProps) => {
  const { error, getInputProps } = useField(name)
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...getInputProps({ id: name, placeholder })} />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}

type MyInputProps = {
  name: string
  label: string
  placeholder: string
}

export default Input
