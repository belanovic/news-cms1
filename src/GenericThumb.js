import react, {useState, useEffect} from 'react';

export default function GenericThumb({className, category, thumbShape, isCustom}) {

    const [thumbURL, setThumbURL] = useState('');

    function chooseThumb() {

    
        if(thumbShape == 'wide') {
            if(category == 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-politika.jpg?alt=media&token=18248284-700f-48a2-b17f-b263c5efd835');
            if(category == 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-ekonomija.jpg?alt=media&token=00876938-f22b-4b0c-91f1-4b7fbe209423');
            if(category == 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-tehnologija.jpg?alt=media&token=ec7b990e-0b0e-4cad-a9d1-c872590652f3');
            if(category == 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-magazin.jpg?alt=media&token=fe9c5d18-c07c-4545-b1b7-5ce6efbf0b09');
            if(category == 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-sport.jpg?alt=media&token=ea0316c5-4614-436b-8761-f9afe2a6c199');
        }
        if(thumbShape == 'square') {
            if(category == 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-politika.jpg?alt=media&token=31e5d4db-7e7d-4918-a95d-21effdfbfda6');
            if(category == 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-ekonomija.jpg?alt=media&token=69536af1-0738-403b-9c87-41ef57b15141');
            if(category == 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-tehnologija.jpg?alt=media&token=8aa154b3-6a5c-44af-a052-c26ac44b8937');
            if(category == 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-magazin.jpg?alt=media&token=80f21dc4-e46b-49e1-ba94-faa9f8eaa669');
            if(category == 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-sport.jpg?alt=media&token=fdf82dff-f2be-41a1-b70d-6ed8a2528358');
        }
    }

    useEffect((prom) => {
        chooseThumb()
    }, [category]);


    return (isCustom == true?
            <img 
                src = {thumbURL}
                className = {className}
                style = {{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            >
            </img>
            :
            <img 
                src = {thumbURL}
                className = {className}
                /* style = {{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} */
            >
            </img>
    )
}


/* import react, {useState, useEffect} from 'react';

export default function GenericThumb({className, category, shape}) {

    const [thumbURL, setThumbURL] = useState('');

    const chooseThumb = () => {
        if(shape === 'wide') {
            if(category === 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-politika.jpg?alt=media&token=18248284-700f-48a2-b17f-b263c5efd835');
            if(category === 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-ekonomija.jpg?alt=media&token=00876938-f22b-4b0c-91f1-4b7fbe209423');
            if(category === 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-tehnologija.jpg?alt=media&token=ec7b990e-0b0e-4cad-a9d1-c872590652f3');
            if(category === 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-magazin.jpg?alt=media&token=fe9c5d18-c07c-4545-b1b7-5ce6efbf0b09');
            if(category === 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-wide-sport.jpg?alt=media&token=ea0316c5-4614-436b-8761-f9afe2a6c199');
            
        }
        if(shape === 'square') {
            if(category === 'politics') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-politika.jpg?alt=media&token=31e5d4db-7e7d-4918-a95d-21effdfbfda6');
            if(category === 'business') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-ekonomija.jpg?alt=media&token=69536af1-0738-403b-9c87-41ef57b15141');
            if(category === 'technology') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-tehnologija.jpg?alt=media&token=8aa154b3-6a5c-44af-a052-c26ac44b8937');
            if(category === 'entertainment') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-magazin.jpg?alt=media&token=80f21dc4-e46b-49e1-ba94-faa9f8eaa669');
            if(category === 'sports') setThumbURL('https://firebasestorage.googleapis.com/v0/b/site-news-storage.appspot.com/o/site-news-images%2Fthumbs%2Ftamb-square-sport.jpg?alt=media&token=fdf82dff-f2be-41a1-b70d-6ed8a2528358');

        }
    }
    useEffect(prom => chooseThumb(), [category]);
    
   
    return (
            <img 
                className = {className}
                src = {thumbURL}
            >
            </img>

    )
} */