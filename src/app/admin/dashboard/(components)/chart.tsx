"use client"
import React, {useEffect} from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSettings = {
  yAxis: [
    {
      label: "Total XOF",
    },
  ],

  width: 800,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-40px, 0)",
    },
  },
};

// const valueFormatter = (value) => `${value}mm`;

export default function BarsDataset({ data }: any) {

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dataset = months.map((month) => {
  const monthlyData = {
    successfulDepositCount: 0,
    successfulWithdrawalCount: 0,
    month: month,
  };

  data?.forEach((user: any) => {
    if (user.isUser) {
      user.transactionHistory.forEach((transaction: any) => {
        const transactionMonth = new Date(
          transaction.registrationDateTime
        ).toLocaleString("en-US", {
          month: "short",
          year: "numeric",
          day: "2-digit",
        });

        if (
          transactionMonth.includes(month) &&
          transaction.status === "Successful"
        ) {
           
          if (transaction.fundingType === "deposits") {
            monthlyData.successfulDepositCount += transaction.amount;
          } else if (transaction.fundingType === "withdrawals") {
            monthlyData.successfulWithdrawalCount += transaction.amount;
          }
        }
      });
    }
  });

  console.log(monthlyData);
  return monthlyData;
});



  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "successfulDepositCount", label: "Total successful Deposits",  color: "rgba(101, 137, 0, 0.4)", marginRight: "10px" },
        { dataKey: "successfulWithdrawalCount", label: "Total successful Withdrawals",  color: "rgba(0, 118, 184, .4)" },
        // { dataKey: "newYork", label: "New York", valueFormatter },
        // { dataKey: "seoul", label: "Seoul", valueFormatter },
      ]}
      {...chartSettings}
    />
  );
}
