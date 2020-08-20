(async () => {
  let rawData = await fetch("https://api.github.com/users/lnardon");
  let response = await rawData.json();
  console.log(response);

  document.getElementById("profilePic").src = response.avatar_url;
  document.getElementById("userName").innerText = response.name;

  rawData = await fetch("https://api.github.com/users/lnardon/events/public");
  response = await rawData.json();
  console.log(response);

  response.forEach((event) => {
    let div = document.createElement("div");
    div.innerText = event.type;
    let parent = document.getElementById("events");
    parent.appendChild(div);
  });
})();
