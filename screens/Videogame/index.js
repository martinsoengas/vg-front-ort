import Videogame from '../../components/Videogame';
import Navbar from '../../components/Navbar';

export default ({ navigation, route }) => {
  const { item: videogame } = route.params;
  const { Developer: developer } = videogame;

  return (
    <>
      <Navbar showButtons={false} />
      <Videogame
        navigation={navigation}
        videogame={videogame}
        developer={developer}
      />
    </>
  );
};
