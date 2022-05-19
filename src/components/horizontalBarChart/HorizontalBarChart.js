import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
function HorizontalBarChart(props) {
  const { vertical, horizontal, type } = props;
  const [label, setLabel] = useState("Earnings");
  useEffect(() => {
    if (type === "bestSeller") setLabel("Quantity");
  }, setLabel);
  return (
    <div>
      <Bar
        data={{
          labels: vertical,
          datasets: [
            {
              label: label,
              data: horizontal,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={500}
        width={900}
        options={{
          maintainAspectRatio: false,
          indexAxis: "y",
        }}
      />
     
    </div>
  );
}

export default HorizontalBarChart;
