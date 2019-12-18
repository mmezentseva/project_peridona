// подключение карты

ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: 'ул. Литераторов, д. 19',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]
    },
    {
        latitude: 59.94,
        longitude: 30.25,
        hintContent: 'Малый проспект В.О., д. 64',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]

    },
    {
        latitude: 59.93,
        longitude: 30.34,
        hintContent: 'наб. реки Фонтанки, д. 56',
        balloonContent: [
        'Самые вкусные бургеры у нас!',
        ]
    },
],

geoObjects = [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark ([placemarks[i].latitude, placemarks[i].longitude], 
        {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        },
        {
            iconLayout: 'default#image',
            iconImageHref: './img/logos/map-marker.svg',
            iconImageSize: [46,57],
            iconImageOffset: [-23, -57]
        });

    }

    var clusterer = new ymaps.Clusterer ({
        clusterIcons: [
            {
                href: './img/logos/burgerMap.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],

        clusterIconContentLayout: null

    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}