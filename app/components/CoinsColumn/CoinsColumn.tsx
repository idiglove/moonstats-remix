import type { FunctionComponent } from 'react'
import type { ICoin } from '~/types/coin.types'

const CoinsColumn: FunctionComponent<Props> = ({ allCoins }) => {
  return (
    <div className="footer-column">
      <table>
        <thead>
          <td>Coin</td>
          <td>Amount</td>
          <td>Holdings</td>
        </thead>
        <tbody>
          {allCoins?.map((coin, i) => {
            return (
              <tr key={`${coin}-${i}`}>
                <td>{coin?.coin}</td>
                <td>{coin?.amount}</td>
                <td>{coin?.holdings ?? '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type Props = {
  allCoins: ICoin[]
}

export default CoinsColumn
