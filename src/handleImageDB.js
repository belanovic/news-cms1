import firebase from './firebase.js';
const storage = firebase.storage();

let imagesFolder;
if(process.env.REACT_APP_COPY == '0') {
    imagesFolder = 'site-news-images'
} else {
    imagesFolder = `site-news-images${process.env.REACT_APP_COPY}`;
}


export async function uploadImageDB(imgName, imgFile, folder) {
    try {
        const ref8 = storage.ref(`${imagesFolder}/${folder}` + imgName);
        const snapshot = await ref8.put(imgFile);
        const photoURL = await ref8.getDownloadURL();
        return photoURL
    } catch (error) {
        alert(error.message)
        return null
    }
}

export async function removeImageDB(imgName, folder, deployedImgURL) {

    try {
        const imgRef = storage.ref(`${imagesFolder}/${folder}` + imgName);
        if((imagesFolder != 'site-news-images') && (deployedImgURL.includes('site-news-images%'))) return;
        const promiseResolve = await imgRef.delete();
        return 'image deleted'
    } catch (error) {
        console.log(error.message)
        return null
    }
}