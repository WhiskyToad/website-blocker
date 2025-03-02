import React, { useState } from 'react';
import useModal from '../hooks/useModal';
import { TemporarilyAllowModal } from './TemporarilyAllowModal';

const BlockedPage: React.FC = () => {
  const { visible, openModal, closeModal } = useModal();
  const [siteIsUnblocked, setSiteIsUnblocked] = useState(false);

  return (
    <>
      {siteIsUnblocked && (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <h1 style={{ color: 'green' }}>Site Temporarily Unblocked</h1>
          <p>You may now navigate to your destination.</p>
        </div>
      )}
      {!siteIsUnblocked && (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <TemporarilyAllowModal
            isOpen={visible}
            onClose={closeModal}
            setSiteIsUnblocked={setSiteIsUnblocked}
          />
          <h1 style={{ color: 'red' }}>This Site is Blocked</h1>
          <p>Please focus on your tasks and come back later!</p>
          <button className="btn btn-primary" onClick={openModal}>
            Temporarily allow this site
          </button>
        </div>
      )}
    </>
  );
};

export default BlockedPage;
