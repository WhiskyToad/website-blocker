export interface BlockedSitesHeaderProps {
  onAddCategory?: () => void;
}

const BlockedSitesHeader = ({ onAddCategory }: BlockedSitesHeaderProps) => {
  return (
    <header className="bg-base-200 p-4 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-base-content">
          Manage Blocked Sites
        </h1>
        <button onClick={onAddCategory} className="btn btn-primary btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Category
        </button>
      </div>
    </header>
  );
};

export default BlockedSitesHeader;
