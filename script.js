document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api.tvmaze.com/shows')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(shows => {
            const cardContainer = document.getElementById('card-container');
            shows.forEach(show => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img class="card-img" src="${show.image.medium}" alt="${show.name}" />
                    <h3 class="card-title">${show.name}</h3>
                    <div class="rows-container">  
                        <p class="card-info">${show.language}</p>
                        <p class="card-info">${show.rating.average}</p>
                    </div>
                    <p class="card-info">${show.genres.join(', ')}</p>
                    <div class="rows-container">
                        <button class="comment-btn">Add Comment</button>
                        <button class="stream-btn">Stream</button>
                    </div>
                `;

                cardContainer.appendChild(card);

                // Add event listener for comment button
                const commentBtn = card.querySelector('.comment-btn');
                commentBtn.addEventListener('click', () => {
                    // Display the pop-up modal
                    // Display the pop-up modal
                    const popupContainer = document.getElementById('popup-container');
                    popupContainer.style.backgroundImage = `url(${show.image.medium})`;
                    popupContainer.style.display = 'block';
                    // Set the rating as star icons
                    const popupRating = document.getElementById('popup-rating');
                    popupRating.innerHTML = '';
                    const rating = show.rating.average; // Use the average rating without rounding
                    const maxStars = 5; // Total number of stars

                    // Calculate the number of filled, half, and empty stars
                    const filledStars = Math.floor(rating); // Number of filled full stars
                    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
                    const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0); // Number of empty stars

                    // Add filled stars
                    for (let i = 0; i < filledStars; i++) {
                        const starIcon = document.createElement('i');
                        starIcon.className = 'fas fa-star yellow-star'; // Add yellow color class for filled stars
                        popupRating.appendChild(starIcon);
                    }

                    // Add half star if applicable
                    if (hasHalfStar) {
                        const halfStarIcon = document.createElement('i');
                        halfStarIcon.className = 'fas fa-star-half-alt yellow-star'; // Add yellow color class for half star
                        popupRating.appendChild(halfStarIcon);
                    }

                    // Add empty stars
                    for (let i = 0; i < emptyStars; i++) {
                        const emptyStarIcon = document.createElement('i');
                        emptyStarIcon.className = 'far fa-star'; // Add empty star class for unfilled stars
                        popupRating.appendChild(emptyStarIcon);
                    }
                    const popupImg = document.getElementById('popup-img');
                    const popupName = document.getElementById('popup-name');
                    const popupGenre = document.getElementById('popup-genre');
                    const popupLanguage = document.getElementById('popup-language');
                    const popupSummary = document.getElementById('popup-summary');
                    popupImg.style.display = 'none'; // Hide the image element

                    // Set the background image of the popup
                    popupContainer.style.backgroundImage = `url(${show.image.medium})`;
                    // Make sure to adjust the CSS to accommodate background image
                    popupName.textContent = show.name; // Set the name
                    popupGenre.textContent = "Genre: " + show.genres.join(', '); // Set the genres
                    popupSummary.textContent = show.summary; // Set the summary
                    popupLanguage.textContent = "Language: " + show.language; // Set the language
                    popupContainer.style.display = 'block';
                });

                // Add event listener for streaming button
                const streamBtn = card.querySelector('.stream-btn');
                streamBtn.addEventListener('click', () => {
                    // Redirect to a new page for streaming
                    window.location.href = 'stream-page.html'; // Replace with your streaming page URL
                });
            });

            // Close pop-up modal when close button is clicked
            document.getElementById('close-popup').addEventListener('click', () => {
                document.getElementById('popup-container').style.display = 'none';
            });

            // Submit comment when submit button is clicked
            document.getElementById('submit-comment').addEventListener('click', () => {
                const emailInput = document.getElementById('email-input').value;
                const commentText = document.getElementById('comment-text').value;
                // Add your logic here to handle the comment submission
                console.log('Submitted email:', emailInput);
                console.log('Submitted comment:', commentText);
                // Close the pop-up modal after submitting comment
                document.getElementById('popup-container').style.display = 'none';
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to validate email address
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
