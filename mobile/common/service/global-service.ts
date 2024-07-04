import { createGlobalState } from 'react-native-global-state-hooks';

export const useHeaderTitle = createGlobalState<string>('Volunteer App');
