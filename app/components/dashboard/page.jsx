"use client";
import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import Image from "next/image";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/products");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const responseData = await res.json();

      setData(responseData);
      // Uncomment and implement setData function if needed
      // setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error as needed, such as displaying a message to the user
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="bg-[#e6e6fb] p-5 shadow-md text-center inline-block mb-5">
          <h1 className="text-[25px] font-bold">Welcome to Tech Product</h1>
          <p>The place to launch and discover new tech products.</p>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-[25px] text-white mb-5">
          Top Products Launching Today
        </h2>
        <hr />
      </div>
      <List
        // style={{
        //   border: "2px solid white",
        // }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
          // style={{
          //   margin: "5px",
          //   border: "2px solid white",
          // }}
          >
            <List.Item.Meta
              style={{
                backgroundColor: "#8f94fb",
                overflow: "auto",
                padding: "10px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // border: "2px solid red",
              }}
              avatar={<img alt="images" src={item.ImageURL} />}
              title={
                <a
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  href="https://ant.design"
                >
                  {item.Name}
                </a>
              }
              description={<p style={{ color: "white" }}>{item.Categories}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Dashboard;
