// TMDB API Key and Base URL
const apiKey = "cb19a69a0be664944c4392c737efecdf";
const baseUrl = "https://api.themoviedb.org/3";
const bannerUrl = "https://image.tmdb.org/t/p/original";
const imgUrl = "https://image.tmdb.org/t/p/w300";

// API Requests
const requests = {
  fetchPopular: `${baseUrl}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apiKey}`,
  fetchTopRated: `${baseUrl}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchNetflixOriginals: `${baseUrl}/discover/tv?api_key=${apiKey}&with_networks=213`,
  fetchActionMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=28`,
  fetchComedyMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`,
  fetchHorrorMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=27`,
  fetchRomanceMovies: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=10749`,
  fetchDocumentaries: `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=99`
};

// Utility function to truncate text
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to fetch and display data
async function fetchAndDisplayData(requestUrl, containerId, titleText, posterClass, imagePath) {
  try {
    const response = await fetch(requestUrl);
    const data = await response.json();
    
    const container = document.getElementById(containerId);
    const row = document.createElement("div");
    row.className = "row";
    
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = titleText;
    row.appendChild(title);
    
    const rowPosters = document.createElement("div");
    rowPosters.className = "row__posters";
    row.appendChild(rowPosters);
    
    data.results.forEach((movie) => {
      const poster = document.createElement("img");
      poster.className = posterClass;
      poster.id = movie.id;
      poster.src = `${imgUrl}${movie[imagePath]}`;
      rowPosters.appendChild(poster);
    });
    
    container.appendChild(row);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Fetch and display the banner
async function displayBanner() {
  try {
    const response = await fetch(requests.fetchNetflixOriginals);
    const data = await response.json();
    const movie = data.results[Math.floor(Math.random() * data.results.length)];
    
    document.getElementById("banner").style.backgroundImage = `url(${bannerUrl}${movie.backdrop_path})`;
    document.getElementById("banner__title").innerText = movie.name;
    document.getElementById("banner__description").innerText = truncate(movie.overview, 150);
  } catch (error) {
    console.error("Failed to fetch banner data:", error);
  }
}

// Initialize the page
async function init() {
  await displayBanner();
  fetchAndDisplayData(requests.fetchNetflixOriginals, "headrow", "NETFLIX ORIGINAL", "row__posterLarge", "poster_path");
  fetchAndDisplayData(requests.fetchTopRated, "headrow", "Top Rated", "row__posterLarge", "poster_path");
  fetchAndDisplayData(requests.fetchActionMovies, "headrow", "Action Movies", "row__poster", "backdrop_path");
  fetchAndDisplayData(requests.fetchComedyMovies, "headrow", "Comedy Movies", "row__poster", "backdrop_path");
  fetchAndDisplayData(requests.fetchHorrorMovies, "headrow", "Horror Movies", "row__poster", "backdrop_path");
  fetchAndDisplayData(requests.fetchRomanceMovies, "headrow", "Romance Movies", "row__poster", "backdrop_path");
  fetchAndDisplayData(requests.fetchDocumentaries, "headrow", "Documentaries", "row__poster", "backdrop_path");
}

// Call the init function to kick things off
init();
