import HOST_BACKEND from './hostBackend.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function checkStatus(response) {
    if(response.status == 401) {
        alert('401 - Authentication error');
        const logout = () => {
            /* const removed = cookies.remove('token', {sameSite: true, secure: true}); */
            localStorage.clear();
            window.location.href = '/';
        }
        logout();
        return
    }
}

export async function registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email, profileImgNameLarge, profileImgURLLarge, profileImgURLSmall, profileImgNameSmall) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: usernameSignUp,
            password: passwordSignUp,
            email: email,
            profileImgNameLarge: profileImgNameLarge,
            profileImgURLLarge: profileImgURLLarge,
            profileImgURLSmall: profileImgURLSmall,
            profileImgNameSmall: profileImgNameSmall
        })
    }
    try {
        const response = await fetch(`${HOST_BACKEND}/register`, options)
        const responseBody = await response.json();
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }
        if(responseBody.registrationMsg){
            return responseBody.registrationMsg;
        }
        return null
    }
    catch (error) {
        alert(error.message);
        return null
    }
}

export async function loginUser(usernameSignIn, passwordSignIn) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: usernameSignIn,
            password: passwordSignIn
        })
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/login`, options)
        const responseBody = await response.json();
        
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }

        if(responseBody.loginMsg) {
            return responseBody.loginMsg
        }

    }
    catch (error) {
        alert(error.message);
        return null
    }
}

export async function logoutUser() {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await fetch(`${HOST_BACKEND}/logout`, options)
        const responseBody = await response.json();
 
        if(responseBody.error) {
            alert(responseBody.error.message);
            return null
        }

        if(responseBody.logoutMsg.isSuccess) {
            return responseBody.logoutMsg
        }

    }
    catch (error) {
        alert(error.message);
        return null
    }
}

export async function updateProfileImg(usernameSignIn, loggedEmail, profileImgURL, profileImgName, size ) {

    let body; 

    if(size === 'large') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLLarge: profileImgURL,
            profileImgNameLarge: profileImgName
        })
    } else if(size === 'small') {
        body = JSON.stringify({
            username: usernameSignIn,
            email: loggedEmail,
            profileImgURLSmall: profileImgURL,
            profileImgNameSmall: profileImgName
    
        })
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        },
        body: body
    }
 
    try {
        const response = await fetch(`${HOST_BACKEND}/updateProfilePhotoURL/${size}`, options)
        checkStatus(response);
        const responseBody = await response.json();

        if(responseBody.error) {
            alert(responseBody.error.message);
            return null;
        }
        if(responseBody.updateMsg) {
            return responseBody.updateMsg;
        }
        alert('Problem sa promenom fotografije')
        return null
    }
    catch (error) {
        alert(error.message)
        return null; 
    }
}