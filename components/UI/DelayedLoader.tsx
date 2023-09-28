import React, { useEffect, useState } from 'react';
import FsProgress from '@/components/UI/FsProgress';

const DelayedLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <div className='loading'>
      <FsProgress />
    </div>
  ) : null;
};

export default DelayedLoader;
