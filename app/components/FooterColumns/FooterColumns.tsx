import type { FunctionComponent } from 'react'

import type { ICoin } from '~/types/coin.types'
import GainersLosers from '../GainersLosers/GainersLosers'

const FooterColumns: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="footer-columns-wrapper">
      <GainersLosers data={data} />
      {/* <GainersLosers data={data} /> */}
    </div>
  )
}

type Props = {
  data: {
    gainers: ICoin[]
    losers: ICoin[]
  }
}

export default FooterColumns
