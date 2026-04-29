🛠️ Critical Web Development Standard Operating Procedures
1. Asset Pathing & Resolution (Public vs. Assets)
Source Truth: All images (e.g., drab.png, fab.png) and videos (e.g., saltlake.webm) are located in the /public root folder.

Standard: You MUST reference these using absolute paths starting with a forward slash (e.g., <img src="/drab.png" />).

Prohibition: Never use relative imports (e.g., import img from "../assets/...") or relative paths (e.g., src="./drab.png") for files in the public directory, as this breaks the Vite dev server resolution.

2. Background Video Autoplay Compliance
The "Golden Attributes": To ensure the Sora background video plays across all browsers (Chrome, Safari, Mobile), the <video> tag MUST contain these four attributes exactly: autoplay, muted, loop, and playsinline.

Local Over External: Prioritize local workspace assets (e.g., src="/saltlake.webm") over Google Drive links. Google Drive uc?export=download links are strictly forbidden for video streaming as they trigger HTML virus-scan interstitials that break the media player.

Z-Index Integrity: Background videos must remain at z-index: -1 or lower. Do not allow pinned sections or solid backgrounds to obscure the video layer.

3. GSAP & CSS Layout Preservation
Visibility Safeguards: When using GSAP for "Drab to Fab" transitions, you MUST set the initial state of the "Fab" layer to opacity: 0 or visibility: hidden via CSS or gsap.set() to prevent "Alt-Text Overlap" if an image fails to load.

Non-Destructive Pinning: When using ScrollTrigger pinning, ensure the pinSpacer does not shift the global stacking context. If a hero video disappears after pinning a section, you must immediately check and fix the z-index and background-color: transparent settings.

4. Code "Freeze" Protocol
Verbatim Preservation: If a section (like the Hero Video) is working, do NOT refactor the underlying HTML/CSS structure to "improve" it.

Change Log: Before modifying any component that uses GSAP or useScroll, check the console for "non-static position" warnings and ensure all parent containers are set to position: relative.

Why these directions matter:
Eliminates 404s: By forcing the /public pathing rule, you stop the Vite "Failed to resolve import" errors that have been crashing your build.

Fixes the Black Screen: Removing the Google Drive link and enforcing the muted + playsinline attributes is the only way to guarantee the video autoplays on page load.

Prevents "Messy" Overlaps: The visibility safeguards ensure that even if a network glitch happens, the user never sees "Drab" and "Fab" text fighting for the same space.