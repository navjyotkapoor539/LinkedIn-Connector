import React, { useState } from "react";

// Purpose: Floating button to trigger the automation process.

const FloatingButton: React.FC = () => {
  // State to manage the processing status (whether the automation is in progress)
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Simulate a delay to mimic human behavior (returns a Promise)
  const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

  // Function to find and click "Connect" buttons
  const processConnectButtons = async (): Promise<void> => {
    console.log("Looking for 'Connect' buttons...");

    // Select all visible "Connect" buttons on the page
    const connectButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("button")
    ).filter((btn) => btn.innerText.trim().toLowerCase() === "connect");

    // If no "Connect" buttons are found, alert the user and stop the process
    if (connectButtons.length === 0) {
      alert("No 'Connect' buttons found.");
      setIsProcessing(false);
      return;
    }

    console.log(`Found ${connectButtons.length} 'Connect' buttons. Starting automation...`);

    // Loop through the found "Connect" buttons and click them
    for (const [index, button] of connectButtons.entries()) {
      try {
        // Scroll the button into view
        button.scrollIntoView({ behavior: "smooth", block: "center" });

        // Simulate clicking the "Connect" button
        button.click();
        console.log(`Clicked 'Connect' button ${index + 1}`);

        // Wait for the optional modal to appear
        await delay(2000); // Delay to allow the modal to appear

        // Handle the "Send Now" modal if it appears
        const sendNowButton = document.querySelector<HTMLButtonElement>('button[aria-label="Send now"]');
        if (sendNowButton) {
          sendNowButton.click();
          console.log("Clicked 'Send Now' button.");
        }

        // Add a delay between requests to avoid being blocked by LinkedIn
        await delay(13000); // Delay between each connection request
      } catch (error) {
        console.error("Error processing a 'Connect' button:", error);
      }
    }

    alert("All 'Connect' buttons processed!");
    setIsProcessing(false);
  };

  // Handle click on the floating button (start automation or show message if already processing)
  const handleClick = (): void => {
    if (isProcessing) {
      alert("Already processing. Please wait...");
      return;
    }
    setIsProcessing(true);
    processConnectButtons();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "#0a66c2",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {isProcessing ? "Processing..." : "Connect with All"}
    </button>
  );
};

export default FloatingButton;