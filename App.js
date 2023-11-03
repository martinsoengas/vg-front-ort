import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import AddGame from './screens/AddGame';
import Videogame from './screens/Videogame';

import { UserProvider } from './services/userContext';

export default function App() {
  const StackNavigator = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <UserProvider>
        <StackNavigator.Navigator>
          <StackNavigator.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Videogame Ratings',
            }}
          />
          <StackNavigator.Screen
            name="LogIn"
            component={LogIn}
            options={{
              title: 'Log In',
            }}
          />
          <StackNavigator.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: 'Register',
            }}
          />
          <StackNavigator.Screen
            name="AddGame"
            component={AddGame}
            options={{
              title: 'Add Game',
            }}
          />
          <StackNavigator.Screen
            name="Videogame"
            component={Videogame}
            options={{
              title: 'Videogame',
            }}
          />
        </StackNavigator.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
