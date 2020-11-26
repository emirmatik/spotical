import React from 'react';
import { MyContext } from '../context';
import { FaPlay, FaPause } from "react-icons/fa"
import { MdSkipPrevious, MdSkipNext } from "react-icons/md"
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs"
import { motion } from "framer-motion";

const flexStyle = {
    display: "flex",
    alignItems: "center"
}

function MusicPlayer() {
    const { musics, duration, interval, volume, play, stop, changeVolume, changeMusic, changeDuration, pickedMusic } = React.useContext(MyContext);
    let currTime = `${duration / 60 < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)}:${duration % 60 < 10 ? "0" + duration % 60 : duration % 60}`;
    let totalTime = pickedMusic && `${pickedMusic.duration / 60 < 10 ? '0' + Math.floor(pickedMusic.duration / 60) : Math.floor(pickedMusic.duration / 60)}:${pickedMusic.duration % 60 < 10 ? "0" + pickedMusic.duration % 60 : pickedMusic.duration % 60}`;

    const playPrevMusic = () => {
        let prevIndex = duration > 10 ? pickedMusic.index : pickedMusic.index - 1 === -1 ? musics.length - 1 : pickedMusic.index - 1;
        changeMusic(musics[prevIndex])
    }

    const playNextMusic = () => {
        let nextIndex = pickedMusic.index + 1 === musics.length ? 0 : pickedMusic.index + 1;
        changeMusic(musics[nextIndex])
    }

    return (
        <div className="music-controller">
            <div className="upper-controller">
                <h3 id="duration-text">{currTime} / {totalTime}</h3>
                <div style={flexStyle}>
                    <MdSkipPrevious onClick={playPrevMusic} id="music-prev-next-btn" />
                    {interval ? <FaPause id="music-play-btn" onClick={stop} /> : <FaPlay id="music-play-btn" onClick={play} />}
                    <MdSkipNext onClick={playNextMusic} id="music-prev-next-btn" />
                </div>
                <div id="volume-div" style={flexStyle}>
                    {volume == 0 ? <BsFillVolumeMuteFill id="volume-icon" /> : volume > 75 ? <BsFillVolumeUpFill id="volume-icon" /> : <BsFillVolumeDownFill id="volume-icon" />}
                    <input type="range" id="volume" defaultValue="100" onInput={changeVolume} />
                </div>
            </div>
            <input id="duration-controller" type="range" value={duration} max={pickedMusic && pickedMusic.duration} onInput={changeDuration} />
        </div>
    )
}


export default MusicPlayer;