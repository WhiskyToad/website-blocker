import React from 'react';

const BlockedPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1 style={{ color: 'red' }}>This Site is Blocked</h1>
      <p>Please focus on your tasks and come back later!</p>
    </div>
  );
};

export default BlockedPage;
