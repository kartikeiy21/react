import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LibraryApp from './LibraryApp';
import InheritanceApp from './InheritanceApp';
import ProductApp from './ProductApp';

function App() {
  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <h2 className="navbar-title">React Apps</h2>
        <ul className="nav-links">
          <li><Link to="/library" className="nav-link"> Library</Link></li>
          <li><Link to="/inheritance" className="nav-link"> Inheritance</Link></li>
          <li><Link to="/products" className="nav-link"> Products</Link></li>
        </ul>
      </nav>

      <div className="routes-container">
        <Routes>
          <Route path="/library" element={<LibraryApp />} />
          <Route path="/inheritance" element={<InheritanceApp />} />
          <Route path="/products" element={<ProductApp />} />
          <Route path="/" element={<LibraryApp />} />
        </Routes>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .navbar {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 14px;
          padding: 22px 35px;
          margin-bottom: 32px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-title {
          color: #7e1515;
          font-size: 1.9em;
          margin: 0;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 24px;
        }

        .nav-link {
          text-decoration: none;
          color: #0c0c0c;
          font-weight: 650;
          font-size: 1.05em;
          padding: 12px 24px;
          border-radius: 9px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid #667eea;
          display: inline-block;
        }

        .nav-link:hover {
          background-color: #667eea;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.35);
          border-color: #667eea;
        }

        .routes-container {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            gap: 18px;
            text-align: center;
            padding: 18px 25px;
          }

          .nav-links {
            flex-direction: row;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }

          .nav-link {
            padding: 10px 16px;
            font-size: 0.95em;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
