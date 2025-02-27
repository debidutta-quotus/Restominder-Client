import React from "react";
import Modal from "react-modal";
import "./ConfirmationModal.css"; // Import the CSS file

Modal.setAppElement("#root");

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="confirmation-modal-content"
      overlayClassName="confirmation-modal-overlay"
    >
      <div className="confirmation-modal-body">
        <p className="confirmation-modal-message">{message}</p>
        <div className="confirmation-modal-buttons">
          <button
            className="confirmation-modal-button confirmation-modal-confirm"
            onClick={() => {
              onConfirm();
              onRequestClose();
            }}
          >
            Yes
          </button>
          <button
            className="confirmation-modal-button confirmation-modal-cancel"
            onClick={() => {
              if (onCancel) onCancel();
              onRequestClose();
            }}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
