import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Join from './Components/join/Join';
import Chat from './Components/chat/Chat';


function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        {/* <Route path="/" element={<Join/>} /> */}
        <Route path="/" Component={Join} />
        <Route path="/chat" Component={Chat}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
