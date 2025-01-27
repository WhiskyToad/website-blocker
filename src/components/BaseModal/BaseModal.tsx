export interface BaseModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  submitText?: string;
  onSubmit?: () => void;
}
const BaseModal = ({
  title,
  children,
  isOpen,
  onClose,
  submitText,
  onSubmit,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}!</h3>
        <p className="py-4">{children}</p>
        <div className="modal-action flex justify-between">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            {submitText}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default BaseModal;
