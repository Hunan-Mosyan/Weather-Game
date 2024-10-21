// src/App.js
import React from 'react';
import './App.css'; // Подключение стилей, если они есть
import TemperatureGame from './TemperatureGame'; // Импорт вашего игрового компонента

function App() {
  return (
    <div className="App">
      <TemperatureGame /> {/* Отображение компонента игры */}
    </div>
  );
}

export default App;

