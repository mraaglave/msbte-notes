function toggleNotes() {
    const notesSection = document.getElementById("notes-section");
    notesSection.style.display = notesSection.style.display === "none" || notesSection.style.display === "" ? "block" : "none";
}

function saveNotes() {
    const notes = document.getElementById("notes").value;
    localStorage.setItem("videoNotes", notes);
    alert("Notes saved!");
    displaySavedItems();
}

function bookmarkVideo() {
    const videoTitle = document.title || "Unnamed Video";
    const videoUrl = window.location.href;
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push({ title: videoTitle, url: videoUrl });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    alert("Video bookmarked!");
    displaySavedItems();
}

function shareVideo() {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl);
    alert("Video link copied to clipboard!");
}

function saveToFavorites() {
    const videoTitle = document.title || "Unnamed Video";
    const videoUrl = window.location.href;
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push({ title: videoTitle, url: videoUrl });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Video saved to favorites!");
    displaySavedItems();
}

// Display all saved items in the "My Items" section
function displaySavedItems() {
    // Display Notes
    const notes = localStorage.getItem("videoNotes");
    document.getElementById("notes-list").innerText = notes ? notes : "No notes added.";

    // Display Bookmarks
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkList = document.getElementById("bookmark-list");
    bookmarkList.innerHTML = bookmarks.length ? "" : "<li>No bookmarks added.</li>";
    bookmarks.forEach(bookmark => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = bookmark.url;
        a.target = "_blank"; // Opens in a new tab
        a.textContent = bookmark.title;
        li.appendChild(a);
        bookmarkList.appendChild(li);
    });

    // Display Favorites
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = favorites.length ? "" : "<li>No favorites added.</li>";
    favorites.forEach(favorite => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = favorite.url;
        a.target = "_blank"; // Opens in a new tab
        a.textContent = favorite.title;
        li.appendChild(a);
        favoritesList.appendChild(li);
    });
}

// Load saved items when the page loads
window.onload = displaySavedItems;
