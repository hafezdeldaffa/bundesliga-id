const registration = () => {
    //Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(() => {
                console.log("Pendaftaran Service Worker berhasil");
            }).catch(() => {
                console.log('Pendaftaran Service Worker gagal');
            });
        });
    } else {
        console.log("Service Worker belum didukung browser ini")
    }
}

const notification = () => {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(result => {
                if (result === 'denied') {
                    console.log('Denied')
                    return
                } else if (result === 'default') {
                    console.log('Default!')
                    return
                }

                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration()
                        .then(reg => {
                            reg.pushManager
                                .subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(
                                        'BKlLbmFpCFaw2wGxY3_n3usP_GGTVLIgSf3XUrqNP2wIxi3BvBJjc4x6TTgpSwVTtvvJSkwKMcLok9rUrDkQOD4')
                                })
                                .then(sub => {
                                    console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                                    console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                        null, new Uint8Array(sub.getKey('p256dh')))))
                                    console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                        null, new Uint8Array(sub.getKey('auth')))))
                                })
                                .catch(err => console.log('Gagal Subscribe : ', err))
                        })
                }
            })
    }
}

export default {
    registration,
    notification
}