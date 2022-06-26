import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ListContent.css";

export default function ListContent(props) {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);

  const [checkList, setCheckList] = useState(["Apple", "Banana", "Tea", "Coffee"]);


  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          { props.cookieListProp != undefined ?

          (props.cookieListProp).map((item, index) => (
            <div key={index}>
              <input value={item.domain} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item.domain)}>{item.domain}</span>
            </div>
          )
          )
          :
          null
          }
        </div>
      </div>
      <button type="button" onClick={() => {console.log(props)}}> Read Props </button> 
      <div>
        {`Items checked are: ${checkedItems}`}
      </div>
    </div>

  );
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<ListContent />, rootElement);