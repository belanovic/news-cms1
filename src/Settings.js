import react, { useState, useEffect, useContext } from 'react';
import { context } from './newsContext.js';
import { getSettings, updateSettings, getFrontpageNews } from './getArticles';
import Custom from './Custom.js';
import './style/settings.css';

const defaultSetup = {
    caption: {
        text: 'Korisno',
        size: 3,
        color: '#ffffff',
        background: 'black',
        align: 'center'
    },
    body: {
        firstArticlePosition: 15,
        count: 8,
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
        readMore: {
            show: true,
            color: '#ffffff',
            background:'#7a0000'
        }
    } 
}


export default function Settings() {

    const { setActiveLink, setShowCmsOverlay,  setNewArticleBtn, setShowMenu, setShowFrontend, setTitle, setTag, 
        calendarSetCheckValue, calendarHandleChange, setSelectedDate, setPageNum, setCategory } = useContext(context);
    
    const [frontpageNews, setFrontpageNews] = useState('');
    const [name, setName] = useState('');
    const [top, setTop] = useState('naslov');
    const [headerColor, setHeaderColor] = useState([180, '#970000', '#000000', '#ffffff']);
    const [supertitleColor, setSupertitleColor] = useState([180, '#970000', '#000000', '#ffffff']);
    const [readmoreColor, setReadmoreColor] = useState([180, '#970000', '#000000', '#ffffff']);
    const [socialColor, setSocialColor] = useState([180, '#970000', '#000000', '#ffffff']);
    const [templates, setTemplates] = useState('');
    const [carousel, setCarousel] = useState('');
    const [autoplay, setAutoplay] = useState(true);
    const [customs, setCustoms] = useState('');
    const [activeCustom, setActiveCustom] = useState(0);
    const [requestSent, setRequestSent] = useState(false);
    const [showTemplateManual, setShowTemplateManual] = useState(false)

    function generateCustomsComponents() {
        let customsArr = [];

        for(let i = 0; i < 15; i++) {
            customsArr.push(<Custom 
                                key = {i} 
                                index = {i} 
                                customs = {customs} 
                                setCustoms = {setCustoms} 
                                frontpageNews={frontpageNews}
                                active = {activeCustom}
                            />)
        }
        return customsArr
    }

    const handleUpdate = async () => {

        const settings = {
                templates: {
                    type: templates.type,
                    sectionsMain: templates.sectionsMain.map((elem) => elem.trim())
                },
                name: name,
                top: top,
                colors: {
                    headerColor: headerColor,
                    supertitleColor: supertitleColor,
                    readmoreColor: readmoreColor,
                    socialColor: socialColor
                },
                carousel: carousel,
                autoplay: autoplay,
                customs: customs
        }

        setShowCmsOverlay('flex');
        setRequestSent(true);
        const settingsMsg = await updateSettings(settings);
        if(settingsMsg == null) {
            setShowCmsOverlay('none');
            return;
        }
        if(settingsMsg.isSuccess == false) {

            alert(settingsMsg.failureMsg);
            setShowCmsOverlay('none');
            return 
        }
        if(settingsMsg.isSuccess == true) {
            setTemplates(settingsMsg.updatedSettings.templates);
            setName(settingsMsg.updatedSettings.name);
            setTop(settingsMsg.updatedSettings.top);
            setHeaderColor(settingsMsg.updatedSettings.colors.headerColor);
            setSupertitleColor(settingsMsg.updatedSettings.colors.supertitleColor);
            setReadmoreColor(settingsMsg.updatedSettings.colors.readmoreColor);
            setSocialColor(settingsMsg.updatedSettings.colors.socialColor);
            setCarousel(settingsMsg.updatedSettings.carousel);
            setAutoplay(settingsMsg.updatedSettings.autoplay);
            setCustoms(settingsMsg.updatedSettings.customs);
        }
        setRequestSent(false);
        alert('Podešavanja sačuvana')
        setShowCmsOverlay('none'); 
    }

    useEffect(() => {
        setActiveLink('settings');
    })

    useEffect( () => {
        async function f() {
            setShowCmsOverlay('flex');
            const settingsMsg = await getSettings();
            setShowCmsOverlay('none');
            if(settingsMsg == null) {
                window.location.href = '/';
            }
            if(settingsMsg.isSuccess) {
               
                setTemplates(settingsMsg.settings.templates);
                setName(settingsMsg.settings.name);
                setHeaderColor(settingsMsg.settings.colors.headerColor);
                setSupertitleColor(settingsMsg.settings.colors.supertitleColor);
                setReadmoreColor(settingsMsg.settings.colors.readmoreColor);
                setSocialColor(settingsMsg.settings.colors.socialColor);
                setCarousel(settingsMsg.settings.carousel);
                setAutoplay(settingsMsg.settings.autoplay);
                setCustoms(settingsMsg.settings.customs);
            }
        }
        f();
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

    useEffect( () => {
        async function f() {
            setShowCmsOverlay('flex');
            const n = await getFrontpageNews();
            if(n == null) {
                setShowCmsOverlay('none');
                window.location.href = '/';
            }
            setFrontpageNews(n);
            setShowCmsOverlay('none');
        }
        f()
    }, [])
    useEffect( () => {
        console.log(activeCustom)
    }, [activeCustom])

    return (
        <div className="settings">
           <button 
                className='update-btn'
                onClick={handleUpdate}
           >{requestSent? 'Čuvanje...' : 'Sačuvaj podešavanja'}
           </button>
            <div className='name'>
                <div className='name-text'>Promeni naslov sajta</div>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value = {name}
                    placeholder='default'
                >
                </input>
            </div>
            <div className='top'>
                <div className='top-text'>Fiksirano na vrhu sajta</div>
                <select
                    value = {top}
                    onChange={(e) => setTop(e.target.value)}
                >
                    <option value = "naslov">Naslov</option>
                    <option value = "skrol">Skrol</option>
                    <option value = "meni">Meni</option>
                </select>
            </div>
            <div className='carousel'>
                <div className='carousel-title'>Centralni karusel</div>
                <div className='carousel-type'>
                    <div >Izaberi vrstu centralnog karusela</div>
                    <select
                        value = {carousel}
                        onChange={(e) => setCarousel(e.target.value)}

                    >
                        <option value = {'auto'}>Običan</option>
                        <option value = {'cube'}>Kocka</option>
                        <option value = {'coverflow'}>Efekat coverflow</option>
                    </select>
                </div>
                <div className='carousel-autoplay'>
                    <span>Autoplay</span>
                    <input 
                        type='checkbox' 
                        checked = {autoplay}
                        value = {autoplay} 
                        onChange={(e) => setAutoplay(prev => !prev)}
                    > 
                    </input>
                </div>
            </div>
  
            <div className='colors'>
                <div className='colors-title'>Boje delova sajta</div>
                <div className='colors-container'>

                    <div
                        className='sitecolor colors-item'
                    >
                        <div className='sitecolor-title'>Heder sajta</div>
                        <div className='sitecolor-title-bkg'>Boja pozadine</div>                        
                        <div className='sitecolor-pickers'> 
                    
                            <input 
                                type='color'
                                value = {headerColor[1]}
                                onChange={(e)=> setHeaderColor((prev) => {
                                    headerColor[1] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                    
                            <input 
                                type='color'
                                value = {headerColor[2]}
                                onChange={(e)=> setHeaderColor((prev) => {
                                    headerColor[2] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                        <div className='sitecolor-deg'>
                            <div>Ugao</div>
                            <input 
                                type='number'
                                min={0}
                                max={360}
                                value = {headerColor[0]}
                                onChange={(e)=> setHeaderColor((prev) => {
                                    headerColor[0] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                        <div className='sitecolor-text'>
                            <div >Boja teksta</div>
                            <input 
                                    type='color'
                                    value = {headerColor[3]}
                                    onChange={(e)=> setHeaderColor((prev) => {
                                        headerColor[3] = e.target.value;
                                        return {...prev}
                                    }) }
                            ></input>
                        </div>
                       
                        <div className='default'>
                            <button onClick={(e) => setHeaderColor([180, '#970000', '#000000', '#ffffff'])}>Default boje</button>
                        </div>
                    </div>
                    <div
                        className='supertitleColor colors-item'
                    >
                        <div className='supertitleColor-title'>Nadnaslov članka</div>
                        <div className='supertitleColor-title-bkg'>Boja pozadine</div>
                        <div className='supertitleColor-pickers'> 
                        
                            <input 
                                type='color'
                                value = {supertitleColor[1]}
                                onChange={(e)=> setSupertitleColor((prev) => {
                                    supertitleColor[1] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                    
                            <input 
                                type='color'
                                value = {supertitleColor[2]}
                                onChange={(e)=> setSupertitleColor((prev) => {
                                    supertitleColor[2] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                    
                        <div className='supertitleColor-deg'>
                            <div>Ugao</div>
                            <input 
                                type='number'
                                min={0}
                                max={360}
                                value = {supertitleColor[0]}
                                onChange={(e)=> setSupertitleColor((prev) => {
                                    supertitleColor[0] = e.target.value;
                                    return {...prev}
                                })}
                            ></input>
                        </div>
                        <div className='supertitleColor-text'>
                            <div >Boja teksta</div>
                            <input 
                                type='color'
                                value = {supertitleColor[3]}
                                onChange={(e)=> setSupertitleColor((prev) => {
                                    supertitleColor[3] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                        
                        <div className='default'>
                            <button onClick={(e) => setSupertitleColor([180, '#970000', '#000000', '#ffffff'])}>Default boje</button>
                        </div>
                    </div>
                    <div
                        className='readmoreColor colors-item'
                    >
                        <div className='readmoreColor-title'>Dugme Pročitaj više</div>
                        <div className='readmoreColor-title-bkg'>Boja pozadine</div>
                        <div className='readmoreColor-pickers'> 
                        
                            <input 
                                type='color'
                                value = {readmoreColor[1]}
                                onChange={(e)=> setReadmoreColor((prev) => {
                                    readmoreColor[1] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                    
                            <input 
                                type='color'
                                value = {readmoreColor[2]}
                                onChange={(e)=> setReadmoreColor((prev) => {
                                    readmoreColor[2] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                    
                        <div className='readmoreColor-deg'>
                            <div>Ugao</div>
                            <input 
                                type='number'
                                min={0}
                                max={360}
                                value = {readmoreColor[0]}
                                onChange={(e)=> setReadmoreColor((prev) => {
                                    readmoreColor[0] = e.target.value;
                                    return {...prev}
                                })}
                            ></input>
                        </div>
                        <div className='readmoreColor-text'>
                            <div >Boja teksta</div>
                            <input 
                                type='color'
                                value = {readmoreColor[3]}
                                onChange={(e)=> setReadmoreColor((prev) => {
                                    readmoreColor[3] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                        
                        <div className='default'>
                            <button onClick={(e) => setReadmoreColor([180, '#970000', '#000000', '#ffffff'])}>Default boje</button>
                        </div>
                    </div>
                    <div
                        className='socialColor colors-item'
                    >
                        <div className='socialColor-title'>Sekcija Društvene mreže</div>
                        <div className='socialColor-title-bkg'>Boja pozadine</div>
                        <div className='socialColor-pickers'> 
                        
                            <input 
                                type='color'
                                value = {socialColor[1]}
                                onChange={(e)=> setSocialColor((prev) => {
                                    socialColor[1] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                    
                            <input 
                                type='color'
                                value = {socialColor[2]}
                                onChange={(e)=> setSocialColor((prev) => {
                                    socialColor[2] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                    
                        <div className='socialColor-deg'>
                            <div>Ugao</div>
                            <input 
                                type='number'
                                min={0}
                                max={360}
                                value = {socialColor[0]}
                                onChange={(e)=> setSocialColor((prev) => {
                                    socialColor[0] = e.target.value;
                                    return {...prev}
                                })}
                            ></input>
                        </div>
                        <div className='socialColor-text'>
                            <div >Boja teksta</div>
                            <input 
                                type='color'
                                value = {socialColor[3]}
                                onChange={(e)=> setSocialColor((prev) => {
                                    socialColor[3] = e.target.value;
                                    return {...prev}
                                }) }
                            ></input>
                        </div>
                        
                        <div className='default'>
                            <button onClick={(e) => setSocialColor([180, '#970000', '#000000', '#ffffff'])}>Default boje</button>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className='template'>
                <div className='template-title'>Selektuj templejt</div>
                <div className='template-options'>
                    <div 
                        className={`option ${templates.type == 'default'? 'active' : ''}`}
                        onClick={() => setTemplates((prev) => {
                            prev.type = 'default';
                            prev.sectionsMain = ['central','space','velike vesti','space','male vesti','line','ads5','line',
                            'custom1','custom2','custom3','space','mreze','space','custom8','space','preporucujemo','line',
                            'custom0','line','ads5','line','magazin','line','custom7',
                            'line','ads3','line','sport','line','custom9','line',
                            'custom4','custom5','custom6','line'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>Vesti</div>
                        <ol>
                            <li>Vesti</li>
                            <li>Magazin</li>
                            <li>Sport</li>
                        </ol>
                    </div>
                    <div 
                        className={`option ${templates.type == 'magazin'? 'active' : ''}`}
                        onClick={() => setTemplates((prev) => {
                            prev.type = 'magazin';
                            prev.sectionsMain = ['magazin','line','central','space','velike vesti','space','male vesti','line','ads5','line',
                            'custom1','custom2','custom3','space','mreze','space','custom8','space','preporucujemo','line',
                            'custom0','line','ads5','line','custom7',
                            'line','ads3','line','sport','line','custom9','line',
                            'custom4','custom5','custom6','line'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>Magazin</div>
                        <ol>
                            <li>Magazin</li>
                            <li>Vesti</li>
                            <li>Sport</li>
                        </ol>
                    </div>
                    <div 
                        className={`option ${templates.type == 'sport'? 'active' : ''}`}
                        onClick={() => setTemplates((prev) => {
                            prev.type = 'sport';
                            prev.sectionsMain = ['sport','line','custom9','line',
                            'custom4','custom5','custom6','line','central','space','velike vesti','space','male vesti','line','ads5','line',
                            'custom1','custom2','custom3','space','mreze','space','custom8','space','preporucujemo','line',
                            'custom0','line','ads5','line','magazin','line','custom7',
                            'line','ads3','line'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>Sport</div>
                        <ol>
                            <li>Sport</li>
                            <li>Vesti</li>
                            <li>Magazin</li>
                        </ol>
                    </div>
                </div>
                <div className={`custom-template ${templates.type == 'custom'? 'active' : ''}`}>
                    <div className='custom-template-title'>Custom</div>
                    <textarea 
                        className='custom-template-input'
                        value = {templates.sectionsMain}
                        onClick={() => setTemplates((prev) => {
                            prev.type = 'custom';
                            return {...prev};
                        })}
                        onChange = {(e) => {setTemplates((prev) => {
                            prev.sectionsMain = e.target.value.split(',');
                            return {...prev}
                        })}}
                    ></textarea>
                </div>
                <div className='template-manual'>
                    <div 
                        className='template-manual-btn' 
                        onClick={(e) => setShowTemplateManual(prev => !prev)}
                    >{showTemplateManual? 'Zatvori uputstvo' : 'Procitaj uputstvo za template'}
                    </div>
                    {showTemplateManual? 
                    <div className='template-manual-text'>
                        <p>Layout frontenda se sastoji iz sekcija koje su vertikalno poredjane prema redosledu napisanom gore.</p>
                        <p>Možete selektovati jedan od četiri layout-a (tri ponudjena i custom), koji će biti prikazani na frontendu kada sačuvate podešavanja</p>
                        <p>Nazivi sekcija moraju da budu odvojeni zarezom.</p>
                        <h3>Sekcije:</h3>
                        <ul style={{textAlign: 'left'}}>
                            <li><strong>central</strong> - centralni karusel, pored kojeg je deo sa tri taba (Najnovije, Najčitanije i Trending)</li>
                            <br></br>
                            <li><strong>velike vesti</strong>  - četiri kartice poredjane horizontalno u jednom redu</li>
                            <br></br>
                            <li><strong>male vesti</strong>  - šest manjih kartica poredjanih u dva reda</li>
                            <br></br>
                            <li><strong>preporucujemo</strong>  - karusel od šest većih kartica poredjanih horizontalno, od kojih su u svakom trenutku prikazane tri</li>
                            <br></br>
                            <li><strong>line</strong> - horizontalna linija duž celog layouta sa bottom i top marginom, koja služi da razdvoji dve sekcije</li>
                            <br></br>
                            <li><strong>space</strong>  - prazan div element sa top i bottom marginama, koji takođe služi da razdvoji dve sekcije</li>
                            <br></br>
                            <li><strong>ads1, ads2, ads3, ads4 i ads5</strong>  - od 1 do 5 kartica u horizontalnom karuselu, gde je svaka kartica neki ad, koje inače generiše random funkcija prilikom svakog učitavanja naslovne strane</li>
                            <br></br>
                            <li><strong> custom0 - custom14</strong> - ispod uputstva je deo podešavanja gde možete podesiti 15 custom sekcija, a na naslovnoj strani, na frontendu, biće prikazane one koje napišete u custom layout-u, od custom0 do custom14</li>
                            <p>U podešavanju custom sekcije (dole) možete podesiti razne boje, border, padding, možete staviti naslov sekcije.</p> 
                            <p>Najvažnije je da odredite koje će vesti biti u sekciji. Najpre odredite redni broj prve vesti (Pozicija prve vesti), a zatim ukupan broj vesti (Broj vesti u custom sekciji) koji će se, počev od rednog broja prve, naći u sekciji. Listu svih vesti imate u delu sajta gde se podešava Naslovna strana. Vrlo je važno da se raspon vesti koji će se naći u različitim sekcijama ne preklapa, tj. da se iste vesti ne nadju u više sekcija.</p>
                            <p><strong>Napomena: </strong>Prilikom "skakanja" sa jedne custom sekcije na drugu, promene koje ste napravili se neće obrisati. Brišu se tek ako učitate celu stranicu Podešavanja ponovo ili naravno ako idete na opciju Default. </p>
                            <br></br>
                        </ul>
                    </div>
                    :
                    ''
                    }
                    
                </div>
            </div>
            <div className='design'>
                <div className='label-custom'>Podesi custom sekcije</div>
                <div className='select-custom'>
                    <select                    
                        value={activeCustom}
                        onChange={(e) => {
                            setActiveCustom(e.target.value)
                        }}
                    >
                        <option value = {0}>custom 0</option>
                        <option value = {1}>custom 1</option>
                        <option value = {2}>custom 2</option>
                        <option value = {3}>custom 3</option>
                        <option value = {4}>custom 4</option>
                        <option value = {5}>custom 5</option>
                        <option value = {6}>custom 6</option>
                        <option value = {7}>custom 7</option>
                        <option value = {8}>custom 8</option>
                        <option value = {9}>custom 9</option>
                        <option value = {10}>custom 10</option>
                        <option value = {11}>custom 11</option>
                        <option value = {12}>custom 12</option>
                        <option value = {13}>custom 13</option>
                        <option value = {14}>custom 14</option>
                    </select>
                </div>
                {customs && generateCustomsComponents()}

            </div>
        </div>

    )
}