import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  addDoc, 
  doc, 
  collection, 
  serverTimestamp, 
  deleteDoc, 
  updateDoc, 
  arrayUnion, 
  query, 
  orderBy, 
  startAfter, 
  getDocs, 
  where, 
  getDoc, 
  limit,
} from "firebase/firestore";
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytes 
} from "firebase/storage";

import store from './store';

import { userLoggedIn } from '../features/currentUser/currentUserSlice';
import { fetchedPostsFromDB } from "../features/posts/fetchedPostsSlice";
import { fetchedCommentsFromDB } from "../features/comments/fetchedCommentsSlice";

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
const postsCollection = collection(db, "Posts");
const commentsCollection = collection(db, "Comments");

const auth = getAuth();

const activeUser = {
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
}

let homePageCurrentQueryLastPost = null;
let userPageCurrentQueryLastPost = null;
let currentQueryLastReply = null;

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
})

const createNewPost = async (title, type, content, image) => {
  if (type === "text") {
    const addPost = await addDoc(postsCollection, {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      postTitle: title,
      postContent: { type, content },
      upvotes: { value: 0, upvotedUsers: [], downvotedUsers: []},
      repliesArray: [],
    })
    console.log('postAdded');
    return addPost;
  } else {
    const addPost = await addDoc(postsCollection, {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      postTitle: title,
      postContent: {},
      upvotes: { value: 0, upvotedUsers: [], downvotedUsers: []},
      repliesArray: [],
    });
    console.log('postAdded');
    for (const file of image) {
      uploadImages(file, addPost.id, type)
    }
    return addPost;
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

const returnHomePostsQuery = () => {
  return homePageCurrentQueryLastPost ? 
  query(postsCollection, orderBy("createdAt", 'desc'), startAfter(homePageCurrentQueryLastPost), limit(10)) :
  query(postsCollection, orderBy("createdAt", 'desc'), limit(10))
}

const returnUserPostsQuery = (user) => {
  return userPageCurrentQueryLastPost ? 
  query(postsCollection, orderBy("createdAt", "desc"), startAfter(userPageCurrentQueryLastPost), where("createdBy.uid", "==", user), limit(10)) :
  query(postsCollection, orderBy("createdAt", "desc"), where("createdBy.uid", "==", user), limit(10))
}

const returnCommentsQuery = (user) => {
  return currentQueryLastReply ? 
  query(commentsCollection, orderBy("createdAt", "desc"), startAfter(currentQueryLastReply), where("createdBy.uid", "==", user), limit(10)) :
  query(commentsCollection, orderBy("createdAt", "desc"), where("createdBy.uid", "==", user), limit(10))
}

const fetchPosts = async (user) => {

  try {
    if (user === undefined) {
      const homePageQuery = returnHomePostsQuery();
      const data = await getDocs(homePageQuery);
      const posts = data.docs.map(doc => {
        const { 
          createdBy, 
          createdAt, 
          postTitle,
          postContent,
          upvotes,
          repliesArray,  
        } = doc.data()
        return {
          postId: doc.id,
          createdBy,
          createdAt: createdAt.toDate().toDateString(),
          postTitle,
          postContent,
          upvotes,
          repliesArray
        } 
      });
      store.dispatch(fetchedPostsFromDB(posts));
      homePageCurrentQueryLastPost = data.docs.pop();
      console.log('fetched posts for home page');
    } else {
      const userPageQuery = returnUserPostsQuery(user);
      const data = await getDocs(userPageQuery);
      const userPosts = data.docs.map(doc => {
        const { 
          createdBy, 
          createdAt, 
          postTitle,
          postContent,
          upvotes,
          repliesArray,  
        } = doc.data()

        return {
          postId: doc.id,
          createdBy,
          createdAt: createdAt.toDate().toDateString(),
          postTitle,
          postContent,
          upvotes,
          repliesArray
        } 
      });
      store.dispatch(fetchedPostsFromDB(userPosts));
      userPageCurrentQueryLastPost = data.docs.pop();
      console.log('fetched posts for user page');
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
    const addReply = await addDoc(commentsCollection, {
      createdBy: Object.assign(activeUser),
      createdAt: serverTimestamp(),
      parentPost: postId,
      parent: { parentType, parentId },
      replyContent: content,
      upvotes: { value: 0, upvotedUsers: [], downvotedUsers: []},
      repliesArray: [],
    });
    console.log('comment created');
    await updateReplyInParentOnDB(parentType, parentId, addReply.id);
    return addReply;
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

const fetchReplyFromDB = async (replyId) => {
  try {
    const fetchedData = await getDoc(doc(db, "Comments", replyId));
    if (fetchedData.exists()) {
        const {
          createdBy,
          createdAt,
          parentPost,
          parent,
          replyContent,
          upvotes,
          repliesArray,
      } = fetchedData.data()
      console.log('reply fetched')
      return  {
          replyId: fetchedData.id,
          createdBy,
          createdAt,
          parentPost,
          parent,
          replyContent,
          upvotes,
          repliesArray,
      }
    } else {
      return null;
    }
    
  } catch(error) {
    console.log(error)
  }
}

const fetchComments = async (user) => {
  try {
    const userCommentsQuery = returnCommentsQuery(user);
    const data = await getDocs(userCommentsQuery)
    const userReplies = data.docs.map(doc => {
      const { 
        createdBy,
        createdAt,
        parentPost,
        parent,
        replyContent,
        upvotes,
        repliesArray,  
      } = doc.data()

      return {
        replyId: doc.id,
        createdBy,
        createdAt: createdAt.toDate().toDateString(),
        parentPost,
        parent,
        replyContent,
        upvotes,
        repliesArray
      } 
    });
    store.dispatch(fetchedCommentsFromDB(userReplies));
    currentQueryLastReply = data.docs.pop();
    console.log('fetched comments for user page')
  } catch (error) {
    console.log(error);
  }
}

const resetQueryLast = () => {
  homePageCurrentQueryLastPost = null;
  userPageCurrentQueryLastPost = null;
  currentQueryLastReply = null;

  console.log('all lastQuery variables is reset');
}

const updatePostUpvotes = async (value, upvotes, downvotes, id) => {
  try {
    const updateUpvote = await updateDoc(doc(postsCollection, id), {
      "upvotes.value": value,
      "upvotes.upvotedUsers": upvotes,
      "upvotes.downvotedUsers": downvotes,
    })
    return updateUpvote
  } catch (error) {
    console.log(error);
  }
}

const updateReplyUpvote = async (value, upvotes, downvotes, id) => {
  try {
    const updateUpvote = await updateDoc(doc(commentsCollection, id), {
      "upvotes.value": value,
      "upvotes.upvotedUsers": upvotes,
      "upvotes.downvotedUsers": downvotes,
    })
    return updateUpvote
  } catch (error) {
    console.log(error);
  }
}

const editPostInDB = async (id, content) => {
  try {
    return await updateDoc(doc(postsCollection, id), {
      "postContent.content": content
    })
    
  } catch (error) {
    console.log(error)
  }
}

const editReplyInDB = async (id, content) => {
  try {
    return await updateDoc(doc(commentsCollection, id), {
      replyContent: content
    })
  } catch (error) {
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
  fetchReplyFromDB,
  fetchComments,
  resetQueryLast,
  updatePostUpvotes,
  updateReplyUpvote,
  editPostInDB,
  editReplyInDB,
}