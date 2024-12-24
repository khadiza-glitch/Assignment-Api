const countryContainer = document.getElementById("countryContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const seeMoreButton = document.getElementById("seeMoreButton");

let allCountries = [];


async function fetchAllCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        allCountries = await response.json();
        displayCountries(allCountries.slice(0, 12));
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}


function displayCountries(countries) {
    countryContainer.innerHTML = "";
    countries.forEach((country) => {
        const countryCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${country.flags.svg}" class="card-img-top" alt="Flag of ${country.name.common}">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <p class="card-text">Population: ${country.population.toLocaleString()}</p>
                        <p class="card-text">Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
                        <button class="btn btn-primary" onclick="redirectToDetails('${country.cca3}')">More Details</button>
                    </div>
                </div>
            </div>
        `;
        countryContainer.innerHTML += countryCard;
    });
}


function redirectToDetails(countryCode) {
    window.location.href = `details.html?code=${countryCode}`;
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        const filteredCountries = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(query)
        );
        displayCountries(filteredCountries);


        seeMoreButton.style.display = "none";
    }
});


seeMoreButton.addEventListener("click", () => {
    displayCountries(allCountries);
});

fetchAllCountries();
