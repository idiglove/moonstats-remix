import type { FunctionComponent } from 'react'

const GainersLosers: FunctionComponent<Props> = ({ gainers }) => {
  return (
    <div className="footer-column">
      <div className="tabs">
        <h4 className="column-heading">Gainers</h4>
        <h4 className="column-heading">Losers</h4>
      </div>
      <table>
        {gainers?.map((gainer, i) => {
          return (
            <tr key={`${gainer}-${i}`}>
              <td>{gainer?.coin}</td>
              <td>{gainer?.amount}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

type Props = {
  gainers: {
    coin: string
    amount: number
  }[]
}

export default GainersLosers
