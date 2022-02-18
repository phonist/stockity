import { any } from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { attemptGetTickers } from '../../redux/thunks/Tickers';
import { AppState } from '../../redux/store';

interface CandleStickProps {
  chart: any;
  title: any;
  xaxis: any;
  yaxis: any;
}

export default function CandleStick (props:any) {
    const {
      tickerParams
    } = props;
    const tickers = useSelector((state: AppState) => state.tickers).tickers;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState<CandleStickProps>({
      chart: {
        type: 'candlestick',
        height: 350,
      },
      title: {
        text: 'APPL',
        align: 'left'
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val:any) {
            return new Date(val).toDateString();
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    });
    const [chartData, setChartData] = useState([]);
    const [state, setState] = useState({
      series: [{
        data: chartData
      }],
      options: option,
    });

    useEffect(() => {
      dispatch(attemptGetTickers(tickerParams));
      if (tickers._id === '' || tickers._id === undefined) {
        setLoading(true);
      } else {
        var jsonData: any = {};
        let temp: any = [];
        tickers.timestamp.forEach((item:any, index:any) => 
        {
          let jsonData: any = {};
          jsonData.x = new Date(item*1000).toISOString();
          jsonData.y = [
            Number(tickers.indicators.quote[0].open[index].toFixed(2)), // open
            Number(tickers.indicators.quote[0].high[index].toFixed(2)), // high
            Number(tickers.indicators.quote[0].low[index].toFixed(2)),  // low
            Number(tickers.indicators.quote[0].close[index].toFixed(2)) // close
          ];
          temp.push(jsonData);
        });
        setOption({
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: tickers.meta.symbol,
            align: 'left'
          },
          xaxis: {
            type: 'category',
            labels: {
              formatter: function (val:any) {
                return new Date(val).toDateString();
              }
            }
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        })
        setState({
          series: [{
            data: temp
          }],
          options: option,
        });
        setLoading(false);
      }
    },[tickerParams, tickers._id, dispatch]);

    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
        )}
      </div>
    );
}
