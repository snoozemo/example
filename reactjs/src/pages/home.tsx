import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="mt-5 rounded">
        <p>This is state count</p>
        <p className="mt-3 flex justify-around text-xl">
          <button onClick={() => setCount(count + 1)}>+</button>
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>o</button>
        </p>
        <p className="mt-3 text-center text-3xl">{count}</p>
      </div>
    </div>
  );
}
