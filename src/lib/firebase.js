import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA0p_U3GRFQSPrZxNJiQAJtEXVGkWcXP-M",
  authDomain: "fir-itss.firebaseapp.com",
  projectId: "fir-itss",
  storageBucket: "fir-itss.appspot.com",
  messagingSenderId: "974351502349",
  appId: "1:974351502349:web:f07ae26811e77d4e4d1944"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const getFirebaseItems = async () => {
  try {
    const data = await db.collection("todo").get();
    const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (err) {
    return [];
  }
}
export const addFirebaseItem = async (item) => {
  try {
    const data = db.collection("todo");
    await data.add(item);
  } catch (err) {
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const data = db.collection("todo").doc(id);
    await data.update(item);
  } catch (err) {
  }
}

export const clearFirebaseItem = async (item) => {
  const data = db.collection("todo").doc(item.id);
  await data.delete()
};
