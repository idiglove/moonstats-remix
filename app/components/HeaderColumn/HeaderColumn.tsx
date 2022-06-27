import type { FunctionComponent } from 'react'
import type { HeaderColumnData } from './types'

const HeaderColumn: FunctionComponent<Props> = ({ classNames, data }) => {
  return (
    <div className={classNames?.wrapper ?? 'header-column-wrapper'}>
      <h4 className="column-heading">{data?.name}</h4>
      <h3>{data?.mainText}</h3>
      <h5>{data?.subText}</h5>
    </div>
  )
}

type Props = {
  classNames?: {
    wrapper?: string
  }
  data: HeaderColumnData
  // displayOptions: DisplayOptions
}

export default HeaderColumn
