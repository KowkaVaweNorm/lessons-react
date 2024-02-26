import { useCallback, useState } from "react"

export const Counter = () =>{
  const [count, setCount] = useState(0);
  const handleClick = () =>{
    setCount(count + 1);
    console.log('Count:', count); // Здесь значение до увелечения
  }
  return (<>
  <span>{count}</span>
  <button onClick={handleClick}>Increment</button>
  </>
  )
}