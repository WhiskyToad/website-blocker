import Categories from './Category/Categories';
import '../../styles.css';
import './Options.module.css';

const Options: React.FC = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Manage Blocked Sites</h1>
      <Categories />
    </div>
  );
};

export default Options;
