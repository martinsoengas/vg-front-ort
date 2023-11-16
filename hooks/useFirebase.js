import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyChcQY5_rPKAWRyEMwmjz8dSUgFW6lu4gg',
  authDomain: 'vgratings-c54f2.firebaseapp.com',
  projectId: 'vgratings-c54f2',
  storageBucket: 'vgratings-c54f2.appspot.com',
  messagingSenderId: '389500153186',
  appId: '1:389500153186:web:7743a3f1bfce262074903b',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadImage = async (image) => {
  const storageRef = ref(storage, 'images/' + image.fileName);
  try {
    const response = await fetch(image.uri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    console.log('Imagen subida exitosamente');
  } catch (error) {
    console.error('Error al subir la imagen:', error);
  }
};

const getImageUrl = async (filePath) => {
  const storage = getStorage();
  const storageRef = ref(storage, 'images/' + filePath);
  try {
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error('Error al obtener la URL de la imagen:', error);
  }
};

export { uploadImage, getImageUrl };
