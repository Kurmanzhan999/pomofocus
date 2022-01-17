import Header from './components/Header/Header';
import './App.css'
import Timer from './components/Timer/Timer/Timer'
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
  
function App() {
  const bodyColor = useSelector(state => state.timer.currentTime.bodyColor)
  const bgcolorRef = useRef('437EA8')
  useEffect(() => bgcolorRef.current.style.backgroundColor = bodyColor,[bodyColor])

  return (
    <>
    <div ref={bgcolorRef} className='app'>
    <Header/>
     <div>
      <Timer/>
      </div>
    </div>
    </>
  );
}

export default App;
