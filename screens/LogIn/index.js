import LogIn from '../../components/LogIn';
import Navbar from '../../components/Navbar';

export default ({ navigation }) => {
  return (
    <>
      <Navbar showButtons={false} />
      <LogIn navigation={navigation} />
    </>
  );
};
