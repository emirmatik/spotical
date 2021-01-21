import React from 'react';
import { MyContext } from '../context';
import { FaPlay, FaPause } from "react-icons/fa"
import { MdSkipPrevious, MdSkipNext } from "react-icons/md"
import { BsFillVolumeUpFill, BsArrowRepeat, BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs"
import { motion } from "framer-motion";
import { TiArrowShuffle } from "react-icons/ti"
import Slider from '@material-ui/core/Slider';

const flexStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

function MusicPlayer() {
    const { shuffle, repeat, musics, duration, interval, volume, play, stop, changeVolume, randomIndex, changeMusic, changeDuration, changeState, pickedMusic } = React.useContext(MyContext);
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
                <h3 id="duration-text">{currTime} / {totalTime}</h3>
                <div className="controller-btns-div" style={flexStyle}>
                    <TiArrowShuffle style={{ color: shuffle && "#C076F8" }} id="controller-btn" onClick={() => changeState({ shuffle: !shuffle })} />
                    <BsArrowRepeat style={{ color: repeat && "#C076F8" }} id="controller-btn" onClick={() => changeState({ repeat: !repeat })} />
                </div>
                <div className="stop-btns-div" style={flexStyle}>
                    <MdSkipPrevious onClick={playPrevMusic} id="music-prev-next-btn" />
                    {interval ? <FaPause id="music-play-btn" onClick={stop} /> : <FaPlay id="music-play-btn" onClick={play} />}
                    <MdSkipNext onClick={playNextMusic} id="music-prev-next-btn" />
                </div>
                <motion.div id="volume-div" style={flexStyle}>
                    {volume == 0 ? <BsFillVolumeMuteFill id="volume-icon" /> : volume > 75 ? <BsFillVolumeUpFill id="volume-icon" /> : <BsFillVolumeDownFill id="volume-icon" />}
                    <Slider id="volume" value={volume} onChange={changeVolume} aria-labelledby="continuous-slider" />
                </motion.div>
            </div>
            <Slider id="duration-controller" value={duration} max={pickedMusic && pickedMusic.duration} onChange={changeDuration} />
        </div>
    )
}

export default MusicPlayer;