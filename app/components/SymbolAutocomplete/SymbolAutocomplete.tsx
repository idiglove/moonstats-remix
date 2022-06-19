import { useEffect, useState } from 'react'
import Autocomplete from '../Common/Autocomplete/Autocomplete'

const SymbolAutocomplete = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchSymbols = async (symbol: string) => {
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
    <Autocomplete
      setQuery={setQuery}
      data={data}
      field="name"
      secondaryField="symbol"
    />
  )
}

export default SymbolAutocomplete
