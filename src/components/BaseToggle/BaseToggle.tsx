export interface BaseToggleProps {
  checked: boolean;
  label: string;
  onClick: (v: boolean) => void;
  hideLabel?: boolean; // New optional prop
  ref?: React.Ref<HTMLInputElement>;
}

const BaseToggle = ({
  checked,
  label,
  onClick,
  hideLabel = false,
  ref,
}: BaseToggleProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className={`label-text pr-2 ${hideLabel ? 'sr-only' : ''}`}>
          {label}
        </span>
        <input
          ref={ref}
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
