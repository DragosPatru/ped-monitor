export const countriesEU = [
    { key: "austria", title: "Austria" },
    { key: "belgium", title: "Belgium" },
    { key: "bulgaria", title: "Bulgaria" },
    { key: "croatia", title: "Croatia" },
    { key: "republic_of_cyprus", title: "Republic of Cyprus" },
    { key: "czech_republic", title: "Czech Republic" },
    { key: "denmark", title: "Denmark" },
    { key: "estonia", title: "Estonia" },
    { key: "finland", title: "Finland" },
    { key: "france", title: "France" },
    { key: "germany", title: "Germany" },
    { key: "greece", title: "Greece" },
    { key: "hungary", title: "Hungary" },
    { key: "ireland", title: "Ireland" },
    { key: "italy", title: "Italy" },
    { key: "latvia", title: "Latvia" },
    { key: "lithuania", title: "Lithuania" },
    { key: "luxembourg", title: "Luxembourg" },
    { key: "malta", title: "Malta" },
    { key: "netherlands", title: "Netherlands" },
    { key: "poland", title: "Poland" },
    { key: "portugal", title: "Portugal" },
    { key: "romania", title: "Romania" },
    { key: "slovakia", title: "Slovakia" },
    { key: "slovenia", title: "Slovenia" },
    { key: "spain", title: "Spain" },
    { key: "sweden", title: "Sweden" }
];

// Function to get a country by key
export function getCountryByKey(key) {
    return countriesEU.find(country => country.key === key);
}