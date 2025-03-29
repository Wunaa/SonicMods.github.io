document.addEventListener("DOMContentLoaded", function() {
    const modList = document.getElementById("mod-list");

    // Example list of mod pages (replace this with a real folder fetch)
    const mods = [
        "mod1.html",
        "mod2.html",
        "mod3.html"
    ];

    mods.forEach(mod => {
        const modCard = document.createElement("div");
        modCard.classList.add("mod-card");
        
        // Extract mod name (remove .html)
        const modName = mod.replace(".html", "");

        modCard.innerHTML = `
            <a href="mod/${mod}">
                <img src="mod/default-thumbnail.png" alt="Mod Thumbnail">
                <div class="mod-title">${modName}</div>
            </a>
        `;

        modList.appendChild(modCard);
    });
});
