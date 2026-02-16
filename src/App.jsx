import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

// THE "BỰA" MESSAGES
const WISHES = {
  "default": {
    id: "default",
    to: "Người Anh/Chị/Em Thiện Lành",
    msg: "Năm mới bớt tạo nghiệp, sống healthy, tiền đầy ví. OK chưa?"
  },
  "bch": {
    id: "bch",
    to: "Các Đồng chí Ban Chấp Hành",
    msg: "Chúc các đồng chí năm mới gánh team còng lưng. Deadline là dĩ vãng!"
  },
  "lucky": {
    id: "lucky",
    to: "Chính béu",
    msg: "Chúc mừng năm mới! Chúc béo luôn may mắn, luôn khỏe mạnh, luôn vui vẻ."
  },
  "mom": {
    id: "mom",
    to: "Mẹ iu",
    msg: "Chúc mừng năm mới! Chúc chúng ta sớm thoát kiếp nạn này. Nếu không thoát được thì... kệ."
  },
  "sis": {
    id: "sis",
    to: "Mèo méo meo mèo meo",
    msg: "Chúc mừng năm mới! Chúc chúng ta sớm thoát kiếp nạn này. Nếu không thoát được thì... kệ."
  }
};

// THE GAME RESULTS (MEME STYLE)
const CARD_RESULTS = [
  {
    type: 'health',
    title: 'SỨC KHỎE VÔ ĐỊCH',
    emoji: '💪',
    desc: 'Bất tử! Deadline tuổi tôm. Gánh cả thế giới trên vai.',
    memeImage: 'https://res.cloudinary.com/ducrwqhit/image/upload/v1771234502/dog_b4rya7.gif' // Replace with your meme image URL
  },
  {
    type: 'wealth',
    title: 'TIỀN NHƯ NƯỚC',
    emoji: '🤑',
    desc: 'Stonks 📈. Tiền vào như nước sông Đà, tiền ra nhỏ giọt như cà phê phin.',
    memeImage: 'https://res.cloudinary.com/ducrwqhit/image/upload/v1771234503/stonkk_cnmjto.gif' // Replace with your meme image URL
  },
  {
    type: 'love',
    title: 'TÌNH DUYÊN TỚI CẢN KO KỊP',
    emoji: '❤️🔥',
    desc: 'Năm nay có tình yêu. Không nói nhiều.',
    memeImage: 'https://res.cloudinary.com/ducrwqhit/image/upload/v1771234502/love_sddgm3.gif' // Replace with your meme image URL
  }
];

function App() {
  const [currentWish, setCurrentWish] = useState(WISHES.default);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Read query parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id && WISHES[id]) {
      setCurrentWish(WISHES[id]);
    }
  }, []);

  const handleCardFlip = (index) => {
    // Only allow clicking if NO cards have been flipped yet
    if (flippedCards.length > 0) return;

    setFlippedCards([index]);
    setSelectedCard(CARD_RESULTS[index]);

    // CONFETTI EXPLOSION!!!
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#FFFF00', '#000000']
    });

    // Show popup after 1500ms
    setTimeout(() => {
      setShowPopup(true);
    }, 1500);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setFlippedCards([]);
    setSelectedCard(null);
    setShowPopup(false);
  };

  const handleReset = () => {
    setGameStarted(false);
    setFlippedCards([]);
    setSelectedCard(null);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="container">
      {/* HEADER - BRUTALIST STYLE */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="header"
      >
        <h1 className="header-title">
          CHÚC TẾT 2026
        </h1>
      </motion.div>

      {/* GAME SECTION */}
      {!gameStarted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="start-screen"
        >
          <button
            onClick={handleStartGame}
            className="btn btn-primary"
          >
            🎮 BẮT ĐẦU CHƠI
          </button>
          <p className="start-instruction">
            ↑ Bấm để rút lộc đầu năm! ↑
          </p>
        </motion.div>
      ) : (
        <>
          {/* CARD GRID */}
          <div className="card-grid">
            {CARD_RESULTS.map((card, index) => (
              <motion.div
                key={index}
                className={`card-wrapper perspective-1000 ${flippedCards.length > 0 && !flippedCards.includes(index) ? 'disabled' : ''}`}
                whileHover={flippedCards.length === 0 || flippedCards.includes(index) ? { scale: 1.05 } : {}}
                whileTap={flippedCards.length === 0 ? { scale: 0.95 } : {}}
              >
                <motion.div
                  className="card-inner"
                  animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => handleCardFlip(index)}
                >
                  {/* FRONT SIDE */}
                  <div className="card-front backface-hidden">
                    <div className="card-emoji">❓</div>
                    <p className="card-title">
                      RÚT LÁ #{index + 1}
                    </p>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="card-back backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="card-emoji">{card.emoji}</div>
                    <h3 className="card-title">
                      {card.title}
                    </h3>
                    <p className="card-desc">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* RESULT DISPLAY - BIG & BRUTAL */}
          {selectedCard && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="result-display"
            >
              <div className="result-image-wrapper">
                <img
                  src={selectedCard.memeImage}
                  alt={selectedCard.title}
                  className="result-meme-image"
                />
              </div>
              <h2 className="result-title">
                {selectedCard.title}
              </h2>
              <p className="result-desc">
                {selectedCard.desc}
              </p>
            </motion.div>
          )}

          {/* RESET BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleReset}
              className="btn btn-secondary"
            >
              🔄 ĐÁ VÍA
            </button>
            {selectedCard && (
              <button
                onClick={handleOpenPopup}
                className="btn btn-secondary"
              >
                📜 XEM LỜI CHÚC
              </button>
            )}
          </div>
        </>
      )}

      {/* FOOTER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="footer"
      >
        <div className="footer-box">
          <p className="footer-text">
            Made with MS Paint vibes 🎨
          </p>
          <p className="footer-text-alt">
            windows95.exe has stopped working
          </p>
        </div>
      </motion.div>

      {/* WINDOWS 95 POPUP */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="popup-overlay"
          onClick={handleClosePopup}
        >
          <motion.div
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            className="popup-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-header">
              <span className="popup-title">SYSTEM_NOTIFICATION.exe</span>
              <button className="popup-close" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup-body">
              <div className="popup-icon">🎊</div>
              <div className="popup-to">
                GỬI: {currentWish.to}
              </div>
              <div className="popup-message">
                {currentWish.msg}
              </div>
            </div>
            <div className="popup-footer">
              <button className="popup-button" onClick={handleClosePopup}>
                OK (ĐÃ XEM)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
