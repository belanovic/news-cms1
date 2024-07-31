import react, { useState, useEffect, useContext } from 'react';
import { getFrontpageNews, updateFrontpage, getByDate } from './getArticles';
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
    }, [frontpageNews])

    return (

        <div className="order">
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
                                                {i === 45 && <div className="order-articles-item-label">Ostalo</div>}                           
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
            <div className="order-send">
                <button
                    className={`order-send-button ${requestSent && 'sending'}`}
                    onClick={() => {
                        handleClickOrder();
                    }}
                    disabled={requestSent ? true : false}
                >{requestSent ? 'Ordering...' : 'Uredi'}</button>
            </div>
        </div>

    )
}