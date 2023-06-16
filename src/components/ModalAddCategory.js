import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalAddCategory = ({ isOpen, onClose, onSubmit }) => {
  const [textValue, setTextValue] = useState(''); // État pour stocker la valeur du champ de texte

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(textValue); // Appeler la fonction de soumission avec la valeur du champ de texte
    setTextValue(''); // Réinitialiser la valeur du champ de texte à une chaîne vide
    onClose(); // Appeler la fonction de fermeture du modal
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ajouter une catégorie</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="textValue">Nom de la catégorie :</label>
                <input
                  id="textValue"
                  className="form-control"
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)} // Mettre à jour la valeur du champ de texte lorsqu'il y a un changement
                />
              </div>
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCategory;
