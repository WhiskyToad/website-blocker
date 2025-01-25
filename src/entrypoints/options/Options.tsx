import React from 'react';

import CategoryManager from './Categories';
import CategoryHeader from '@/components/CategoryHeader/CategoryHeader';

const Options: React.FC = () => {
  // const [inputValue, setInputValue] = useState<string>("");
  // const [blockedSites, setBlockedSites] = useState<IBlockedSite[]>([]);

  // useEffect(() => {
  //   const fetchBlockedSites = async () => {
  //     const blockedSites = await getBlockedSites();
  //     setBlockedSites(blockedSites);
  //   };

  //   fetchBlockedSites();
  // }, []);

  // const handleAddBlockedSite = async () => {
  //   if (!inputValue.trim()) {
  //     return;
  //   }

  //   await addBlockedSite(inputValue);
  //   setInputValue("");
  //   const updatedBlockedSites = await getBlockedSites();
  //   setBlockedSites(updatedBlockedSites);
  // };

  // const handleRemoveBlockedSite = async (domain: string) => {
  //   await removeBlockedSite(domain);
  //   const updatedBlockedSites = await getBlockedSites();
  //   setBlockedSites(updatedBlockedSites);
  // };
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manage Blocked Sites</h1>
      <CategoryHeader categoryName="test" description="dsfdsaf" />
    </div>
  );
};

export default Options;
