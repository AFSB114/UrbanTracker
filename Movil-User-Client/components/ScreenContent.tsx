import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children} : ScreenContentProps) => {
  return (
    <View className="flex-1 items-start justify-center px-3">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="my-7 h-[1px] w-4/5 bg-gray-200" />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
