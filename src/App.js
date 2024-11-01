import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import mhmeat from "./images/mhmeat.png";

function App() {
  const [monster, setMonter] = useState("");
  const [monsterData, setMonsterData] = useState([]);

  const ENDPOINT = "https://mhw-db.com/monsters";

  // this is a simple axios get request to the endpoint which returns all the monsters
  useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((res) => {
        setMonsterData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //

  // defined functions to get monster by id
  async function getMonster(id) {
    try {
      const res = await axios.get(`${ENDPOINT}/${id}`);
      setMonsterData([res.data]);
      setMonter("");
    } catch (err) {
      console.log(err);
    }
  }

  // function to get all monsters
  async function getAllMonsters() {
    try {
      const res = await axios.get(ENDPOINT);
      setMonsterData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <img src={mhmeat} alt="Monster Hunter Meat" />
        <h1>API Demo</h1>
      </div>
      <div>
        <input
          type="number"
          value={monster}
          onChange={(e) => setMonter(e.target.value)}
          placeholder="Enter Monster ID"
        />
        <button
          onClick={() => getMonster(monster)}
        >
          Get Monster by ID
        </button>
        <button onClick={getAllMonsters}>Get All Monsters</button>
        <pre>{JSON.stringify(monsterData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
