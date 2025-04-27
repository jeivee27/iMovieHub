
const API_KEY = 'YOUR_API_KEY_HERE'; // <-- Replace this with your real TMDB API Key

let allMovies = [];
let currentVisible = 8;

// Banner trailers array
const trailers = [
  { id: 'eOrNdBpGMv8', title: 'Avengers: Endgame', rating: '8.4', movieId: 'tt4154796' },
  { id: 'YoHD9XEInc0', title: 'Inception', rating: '8.8', movieId: 'tt1375666' },
  { id: 'EXeTwQWrcwY', title: 'The Dark Knight', rating: '9.0', movieId: 'tt0468569' }
];

// Rotate trailer every 10 seconds
function rotateTrailer() {
  const random = Math.floor(Math.random() * trailers.length);
  const selected = trailers[random];
  
  const iframe = document.getElementById('banner-trailer');
  iframe.src = `https://www.youtube.com/embed/${selected.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${selected.id}&modestbranding=1&showinfo=0&playsinline=1`;

  document.getElementById('banner-title').innerText = selected.title;
  document.getElementById('banner-rating').innerText = `⭐ ${selected.rating}/10`;
  document.getElementById('banner-watch').href = `https://vidsrc.to/embed/movie/${selected.movieId}`;
}

// Fetch trending movies
async function loadMoviesFromTMDB() {
  const container = document.getElementById('movies-list');
  container.innerHTML = "<h3 style='text-align:center;'>Loading...</h3>";

  try {
    const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
    const data = await res.json();
    allMovies = data.results;
    container.innerHTML = "";
    displayMovies(allMovies.slice(0, currentVisible));
    displayTop10(allMovies.slice(0, 10));
  } catch (error) {
    console.error("Failed to load movies:", error);
    container.innerHTML = "<h3 style='text-align:center; color:red;'>Failed to load movies. Check API Key.</h3>";
  }
}

// Display Movies in grid
function displayMovies(movieArray) {
  const container = document.getElementById('movies-list');
  container.innerHTML = "";

  movieArray.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="https://vidsrc.to/embed/movie/${movie.id}" target="_blank">
        <div class="poster-wrapper">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
      </a>
      <div class="rating">⭐ ${movie.vote_average.toFixed(1)}/10</div>
    `;
    container.appendChild(card);
  });
}

// Display Top 10
function displayTop10(movieArray) {
  const container = document.getElementById('top10-list');
  container.innerHTML = "";

  movieArray.forEach((movie, index) => {
    const card = document.createElement('div');
    card.className = 'top10-card';
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>#${index + 1} ${movie.title}</h3>
      <p>⭐ ${movie.vote_average.toFixed(1)}/10</p>
    `;
    container.appendChild(card);
  });
}

// Load More
function loadMoreMovies() {
  currentVisible += 8;
  displayMovies(allMovies.slice(0, currentVisible));
  if (currentVisible >= allMovies.length) {
    document.getElementById('loadMoreBtn').style.display = 'none';
  }
}

// Filter by Category
function filterMovies(category) {
  let filteredMovies;
  if (category === 'all') {
    filteredMovies = allMovies;
  } else {
    filteredMovies = allMovies.filter(movie => {
      if (category === 'Action') return movie.genre_ids.includes(28);
      if (category === 'Drama') return movie.genre_ids.includes(18);
      if (category === 'Adventure') return movie.genre_ids.includes(12);
      if (category === 'Animation') return movie.genre_ids.includes(16);
    });
  }
  currentVisible = 8;
  displayMovies(filteredMovies.slice(0, currentVisible));
}

// Search movies
function searchMovies() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const filtered = allMovies.filter(movie => movie.title.toLowerCase().includes(input));
  displayMovies(filtered);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadMoviesFromTMDB();
  rotateTrailer();
  setInterval(rotateTrailer, 10000); // every 10 seconds
});
