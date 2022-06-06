import { useLoaderData } from '@remix-run/react'
import HeaderColumn from '~/components/HeaderColumn/HeaderColumn'

export function loader() {
  return [
    {
      name: 'Total PNL',
      field: 'pnl',
      mainAmount: 20,
      isPositive: true,
    },
    {
      name: 'Balance',
      field: 'balance',
      mainAmount: 100,
    },
    {
      name: '24 Hour Change',
      field: 'dailyChange',
      mainAmount: 1,
      isPositive: true,
    },
    {
      name: 'Weekly Change',
      field: 'weeklyChange',
      mainAmount: 2,
      isPositive: false,
    },
  ]
}

export default function DashboardPnl() {
  const data = useLoaderData()
  return (
    <div className="pnl-wrapper">
      <table className="header-columns">
        {data.map((col, i) => {
          return (
            <HeaderColumn
              key={`header-column-${i}`}
              displayOptions={{
                heading: col?.name ?? '',
                data: col,
              }}
            />
          )
        })}
      </table>
      {/* <table className="header-columns">
        <tr>
          <td>
            <HeaderColumn
              displayOptions={{
                heading: 'Total PNL',
              }}
            />
          </td>
          <td>
            <HeaderColumn
              displayOptions={{
                heading: 'Total PNL asdas dasf asd asd asd as',
              }}
            />
          </td>
          <td>
            <HeaderColumn
              displayOptions={{
                heading: 'Total PNL',
              }}
            />
          </td>
          <td>
            <HeaderColumn
              displayOptions={{
                heading: 'Total PNL',
              }}
            />
          </td>
        </tr>
      </table> */}
    </div>
  )
}
