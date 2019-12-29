import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const CreateBoard = () => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#519839');
  return (
    <Modal
      headerClass='hidden'
      show={false}
      footer={<Button classes='btn-green'>Create Board</Button>}
    >
      <div style={{ display: 'flex' }}>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{
            flex: '1',
            padding: '8px',
            color: 'var(--color-grey)',
            fontSize: '16px'
          }}
          placeholder='Add board title'
        />
        <input
          type='color'
          style={{ height: '40px' }}
          onChange={e => setColor(e.target.value)}
          value={color}
        />
      </div>
    </Modal>
  );
};

export default CreateBoard;
