import React, { useState, useEffect } from 'react';
import { MyContext } from '../context';
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { container_variants, item_div_variants, item_variants } from "./animation-variants";
import { AiFillLike } from "react-icons/ai"

const flexStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}

function SideList() {
    const { musics, changeMusic, openSide, pickedMusic, changeState } = React.useContext(MyContext)
    const [allMusics, setAllMusics] = useState(musics);

    useEffect(() => {
        setAllMusics(musics)
    }, [musics])

    const searchMusic = (e) => {
        let search = e.target.value;
        setAllMusics(musics.filter(m => m.showname.toLowerCase().includes(search.toLowerCase())))
    }

    return (
        <motion.div className="sidelist-container">
            <motion.div
                animate={openSide ? 'open' : 'closed'}
                className="sidelist"
                variants={container_variants}>

                <motion.div variants={item_variants} style={flexStyle}>
                    <h2 id='side-list-header'>Tracks</h2>
                    <input type="text" id="music-search" placeholder="Search.." onChange={searchMusic} />
                </motion.div>
                <motion.hr variants={item_variants} />
                <motion.div variants={item_div_variants} id="sidelist-music-list">
                    {allMusics.map((music, i) => (
                        <motion.div
                            variants={item_variants}
                            whileTap={{ scale: 0.98 }}
                            key={i}
                            onClick={() => changeMusic(music)}
                            // style={{ background: pickedMusic && pickedMusic.showname == music.showname && "rgb(230, 230, 230)" }}
                            // style={{ background: pickedMusic && pickedMusic.showname == music.showname && "#39393b" }}
                            className="sidelist-music">
                            <motion.div className="sidelist-music-cover">
                                <img alt="littcover" src={music && music.cover} />
                            </motion.div>
                            <motion.div className="sidelist-music-info">
                                <motion.p style={{ color: pickedMusic && pickedMusic.showname == music.showname && "#C076F8" }} className="sidelist-music-name">{music.showname.length > 32 ? music.showname.slice(0, 32) + ".." : music.showname}</motion.p>
                                <div className="sidelist-music-likeDiv">
                                    <AiFillLike />
                                    <p>{music.likes}</p>
                                </div>
                            </motion.div>

                        </motion.div>
                    ))}
                </motion.div>
                <div onClick={() => changeState({ openSide: !openSide })} id="close-side-list">{openSide ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}</div>

            </motion.div>

        </motion.div>
    )
}


export default SideList;