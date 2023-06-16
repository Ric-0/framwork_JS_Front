import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import ModalAddCategory from '../components/ModalAddCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalAddExpense from '../components/ModalAddExpense';
import ExpenseTab from '../components/ExpenseTab';
import Distribution from '../components/Distribution';

const HomePage = () => {
  const { userData } = useContext(AuthContext); // Récupération des données utilisateur à partir du contexte d'authentification
  const [isModalCatOpen, setModalCatOpen] = useState(false); // État pour la modale d'ajout de catégorie
  const [isModalExpOpen, setModalExpOpen] = useState(false); // État pour la modale d'ajout de dépense

  const openModalCat = () => { // Fonction pour ouvrir la modale d'ajout de catégorie
    setModalCatOpen(true);
  };

  const closeModalCat = () => { // Fonction pour fermer la modale d'ajout de catégorie
    setModalCatOpen(false);
  };

  const handleSubmitCat = (value) => { // Fonction pour soumettre le formulaire d'ajout de catégorie
    fetch('http://127.0.0.1:3000/category/create', { // Requête HTTP POST vers l'API pour enregistrer la nouvelle catégorie
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

  const openModalExp = () => { // Fonction pour ouvrir la modale d'ajout de dépense
    setModalExpOpen(true);
  };

  const closeModalExp = () => { // Fonction pour fermer la modale d'ajout de dépense
    setModalExpOpen(false);
  };

  const handleSubmitExp = (value) => { // Fonction pour soumettre le formulaire d'ajout de dépense
    let body = {
      libelle: value.libelle,
      montant: value.montant,
      id_categorie: value.categorie.id,
      id_payeur: userData.id
    }
    fetch('http://127.0.0.1:3000/expense/create', { // Requête HTTP POST vers l'API pour enregistrer la nouvelle dépense
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
        fetch('http://127.0.0.1:3000/expense/participation', { // Requête HTTP POST vers l'API pour enregistrer la participation à la dépense
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
      {userData ? (
        <div>
          <div>
            <button className="btn btn-primary" onClick={openModalCat}>Ajouter une catégorie</button> {/* Bouton pour ouvrir la modale d'ajout de catégorie */}
            <ModalAddCategory
              isOpen={isModalCatOpen}
              onClose={closeModalCat}
              onSubmit={handleSubmitCat}
            />
            <button className="btn btn-primary" onClick={openModalExp}>Ajouter une dépense</button> {/* Bouton pour ouvrir la modale d'ajout de dépense */}
            <ModalAddExpense
              isOpen={isModalExpOpen}
              onClose={closeModalExp}
              onSubmit={handleSubmitExp}
            />
          </div>
          <ExpenseTab /> {/* Composant du tableau des dépenses */}
          <Distribution /> {/* Composant de la répartition */}
        </div>
      ) : (
        <div>
          <p>Veuillez vous connecter pour accéder à plus d'informations.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;