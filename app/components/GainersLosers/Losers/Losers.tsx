import type { FunctionComponent } from 'react'
import type { ICoin } from '~/types/coin.types'

const Losers: FunctionComponent<Props> = ({ totalRealizedPnl, losersData }) => {
  return (
    <>
      {totalRealizedPnl > 0 ? (
        <div>You have no losses as of now</div>
      ) : (
        <table>
          <tbody>
            {losersData?.map((loser, i) => {
              if (loser?.amount < 0) {
                return (
                  <tr key={`${loser}-${i}`}>
                    <td>{loser?.coin?.toUpperCase()}</td>
                    <td>{loser?.amount?.toFixed(3)}</td>
                  </tr>
                )
              }
              return null
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

type Props = {
  losersData: ICoin[]
  totalRealizedPnl: number
}

export default Losers
