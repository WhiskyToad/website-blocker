import BaseModal from '../BaseModal/BaseModal';

export interface ConfirmDeleteModalUIProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  title?: string;
}

const ConfirmDeleteModalUI = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure? This action cannot be undone.',
}: ConfirmDeleteModalUIProps) => {
  return (
    <BaseModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onConfirm}
      submitText="Delete"
      submitButtonColor="error"
    >
      <p>{message}</p>
    </BaseModal>
  );
};

export default ConfirmDeleteModalUI;
