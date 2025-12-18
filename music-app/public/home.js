    // Music search bar live filter
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('music-search');
        const songCards = document.querySelectorAll('.song-card');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = searchInput.value.toLowerCase();
                songCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const artist = card.querySelector('p').textContent.toLowerCase();
                    if (title.includes(query) || artist.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    });
    document.addEventListener('DOMContentLoaded', function() {
    
    // Fetch and display latest profile info after login
        const user = JSON.parse(localStorage.getItem('musicAppUser') || 'null');
        let isSubscribed = 0;
        if (user && user.id) {
            fetch(`http://127.0.0.1:8000/api/profile/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    // Update username
                    const usernameEl = document.querySelector('.text-xl.font-semibold');
                    if (usernameEl && data.name) usernameEl.textContent = data.name;
                    // Update navbar username
                    const navbarUsername = document.getElementById('navbar-username');
                    if (navbarUsername && data.name) navbarUsername.textContent = data.name;
                    // Update profile photo
                    const profileImg = document.getElementById('profile-img');
                    if (profileImg) {
                        if (data.photo_url) {
                            profileImg.src = `http://127.0.0.1:8000${data.photo_url}?t=${Date.now()}`;
                        } else {
                            profileImg.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7fc8d9e6-2bb3-43d1-b7e9-1d8d573d5f45.png";
                        }
                    }
                    // Show download buttons if subscribed
                    isSubscribed = data.is_subscribed;
                    document.querySelectorAll('.song-card').forEach(card => {
                        let downloadBtn = card.querySelector('.download-btn');
                        if (downloadBtn) {
                            if (isSubscribed === 1 || isSubscribed === '1') {
                                downloadBtn.style.display = '';
                            } else {
                                downloadBtn.style.display = 'none';
                            }
                        }
                    });
                });
        }

    // Song card play button logic
        const songData = {
            1: {
                title: 'Love the way you die',
                artist: 'Eminem & Rihanna',
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Love_the_Way_You_Lie_cover.png/250px-Love_the_Way_You_Lie_cover.png',
                src: 'http://127.0.0.1:8000/music/Love the way you die.mp3'
            },
            2: {
                title: 'Blinding Lights',
                artist: 'The Weeknd',
                image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65028581-c05c-48f4-a4c0-a1047e62bb5a.png',
                src: 'http://127.0.0.1:8000/music/The_Weeknd_-_Blinding_Lights_Offblogmedia.com.mp3'
            },
            3: {
                title: 'Levitating',
                artist: 'Dua Lipa',
                image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a8cb1fe8-ab00-48fb-ada4-59d426d3b0ce.png',
                src: 'http://127.0.0.1:8000/music/levitating1.mp3'
            },
            4: {
                title: 'Die with a smile',
                artist: 'Lady Gaga & Bruno Mars',
                image: 'https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png',
                src: 'http://127.0.0.1:8000/music/Die with a smile.mp3'
            },
            5: {
                title: 'Someone You Loved',
                artist: 'Lewis Capaldi',
                image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f85fbee-c855-4a66-a8c7-45f27d985458.png',
                src: 'http://127.0.0.1:8000/music/Someone_You_Loved.mp3'
            },
            6: {
                title: "Don't Start Now",
                artist: 'Dua Lipa',
                image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5bf00a0b-b3a9-46b2-83d4-572c70ce46d8.png',
                src: 'http://127.0.0.1:8000/music/Dont_Start_Now.mp3'
            }
            ,
            7: {
                title: 'Aitbar Nahi Karna',
                artist: 'Hindi',
                image: 'https://tse1.mm.bing.net/th/id/OIP.XHFDGX_2pZRkWY1oWFETvQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3',
                src: 'http://127.0.0.1:8000/music/Aitbaar_Nahi_Karna.mp3'
            }
                ,
                8: {
                    title: 'I think they call this love',
                    artist: 'Unknown Artist',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1wZMmTxWALKJkc4Hbh-b8boKVWoeBBwTYZw&s',
                    src: 'http://127.0.0.1:8000/music/I%20Think%20They%20call%20this%20love.mp3'
                }
                ,
                9: {
                    title: 'Popular',
                    artist: 'The Weeknd',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3tjXVej2E3MmI7Y6N75SI3N1ew6MnccAcuQ&s',
                    src: 'http://127.0.0.1:8000/music/Popular%20(The%20weekend).mp3'
                }
                ,
                10: {
                    title: 'Starboy',
                    artist: 'The Weeknd',
                    image: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png',
                    src: 'http://127.0.0.1:8000/music/Starboy%20(The%20weekend).mp3'
                }
                ,
                11: {
                    title: 'One Of The Girls',
                    artist: 'The Weeknd',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMVIkXTOxg9m5BLNyjuUdxybLLeHuZ8DOOw&s',
                    src: 'http://127.0.0.1:8000/music/One%20of%20the%20girls.mp3'
                }
                ,
                12: {
                    title: 'Perfect',
                    artist: 'Ed Sheeran',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFe58FLJS9mowUIkqO8_KqrLvSl38_H8uPWQ&s',
                    src: 'http://127.0.0.1:8000/music/Perfect(Ed).mp3'
                }
        };
        const songCards = document.querySelectorAll('.song-card');
        const audio = document.getElementById('blinding-light-audio');
        const currentSongTitle = document.getElementById('current-song-title');
        const currentSongArtist = document.getElementById('current-song-artist');
        const currentSongImg = document.getElementById('current-song-img');
        songCards.forEach(card => {
            const playBtn = card.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const songId = card.getAttribute('data-song-id');
                    const data = songData[songId];
                    if (data) {
                        currentSongTitle.textContent = data.title;
                        currentSongArtist.textContent = data.artist;
                        currentSongImg.src = data.image;
                        // Fix Levitating src
                        if (data.title === 'Levitating') {
                            audio.src = 'http://127.0.0.1:8000/music/levitating1.mp3';
                        } else {
                            audio.src = data.src;
                        }
                        audio.currentTime = 0;
                        audio.play();
                        // Update play/pause icon to pause
                        playIcon.classList.remove('fa-play');
                        playIcon.classList.add('fa-pause');
                    }
                });
            }
        // Add download button logic
            let downloadBtn = card.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const songId = card.getAttribute('data-song-id');
                    const data = songData[songId];
                    if (data && user && user.id) {
                        // Extract filename from src
                        let url = new URL(data.src);
                        let filename = decodeURIComponent(url.pathname.split('/').pop());
                        // Download via backend endpoint
                        window.open(`http://127.0.0.1:8000/api/download/${user.id}?file=${encodeURIComponent(filename)}`);
                    } else {
                        alert('You must be logged in and subscribed to download.');
                    }
                });
            }
        });

        // Sidebar logic
        const profileBtn = document.getElementById('profile-btn');
        const closeSidebar = document.getElementById('close-sidebar');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        if (profileBtn && sidebar && overlay) {
            profileBtn.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
            });
        }
        if (closeSidebar && sidebar && overlay) {
            closeSidebar.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }
        if (overlay && sidebar) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            });
        }

        // Music search bar live filter
        const searchInput = document.getElementById('music-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = searchInput.value.toLowerCase();
                songCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const artist = card.querySelector('p').textContent.toLowerCase();
                    if (title.includes(query) || artist.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Change Username
        const changeUsernameBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Change Username'));
        if (changeUsernameBtn) {
            changeUsernameBtn.addEventListener('click', function() {
                const user = getCurrentUser();
                if (!user || !user.id) return alert('User not found. Please log in again.');
                const newName = prompt('Enter new username:');
                if (newName) {
                    fetch(`http://127.0.0.1:8000/api/profile/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: newName })
                    })
                    .then(res => res.json())
                    .then(data => {
                        const usernameEl = document.querySelector('.text-xl.font-semibold');
                        if (usernameEl) usernameEl.textContent = newName;
                        const navbarUsername = document.getElementById('navbar-username');
                        if (navbarUsername) navbarUsername.textContent = newName;
                        alert('Username updated!');
                    });
                }
            });
        }

        // Change Password
        const changePasswordBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Change Password'));
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', function() {
                const user = getCurrentUser();
                if (!user || !user.id) return alert('User not found. Please log in again.');
                const newPass = prompt('Enter new password:');
                if (newPass) {
                    fetch(`http://127.0.0.1:8000/api/profile/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password: newPass })
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.detail) {
                            alert('Password updated successfully!');
                        } else {
                            alert(data.detail || 'Password update failed.');
                        }
                    })
                    .catch(() => alert('Server error.'));
                }
            });
        }

        // Subscription Button Logic
        const subscriptionBtn = document.getElementById('subscription-btn');
        const subscriptionStatus = document.getElementById('subscription-status');
        if (subscriptionBtn && subscriptionStatus) {
            // Set initial label based on user subscription
            const user = JSON.parse(localStorage.getItem('musicAppUser') || 'null');
            if (user && user.id) {
                fetch(`http://127.0.0.1:8000/api/profile/${user.id}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.is_subscribed === 1 || data.is_subscribed === '1') {
                            subscriptionStatus.textContent = 'Subscribed';
                            subscriptionBtn.disabled = true;
                            subscriptionBtn.classList.add('opacity-60', 'cursor-not-allowed');
                        } else {
                            subscriptionStatus.textContent = 'Subscribe';
                            subscriptionBtn.disabled = false;
                            subscriptionBtn.classList.remove('opacity-60', 'cursor-not-allowed');
                        }
                    });
            }
            subscriptionBtn.addEventListener('click', function() {
                const user = JSON.parse(localStorage.getItem('musicAppUser') || 'null');
                if (!user || !user.id) {
                    alert('Please log in to subscribe.');
                    return;
                }
                // Razorpay payment integration
                var options = {
                    key: 'RAZORPAY_API_KEY', // <-- Replace with your Razorpay API key
                    amount: 49900, // Amount in paise (₹499)
                    currency: 'INR',
                    name: 'Harmony Music',
                    description: 'Music App Subscription',
                    image: '',
                    handler: function (response) {
                        // Call backend to verify payment and activate subscription
                        fetch('http://127.0.0.1:8000/api/verify_payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                user_id: user.id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                alert('Subscription activated!');
                                subscriptionStatus.textContent = 'Subscribed';
                                subscriptionBtn.disabled = true;
                                subscriptionBtn.classList.add('opacity-60', 'cursor-not-allowed');
                            } else {
                                alert('Payment verification failed. Please contact support.');
                            }
                        })
                        .catch(() => alert('Payment verification failed. Please contact support.'));
                    },
                    prefill: {
                        email: user.email
                    },
                    theme: {
                        color: '#ff8906'
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            });
        }

        // Dark Mode Toggle
        const darkModeToggle = document.querySelector('input[type="checkbox"].peer');
        if (darkModeToggle) {
            if (localStorage.getItem('darkMode') === 'false') {
                document.body.classList.remove('dark');
                darkModeToggle.checked = false;
            } else {
                document.body.classList.add('dark');
                darkModeToggle.checked = true;
            }
            darkModeToggle.addEventListener('change', function() {
                if (darkModeToggle.checked) {
                    document.body.classList.add('dark');
                    localStorage.setItem('darkMode', 'true');
                } else {
                    document.body.classList.remove('dark');
                    localStorage.setItem('darkMode', 'false');
                }
            });
        }

        // Log Out
        const logoutBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'Log Out');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('musicAppUser');
                window.location.replace('index.html');
            });
        }
    });

    // Get elements
                    const uploadBtn = document.getElementById('profile-upload-btn');
                    const fileInput = document.getElementById('profile-photo-input');

                    // When button is clicked, trigger file input
                    uploadBtn.addEventListener('click', function() {
                        fileInput.click();
                    });

                    // Handle file selection
                    fileInput.addEventListener('change', function() {
                        const file = fileInput.files[0];
                        if (!file) return;

                        // Prepare form data
                        const formData = new FormData();
                        formData.append('file', file);

                        // Send to backend (adjust URL as needed)
                        // Get user ID from localStorage
                        const user = JSON.parse(localStorage.getItem('musicAppUser') || 'null');
                        if (user && user.id) {
                            fetch(`http://127.0.0.1:8000/api/profile/${user.id}/photo`, {
                                method: 'POST',
                                body: formData
                            })
                            .then(response => response.json())
                            .then(data => {
                                // Accept both new and old API responses
                                if (data.photo_url || data.filename) {
                                    const profileImg = document.getElementById('profile-img');
                                    // If photo_url is present, use it; else fallback to filename
                                    const url = data.photo_url ? `http://127.0.0.1:8000${data.photo_url}` : `http://127.0.0.1:8000/profile_photos/${user.id}.png`;
                                    if (profileImg) {
                                        profileImg.src = url;
                                    }
                                    alert('Profile photo updated!');
                                } else {
                                    alert('Upload failed.');
                                }
                            })
                            .catch(() => {
                                alert('Upload error.');
                            });
                        } else {
                            alert('User not found. Please log in again.');
                        }
                    });

    
const audio = document.getElementById('blinding-light-audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressSlider = document.getElementById('progress-slider');
const volumeSlider = document.getElementById('volume-slider');
let isSeeking = false;

// Play/Pause button logic
playBtn.onclick = function() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}
    // Razorpay payment integration
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
                if (!user || !user.id) {
                    alert('Please log in to subscribe.');
                    return;
                }
                // TODO: For full security, create order on backend and use returned order_id
                var options = {
                    key: 'RAZORPAY_API_KEY', // <-- Fill this with your Razorpay API key
                    amount: 49900, // Amount in paise (₹499)
                    currency: 'INR',
                    name: 'Harmony Music',
                    description: 'Music App Subscription',
                    image: '',
                    handler: function (response){
                        // response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature
                        fetch('http://127.0.0.1:8000/api/verify_payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                user_id: user.id
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === 'success') {
                                alert('Subscription activated!');
                                window.location.reload();
                            } else {
                                alert('Payment verification failed. Please contact support.');
                            }
                        })
                        .catch(() => alert('Payment verification failed. Please contact support.'));
                    },
                    prefill: {
                        email: user.email
                    },
                    theme: {
                        color: '#ff8906'
                    },
                    method: {
                        upi: true,
                        card: false,
                        netbanking: false
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            });
        }
  if (!isSeeking) {
    const current = audio.currentTime;
    const duration = audio.duration;
    currentTimeEl.textContent = formatTime(current);
        progressSlider.value = duration ? (current / duration * 100) : 0;
    }
// ...existing code...

// Seek
progressSlider.addEventListener('input', function() {
  isSeeking = true;
  if (audio.duration) {
    const seekTime = progressSlider.value / 100 * audio.duration;
    currentTimeEl.textContent = formatTime(seekTime);
  }
});
progressSlider.addEventListener('change', function() {
  if (audio.duration) {
    audio.currentTime = progressSlider.value / 100 * audio.duration;
  }
  isSeeking = false;
});

// Set duration when metadata is loaded
audio.addEventListener('loadedmetadata', function() {
  durationEl.textContent = formatTime(audio.duration);
});
// Update timer and progress bar as audio plays 14-10-25
audio.addEventListener('timeupdate', function() {
    if (!isSeeking) {
        const current = audio.currentTime;
        const duration = audio.duration;
        currentTimeEl.textContent = formatTime(current);
        progressSlider.value = duration ? (current / duration * 100) : 0;
    }
});

// Volume control
volumeSlider.addEventListener('input', function() {
  audio.volume = volumeSlider.value / 100;
});
audio.volume = volumeSlider.value / 100;

function formatTime(sec) {
  sec = Math.floor(sec);
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return `${min}:${s.toString().padStart(2, '0')}`;
}
  
   
  
        // Sample music data
        const musicLibrary = [
            {
                id: 1,
                title: "Dancing in the Moonlight",
                artist: "Toploader",
                cover: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9a64338a-ae1d-4be5-9516-8a46270c7c2e.png",
                duration: "3:30",
                audio: "#"
            },
            {
                id: 2,
                title: "Blinding Lights",
                artist: "The Weeknd",
                cover: "https://placehold.co/300x300",
                duration: "3:20",
                audio: "#"
            },
            {
                id: 3,
                title: "Levitating",
                artist: "Dua Lipa",
                cover: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a8cb1fe8-ab00-48fb-ada4-59d426d3b0ce.png",
                duration: "3:23",
                audio: "http://127.0.0.1:8000/music/leavitating.mp3"
            },
            {
                id: 4,
                title: "Bohemian Rhapsody",
                artist: "Queen",
                cover: "https://placehold.co/300x300",
                duration: "5:55",
                audio: "#"
            },
            {
                id: 5,
                title: "Someone You Loved",
                artist: "Lewis Capaldi",
                cover: "https://placehold.co/300x300",
                duration: "3:02",
                audio: "#"
            },
            {
                id: 6,
                title: "Don't Start Now",
                artist: "Dua Lipa",
                cover: "https://placehold.co/300x300",
                duration: "3:03",
                audio: "#"
            }
        ];
        
        // DOM Elements
        document.addEventListener('DOMContentLoaded', function() {
            const profileBtn = document.getElementById('profile-btn');
            const closeSidebar = document.getElementById('close-sidebar');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const playBtn = document.getElementById('play-btn');
            const playIcon = document.getElementById('play-icon');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const progressSlider = document.getElementById('progress-slider');
            const currentTimeElement = document.getElementById('current-time');
            const durationElement = document.getElementById('duration');
            const currentSongImg = document.getElementById('current-song-img');
            const currentSongTitle = document.getElementById('current-song-title');
            const currentSongArtist = document.getElementById('current-song-artist');
            const player = document.getElementById('player');
            const songCards = document.querySelectorAll('.song-card');
            // Audio Element
            const audio = new Audio();
            let isPlaying = false;
            let currentSongIndex = 0;
            // Toggle sidebar
            if (profileBtn && sidebar && overlay) {
                profileBtn.addEventListener('click', () => {
                    sidebar.classList.add('active');
                    overlay.classList.add('active');
                });
            }
            if (closeSidebar && sidebar && overlay) {
                closeSidebar.addEventListener('click', () => {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            if (overlay && sidebar) {
                overlay.addEventListener('click', () => {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            // ...existing code...
        });
        
        // Play song function
        function playSong(songId) {
            const song = musicLibrary.find(song => song.id === songId);
            if (song) {
                currentSongIndex = musicLibrary.findIndex(s => s.id === songId);
                currentSongImg.src = song.cover;
                currentSongImg.alt = `Album cover for song ${song.title} by ${song.artist}`;
                currentSongTitle.textContent = song.title;
                currentSongArtist.textContent = song.artist;
                durationElement.textContent = song.duration;
                // Set audio src for Blinding Lights and Levitating
                if (song.title === "Blinding Lights") {
                    audio.src = "http://127.0.0.1:8000/music/The_Weeknd_-_Blinding_Lights_Offblogmedia.com.mp3";
                } else if (song.title === "Levitating") {
                    audio.src = "http://127.0.0.1:8000/music/levitating1.mp3";
                } else {
                    audio.src = song.audio;
                }
                // Show player
                player.classList.add('active');
                // Play audio
                audio.play();
                isPlaying = true;
                playIcon.classList.replace('fa-play', 'fa-pause');
                currentSongImg.classList.add('rotate');
            }
        }
        
        // Play/Pause toggle
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playIcon.classList.replace('fa-pause', 'fa-play');
                currentSongImg.classList.remove('rotate');
            } else {
                audio.play();
                playIcon.classList.replace('fa-play', 'fa-pause');
                currentSongImg.classList.add('rotate');
            }
            isPlaying = !isPlaying;
        });
        
        // Previous song
        prevBtn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
            const song = musicLibrary[currentSongIndex];
            playSong(song.id);
        });
        
        // Next song
        nextBtn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex + 1) % musicLibrary.length;
            const song = musicLibrary[currentSongIndex];
            playSong(song.id);
        });
        
        // Song card click events
        songCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking the play button (to allow that event to bubble)
                if (!e.target.closest('.play-btn')) {
                    const songId = parseInt(card.getAttribute('data-song-id'));
                    playSong(songId);
                }
            });
            
            // Play button inside card
            const playBtn = card.querySelector('.play-btn');
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const songId = parseInt(card.getAttribute('data-song-id'));
                playSong(songId);
            });
        });
        
        // Progress slider (for demo purposes, not functional)
        progressSlider.addEventListener('input', () => {
            const value = progressSlider.value;
            // In a real app, you would set audio.currentTime based on this
            const minutes = Math.floor(value / 60);
            const seconds = Math.floor(value % 60).toString().padStart(2, '0');
            currentTimeElement.textContent = `${minutes}:${seconds}`;
        });
        
        // Initialize first song (for demo purposes)
        playSong(1);
        
        // Profile photo upload preview
        const profileUploadBtn = document.getElementById('profile-upload-btn');
        const profileFileInput = document.getElementById('profile-file');
        const profileImg = document.getElementById('profile-img');
        if(profileUploadBtn && profileFileInput && profileImg) {
                profileUploadBtn.addEventListener('click', () => profileFileInput.click());
                profileFileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        // Preview selected image
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            profileImg.src = ev.target.result;
                        };
                        reader.readAsDataURL(file);

                        // Upload to backend
                        const user = JSON.parse(localStorage.getItem('musicAppUser') || 'null');
                        if (user && user.id) {
                            const formData = new FormData();
                            formData.append('file', file);
                            fetch(`http://127.0.0.1:8000/api/profile/${user.id}/photo`, {
                                method: 'POST',
                                body: formData
                            })
                            .then(res => res.json())
                            .then(data => {
                                // Optionally, re-fetch profile info to update photo
                                fetch(`http://127.0.0.1:8000/api/profile/${user.id}`)
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data.photo_url) {
                                            profileImg.src = `http://127.0.0.1:8000${data.photo_url}`;
                                        }
                                    });
                            });
                        }
                    }
                });
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Change Username
            const changeUsernameBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Change Username'));
            if (changeUsernameBtn) {
                changeUsernameBtn.addEventListener('click', function() {
                    const user = getCurrentUser();
                    if (!user || !user.id) return alert('User not found. Please log in again.');
                    const newName = prompt('Enter new username:');
                    if (newName) {
                        fetch(`http://127.0.0.1:8000/api/profile/${user.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: newName })
                        })
                        .then(res => res.json())
                        .then(data => {
                            const usernameEl = document.querySelector('.text-xl.font-semibold');
                            if (usernameEl) usernameEl.textContent = newName;
                            const navbarUsername = document.getElementById('navbar-username');
                            if (navbarUsername) navbarUsername.textContent = newName;
                            alert('Username updated!');
                        });
                    }
                });
            }

            // Change Password
            const changePasswordBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('Change Password'));
            if (changePasswordBtn) {
                changePasswordBtn.addEventListener('click', function() {
                    const user = getCurrentUser();
                    if (!user || !user.id) return alert('User not found. Please log in again.');
                    const newPass = prompt('Enter new password:');
                    if (newPass) {
                        fetch(`http://127.0.0.1:8000/api/profile/${user.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ password: newPass })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (!data.detail) {
                                alert('Password updated successfully!');
                            } else {
                                alert(data.detail || 'Password update failed.');
                            }
                        })
                        .catch(() => alert('Server error.'));
                    }
                });
            }

            // Dark Mode Toggle
            const darkModeToggle = document.querySelector('input[type="checkbox"].peer');
            if (darkModeToggle) {
                if (localStorage.getItem('darkMode') === 'false') {
                    document.body.classList.remove('dark');
                    darkModeToggle.checked = false;
                } else {
                    document.body.classList.add('dark');
                    darkModeToggle.checked = true;
                }
                darkModeToggle.addEventListener('change', function() {
                    if (darkModeToggle.checked) {
                        document.body.classList.add('dark');
                        localStorage.setItem('darkMode', 'true');
                    } else {
                        document.body.classList.remove('dark');
                        localStorage.setItem('darkMode', 'false');
                    }
                });
            }

            // Log Out
            const logoutBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'Log Out');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function() {
                    localStorage.removeItem('musicAppUser');
                    window.location.replace('index.html');
                });
            }
        });
        // Get user from localStorage (if available)
        function getCurrentUser() {
            try {
                return JSON.parse(localStorage.getItem('musicAppUser'));
            } catch {
                return null;
            }
        }
        
        // Log Out functionality
        const logoutBtn = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.trim() === 'Log Out');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('musicAppUser');
                window.location.replace('index.html');
            });
        }