import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import {context} from './newsContext.js';
import dateFormat from './dateFormat.js';
import shortenSentence from './shortenSentence.js';
import GenericThumb from './GenericThumb';
import './style/custom.css'; 

export default function Custom({frontpageNews, index, customs, setCustoms, active}) {

    const defaultSetup = {
        border: {
            borderTop: {
                px: 0,
                stil: 'solid',
                color: '#000000'
            },
            borderBottom: {
                px: 0,
                stil: 'solid',
                color: '#000000'
            },
            borderLeft: {
                px: 0,
                stil: 'solid',
                color: '#000000'
            },
            borderRight: {
                px: 0,
                stil: 'solid',
                color: '#000000'
            },
            borderRadius: {
                topLeft: 0,
                topRight: 0,
                bottomRight: 0,
                bottomLeft: 0
            }
        },
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
            background: {
                color: 'none',
                isActive: false
            },
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
    const [activeBorder, setActiveBorder] = useState('borderTop');


    function calculateFlexProperty() {
        if(custom.body.count < 6) {
            return `0 0 ${100 / custom.body.count - 1}%`
        }
        if((custom.body.count > 5) && (custom.body.count < 11)) {
            return `0 0 ${200 / custom.body.count - 1}%`
        }
        if((custom.body.count > 10) && (custom.body.count < 15)) {
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
    
        /* if(index > 9) {
            setCustom(defaultSetup)
        } */
        /* setCustom(defaultSetup)  */
       
        
    }, [])


    useEffect(() => {
        console.log(parseInt(active) == parseInt(index))
        setCustoms((prev) => {
            prev[index] = custom;
           /*  console.log(prev[index]);
            if(prev[index]) {
                prev[index].article.background = {
                    color: 'none',
                    isActive: false
                };
            } */
            return prev
        })
    }, [custom])


    return (custom && (parseInt(active) == parseInt(index)) &&
        <div className= 'custom' >
            <div className='custom-body'>
                <div className='builder'>
                    <div className='builder-body'>
                        <div
                            className='section sectionTitle'
                        >
                            <div className='sectionTitle-title'>Naslov sekcije</div>
                            <div id = "site-title" className='property'>
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
                            <button className= 'defaultBtn' onClick={(e) => {
                                if(window.confirm('Da li ste sigurni da želite default podešavanje naslova sekcije?')) {
                                    setCustom((prev) => {
                                        prev.caption.text = defaultSetup.caption.text;
                                        prev.caption.color = defaultSetup.caption.color;
                                        prev.caption.background = defaultSetup.caption.background;
                                        prev.caption.size = defaultSetup.caption.size;
                                        prev.caption.align = defaultSetup.caption.align;
                                        return {...prev}
                                    })
                                }
                                return
                                
                            }}
                            >Default
                            </button>
                        </div>
                        <div className='section sectionBody'>
                            <div className='sectionBody-title'>Telo sekcije</div>
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
                               
                                    value = {custom.body.background}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.body.background = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <button className= 'defaultBtn' onClick={(e) => {
                                if(window.confirm('Da li ste sigurni da želite default podešavanje tela sekcije?')) {
                                    setCustom((prev) => {
                                        prev.body.background = defaultSetup.body.background;
                                        prev.body.firstArticlePosition = defaultSetup.body.firstArticlePosition;
                                        prev.body.count = defaultSetup.body.count;
                                        prev.body.paddingTop = defaultSetup.body.paddingTop;
                                        prev.body.paddingSides = defaultSetup.body.paddingSides;
                                        return {...prev}
                                    })
                                }
                                return

                            }}
                            >Default
                            </button>
                        </div>
                       
                        <div
                            className='section sectionBorder'
                        >

                            <div className='sectionTitle-title'>Border sekcije</div>
                                <div className='borderNavigation'>
                                    <div className = "borderTab" onClick = {(e) => {setActiveBorder('borderTop')}}>
                                        <label >Top</label>
                                        <input type='radio' name='border' value={activeBorder} onChange={(e) => {setActiveBorder('borderTop')}} checked = {activeBorder == 'borderTop'}></input>
                                    </div>
                                    <div className = "borderTab"  onClick = {(e) => {setActiveBorder('borderBottom')}}>
                                        <label>Bottom</label>
                                        <input type='radio' name='border' value={activeBorder} onChange={(e) => {setActiveBorder('borderBottom')}} checked = {activeBorder == 'borderBottom'}></input>
                                    </div>
                                    <div className = "borderTab" onClick = {(e) => {setActiveBorder('borderLeft')}}>
                                        <label >Left</label>                            
                                        <input type='radio' name='border' value={activeBorder} onChange={(e) => {setActiveBorder('borderLeft')}} checked = {activeBorder == 'borderLeft'}></input>
                                    </div>
                                    <div className = "borderTab" onClick = {(e) => {setActiveBorder('borderRight')}}>
                                        <label >Right</label>
                                        <input type='radio' name='border' value={activeBorder} onChange={(e) => {setActiveBorder('borderRight')}} checked = {activeBorder == 'borderRight'}></input>
                                    </div>
                                </div>
                                {activeBorder == 'borderTop' && <div className='borderTop'>
                                    <div className='property'> 
                                        <div className='property-title'>Širina u pikselima</div>                    
                                        <input 
                                            className='property-input'
                                            type='number'
                                            min = {1}                    
                                            max = {100}                    
                                            value = {custom.border.borderTop.px}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderTop.px = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <div className='property'> 
                                        <div className='property-title'>Stil</div>                    
                                        <select 
                                            className='property-input'                                        
                                            value = {custom.border.borderTop.stil}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderTop.stil = e.target.value;
                                                return {...prev}
                                            }) }
                                        >
                                            <option value = 'solid'>solid</option>
                                            <option value = 'dashed'>dashed</option>
                                            <option value = 'dotted'>dotted</option>
                                            <option value = 'double'>double</option>
                                            <option value = 'groove'>groove</option>
                                            <option value = 'ridge'>ridge</option>
                                            <option value = 'outset'>outset</option>
                                            <option value = 'none'>none</option>
                                            <option value = 'hidden'>hidden</option>
                                        </select>
                                    </div>
                                    <div className='property'>
                                        <div className='property-title'>Boja</div>                     
                                        <input 
                                            className='property-input'
                                            type='color'                        
                                            value = {custom.border.borderTop.color}
                                            onChange={(e)=> setCustom((prev) => {
                                                
                                                prev.border.borderTop.color = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <button className= 'defaultBtn' onClick={(e) => {
                                        if(window.confirm('Da li ste sigurni da želite default podešavanje top bordera?')) {
                                            setCustom((prev) => {
                                                prev.border.borderTop.px = defaultSetup.border.borderTop.px;
                                                prev.border.borderTop.stil = defaultSetup.border.borderTop.stil;
                                                prev.border.borderTop.color = defaultSetup.border.borderTop.color;
                                                return {...prev}
                                            })
                                        }
                                        return
                                    }}
                                    >Default
                                    </button>
                                </div>}
                                {activeBorder == 'borderBottom' && <div className='borderBottom'>
                                    <div className='property'> 
                                        <div className='property-title'>Širina u pikselima</div>                    
                                        <input 
                                            className='property-input'
                                            type='number'
                                            min = {1}                    
                                            max = {100}                    
                                            value = {custom.border.borderBottom.px}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderBottom.px = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <div className='property'> 
                                        <div className='property-title'>Stil</div>                    
                                        <select 
                                            className='property-input'                                        
                                            value = {custom.border.borderBottom.stil}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderBottom.stil = e.target.value;
                                                return {...prev}
                                            }) }
                                        >
                                            <option value = 'solid'>solid</option>
                                            <option value = 'dashed'>dashed</option>
                                            <option value = 'dotted'>dotted</option>
                                            <option value = 'double'>double</option>
                                            <option value = 'groove'>groove</option>
                                            <option value = 'ridge'>ridge</option>
                                            <option value = 'outset'>outset</option>
                                            <option value = 'none'>none</option>
                                            <option value = 'hidden'>hidden</option>
                                        </select>
                                    </div>
                                    <div className='property'>
                                        <div className='property-title'>Boja</div>                     
                                        <input 
                                            className='property-input'
                                            type='color'                        
                                            value = {custom.border.borderBottom.color}
                                            onChange={(e)=> setCustom((prev) => {
                                                
                                                prev.border.borderBottom.color = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <button className= 'defaultBtn' onClick={(e) => {
                                        if(window.confirm('Da li ste sigurni da želite default podešavanje bottom bordera?')) {
                                            setCustom((prev) => {
                                                prev.border.borderBottom.px = defaultSetup.border.borderBottom.px;
                                                prev.border.borderBottom.stil = defaultSetup.border.borderBottom.stil;
                                                prev.border.borderBottom.color = defaultSetup.border.borderBottom.color;
                                                return {...prev}
                                            })
                                        }
                                        return
                                    }}
                                    >Default
                                    </button>
                                </div>}
                                {activeBorder == 'borderLeft' && <div className='borderLeft'>
                                    <div className='property'> 
                                        <div className='property-title'>Širina u pikselima</div>                    
                                        <input 
                                            className='property-input'
                                            type='number'
                                            min = {1}                    
                                            max = {100}                    
                                            value = {custom.border.borderLeft.px}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderLeft.px = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <div className='property'> 
                                        <div className='property-title'>Stil</div>                    
                                        <select 
                                            className='property-input'                                        
                                            value = {custom.border.borderLeft.stil}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderLeft.stil = e.target.value;
                                                return {...prev}
                                            }) }
                                        >
                                            <option value = 'solid'>solid</option>
                                            <option value = 'dashed'>dashed</option>
                                            <option value = 'dotted'>dotted</option>
                                            <option value = 'double'>double</option>
                                            <option value = 'groove'>groove</option>
                                            <option value = 'ridge'>ridge</option>
                                            <option value = 'outset'>outset</option>
                                            <option value = 'none'>none</option>
                                            <option value = 'hidden'>hidden</option>
                                        </select>
                                    </div>
                                    <div className='property'>
                                        <div className='property-title'>Boja</div>                     
                                        <input 
                                            className='property-input'
                                            type='color'                        
                                            value = {custom.border.borderLeft.color}
                                            onChange={(e)=> setCustom((prev) => {
                                                
                                                prev.border.borderLeft.color = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <button className= 'defaultBtn' onClick={(e) => {
                                        if(window.confirm('Da li ste sigurni da želite default podešavanje left bordera?')) {
                                            setCustom((prev) => {
                                                prev.border.borderLeft.px = defaultSetup.border.borderLeft.px;
                                                prev.border.borderLeft.stil = defaultSetup.border.borderLeft.stil;
                                                prev.border.borderLeft.color = defaultSetup.border.borderLeft.color;
                                                return {...prev}
                                            })
                                        }
                                        return
                                    }}
                                    >Default
                                    </button>
                                </div>}
                                {activeBorder == 'borderRight' && <div className='borderRight'>
                                    <div className='property'> 
                                        <div className='property-title'>Širina u pikselima</div>                    
                                        <input 
                                            className='property-input'
                                            type='number'
                                            min = {1}                    
                                            max = {100}                    
                                            value = {custom.border.borderRight.px}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderRight.px = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <div className='property'> 
                                        <div className='property-title'>Stil</div>                    
                                        <select 
                                            className='property-input'                                        
                                            value = {custom.border.borderRight.stil}
                                            onChange={(e)=> setCustom((prev) => {
                                                prev.border.borderRight.stil = e.target.value;
                                                return {...prev}
                                            }) }
                                        >
                                            <option value = 'solid'>solid</option>
                                            <option value = 'dashed'>dashed</option>
                                            <option value = 'dotted'>dotted</option>
                                            <option value = 'double'>double</option>
                                            <option value = 'groove'>groove</option>
                                            <option value = 'ridge'>ridge</option>
                                            <option value = 'outset'>outset</option>
                                            <option value = 'none'>none</option>
                                            <option value = 'hidden'>hidden</option>
                                        </select>
                                    </div>
                                    <div className='property'>
                                        <div className='property-title'>Boja</div>                     
                                        <input 
                                            className='property-input'
                                            type='color'                        
                                            value = {custom.border.borderRight.color}
                                            onChange={(e)=> setCustom((prev) => {
                                                
                                                prev.border.borderRight.color = e.target.value;
                                                return {...prev}
                                            }) }
                                        ></input>
                                    </div>
                                    <button className= 'defaultBtn' onClick={(e) => {
                                        if(window.confirm('Da li ste sigurni da želite default podešavanje right bordera?')) {
                                            setCustom((prev) => {
                                                prev.border.borderRight.px = defaultSetup.border.borderRight.px;
                                                prev.border.borderRight.stil = defaultSetup.border.borderRight.stil;
                                                prev.border.borderRight.color = defaultSetup.border.borderRight.color;
                                                return {...prev}
                                            })
                                        }
                                        return
                                    }}
                                    >Default
                                    </button>
                                </div>
                                }
                        </div>
                        <div className='section sectionBorderRadius'>
                            <div className='sectionTitle-title'>Border radijus (%)</div>
                            <div
                                className='property'
                            >
                                <div className='property-title'>Gore levo</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value = {custom.border.borderRadius.topLeft}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.border.borderRadius.topLeft = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div> 
                            <div
                                className='property'
                            >
                                <div className='property-title'>Gore desno</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value = {custom.border.borderRadius.topRight}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.border.borderRadius.topRight = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div> 
                            <div
                                className='property'
                            >
                                <div className='property-title'>Dole desno</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value = {custom.border.borderRadius.bottomRight}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.border.borderRadius.bottomRight = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div> 
                            <div
                                className='property'
                            >
                                <div className='property-title'>Dole levo</div>
                                <input 
                                    className='property-input'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value = {custom.border.borderRadius.bottomLeft}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.border.borderRadius.bottomLeft = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
                            <button className= 'defaultBtn' onClick={(e) => {
                                if(window.confirm('Da li ste sigurni da želite default podešavanje border radijusa?')) {
                                    setCustom((prev) => {
                                        prev.border.borderRadius.topLeft = defaultSetup.border.borderRadius.topLeft;
                                        prev.border.borderRadius.topRight = defaultSetup.border.borderRadius.topRight;
                                        prev.border.borderRadius.bottomRight = defaultSetup.border.borderRadius.bottomRight;
                                        prev.border.borderRadius.bottomLeft = defaultSetup.border.borderRadius.bottomLeft;
                                        return {...prev}
                                    })
                                }
                                return
                            }}
                            >Default
                            </button>
                        </div>
                        <div
                            className='section sectionArticle'
                        >
                            <div className='sectionArticle-title'>Izgled članka</div>
                            <div className='property'>
                                <div className='property-title'>
                                    <span>Boja pozadine članka</span>
                                    <input 
                                        type='checkbox' 
                                        checked = {custom.article.background.isActive}
                                        value = {custom.article.background.isActive} 
                                        onChange={(e)=> setCustom((prev) => {
                                            prev.article.background.isActive = !prev.article.background.isActive;
                                            return {...prev}
                                    }) }
                                    >    
                                    </input>
                                </div>        
                                
                                <input 
                                    className='property-input'
                                    style={{visibility: custom.article.background.isActive? 'visible' : 'hidden'}}
                                    type='color' 
                                    value = {custom.article.background.color}
                                    onChange={(e)=> setCustom((prev) => {
                                        prev.article.background.color = e.target.value;
                                        return {...prev}
                                    }) }
                                ></input>
                            </div>
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
                                <div className='property-title'>Boja pozadine Pročitaj</div>                    
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
                            <button className= 'defaultBtn' onClick={(e) => {
                                if(window.confirm('Da li ste sigurni da želite default podešavanje izgleda članka?')) {
                                    setCustom((prev) => {
                                        prev.article.title.color = defaultSetup.article.title.color;
                                        prev.article.supertitle.background[1] = defaultSetup.article.supertitle.background[1];
                                        prev.article.supertitle.background[2] = defaultSetup.article.supertitle.background[2];
                                        prev.article.supertitle.deg = defaultSetup.article.supertitle.deg;
                                        prev.article.supertitle.color = defaultSetup.article.supertitle.color ;
                                        prev.article.subtitle.show = defaultSetup.article.subtitle.show;
                                        prev.article.subtitle.color = defaultSetup.article.subtitle.color;
                                        prev.article.readMore.show = defaultSetup.article.readMore.show ;
                                        prev.article.readMore.color = defaultSetup.article.readMore.color ;
                                        prev.article.readMore.background = defaultSetup.article.readMore.background;

                                        return {...prev}
                                    })
                                }
                                return
                            }}
                            >Default
                            </button>                  
                        </div>
                    </div>
                </div>
                <button 
                    className='custom-default'
                    onClick={(e) => {
                        
                        if(window.confirm(`Da li ste sigurni da želite default podešavanje cele sekcije custom${index}`)) {
                            setCustom(defaultSetup);
                        }
                        return
                    }}
                >Default <strong>custom{index}</strong>
                </button>
        
                <div 
                    className='custom-preview'
                    style={{
                        borderTop: `${custom.border.borderTop.px}px ${custom.border.borderTop.stil} ${custom.border.borderTop.color}`,
                        borderBottom: `${custom.border.borderBottom.px}px ${custom.border.borderBottom.stil} ${custom.border.borderBottom.color}`,
                        borderLeft: `${custom.border.borderLeft.px}px ${custom.border.borderLeft.stil} ${custom.border.borderLeft.color}`,
                        borderRight: `${custom.border.borderRight.px}px ${custom.border.borderRight.stil} ${custom.border.borderRight.color}`,
                        borderRadius: `${custom.border.borderRadius.topLeft}% ${custom.border.borderRadius.topRight}% ${custom.border.borderRadius.bottomLeft}% ${custom.border.borderRadius.bottomRight}%`
                    }}
                >
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
                                background: custom.article.background.isActive? custom.article.background.color : 'none',
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
                                    padding: custom.body.count == 1? '1em 1em 1em 2em' : (custom.article.background.isActive? `1.5em 1.5em 1.5em 1.5em` : `1em 1em 1em 0em` )  ,
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