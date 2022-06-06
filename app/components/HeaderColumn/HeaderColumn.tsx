import type { FunctionComponent } from 'react'

const HeaderColumn: FunctionComponent<Props> = ({
  classNames,
  displayOptions,
}) => {
  return (
    <div className={classNames?.wrapper ?? 'header-column-wrapper'}>
      <h4>{displayOptions?.heading}</h4>
    </div>
  )
}

type Props = {
  classNames?: {
    wrapper?: string
  }
  displayOptions: {
    heading: string
  }
}

export default HeaderColumn
