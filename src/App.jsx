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
    msg: `Chúng ta đang ở độ tuổi (gần như) đẹp nhất đời người vì chúng ta còn được mơ và hy vọng. Vì thế, mình chúc tất cả các thành viên của BCH một năm 2026 có đủ năng lượng để theo đuổi những ước mơ và hoài bão của mình: Đó có thể là ghi danh vào bảng vàng thành tích Học sinh giỏi, là trở thành một Debater không ngại var bất kỳ topic nào, là thi đỗ NV1 THPTQG, là đạt aim IELTS và SAT, là được trải nghiệm và thử thách bản thân bằng cách bước ra khỏi vùng an toàn. Dù là gì đi chăng nữa, vẫn xin chúc các bạn:
    
    Chân cứng đá mềm! Mã đáo thành công!
    
    Bonus: Mong deadline BCH sẽ nhẹ tay với mọi người (do deadline BCH chứ ko phải do mình nhé hihi)`
  },
  "lucky": {
    id: "lucky",
    to: "Chính béu",
    msg: `Chính ơi tui ko gay, nhưng mà ôg là người bạn tuyệt vời nhất C3 tui.
    
    Chúc ôg năm mới sức khỏe như ngựa 🏇🐴🐎🎠 để đánh bay deadline của cả BCH, VTDC, 12 Tin, và Tổ 1 nữa nha.
    
    Chúc ôg sẽ tìm được hướng đi, ngôi trường, và ngành học phù hợp với mình.
    
    Chúc ôg thi HSG phục thù thành công.
    
    Chúc ôg thi THPTQG đậu THỦ KHOA (cứ gáy đi cho có lực ba).
    
    Chúc tui năm mới ko báo ôg.
    
    Hết.
    
    À, chúc ôg (ko) có bồ (thể theo nguyện vọng của ôg). Và chúc ôg vẫn sẽ bị tui làm phiền tới mấy năm sau kakaka.`
  },
  "mom": {
    id: "mom",
    to: "Mẹ iu",
    msg: "Kaka mẹ ơi, cuối năm nay là con đi du học rồi đấy. Nên mẹ phải yêu bản thân mẹ nhìu hơn thui (thật ra giờ cũng cũng rùi đó nhưng mà hơn nữa hehe). Chúc mẹ năm mới vẫn trẻ mãi ko già, nhìu tiền để đi skincare và spa, ko phải lo nghĩ nữa nha. (Chúc luôn bạn Nhân khi đi du học sẽ kiếm được việc làm thêm ngon ngon để ko cần mẹ iu chu cấp thêm nè). Chúc mẹ sức khoẻ dồi dào, có sức tập thể dục mỗi ngày, có sức đi hát cho nhau nghe nhiều nhiều nữa nha. Chúc tình duyên của mẹ thật thuận lợi, cũng đến lúc yên bề gia thất rùi hì, mong cho lần này mẹ sẽ chọn đúng người, người ấy sẽ thấu hiểu mẹ hơn. À và chúc mẹ sắm được nhìu vàng hơn và sớm có phòng karaoke riêng nữa nha hehehe."
  },
  "sis": {
    id: "sis",
    to: "Mèo méo meo mèo meo",
    msg: `Hmmmmmmmmmmmmm.
    
    Mình nghĩ thời gian qua mèo đã tìm được bình yên trong tâm hồn ròi. Chị đã bị tư bản bóc lột và giờ đã đỡ lo âu, nhạy cảm hơn, mạnh mẽ hơn. Giỏi quá hehe. Vậy nên mình chúc chị mèo năm mới sẽ tìm được... bản ngã? hình mẫu? định hướng?... của đời mình nha. Nói đơn giản thì nó là một cái gì đó mà chị My mong muốn trở thành. Nó vừa là động lực thúc đẩy chị My, mà cũng là nguồn chính đem lại hạnh phúc và sự bình yên lớn nhất cho chị My. Thật ra nó ko cần phải lớn lao đâu meo meo, với nhiều người đó có thể là đi khắp năm châu bốn bể, nhưng với nhiều người đó chỉ là kiếm đủ tiền để có thể thích gì thì mua ăn. Nhưng quan trọng là mèo hiểu được nó, để hiểu hơn về bản thân mình nhen. Mèo ko cần tìm ra ngay á, mà hãy cứ tiếp tục trải nghiệm, đi đây đi đó, làm này làm kia, thử cái ni thử cái nọ, từ từ mèo sẽ hiểu đó.
    
    Bonus: Meow miaow mew mieoo miao. Meoowowo. Miaooowowo. O (Lời nhắn đã được dịch sang tiếng mèo).`
  },
  "bdh": {
    id: "bdh",
    to: "Bộ 5 siêu nhân và thầy Đình Trung phong độ và cô Khánh Hà xinh gái thuộc Ban Điều Hành",
    msg: `Chân thành đa tạ và cảm kích Ban Điều Hành năm vừa qua đã gồng gánh nhau đi qua phong ba bão táp.
    
    Kính chúc các anh chị em, thầy Trung và cô Khánh Hà năm mới tràn đầy sức khỏe và tinh thần lực để hoạt động Ban Chấp hành tới đây sẽ càng bùng cháyyyyy 🐎🏇🔥❤️‍🔥🐦‍🔥🧨`
  },
  "12tin": {
    id: "12tin",
    to: "Tồ 12 Tin",
    msg: "Chúc anh em chọn được ngành và trường phù hợp, thi đậu NV1, dù có học phụ hồ thì cũng là thằng phụ hồ giàu nhất khu, dù có bỏ học đi cưới thì cũng cưới được phú bà/phú ông nhé."
  },
  "lop94": {
    id: "lop94",
    to: "Tồ 9.4",
    msg: "Ba năm trôi qua nhanh quá, giờ lại đều cuối cấp rồi. Chúc các bạn đều sẽ đậu vào trường và ngành học phù hợp với mình. Hẹn một ngày rất gần sẽ lại gặp nhau, trước khi lên ĐH nhé!"
  },
  "thaytrung": {
    id: "thaytrung",
    to: "Thầy Thái Hiếu Trung hát hay đẹp trai",
    msg: "Em chúc thầy Trung một năm mới bớt phiền lo, nhiều vô tư. Chúc cho gia đình thầy luôn đủ đầy, em nhỏ mau lớn, học giỏi. Chúc lớp thầy đạt nhiều giải HSG, ít vi phạm hơn, giữ top để thầy bù lại tiền lương ạa hehe."
  },
  "coquyen": {
    id: "coquyen",
    to: "Cô Quyên iu dấu",
    msg: "Em chúc cô Quyên một năm mới thật an yên, bớt phiền lo ạ hihi. Chúc cho những lứa học sinh của cô đều sẽ học hành chăm chỉ, sớm ngày đào tạo ra được thành viên đi xa hơn cả kỳ thi QGia ạ. Em chúc cả chị Nhím đi học, anh Phan đi làm thật suôn sẻ và thuận lợi, chân cứng đá mềm, mã đáo thành công ạ! 💗🥰"
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
            by digiLad 💝🤖
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
