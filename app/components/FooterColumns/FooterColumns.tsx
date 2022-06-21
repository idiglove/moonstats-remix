import type { FunctionComponent } from 'react'

import type { ICoin, IPnl } from '~/types/coin.types'
import CoinsColumn from '../CoinsColumn/CoinsColumn'
import GainersLosers from '../GainersLosers/GainersLosers'

const FooterColumns: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="footer-columns-wrapper">
      <GainersLosers data={data} layoutId="gainers-losers" />
      <CoinsColumn pnlBreakdown={data?.pnlObj?.totalPnl ?? []} />
    </div>
  )
}

type Props = {
  data: {
    gainersLosers: ICoin[]
    pnlObj: IPnl
  }
}

export default FooterColumns
