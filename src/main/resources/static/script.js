
let billetter = [];

document.getElementById("kjop").onclick = function leggTilBillett() {
    let film = document.getElementById("film").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefon = document.getElementById("telefon").value;
    let epost = document.getElementById("epost").value;

    let isValid = true;

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

    if (!isValid){
        return;
    }

    document.getElementById("film").value = "velg";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("epost").value = "";

    let billett = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefon: telefon,
        epost: epost
    };

    billetter.push(billett);
    visBilletter();
}

function visBilletter() {
    let table = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefon</th><th>Epost</th></tr>";
    billetter.forEach(function (billett) {
        table += "<tr>";
        table += "<td>" + billett.film + "</td>";
        table += "<td>" + billett.antall + "</td>";
        table += "<td>" + billett.fornavn + "</td>";
        table += "<td>" + billett.etternavn + "</td>";
        table += "<td>" + billett.telefon + "</td>";
        table += "<td>" + billett.epost + "</td>";
        table += "</tr>";
    });
    table += "</table>";
    document.getElementById("billetter").innerHTML = table;
}

document.getElementById("slett").onclick = function slettAlt(){
    billetter = [];
    document.getElementById("billetter").innerHTML = "";
}