import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './Music.css';

function Music() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-page">
      <div className="pixel-bg"></div>
      <div className="music-notes"></div>
      
      <div className="music-content">
        <h1 className="pixel-title small-title">Dedicated Song</h1>
        
        <div className="music-player">
          <div className="album-art">
            <img src="/1.jpg" alt="My Chinie" className="album-image" onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
            }} />
            <div className="vinyl-effect"></div>
          </div>

          <div className="song-info">
            <h2 className="song-title">Kalapastanganan</h2>
            <p className="artist-name">Fitterkarma</p>
          </div>

          <div className="player-controls">
            <button className="pixel-play-button" onClick={togglePlay}>
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>

          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration > 0 ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="progress-bar"
            />
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          <audio ref={audioRef} src="/music.mp3" />
        </div>

        <div className="music-message">
          <p className="message-text">Hi my Chinie,</p>
          
          <p className="message-text">
            I keep thinking about the song "Kalapastanganan" by Fitterkarma, and somehow it reminds me of how I feel about you. There's a line that says "kalapastangan ang 'di ka ibigin" and for me, it means that loving you isn't a choice I think about… it just happens. Naturally. Honestly. Every day.
          </p>
          
          <p className="message-text">
            The song talks about devotion—yung tipong kahit malayo, kahit hindi kita nakikita araw-araw, the feeling stays deep. Parang gano'n ka sa'kin. Loving you feels like something sacred, something I don't want to take lightly or ever disrespect.
          </p>
          
          <p className="message-text">
            There's a line that goes "umaawit ang mga anghel ng makasama kita" and I imagine that every time I think of you. Even from far away, it feels like the universe itself is singing because of you. I wish I could be there beside you, but knowing you're there, safe and happy, already fills me with peace.
          </p>
          
          <p className="message-text">
            When the song uses words like heaven and prayers, I don't hear exaggeration. I hear longing. Because sometimes, just imagining your smile, your laugh, your presence… it feels like heaven already. And not thinking of you? That would feel wrong. Like denying something true.
          </p>
          
          <p className="message-text">
            Since July 19, 2023, you've been part of my everyday thoughts, my calm, and my courage even from miles apart. This isn't obsession, it's appreciation. This isn't drama, it's sincerity. If loving you fully is called kalapastanganan, then I'll gladly commit it because you're worth every bit of my heart, no matter the distance.
          </p>
          
          <p className="message-text highlight-text">
            Happy Valentine's, my Chinie. Someday soon, we'll share all these moments in person. Until then, it's always you in my heart
          </p>
          
          <p className="message-text highlight-text">— Fred</p>
        </div>

        <button 
          className="pixel-button continue-button pulse"
          onClick={() => navigate('/question')}
        >
          CONTINUE →
        </button>
      </div>
    </div>
  );
}

export default Music;
