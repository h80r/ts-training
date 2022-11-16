import { useState, useEffect } from "react";
import data from "../data";
import "./App.css";

// Solving Q1 by first sorting and then filtering
const sortedData = data
  .sort((a, b) => a.last_name.localeCompare(b.last_name))
  .reverse();
const filteredData = sortedData.filter((_, i) => (i + 1) % 3 !== 0);

// Solving Q3 by memoizing fib
const fibDict: { [id: number]: number } = { 0: 0, 1: 1 };

function App() {
  // Solving Q2 by using useState and useEffect with Interval
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(filteredData[index].timeout);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [timer]);

  useEffect(() => {
    if (timer >= 0) return;

    setIndex((prev) => (prev + 1) % filteredData.length);
  }, [timer]);

  useEffect(() => {
    setTimer(filteredData[index].timeout);
  }, [index]);

  const currentPerson = filteredData[index];

  // Solving Q3
  const [num, setNum] = useState(0);
  const [fib, setFib] = useState(0);

  const fibNum = (n: number) => {
    if (n in fibDict) return fibDict[n];
    if (n < 0) return 0;
    fibDict[n] = fibNum(n - 1) + fibNum(n - 2);
    return fibDict[n];
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {currentPerson.name} {currentPerson.last_name}
        </p>
        <input
          type="number"
          onChange={(e) => setNum(Number(e.currentTarget.value))}
        />
        <button onClick={() => setFib(fibNum(num))}>Calculate</button>
        <p>{fib}</p>
      </header>
    </div>
  );
}

export default App;
