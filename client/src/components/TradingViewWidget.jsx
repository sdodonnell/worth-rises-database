import React, { useEffect } from 'react';

const TradingViewWidget = ({ stockTicker }) => {
  useEffect(() => {
    if (window.TradingView) {
      new window.TradingView.widget({
        autosize: true,
        symbol: `NYSE:${stockTicker}`,
        interval: 'W',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '2',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        save_image: false,
        container_id: `tradingview_${stockTicker}`,
      });
    }
  }, []);

  return (
    <>
      <div id={`tradingview_${stockTicker}`} style={{ height: 'calc(100% - 32px' }} />
      <div className="tradingview-widget-copyright">
        <a href={`https://www.tradingview.com/symbols/NYSE-${stockTicker}/`} rel="noreferrer" target="_blank">
          <span className="blue-text">{stockTicker} Chart</span>
        </a>
        by TradingView
      </div>
    </>
  );
};

export default TradingViewWidget;
