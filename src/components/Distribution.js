import React, { useState } from 'react';

const Distribution = () => {

    const [debts, setDebts] = useState([]);

    fetch('http://127.0.0.1:3000/expense/distribution', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        setDebts(data)
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
    });
  
    return (
        <div>
            <h1>Récapitulatif des dettes</h1>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                    <th>Débiteur</th>
                    <th>Créancier</th>
                    <th>Montant dû</th>
                    </tr>
                </thead>
                <tbody>
                    {debts.map((debt, index) => (
                    <tr key={index}>
                        <td className="table-primary">{debt.utilisateur_debiteur}</td>
                        <td className="table-primary">{debt.utilisateur_crediteur}</td>
                        <td className="table-success">{debt.montant_du}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  };
  export default Distribution