//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  for (episode of episodeList){
    var para = makeNodeForEpisode(episode)
    rootElem.appendChild(para);
  }
  var source = document.createElement("div");
  rootElem.appendChild(source);
  source.innerHTML = "<p>Info from <a href=\"http://TVMaze.com\">TVMaze.com<\a><\p>";
}

function makeNodeForEpisode(episode){
    var para = document.createElement("article");
    var title = document.createElement("h2");
    const episodeNumber = episode.number.toString().padStart(2, '0');
    const episodeSeason = episode.season.toString().padStart(2, '0');
    title.innerText = `${episode.name} - S${episodeSeason}E${episodeNumber}`;

    para.appendChild(title);
    var info = document.createElement("div");
    para.appendChild(info);
    var elem = document.createElement("img");
    info.appendChild(elem);
    elem.src = episode.image.medium;

    info.insertAdjacentHTML('beforeend', episode.summary);
    return para;
}

function searchFunction() {
  // Declare variables
  const input = document.getElementById('myInput');
  const filter = input.value.toUpperCase();

  const rootElem = document.getElementById("root");
  const articles = rootElem.getElementsByTagName('article');

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < articles.length; i++) {
    let p = articles[i].getElementsByTagName("p")[0];
    let h2 = articles[i].getElementsByTagName("h2")[0];
    let txtValue = (p.textContent || p.innerText) + " " + (h2.textContent || h2.innerText);
    if (txtValue.toUpperCase().indexOf(filter) > -1) { 
      articles[i].style.display = "";
    } else {
      articles[i].style.display = "none";
    }
  }
}
window.onload = setup;
