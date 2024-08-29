import HOST_BACKEND from './hostBackend.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function checkStatus(response) {
    if(response.status == 401) {
        alert('YOu are not logged in');
        const logout = () => {
            /* const removed = cookies.remove('token', {sameSite: true, secure: true}); */
            localStorage.clear()
            window.location.href = '/';
        }
        logout();
        return
    }
}

function convertUTCDateToLocalDate(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(), date.getMinutes(), date.getSeconds()));
}

export async function getAllArticles(category, pageNum, title, tag, selectedDate) {

    const options = { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            category: category,
            pageNum: pageNum,
            title: title.trim(),
            tag: tag.trim(),
            selectedDate: selectedDate
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/${pageNum.isLast == true? 'lastPage' : 'allArticles'}`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }
        return responseBody.articlesMsg
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function getArticle(id) {

    const options = { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticleCMS/${id}`, options);
        
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articleFound) {
            return responseBody.articleFound;
        }
    }
    catch(error) {
        alert(error.message)
        return null;
    }
}
export async function postArticle({id, title, supertitle, subtitle, text, paragraphs, note, imgURL, imgName, 
                                tagsArr, imgURL2, imgName2, imgFilter, imgFilter2,
                                dateUpdated, dateCreated, datePublished, videoURL, videoName,
                                category, position, published, videoDescription, imgDescription, author, source}) {
                         
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            title: title,
            supertitle,
            subtitle: subtitle,
            text: text,
            paragraphs: paragraphs,
            note: note,
            imgURL: imgURL,
            imgName: imgName,
            imgURL2: imgURL2,
            imgName2: imgName2,
            imgFilter: imgFilter,
            imgFilter2: imgFilter2,
            videoURL: videoURL,
            videoName: videoName,
            dateUpdated: dateUpdated,
            dateCreated: dateCreated,
            datePublished: datePublished,
            category: category,
            position: position,
            published: published,
            imgDescription: imgDescription,
            videogDescription: videoDescription,
            source: source,
            author: author,
            tagsArr: tagsArr

        })
    }                               

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/`, options);
        /*      if(response.status == 401) {
            alert('401 - Authentication error');
            logout();
            return
        } */
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
         
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.savedArticle) {
            return responseBody.savedArticle;
        }
    }
    catch (error) {
        alert(error.message)
        return null; 
    }
}

export async function updateArticle({id, title, supertitle, subtitle, text, paragraphs, note, imgURL2, imgName2,
                                    imgURL, imgName, imgFilter, imgFilter2, videoURL, videoName, position, 
                                    category, published, datePublished, tagsArr,
                                    imgDescription, videoDescription, author, source}) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            title: title,
            supertitle: supertitle,
            subtitle: subtitle,
            text: text,
            paragraphs: paragraphs,
            note: note,
            imgURL: imgURL,
            imgName: imgName,
            imgURL2: imgURL2,
            imgName2: imgName2,
            imgFilter: imgFilter,
            imgFilter2: imgFilter2,
            videoURL: videoURL,
            videoName: videoName,
            dateUpdated: Date(),
            datePublished: datePublished,
            category: category,
            position: position,
            published: published,
            imgDescription: imgDescription,
            videoDescription: videoDescription,
            source: source,
            author: author, 
            tagsArr: tagsArr
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }

        if(responseBody.updateMsg) {
            return responseBody.updateMsg;
        }

    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function deleteArticle(id) {

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/oneArticle/${id}`, options);
        checkStatus(response);
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articleDeleted) {
            return responseBody.articleDeleted;
        }
    }
    catch (error) {
        alert(error.message)
        return null;
    }
}

export async function getFrontpageNews() {

    const options = { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/frontpageArticlesCMS`, options);
        checkStatus(response);
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.articles) {
            return responseBody.articles;
        }
        alert('Problem sa listom članaka')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function updateArticlePosition(id, position) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            position: position
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/articlePosition/${id}`, options);
        checkStatus(response);
        const responseBody = await response.json();
        
        if(responseBody.error) {
            console.log('eovo meeeeeee')
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.updatedArticle) {
    
            return responseBody.updatedArticle;
        }
        alert('Problem sa promenom pozicije članka')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function updateFrontpage(idAndPositionArr) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            idAndPositionArr: idAndPositionArr
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/updateFrontpage`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.modifiedAllArticles) {
            return responseBody.modifiedAllArticles;
        }
        alert('Problem sa promenom naslovne strane')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function getByDate(date) {

    console.log(date);
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            day: date.day, 
            month: date.month,
            year: date.year
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/articlesByDate`, options);
        checkStatus(response);
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }

        if(responseBody.newsByDateMsg) {
            return responseBody.newsByDateMsg
        }
        alert('Problem sa pretragom vesti po datumu')
        return null

    }
    catch (error) {
        alert(error.message)
        return null
    }
}

export async function publishArticle(id) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            published: true,
            datePublished: Date(), 
            dateUpdated: Date()
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/publishArticle/${id}`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.publishedArticle) {
            return responseBody.publishedArticle
        }
        alert('Problem sa objavom vesti')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}
export async function scrape(url) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            url: url
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/scraper`, options);
        checkStatus(response);
        const responseBody = await response.json();
      
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.scrapedArticle) {
            return responseBody.scrapedArticle
        }
        alert('Problem sa skidanjem teksta')
        return null
    }
    catch (error) {
        alert(error.message)
        return null
    }
}
 
export async function publishTwit(twit) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            twit: twit
        })
    }
    try {
        const response = await fetch(`${HOST_BACKEND}/publishTwit`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.responseTwitt) {
            return responseBody.responseTwitt
        }
        alert('Problem sa objavom tvita')
        return null
    } catch (error) {
        alert(error.message)
        return null
    }
}


export async function getSettings() {

    const options = { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/getSettingsCMS`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.settingsMsg) {
            return responseBody.settingsMsg;
        }
    }
    catch(error) {
        alert(error.message)
        return null;
    }
}

export async function updateSettings(settings) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }/* ,
        credentials: 'include' */,
        body: JSON.stringify({
            settings: settings
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/updateSettings`, options);
        checkStatus(response);
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }

        if(responseBody.settingsMsg) {
            return responseBody.settingsMsg;
        }

    }
    catch (error) {
        alert(error.message)
        return null
    }
}