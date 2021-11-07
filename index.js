const searchProfile = async () => {
  const tabsgroup = document.getElementById("tabGroup");
  const infosSection = document.getElementById("infos");
  const eventsSection = document.getElementById("events");
  const reposSection = document.getElementById("repos");
  const followersSection = document.getElementById("followers");
  const username = document.getElementById("user").value;

  //USER INFO
  let rawData = await fetch(`https://api.github.com/users/${username}`);
  let response = await rawData.json();
  if (response.message === "Not Found") {
    alert("User Not Found");
    return;
  }
  infosSection.innerHTML = "";
  let div = document.createElement("div");
  div.classList.add("eventCardDiv");
  div.innerHTML = `<sl-card class="card-basic repoCard" style="width: 300px">
                      <div class="cardIcon">
                        <img src="./user.png" style="height:25px; margin-right: 1rem"/>
                      </div>
                      <div style="display: flex; align-items: center; cursor: pointer">
                        Bio: ${response.bio}</br>
                        Followers: ${response.followers}</br>
                        Public Repos: ${response.public_repos}</br>
                        Location: ${response.location}
                      </div>
                    </sl-card>`;
  infosSection.appendChild(div);

  if (response.avatar_url) {
    const pic = document.getElementById("profilePic");
    pic.src = response.avatar_url;
    pic.style.display = "block";
  }
  document.getElementById("userName").innerText = response.name;

  //EVENTS
  rawData = await fetch(
    `https://api.github.com/users/${username}/events/public`
  );
  response = await rawData.json();
  eventsSection.innerHTML = "";
  response.forEach((event) => {
    const div = document.createElement("div");
    const auxreponame = event.repo.name.split("/");
    const reponame = auxreponame[auxreponame.length - 1];
    div.classList.add("eventCardDiv");
    div.innerHTML = `<sl-card class="card-basic" style="width: 300px">
                      <div style="display: flex; flex-direction: column">
                        <div class="cardIcon">
                          <img src="https://wac-cdn.atlassian.com/dam/jcr:8da54c66-2109-41df-af77-b575b30e2edc/Git@2x.png?cdnVersion=1032" style="height:25px; margin-right: 1rem"/>
                        </div>
                        <div class="eventCardTextDiv">
                          <h3 class="eventCardTitle">
                            ${reponame}
                          </h3>
                          <h4 class="eventType">${event.type}</h4>
                          <h5 class="dateLabel">${new Date(
                            Date.parse(event.created_at)
                          )}</h5>
                        </div>
                      </div>
                    </sl-card>`;
    eventsSection.appendChild(div);
  });

  //REPOS
  rawData = await fetch(`https://api.github.com/users/${username}/repos`);
  response = await rawData.json();
  reposSection.innerHTML = "";
  response.forEach((repo) => {
    const div = document.createElement("div");
    div.classList.add("eventCardDiv");
    div.setAttribute("onclick", `window.open('${repo.html_url}')`);
    div.innerHTML = `<sl-card class="card-basic repoCard" style="width: 300px">
                      <div style="display: flex;cursor: pointer; flex-direction: column">
                        <div class="cardIcon">
                          <img src="https://iconsplace.com/wp-content/uploads/_icons/40e0d0/256/png/folder-icon-17-256.png" style="height:25px; margin-right: 1rem"/>
                        </div>
                        <div style="display: flex; flex-wrap: nowrap; flex-direction: column">
                          <h3 class="eventCardTitle">${repo.name}</h3>
                          <h5 class="dateLabel">${new Date(
                            Date.parse(repo.created_at)
                          )}</h5>
                        </div>
                      </div>
                    </sl-card>`;
    reposSection.appendChild(div);
  });

  //FOLLOWERS
  rawData = await fetch(`https://api.github.com/users/${username}/followers`);
  response = await rawData.json();
  followersSection.innerHTML = "";
  response.forEach((follower) => {
    const div = document.createElement("div");
    div.classList.add("eventCardDiv");
    div.setAttribute("onclick", `window.open('${follower.html_url}')`);
    div.innerHTML = `<sl-card class="card-basic repoCard" style="width: 300px">
                      <div style="display: flex; align-items: center; cursor: pointer">
                        <img src=${follower.avatar_url} style="height:45px; margin-right: 1rem;border-radius: 50%"/>
                        <div style="display: flex; flex-wrap: wrap; overflow: hidden">
                          <h3 style="font-size: 1.25rem; color: rgba(0,0,0,0.75); text-overflow: ellipsis; overflow: hidden; white-space: nowrap">${follower.login}</h3>
                        </div>
                      </div>
                    </sl-card>`;
    followersSection.appendChild(div);
  });

  tabsgroup.style.display = "flex";
};
