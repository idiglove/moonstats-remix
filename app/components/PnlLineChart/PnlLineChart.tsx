import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { FunctionComponent } from 'react'
import { Line } from 'react-chartjs-2'
import type { IPnl, ISpotOrder } from '~/types/coin.types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Spot Order Activity',
    },
  },
  options: {
    maintainAspectRatio: false,
  },
}

export const data = (spotOrdersByDate: SpotOrdersByDate[]) => {
  let dates: string[] = []
  const items = spotOrdersByDate?.map((so) => {
    dates.push(`${so?._id?.day}-${so?._id?.month}-${so?._id?.year}`)
    let buy = 0
    let sell = 0

    so?.items?.map((item) => {
      if (item.type === 'BUY') {
        buy++
      } else {
        sell++
      }
    })

    return { buy, sell }
  })

  const dataset = [
    {
      label: 'Buy',
      data: items.map((item) => {
        return item?.buy
      }),
      borderColor: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    {
      label: 'Sell',
      data: items.map((item) => {
        return item?.sell
      }),
      borderColor: 'rgb(0, 198, 189)',
      backgroundColor: 'rgba(0, 198, 189, 0.5)',
    },
  ]
  return {
    labels: dates,
    datasets: dataset,
  }
}

const PnlLineChart: FunctionComponent<Props> = ({ spotOrdersByDate }) => {
  const dataset = data(spotOrdersByDate)
  return (
    <div
      className="pnl-line-chart-wrapper"
      style={{ height: '352px', width: '100%' }}
    >
      <Line options={options} data={dataset} width="900" height="340" />
    </div>
  )
}

type Props = {
  spotOrdersByDate: SpotOrdersByDate[]
}

type SpotOrdersByDate = {
  _id: {
    day: number
    month: number
    year: number
  }
  items: ISpotOrder[]
}

export default PnlLineChart
