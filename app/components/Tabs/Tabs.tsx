import cx from 'classnames'
// import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FunctionComponent } from 'react'

const Tabs: FunctionComponent<Props> = ({
  contentList,
  layoutId,
  setSelected,
  selected,
}) => {
  return (
    <div className="tabs">
      {contentList.map((content, i) => {
        return (
          <div
            key={`${content.name}-${i}`}
            className={cx(content.name, 'tab-item')}
            onClick={() => setSelected(i)}
          >
            <h4
              className="column-heading"
              style={{
                color: selected === i ? '#00C6BD' : '#CDCDCD',
              }}
            >
              {content.text}
            </h4>
            {i === selected && (
              <motion.div
                layoutId={layoutId}
                className="underline"
                style={{ backgroundColor: '#00C6BD', height: 1 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

type Props = {
  contentList: Content[]
  layoutId: string
  selected: number
  setSelected: Function
}

type Content = {
  name: string
  text: string
}

export default Tabs
