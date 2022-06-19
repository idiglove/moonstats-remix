import { useNavigate, useActionData } from '@remix-run/react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { withZod } from '@remix-validated-form/with-zod'
import type { ActionFunction } from '@remix-run/node'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import Input from '~/components/Common/Input/Input'
import Button from '~/components/Common/Button/Button'
import Dropdown from '~/components/Common/Dropdown/Dropdown'
import SymbolAutocomplete from '~/components/SymbolAutocomplete/SymbolAutocomplete'
import { typeDropdown } from '~/constants/typeDropdown'

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const values = Object.fromEntries(formData)
  const symbolObj = JSON.parse(values?.symbol as string)

  const res = await fetch('http://localhost:3003/spot-order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 'test',
      symbolPair: `${symbolObj?.symbol.toUpperCase()}-USDT`,
      coinId: symbolObj?.id ?? '',
      type: values.type,
      pricePerCoin: values.pricePerCoin,
      quantity: values.quantity,
    }),
  })

  return null
}

export default function AddOrder() {
  const navigate = useNavigate()
  let [isOpen, setIsOpen] = useState(true)
  const data = useActionData()

  function closeModal() {
    setIsOpen(false)
  }

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
                  <ValidatedForm validator={validator} method="post">
                    <SymbolAutocomplete />
                    <Dropdown {...typeDropdown} />
                    <Input
                      name="pricePerCoin"
                      placeholder="Price Per Coin"
                      label="Price Per Coin"
                      type="number"
                      step="any"
                    />
                    <Input
                      name="quantity"
                      placeholder="Quantity"
                      label="Quantity"
                      type="number"
                      step="any"
                    />
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
