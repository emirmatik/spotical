import React from 'react';
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai"

function Nav() {
    return (
        <nav>
            <h1 id='logo'>Spotical</h1>
            <div>
                <a href="https://github.com/emirmatik" className="nav-icon" target="_blank"><AiFillGithub /></a>
                <a href="https://twitter.com/MatikEmir" className="nav-icon" target="_blank"><AiOutlineTwitter /></a>
            </div>
        </nav>
    )
}


export default Nav;