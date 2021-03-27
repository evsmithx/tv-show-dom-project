//You can edit ALL of the code here
function setup() {
  const defaultShow = "82";
  makeSelectorForShows(defaultShow);
  makePageForShow(defaultShow);
}

function makeSelectorForShows(defaultShow){
  const select = document.getElementById("showSelector");
  const allShows = getAllShows().sort((show1, show2) => {
    return show1.name > show2.name;
  });

  let option, show;
  for (show of allShows){
    option = document.createElement("option");
    option.setAttribute("value", show.id);
    option.innerText = show.name;
    select.appendChild(option);
  }
  select.value = defaultShow;
}

function makePageForShow(showId){
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    // Get the response and extract the JSON
    .then(function (response) {
      return response.json();
    })
    // Do something with the JSON
    .then((allEpisodes) => {
      makePageForEpisodes(allEpisodes);
    })
    // If something goes wrong
    .catch((error) => console.log(error));
}

function makePageForEpisodes(episodeList) {
  const select = document.getElementById("episodeSelector");
  const episodesElem = document.getElementById("episodes");

  // clear episodes and episode selector
  while (select.lastChild) {
      select.removeChild(select.lastChild);
  }

  while (episodesElem.lastChild) {
    episodesElem.removeChild(episodesElem.lastChild);
  }
  
  let para, option;
  for (episode of episodeList) {
    para = makeNodeForEpisode(episode);
    episodesElem.appendChild(para);

    // add episode title to selector
    option = document.createElement("option");
    option.setAttribute("data-id", episode.id);
    const episodeNumber = episode.number.toString().padStart(2, "0");
    const episodeSeason = episode.season.toString().padStart(2, "0");
    option.innerText = `${episode.name} - S${episodeSeason}E${episodeNumber}`;
    select.appendChild(option);
  }
}


function makeNodeForEpisode(episode) {
  const para = document.createElement("article");
  para.id = episode.id;
  const title = document.createElement("h2");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  const episodeSeason = episode.season.toString().padStart(2, "0");
  title.innerText = `${episode.name} - S${episodeSeason}E${episodeNumber}`;

  para.appendChild(title);
  const info = document.createElement("div");
  para.appendChild(info);
  const elem = document.createElement("img");
  info.appendChild(elem);
  elem.src = episode.image.medium;

  info.insertAdjacentHTML("beforeend", episode.summary);
  return para;
}

function searchFunction() {
  // Declare variables
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();

  const rootElem = document.getElementById("root");
  const articles = rootElem.getElementsByTagName("article");

  // Loop through all list items, and hide those who don't match the search query
  let i, p, h2, txtValue;
  for (i = 0; i < articles.length; i++) {
    p = articles[i].getElementsByTagName("p")[0];
    h2 = articles[i].getElementsByTagName("h2")[0];
    txtValue =
      (p.textContent || p.innerText) + " " + (h2.textContent || h2.innerText);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      articles[i].style.display = "";
    } else {
      articles[i].style.display = "none";
    }
  }
}

function selectFunction(sel) {
  const dataId = sel.getAttribute("data-id");
  document.getElementById(dataId).scrollIntoView({ behavior: "smooth" });
}

function selectShowFunction(sel) {
  const dataShowId = sel.getAttribute("value");
  makePageForShow(dataShowId);
}

window.onload = setup;
