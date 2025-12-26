document.addEventListener('DOMContentLoaded', function() {
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const nextYearElement = document.getElementById('next-year');
    const currentYearElement = document.getElementById('current-year');
    const progressFillElement = document.getElementById('progress-fill');
    const progressTextElement = document.getElementById('progress-text');
    const celebrateBtn = document.getElementById('celebrate-btn');
    const fireworkSound = document.getElementById('firework-sound');
    const snowflakesContainer = document.getElementById('snowflakes');

    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
    nextYearElement.textContent = currentYear + 1;

    function createSnowflakes() {
        for (let i = 0; i < 50; i++) {
            createSnowflake();
        }
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startX}px`;
        snowflake.style.opacity = opacity;
        snowflake.style.top = '-20px';
        
        snowflakesContainer.appendChild(snowflake);
        
        const animation = snowflake.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: opacity },
            { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            snowflake.remove();
            createSnowflake();
        };
    }

    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00'];
        const confettiCount = 150;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 15 + 5;
            const startX = Math.random() * window.innerWidth;
            const rotation = Math.random() * 360;
            
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${startX}px`;
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`, 
                    opacity: 1 
                },
                { 
                    transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 20}px) rotate(${rotation + 720}deg)`, 
                    opacity: 0 
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

    function updateCountdown() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const nextYear = currentYear + 1;
        const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
        
        const timeRemaining = newYearDate - now;
        
        if (timeRemaining <= 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            progressFillElement.style.width = '100%';
            progressTextElement.textContent = '100%';
            celebrateNewYear();
            return;
        }
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        const startOfYear = new Date(`January 1, ${currentYear} 00:00:00`);
        const endOfYear = new Date(`January 1, ${nextYear} 00:00:00`);
        const totalYearDuration = endOfYear - startOfYear;
        const elapsedTime = now - startOfYear;
        const progressPercentage = (elapsedTime / totalYearDuration) * 100;
        
        progressFillElement.style.width = `${progressPercentage}%`;
        progressTextElement.textContent = `${progressPercentage.toFixed(2)}%`;
        
        if (secondsElement.classList.contains('pulse')) {
            secondsElement.classList.remove('pulse');
        } else {
            secondsElement.classList.add('pulse');
        }
    }

    function celebrateNewYear() {
        createConfetti();
        
        if (fireworkSound) {
            fireworkSound.currentTime = 0;
            fireworkSound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
        }
        
        document.querySelector('h2').textContent = 'С Новым Годом!';
        document.querySelector('.subtitle').textContent = 'Поздравляем! Новый год наступил! 🎉';
        
        document.body.style.background = 'linear-gradient(135deg, #ff6b6b, #ff9f1a, #ffdd59)';
        
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snowflake => snowflake.remove());
        
        const celebrationInterval = setInterval(() => {
            createConfetti();
        }, 2000);
        
        setTimeout(() => {
            clearInterval(celebrationInterval);
        }, 10000);
    }

    celebrateBtn.addEventListener('click', function() {
        createConfetti();
        
        if (fireworkSound) {
            fireworkSound.currentTime = 0;
            fireworkSound.play();
        }
        
        celebrateBtn.style.animation = 'none';
        void celebrateBtn.offsetWidth;
        celebrateBtn.style.animation = 'pulse 0.5s';
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    updateCountdown();
    createSnowflakes();

    setInterval(updateCountdown, 1000);

    window.addEventListener('resize', () => {
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snowflake => snowflake.remove());
        createSnowflakes();
    });
});