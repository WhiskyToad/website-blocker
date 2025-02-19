export interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  submitText?: string;
  submitButtonType?: 'button' | 'submit';
  submitButtonColor?: string;
  onSubmit?: () => void;
  // Add new props for delete button
  showDeleteButton?: boolean;
  onDelete?: () => void;
  deleteButtonText?: string;
}

const BaseModal = ({
  title,
  children,
  isOpen,
  onClose,
  submitText,
  submitButtonType = 'button',
  submitButtonColor = 'primary',
  onSubmit,
  showDeleteButton = false,
  onDelete,
  deleteButtonText = 'Delete',
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <div className="modal-box p-6 rounded-2xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action flex justify-between">
          <div>
            <button
              className="btn bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Close
            </button>
            {showDeleteButton && (
              <button
                className="btn btn-error hover:bg-red-600 ml-2"
                onClick={onDelete}
              >
                {deleteButtonText}
              </button>
            )}
          </div>
          <button
            type={submitButtonType}
            onClick={onSubmit}
            className={`btn btn-${submitButtonColor} hover:bg-blue-600`}
          >
            {submitText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BaseModal;
