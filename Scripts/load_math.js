// Load HTML and Extract Scripts for use on the page
function loadTrainer(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading file");
            }
            return response.text();
        })
        .then(data => {
            // Inject the HTML content into the div
            document.getElementById("mathContainer").innerHTML = data;
            document.getElementById("mathSelect").selectedIndex = 0;
     
            // Execute the scripts found in the loaded HTML content
            executeScripts(data);
        })
        .catch(error => {
            console.error("Error loading math trainer:", error);
            document.getElementById("mathContainer").innerHTML = "<p>That trainer is not available yet.</p>";
        });
        var trainerMenu = document.getElementById("trainer-menu");
        trainerMenu.style.display = "none";  // Hide the element
}

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
            // If the script has a src attribute, load it externally
            newScript.src = script.src;
        } else {
            // If the script is inline, copy the inner content
            newScript.textContent = script.innerHTML;
        }

        // Append the new script element to the body (or head)
        document.body.appendChild(newScript);
    });
}