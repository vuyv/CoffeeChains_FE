import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function ColumnChart(props) {
  const { dates, totals } = props;

  return (
    <div>
      <Bar
        data={{
          labels: dates,
          datasets: [
            {
              label: "Earnings ($)",
              // data: [120, 190, 300, 500, 200, 300, 700],
              data: totals,
              backgroundColor: ["rgba(201, 213, 180, 0.6)"],
              borderColor: ["rgba(201, 213, 180, 1)"],
              borderWidth: 1,
            },
          ],
        }}
        height={500}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default ColumnChart;
