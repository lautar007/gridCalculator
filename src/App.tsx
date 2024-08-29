import { useState } from 'react'
import "./index.css"

interface Operation {
  valueA : string,
  valueB: string,
  operator: "" |"+" | "-" | "x" | "/" | "%" | "**"
}

function App() {

  const [operation, setOperation] = useState<Operation>({
    valueA: "",
    valueB: "",
    operator: "" 
  });
  const[currentValue, setCurrentValue] = useState<string>("A");
  const[result, setResult] = useState<boolean>(false);


  function handleKeys(event: any){
    if(event.target.role === "restart"){
      setOperation({
        valueA: "",
        valueB: "",
        operator:""
      });
      setCurrentValue("A");
      setResult(false);
      return
    }

    if(event.target.role === "answer"){
      currentValue === "A" ? 
      setOperation(
        {
          ...operation,
          valueA: localStorage.getItem("ans") || "0"
        }
      )
      :
      setOperation(
        {
          ...operation,
          valueB: localStorage.getItem("ans") || "0"
        }
      )
      return
    }

    if(event.target.role === "number" && !operation.operator && !result){
      setOperation({
        ...operation,
        valueA: operation.valueA + event.target.innerText
      });
    }else if(event.target.role === "operator" && !result){
      setOperation({
        ...operation,
        operator: event.target.innerText
      });
      setCurrentValue("B");
    } else if (!result) {
      setOperation({
        ...operation,
        valueB: operation.valueB + event.target.innerText
      });
    };
  };

  function handleOperationsLogic(operator:string){
    console.log(operator)
    let numA: number = parseFloat(operation.valueA);
    let numB: number = parseFloat(operation.valueB); 

    switch (operator) {
      case "+":
        return numA + numB;
      
      case "-":
        return numA - numB;
      
      case "*":
        return numA * numB;

      case "/":
        return numA / numB;

      case "^":
        return numA ** numB;

      case "%":
        return (numA * numB) /100;

      default: return 0;
    }
  }


  function handleDisplay(){
    console.table(operation);
    console.log(currentValue);
    if(!result){
      if(currentValue === "A"){
        return operation.valueA;
      } else if(currentValue === "B" && !operation.valueB){
        return 0
      } else if(currentValue === "B"){
        return operation.valueB;
      } else return 0
    }else{
      let result: number = handleOperationsLogic(operation.operator);
      localStorage.setItem("ans", result.toString())
      return result;
    }
  }

  return (
    <div className='calc-content'>
      <div className='display'>
        <div className='operationView'>{operation.valueA + " " + operation.operator + " " + operation.valueB}</div>
        <div>{handleDisplay()}</div>
      </div>

      <p role="restart" onClick={handleKeys}>C</p>
      <p role='operator' onClick={handleKeys}>^</p>
      <p role='operator' onClick={handleKeys}>%</p>
      <p role='operator' onClick={handleKeys}>/</p>

      <p role='number' onClick={handleKeys}>7</p>
      <p role='number' onClick={handleKeys}>8</p>
      <p role='number' onClick={handleKeys}>9</p>
      <p role='operator' onClick={handleKeys}>*</p>

      <p role='number' onClick={handleKeys}>4</p>
      <p role='number' onClick={handleKeys}>5</p>
      <p role='number' onClick={handleKeys}>6</p>
      <p role='operator' onClick={handleKeys}>-</p>

      <p role='number' onClick={handleKeys}>1</p>
      <p role='number' onClick={handleKeys}>2</p>
      <p role='number' onClick={handleKeys}>3</p>
      <p role='operator' onClick={handleKeys}>+</p>

      <p role='answer' onClick={handleKeys}>ANS</p>
      <p role='number' onClick={handleKeys}>0</p>
      <p role='number' onClick={handleKeys}>.</p>
      <p onClick={()=>setResult(true)}>=</p>
    </div>
  )
}

export default App
