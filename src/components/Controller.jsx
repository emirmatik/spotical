import React from 'react';
import { MyContext } from '../context';
import { FaPlay, FaPause } from "react-icons/fa"
import { MdSkipPrevious, MdSkipNext } from "react-icons/md"
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs"
import { motion } from "framer-motion";
import { TiArrowShuffle } from "react-icons/ti"

const flexStyle = {
    display: "flex",
    alignItems: "center"
}

function MusicPlayer() {
    const { shuffle, musics, duration, interval, volume, play, stop, changeVolume, randomIndex, changeMusic, changeDuration, changeState, pickedMusic } = React.useContext(MyContext);
    let currTime = `${duration / 60 < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)}:${duration % 60 < 10 ? "0" + duration % 60 : duration % 60}`;
    let totalTime = pickedMusic && `${pickedMusic.duration / 60 < 10 ? '0' + Math.floor(pickedMusic.duration / 60) : Math.floor(pickedMusic.duration / 60)}:${pickedMusic.duration % 60 < 10 ? "0" + pickedMusic.duration % 60 : pickedMusic.duration % 60}`;

    const playPrevMusic = () => {
        let prevIndex = duration > 10 ? pickedMusic.index : shuffle ? randomIndex() : pickedMusic.index - 1 === -1 ? musics.length - 1 : pickedMusic.index - 1;
        changeMusic(musics[prevIndex])
    }

    const playNextMusic = () => {
        let nextIndex = shuffle ? randomIndex() : pickedMusic.index + 1 === musics.length ? 0 : pickedMusic.index + 1;
        changeMusic(musics[nextIndex])
    }

    return (
        <div className="music-controller">
            <div className="upper-controller">
                <div style={flexStyle}>
                    <h3 id="duration-text">{currTime} / {totalTime}</h3>
                    <TiArrowShuffle style={{ color: shuffle && "#175CC8" }} id="shuffle-btn" onClick={() => changeState({ shuffle: !shuffle })} />
                </div>
                <div style={flexStyle}>
                    <MdSkipPrevious onClick={playPrevMusic} id="music-prev-next-btn" />
                    {interval ? <FaPause id="music-play-btn" onClick={stop} /> : <FaPlay id="music-play-btn" onClick={play} />}
                    <MdSkipNext onClick={playNextMusic} id="music-prev-next-btn" />
                </div>
                <motion.div id="volume-div" style={flexStyle}>
                    {volume == 0 ? <BsFillVolumeMuteFill id="volume-icon" /> : volume > 75 ? <BsFillVolumeUpFill id="volume-icon" /> : <BsFillVolumeDownFill id="volume-icon" />}
                    <input type="range" id="volume" defaultValue="100" onInput={changeVolume} />
                </motion.div>
            </div>
            <input id="duration-controller" type="range" value={duration} max={pickedMusic && pickedMusic.duration} onInput={changeDuration} />
        </div>
    )
}


export default MusicPlayer;