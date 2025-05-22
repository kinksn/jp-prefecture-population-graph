import { ReactNode, useState } from 'react';
import { Prefecture } from '@/api/getPrefectures';
import { SelectedPrefecturesContext } from './selectedPrefecturesContext';

export const SelectedPrefecturesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([]);

  return (
    <SelectedPrefecturesContext.Provider
      value={{ selectedPrefectures, setSelectedPrefectures }}
    >
      {children}
    </SelectedPrefecturesContext.Provider>
  );
};
