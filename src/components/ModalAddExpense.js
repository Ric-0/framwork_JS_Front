import React, { useState } from 'react';
import Select from 'react-select';

const ModalAddExpense = ({ isOpen, onClose, onSubmit }) => {
  const [libelle, setLibelle] = useState(''); // État pour stocker la valeur du champ de texte "Libellé"
  const [montant, setMontant] = useState(0.01); // État pour stocker la valeur du champ de texte "Montant"
  const [idParticipants, setIdParticipants] = useState([]); // État pour stocker les IDs des participants sélectionnés
  const [categorie, setCategorie] = useState(''); // État pour stocker la catégorie sélectionnée
  const [selectedParticipants, setSelectedParticipants] = useState([]); // État pour stocker les participants sélectionnés (options de la liste déroulante)

  // Effectuer une requête HTTP GET vers l'API pour obtenir toutes les utilisateurs
  fetch('http://127.0.0.1:3000/user/getAll', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    // Si la connexion réussit, mettez à jour la liste des utilisateurs
    if (data) {
      const users = data.map(user => ({ id: user.id, value: user.pseudo }));
      setListeUtilisateur(users);
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });

  // Chargement des catégories depuis l'API
  fetch('http://127.0.0.1:3000/category/getAll', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    // Si la connexion réussit, mettez à jour la liste des catégories
    if (data) {
      const categories = data.map(category => ({ id: category.id, value: category.libelle }));
      setListeCategorie(categories);
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });

  const [listeUtilisateur, setListeUtilisateur] = useState([]); // État pour stocker la liste des utilisateurs
  const [listeCategorie, setListeCategorie] = useState([]); // État pour stocker la liste des catégories

  // Gestion du changement des participants sélectionnés
  const handleParticipantChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.id);
    setIdParticipants(selectedIds);
  };

  // Gestion du changement de la catégorie sélectionnée
  const handleCategorieChange = (selectedOptions) => {
    setCategorie(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ libelle, montant, idParticipants, categorie });
    setLibelle('');
    setMontant(0.01);
    setIdParticipants([]);
    setCategorie('');
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter une dépense</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Libellé :</label>
                <input
                  type="text"
                  className="form-control"
                  value={libelle}
                  onChange={(e) => setLibelle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Montant :</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className="form-control"
                  value={montant}
                  onChange={(e) => setMontant(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Participants :</label>
                <Select
                  isMulti
                  required
                  value={selectedParticipants}
                  options={listeUtilisateur}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleParticipantChange}
                  formatOptionLabel={({ value }) => <div>{value}</div>}
                />
              </div>
              <div className="form-group">
                <label>Catégorie :</label>
                <Select
                  required
                  value={categorie}
                  options={listeCategorie}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleCategorieChange}
                  formatOptionLabel={({ value }) => <div>{value}</div>}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddExpense;
