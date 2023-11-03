import axios from 'axios';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Icon } from '@rneui/themed';

import apiUrl from '../../config/api';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ user, setUser, showButtons = true, navigation }) => {
  const userType = user?.companyName ? 'developers' : 'users';

  const handleLogOut = async () => {
    // await AsyncStorage.clear();

    try {
      const { data } = await axios.post(
        `${apiUrl}/${userType}/logout`,
        {},
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );
      if (data.failed) {
        return alert('Oops! Something wrong happened, try again later');
      }

      setUser(null);
      alert('You have logged out, bye!');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      return alert('Oops! Something wrong happened, try again later');
    }
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbarCompanyContainer}>
        <Text style={styles.navbarCompanyName}>vgRatings</Text>
        <View style={styles.navbarStarsContainer}>
          <Icon name="star" color="black" />
          <Icon name="star" color="black" />
          <Icon name="star" color="white" />
        </View>
      </View>
      {user?.companyName && (
        <View style={styles.navbarButtonsContainer}>
          <Pressable onPress={() => navigation.navigate('AddGame')}>
            <Text style={styles.navbarButtons}>Add Game</Text>
          </Pressable>
        </View>
      )}
      {user ? (
        <View style={styles.navbarButtonsContainer}>
          <Pressable onPress={handleLogOut}>
            <Text style={styles.navbarButtons}>Log Out</Text>
          </Pressable>
        </View>
      ) : (
        !user &&
        showButtons && (
          <View style={styles.navbarButtonsContainer}>
            <Pressable onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.navbarButtons}>Log In</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.navbarButtons}>Sign Up</Text>
            </Pressable>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#CC0000',

    alignItems: 'center',
  },
  navbarCompanyContainer: {
    alignItems: 'center',
  },
  navbarStarsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  navbarCompanyName: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  navbarButtonsContainer: {
    flexDirection: 'row',

    gap: 10,
  },
  navbarButtons: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    borderRadius: 5,
    fontSize: 20,
  },
});
