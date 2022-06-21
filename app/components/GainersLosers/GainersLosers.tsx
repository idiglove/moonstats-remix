import type { FunctionComponent } from 'react'
import { useState } from 'react'
import type { ICoin, IPnl } from '~/types/coin.types'
import Tabs from '../Tabs/Tabs'
import Gainers from './Gainers/Gainers'
import Losers from './Losers/Losers'

const GainersLosers: FunctionComponent<Props> = ({ data, layoutId }) => {
  const [selected, setSelected] = useState(0)
  const contentList = [
    {
      name: 'gainers',
      text: 'Gainers',
    },
    {
      name: 'losers',
      text: 'Losers',
    },
  ]

  return (
    <div className="footer-column">
      <Tabs
        contentList={contentList}
        layoutId={layoutId}
        setSelected={setSelected}
        selected={selected}
      />
      {selected === 0 ? (
        <Gainers
          totalRealizedPnl={data?.pnlObj?.totalRealizedPnl}
          gainersData={data?.gainersLosers}
        />
      ) : (
        <Losers
          totalRealizedPnl={data?.pnlObj?.totalRealizedPnl}
          losersData={data?.gainersLosers}
        />
      )}
    </div>
  )
}

type Props = {
  data: {
    gainersLosers: ICoin[]
    allCoins: ICoin[]
    pnlObj: IPnl
  }
  layoutId: string
}

export default GainersLosers
