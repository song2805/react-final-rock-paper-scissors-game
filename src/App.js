
import { useState } from 'react';
import './App.css';
import Box from "./component/Box"

//1. Box 2 개 (타이틀,사진,결과)
//2. 가위 바위 보 버튼이 있다
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//3-1. 사진과 이름을 가지고있는 object(객체)를 만들자!
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3 과 4 번째의 결과를 가지고 누가 이겼는지 승패를 따진다.
//6. 승패 결과에 따라 테두리 색이 바뀐다(이기면: 초록, 지면: 빨강, 비기면: 검정)


//3-1. 사진 이름 object


const choice = {
  rock: {
    name: "Rock",
    img: "./img/color-rock.png"
  },
  scissors: {
    name: "Scissors",
    img: "./img/color-scissors.png"
  },
  paper: {
    name: "Paper",
    img: "./img/color-paper.png"
  }
};

function App() {
  // user
  const [userSelect, setUserSelect] = useState(null);
  // computer
  const [computerSelect, setComputerSelect] = useState(null);
  // 성패를 보여주는 state
  const [result, setResult] = useState("");
  //score
  const [yourScore, setYourScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const play = (userChoice) => {
    console.log("선택됨!", userChoice);
    // setUserSelect 변수를 바꿔줄 setUserSelect() 함수를 써야한다.
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice)
    setResult(judgement(choice[userChoice], computerChoice));

    setTotalCount(totalCount + 1);

    // Score
    if (judgement(choice[userChoice], computerChoice) == "Win") {
      setYourScore(yourScore + 1);
    } else if (judgement(choice[userChoice], computerChoice) == "Lose") {
      setComputerScore(computerScore + 1);
    }
  };

  const judgement = (user, computer) => {
    console.log("user : ", user, "computer :", computer);

    // user === computer tie
    // user = "Rock", computer = "Scissors" user Win
    // user = "Rock", computer = "Paper" user Lose
    // user = "scissors", computer = "paper" user Win
    // user = "scissors", computer = "rock" user Lose
    // user = "paper", computer ="rock" user Win
    // user = "paper", computer = "scissors" user Lose

    if (user.name === computer.name) {
      return "Tie"
    } else if (user.name === "Rock")

      return computer.name === "Scissors" ? "Win" : "Lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "Win" : "Lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "Win" : "Lose";

  };


  const randomChoice = () => {
    let itemArray = Object.keys(choice); //Object.keys() 객체에 키값만 뽑아서 array로 만들어주는 함수이다.
    console.log("item array", itemArray)
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random : ", randomItem);
    let final = itemArray[randomItem];
    return choice[final];

  }

  const reset = () => {
    setYourScore(0);
    setComputerScore(0);
    setTotalCount(0);
    setUserSelect(null);
    setComputerSelect(null);
    setResult("");
  }


  return (
    <div>

      <div className='main'>
        <div className='score'>
          <div><h1>{yourScore}</h1></div>
          
          <div className="title-img">
            <img className="cursor-pointer reset-img" src="./img/color-rock-paper-scissors.png" onClick={() => reset()} /><span onClick={() => reset()}>Reset</span>
          </div>
          <div><h1>{computerScore}</h1></div>
          
        </div>
      </div>

      <div className="main" >
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>
      <div className="main main2">
        {/* 3. 버튼을 클릭하면 클릭한 값이 박스에 보임, 무엇을 선택했는지 알게하는 매개변수를 {play()} 에다 넣어준다.  play 함수에다 (userChoice)라는 매개변수이름을 준다. */}
        {/* play("매개변수") 하면 함수를 그냥 실행시켜버린답니다. 그래서 콜백함수를 줘야한다. 어떻게?  { () => play("scissors") 이렇케 해준다.*/}
        <button className="cursor-pointer rps-a" onClick={() => play("scissors")}><img className="rock-paper-scissors" src="./img/scissors.png" /></button>
        <button className="cursor-pointer rps-b" onClick={() => play("rock")}><img className="rock-paper-scissors" src="./img/rock.png" /></button>
        <button className="cursor-pointer rps-c" onClick={() => play("paper")}><img className="rock-paper-scissors" src="./img/paper.png" /></button>
      </div>
      <div className='main text-total'>Total Game : {totalCount}</div>
    </div>

  );
}

export default App;
