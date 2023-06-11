import React from 'react';

function Navigation() {
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="collapse navbar-collapse w-100 justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Accueil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/account">Compte</a>
            </li>
          </ul>
        </div>
      </nav>
    );
}
  
export default Navigation;