import React, { useState } from 'react';
import Select from 'react-select';

const ModalAddExpense = ({ isOpen, onClose, onSubmit }) => {
  const [libelle, setLibelle] = useState('');
  const [montant, setMontant] = useState(0.01);
  const [idParticipants, setIdParticipants] = useState([]);
  const [categorie, setCategorie] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  fetch('http://127.0.0.1:3000/user/getAll', {
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
        for (let i = 0; i < data.length; i++) {
            listeUtilisateur.push({id: data[i].id, value: data[i].pseudo})
        }
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });

  fetch('http://127.0.0.1:3000/category/getAll', {
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
        for (let i = 0; i < data.length; i++) {
            listeCategorie.push({id: data[i].id, value: data[i].libelle})
        }
    }
  })
  .catch(error => {
    console.error('Erreur lors de l\'appel à l\'API :', error);
  });

  const listeUtilisateur = []
  const listeCategorie = [];

  const handleParticipantChange = (selectedOptions) => {
    setSelectedParticipants(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.id);
    setIdParticipants(selectedIds);
  };

  const handleCategorieChange = (selectedOptions) => {
    setCategorie(selectedOptions)
  }

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
                <label>Participant :</label>
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
