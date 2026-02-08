import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Password from './pages/Password';
import Timeline from './pages/Timeline';
import Timer from './pages/Timer';
import Game from './pages/Game';
import Music from './pages/Music';
import Question from './pages/Question';
import Celebration from './pages/Celebration';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/password" element={<Password />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/game" element={<Game />} />
        <Route path="/music" element={<Music />} />
        <Route path="/question" element={<Question />} />
        <Route path="/celebration" element={<Celebration />} />
      </Routes>
    </Router>
  );
}

export default App;
