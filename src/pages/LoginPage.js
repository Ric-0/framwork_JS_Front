import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Effectuez ici votre appel à l'API de connexion
    fetch('http://127.0.0.1:3000/user/connect?pseudo=' + pseudo + '&password=' + password, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {

      // Si la connexion réussit, appelez la fonction de connexion du contexte
      if (data) {
        const userData = { pseudo, id: data };
        login(userData);

        // Effectuez la redirection vers la page HomePage
        navigate('/');
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
    });
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo :</label>
          <input className="form-control" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p>
          Vous n'avez pas de compte ? <Link to="/create-account">Créer un compte</Link>
        </p>
        <button className="btn btn-primary" type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;