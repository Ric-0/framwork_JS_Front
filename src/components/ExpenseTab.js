import React, { useState } from 'react';

const ExpenseTab = () => {
  const [expenses, setExpenses] = useState([]);// État pour stocker les dépenses

  // Effectuer une requête HTTP GET vers l'API pour obtenir toutes les dépenses
  fetch('http://127.0.0.1:3000/expense/getAll', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    setExpenses(data); // Mettre à jour l'état des dépenses avec les données reçues de l'API
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Libelle</th>
          <th scope="col">Montant</th>
          <th scope="col">Nom</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Participants</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.libelle}</td>
            <td>{expense.montant}</td>
            <td>{expense.pseudo}</td>
            <td>{expense.libelle_categorie}</td>
            <td>{expense.participants}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTab;
