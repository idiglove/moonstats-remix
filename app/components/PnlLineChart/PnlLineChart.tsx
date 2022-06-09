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
import { Line } from 'react-chartjs-2'

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
      text: 'Chart.js Line Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const min = Math.ceil(0)
const max = Math.floor(100)
// const random = Math.floor(Math.random() * (max - min) + min)

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * (max - min) + min)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (max - min) + min)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const PnlLineChart = () => {
  return (
    <div className="pnl-line-chart-wrapper">
      <Line options={options} data={data} />
    </div>
  )
}

export default PnlLineChart
