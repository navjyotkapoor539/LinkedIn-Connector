# LinkedIn Connection Automation Chrome Extension

This Chrome extension automates the process of sending connection requests on LinkedIn. It targets the **"Grow your network"** page (`https://www.linkedin.com/mynetwork/grow/`) and adds a floating button that triggers the automation of sending connection requests to all visible profiles.

## Features

- Adds a **floating button** labeled "Connect with All" on LinkedIn's "Grow your network" page.
- When clicked, the extension automatically sends connection requests to all visible profiles with a "Connect" button.
- Includes a delay of 13 seconds between each request to simulate human behavior and avoid being blocked by LinkedIn.
- Handles the modal that appears after clicking "Connect", automatically clicking the "Send Now" button if it is present.
- Includes error handling for when no "Connect" buttons are found on the page.

## Installation

1. Download the extension code (or clone this repository).
2. Run npm run build command.
3. Open Chrome and go to the **Extensions** page:
   - `chrome://extensions/`
4. Enable **Developer mode** by toggling the switch in the top right corner.
5. Click **Load unpacked** and select the folder where the extension code is located.
6. The extension will now be installed and visible in your Chrome extensions toolbar.
