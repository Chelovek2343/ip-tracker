const ipAddress = document.getElementById('ipAddress');
const local = document.getElementById('local');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const form = document.querySelector('form');
const input = document.getElementById('inputInfo');

getIpGeo();
getSearch();

async function getIpGeo() {
    const response = await fetch(
        'https://geo.ipify.org/api/v2/country,city?apiKey=at_m3mLJ13Bwn59hEj2BGoGtZ301U7qU'
    );
    const data = await response.json();

    ipAddress.innerHTML = data.ip;
    local.innerHTML = `${data.location.country}, ${data.location.region}`;
    timezone.innerHTML = `UTC ${data.location.timezone}`;
    isp.innerHTML = data.isp;
}

function getSearch() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        getRequest();

        async function getRequest() {
            const resp = await fetch(
                `https://api.ipbase.com/v2/info?ip=${input.value}&apikey=cv0RpW6T20kzcXXNeFMGoeI33xLCS1vBmkO7ZKSJ`
            );

            const respData = await resp.json();

            const utcZone = respData.data.timezone.current_time.slice(19, 25);

            ipAddress.innerHTML = respData.data.ip;
            local.innerHTML = `${respData.data.timezone.id}`;
            timezone.innerHTML = `UTC ${utcZone}`;
            isp.innerHTML = respData.data.connection.isp;

            console.log(respData);
        }
    });
}

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
