# 🛡️ LexixCore Ads Blocker

**LexixCore Ads Blocker** is a premium, next-generation Chrome extension that aggressively blocks YouTube ads and general tracking domains at the network level. Built with Manifest V3 compatibility, it offers lightning-fast performance, maximum privacy, and absolute uninterrupted viewing similar to native browser blockers like Brave.

## 🌟 Key Features

- **Network-Level Blocking:** Intercepts dynamic ad payloads directly from YouTube's server responses (`window.fetch` hooking) before they even reach the video player.
- **Embedded Ad Sanitization:** Purges encoded `ytInitialPlayerResponse` variables safely in the browser context, ensuring immediate blocks on first load.
- **Aggressive DOM Fallback Layer:** Ensures a seamless experience via a high-frequency (50ms interval) fallback mutation watcher. If a sponsored segment sneaks through, it is instantly silenced, accelerated (16x speed), and eradicated.
- **Declarative Net Requests:** Powerful tracker blocking (e.g. Doubleclick, GoogleAdServices) utilizing native Manifest V3 rule sets for enhanced privacy and latency reduction.
- **Premium Interface:** A sleek, cyberpunk aesthetic popup interface that monitors shielding status seamlessly.
- **Lightweight:** Does not require heavy parsing lists like other traditional blockers.

## 🛠️ Installation (Developer Mode)

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the extension directory.
5. Watch YouTube completely ad-free!

## ⚙️ How It Works Layer-by-Layer

1. **Layer 1 (Pre-flight):** Native `declarativeNetRequest` rules instantly drop standard banner injections and telemetry pings.
2. **Layer 2 (Initial Payload):** Hooks the `window` context to scrub `adPlacements` and `playerAds` properties within YouTube's initial configuration.
3. **Layer 3 (Asynchronous Intercept):** Modifies the native `window.fetch` API. Whenever YouTube triggers the `/youtubei/v1/player` endpoint for a new video, the JSON is sanitized on the fly.
4. **Layer 4 (DOM Hardening):** Rapid 50ms interval checks guarantee nothing is visible natively.

## 🎨 Aesthetics
Powered by AI-generated visual design and cyberpunk aesthetics from the **LexixCore Engine**, boasting a custom transparent neon-matrix shield logo.

---
*Created and maintained by the LexixCore Open Source community.*
