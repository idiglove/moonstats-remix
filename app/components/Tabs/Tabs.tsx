import cx from 'classnames'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FunctionComponent } from 'react'

const Tabs: FunctionComponent<Props> = ({ contentList }) => {
  const [selected, setSelected] = useState('gainers')
  return (
    <div className="tabs">
      {contentList.map((content, i) => {
        return (
          <div
            key={`${content.name}-${i}`}
            className={cx(content.name, 'tab-item')}
            onClick={() => setSelected(content.name)}
          >
            <h4
              className="column-heading"
              style={{
                color: selected === content.name ? '#00C6BD' : '#CDCDCD',
              }}
            >
              {content.text}
            </h4>
            {content.name === selected && (
              <motion.div
                layoutId="gainers-losers"
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
}

type Content = {
  name: string
  text: string
}

export default Tabs
