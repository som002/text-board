import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import { useState } from 'react';
import Alert from './components/Alert';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const debTimeout = ((delay = 2) => {
  let timeout;
  return (cb) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb();
    }, delay * 1000);
  };
})(3);

function App() {
  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);
  function showAlert(message, type) {
    setAlert({
      msg: message,
      type: type,
    });
    debTimeout(() => {
      setAlert(null);
    });
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor = '#4a4a6c';
      showAlert('Dark mode enabled', 'success');
      return;
    }
    setmode('light');
    document.body.style.backgroundColor = '#f0f0f0c9';
    showAlert('Dark mode disabled', 'info');
  };

  return (
    <>
      <Router>
        <Navbar title="textFormatter" about="About textFormatter" mode={mode} toggleMode={toggleMode} />
        <div className="container my-3 position-relative">
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/text-board"
              element={<TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
