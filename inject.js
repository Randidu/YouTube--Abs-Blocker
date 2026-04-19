// Intercept the initial YouTube page load data (This stops ads on the very first video load)
Object.defineProperty(window, 'ytInitialPlayerResponse', {
    set: function(val) {
        if (val) {
            if (val.adPlacements) delete val.adPlacements;
            if (val.playerAds) delete val.playerAds;
        }
        this._ytInitialPlayerResponse = val;
    },
    get: function() {
        return this._ytInitialPlayerResponse;
    }
});

// Intercept window.fetch for subsequent video clicks
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    const url = args[0];
    
    // Check for YouTube's player and ad endpoints
    if (typeof url === 'string' && (url.includes('/youtubei/v1/player') || url.includes('/youtubei/v1/next'))) {
        const response = await originalFetch.apply(this, args);
        try {
            const clone = response.clone();
            let json = await clone.json();
            
            // WIPE OUT THE ADS!
            if (json.adPlacements) delete json.adPlacements;
            if (json.playerAds) delete json.playerAds;
            
            return new Response(JSON.stringify(json), {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });
        } catch (e) {
            console.error("Fetch intercept error", e);
        }
        return response;
    }
    
    return originalFetch.apply(this, args);
};

console.log("YouTube API Interceptor Pro Running");
