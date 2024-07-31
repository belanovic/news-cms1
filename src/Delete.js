import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import { deleteArticle, getAllArticles } from './getArticles.js';
import Title from './Title.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
/* import Photo from './Photo.js'; */
import firebase from './firebase.js';
import { removeImageDB } from './handleImageDB';
import { removeVideoDB } from './handleVideoDB';
import './style/delete.css';

const storage = firebase.storage();

export default function Delete() {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [imgName, setImgName] = useState('');
    const [imgName2, setImgName2] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [videoName, setVideoName] = useState('');
    const { id } = useParams();
    const { listAllArticles, setListAllArticles, showCmsOverlay, 
        setShowCmsOverlay, pageNum, category
    } = useContext(context);

    const findSelectedArticle = () => {
        const selectedArticle = listAllArticles.find((prom) => prom._id === id);
        setTitle(selectedArticle.title);
        setSubtitle(selectedArticle.subtitle);
        setImgURL(selectedArticle.imgURL);
        setImgName(selectedArticle.imgName);
        setImgName2(selectedArticle.imgName2);
        setVideoURL(selectedArticle.videoURL);
        setVideoName(selectedArticle.videoName);
    }

    async function handleDelete() {
        try {
            const promiseResolveD = setShowCmsOverlay('flex');
            const articleDeleted = await deleteArticle(id);
            if(articleDeleted == null) {
                setShowCmsOverlay('none');
                window.location.href = '/allArticles';
                return
            }
            if(imgName !== 'generic') {
                const deletedImage = await removeImageDB(imgName, '');
            }
            if(imgName2 !== 'generic') {
                const deletedImage = await removeImageDB(imgName2, '');
            }
            if(videoName !== 'none') {
                const deletedImage = await removeImageDB(videoName, '');
            }
            window.location.href = '/allArticles';
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        findSelectedArticle();
    }, [])

    return (
        <div className="delete">
                <h1 className="title">{title}</h1>
                <h3 className="subtitle">{subtitle}</h3>
                <div><button className="deleteBtn" onClick={handleDelete}>Izbriši vest</button></div>
                <div> <Link to='/allArticles'><button className='backBtn'>Nazad na pretragu</button></Link></div>
        </div>
    )
}