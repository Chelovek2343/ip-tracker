const ipAddress = document.getElementById('ipAddress');
const local = document.getElementById('local');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

getIpGeo();

async function getIpGeo(){
    const response = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_m3mLJ13Bwn59hEj2BGoGtZ301U7qU');
    const data = await response.json();

    ipAddress.innerHTML = data.ip;
    local.innerHTML = `${data.location.country}, ${data.location.region}`;
    timezone.innerHTML = `UTC ${data.location.timezone}`;
    isp.innerHTML = data.isp;
}

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);