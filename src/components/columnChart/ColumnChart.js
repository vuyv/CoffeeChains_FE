import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

function ColumnChart(props) {
  const { dates, totals } = props;
  // console.log(dates);
  // console.log(totals);

  return (
    <div>
      <Bar
        data={{
          // labels: [
          //   "Red",
          //   "Blue",
          //   "Yellow",
          //   "Green",
          //   "Purple",
          //   "Orange",
          //   "Dark",
          // ],
          labels: dates,
          datasets: [
            {
              label: "Weekly Earnings",
              // data: [120, 190, 300, 500, 200, 300, 700],
              data: totals,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(156, 165, 145, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(156, 165, 159, 1)",
              ],
              borderWidth: 1,
            },
            // {
            //   label: "Orders",
            //   data: [100, 104, 63, 509, 900, 50],
            //   backgroundColor: "orange",
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default ColumnChart;
