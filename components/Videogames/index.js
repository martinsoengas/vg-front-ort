import { FlatList, TouchableOpacity } from 'react-native';
import VideogameCard from '../VideogameCard';

export default ({ videogames, navigation }) => {
  const renderVideogame = (param) => {
    const { item } = param;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Videogame', { item })}
        // onLongPress={() => console.log("hago click intenso")}
      >
        <VideogameCard videogame={item} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={videogames}
      keyExtractor={(item) => item.id}
      renderItem={renderVideogame}
    />
  );
};
