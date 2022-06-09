import type { FunctionComponent } from 'react'

import type { ICoin } from '~/types/coin.types'
import CoinsColumn from '../CoinsColumn/CoinsColumn'
import GainersLosers from '../GainersLosers/GainersLosers'

const FooterColumns: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="footer-columns-wrapper">
      <GainersLosers data={data} layoutId="gainers-losers" />
      <CoinsColumn allCoins={data?.allCoins ?? []} />
    </div>
  )
}

type Props = {
  data: {
    gainers: ICoin[]
    losers: ICoin[]
    allCoins: ICoin[]
  }
}

export default FooterColumns
