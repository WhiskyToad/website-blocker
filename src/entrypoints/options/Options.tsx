import CategoriesUI from '@/components/CategoriesUI/CategoriesUI';

const Options: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manage Blocked Sites</h1>
      <CategoriesUI categories={[]} />
    </div>
  );
};

export default Options;
