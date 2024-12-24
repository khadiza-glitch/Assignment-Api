
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get("code");


async function fetchCountryDetails() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const country = await response.json();
        displayCountryDetails(country[0]);
    } catch (error) {
        console.error("Error fetching country details:", error);
    }
}

function displayCountryDetails(country) {
    const countryName = document.getElementById("countryName");
    const countryDetails = document.getElementById("countryDetails");

    countryName.textContent = country.name.common;

    countryDetails.innerHTML = `
        <div class="col-md-6">
            <img src="${country.flags.svg}" class="img-fluid" alt="Flag of ${country.name.common}">
        </div>
        <div class="col-md-6">
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Area:</strong> ${country.area} km²</p>
            <p><strong>Currencies:</strong> ${Object.values(country.currencies || {}).map((c) => c.name).join(", ")}</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
        </div>
    `;
}


fetchCountryDetails();
