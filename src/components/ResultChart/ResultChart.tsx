import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface IResultChartProps {
  chartData: {
    correctAnswers: number;
    wrongAnswers: number;
  };
}

const ResultChart: FC<IResultChartProps> = ({ chartData }): JSX.Element => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Correct", "Wrong"],
    datasets: [
      {
        label: "# of Votes",
        data: [chartData.correctAnswers, chartData.wrongAnswers],
        backgroundColor: ["rgb(103,198,185)", "rgb(243,112,91)"],
        borderColor: ["rgb(103,198,185)", "rgb(243,112,91)"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default ResultChart;
