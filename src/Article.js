import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { context } from './newsContext.js';
import { getArticle, getAllArticles, postArticle, 
        updateArticle, getFrontpageNews, 
        updateArticlePosition, 
        deleteArticle} from './getArticles.js';
import PositionPublish from './PositionPublish.js';
import Title from './Title.js';
import Supertitle from './Supertitle.js';
import Subtitle from './Subtitle.js';
import Textarea from './Textarea.js';
import ChooseImage from './ChooseImage.js';
import ChooseVideo from './ChooseVideo';
import Tags from './Tags.js';
import Photo from './Photo.js';
import Video from './Video.js';
import firebase from './firebase.js';
import { uploadImageDB, removeImageDB } from './handleImageDB';
import { uploadVideoDB, removeVideoDB } from './handleVideoDB';
import {publishTwit} from './getArticles';
import TextEditor from './TextEditor.js';
import Line from './Line';
import Note from './Note';
import Scraper from './Scraper';
import Twitter from './Twitter';
import Save from './Save';
import './style/article.css';
import './style/article-navigation.css';


const storage = firebase.storage();

export default function Article({ setShowCmsOverlay, isNew }) {

    const { listAllArticles, setShowMenu, setActiveLink,
        setNewArticleBtn, setShowFrontend, defaultFilter, pageNum,
    } = useContext(context);

    const [tabPublishVisibility, setTabPublishVisibility] = useState('none')
    const [tabTextVisibility, setTabTextVisibility] = useState('block')
    const [tabPhotoVisibility, setTabPhotoVisibility] = useState('none')
    const [tabVideoVisibility, setTabVideoVisibility] = useState('none')
    const [tabSocialVisibility, setTabSocialVisibility] = useState('none')
    const [activeTab, setActiveTab] = useState(1);

    const [frontpageNews, setFrontpageNews] = useState('');
    const [published, setPublished] = useState(false);
    const [alreadyPublished, setAlreadyPublished] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [IdArticleToChangePosition, setIdArticleToChangePosition] = useState('');
    const [position, setPosition] = useState(0);
    const [category, setCategory] = useState('politics');
    const [title, setTitle] = useState('');
    const [supertitle, setSupertitle] = useState('');
    const [text, setText] = useState('');
    const [initialText, setInitialText] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [twit, setTwit] = useState('');
    const [sendTwit, setSendTwit] = useState(true);
    const [paragraphs, setParagraphs] = useState([]);
    const [author, setAuthor] = useState(localStorage.getItem('loggedFirstName') +  ' ' + localStorage.getItem('loggedLastName'));
    const [source, setSource] = useState('Vesti');
    const [tagsArr, setTagsArr] = useState(['']);
    const [note, setNote] = useState('');

    const [imgDescription, setImgDescription] = useState('');
    const [deployedImgName, setDeployedImgName] = useState('');
    const [imgName, setImgName] = useState('generic');
    const [deployedImgURL, setDeployedImgURL] = useState('');
    const [imgURL, setImgURL] = useState('generic');
    const [imgFile, setImgFile] = useState('');


    const [deployedImgName2, setDeployedImgName2] = useState('');
    const [imgName2, setImgName2] = useState('generic');
    const [deployedImgURL2, setDeployedImgURL2] = useState('');
    const [imgURL2, setImgURL2] = useState('generic');
    const [imgFile2, setImgFile2] = useState('');

    const [imgFilter, setImgFilter] = useState(defaultFilter);
    const [imgFilter2, setImgFilter2] = useState(defaultFilter);

    const [videoDescription, setVideoDescription] = useState('');
    const [deployedVideoName, setDeployedVideoName] = useState('');
    const [videoName, setVideoName] = useState('none');
    const [deployedVideoURL, setDeployedVideoURL] = useState('none');
    const [videoURL, setVideoURL] = useState('none');
    const [videoFile, setVideoFile] = useState('none');

    const { id } = useParams();
    const [isNewArticle, setIsNewArticle] = useState(true);
 
    function findNewLine() {
        const pasusi = text.split('\n')
        const elementsP = pasusi.map((prom, i) => prom);
        setParagraphs(elementsP);
    }

    async function findSelectedArticle() {

        if (id === 'new') {
            setIsNewArticle(true);
            return
        }
        setShowCmsOverlay('flex');
        const selectedArticle = await getArticle(id);
        setShowCmsOverlay('none');
        if(selectedArticle == null) {
            setShowCmsOverlay('none');
            window.location.href = '/allArticles';
            return
        }

        setIsNewArticle(false);
        setTitle(selectedArticle.title);
        setSupertitle(selectedArticle.supertitle);
        setNote(selectedArticle.note);
        setSubtitle(selectedArticle.subtitle);
        setText(selectedArticle.text);
        setInitialText(selectedArticle.text);
        setParagraphs(selectedArticle.paragraphs);
        setSource(selectedArticle.source);
        setAuthor(selectedArticle.author);
        setTagsArr(selectedArticle.tagsArr);

        setImgDescription(selectedArticle.imgDescription);
        setDeployedImgURL(selectedArticle.imgURL);
        setImgURL(selectedArticle.imgURL);
        setDeployedImgName(selectedArticle.imgName);
        setImgName(selectedArticle.imgName);

        setDeployedImgURL2(selectedArticle.imgURL2);
        setImgURL2(selectedArticle.imgURL2);
        setDeployedImgName2(selectedArticle.imgName2);
        setImgName2(selectedArticle.imgName2);

        setImgFilter(selectedArticle.imgFilter);
        setImgFilter2(selectedArticle.imgFilter2);

        setVideoDescription(selectedArticle.videoDescription);
        setDeployedVideoURL(selectedArticle.videoURL);
        setVideoURL(selectedArticle.videoURL);
        setDeployedVideoName(selectedArticle.videoName);
        setVideoName(selectedArticle.videoName);

        setCategory(selectedArticle.category);
        setPosition(selectedArticle.position);
        setCurrentPosition(selectedArticle.position);
        setPublished(selectedArticle.published);
        setAlreadyPublished(selectedArticle.published);
        
        setShowCmsOverlay('none');

    }
    async function handleSave() {

        setShowCmsOverlay('flex');

        const vest = {
            id: id,
            category: category,
            published: published,
            position: position,
            title: title,
            supertitle: supertitle,
            subtitle: subtitle,
            note: note,
            text: text,
            paragraphs: paragraphs,
            imgName: imgName,
            imgName2: imgName2,
            imgFilter: imgFilter,
            imgFilter2: imgFilter2,            
            imgDescription: imgDescription,
            videoName: videoName,
            videoDescription: videoDescription,
            source: source,
            author: author,
            tagsArr: tagsArr
        }
        if (id === 'new') {
            try {
                let photoURL;
                let photoURL2;

                if(imgURL === 'generic') {
                    photoURL = 'generic'
                } else { 
                    photoURL = await uploadImageDB(imgName, imgFile, '');
                    if(photoURL == null) {
                        setShowCmsOverlay('none');
                        return;
                    }
                }
                if(imgURL2 === 'generic') {
                    photoURL2 = 'generic'
                } else { 
                    photoURL2 = await uploadImageDB(imgName2, imgFile2, '');
                    if(photoURL2 == null) {
                        setShowCmsOverlay('none');
                        return;
                    }
                }

                if (videoName !== 'none') {
                    const videoURL = await uploadVideoDB(videoName, videoFile);
                    if(videoURL == null) {
                        setShowCmsOverlay('none');
                        return;
                    }
                    vest.videoURL = videoURL;
                }
                vest.imgURL = photoURL;
                vest.imgURL2 = photoURL2;
                vest.dateCreated = new Date();
                vest.dateUpdated = new Date();
                if (published) {
                    vest.datePublished = new Date();
                }

                let deployedArticle = await postArticle(vest);
                if(deployedArticle == null) {
                    setShowCmsOverlay('none');
                    return;
                }
               

              /*   if(sendTwit) {
                    const r = await publishTwit(twit);
                } */

                if (IdArticleToChangePosition !== '') {
                    let changedPositionArticle = await updateArticlePosition(IdArticleToChangePosition, currentPosition);
                }
                
                /* window.location.href = '/allArticles'; */
                window.location.href = '/allArticles';
                setShowCmsOverlay('none');

            } catch (error) {
                setShowCmsOverlay('none');
                alert(error.message);
            }

        } else {

            try {
                if (deployedImgName !== imgName) {

                    let photoURL;

                    if(imgURL === 'generic') {
                        photoURL = 'generic'
                    } else { 
                        photoURL = await uploadImageDB(imgName, imgFile, '');
                        if(photoURL == null) {
                            setShowCmsOverlay('none');
                            return;
                        }
                        setDeployedImgName(imgName);
                        setDeployedImgURL(photoURL);
                        if(deployedImgName !== 'generic') {
                            const deletionMsg = await removeImageDB(deployedImgName, '', deployedImgURL);
                            if(deletionMsg == null) {
                                alert('Problem sa brisanjem prethodne fotografije')
                            }
                        }
                    }
                    vest.imgURL = photoURL;
                }
                if (deployedImgName2 !== imgName2) {

                    let photoURL2;

                    if(imgURL2 === 'generic') {
                        photoURL2 = 'generic'
                    } else { 
                        photoURL2 = await uploadImageDB(imgName2, imgFile2, '');
                        if(photoURL2 == null) {
                            setShowCmsOverlay('none');
                            return;
                        }
                        setDeployedImgName2(imgName2);
                        setDeployedImgURL2(photoURL2);
                        if(deployedImgName2 !== 'generic') {
                            const deletionMsg2 = await removeImageDB(deployedImgName2, '', deployedImgURL2);
                            if(deletionMsg2 == null) {
                                alert('Problem sa brisanjem prethodne fotografije')
                            }
                        }
                    }
            
                    vest.imgURL2 = photoURL2;
                }
                if (deployedVideoName !== videoName) {
                    const videoURL = await uploadVideoDB(videoName, videoFile);
                    if(videoURL == null) {
                        setShowCmsOverlay('none');
                        return;
                    }
                    setDeployedVideoName(videoName);
                    setDeployedVideoURL(videoURL);
                    if(deployedVideoName !== 'none') {
                        const deletionMsg = await removeVideoDB(deployedVideoName, deployedVideoURL);
                        if(deletionMsg == null) {
                            alert('Problem sa brisanjem starog videa')
                        }
                    }
    
                    vest.videoURL = videoURL;
                }

                vest.dateUpdated = new Date();

                if (published === true && alreadyPublished === false) {
                    vest.datePublished = new Date()
                }

                const updateMsg = await updateArticle(vest);

                if(updateMsg == null) {
                    setShowCmsOverlay('none');
                    return 
                }
                if(updateMsg.isSuccess == false) {
                    alert(updateMsg.failureMsg);
                    setShowCmsOverlay('none');
                    return 
                }

                if (IdArticleToChangePosition !== '') {
                    let changedPositionArticle = await updateArticlePosition(IdArticleToChangePosition, currentPosition);
                }
             /*    if(sendTwit) {
                    const r = await publishTwit(twit);
                } */
                alert('The article is updated')
                setShowCmsOverlay('none');
            } catch (error) {
                alert(error.message);
            }
        }
    }

    const handleSelect = (e) => {
        const option = e.target.value;
        setCategory(option);
    }
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'source') {
            setSource(value);
            return
        }
        if (name === 'author') {
            setAuthor(value);
            return
        }
        if (name === 'imgDescription') {
            setImgDescription(value);
            return
        }
        if (name === 'videoDescription') {
            setVideoDescription(value);
            return
        }
    }
    const handleClickTab = (tab) => {
        setActiveTab(tab);
        const arr = [setTabPublishVisibility, setTabTextVisibility,
            setTabPhotoVisibility, setTabVideoVisibility, setTabSocialVisibility];

        arr.forEach((prom, i) => {
            if (tab === i) {
                prom('block')
            } else {
                prom('none');
            }
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        findSelectedArticle();
    }, [])

    useEffect(() => {
        findNewLine();
    }, [text])

    useEffect( () => {
        async function f() {
            const n = await getFrontpageNews();
        
            if(n == null) {
                setFrontpageNews(null);
            }
            /* n.forEach((prom) => {
                console.log(prom.position + ' ' + prom.title);
            }) */
            setFrontpageNews(n);
        }
        f() 
    }, [])
/*     useEffect(async () => {
        const n = await getFrontpageNews();
    }, [text]) */

   useEffect(function () {
        setActiveLink('article');
    })

    useEffect(() => {
        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
    })

    return (
        <div className="article">

            <div className="article-navigation">
                <Save 
                    handleSave = {handleSave} 
                    title = {title} 
                    text = {text}
                    displaySave = {'desktop'}
                />
                <div className="article-navigation-tabs">
                    <div
                        className={`article-navigation-tab ${activeTab === 1 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(1) }}
                    >Tekst</div>

                    <div
                        className={`article-navigation-tab ${activeTab === 2 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(2) }}
                    >Fotografija</div>

                    <div
                        className={`article-navigation-tab ${activeTab === 3 ? 'active-tab' : ''}`}
                        onClick={() => { handleClickTab(3) }}
                    >Video</div>
                </div>
                <div className="fake-article-navigation-element"></div>

            </div>

            <div className="article-content" style={{ display: tabTextVisibility }}>
                <div className="article-content-container">
                    <div className="article-text" >
                        <TextEditor
                            text={text}
                            setText={setText}
                            initialText={initialText}
                        />
                        <Save 
                            handleSave = {handleSave} 
                            title = {title} 
                            text = {text}
                            displaySave = {'mobile'}
                        />
                    </div>

                    <div className="article-info">
                        <Supertitle 
                            supertitle={supertitle}
                            setSupertitle={setSupertitle}
                        />
                        <Title
                            title={title}
                            setTitle={setTitle}
                        />
                        <Subtitle
                            subtitle={subtitle}
                            setSubtitle={setSubtitle}
                        />
                        <Twitter 
                            subtitle = {subtitle} 
                            twit = {twit} 
                            setTwit = {setTwit} 
                            sendTwit = {sendTwit}
                            setSendTwit = {setSendTwit}
                        />
                        <div className="categories">
                            <label htmlFor="categories">Rubrike</label>
                            <select id="categories" value={category} onChange={handleSelect}>
                                <option value="politics">Politika</option>
                                <option value="technology">Tehnologija</option>
                                <option value="business">Ekonomija</option>
                                <option value="entertainment">Magazin</option>
                                <option value="sports">Sport</option>
                            </select>
                        </div>
                        <Line />
                        <div className="source">
                            <label htmlFor="source">Izvor</label>
                            <input
                                id="source"
                                name="source"
                                type="text"
                                value={source}
                                onChange={inputHandler}
                            ></input>
                        </div>
                        <Line />
                        <div className="source">
                            <label htmlFor="author">Autor</label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                value={author}
                                onChange={inputHandler}
                            ></input>
                        </div>
                        <Line />
                        <Tags tagsArr={tagsArr} setTagsArr={setTagsArr} />
                        <Line />
                        <Note note={note} setNote={setNote} />
                        <Line />
                        <PositionPublish
                            frontpageNews = {frontpageNews} 
                            setPosition = {setPosition} 
                            published = {published} 
                            setPublished = {setPublished}
                            position = {position}
                            setIdArticleToChangePosition = {setIdArticleToChangePosition}
                            currentPosition = {currentPosition}
                        />
                        <Line />
                        <Scraper setTitle={setTitle} setSubtitle={setSubtitle} setInitialText={setInitialText} />
                        <Line />
                    </div>
                </div>
            </div>

            <Photo
                tabPhotoVisibility={tabPhotoVisibility}
                imgDescription={imgDescription}
                inputHandler={inputHandler}
                category = {category} 

                imgURL={imgURL} 
                setImgURL={setImgURL}
                setImgName={setImgName}
                setImgFile={setImgFile}
                setDeployedImgName = {setDeployedImgName}

                imgURL2={imgURL2}
                setImgURL2={setImgURL2}
                setImgName2={setImgName2}
                setImgFile2={setImgFile2}
                setDeployedImgName2 = {setDeployedImgName2}

                imgFilter = {imgFilter}
                setImgFilter = {setImgFilter}
                imgFilter2 = {imgFilter2}
                setImgFilter2 = {setImgFilter2}
            />
            <Video
                videoURL={videoURL}
                setVideoURL={setVideoURL}
                setVideoName={setVideoName}
                setVideoFile={setVideoFile}
                value={videoDescription}
                onChange={inputHandler}
                tabVideoVisibility = {tabVideoVisibility}
            />
        </div>
    )
}