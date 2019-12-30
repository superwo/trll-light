import React from 'react';

import Modal from './Modal';
import Button from './Button';

const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      show={!!error}
      headerClass='warning'
      footer={
        <Button classes='warning' onClick={onClear}>
          Okay
        </Button>
      }
    >
      <p>{error}</p>
    </Modal>
  );
};
export default ErrorModal;
