import react, { useState, useEffect, useContext } from 'react';
import { getFrontpageNews, updateFrontpage, getByDate, getSettings } from './getArticles';
import { context } from './newsContext.js';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SearchDate from './SearchDate';
import { useToggle } from './customHooks.js';
import './style/order.css';
import './style/order-date.css';

export default function Order() {

    const [requestSent, setRequestSent] = useState(true);

    const [frontpageNews, setFrontpageNews] = useState('');
    const [reorderedArticles, setreorderedArticles] = useState('');
    const [activeArrow, setActiveArrow] = useState('');
    const [doubleSelectedArticle, setDoubleSelectedArticle] = useState('');
    const [newsByDateAllComp, setNewsByDateAllComp] = useState([]);
    const [customs, setCustoms] = useState('');
    const [showOrderManual, setShowOrderManual] = useState(false)

    const { setActiveLink, setShowCmsOverlay, setPageNum, setCategory,
        setNewArticleBtn, setShowMenu, setShowFrontend, setTitle, setTag,
        setSelectedDate, calendarHandleChange, calendarSetCheckValue } = useContext(context);

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (activeArrow !== '' && activeArrow === source.index) {
            setActiveArrow(destination.index);
        } else {
            setActiveArrow('')
        }
        setDoubleSelectedArticle('');

        const articles = Object.assign([], reorderedArticles);
        const droppedArticle = articles[source.index];

        articles.splice(source.index, 1);
        articles.splice(destination.index, 0, droppedArticle);
        setreorderedArticles(articles);
    }

    const handleClickOrder = async () => {
        setRequestSent(true);
        setShowCmsOverlay('flex');
        const idAndPositionArr = reorderedArticles.map((prom, i) => {
            const idAndPosition = {
                id: prom._id,
                newPosition: i + 1
            }
            return idAndPosition
            
        })
        const updatedFrontpage = await updateFrontpage(idAndPositionArr);
        if(updatedFrontpage == null) {
            setRequestSent(false);
            setShowCmsOverlay('none');
            window.location.href = '/';
            return
        }

        /* const n = await getFrontpageNews();
        if(n == null) {
            setShowCmsOverlay('none');
            window.location.href = '/';
        } */

        setFrontpageNews(updatedFrontpage);
        setreorderedArticles(updatedFrontpage);
        setRequestSent(false);
        setShowCmsOverlay('none');
        
        /* updatedFrontpage.sort((a, b) => a.position - b.position).forEach((prom) => {
            if (prom.position > 0) console.log(prom.title)
        }) */
    }

    const handleClickArrow = (e, i) => {
        setDoubleSelectedArticle('');
        if (i === activeArrow) {
            setActiveArrow('');
            return
        }
        setActiveArrow(i);
    }

    useEffect(() => {
        setActiveLink('order');
    })

    useEffect(() => {
        async function f() {
            setShowCmsOverlay('flex');
            const n = await getFrontpageNews();
            if(n == null) {
                setShowCmsOverlay('none');
                window.location.href = '/';
            }
            setRequestSent(false);
            setFrontpageNews(n);
    
            setreorderedArticles(n);

            const settingsMsg = await getSettings();
            if(settingsMsg == null) {
                window.location.href = '/';
            }
            if(settingsMsg.isSuccess) {
                setCustoms(settingsMsg.settings.customs);
            }

            setShowCmsOverlay('none');
    
            const d = {
                day: new Date().getDate(),
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            }
    
            const newsByDateMsg = await getByDate(d);
    
            if(newsByDateMsg == null) {
                setNewsByDateAllComp([]);
                return
            }
            if(newsByDateMsg.isSuccess == false) {
                setNewsByDateAllComp([]);
                return
            }
            setNewsByDateAllComp(newsByDateMsg.newsByDate);
        }
        f() 
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
       
        setTitle('');
        setTag('');
        setCategory('allArticles');
        setPageNum({number: 1, isLast: false});
        setSelectedDate(null);
        calendarHandleChange(null);
        calendarSetCheckValue(false);
    }, [])
    useEffect(() => {
        if(!frontpageNews) return;
        frontpageNews.forEach((article, i) => {
            /* console.log(article.title);
            console.log(article.position); */
        })
    }, [frontpageNews])

/*     useEffect(() => {console.log(customs)}, [customs]) */


    useEffect( () => {
        async function f() {
            const settingsMsg = await getSettings();
            if(settingsMsg == null) {
                window.location.href = '/';
            }
            if(settingsMsg.isSuccess) {
                setCustoms(settingsMsg.settings.customs);
            }
        }
        f();
    }, [])

    return (

        <div className="order">
            <div className="order-send">
                <button
                    className={`order-send-button ${requestSent && 'sending'}`}
                    onClick={() => {
                        handleClickOrder();
                    }}
                    disabled={requestSent ? true : false}
                >{requestSent ? 'Ordering...' : 'Uredi'}</button>
            </div>
            <div className='order-manual'>
                    <div 
                        className='order-manual-btn' 
                        onClick={(e) => setShowOrderManual(prev => !prev)}
                    >{showOrderManual? 'Zatvori uputstvo' : 'Procitaj uputstvo'}
                    </div>
                    {showOrderManual? 
                    <div className='order-manual-text'>
                        <ul style={{textAlign: 'left'}}>
                        <strong>
                            <br></br>
                            <li><p>Objavljena vest i njena pozicija</p></li>
                            <p>Kada prilikom kreiranja vesti samo čekirate da je objavljena i poziciju ostavite na nuli, ona će se naći na frontendu u datoj kategoriji, ali ne i na naslovnoj strani</p> 
                            <p>Ako, međutim, objavite vest i upišete odgovarajuću poziciju, ona će se naći na ovoj listi, kao i na naslovnoj strani na frontendu</p>
                            <li>Raspored vesti po sekcijama
                                <p>Dole je prikazana lista vesti koje su objavljene i imaju upisanu poziciju od 1 do 99. Pozicije od 1 do 45 su rezervisane za različite unapred napravljene sekcije, i vesti koje imaju te pozicije su na naslovnoj strani u okviru tih sekcija (sport, magazin, centralni karusel...) </p>
                                <p>Vesti sa pozicijom od 45 do 99 se raspoređuju u custom sekcije, koje će se na ovoj listi pojaviti ako ih podesite u Podešavanjima, tj ako im odredite naslov drugačiji od default-a. U Podešavanjima, takođe, određujete i raspon vesti koje će imati neka custom sekcija, kao mnoge druge stvari...</p>
                            </li>
                            <li>Zamena vesti 
                                <p>vesti se ubacuju na jedno od 99 mesta tako što prvo kliknete na strelicu na desnoj strani vesti koju želite da zamenite, unesite datum u pretragu (to je datum kreiranja vesti), kliknite na Prikaži vesti. Potom izaberite jednu vest i kliknite na Zameni vest. Na kraju kliknete na Uredi na vrhu strane, da bi podešavanja bila sačuvana.</p>
                                <p>Drugi način da se vest nađe na naslovnoj strani je direktniji. Prilikom objavljivanja vesti, umesto da poziciju ostavite na nuli, može joj se odmah upisati pozicija od 1 do 99, i ona će tako zameniti vest koja ima isti redni broj na ovoj listi, a zamenjena vest će dobiti poziciju nula.</p>
                            </li>
                        </strong>
                        <br></br>
                        </ul>
                </div>
                    :
                    ''
                    }
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="order-articles-dpl">
                    {(provided) => {
                        return <div ref={provided.innerRef} {...provided.droppableProps} className="order-articles">
                            {reorderedArticles && reorderedArticles.map(
                                (article, i) => {
                                    return (

                                        <Draggable key={i} index={i} draggableId={`order-articles-item-drg${i}`}>
                                            {(provided) => {
                                                return <>
                                                {i === 0 && <div className="order-articles-item-label">Centralni karusel</div>}
                                                {i === 4 && <div className="order-articles-item-label">Velike vesti</div>}                                
                                                {i === 8 && <div className="order-articles-item-label">Male vesti</div>}                        
                                                {i === 14 && <div className="order-articles-item-label">Preporučujemo</div>}                           
                                                {i === 20 && <div className="order-articles-item-label">Magazin - glavna</div>}                           
                                                {i === 21 && <div className="order-articles-item-label">Magazin - karusel</div>}                           
                                                {i === 31 && <div className="order-articles-item-label">Sport - glavna</div>}                           
                                                {i === 32 && <div className="order-articles-item-label">Sport - karusel</div>}                           
                                                {i === 41 && <div className="order-articles-item-label">Sport - velike vesti</div>}                           
                                                {i === 45 && <div className="order-articles-item-label">Custom sekcije</div>}
                                                {customs && customs.map((custom,j) => {
                                                    if(i + 1 == custom.body.firstArticlePosition) {
                                                      
                                                        if((i + 1 == 46) && (custom.caption.text == 'Default naslov')) return;
                                                        
                                                        let articlesRange = `articles  ${custom.body.firstArticlePosition}. - ${parseInt(custom.body.firstArticlePosition) + parseInt(custom.body.count) - 1}.`;
                                                        if(parseInt(custom.body.count) == 1) {  
                                                            articlesRange = `article  ${custom.body.firstArticlePosition}.`;
                                                        }
                                                                           
                                                        return <div className="order-articles-item-label-custom">
                                                            
                                                            {custom.caption.text? 
                                                            ('custom' + j + ' / ' + custom.caption.text) + ' / ' + articlesRange
                                                            : 
                                                            ('custom' + j + ' / ' + 'Nema naslova' + ' / ' + articlesRange) }
                                                        </div>
                                                    }
                                                    /* if((i + 1 == (parseInt(custom.body.firstArticlePosition ) + parseInt(custom.body.count)) && (i + 1 != parseInt(custom.body.firstArticlePosition )))) {
                                                        return <div className="order-articles-item-label-custom">sldfjksldfj</div>
                                                    } */
                                                                      
                                                })}                    
                                             
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    key={i}
                                                    className="order-articles-item"
                                                > 
                                                    <div
                                                        className={`order-articles-item-elements ${activeArrow === i ? 'arrowUp' : 'arrowDown'} 
                                                    ${doubleSelectedArticle === i ? 'double' : ''}`}
                                                    >
                                                            <div
                                                                className="order-articles-item-number"
                                                            >{i + 1}.</div>
                                                            <div
                                                                className="order-articles-item-title"
                                                            >{article.title}</div>
                                                            <div
                                                                className={`order-articles-item-edit ${activeArrow === i ? 'up' : 'down'}`}
                                                                onClick={(e) => handleClickArrow(e, i)}
                                                            >
                                                                <i
                                                                    className="fas fa-chevron-down"
                                                                ></i>
                                                            </div>
                                                        </div>
                                                        <SearchDate
                                                            reorderedArticles={reorderedArticles}
                                                            setreorderedArticles={setreorderedArticles}
                                                            i={i}
                                                            activeArrow={activeArrow}
                                                            setActiveArrow={setActiveArrow}
                                                            setDoubleSelectedArticle={setDoubleSelectedArticle}
                                                            newsByDateAllComp={newsByDateAllComp}

                                                        />
                                                </div>
                                                </>
                                            }}
                                        </Draggable>
                                    )
                                }
                            )}
                            {provided.placeholder}
                        </div>
                    }
                    }
                </Droppable>
            </DragDropContext>

        </div>

    )
}