// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Load and display movie data
fetch('movies.json')
  .then(response => response.json())
  .then(movies => {
    const movie = movies.find(m => m.id == movieId);
    if (movie) {
      displayMovieDetails(movie);
      setupWatchButton(movie);
    } else {
      window.location.href = 'index.html'; // Redirect if movie not found
    }
  })
  .catch(error => {
    console.error('Error loading movie:', error);
    window.location.href = 'index.html';
  });

function displayMovieDetails(movie) {
  // Update page title
  document.title = `${movie.title} | FilmLane`;

  // Update movie content
  document.getElementById('movie-poster').src = movie.image;
  document.getElementById('movie-poster').alt = movie.title;
  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-rating').textContent = movie.rating;
  document.getElementById('movie-quality').textContent = movie.quality;
  document.getElementById('movie-genres').innerHTML = movie.genres
    .map(genre => `<a href="#">${genre}</a>`)
    .join(', ');
  document.getElementById('movie-year').textContent = movie.year;
  document.getElementById('movie-duration').textContent = movie.duration;
  document.getElementById('movie-description').textContent = movie.description;
  document.getElementById('download-link').href = movie.image;
}

function setupWatchButton(movie) {
  const btn = document.getElementById('watch-now-btn');
  btn.addEventListener('click', () => {
    window.location.href = `video_modal.html?id=${movie.id}`;
  });
}
