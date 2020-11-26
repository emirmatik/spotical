import React, { useEffect } from 'react';
import { MyContext } from '../context';
import Controller from "./Controller"
import { motion } from "framer-motion";
import { right_container_variants } from "./animation-variants";

function MusicPlayer() {
    const { isPlaying, pickedMusic, openSide } = React.useContext(MyContext);


    const plackAnimation = {
        run: { scale: [1, 1.04, 1] },
        stop: { scale: [1, 1, 1] }
    }

    return (
        <motion.div animate={openSide ? 'open' : 'closed'}
            variants={right_container_variants}
            className="music-player-container">
            <motion.div className="music-photo"
                animate={isPlaying ? 'run' : 'stop'}
                variants={plackAnimation}
                transition={{ duration: .5, repeatDelay: 1, loop: Infinity }}
            >
                <img src={pickedMusic && pickedMusic.bigCover} />
            </motion.div>
            <h3 className="music-name">{pickedMusic && pickedMusic.showname}</h3>
            <Controller />
        </motion.div>
    )
}


export default MusicPlayer;