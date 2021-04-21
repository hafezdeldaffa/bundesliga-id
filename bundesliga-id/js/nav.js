document.addEventListener('DOMContentLoaded', function () {
  // Activate sidebar nav
  let elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
          elm.innerHTML = xhttp.responseText;
        });

        //Daftarkan event listener
        document.querySelectorAll('.sidenav a, .topnav a').forEach((elm) => {
          elm.addEventListener('click', function (event) {

            //Tutup sidenav
            let sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            //Membuat konten halaman yang dipanggil
            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          })
        })
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  //Load Page Content
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';
  loadPage(page);

  function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let content = document.querySelector("#body-content");

        if (page === 'home') {
          getTeams()
        } else if (page === 'saved') {
          getSavedTeams()
        } else if (page === 'standing') {
          getAllStandings()
        }

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText
        } else if (this.status === 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan</p>'
        } else {
          content.innerHTML = '<p>Halaman tidak dapat di akses</p>'
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});