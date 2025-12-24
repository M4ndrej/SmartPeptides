"use client";

import { useState } from "react";

const Test = () => {
  const [num, setNum] = useState([1]);

  const handleAdd = () => {
    setNum([...num, 2]);
  };

  const handleRemove = () => {
    const newNum = num.slice(0, -1);
    setNum(newNum);
  };

  return (
    <div>
      <div onClick={handleAdd}>Add</div>
      <div onClick={handleRemove}>Remove</div>
      {num.map((item, index) => (
        <div key={index} className="test_scroll">
          dsfafasds
          <p>Hello</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
