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
                    <p class="card-info">${show.rating.average}</p>
                <p class="card-info">${show.language}</p>
            
                <p class="card-info">${show.genres.join(', ')}</p>
                <button class="comment-btn">Add Comment</button>
                <button class="stream-btn">Stream</button>
                `;
                cardContainer.appendChild(card);
                const commentBtn = card.querySelector('.comment-btn');
                commentBtn.addEventListener('click', () => {
                    // Redirect to a new page for comments
                    window.location.href = 'comment-page.html'; // Replace with your comment page URL
                });

                // Add event listener for streaming button
                const streamBtn = card.querySelector('.stream-btn');
                streamBtn.addEventListener('click', () => {
                    // Redirect to a new page for streaming
                    window.location.href = 'stream-page.html'; // Replace with your streaming page URL
                });
            });
        })
        .catch(error => {
            console.error(error);
        });

    window.addEventListener('scroll', function () {
        var header = document.querySelector('header');
        header.style.top = (window.scrollY === 0) ? '0' : '-80px';
    });
});