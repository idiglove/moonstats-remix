import isFinite from 'lodash/isFinite'
import isNumber from 'lodash/isNumber'
import { useEffect, useState } from 'react'
import type { FunctionComponent } from 'react'
import type { DisplayOptions } from './../HeaderColumn/types'

const Subheading: FunctionComponent<Props> = ({ displayOptions }) => {
  const [text, setText] = useState('-')

  useEffect(() => {
    if (displayOptions?.data?.showSubheading) {
      const subHeadingCurrentAmount =
        displayOptions?.subHeadingCurrentAmount ?? 0
      const mainAmount = displayOptions?.data?.mainAmount ?? 0
      const subHeadingTotal = mainAmount / subHeadingCurrentAmount
      const subHeadingTotalParsed =
        isNumber(subHeadingTotal) && isFinite(subHeadingTotal)
          ? subHeadingTotal.toFixed(4)
          : '-'
      setText(
        `(${subHeadingTotalParsed} ${displayOptions.subHeadingCoin.toUpperCase()})`
      )
    }
  }, [
    displayOptions?.data?.mainAmount,
    displayOptions?.data?.showSubheading,
    displayOptions.subHeadingCoin,
    displayOptions?.subHeadingCurrentAmount,
  ])

  return <>{displayOptions?.data?.showSubheading && <h5>{text}</h5>}</>
}

type Props = {
  displayOptions: DisplayOptions
}

export default Subheading
