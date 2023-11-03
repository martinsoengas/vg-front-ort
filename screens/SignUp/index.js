import SignUp from '../../components/SignUp';
import Navbar from '../../components/Navbar';
import { View } from 'react-native';

export default ({ navigation }) => {
  return (
    <View>
      <Navbar showButtons={false} />
      <SignUp navigation={navigation} />
    </View>
  );
};
