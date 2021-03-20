//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  // console.log(allEpisodes);
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  for (episode of episodeList){
    var para = makeNodeForEpisode(episode)
    rootElem.appendChild(para);
  }
}

function makeNodeForEpisode(episode){
    var para = document.createElement("div");
    var title = document.createElement("h2");
    const episodeNumber = episode.number.toString().padStart(2, '0');
    const episodeSeason = episode.season.toString().padStart(2, '0');
    title.innerText = `${episode.name} - S${episodeSeason}E${episodeNumber}`;

    para.appendChild(title);
    return para;
}

window.onload = setup;
