import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPiechart = (props) => {
  const cat1 = props.products.filter(
    (product) => product.category === "electronics"
  );
  const cat2 = props.products.filter(
    (product) => product.category === "jewelery"
  );
  const cat3 = props.products.filter(
    (product) => product.category === "men's clothing"
  );
  const cat4 = props.products.filter(
    (product) => product.category === "women's clothing"
  );

  const data = {
    labels: ["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"],
    datasets: [
      {
        label: "# of items in all Categories",
        data: [cat1.length, cat2.length, cat3.length, cat4.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      class="chart-container"
      style={{ position: "relative", height: "60vh" }}
    >
      <Pie data={data} />
    </div>
  );
};

export default CategoryPiechart;
