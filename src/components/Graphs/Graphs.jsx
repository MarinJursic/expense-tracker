import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Bar, Line } from "react-chartjs-2";

import useStyles from "./styles";
import useData from "./useData";

const DetailsCard = ({ title }) => {
  const { chartData } = useData(title);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  console.log(chartData);
  const classes = useStyles();

  return (
    <Card className={title === "bar" ? classes.bar : classes.line}>
      {title === "bar" ? <CardHeader title="Budget" /> : null}
      <CardContent>
        {title === "bar" ? (
          <Bar data={chartData} height={220} width={200} options={options} />
        ) : (
          <Line
            data={chartData}
            height={390}
            width={350}
            options={{ maintainAspectRatio: false }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
