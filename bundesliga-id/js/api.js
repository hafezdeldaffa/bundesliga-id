const base_url = 'https://api.football-data.org';
const api_token = 'ced6ce024930413d8173fd66ea43a687';
const leagueID = 2002;

const teams_endpoint = `${base_url}/v2/competitions/${leagueID}/teams`;
const competition_endpoint = `${base_url}/v2/competitions/${leagueID}/standings`;

//Blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);

    //Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

//Blok kode untuk memparsing json menjadi array javascript
function json(response) {
  return response.json();
}

//Blok kode untuk menghandle kesalahan di blok catch
function error(error) {
  //Parameter error berasal dari promise.reject
  console.log(`Error: ${error}`);
}

//Blok kode untuk melakukan request data json
function getTeams() {
  if ('caches' in window) {
    caches.match(teams_endpoint).then((response) => {
      if (response) {
        response
          .json()
          .then((data) => {
            let teamsData = '';
            data = data.teams;
            data.forEach((team) => {
              let teamImage = team.crestUrl;
              teamImage = teamImage.replace(/^http:\/\//i, 'https://');
              teamsData += `
                        <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                            <center><img class="activator center-align responsive-img" alt="${team.name}" style="width: 20%; margin-top: 5%"  src="${teamImage}"></center>
                            </div>
                            <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
                            <p>Klik untuk melihat info</p>
                            </div>
                            <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
                            <h6>Founded     : ${team.founded}</h6>
                            <h6>Venue       : ${team.venue}</h6>
                            <h6>Website     : ${team.website}</h6>
                            </div>

                            <div class="card-action center-align">
                            <button onclick ="saveTeam(${team.id}, '${team.name}','${teamImage}','${team.founded}','${team.venue}','${team.website}')" class="waves-effect waves-light btn red darken-4">Save</button>
                            </div>
                        </div>
                        `;
            });

            document.getElementById('progress').style.display = 'none'
            //Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById('teams').innerHTML = teamsData;
          })
          .catch((err) => console.log(err));
      }
    });
  }

  fetch(teams_endpoint, {
      headers: {
        'X-Auth-Token': api_token,
      },
    })
    .then(status)
    .then(json)
    .then((data) => {
      //Objek/array javascript di response.json() masuk lewat data
      //Menyusun komponen teams secara dinamis
      let teamsData = '';
      data = data.teams;
      data.forEach((team) => {
        let teamImage = team.crestUrl;
        teamImage = teamImage.replace(/^http:\/\//i, 'https://');
        teamsData += `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                <center><img class="activator center-align responsive-img" alt="${team.name}" style="width: 20%; margin-top: 5%"  src="${teamImage}"></center>
                </div>
                <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
                <p>Klik untuk melihat info</p>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
                <h6>Founded     : ${team.founded}</h6>
                <h6>Venue       : ${team.venue}</h6>
                <h6>Website     : ${team.website}</h6>
                </div>

                <div class="card-action center-align">
                <button onclick ="saveTeam(${team.id}, '${team.name}','${teamImage}','${team.founded}','${team.venue}','${team.website}')" class="waves-effect waves-light btn red darken-4">Save</button>
                </div>
            </div>
            
            `;
      });

      document.getElementById('progress').style.display = 'none'
      document.getElementById('teams').innerHTML = teamsData;
    })
    .catch((err) => console.log(err));
}

const getSavedTeams = () => {
  getAll().then((data) => {
    console.log(data);

    let teamsData = '';
    data.forEach((team) => {
      let teamImage = team.crestUrl;
      teamImage = teamImage.replace(/^http:\/\//i, 'https://');
      teamsData += `
            <center><h4>${team.name} Data : </h4></center>

            <div class="card">
                <div class="card-image waves-effect waves-block waves-light" width="50%">
                <center><img class="activator center-align responsive-img" alt="${team.name}" style="width: 20%; margin-top: 5%"  src="${teamImage}"></center>
                </div>
                <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
                <p>Klik untuk melihat info</p>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
                <h6>Founded     : ${team.founded}</h6>
                <h6>Venue       : ${team.venue}</h6>
                <h6>Website     : ${team.website}</h6>
                </div>

                <div class="card-action center-align">
                <button id="deleteTeams" onclick ="deleteTeam(${team.id}, '${team.name}')" class="waves-effect waves-light btn red darken-4">Delete</button>
                </div>
            </div>
            `;
    });

    document.getElementById('progress').style.display = 'none'
    document.getElementById('body-content').innerHTML = teamsData;

  });
};

function getAllStandings() {
  if ('caches' in window) {
    caches.match(competition_endpoint).then((response) => {
      if (response) {
        response.json().then((data) => {
          showStanding(data);
        });
      }
    });
  }

  fetch(competition_endpoint, {
      headers: {
        'X-Auth-Token': api_token,
      },
    })
    .then(status)
    .then(json)
    .then((data) => {
      showStanding(data);
    });
}

function showStanding(data) {
  let standingsData = '';
  let standingElement = document.getElementById('standings');

  data.standings[0].table.forEach((standing) => {
    standingsData += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      'https://'
                    )}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
                <table class="highlight centered responsive-table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Logo</th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standingsData}
                    </tbody>
                </table>
    `;
  document.getElementById('progress').style.display = 'none'
}

const deleteTeam = (id, name) => {
  let permission = confirm(
    `Anda yakin ingin menghapus ${name} dari Halaman Saved? ?`
  );
  if (permission) {
    //Delete Team From Database
    deleteSavedTeam(id);
    //Fetch All Team
    getAll();
    //Display Toast
    M.toast({
      html: `Berhasil Menghapus ${name}`,
      classes: 'rounded',
    });
    //Push Notification
    push(`Berhasil Menghapus ${name}`);
  }
};

const saveTeam = (id, name, crestUrl, founded, venue, website) => {
  //Add To Database
  saveForLater({
    id,
    name,
    crestUrl,
    founded,
    venue,
    website,
  });
  //Display Toast
  M.toast({
    html: `Berhasil Save ${name}`,
    classes: 'rounded',
  });

  //Push Notification
  push(`Berhasil Save ${name}`);
};

const push = (message) => {
  const title = 'Notification Bundesliga ID';
  const options = {
    body: message,
    icon: '/assets/image/icon-96.png',
  };
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.showNotification(title, options);
      })
      .catch((e) => {
        console.log(`Push Failed: ${e}`);
      });
  }
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}