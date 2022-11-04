import React, {type PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './src/pages/Homepage';
import CharacterDetails from './src/pages/CharacterDetails';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Liste des personnages">
        <Stack.Screen name="Liste des personnages" component={Homepage} />
        <Stack.Screen name="Details" component={CharacterDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
