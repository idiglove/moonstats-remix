import type { FunctionComponent } from 'react'
import type { PnlBreakdown } from '~/types/coin.types'

const CoinsColumn: FunctionComponent<Props> = ({ pnlBreakdown }) => {
  return (
    <div className="footer-column">
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>PNL</th>
            <th>Holdings</th>
          </tr>
        </thead>
        <tbody>
          {pnlBreakdown?.map((coin, i) => {
            return (
              <tr key={`${coin}-${i}`}>
                <td>{coin?.symbol.toUpperCase()}</td>
                <td>{coin?.realizedPnl.toFixed(3)}</td>
                <td>{coin?.unrealizedQuantity ?? '-'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type Props = {
  pnlBreakdown: PnlBreakdown[]
}

export default CoinsColumn
