const searchProfile = async () => {
  let eventsSection = document.getElementById("events");
  let username = document.getElementById("user").value;

  let rawData = await fetch(`https://api.github.com/users/${username}`);
  let response = await rawData.json();

  document.getElementById("profilePic").src = response.avatar_url;
  document.getElementById("userName").innerText = response.name;

  rawData = await fetch(
    `https://api.github.com/users/${username}/events/public`
  );
  response = await rawData.json();
  console.log(response);

  eventsSection.innerHTML = "";
  response.forEach((event) => {
    let div = document.createElement("div");
    div.classList.add("eventCardDiv");
    div.innerHTML = `<sl-card class="card-basic" style="width: 300px">
                      <div style="display: flex; align-items: center;">
                        <div>
                          <img src="https://wac-cdn.atlassian.com/dam/jcr:8da54c66-2109-41df-af77-b575b30e2edc/Git@2x.png?cdnVersion=1032" style="height:25px; margin-right: 1rem"/>
                        </div>
                        ${event.repo.name}</br>
                        ${event.type} </br>
                        ${event.created_at}
                      </div>
                    </sl-card>`;
    eventsSection.appendChild(div);
  });

  rawData = await fetch(`https://api.github.com/users/${username}/repos`);
  response = await rawData.json();
  console.log(response);

  let reposSection = document.getElementById("repos");
  reposSection.innerHTML = "";
  response.forEach((repo) => {
    let div = document.createElement("div");
    div.classList.add("eventCardDiv");
    div.setAttribute("onclick", `window.open('${repo.html_url}')`);
    div.innerHTML = `<sl-card class="card-basic repoCard" style="width: 300px">
                                   <div style="display: flex; align-items: center; cursor: pointer">
                                     <div>
                                       <img src="https://iconsplace.com/wp-content/uploads/_icons/40e0d0/256/png/folder-icon-17-256.png" style="height:25px; margin-right: 1rem"/>
                                     </div>
                                     ${repo.name} </br>
                                     ${repo.created_at}
                                   </div>
                                 </sl-card>`;
    reposSection.appendChild(div);
  });
};
