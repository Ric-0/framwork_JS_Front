import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import ModalAddCategory from '../components/ModalAddCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddExpense from '../components/ModalAddExpense';
import ExpenseTab from '../components/ExpenseTab';
import Distribution from '../components/Distribution';

const HomePage = () => {
  const { userData } = useContext(AuthContext);
  const [isModalCatOpen, setModalCatOpen] = useState(false);
  const [isModalExpOpen, setModalExpOpen] = useState(false);

  const openModalCat = () => {
    setModalCatOpen(true);
  };

  const closeModalCat = () => {
    setModalCatOpen(false);
  };

  const handleSubmitCat = (value) => {
    fetch('http://127.0.0.1:3000/category/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({libelle: value})
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
    });
  };

  const openModalExp = () => {
    setModalExpOpen(true);
  };

  const closeModalExp = () => {
    setModalExpOpen(false);
  };

  const handleSubmitExp = (value) => {
    let body = {
      libelle: value.libelle,
      montant: value.montant,
      id_categorie: value.categorie.id,
      id_payeur: userData.id
    }
    fetch('http://127.0.0.1:3000/expense/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < value.idParticipants.length; i++) {
        const idParticipant = value.idParticipants[i];
        fetch('http://127.0.0.1:3000/expense/participation', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({id_depense: data.insertId, id_utilisateur: idParticipant})
        })
        .then(response => response.json())
        .then(data => {
  
        })
        .catch(error => {
          console.error('Erreur lors de l\'appel à l\'API :', error);
        });
      }
    })
    .catch(error => {
      console.error('Erreur lors de l\'appel à l\'API :', error);
    });
  };

  return (
    <div className="container">
      <h1>Accueil</h1>
      {userData && (
        <div>
          <div>
            <button className="btn btn-primary" onClick={openModalCat}>Ajouter une catégorie</button>
            <ModalAddCategory
              isOpen={isModalCatOpen}
              onClose={closeModalCat}
              onSubmit={handleSubmitCat}
            />
            <button className="btn btn-primary" onClick={openModalExp}>Ajouter une dépense</button>
            <ModalAddExpense
              isOpen={isModalExpOpen}
              onClose={closeModalExp}
              onSubmit={handleSubmitExp}
            />
          </div>
          <ExpenseTab />
          <Distribution />
        </div>
      )}
    </div>
  );
};

export default HomePage;
