import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function OrderColumnChart(props) {
  const { month, sold, cancel } = props;

  return (
    <div>
      <Bar
        data={{
          labels: month,
          datasets: [
            {
              label: "Sold",
              // data: [120, 190, 300, 500, 200, 300, 700],
              data: sold,
              backgroundColor: ["rgb(110,202,206,0.3)"],
              borderColor: ["rgb(110,202,206,1)"],
              borderWidth: 1,
            },
            {
              label: "Canceled",
              // data: [120, 190, 300, 500, 200, 300, 700],
              data: cancel,
              backgroundColor: ["rgba(56, 54, 54, 0.05)"],
              borderColor: ["rgba(56, 54, 54, 1)"],
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

export default OrderColumnChart;
