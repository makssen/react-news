import { auth, db, FieldValue, provider, storage } from "../firebase";

export const signWithGoogle = () => {
    return auth.signInWithPopup(provider)
}

export const signOutUser = () => {
    return auth.signOut();
}

export const initAuth = (user: any) => {
    auth.onAuthStateChanged(user);
}

export const getPosts = () => {
    return db.collection('posts').orderBy('time', 'desc');
}

export const addPost = (post: any) => {
    const ref = storage.ref(`images/${post.image.name}`);
    return ref.put(post.image)
        .then(snapshot => snapshot.ref.getDownloadURL().then(url => {
            db.collection('posts').add({
                ...post,
                image: url,
                time: FieldValue.serverTimestamp()
            })
        }))
}

/* export const photoLike = async (id: string, data: any) => {
    return db.collection('posts').doc(id).update({
        id: id,
        ...data
    })
} */

