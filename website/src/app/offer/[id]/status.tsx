"use client";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { useEffect, useRef, useState } from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

type OfferStatus = {
  id: string;
  updates: string[];
  candidates: number[];
  maxSalary: number[];
  minSalary: number[];
  vacancies: number[];
  active: boolean[];
  updated: string[];
  killerQuestions: number[];
  openQuestions: number[];
};

function SkeletonLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={3}
      width={"100%"}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#141521"
      foregroundColor="#7fcef3"
      backgroundOpacity={0.2}
      foregroundOpacity={0.4}
      {...props}
    >
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
    </ContentLoader>
  );
}

export function OfferStatus({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [offerStatus, setOfferStatus] = useState<OfferStatus>(
    {} as OfferStatus,
  );
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
          panY: false,
          layout: root.verticalLayout,
        }),
      );

      const data = offerStatus.updates.map((_, i) => ({
        value: offerStatus.candidates[i],
        date: new Date(offerStatus.updates[i]).getTime(),
      }));

      const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: {
            timeUnit: "minute",
            count: 1,
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 50,
          }),
        }),
      );

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          // The "candidates" field contains numerical values.
          renderer: am5xy.AxisRendererY.new(root, {}),
        }),
      );

      xAxis.data.setAll(data);

      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Candidatos",
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "date",
          valueYField: "value",
          tooltip: am5.Tooltip.new(root, {}),
          tension: 0.5,
          fill: am5.color(0x4d07e3),
          stroke: am5.color("#7fcef3"),
        }),
      );

      series.strokes.template.setAll({
        strokeWidth: 4,
      });

      series.data.setAll(data);

      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
          marginTop: 15,
          marginBottom: 15,
        }),
      );

      legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          behavior: "zoomXY",
          xAxis: xAxis,
        }),
      );

      xAxis.set(
        "tooltip",
        am5.Tooltip.new(root, {
          themeTags: ["axis"],
        }),
      );

      yAxis.set(
        "tooltip",
        am5.Tooltip.new(root, {
          themeTags: ["axis"],
        }),
      );

      return () => {
        root.dispose();
      };
    }
  }, [offerStatus]);

  return (
    <section className="flex flex-col justify-start items-start w-full rounded-xl border border-gray-500/20 bg-gray-800/20 z-[999] mt-4 p-4">
      <h3 className="text-xl font-bold">Actualizaciones</h3>
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
          <hr className="w-full border-gray-500/20 my-1" />
          <h3 className="text-sm text-gray-400">Candidatos</h3>
          <div ref={chartEl} className="w-full h-96" id="chartdiv"></div>
        </div>
      )}
    </section>
  );
}
