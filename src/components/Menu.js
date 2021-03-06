import React, { useState } from 'react';
import './Menu.scss'

function Menu({ background, hoverBackground, linkColor, navLinks, logo }) {
    const [ navOpen, setNavOpen ] = useState(0)
    const [ hoverIndex, setHoverIndex ] = useState(-1)
    return (
        <nav
            className="responsive-toolbar"
            style={{ background: background }}>
            <ul
                style={{ background: background }}
                className={ navOpen ? 'active' : '' }
            >
                {/* <figure className="image-logo" onClick={ () => { setNavOpen(!navOpen) } }>
                    <img src={ logo } height="40px" width="40px" alt="toolbar-logo" />
                </figure> */}
                { navLinks.map((link, index) => 
                    <li
                        key={ index }
                        onMouseEnter={ () => { setHoverIndex(index) } }
                        onMouseLeave={ () => { setHoverIndex(-1) } }
                        style={{ background: hoverIndex === index ? (hoverBackground || '#999') : '' }}
                    >
                        <a
                            href={link.path}
                            style={{ color: linkColor }}
                        >   { link.text }
                            <span className="material-icons" >{ link.icon }</span>
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Menu