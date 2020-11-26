import React, { useState } from 'react';
import { MyContext } from '../context';
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { container_variants, item_div_variants, item_variants } from "./animation-variants";

function SideList() {
    const { musics, changeMusic, openSide, pickedMusic, changeState } = React.useContext(MyContext);

    return (
        <motion.div className="sidelist-container">
            <motion.div
                animate={openSide ? 'open' : 'closed'}
                className="sidelist"
                variants={container_variants}>

                <motion.h2 variants={item_variants} id='side-list-header'>Musics</motion.h2>
                <motion.hr variants={item_variants} />
                <motion.div variants={item_div_variants} id="sidelist-music-list">
                    {musics.map((music, i) => (
                        <motion.div
                            variants={item_variants}
                            whileTap={{ scale: 0.98 }}
                            key={i}
                            onClick={() => changeMusic(music)}
                            style={{ background: pickedMusic && pickedMusic.showname == music.showname && "rgb(230, 230, 230)" }}
                            className="sidelist-music">
                            <motion.div className="sidelist-music-cover">
                                <img alt="littcover" src={music.littleCover} />
                            </motion.div>
                            <motion.p className="sidelist-music-name">{music.showname.length > 40 ? music.showname.slice(0, 40) + ".." : music.showname}</motion.p>
                        </motion.div>
                    ))}
                </motion.div>
                <div onClick={() => changeState({ openSide: !openSide })} id="close-side-list">{openSide ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}</div>

            </motion.div>

        </motion.div>
    )
}


export default SideList;