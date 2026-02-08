
document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM Elements ----
    const navbar = document.getElementById('navbar');
    const videoSection = document.getElementById('video-section');
    const videoContainer = document.querySelector('.video-container');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // ---- Mobile Menu Logic ----
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('opacity-100');
            if (isOpen) {
                mobileMenu.classList.replace('opacity-100', 'opacity-0');
                mobileMenu.classList.replace('pointer-events-auto', 'pointer-events-none');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.replace('opacity-0', 'opacity-100');
                mobileMenu.classList.replace('pointer-events-none', 'pointer-events-auto');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.replace('opacity-100', 'opacity-0');
                mobileMenu.classList.replace('pointer-events-auto', 'pointer-events-none');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Scroll Dynamics ----
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const viewHeight = window.innerHeight;

        // Navbar Styles on Scroll
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('bg-dark/80', 'backdrop-blur-md', 'py-2', 'border-b', 'border-white/5');
                navbar.classList.remove('py-4', 'bg-transparent');
            } else {
                navbar.classList.remove('bg-dark/80', 'backdrop-blur-md', 'py-2', 'border-b', 'border-white/5');
                navbar.classList.add('py-4', 'bg-transparent');
            }
        }

        // Hero Exit Animation
        const heroSection = document.getElementById('home');
        if (heroSection) {
            let heroProgress = scrollY / (viewHeight * 1.5);
            heroProgress = Math.max(0, Math.min(1, heroProgress));
            const heroScale = 1 - (heroProgress * 0.3);
            const heroOpacity = 1 - (heroProgress * 0.7);
            const heroY = heroProgress * -80;
            heroSection.style.transform = `scale(${heroScale}) translateY(${heroY}px)`;
            heroSection.style.opacity = heroOpacity;
            heroSection.style.transformOrigin = 'center bottom';
        }

        // Showreel Scaling Effect
        const showreelSection = document.getElementById('showreel-section');
        const showreelText = document.getElementById('showreel-text');
        if (showreelSection && videoSection && showreelText) {
            const rect = showreelSection.getBoundingClientRect();
            let progress = (viewHeight - rect.top) / (viewHeight * 1.5);
            progress = Math.max(0, Math.min(1, progress));

            // Scale video up
            const videoScale = 0.05 + (progress * 0.95);
            document.documentElement.style.setProperty('--scale-video', videoScale);
            document.documentElement.style.setProperty('--radius-video', `40px`);

            // Scale text down
            const textScale = 1 - (progress * 0.3);
            const yPos = progress * -100;
            showreelText.style.transform = `translateY(${yPos}px) scale(${textScale})`;
            showreelText.style.opacity = 1 - (progress * 0.5);
        }
    });

    // ---- Interaction Observers ----
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ---- YouTube API (Home Perspective) ----
    let player;
    const videoToggle = document.getElementById('video-toggle');
    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');

    window.onYouTubeIframeAPIReady = () => {
        const playerEl = document.getElementById('player');
        if (playerEl) {
            player = new YT.Player('player', {
                videoId: 'CWzALS_gAZI',
                playerVars: {
                    'autoplay': 1, 'controls': 0, 'mute': 1, 'loop': 1, 'playlist': 'CWzALS_gAZI',
                    'modestbranding': 1, 'rel': 0, 'showinfo': 0, 'iv_load_policy': 3, 'vq': 'hd2160',
                    'origin': window.location.origin
                },
                events: {
                    'onReady': (event) => {
                        event.target.mute();
                        event.target.playVideo();
                    },
                    'onStateChange': (event) => {
                        if (event.data === YT.PlayerState.ENDED) player.playVideo();
                    }
                }
            });
        }
    };

    // Load YT Script
    const playerTarget = document.getElementById('player');
    if (playerTarget) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    if (videoToggle) {
        videoToggle.addEventListener('click', () => {
            if (!player || typeof player.getPlayerState !== 'function') return;
            const state = player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                pauseIcon?.classList.add('hidden');
                playIcon?.classList.remove('hidden');
            } else {
                player.playVideo();
                pauseIcon?.classList.remove('hidden');
                playIcon?.classList.add('hidden');
            }
        });
    }

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            if (href === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- 3D Tilt Effect ----
    const heroImageContainer = document.querySelector('.perspective-1000');
    const heroImage = document.querySelector('.tilt-wrapper');
    if (heroImageContainer && heroImage) {
        heroImageContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroImageContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            heroImage.style.transform = `rotateY(${x * 20}deg) rotateX(${y * -20}deg)`;
        });
        heroImageContainer.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // ---- Project Category Filtering ----
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');

                // Filter cards with animation
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Initialize cards state
        projectCards.forEach(card => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });

        // Check for URL parameters to filter on load
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            const targetBtn = document.querySelector(`.filter-btn[data-filter="${categoryParam}"]`);
            if (targetBtn) {
                // collaborative filter trigger
                setTimeout(() => {
                    targetBtn.click();
                }, 100);
            }
        }
    }

    // ---- Premium Inline Video Playback Logic ----
    projectCards.forEach(card => {
        // Fix: Use a safer selector that avoids special characters like []
        const thumbWrapper = card.querySelector('.group-cursor-play');
        const videoId = card.getAttribute('data-video-id');

        if (thumbWrapper && videoId) {
            card.addEventListener('click', (e) => {
                if (card.classList.contains('is-playing')) return;

                // Stop other playing videos
                document.querySelectorAll('.project-card.is-playing').forEach(other => {
                    const otherFrame = other.querySelector('.video-iframe-wrapper');
                    if (otherFrame) otherFrame.remove();
                    other.classList.remove('is-playing');
                });

                card.classList.add('is-playing');
                // Force cursor back to default
                card.style.cursor = 'default';

                // Create a masked iframe wrapper to hide YouTube elements
                const wrapper = document.createElement('div');
                wrapper.className = 'video-iframe-wrapper absolute inset-0 w-full h-full bg-black z-[999]';

                // Nesting the iframe with enhanced parameters for reliability
                const iframe = document.createElement('iframe');
                // Removed origin to prevent issues with local/file origins
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&playsinline=1&loop=1&playlist=${videoId}`;
                iframe.className = 'w-full h-full pointer-events-auto relative z-[1000]';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');

                wrapper.appendChild(iframe);
                thumbWrapper.appendChild(wrapper);
            });
        }
    });
});
