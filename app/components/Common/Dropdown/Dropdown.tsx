import { Menu } from '@headlessui/react'
import { useState } from 'react'

const Dropdown = ({ list, defaultValue, label }: Props) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Menu>
      <label>{label}</label>
      <input hidden type="text" value={value} name="type" />
      <Menu.Button className="menu-button">{value}</Menu.Button>
      <Menu.Items className="flex flex-col absolute bg-white z-10">
        {list?.map((listVal: any, i: number) => {
          return (
            <Menu.Item key={`${listVal?.value}-${i}`}>
              {({ active }) => (
                <span
                  className={`${
                    active && 'bg-teal-primary'
                  } cursor-pointer p-2`}
                  onClick={() => setValue(listVal?.value ?? '')}
                >
                  {listVal?.value ?? ''}
                </span>
              )}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}

type Props = {
  list: {
    value: string
  }[]
  defaultValue: string
  label: string
}

export default Dropdown
