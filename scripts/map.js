function myMap(centerLat, centerLng, zoomLevel) {
    var europeBounds = {
        north: 71.0,
        south: 34.5,
        west: -25.0,
        east: 45.0
    };

    var mapProp = {
        center: new google.maps.LatLng(centerLat, centerLng),
        zoom: zoomLevel,
        restriction: {
            latLngBounds: europeBounds,
            strictBounds: true
        }
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var locations = [
        {lat: 38.71667, lng: -9.139, title: 'Lisbon', url: 'home_lisboa.html', isBigger: true},
        {lat: 48.8566, lng: 2.3522, title: 'Paris', url: 'home_paris.html', isBigger: true},
        {lat: 40.416775, lng: -3.703790, title: 'Madrid', url: 'home_madrid.html', isBigger: true},
        {lat: 41.902782, lng: 12.496366, title: 'Rome', url: 'home_roma.html'},
        {lat: 37.983810, lng: 23.727539, title: 'Athens', url: 'home_atenas.html'},
        {lat: 38.697056, lng: -9.206528, title: 'Mosteiro Jerónimos', url: 'mosteiro.html'},
        {lat: 38.691583, lng: -9.215883, title: 'Torre Belém', url: 'torre_belem.html'},
        {lat: 38.768891, lng: -9.094406, title: 'Parque das Nações', url: 'parque_nacoes.html'},
        {lat: 38.693615, lng: -9.205115, title: 'Padrão Descobrimentos', url: 'padrao_descobrimentos.html'}
       /* {lat: 40.41831, lng: -3.71406, title: 'Palácio Real'},
        {lat: 40.41378, lng: -3.692127, title: 'Museu do Prado'},
        {lat: 40.415352, lng: -3.707398, title: 'Plaza Mayor'},
        {lat: 40.4240, lng: -3.7176, title: 'Templo de Debod'},
        {lat: 48.8706, lng: 2.3315, title: 'Operá Garnier'},
        {lat: 48.8462, lng: 2.3371, title: 'Jardim de Luxemburgo'},
        {lat: 48.8738, lng: 2.2950, title: 'Arco do Triunfo'},
        {lat: 48.8584, lng: 2.2945, title: 'Torre Eiffel'},
        {lat: 48.8606, lng: 2.3376, title: 'Museu do Louvre'}*/
    ];

    locations.forEach(location => {
        var markerIcon = {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', // Default marker icon
            scaledSize: new google.maps.Size(30, 30)
        };

        if (location.isBigger) {
            markerIcon.scaledSize = new google.maps.Size(40, 40);
        }


        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
            title: location.title,
            icon: markerIcon
        });

        google.maps.event.addListener(marker, 'click', function(){
            window.location.href = location.url;
        });
    });
}
