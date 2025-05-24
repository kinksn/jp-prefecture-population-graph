import {
  SelectedPrefecturesContext,
  SelectedPrefecturesContextType,
} from '@/providers/selectedPrefectures/selectedPrefecturesContext';
import { useContext } from 'react';

export const useSelectedPrefecture = (): SelectedPrefecturesContextType => {
  const context = useContext(SelectedPrefecturesContext);
  if (context === undefined) {
    throw new Error(
      'useSelectedPrefecture must be used within a SelectedPrefectureProvider',
    );
  }
  return context;
};
