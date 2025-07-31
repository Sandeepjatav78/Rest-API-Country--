const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString).get("name");

const flagImage = document.querySelector('img')
const countryName = document.querySelector('.country-name')
const title = document.querySelector('title')
const titleImage = document.querySelector('#fevicon')
const btn = document.querySelector('button')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const languages = document.querySelector('.languages')
const domain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const borders = document.querySelector('.borders')


const dark=document.querySelector('.light-and-dark-container')
const body=document.querySelector('body')
const i=document.querySelector('i')

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
        localStorage.setItem("isDark",false)
    } else {
        body.classList.add("dark")
        i.classList.remove('fa-regular', 'fa-moon');
        i.classList.add('fa-solid', 'fa-sun');
        localStorage.setItem("isDark",true)
    }
})
btn.addEventListener('click', () => {
    window.history.back()
})



function buttonCreate(country) {
    const a = document.createElement("a");
    a.href=`card.html?name=${country}`
    a.innerHTML = `${country}`

    borders.append(a)
}


fetch(`https://restcountries.com/v3.1/name/${searchParams}?fullText=true`).then((res) => {
    return res.json();
}).then((data) => {
    if (data[0].borders) {
        data[0].borders.forEach(country => {
            fetch(`https://restcountries.com/v3.1/alpha/${country}`).then((res)=>res.json())
            .then(([data])=>{
                buttonCreate(data.name.common)
            })
        });
    }

    titleImage.href = data[0].flags.svg
    flagImage.src = data[0].flags.svg
    if (data[0].name.nativeName) {
        nativeName.innerText = Object.values(data[0].name.nativeName)[0].common
    }
    population.innerText = data[0].population.toLocaleString('en-IN')
    region.innerText = data[0].region
    if (data[0].capital) {
        capital.innerText = Object.values(data[0].capital).join(', ')
    }
    if (data[0].subregion) {
        subRegion.innerText = data[0].subregion
    }
    domain.innerText = data[0].tld.join(', ');
    if (data[0].currencies) {
        currencies.innerText = Object.values(data[0].currencies).map((curr) => curr.name).join(', ')
    }
    if (data[0].languages) {
        languages.innerText = Object.values(data[0].languages).join(', ')
    }


})


countryName.innerText = searchParams
title.innerText = searchParams

