let dbPromised = idb.open('bundesliga-id', 1, (upgradeDb) => {
    let teamsObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id'
    })
    teamsObjectStore.createIndex('saved_team', 'saved_team', {
        unique: false
    })
})

function saveForLater({
    id,
    name,
    crestUrl,
    founded,
    venue,
    website
}) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            let item = {
                id: id,
                name: name,
                crestUrl: crestUrl,
                founded: founded,
                venue: venue,
                website: website,
            }
            console.log(item);
            store.add(item);
            return tx.complete;
        })
        .then(function () {
            console.log('Team Saved')
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction('teams', 'readonly')
                let store = tx.objectStore('teams')
                return store.getAll()
            })
            .then((team) => {
                resolve(team)
            })
    })
}

function deleteSavedTeam(id) {
    dbPromised
        .then((db) => {
            let tx = db.transaction('teams', 'readwrite')
            let store = tx.objectStore('teams')
            store.delete(id)
            return tx.complete
        })
        .then(() => {
            console.log('Team Deleted')
        })
}