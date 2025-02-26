import React from 'react';
import useModal from '../hooks/useModal';
import { TemporarilyAllowModal } from './TemporarilyAllowModal';

const BlockedPage: React.FC = () => {
  const { visible, openModal, closeModal } = useModal();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <TemporarilyAllowModal isOpen={visible} onClose={closeModal} />
      <h1 style={{ color: 'red' }}>This Site is Blocked</h1>
      <p>Please focus on your tasks and come back later!</p>
      <button className="btn btn-primary" onClick={openModal}>
        Temporarily allow this site
      </button>
    </div>
  );
};

export default BlockedPage;
