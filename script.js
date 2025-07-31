const cardContainer = document.querySelector(".card-container")
const searchBYRegion = document.querySelector('.regions-filter');
const search = document.querySelector('#search');
const dark = document.querySelector('.light-and-dark-container')
const body = document.querySelector('body')
const i = document.querySelector('i')
const error = document.querySelector('.error')

if (localStorage.getItem('isDark') == "true") {
    body.classList.add('dark')
    i.classList.remove('fa-regular', 'fa-moon');
    i.classList.add('fa-solid', 'fa-sun');
} else {
    i.classList.add('fa-regular', 'fa-moon');
    i.classList.remove('fa-solid', 'fa-sun');
    body.classList.remove('dark')
}

dark.addEventListener('click', () => {

    if (body.classList.contains('dark')) {
        body.classList.remove("dark")
        i.classList.add('fa-regular', 'fa-moon');
        i.classList.remove('fa-solid', 'fa-sun');
        localStorage.setItem("isDark", false)
    } else {
        body.classList.add("dark")
        i.classList.remove('fa-regular', 'fa-moon');
        i.classList.add('fa-solid', 'fa-sun');
        localStorage.setItem("isDark", true)
    }
})

searchBYRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) => {
        return res.json();
    }).then(renderData)
})

let allCountryData;
search.addEventListener('input', (e) => {
    // console.log(e.target.value);
    const filteredCountry = allCountryData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase().trim())
    )

    renderData(filteredCountry)
})


function createCard(flag, country, population, region, capital) {
    const a = document.createElement("a");
    a.href = `card.html?name=${country}`
    a.innerHTML = `
                <div class="card">
                    <div class="flag">
                        <img src="${flag}" alt="">
                    </div>
    
                    <div class="details">
                        <div class="country "><b>${country}</b></div>
                        <div class="population sty">
                            <p>Population: <span>${population.toLocaleString('en-IN')}</span></p>
                        </div>
                        <div class="region sty">
                            <p>Region: <span>${region}</span></p>
                        </div>
                        <div class="capital sty">
                            <p>Capital: <span>${capital}</span></p>
                        </div>
                    </div>
                </div>
        `
    cardContainer.append(a)
}

fetch('contries.json').then((res) => {
    return res.json();
}).then((data) => {
    allCountryData = data;
    renderData(data);
}).catch((err) => {
    error.innerText = err.message +", Please reload the page ";
})

function renderData(data) {
    cardContainer.innerHTML = "";
    data.forEach(particularCountry => {
        let countryCode = particularCountry.cca2;
        let imageScr = `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
        let countryName = particularCountry.name?.common || "N/A";
        let population = particularCountry.population || 0;
        let region = particularCountry.region || "N/A";
        let capital = particularCountry.capital || "N/A";

        createCard(imageScr, countryName, population, region, capital);
    });
}
