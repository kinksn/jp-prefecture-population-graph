import { createContext } from 'react';
import { Prefecture } from '@/api/getPrefectures';

export type SelectedPrefecturesContextType = {
  selectedPrefectures: Prefecture['prefCode'][];
  setSelectedPrefectures: React.Dispatch<
    React.SetStateAction<Prefecture['prefCode'][]>
  >;
};

export const SelectedPrefecturesContext = createContext<
  SelectedPrefecturesContextType | undefined
>(undefined);
