import React from 'react';
import {db} from "./firebase"
const MyContext = React.createContext();

class ContextClass extends React.Component {
    state = {
        loading: true,
        duration: 0,
        volume: 0,
        pickedMusic: null,
        interval: null,
        openSide: true,
        isPlaying: false,
        shuffle: false,
        repeat: false,
        musics: [],
    }

    componentDidMount() {
        let m = [];
        db.collection("musics").onSnapshot(snap => {
            m = [];
            let lastMusic = JSON.parse(localStorage.getItem("last-music"));
            snap.forEach(doc => {
                m.push({...doc.data(), id: doc.id})
            })
            this.setState({musics: m.sort((a,b) => a.index - b.index), pickedMusic: lastMusic ? m[lastMusic.index] : m[0], duration: lastMusic ? lastMusic.duration : 0, volume: lastMusic ? lastMusic.volume : 100, loading: false})
            console.log(m);
        });
    }

    // pick random index for shuffle play
    pickRandomIndex = () => {
        let randomIndex = Math.floor(Math.random() * this.state.musics.length)
        return randomIndex === this.state.pickedMusic.index ? this.pickRandomIndex() : randomIndex;
    }
    
    componentDidUpdate() {
        localStorage.setItem("last-music", JSON.stringify({index: this.state.pickedMusic ? this.state.pickedMusic.index : 0, volume: this.state.volume, duration: this.state.duration}));
        if (this.state.duration >= this.state.pickedMusic.duration) {
            let index = this.state.shuffle ? this.pickRandomIndex() : this.state.pickedMusic.index + 1 === this.state.musics.length ? 0 : this.state.pickedMusic.index + 1;
            if (this.state.repeat) index = this.state.pickedMusic.index; // if repeat music bttn is activated
            this.changeMusic(this.state.musics[index]);
            this.setState({duration: 0})
        }
    }

    // play the music
    playMusic = () => {
        let music = document.querySelector("#besmt");
        music.currentTime = this.state.duration;
        music.volume = this.state.volume / 100;
        music.play();
        this.setState({ interval: setInterval(() => this.setState({duration: Math.ceil(music.currentTime)}),100),isPlaying: true}); 
  }

    // pause the music
    stopMusic = () => {
        let music = document.querySelector("#besmt");
        music.pause();
        clearInterval(this.state.interval);
        this.setState({interval: null,isPlaying: false});
    }

    // changing the music volume with slider
    changeVolume = (e, newValue) => {
        let music = document.querySelector("#besmt");
        music.volume = newValue / 100
        this.setState({volume: newValue})
    }

    // changing the duration with slider
    changeDuration = (e, newValue) => {
        let music = document.querySelector("#besmt");
        music.currentTime = newValue;
        this.setState({duration: newValue})
    }

    // change the music when click on one
    changeMusic = (music) => {
        let curmusic = document.querySelector("#besmt");
        this.setState({pickedMusic: music})
        curmusic.src = music.src;
        curmusic.volume = this.state.volume / 100;
        curmusic.play().then(res => curmusic.play()).catch(err => curmusic.play());
        clearInterval(this.state.interval);
        this.setState({interval: setInterval(() => this.setState({duration: Math.ceil(curmusic.currentTime)}),100), isPlaying: "true"}); 
    }

    likeMusic = () => {
        let musicInDb = db.collection("musics").doc(this.state.pickedMusic.id);
        musicInDb.update("likes", this.state.pickedMusic.likes+1);
    }

    changeState = (val) => {
        this.setState(val);
    }

    render() {
       return (
           <MyContext.Provider value={{...this.state,
            changeState: (val) => this.changeState(val), 
             play: this.playMusic,
             stop: this.stopMusic,
             randomIndex: this.pickRandomIndex,
             changeDuration: this.changeDuration,
             changeMusic: this.changeMusic,
             likeMusic: this.likeMusic,
             changeVolume: this.changeVolume}}>
                {this.props.children}
           </MyContext.Provider>
           ) 
    }
}

export {MyContext, ContextClass};