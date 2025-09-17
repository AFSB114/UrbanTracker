import { useCallback, useState } from 'react';

type BottomSheetScreen = 'home' | 'route-detail' | 'about' | 'stops';

interface RouteDetailData {
  routeId: string;
  routeName: string;
}

export const useBottomSheet = () => {
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<BottomSheetScreen>('home');
  const [routeDetailData, setRouteDetailData] = useState<RouteDetailData | null>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      setBottomSheetIndex(index);

      // Si se colapsa, regresar al home y quitar el foco
      if (index === 0) {
        setCurrentScreen('home');
        if (isSearchFocused) {
          setIsSearchFocused(false);
        }
      }
    },
    [isSearchFocused]
  );

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    // Expandir completamente cuando se enfoque la búsqueda
    if (bottomSheetIndex === 0) {
      setBottomSheetIndex(1);
    }
  }, [bottomSheetIndex]);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  const navigateToRouteDetail = (routeId: string, routeName: string) => {
    setRouteDetailData({ routeId, routeName });
    setCurrentScreen('route-detail');
    // Asegurar que esté expandido
    setBottomSheetIndex(1);
  };

  const navigateToAbout = () => {
    setCurrentScreen('about');
    setBottomSheetIndex(1);
  };

  const navigateToStops = () => {
    setCurrentScreen('stops');
    setBottomSheetIndex(1);
  };

  const navigateBack = () => {
    setCurrentScreen('home');
    setRouteDetailData(null);
  };

  return {
    bottomSheetIndex,
    setBottomSheetIndex,
    isSearchFocused,
    currentScreen,
    routeDetailData,
    handleSheetChanges,
    handleSearchFocus,
    handleSearchBlur,
    navigateToRouteDetail,
    navigateToAbout,
    navigateToStops,
    navigateBack,
  };
};
