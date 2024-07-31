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
    const [customs, setCustoms] = useState('');
    const [activeCustom, setActiveCustom] = useState(0);

    function generateCustomsComponents() {
        let customsArr = [];

        for(let i = 0; i < 10; i++) {
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
                customs: customs
        }

        setShowCmsOverlay('flex');
        
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
            setCustoms(settingsMsg.updatedSettings.customs);
        }
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

    return (
        <div className="settings">
           <button 
                className='update-btn'
                onClick={handleUpdate}
           >Sačuvaj podešavanja
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
                <div className='carousel-title'>Izaberi vrstu centralnog karusela</div>
                <select
                    value = {carousel}
                    onChange={(e) => setCarousel(e.target.value)}

                >
                    <option value = {'auto'}>Običan</option>
                    <option value = {'cube'}>Kocka</option>
                    <option value = {'coverflow'}>Efekat coverflow</option>
                </select>
            </div>
            <div className='template'>
                <div className='template-title'>Templejt</div>
                <div className='template-options'>
                    <div 
                        className={`option ${templates.type == 'default'? 'active' : ''}`}
                        onClick={() => setTemplates((prev) => {
                            prev.type = 'default';
                            prev.sectionsMain = ['central', 'space', 'velike vesti', 'space', 'male vesti', 'space', 
                            'mreze', 'space', 'line', 'preporucujemo', 'line', 'magazin', 'line', 'sport'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>Default</div>
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
                            prev.sectionsMain = ['magazin', 'space', 'mreze', 'space', 'line', 'preporucujemo', 
                                        'line', 'central', 'velike vesti', 'space', 'male vesti', 'space', 'line', 'sport', 'space'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>1.</div>
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
                            prev.sectionsMain = ['sport', 'space', 'mreze', 'space', 'line', 'preporucujemo', 
                            'line', 'central', 'velike vesti', 'space', 'male vesti', 'space', 'line', 'magazin', 'space'];
                            return {...prev}
                        })}
                    >
                        <div className='label'>2.</div>
                        <ol>
                            <li>Sport</li>
                            <li>Vesti</li>
                            <li>Magazin</li>
                        </ol>
                    </div>
                </div>
                <div className={`custom-template ${templates.type == 'custom'? 'active' : ''}`}>
                    <div className='custom-template-title'>Custom template</div>
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
            </div>
            <div className='colors'>
                <div className='colors-title'>Boje</div>
                <div className='colors-container'>

                    <div
                        className='sitecolor colors-item'
                    >
                        <div className='sitecolor-title'>Heder</div>
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
                        <div className='supertitleColor-title'>Nadnaslov</div>
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
                        <div className='socialColor-title'>Društvene mreže</div>
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
            <div className='design'>
                <div className='label-custom'>Napravi custom sekciju</div>
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
                    </select>
                </div>
                {customs && generateCustomsComponents()}

            </div>
        </div>

    )
}