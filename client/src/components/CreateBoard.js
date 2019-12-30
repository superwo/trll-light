import React, { useState, useContext } from 'react';
import Modal from './Modal';
import Button from './Button';
import { UserContext } from '../contexts/userContext';
import { useHttpClient } from '../hooks/useHttp';
import { BOARDS_SERVER } from '../services/misc';
import LoadingSpinner from './LoadingSpinner';

const CreateBoard = ({ show, toggleVisibility }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#519839');
  const { token } = useContext(UserContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const boardSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        BOARDS_SERVER,
        'POST',
        JSON.stringify({
          name: title ? title : 'New Board',
          description: description,
          category: 'personal',
          color: color
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      );
      setTitle('');
      setDescription('');
      toggleVisibility(false);
    } catch (err) {
      setTimeout(clearError, 3000);
    }
  };

  return (
    <Modal
      headerClass='hidden'
      show={show}
      footer={
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <Button type='submit' classes='btn-green'>
            Create Board
          </Button>
        )
      }
      onSubmit={e => boardSubmitHandler(e)}
      onCancel={() => toggleVisibility(false)}
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
      <br />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder='Describe your board'
        style={{
          width: '100%',
          fontFamily: 'inherit',
          padding: '8px',
          color: 'var(--color-grey)',
          fontSize: '16px'
        }}
      />
      <p style={{ color: 'var(--color-warning)' }}>{error}</p>
    </Modal>
  );
};

export default CreateBoard;
