// Global variables
let currentMovieId = null;
let currentType = 'movie';
let popAdAlreadyLaunched = false;

// Fetch movies
function fetchMovies(url, containerId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      data.results.forEach(item => {
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        img.alt = item.title || item.name;
        img.classList.add('fade-in');
        img.onclick = () => openPlayer(item.id, item.media_type || currentType);
        container.appendChild(img);
      });
    });
}

// Open Movie Player
function openPlayer(id, type = 'movie') {
  showToast('Loading your movie...');
  launchPopAd();

  currentMovieId = id;
  currentType = type;

  const iframe = document.getElementById('player-iframe');
  const spinner = document.getElementById('loading-spinner');
  const modal = document.getElementById('player-modal');

  spinner.style.display = 'flex';
  iframe.style.display = 'none';

  const server = document.getElementById('server-selector').value;
  iframe.src = buildPlayerURL(server, id, type);

  iframe.onload = () => {
    spinner.style.display = 'none';
    iframe.style.display = 'block';
  };

  modal.style.display = 'flex';
}

// Build URL
function buildPlayerURL(server, id, type) {
  return `https://${server}/embed/${type}?id=${id}`;
}

// Close Modal
function closePlayer() {
  const modal = document.getElementById('player-modal');
  modal.style.display = 'none';
  const iframe = document.getElementById('player-iframe');
  iframe.src = '';
}

// Change Server
function changeServer() {
  if (currentMovieId && currentType) {
    openPlayer(currentMovieId, currentType);
  }
}

// Toast Notification
function showToast(message = 'Loading...') {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.style.visibility = 'visible';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.visibility = 'hidden';
  }, 3000);
}

// Launch PopAd
function launchPopAd() {
  if (popAdAlreadyLaunched) return;

  setTimeout(() => {
    var z=window,r="fed6e471b4c88049ce9a5b28346f6a05",f=[["siteId",193-536*218*244+33705522],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],y=["d3d3LmNkbjRhZHMuY29tL3dibHVlaW1wLWdhbGxlcnkubWluLmNzcw==","ZDNnNW92Zm5nanc5YncuY2xvdWRmcm9udC5uZXQvaS9oY2lyY2xlcy5taW4uanM="],s=-1,n,j,b=function(){clearTimeout(j);s++;if(y[s]&&!(1771690455000<(new Date).getTime()&&1<s)){n=z.document.createElement("script");n.type="text/javascript";n.async=!0;var e=z.document.getElementsByTagName("script")[0];n.src="https://"+atob(y[s]);n.crossOrigin="anonymous";n.onerror=b;n.onload=function(){clearTimeout(j);z[r.slice(0,16)+r.slice(0,16)]||b()};j=setTimeout(b,5E3);e.parentNode.insertBefore(n,e)}};if(!z[r]){try{Object.freeze(z[r]=f)}catch(e){}b()};

    popAdAlreadyLaunched = true;
  }, 5000);
}

// Search TMDB
function searchTMDB() {
  const query = document.getElementById('searchInput').value;
  if (query.length > 2) {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=YOUR_TMDB_API_KEY&query=${query}`)
      .then(response => response.json())
      .then(data => {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        data.results.forEach(item => {
          if (item.poster_path) {
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            img.alt = item.title || item.name;
            img.classList.add('fade-in');
            img.onclick = () => openPlayer(item.id, item.media_type || 'movie');
            searchResults.appendChild(img);
          }
        });
      });
  } else {
    document.getElementById('searchResults').innerHTML = '';
  }
}

// Load Trending Content
function loadTrending() {
  fetchMovies('https://api.themoviedb.org/3/trending/movie/week?api_key=2fc7b3876456eb119074d7db7ab5a65a', 'movies-list');
  fetchMovies('https://api.themoviedb.org/3/trending/tv/week?api_key=2fc7b3876456eb119074d7db7ab5a65a', 'tvshows-list');
  fetchMovies('https://api.themoviedb.org/3/trending/all/week?api_key=2fc7b3876456eb119074d7db7ab5a65a', 'anime-list');
}

// Initialize
loadTrending();
