import React, { ReactNode } from 'react';

interface TabPanelProps {
  index: number;
  value: number;
  children: ReactNode;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
