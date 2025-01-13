import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Main from './Section/Main';
import './App.css';
import Header from './Section/Header';
import Footer from './Section/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/me" element={<Main key={0} />} />
            <Route path="/" element={<Main key={1} />} />
            {/* Fallback route to redirect to the root path */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
