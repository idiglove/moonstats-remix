import type { FunctionComponent } from 'react'
import type { ICoin } from '~/types/coin.types'

const Gainers: FunctionComponent<Props> = ({
  totalRealizedPnl,
  gainersData,
}) => {
  return (
    <>
      {totalRealizedPnl < 0 ? (
        <div>You have no profits as of now</div>
      ) : (
        <table>
          <tbody>
            {gainersData?.map((gainer, i) => {
              if (gainer?.amount > 0) {
                return (
                  <tr key={`${gainer}-${i}`}>
                    <td>{gainer?.coin?.toUpperCase()}</td>
                    <td>{gainer?.amount?.toFixed(3)}</td>
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
  gainersData: ICoin[]
  totalRealizedPnl: number
}

export default Gainers
