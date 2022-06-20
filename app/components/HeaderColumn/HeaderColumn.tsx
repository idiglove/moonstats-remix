import type { FunctionComponent } from 'react'
import type { HeaderColumnData, DisplayOptions } from './types'
import Subheading from '../Subheading/Subheading'

const HeaderColumn: FunctionComponent<Props> = ({ classNames, data }) => {
  // const transformField = (data: HeaderColumnData) => {
  //   if (data?.isPositive) {
  //     const prefix = data?.isPositive ? '+' : '-'
  //     return `${prefix}${data?.mainAmount} USD`
  //   }

  //   return data?.mainAmount ?? 0
  // }

  return (
    <div className={classNames?.wrapper ?? 'header-column-wrapper'}>
      <h4 className="column-heading">{data?.name}</h4>
      <h3>{data?.mainText}</h3>
      <h5>{data?.subText}</h5>
      {/* <Subheading displayOptions={displayOptions} /> */}
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
