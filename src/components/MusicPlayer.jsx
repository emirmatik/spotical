import React, { useEffect, useState } from 'react';
import { MyContext } from '../context';
import Controller from "./Controller"
import { motion } from "framer-motion";
import { right_container_variants } from "./animation-variants";
import { AiFillLike } from "react-icons/ai"

function MusicPlayer() {
    // const [containerW, setContainerW] = useState("none");
    const { isPlaying, pickedMusic, openSide, likeMusic } = React.useContext(MyContext);

    // useEffect(() => {
    //     if (window.innerWidth > 1440) setContainerW(900)
    //     else if (window.innerWidth <= 1440) setContainerW(750)
    //     else if (window.innerWidth <= 1024) setContainerW(500)
    //     else setContainerW(null);

    // }, [window.innerWidth])

    // const containerW = () => {
    //     if (window.innerWidth <= 800) return null
    //     if (window.innerWidth <= 1024) return 500
    //     if (window.innerWidth <= 1440) return 750
    //     else return 900;
    // }

    const plackAnimation = {
        run: { scale: [1, 1.04, 1] },
        stop: { scale: [1, 1, 1] }
    }

    return (
        <motion.div animate={openSide ? 'open' : 'closed'}
            variants={right_container_variants}
            // custom={containerW()}
            className="music-player-container">
            <div className="music-player-container-upper">
                <div className="current-music-div">
                    <motion.div className="music-photo"
                        animate={isPlaying ? 'run' : 'stop'}
                        variants={plackAnimation}
                        transition={{ duration: .5, repeatDelay: 1, loop: Infinity }}
                    >
                        <div className="music-photo-border"></div>
                        <img src={pickedMusic && pickedMusic.cover} />
                    </motion.div>
                    <h3 className="music-name">{pickedMusic && pickedMusic.showname}</h3>
                </div>
                <div className="side-bar">
                    <div className="like-div">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <AiFillLike onClick={likeMusic} className="like-btn" />
                        </motion.div>
                        <p>{pickedMusic && pickedMusic.likes}</p>
                    </div>
                </div>
            </div>
            <Controller />
        </motion.div>
    )
}


export default MusicPlayer;