import Header from './component/header/Header';
import './App.css';
import Timer from './component/timers/timer/Timer';
import { useSelector } from 'react-redux';

function App() {
  const bodyColor = useSelector((state) => state.timer.currentTime.bodyColor);
  return (
    <div style={{ backgroundColor: bodyColor }} className="app">
      <Header />
      <Timer />
    </div>
  );
}

export default App;
