import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, cities} from '../constants'; 
import './index.css'


const TemperatureGame = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [guess, setGuess] = useState('');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const[answer, setAnswer] = useState('')


  useEffect(() => {
    fetchRandomCityTemperature();
  }, [round]);

  const fetchRandomCityTemperature = async () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    try {
      const response = await fetch(`${API_URL}${randomCity.name}&units=metric&appid=${API_KEY}`);
      const data = await response.json();
      
      if (data.cod === 200) {
        setCity(randomCity.name);
        setTemperature(data.main.temp);
      } else {
        console.error('Error while retrieving weather data:', data.message);
        fetchRandomCityTemperature();
      }
    } catch (error) {
      console.error( ' Error executing request:', error);
          }
  };

  const handleGuessSubmit = () => {
    if (guess === '') {
      setMessage('Please, enter your guess.');
      return;
    }
    
    const guessedTemperature = parseFloat(guess);
    if (Math.abs(guessedTemperature - temperature) <= 5) {
      setScore(score + 1);
      setMessage(`Right! The temperature  in ${city} approximately ${temperature.toFixed(1)} is °C.`);
      setAnswer('Right')
    } else {
      setMessage(`Wrong. The temperature  in ${city} ${temperature.toFixed(1)} is °C.`);
      setAnswer('Wrong')
    }
    
    if (round < 5) {
      setRound(round + 1);
    } else {
      setMessage(`Game over! You win ${score + (Math.abs(guessedTemperature - temperature) <= 5 ? 1 : 0)}/5.`);
      setAnswer('')
      setRound(1);
      setScore(0);
    }

    setGuess('');
  };

  return (
    <div  className="game-container">
      <h1>Guess the Temperature!</h1>
      <p>Round: {round}/5</p>
      <p>Guess the Temperature in the city: {city}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="See your guess"
      />
      <button onClick={handleGuessSubmit}>Send</button>
      <p className={answer}>{message}</p>
    </div>
  );
};

export default TemperatureGame;

