// 1. Inject the Network/API Interceptor
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
script.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(script);

// 2. LAYER 2 - Aggressive Ad Skipping Fallback (Brave uses this trick too)
// If YouTube loads an ad before our network blocker catches it, this will instantly kill it.
setInterval(() => {
    // Hide and remove static ad banners
    const adSelectors = [
        '.ad-showing', '.ad-container', 'ytd-ad-slot-renderer', 
        'ytd-in-feed-ad-layout-renderer', '.ytd-banner-promo-renderer-desktop'
    ];
    document.querySelectorAll(adSelectors.join(',')).forEach(el => {
        el.style.display = 'none';
    });

    // Handle video player ads natively
    const video = document.querySelector('video.html5-main-video');
    const adOverlay = document.querySelector('.ytp-ad-player-overlay, .ytp-ad-image-overlay');
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');
    const adBadge = document.querySelector('.ytp-ad-badge');

    // If an ad starts playing, instantly mute and skip it before the user can even see it
    if (adOverlay || adBadge || document.querySelector('.ad-showing')) {
        if (video) {
            // Mute immediately to block sound
            video.muted = true;
            // Jump to the end of the ad
            if (!isNaN(video.duration) && video.duration > 0) {
                video.currentTime = video.duration;
            }
            // Increase speed to max just in case
            video.playbackRate = 16.0;
        }
        
        // If there's a skip button, smash it
        if (skipButton) {
            skipButton.click();
        }
    }
}, 50); // Runs every 50 miliseconds so the ad disappears instantly
