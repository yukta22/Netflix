import React, { useState } from "react";
import Front_page from "./Front_page";
import Front_page_navbar from "./Front_page_navbar";

const All_Front_page = () => {
  return (
    <>
      <div className="front_page h-full">
        <Front_page_navbar />
        <Front_page />
      </div>
    </>
  );
};

export default All_Front_page;
