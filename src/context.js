import React from 'react';
import {db} from "./components/firebase"
const MyContext = React.createContext();

class ContextClass extends React.Component {
    state = {
        duration: 0,
        volume: 100,
        pickedMusic: null,
        interval: null,
        openSide: true,
        isPlaying: false,
        shuffle: false,
        musics: [],
    }

    componentDidMount() {
        let m = [];
        db.collection("musics").onSnapshot(snap => {
            m = [];
            snap.forEach(doc => {
                m.push(doc.data())
            })
            this.setState({musics: m.sort((a,b) => a.index - b.index), pickedMusic: m[0]})
        });
    }

    // pick random index for shuffle play
    pickRandomIndex = () => {
        let randomIndex = Math.floor(Math.random() * this.state.musics.length)
        return randomIndex === this.state.pickedMusic.index ? this.pickRandomIndex() : randomIndex;
    }
    
    componentDidUpdate() {
        if (this.state.duration >= this.state.pickedMusic.duration) {
            let index = this.state.shuffle ? this.pickRandomIndex() : this.state.pickedMusic.index + 1 === this.state.musics.length ? 0 : this.state.pickedMusic.index + 1;
            this.changeMusic(this.state.musics[index]);
            this.setState({duration: 0})
        }
    }

    // play the music
    playMusic = () => {
      let music = document.querySelector("#besmt");
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
    changeVolume = (e) => {
        let music = document.querySelector("#besmt");
        music.volume = e.target.value / 100
        this.setState({volume: e.target.value})
    }

    // changing the duration with slider
    changeDuration = (e) => {
        let music = document.querySelector("#besmt");
        music.currentTime = e.target.value;
        this.setState({duration: e.target.value})
    }


    // change the music when click on one
    changeMusic = (music) => {
        let curmusic = document.querySelector("#besmt");
        this.setState({pickedMusic: music})
        curmusic.src = music.src;
        curmusic.play().then(res => curmusic.play()).catch(err => curmusic.play());
        clearInterval(this.state.interval);
        this.setState({interval: setInterval(() => this.setState({duration: Math.ceil(curmusic.currentTime)}),100), isPlaying: "true"}); 
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
             changeVolume: this.changeVolume}}>
                {this.props.children}
           </MyContext.Provider>
           ) 
    }
}

export {MyContext, ContextClass};