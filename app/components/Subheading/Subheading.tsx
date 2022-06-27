import { useEffect, useState } from 'react'
import type { FunctionComponent } from 'react'
import type { DisplayOptions } from './../HeaderColumn/types'

const Subheading: FunctionComponent<Props> = ({ displayOptions }) => {
  const [text, setText] = useState('-')

  useEffect(() => {
    const subHeadingCurrentAmount = displayOptions?.subHeadingCurrentAmount ?? 0
    setText(
      `(${subHeadingCurrentAmount} ${displayOptions.subHeadingCoin.toUpperCase()})` // will look like (0.00031) BTC
    )
  }, [displayOptions.subHeadingCoin, displayOptions?.subHeadingCurrentAmount])

  return <>{displayOptions?.subHeadingCoin && <h5>{text}</h5>}</>
}

type Props = {
  displayOptions: DisplayOptions
}

export default Subheading
