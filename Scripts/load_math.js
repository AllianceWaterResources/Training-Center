// Load HTML and Extract Scripts for use on the page
function loadTrainer(file) {
    let iframe = document.getElementById("mathContainer");

    // Set the iframe's source to load the trainer file
    iframe.src = file;

    // Ensure dropdown selection resets
    document.getElementById("mathSelect").selectedIndex = 0;

    // Hide the trainer menu
    document.getElementById("trainer-menu").style.display = "none";
}


// Function to extract and execute scripts from the trainer file
function executeScripts(html) {
    // Create a temporary container to extract script tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract all script elements
    const scripts = tempDiv.querySelectorAll('script');

    scripts.forEach(script => {
        // Create a new script element
        const newScript = document.createElement('script');

        // Copy the script content
        if (script.src) {
            newScript.src = script.src;
            newScript.async = true;
        } else {
            newScript.textContent = script.innerHTML;
        }

        // Append the new script element to the body (or head)
        document.body.appendChild(newScript);
    });

    // Ensure functions like randomize() are available
    setTimeout(() => {
        if (typeof randomize === "function") {
            console.log("randomize() function is now available.");
        } else {
            console.error("randomize() is still not available.");
        }
    }, 500);
}
