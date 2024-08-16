import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {context} from './newsContext.js';
import dateFormat from './dateFormat.js';
import shortenSentence from './shortenSentence.js';
import GenericThumb from './GenericThumb';
import './style/custom.css'; 

export default function Custom({frontpageNews, index, customs, setCustoms, active}) {

    const defaultSetup = {
        caption: {
            text: 'Default naslov',
            size: 3,
            color: '#ffffff',
            background: 'black',
            align: 'center'
        }, 
        body: {
            firstArticlePosition: 46,
            count: 4,
            paddingTop: 1,
            paddingSides: 4,
            background: '#000000'
        },
        article: {
            title: {
                color: '#ffffff'
            },
            subtitle: {
                show: true,
                color: '#ffffff'
            },
            supertitle: {
                color: '#ffffff',
                background: [180, '#970000', '#000000'],
                deg: 180
            },
            readMore: {
                show: true,
                color: '#ffffff',
                background:'#7a0000'
            }
        } 
    }
    const [custom, setCustom] = useState('');


    function calculateFlexProperty() {
        if(custom.body.count < 6) {
            return `0 0 ${100 / custom.body.count - 1}%`
        }
        if((custom.body.count > 5) && (custom.body.count < 11)) {
            return `0 0 ${200 / custom.body.count - 1}%`
        }
        if((custom.body.count > 10) && (custom.body.count < 16)) {
            return `0 0 ${300 / custom.body.count - 1}%`
        }
    }

    function calculateFontSize(type) {
        let typeCoefficient;

        if(type == 'title') {typeCoefficient = 7}
        if(type == 'supertitle') {typeCoefficient = 5}
        if(type == 'subtitle') {typeCoefficient = 5}
        if(type == 'category') {typeCoefficient = 4}
        if(type == 'date') {typeCoefficient = 4}
        if(type == 'read-more') {typeCoefficient = 4}

        if(custom.body.count == 1) {
            return typeCoefficient / 2.5 + 'rem';
        }
        if(custom.body.count % 5 == 0) {
            return typeCoefficient / 4 + 'rem'
        }
        if(custom.body.count < 5) {
            return typeCoefficient / custom.body.count + 'rem'
        }
        if((custom.body.count > 5) && (custom.body.count < 11)) {
            return typeCoefficient / (custom.body.count/2) + 'rem'
            } 
        if((custom.body.count > 10) && (custom.body.count < 16)) {
            return typeCoefficient / (custom.body.count/3) + 'rem'
        }
    }

    const formatCathegory = (category) => {
        if (category === 'politics') return 'Politika'
        if (category === 'business') return 'Ekonomija'
        if (category === 'technology') return 'Tehnologija'
        if (category === 'entertainment') return 'Magazin'
        if (category === 'sports') return 'Sport'
    }

    function createFilter(filter) {
        if (filter) {
           return `blur(${filter[0].blur}px) brightness(${filter[0].brightness}%) 
                            contrast(${filter[0].contrast}%) grayscale(${filter[0].grayscale}%) 
                            hue-rotate(${filter[0].huRotate}deg) invert(${filter[0].invert}%) 
                            opacity(${filter[0].opacity}%) saturate(${filter[0].saturate}%) 
                            sepia(${filter[0].sepia}%)`
        } else {
            return 'none'
        }
    }

    useEffect(() => {
        setCustom(customs[index]) 
        /* setCustom(defaultSetup)  */
    }, [])

    useEffect(() => {
        setCustoms((prev) => {
            prev[index] = custom;
            return prev
        })
    }, [custom])


    return (custom && (active == index) &&
        <div className= 'custom' >
            <div className='custom-body'>
                <div className='builder'>
                    <div className='builder-body'>
                        <div
                            className='sectionTitle'
                        >
                            <div className='sectionTitle-title'>Podesi naslov sekcije</div>
                            <div className='property'>
                                <div className='property-title'>Naslov</div>                    
                                <input 
                                    className='property-input'
                                    type='text'                        
                                    value = {custom.caption.text}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.caption.text = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div className='property'> 
                                <div className='property-title'>Boja teksta naslova</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.caption.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.caption.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div className='property'>
                                <div className='property-title'>Boja pozadine naslova</div>                     
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.caption.background}
                                    onChange={(e)=> setCustom((prev) => {
                                        
                                        prev.caption.background = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div className='property'> 
                                <div className='property-title'>Veličina teksta naslova</div>                    
                                <input 
                                    className='property-input'
                                    type='number'
                                    min = {1}                    
                                    max = {30}                    
                                    value = {custom.caption.size}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.caption.size = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div className='property'> 
                                <div className='property-title'>Pozicija naslova</div>                    
                                <select 
                                    className='property-input'                                        
                                    value = {custom.caption.align}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.caption.align = e.target.value;
                                        return {...prev}
                                    }) }
                                >
                                    <option value = 'center'>Centar</option>
                                    <option value = 'left'>Levo</option>
                                    <option value = 'right'>Desno</option>
                                </select>
                            </div>
                        </div>
                        <div className='sectionBody'>
                            <div className='sectionBody-title'>Podesi telo sekcije</div>
                            <div
                                className='property'
                            >
                                <div className='property-title'>Pozicija prve vesti</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={1}
                                    max={frontpageNews.length}
                                    value = {custom.body.firstArticlePosition}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.firstArticlePosition = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div
                                className='property'
                            >
                                <div className='property-title'>Broj vesti u custom sekciji</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={1}
                                    max={15}
                                    value = {custom.body.count}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.count = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div
                                className='property'
                            >
                                <div className='property-title'>Padding u telu sekcije - vrh</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={1}
                                    max={30}
                                    value = {custom.body.paddingTop}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.paddingTop = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div
                                className='property'
                            >
                                <div className='property-title'>Padding u telu sekcije - levo i desno</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={1}
                                    max={30}
                                    value = {custom.body.paddingSides}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.paddingSides = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>                           
                            <div
                                className='property'
                            >
                                <div className='property-title'>Boja pozadine tela sekcije</div>
                                <input 
                                    className='property-input'
                                    type='color'
                                    min={1}
                                    max={frontpageNews.length}
                                    value = {custom.body.background}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.background = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                        </div>
                        <div
                            className='sectionArticle'
                        >
                            <div className='sectionArticle-title'>Podesi izgled članka</div>
                            <div className='property'>
                                <div className='property-title'>Boja naslova</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.article.title.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.title.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <div className='property supertitleBkg'>
                                <div className='property-title'>Boja pozadine nadnaslova</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.article.supertitle.background[1]}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.supertitle.background[1] = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                                <input 
                                    className='property-input'
                                    type='color'
                                    value = {custom.article.supertitle.background[2]}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.supertitle.background[2] = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                                <label>Ugao</label>
                                <input 
                                    type='number'
                                    min={0}
                                    max={360}
                                    value = {custom.article.supertitle.deg}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.supertitle.deg = e.target.value;
                                        return {...prev}
                                })}
                                ></input> 
                            </div>     
                            <div className='property'>
                                <div className='property-title'>Boja teksta nadnaslova</div>                    
                                <input 
                                    className='property-input'
                                    type='color'
                                    value = {custom.article.supertitle.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.supertitle.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
 

                            <div className='property'>
                                <div className='property-title'>Prikaži podnaslov</div>                    
                                <select 
                                    className='property-input'
                                    type='text'                        
                                    value = {custom.article.subtitle.show}
                                    onChange={(e)=> setCustom((prev) => {
                                        console.log(e.target.value)
                                        prev.article.subtitle.show = e.target.value;
                                        return {...prev}
                                    }) }
                                >
                                    <option value = {true}>Prikaži</option>
                                    <option value = {''}>UKloni</option>
                                </select>
                            </div>
                            <div className='property'>
                                <div className='property-title'>Boja podnaslova</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.article.subtitle.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.subtitle.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>           
                            <div className='property'>
                                <div className='property-title'>Prikaži dugme Pročitaj</div>                    
                                <select 
                                    className='property-input'                                                    
                                    value = {custom.article.readMore.show}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.readMore.show = e.target.value;
                                        return {...prev}
                                    }) }
                                >
                                    <option value = {true}>Prikaži</option>
                                    <option value = {''}>UKloni</option>
                                </select>
                            </div>                           
                            <div className='property'>
                                <div className='property-title'>Boja teksta Pročitaj</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.article.readMore.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.readMore.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>                           
                            <div className='property'>
                                <div className='property-title'>Boja pozadine dugmeta Pročitaj</div>                    
                                <input 
                                    className='property-input'
                                    type='color'                        
                                    value = {custom.article.readMore.background}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.readMore.background = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>                           
                        </div>
                    </div>
                </div>
                <button 
                    className='custom-default'
                    onClick={(e) => setCustom(defaultSetup)}
                >Default
                </button>
        
                <div className='custom-preview'>
                    <div 
                        className='custom-title'
                        style={{
                            fontSize: `${custom.caption.size}rem`,
                            padding: '0.5em 0.5em 0.5em 0.5em',
                            color: custom.caption.color,
                            background: custom.caption.background,
                            textAlign: custom.caption.align
                        }}
                    >{custom.caption.text}
                    </div>
                    <div 
                        className='custom-articles'
                        style = {{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: custom.body.count > 5? 'wrap' : 'nowrap',
                            backgroundColor: custom.body.background,
                            paddingTop: custom.body.paddingTop + 'em',
                            paddingLeft: custom.body.paddingSides + 'em',
                            paddingRight: custom.body.paddingSides + 'em',
                            paddingBottom: '0'
                        }}
                    >
                        {frontpageNews && frontpageNews.map((article, i) => {

                        if((i < custom.body.firstArticlePosition - 1) || (i > (custom.body.firstArticlePosition - 1) + (custom.body.count - 1))) return
                        return <div 
                            className={`card card-custom ${i == custom.body.firstArticlePosition - 1? 'first' : ''}`}
                            style = {{
                                flex: calculateFlexProperty(),
                                position: 'relative',
                                display: custom.body.count == 1? 'flex' : 'block',
                                marginBottom: /* (i == custom.body.firstArticlePosition - 1) && custom.body.count > 5?  */'3em'
                            }}
                        >
                            {article.supertitle && <div 
                                className={`card-custom-container-supertitle`}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    top: '0px',
                                    zIndex: 1,
                                    
                                    
                                }}
                            >
                                <div 
                                    className={`card-custom-supertitle`}
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.3em 0.7em',
                                        fontSize: calculateFontSize('supertitle'),
                                        fontWeight: 'bold',
                                        color: custom.article.supertitle.color,
                                        background: `linear-gradient(${custom.article.supertitle.deg}deg, ${custom.article.supertitle.background[1]},${custom.article.supertitle.background[2]})`
                                    }}
                                >{article.supertitle}
                                </div>
                            </div>}
                            {article.imgURL && <div 
                                className={`card-custom-container-img`}
                                style = {{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    flex: '0 0 60%'
                                }}
                            >
                                <Link 
                                    style = {{
                                        display: 'inline-block',
                                        width: '100%',
                                        height: '100%'
                                    }} 
                                    to={`#`}
                                >
                                    {article.videoURL && (article.videoURL !== 'none') && <div className="play"><i className="far fa-play-circle"></i></div>}
                                    {(article.imgURL == 'generic')?
                                        <GenericThumb 
                                            className={`card-img card-custom-img`}
                                            thumbShape = 'wide'
                                            category={article.category} 
                                            isCustom = {true}
                                        />
                                        :
                                        <img className={`card-img card-custom-img`}
                                            style = {{
                                                width: '100%',
                                            
                                                objectFit: 'cover',
                                                filter: createFilter(article.imgFilter)
                                            }}
                                            src={article.imgURL}
                                        >
                                        </img>}
                                </Link>
                            </div>}
                            {(article.title || article.subtitle) && <div 
                                className={`card-custom-text`}
                                style={{
                                    width: '100%',
                                    padding: custom.body.count == 1?'1em 1em 1em 2em' : '1em 1em 1em 0em',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >
                                {article.title && <div className={`card-custom-container-title`}>
                                    <Link to={`#`}>
                                        <div 
                                            className={`card-custom-title`}
                                            style={{
                                                marginBottom: custom.article.subtitle.show? '0.25em' : '1.25em',
                                                marginTop: '0em',
                                                color: custom.article.title.color,
                                                fontSize: calculateFontSize('title'),
                                                lineHeight: 1.25,
                                                letterSpacing: '1px',
                                                transition: 'color 0.25s'
                                                
                                            }}
                                        >
                                            {shortenSentence(article.title, 170)}
                                        </div>
                                    </Link>
                                </div>}
                                {(article.category || article.datePublished || article.dateUpdated) && <div 
                                    className={`card-custom-info`}
                                    style={{
                                        order: -1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '1em',
                                        color: 'white'
                                    }}
                                >
                                    {article.category && <div 
                                        className='card-info-category'
                                        style={{
                                            display: 'inline-block'
                                        }}
                                    ><Link 
                                        to={`#`}
                                        style={{
                                            color: 'rgb(61, 170, 237)',
                                            fontSize: calculateFontSize('category'),
                                            fontFamily: 'sans-serif, Arial, Helvetica',
                                            textTransform: 'uppercase'
                                        }}
                                    >{formatCathegory(article.category)} /
                                    </Link> 
                                    </div>}
                                    <div 
                                        className={`card-info-date`}
                                        style = {{
                                            fontSize: calculateFontSize('date'),
                                            textTransform: 'capitalize',
                                            color: 'black'
                                            
                                        }}
                                    >
                                        {article.datePublished && <span className="date datePublished" >
                                            {article.datePublished ? dateFormat(article.datePublished, 'clock', 'comma', 'month', 'dayMonth') : ''}
                                        </span>}                            
                                    </div>
                                </div>}
                                {custom.article.subtitle.show && <div className={`card-custom-container-subtitle`}>
                        
                                        <p
                                            className={`card-custom-subtitle`}
                                            style={{
                                                fontSize: calculateFontSize('subtitle'),
                                                color: custom.article.subtitle.color,
                                                lineHeight: 1.5
                                            }}
                                        >
                                            {shortenSentence(article.subtitle, 120)}
                                        </p>
                                
                                </div>}
                                {custom.article.readMore.show && <div 
                                    className='read-more'
                                    style = {{
                                        order: '2'
                                    }}
                                > <Link 
                                    to={`#`}
                                    style = {{
                                        display: 'inline-block',
                                        padding: '0.5em 2em 0.5em 2em',
                                        background: custom.article.readMore.background,
                                        transition: 'all 0.25s',
                                        color: custom.article.readMore.color,
                                        fontSize: calculateFontSize('read-more')
                                    }}
                                >Pročitaj</Link>
                                </div>}
                            </div>}
                        </div>
                        })}
                    </div>
                </div>
            </div>
  
        </div>
    )
}