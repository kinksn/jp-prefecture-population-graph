import { ReactNode, useEffect, useState } from 'react';
import { Prefecture } from '@/api/getPrefectures';
import { SelectedPrefecturesContext } from './selectedPrefecturesContext';

const LOCAL_STORAGE_KEY = 'selectedPrefecturesState';

export const SelectedPrefecturesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const getInitialState = (): Prefecture['prefCode'][] => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState !== null) {
      try {
        const parsedState = JSON.parse(savedState);
        if (Array.isArray(parsedState)) {
          return parsedState;
        }
      } catch (error) {
        console.error(
          'Failed to parse selected prefectures from localStorage:',
          error,
        );
        return [];
      }
    }

    return [];
  };

  const [selectedPrefectures, setSelectedPrefectures] =
    useState<Prefecture['prefCode'][]>(getInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(selectedPrefectures),
      );
    } catch (error) {
      console.error(
        'Failed to save selected prefectures to localStorage:',
        error,
      );
    }
  }, [selectedPrefectures]);

  return (
    <SelectedPrefecturesContext.Provider
      value={{ selectedPrefectures, setSelectedPrefectures }}
    >
      {children}
    </SelectedPrefecturesContext.Provider>
  );
};
