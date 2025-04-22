import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Chart = ({ transtion }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (transtion.length > 0) {
      const monthlyRevenue = {};
      for (let i = 1; i <= 12; i++) {
        monthlyRevenue[i] = 0; // Khởi tạo doanh thu cho tất cả 12 tháng là 0
      }

      transtion.forEach((item) => {
        const parts = item.timestamp.split(/[/ :]/);
        const month = parseInt(parts[1], 10);
        const amount = item.amount;

        if (monthlyRevenue[month]) {
          monthlyRevenue[month] += amount;
        } else {
          monthlyRevenue[month] = amount;
        }
      });

      // Chuyển đổi object monthlyRevenue thành mảng dữ liệu cho biểu đồ
      const chartDataArray = Object.keys(monthlyRevenue)
        .sort((a, b) => parseInt(a) - parseInt(b)) // Sắp xếp theo tháng
        .map((month) => ({
          month: `Tháng ${month}`,
          revenue: monthlyRevenue[month],
        }));

      setChartData(chartDataArray);
    } else {
      // Nếu không có dữ liệu giao dịch, hiển thị 12 tháng với doanh thu 0
      const initialChartData = Array.from({ length: 12 }, (_, index) => ({
        month: `Tháng ${index + 1}`,
        revenue: 0,
      }));
      setChartData(initialChartData);
    }
  }, [transtion]);

  const formatVND = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  //   useEffect(() => {
  //     console.log("Dữ liệu biểu đồ:", chartData);
  //   }, [chartData]);

  return (
    <BarChart
      width={1400}
      height={400}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis tickFormatter={formatVND} />
      <Tooltip formatter={(value) => formatVND(value)} />
      <Legend />
      <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" />
    </BarChart>
  );
};
