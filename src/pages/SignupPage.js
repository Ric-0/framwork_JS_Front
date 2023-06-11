import React, { useState } from 'react';

const SignupPage = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let body = { pseudo: pseudo, password: password }
      fetch('http://127.0.0.1:3000/user/create', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Erreur lors de l\'appel à l\'API :', error);
      });
    } else {
      alert('Les mots de passe ne correspondent pas')
    }
    // Effectuez ici la logique de création de compte, par exemple en envoyant les données au serveur
  };

  return (
    <div className="container">
      <h2>Création de compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo :</label>
          <input className="form-control" type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe :</label>
          <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Créer le compte</button>
      </form>
    </div>
  );
};

export default SignupPage;