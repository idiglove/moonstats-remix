import GainersLosers from '../GainersLosers/GainersLosers'

const FooterColumns = ({ gainers }) => {
  return (
    <div className="footer-columns-wrapper">
      <GainersLosers gainers={gainers} />
      <GainersLosers gainers={gainers} />
    </div>
  )
}

export default FooterColumns
