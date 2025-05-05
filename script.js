document.addEventListener('DOMContentLoaded', () => {
    const lockScreen = document.getElementById('lockScreen');
    const unlockedScreen = document.getElementById('unlockedScreen');
    const passcodeInput = document.getElementById('passcodeInput');
    const digits = document.querySelectorAll('.digit');
    const deleteButton = document.getElementById('deleteButton');
    const confirmButton = document.getElementById('confirmButton');
    const photoSlideshow = document.getElementById('photoSlideshow');
    const photos = document.querySelectorAll('.photo');
    const swipeLeft = document.querySelector('.swipe-left');
    const swipeRight = document.querySelector('.swipe-right');
    const nextButton = document.getElementById('nextButton');
    const message = document.getElementById('message');
    
    const correctPasscode = '06012025';
    let currentPhotoIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            const value = digit.getAttribute('data-digit');
            if (value !== '•' && passcodeInput.value.length < 8) {
                passcodeInput.value += value;
                digit.classList.add('active');
                setTimeout(() => {
                    digit.classList.remove('active');
                }, 200);
            }
        });
    });
    

    deleteButton.addEventListener('click', () => {
        passcodeInput.value = passcodeInput.value.slice(0, -1);
    });
    
    confirmButton.addEventListener('click', () => {
        checkPass();
    });
    
    nextButton.addEventListener('click', () => {
        message.style.display = 'block';
        setTimeout(() => {
            message.classList.add('visible');
            nextButton.style.display = 'none';
        }, 10);
    });
    
    photoSlideshow.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    photoSlideshow.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToNextPhoto();
        } else if (touchEndX > touchStartX + 50) {
            ToPhoto();
        }
    }

    swipeLeft.addEventListener('click', ToPhoto);
    swipeRight.addEventListener('click', ToNextPhoto);
    
    function ToNextPhoto() {
        photos[currentPhotoIndex].classList.add('slide-left');
        setTimeout(() => {
            photos[currentPhotoIndex].classList.remove('active', 'slide-left');
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            photos[currentPhotoIndex].classList.add('active');
        }, 300);
    }
    
    function ToPhoto() {
        photos[currentPhotoIndex].classList.add('slide-right');
        setTimeout(() => {
            photos[currentPhotoIndex].classList.remove('active', 'slide-right');
            currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
            photos[currentPhotoIndex].classList.add('active');
        }, 300);
    }
    function cHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 300 + 30 + 'px';
            heart.style.top = Math.random() * 300 + 100 + 'px';
            document.querySelector('.container').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }
    
    function checkPass() {
        if (passcodeInput.value === correctPasscode) {
            cHearts();
            setTimeout(() => {
                lockScreen.classList.add('slide-up');
            }, 1000);
        } else {
            passcodeInput.classList.add('wrong');
            setTimeout(() => {
                passcodeInput.classList.remove('wrong');
            }, 500);
        }
    }
});