
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCa1Y6fqYyBk-FdMOPdVfALkqfZnKb-1ZE",
    authDomain: "olx-clone-58c73.firebaseapp.com",
    projectId: "olx-clone-58c73",
    storageBucket: "olx-clone-58c73.appspot.com",
    messagingSenderId: "620304115275",
    appId: "1:620304115275:web:200fac463bfbb2033ecfce",
    measurementId: "G-HPB4T8BMCE"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signUp = async (name, email, phone, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await updateProfile(user, { displayName: name });
        await addDoc(collection(db, 'users'), {
            uid : user.uid,
            name,
            authProvider : 'local',
            email,
            phoneNumber: phone,
        });
        return true;
    } catch (error) {
        if (error) {
            console.log(error)
            toast.error(error.code)
        }
        return false;
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true;
    } catch (error) {
        if (error) {
            console.log(error)
            toast.error(error.code.split('/')[1].split('-').join(' '))
        }
        return false
    }
}

const logout = () => {
    signOut(auth);
}

const productUpload = async (image, name, category, price, user) => {
    try {  

     const storageRef = ref(storage, `/images/${image.name}`);
     const snapshot = await uploadBytes(storageRef, image);
     console.log( `This is the snapshot ${snapshot}`)

     const url = await getDownloadURL(snapshot.ref);
  
      // Add product data to Firestore
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl: url,
        userId: user.uid,
        createdAt: new Date().toDateString() 
      });
      console.log("Product data added to Firestore");
      return true;

    } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(error.message || error.code); 
        return false;
    }
  };

const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map((doc) => {
            return({
                id: doc.id,
                ...doc.data()
            });
        });
        return allProducts
    } catch (error) {
        console.log(`Product fetching error : ${error}`)
        // toast.error(error.code.split('/')[1].split('-').join(' '))
        return [];
    }
}

const getProduct = async (id) => {
    const productRef = doc(db, 'products', id); 
    const productDocSnap = await getDoc(productRef);
    console.log('product snap fetched')
}

const getUser = async (userId) => {
    try {
        const userRef = query(collection(db, 'users'), where('uid', '==', userId));
       
        const userDocSnap = await getDocs(userRef);
 
        if (userDocSnap) {
            const user = userDocSnap.docs.map(doc => doc.data());
            return user;
        } else {
            console.warn(`User document with ID: ${userId} not found.`);
            return null;
        }
      } catch (error) {
            console.error('Error fetching user document:', error);
      }
};

export {auth, db, login, signUp, logout, productUpload, getProducts, getProduct, getUser}