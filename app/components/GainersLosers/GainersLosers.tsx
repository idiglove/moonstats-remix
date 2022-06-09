import type { FunctionComponent } from 'react'
import type { ICoin } from '~/types/coin.types'

import Tabs from '../Tabs/Tabs'

const GainersLosers: FunctionComponent<Props> = ({ data, layoutId }) => {
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
      <Tabs contentList={contentList} layoutId={layoutId} />
      <table>
        <tbody>
          {data?.gainers?.map((gainer, i) => {
            return (
              <tr key={`${gainer}-${i}`}>
                <td>{gainer?.coin}</td>
                <td>{gainer?.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type Props = {
  data: {
    gainers: ICoin[]
    losers: ICoin[]
  }
  layoutId: string
}

export default GainersLosers
