import HeaderColumn from '~/components/HeaderColumn/HeaderColumn'

export default function DashboardPnl() {
  return (
    <div className="pnl-wrapper">
      <table className="header-columns">
        <HeaderColumn
          displayOptions={{
            heading: 'Total PNL',
          }}
        />
        <HeaderColumn
          displayOptions={{
            heading: 'Total PNL das dasd asd asd asd asd asd  asd asd asd as',
          }}
        />
        <HeaderColumn
          displayOptions={{
            heading: 'Total PNL',
          }}
        />
        <HeaderColumn
          displayOptions={{
            heading: 'Total PNL',
          }}
        />
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
