// Funksjon for å legge til billett og sende data til serveren
document.getElementById("kjop").onclick = async function leggTilBillett() {
    let film = document.getElementById("film").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefon = document.getElementById("telefon").value;
    let epost = document.getElementById("epost").value;

    // Validering
    let isValid = true; // Anta at data er gyldig til det motsatte er bevist

    const epostRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    const tlfRegex = /^\d{3}[\s-]?\d{2}[\s-]?\d{3}$/;

    if(film == "velg") {
        document.getElementById("filmError").innerHTML = "Må velge en film";
        isValid = false;
    } else {
        document.getElementById("filmError").innerHTML = "";
    }

    if(antall == "") {
        document.getElementById("antallError").innerHTML = "Må skrive noe inn i antall";
        isValid = false;
    } else if(Number(antall) >= 1) {
        document.getElementById("antallError").innerHTML = "";
    } else {
        document.getElementById("antallError").innerHTML = "Antallet må være gyldig";
        isValid = false;
    }

    if(fornavn == "") {
        document.getElementById("fornavnError").innerHTML = "Må skrive noe inn i fornavnet";
        isValid = false;
    } else {
        document.getElementById("fornavnError").innerHTML = "";
    }

    if(etternavn == "") {
        document.getElementById("etternavnError").innerHTML = "Må skrive noe inn i etternavnet";
        isValid = false;
    } else {
        document.getElementById("etternavnError").innerHTML = "";
    }

    if(telefon == "") {
        document.getElementById("telefonError").innerHTML = "Må skrive noe inn i telefon nummer";
        isValid = false;
    } else if(!tlfRegex.test(telefon)) {
        document.getElementById("telefonError").innerHTML = "Skriv inn et gyldig telefon nummer";
        isValid = false;
    } else {
        document.getElementById("telefonError").innerHTML = "";
    }

    if(epost == "") {
        document.getElementById("epostError").innerHTML = "Må skrive noe inn i epost";
        isValid = false;
    } else if(!epostRegex.test(epost)) {
        document.getElementById("epostError").innerHTML = "Skriv inn en gyldig epost";
        isValid = false;
    } else {
        document.getElementById("epostError").innerHTML = "";
    }

    if(!isValid) {
        return; // Avslutter funksjonen tidlig hvis data er ugyldig
    }

    // Opprett billettobjekt basert på gyldige data
    let billett = { film, antall, fornavn, etternavn, telefon, epost };

    // Send data til server med POST-forespørsel
    try {
        await fetch('http://localhost:8080/billetter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(billett),
        });
        visBilletter(); // Oppdater visningen ved å hente oppdaterte billetter fra server
    } catch(error) {
        console.error("Feil ved sending av data til server:", error);
    }
};

// Funksjon for å hente og vise billetter fra server
async function visBilletter() {
    try {
        const response = await fetch('http://localhost:8080/billetter');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const billetter = await response.json();

        let table = "<table class='table'><thead><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefon</th><th>Epost</th></tr></thead><tbody>";
        if (Array.isArray(billetter)) {
            billetter.forEach(billett => {
                table += `<tr><td>${billett.film}</td><td>${billett.antall}</td><td>${billett.fornavn}</td><td>${billett.etternavn}</td><td>${billett.telefon}</td><td>${billett.epost}</td></tr>`;
            });
        } else {
            console.error("Received data is not an array:", billetter);
        }
        table += "</tbody></table>";
        document.getElementById("billetter").innerHTML = table;
    } catch(error) {
        console.error("Feil ved henting av billetter fra server:", error);
    }
}

// Funksjon for å slette alle billetter på server og oppdatere visningen
document.getElementById("slett").onclick = async function slettAlt() {
    try {
        await fetch('http://localhost:8080/billetter', {
            method: 'DELETE',
        });
        visBilletter(); // Oppdater visningen etter sletting
    } catch(error) {
        console.error("Feil ved sletting av billetter:", error);
    }
};

// Initialiser visning av billetter ved innlasting av siden
visBilletter();