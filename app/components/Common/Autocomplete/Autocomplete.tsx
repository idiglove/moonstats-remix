import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { useField } from 'remix-validated-form'

const Autocomplete = ({ data, field, secondaryField, setQuery }: Props) => {
  const [selected, setSelected] = useState(data?.[0] ?? {})
  const [query] = useState('')
  const { error, getInputProps } = useField('symbol')

  const filteredData =
    query === ''
      ? data
      : data?.filter((val: any) =>
          val[field]
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <input
              hidden
              type="text"
              value={JSON.stringify(selected)}
              name="symbol"
            />
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(value: any) => {
                if (value && value[field] && value[secondaryField ?? '']) {
                  return `${value[field]} ${value[secondaryField ?? '']}`
                }
                return ''
              }}
              {...getInputProps}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              &gt;&gt;&gt;
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData?.map((value: any) => (
                  <Combobox.Option
                    key={value.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {value[field]}
                          {value[secondaryField ?? ''] && (
                            <span> - {value[secondaryField ?? '']}</span>
                          )}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      {error && <span className="input-error">{error}</span>}
    </>
  )
}

type Props = {
  data: any
  field: string
  secondaryField?: string
  setQuery: (val: string) => void
}

export default Autocomplete
