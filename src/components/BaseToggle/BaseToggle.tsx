export interface BaseToggleProps {
  checked: boolean;
  label: string;
  onClick: (v: boolean) => void;
}

const BaseToggle = ({ checked, label, onClick }: BaseToggleProps) => {
  return (
    <div className="form-control w-52">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
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
