import { useNavigate, useActionData } from '@remix-run/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { withZod } from '@remix-validated-form/with-zod'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
// import { ActionFunction, json, useActionData } from "remix";
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import Input from '~/components/Common/Input/Input'
import Button from '~/components/Common/Button/Button'
import Dropdown from '~/components/Common/Autocomplete/Autocomplete'
import SymbolAutocomplete from '~/components/SymbolAutocomplete/SymbolAutocomplete'

export const validator = withZod(
  z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email'),
  })
)

export const action: ActionFunction = async ({ request }) => {
  const data = await validator.validate(await request.formData())
  if (data.error) return validationError(data.error)
  const { firstName, lastName, email } = data.data

  return json({
    title: `Hi ${firstName} ${lastName}!`,
    description: `Your email is ${email}`,
  })
}

export default function AddOrder() {
  const navigate = useNavigate()
  let [isOpen, setIsOpen] = useState(true)
  const data = useActionData()

  function closeModal() {
    setIsOpen(false)
  }
  // console.log('data', { data })
  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => navigate('/dashboard/pnl/')}
      >
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* this is the faded background */}
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add an Order
                  </Dialog.Title>
                  <SymbolAutocomplete />
                  <ValidatedForm validator={validator} method="post">
                    <Input
                      name="firstName"
                      placeholder="first name"
                      label="First Name"
                    />
                    <Input
                      name="lastName"
                      placeholder="last name"
                      label="Last Name"
                    />
                    <Input name="email" placeholder="email" label="Email" />
                    <Button buttonLabel="Submit" />
                  </ValidatedForm>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
