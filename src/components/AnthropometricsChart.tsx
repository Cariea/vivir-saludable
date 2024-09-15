import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import { getAntropometrics } from '@/actions/getActions';

type EChartsOption = echarts.EChartsOption;

interface Antropometrics {
  armCircumference: number;
  legCircumference: number;
  waist: number;
  hip: number;
  weight: number;
  size: number;
  musculoskeletalMass: number;
  bodyFatMass: number;
  bodyMassIndex: number;
  bodyFatPercentage: number;
  waistHipRatio: number;
  visceralFatLevel: number;
  createdAt: string;
}

interface SeriesData {
  name: string;
  data: [string,string | number][];
}

export default function EChartsMultiLineChart({ params }: { params: { pacientId: string } }) {
  const [seriesData, setSeriesData] = useState<SeriesData[]>([]);
  
  useEffect(() => {
    const fetchPatientAnthropometrics = async () => {
      try {
        const response = await getAntropometrics(params.pacientId);
        const data: Antropometrics[] = response.data;
    
        const keysToInclude: (keyof Antropometrics)[] = [
          'armCircumference',
          'legCircumference',
          'waist',
          'hip',
          'weight',
          'size',
          'musculoskeletalMass',
          'bodyFatMass',
          'bodyMassIndex',
          'bodyFatPercentage',
          'waistHipRatio',
          'visceralFatLevel'
        ];
    
        const seriesData: SeriesData[] = keysToInclude.map((key: keyof Antropometrics) => ({
          name: key,
          data: data.map((entry: Antropometrics) => [entry.createdAt, entry[key]])
        }));
    
        setSeriesData(seriesData);
      } catch (error) {
        console.log('Error fetching patient anthropometrics:', error);
      }
    
    };

    fetchPatientAnthropometrics();
  }, [params.pacientId]);

  useEffect(() => {
    if (seriesData.length > 0) {
      const chartDom = document.getElementById('echarts-multi-line-chart')!;
      const myChart = echarts.init(chartDom);
      
      const option: EChartsOption = {
        title: {
          text: 'Datos Antropométricos del Paciente',
          top: '5%',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: seriesData.map(series => series.name),
          top: '12%', // Ajustar la posición vertical de la leyenda
          left: 'center',
        },
        grid: {
          top: '25%', // Ajustar el margen superior del gráfico
          bottom: '15%' // Ajustar el margen inferior del gráfico
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: seriesData[0].data.map(([date]) => date)
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData.map(series => ({
          name: series.name,
          type: 'line',
          data: series.data.map(([, value]) => value)
        }))
      };

      myChart.setOption(option);

      // Cleanup function
      return () => {
        myChart.dispose();
      };
    }
  }, [seriesData]);

  return <div id="echarts-multi-line-chart" style={{ width: '100%', height: '600px' }}></div>;
}
