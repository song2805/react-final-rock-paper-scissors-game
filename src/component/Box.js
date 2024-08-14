import React from 'react'

const Box = (props) => {

console.log("props is : ", props)
let result;
if(props.title === "Computer" && props.result !== "Tie" && props.result !== "") {
  result = props.result === "Win" ? "Lose" : "Win";
}else{
  result = props.result;
}

  return (
    <div className={ `box ${result}` }>
      <h1 className="word">{props.title}</h1>
      <img className="item-img" src={props.item && props.item.img}  alt="" />
      <h2 className="text-result">{result}</h2>
    </div>
  )
}

export default Box
