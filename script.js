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

window.onload = setup;
