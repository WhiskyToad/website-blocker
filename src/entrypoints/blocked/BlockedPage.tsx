import React from 'react';
import useModal from '../hooks/useModal';

const BlockedPage: React.FC = () => {
  const { visible, openModal, closeModal } = useModal();

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1 style={{ color: 'red' }}>This Site is Blocked</h1>
      <p>Please focus on your tasks and come back later!</p>
      <button
        className="btn btn-primary"
        onClick={() => window.location.reload()}
      >
        Temporarily allow this site
      </button>
    </div>
  );
};

export default BlockedPage;
