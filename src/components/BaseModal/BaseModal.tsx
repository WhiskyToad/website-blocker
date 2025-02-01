export interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  submitText?: string;
  submitButtonType?: 'button' | 'submit';
  submitButtonColor?: string;
  onSubmit?: () => void;
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
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <div className="modal-box p-6 rounded-2xl">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action flex justify-between">
          <button
            className="btn bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
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
