import firebase from './firebase.js';

const storage = firebase.storage();

let imagesFolder;

if(process.env.REACT_APP_COPY == '0') {
    imagesFolder = 'site-news-images'
} else {
    imagesFolder = `site-news-images${process.env.REACT_APP_COPY}`;
}

export async function uploadVideoDB (videoName, videoFile) {
    try {
        const ref8 = storage.ref(`${imagesFolder}/` + videoName);
        const snapshot = await ref8.put(videoFile);
        const videoURL = await ref8.getDownloadURL();
        return videoURL
    } catch (error) {
        alert(error.message)
        return null
    }
}
export async function removeVideoDB(videoName) {
    try {
        const videoRef = await storage.ref(`${imagesFolder}/` + videoName);
        const promiseResolve = await videoRef.delete();
        return 'Videoe deleted'
    } catch (error) {
        alert(error.message)
        return null
    }
}