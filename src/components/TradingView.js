import React from 'react'
import TradingViewWidget from 'react-tradingview-widget'

const TradingView = () => {
  return (
    <div>
      <TradingViewWidget
        symbol='NASDAQ:AAPL'
        // theme={Themes.DARK}
        locale='fr'
        autosize
      />
    </div>
  )
}

export default TradingView
