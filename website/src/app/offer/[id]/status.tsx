'use client';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Dark from '@amcharts/amcharts5/themes/Dark';
import { useEffect, useRef, useState } from 'react';
import { SkeletonProvider } from '@/components/SkeletonProvider';
import { OfferStatus, useOfferStatus } from './context';

function SkeletonLoader() {
  return (
    <SkeletonProvider>
      <rect x="20" y="5" rx="0" ry="0" width="1" height="170" />
      <rect x="20" y="175" rx="0" ry="0" width="360" height="1" />
      <rect x="40" y="75" rx="0" ry="0" width="35" height="100" />
      <rect x="80" y="125" rx="0" ry="0" width="35" height="50" />
      <rect x="120" y="105" rx="0" ry="0" width="35" height="70" />
      <rect x="160" y="35" rx="0" ry="0" width="35" height="140" />
      <rect x="200" y="55" rx="0" ry="0" width="35" height="120" />
      <rect x="240" y="15" rx="0" ry="0" width="35" height="160" />
      <rect x="280" y="135" rx="0" ry="0" width="35" height="40" />
      <rect x="320" y="85" rx="0" ry="0" width="35" height="90" />
    </SkeletonProvider>
  );
}

export function OfferStatus({
  id,
  currentCandidates,
}: {
  id: string;
  currentCandidates: number;
}) {
  const [loading, setLoading] = useState(true);
  const [offerStatus, setOfferStatus] = useState<OfferStatus>(
    {} as OfferStatus
  );
  const { setOfferStatus: setStatus } = useOfferStatus();
  const chartEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://api.jobcompass.dev/offer-updates/${id}`)
      .then((res) => res.json())
      .then((data) => setOfferStatus(data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (chartEl.current) {
      const root = am5.Root.new(chartEl.current);
      root.setThemes([am5themes_Animated.new(root), am5themes_Dark.new(root)]);

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          layout: root.verticalLayout,
          focusable: false,
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
          pinchZoomX: true,
        })
      );

      if (offerStatus) {
        setStatus(offerStatus);
      }

      let lastValueWasZero = false;

      let data = offerStatus.updates
        .map((_, i) => {
          const isOutage =
            offerStatus.candidates[i] === 0 && offerStatus.vacancies[i] === 0;
          const isRecovery =
            lastValueWasZero &&
            offerStatus.candidates[i] !== 0 &&
            offerStatus.vacancies[i] !== 0;
          lastValueWasZero = isOutage;
          return {
            value: offerStatus.candidates[i],
            date: new Date(offerStatus.updates[i]).getTime(),
            isOutage,
            isRecovery,
          };
        })
        .filter((item) => !item.isOutage && !item.isRecovery)
        .map(({ date, value }) => ({ date, value }));

      // Calculate average change in candidates
      let changeSum = 0;
      const daysToShow = 3;
      for (let i = 1; i < data.length; i++) {
        changeSum += data[i].value - data[i - 1].value;
      }
      let avgChangePerDay = changeSum / (data.length - 1);

      // Prepare data
      let lastValue = data[data.length - 1].value;
      let lastDate = new Date(data[data.length - 1].date);

      for (let i = 1; i <= daysToShow; i++) {
        let futureDate = new Date(lastDate);
        futureDate.setDate(lastDate.getDate() + i);
        let futureValue = lastValue + avgChangePerDay * i;

        let newData = {
          value: futureValue,
          date: futureDate.getTime(),
        };
        if (i === 1) {
          // @ts-ignore
          newData.strokeSettings = {
            strokeDasharray: [10, 5, 2, 5],
            strokeOpacity: 0.2,
          };
          // @ts-ignore
          newData.fillSettings = {
            fillOpacity: 0.1,
          };
        }
        data.push(newData);
      }

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.5,
          groupData: false,
          baseInterval: {
            timeUnit: 'hour',
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            pan: 'zoom',
            minGridDistance: 50,
          }),
        })
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 1,
          renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' }),
        })
      );

      xAxis.data.setAll(data);

      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: 'Candidatos',
          minBulletDistance: 10,
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: 'date',
          valueYField: 'value',
          tension: 0.2,
          fill: am5.color(0x4d07e3),
          stroke: am5.color('#7fcef3'),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 4,
        templateField: 'strokeSettings',
      });

      const gradient = am5.LinearGradient.new(root, {
        stops: [
          {
            color: am5.color('rgb(233, 213, 255)'),
            offset: 0,
          },
          {
            color: am5.color('rgb(192, 132, 252)'),
            offset: 0.5,
          },
          {
            color: am5.color('rgb(107, 33, 168)'),
            offset: 1,
          },
        ],
      });

      series.fills.template.setAll({
        visible: true,
        fillOpacity: 0.3,
        fillGradient: gradient,
        templateField: 'fillSettings',
      });

      series.data.setAll(data);

      // Add cursor
      chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          behavior: 'zoomXY',
          xAxis: xAxis,
        })
      );

      xAxis.set(
        'tooltip',
        am5.Tooltip.new(root, {
          themeTags: ['axis'],
        })
      );

      yAxis.set(
        'tooltip',
        am5.Tooltip.new(root, {
          themeTags: ['axis'],
        })
      );

      series.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [offerStatus, currentCandidates, chartEl]);

  return (
    <section className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[900] p-4 backdrop-filter backdrop-blur-sm">
      <h3 className="text-xl font-bold">Actualizaciones</h3>
      <hr className="w-full border-gray-500/20 my-2" />
      <h3 className="text-sm text-gray-400">Candidatos</h3>
      {loading && (
        <div className="flex flex-col justify-center h-96 items-center w-full">
          <SkeletonLoader />
        </div>
      )}
      {!loading && offerStatus.updates?.length === 0 && (
        <div className="flex flex-col justify-start items-start w-full">
          No hay actualizaciones
        </div>
      )}
      {!loading && offerStatus.updates?.length > 0 && (
        <div className="flex flex-col justify-start items-start w-full">
          <div ref={chartEl} className="w-full h-96" id="chartdiv"></div>
        </div>
      )}
    </section>
  );
}
