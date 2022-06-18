import { Form } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import Autocomplete from '../Common/Autocomplete/Autocomplete'

const SymbolAutocomplete = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const fetchSymbols = async (symbol: string) => {
      console.log({ symbol })
      const symbolRes = await fetch(
        `http://localhost:3003/coin-gecko/symbol/${symbol}`
      )
      const symbols = await symbolRes?.json()
      setData(symbols)
    }
    if (query.length >= 3) {
      fetchSymbols(query)
    }
  }, [query])

  return (
    <Form method="post" ref={form}>
      <Autocomplete
        setQuery={setQuery}
        data={data}
        field="name"
        secondaryField="symbol"
      />
    </Form>
  )
}

export default SymbolAutocomplete
