const webpush = require('web-push');

const vapidKeys = {
    "publicKey": "<BKlLbmFpCFaw2wGxY3_n3usP_GGTVLIgSf3XUrqNP2wIxi3BvBJjc4x6TTgpSwVTtvvJSkwKMcLok9rUrDkQOD4>",
    "privateKey": "L5K6rZRVffk8i1vkgzPQc2-QkqMbi-aKYDLPd1stRVQ"
};

webpush.setGCMAPIKey('AAAAReS3OAk:APA91bEcs28L_4zamz81v6nGqkgLqtt7iHeBv-t5CQbYVYK_xgqOK9AMiV10XxSnGeitKLlNTK5HKqdfCv9p0PmD8Gw77Jfe_yGReGSY03LweO3VPmy1y5vcAftAhZ5uZc01qV1DYm8E')
webpush.setVapidDetails(
    'mailto:hafezdeldaffa9@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const subscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/c-y4mIgJEBA:APA91bHGXSLxccOHrXsPlcgJIGMuXFdPeny67TdMlVUpLRxu9fc0el_5GmqXlFg5aIQPT_1A94JJkN60brTsGQD_Y-7KOPxFmuwaOfFbOj4SuiGcW-wYLCm7Wl54z0SlK3XwtBhPTu6E',
    keys: {
        auth: 'xqXmdP2Ynh14efKaXalb4w==',
        p256dh: 'BOQLfxpa4vgOl6uZGnBh8HeZqB1ZLPUl4RrZuRlY3+Fdlo+g3ycpIagcxpxogU+VcKHUL5zdWG3jHpO4wu+LWHw='
    }
}

webpush.sendNotification(subscription, 'Payload success!')