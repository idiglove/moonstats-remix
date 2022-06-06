import type { FunctionComponent } from 'react'

const HeaderColumn: FunctionComponent<Props> = ({
  classNames,
  displayOptions,
}) => {
  const transformField = (data: ColumnData) => {
    if (data?.isPositive) {
      const prefix = data?.isPositive ? '+' : '-'
      return `${prefix}${data?.mainAmount} USD`
    }

    return data?.mainAmount ?? 0
  }

  return (
    <div className={classNames?.wrapper ?? 'header-column-wrapper'}>
      <h4>{displayOptions?.heading}</h4>
      <h3>{transformField(displayOptions?.data ?? {})}</h3>
    </div>
  )
}

type Props = {
  classNames?: {
    wrapper?: string
  }
  displayOptions: {
    heading: string
    data: ColumnData
  }
}

type ColumnData = {
  field: string
  mainAmount: number
  isPositive?: boolean
}

export default HeaderColumn
