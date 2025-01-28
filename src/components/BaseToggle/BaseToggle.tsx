export interface BaseToggleProps {
  checked: boolean;
  label: string;
  onClick: (v: boolean) => void;
}

const BaseToggle = ({ checked, label, onClick }: BaseToggleProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text pr-2">{label}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={checked}
          onClick={() => onClick(!checked)}
        />
      </label>
    </div>
  );
};

export default BaseToggle;
