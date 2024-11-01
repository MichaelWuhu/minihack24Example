import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import mhmeat from "./images/mhmeat.png";
import Card from "./components/card";


function App() {
  const [monsterId, setMonterId] = useState("");
  const [monsterData, setMonsterData] = useState([]);

  const ENDPOINT = "https://mhw-db.com/monsters";

  // useEffect to get all monsters on page load
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
  // now we have the data from the API

  // defined functions to get monster by id
  async function getMonster(id) {
    try {
      const res = await axios.get(`${ENDPOINT}/${id}`); // what is the ENDPOINT? --> mhw-db.com/monsters/:id
      setMonsterData([res.data]);
    } catch (err) {
      console.log(err);
    }
  }

  // function to get all monsters
  async function getAllMonsters() {
    try {
      const res = await axios.get(ENDPOINT); // ENDPOINT is mhw-db.com/monsters
      setMonsterData(res.data);
      setMonterId("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <img src={mhmeat} alt="" />
        <h1>API Demo</h1>
      </div>
      <div>
        {/* user inputs */}
        <input
          type="number"
          value={monsterId}
          onChange={(e) => setMonterId(e.target.value)}
          placeholder="Enter Monster ID"
        />
        <button onClick={()=>getMonster(monsterId)}>Get Monster by ID</button>
        <button onClick={() => getAllMonsters()}>Get All Monsters</button>

        {/* This displays the data on our screen */}
        <pre>{JSON.stringify(monsterData, null, 2)}</pre>

        {monsterId==="" ? (
          <div></div>
        ) : (
          <div>
            <h2>How can we actually use the data though?</h2>
            {/* Display the data in a card */}
            <div className="card-container">
              {monsterData.map((monster) => (
                <Card
                  key={monster.id}
                  name={monster.name}
                  type={monster.type}
                  species={monster.species}
                  description={monster.description}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
