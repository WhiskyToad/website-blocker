import React, { useState } from 'react';
import useModal from '../hooks/useModal';
import { TemporarilyAllowModal } from './TemporarilyAllowModal';

const BlockedPage: React.FC = () => {
  const { visible, openModal, closeModal } = useModal();
  const [siteIsUnblocked, setSiteIsUnblocked] = useState(false);
  
  const searchParams = new URLSearchParams(location.search);
  const blockedSite = searchParams.get('blockedSite');

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 rounded-xl shadow-xl p-8 text-center">
        {siteIsUnblocked ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-success-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-success">Site Temporarily Unblocked</h1>
            <p className="text-base-content/70">You will be redirected shortly...</p>
            <div className="loading loading-dots loading-md text-success"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <TemporarilyAllowModal
              isOpen={visible}
              onClose={closeModal}
              setSiteIsUnblocked={setSiteIsUnblocked}
            />
            
            <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-error-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-error">Site Blocked</h1>
              {blockedSite && (
                <div className="bg-base-200 rounded-lg p-3 mx-auto inline-block">
                  <code className="text-sm font-mono text-base-content/80">{blockedSite}</code>
                </div>
              )}
            </div>
            
            <p className="text-base-content/70 text-lg">
              This site is currently blocked to help you stay focused.
            </p>
            
            <div className="pt-4">
              <button 
                className="btn btn-primary btn-wide gap-2" 
                onClick={openModal}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Temporarily Allow
              </button>
            </div>
            
            <div className="text-xs text-base-content/50 pt-4 border-t border-base-300">
              Manage your blocking rules in the extension options
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedPage;
