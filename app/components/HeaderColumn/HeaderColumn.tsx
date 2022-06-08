import type { FunctionComponent } from 'react'
import type { HeaderColumnData, DisplayOptions } from './types'
import Subheading from '../Subheading/Subheading'

const HeaderColumn: FunctionComponent<Props> = ({
  classNames,
  displayOptions,
}) => {
  const transformField = (data: HeaderColumnData) => {
    if (data?.isPositive) {
      const prefix = data?.isPositive ? '+' : '-'
      return `${prefix}${data?.mainAmount} USD`
    }

    return data?.mainAmount ?? 0
  }

  return (
    <div className={classNames?.wrapper ?? 'header-column-wrapper'}>
      <h4 className="column-heading">{displayOptions?.heading}</h4>
      <h3>{transformField(displayOptions?.data ?? {})}</h3>
      <Subheading displayOptions={displayOptions} />
    </div>
  )
}

type Props = {
  classNames?: {
    wrapper?: string
  }
  displayOptions: DisplayOptions
}

export default HeaderColumn
