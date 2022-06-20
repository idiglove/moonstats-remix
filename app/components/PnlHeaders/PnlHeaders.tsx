import type { FunctionComponent } from 'react'
import useFetchCoin from '~/hooks/useFetchCoin'
import HeaderColumn from '../HeaderColumn/HeaderColumn'
import type { HeaderColumnData } from '../HeaderColumn/types'

const PnlHeaders: FunctionComponent<Props> = ({ pnl }) => {
  // const btcAmount = useFetchCoin('bitcoin', 'btc')

  // if (!btcAmount) {
  //   return null
  // }

  return (
    <div className="header-columns">
      {pnl?.map((col: HeaderColumnData, i: number) => {
        return <HeaderColumn key={`header-column-${i}`} data={col} />
      })}
    </div>
  )
}

type Props = {
  pnl: HeaderColumnData[]
}

export default PnlHeaders
