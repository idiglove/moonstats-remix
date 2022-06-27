import type { FunctionComponent } from 'react'
import HeaderColumn from '../HeaderColumn/HeaderColumn'
import type { HeaderColumnData } from '../HeaderColumn/types'

const PnlHeaders: FunctionComponent<Props> = ({ pnl }) => {
  return (
    <div className="header-columns">
      {pnl?.map((col: HeaderColumnData, i: number) => {
        return <HeaderColumn key={`header-column-${i}`} data={col} />
      })}
    </div>
  )
}

type Props = {
  pnl: HeaderColumnData[]
}

export default PnlHeaders
