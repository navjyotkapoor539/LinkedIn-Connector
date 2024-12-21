
export default defineContentScript({
  matches: ["*://www.linkedin.com/mynetwork/grow/"], // LinkedIn target URL
  main() {
    console.log('LinkedIn Connection Automation Script Initialized');

    // Add floating button to trigger the automation process
    const floatingButtonHtml = `
  <button id="floating-btn" style="position: fixed; bottom: 60px; right: 20px; background-color: #007bff; color: white; padding: 10px 20px; border-radius: 50%; cursor: pointer; font-size: 18px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
    Connect with All
  </button>
`;

    // Inject the floating button into the page
    document.body.insertAdjacentHTML("beforeend", floatingButtonHtml);

    // Function to simulate a delay
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Function to find and click all Connect buttons
    const processConnectButtons = async () => {
      console.log("Looking for 'Connect' buttons...");

      // Find all visible "Connect" buttons on the page
      const connectButtons = Array.from(
        document.querySelectorAll("button")
      ).filter((btn) => btn.innerText.trim().toLowerCase() === "connect");

      if (connectButtons.length === 0) {
        alert("No 'Connect' buttons found.");
        return;
      }

      console.log(`Found ${connectButtons.length} 'Connect' buttons. Starting automation...`);

      // Process each connect button with a delay to prevent LinkedIn from blocking
      for (const [index, button] of connectButtons.entries()) {
        try {
          button.scrollIntoView({ behavior: "smooth", block: "center" });
          button.click();
          console.log(`Clicked 'Connect' button ${index + 1}`);

          // Wait for the optional modal to appear and click "Send Now" button if present
          await delay(2000); // Wait for the modal

          const sendNowButton = document.querySelector('button[aria-label="Send now"]');
          if (sendNowButton) {
            const clickEvent = new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            sendNowButton.dispatchEvent(clickEvent);
            console.log("Simulated click on 'Send Now' button.");
          }
          

          // Add a delay between actions to mimic human behavior
          await delay(13000); // 13-second delay between each connection request
        } catch (error) {
          console.error("Error processing a 'Connect' button:", error);
        }
      }

      alert("All 'Connect' buttons processed!");
    };

    // Floating button click event
    const floatingButton = document.getElementById("floating-btn") as HTMLButtonElement;
    floatingButton.addEventListener("click", () => {
      // Trigger the connection automation process
      processConnectButtons();
    });
  },
});

