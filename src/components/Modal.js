import React from 'react';
import Modal from 'react-modal';

const VehicleModal = ({ isOpen, closeModal, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Vehicle Modal"
    >
      <img src={data.images} alt="Vehicle" className="max-w-200 max-h-200 mx-auto block"  />
      <h2>{data.make} {data.model}</h2>
      <p>Price: {data.price}</p>
      <p>Year: {data.year}</p>
      <p>Mileage: {data.mileage}</p>
      <p>Status: {data.status}</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-center" onClick={closeModal}>Close Modal</button>
    </Modal>
  );
};

    const customStyles = {
        content: {
          top: '50%',      
          left: '50%',   
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',  
          width: '400px', 
          maxHeight: '160vh', 
          border: '1px solid #ccc', 
          borderRadius: '4px',       
          padding: '20px',          
          backgroundColor: 'white', 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',  
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        },
      };
      

export default VehicleModal;
