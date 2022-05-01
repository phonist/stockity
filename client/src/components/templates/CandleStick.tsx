import { any } from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { attemptGetTickers } from '../../redux/thunks/Tickers';
import { AppState } from '../../redux/store';
import LoadingContainer from '../organisms/Loading';
import ErrorContainer from '../organisms/Error';
import EmptyContainer from '../organisms/Empty';

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
    const dispatch = useDispatch();
    const tickers = useSelector((state: AppState) => state.tickers);

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
      if(tickers.loading){
        dispatch(attemptGetTickers(tickerParams));
      }else{
        let data = tickers.tickers.result;
        var jsonData: any = {};
        let temp: any = [];
        console.log(data);
        data[0].timestamp.forEach((item:any, index:any) => 
        {
          let jsonData: any = {};
          jsonData.x = new Date(item*1000).toISOString();
          jsonData.y = [
            Number(data[0].indicators.quote[0].open[index].toFixed(2)), // open
            Number(data[0].indicators.quote[0].high[index].toFixed(2)), // high
            Number(data[0].indicators.quote[0].low[index].toFixed(2)),  // low
            Number(data[0].indicators.quote[0].close[index].toFixed(2)) // close
          ];
          temp.push(jsonData);
        });
        setOption({
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: data[0].meta.symbol,
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
      }
    },[tickers.loading, tickers.empty, tickers.error]);

    return (
      <div>
        {tickers.error && <ErrorContainer />}
        {tickers.empty && <EmptyContainer />}
        {tickers.loading ? (
          <LoadingContainer />
        ) : (
          <ReactApexChart options={state.options} series={state.series} type="candlestick" height={350} />
        )}
      </div>
    );
}
