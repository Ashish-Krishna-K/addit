import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, addDoc, setDoc, doc, collection, serverTimestamp, deleteDoc, updateDoc, arrayUnion, query, orderBy, startAt, getDocs, where, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import store from './store';

import { userLoggedIn } from '../features/currentUser/currentUserSlice';
import { fetchedPostsFromDB } from "../features/posts/fetchedPostsSlice";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAd1urLHkjKAYJ0CqWDr7T5QeHTnSZcEg8",
    authDomain: "addit-c548a.firebaseapp.com",
    projectId: "addit-c548a",
    storageBucket: "addit-c548a.appspot.com",
    messagingSenderId: "681992896969",
    appId: "1:681992896969:web:7e8b6a69730133e548e818"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

const auth = getAuth();

const activeUser = {
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
}

const signIn = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log (error)
  }
}

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log (error)
  }
} 

onAuthStateChanged(auth, (user) => {
  if (!user) {
    store.dispatch(userLoggedIn(null));
    return;
  }
  const { displayName, email, photoURL, uid } = user.providerData[0];
  activeUser.displayName = displayName;
  activeUser.email = email;
  activeUser.photoURL = photoURL;
  activeUser.uid = uid;
  store.dispatch(userLoggedIn(activeUser));
  console.log(displayName);
})

const createNewPost = async (title, type, content, image) => {
  if (type === "text") {
    const addPost = await addDoc(collection(db, "Posts"), {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      postTitle: title,
      postContent: { type, content },
      postUpvotes: 0,
      repliesArray: [],
    })
    console.log('postAdded')
  } else {
    const addPost = await addDoc(collection(db, "Posts"), {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      postTitle: title,
      postContent: {},
      postUpvotes: 0,
      repliesArray: [],
    });
    console.log('postAdded')
    for (const file of image) {
      uploadImages(file, addPost.id, type)
    }
  }
}

const uploadImages = async (file, docId, type) => {
  const imagesRef = ref(storage, `images/${docId}/${file.name}`);
  try {
    const imageUploaded = await uploadBytes(imagesRef, file);
    console.log('image uploaded')
    await updateDoc(doc(db, "Posts", docId), {
      "postContent.type": type,
      "postContent.content": arrayUnion(imageUploaded.metadata.fullPath),
    })
    console.log('post edited')
  } catch(error) {
    console.log(error)
    await deleteDoc(doc(db, "Posts", docId))
    console.log('post deleted')
  }
} 

const fetchPosts = async (user) => {

  try {
    if (user === undefined) {
      const data = await getDocs(collection(db, "Posts"));
      const posts = data.docs.map(doc => {
        const { 
          createdBy, 
          createdAt, 
          postTitle,
          postContent,
          postUpvotes,
          repliesArray,  
        } = doc.data()
        return {
          postId: doc.id,
          createdBy,
          createdAt: createdAt.toDate().toDateString(),
          postTitle,
          postContent,
          postUpvotes,
          repliesArray
        } 
      });
      store.dispatch(fetchedPostsFromDB(posts));
      console.log('fetched posts for home page')
    } else {
      const data = await getDocs(query(collection(db, "Posts"), where("createdBy.uid", "==", user)))
      const userPosts = data.docs.map(doc => {
        const { 
          createdBy, 
          createdAt, 
          postTitle,
          postContent,
          postUpvotes,
          repliesArray,  
        } = doc.data()

        return {
          postId: doc.id,
          createdBy,
          createdAt: createdAt.toDate().toDateString(),
          postTitle,
          postContent,
          postUpvotes,
          repliesArray
        } 
      });
      store.dispatch(fetchedPostsFromDB(userPosts));
      console.log('fetched posts for user page')
    }
  } catch(error) {
    console.log(error)
  }

} 

const fetchSinglePost = async (postId) => {
  try {
    const fetchedData = await getDoc(doc(db, "Posts", postId));
    return fetchedData.data();
  } catch(error) {
    console.log(error)
  }
}

const downloadImages = async (path) => {
  try {
    const imgRef = ref(storage, path)
    const downloadedData = await getDownloadURL(imgRef);
    return downloadedData
  } catch (error) {
    console.log(error);
  }
}

const addReplyToDB = async (postId, content, parentType, parentId) => {
  try {
    const addReply = await addDoc(collection(db, "Comments"), {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      parentPost: postId,
      parent: { parentType, parentId },
      replyContent: content,
      replyUpvotes: 0,
      repliesArray: [],
    });
    console.log('comment created');
    await updateReplyInParentOnDB(parentType, parentId, addReply.id);
  } catch (error) {
    console.log(error)
  }
}

const updateReplyInParentOnDB = async (parentType, parentId, replyId) => {
  try {
    if (parentType === 'post') {
      await updateDoc(doc(db, "Posts", parentId), {
        "repliesArray": arrayUnion(replyId)
      })
    } else {
      await updateDoc(doc(db, "Comments", parentId), {
        "repliesArray": arrayUnion(replyId)
      })
    }
    console.log('reply reference added to parent');
  } catch(error) {
    console.log(error)
  }
}

export {
  signIn,
  logOut,
  createNewPost,
  fetchPosts,
  fetchSinglePost,
  downloadImages,
  addReplyToDB,
}