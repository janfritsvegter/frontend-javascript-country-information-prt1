import axios from "axios";
import flag from "./assets/Flag_of_the_United_Nations.png";
const htmlBaseElement = document.getElementById("country-info");
const flag = require("./assets/Flag_of_the_United_Nations.png")
htmlBaseElement.innerHTML = `
            <img src="${flag}" alt="" height="50"/>  
            <span class="country-name">Zoek een land</span>
            <p>Type een naam van een land in het zoekvlak om gegevens op te vragen.</p>`;

const inputField = document.getElementById('input-field');
const inputForm = document.getElementById("input-form");

inputForm.addEventListener('submit', function (e) {
    const country = inputField.value;
    e.preventDefault();

    async function getData() {
        try {
            // ophalen van de data
            const uri = `https://restcountries.com/v2/name/${country}`;
           /*
            console.log(uri);
            const result = await axios.get(uri);
            console.log(result.config);
            console.log(result); // controleren wat er teruggeven wordt in de console en kijken hoe die er uit ziet
            console.log(result.data); // controleren of het juiste keyword gekozen is
            console.log(result.data[0]);// controleren of het juiste keyword/positie gekozen is
            console.log(result.data[0].languages);
            console.log(result.data[0].capital);
            console.log(result.data[0].currencies);
            */
            const htmlBaseElement = document.getElementById("country-info");
            const {name, languages, population, capital, subregion, currencies, flags: {png: flag}} = result.data[0];
            let capitalCity
            if(capital){ capitalCity = capital } else {capitalCity = "geen eigen hoofdstad"}

            let payPossibilities = "geen eigen betaalmiddel";
            if(currencies) {
                payPossibilities = `${currencies[0].name}'s`;
                if (currencies.length > 1) {
                    for (let i = 1; i < currencies.length; i++) {
                        payPossibilities += ` en ${currencies[i].name}'s`;
                    }
                }
            }

            let spokenLanguages = "geen eigen taal";
            // console.log("aantal talen " + languages.length);
            if(languages) {
                spokenLanguages  = `${languages[0].name}/${languages[0].nativeName}`;
                if (languages.length > 1) {
                    for (let i = 1; i < languages.length; i++) {
                        console.log(i + " " + languages[i].name);
                        spokenLanguages += ` en ${languages[i].name}/${languages[i].nativeName}`;
                    }
                }
            }
            htmlBaseElement.innerHTML = `
            <img src="${flag}" alt="" height="50"/>  
            <span class="country-name">${name}</span>
            <p>Het land ${name} ligt in de regio ${subregion} en heeft ${population} inwoners</p>
            <p>De hoofdstad is ${capitalCity} en je kunt er betalen met ${payPossibilities}.</p>
            <p>En ze spreken er ${spokenLanguages}</p>`;

        } catch (e) {
            console.error(e);
            // console.log("niet gevonden beter typen johh!!!!!")

            const htmlBaseElement = document.getElementById("country-info");
            const flag = require("./assets/Flag_of_the_United_Nations.png")
            htmlBaseElement.innerHTML = `
            <img src="${flag}" alt="" height="50"/>  
            <span class="country-name">${country}</span>
            <p>Het land ${country} is niet gevonden controleer de naam en probeer opnieuw.</p>`;

        }
    }

    getData()

});

