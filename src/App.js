import Header from './Components/Header/Header';
import './App.css';
import Timer from './Components/Timer/Timer/Timer';
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
