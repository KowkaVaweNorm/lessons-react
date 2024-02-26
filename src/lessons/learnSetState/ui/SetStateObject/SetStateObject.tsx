import { useState } from "react";

export const SetStateObject = () =>{
  const [data, setData] = useState({ value: 0 });

  const handleClick = () => {
    // Передача ссылочного типа данных напрямую
    data.value = Math.random();
    setData(data);
  };

  return (
    <div>
      <p>Value: {data.value}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}