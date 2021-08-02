const items =[ 
    
    {
        "name": "Ladder (Aluminium)",
        "controlepunten" : [
            "Identificatiecode op arbeidsmiddel (gegraveerd en eventueel sticker)",
            "Gebruikershandleiding in Nederlandse taal beschikbaar",
            "Beknopte gebruikersaanwijzing op arbeidsmiddel",
            "Vermelding van fabrikant, type, serienummer en bouwjaar",
            "Werking arbeidsmiddel (schuift goed, recht tegen muur te zetten)",
            "Werking uitschuifbegrenzing",
            "Speling van stijlen, sporten, bevestigingen, haken, etc.",
            "Rechtheid stijlen en sporten (niet verbogen, vervormd)",
            "Stijlen en sporten deugdelijk (o.a. geen scheuren, deuken, gaten, bramen, vervorming, vet/vuil, corrosie)",
            "Sport-stijlverbinding deugdelijk",
            "Bevestigingsmaterialen deugdelijk",
            "Laddervoeten deugdelijk",
            "Stabilisatiebalk deugdelijk",
            "Spreidstandbeveiliging deugdelijk",
            "Opsteek, schuif- en valhaken deugdelijk",
            "Optreklijn (min. 8 mm.) en katrol deugdelijk",
            "Reformpennen en haken deugdelijk",
            "Afdekdoppen en opvulstukken deugdelijk",
            "Versterkingsstrippen deugdelijk"
        ]
    },
    {
        "name": "Hijsbanden (Kunststof)",
        "controlepunten" : [
            "De CE-verklaring (2a verklaring) of het certificaat is aanwezig",
            "De hierop vermelde gegevens komen hiermee overeen",
            "Het label aan de band is leesbaar en alle gegevens staan erop",
            "De band heeft geen insnijdingen",
            "De band heeft geen wrijvingsvlakken",		
            "De band heeft geen slijtageplekken",		
            "Er zijn geen gaatjes van laspitten aanwezig"	,		
            "Indien beschadigingen aanwezig zijn, zijn deze in overeenstemming met de afkeurmaatstaven uit de norm of van de fabrikant."
        ]
    },   
    {
        "name": "Ketting",
        "controlepunten" : [
            "Identificatiecode op arbeidsmiddel",
            "Beproevingscertificaat",
            "Vermelding van fabrikant, type, serienummer, beproevingsdatum, certificaatnummer en werklast (WLL)",
            "Vermelding van CE-markering, als arbeidsmiddel na 1-1-1995 geproduceerd",
            "Diameter van kettingschakels mag niet 10 % minder dan nominale materiaaldikte zijn",
            "Topschalm niet vervormd",
            "Veiligheidshaak functioneert nog goed c.q. niet vervormd",
            "Geen inwerking door agressieve stoffen (zuren, oplosmiddelen en alkaliën)",
            "Geen knoop in de ketting ",
            "Ketting niet gecorrodeerd",
            "Ketting niet vuil/vettig",
            "Ketting niet vochtig opgeslagen",
        ]
    },
    
    
    
    ];





// ELEMENT DEFINITIONS
const controlepuntenList = document.getElementById("controlepunten__list");
const itemTitle = document.getElementById("itemTitle");
const itemHokjes = document.getElementById("hokjes");
const keuringsDatum = document.getElementById("keuringsdatum");


// BUTTONS
const nextbtn = document.getElementById("nextPoint");
const prevbtn = document.getElementById("previousPoint");
const passbtn = document.getElementById("passButton");
const failbtn = document.getElementById("failButton");


// EVENTLISTENERS
nextbtn.addEventListener("click", ()=> ChangeCheckpoint(+1));
prevbtn.addEventListener("click", ()=> ChangeCheckpoint(-1));
passbtn.addEventListener("click", ()=> passCheckpoint());
failbtn.addEventListener("click", ()=> failCheckpoint());


// VARIABLES
var typeOfItemToCheck = 0;
var currentCheckpointIndex = 0;

var dataArray = {};






// FUNCTIONS
function SetupPage()
{
    ResetDataArray();
    CreateHeaderSelect();
    CreateHokjes();
    ShowCurrentCheckpoint();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    keuringsDatum.innerHTML = today;
}


function ResetDataArray()
{
    dataArray = {};
    currentCheckpointIndex = 0;
}


function ShowCurrentCheckpoint()
{
    controlepuntenList.innerHTML = currentCheckpointIndex+1 + ": " + items[typeOfItemToCheck]["controlepunten"][currentCheckpointIndex];
}


function CreateHeaderSelect()
{
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = "mySelect";
    selectList.addEventListener("change", ()=> ChangeItemType());
    itemTitle.appendChild(selectList);
    
    //Create and append the options
    for (var i = 0; i < items.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = items[i]["name"];
        selectList.appendChild(option);
    }
}


function ChangeItemType()
{
    let valueOfSelectedItem = document.getElementById("mySelect").value;
    typeOfItemToCheck = valueOfSelectedItem;
    CreateHokjes();
    ResetDataArray();
    ShowCurrentCheckpoint();
}


function CreateHokjes()
{
    itemHokjes.innerHTML = "";
    console.log("items[typeOfItemToCheck][\"controlepunten\"].length: " + items[typeOfItemToCheck]["controlepunten"].length);
    for (let index = 0; index < items[typeOfItemToCheck]["controlepunten"].length; index++) {
        itemHokjes.innerHTML += "[" + (index+1) + "]";
        if (index % 9 == 0 && index != 0) {
            itemHokjes.innerHTML += "<br>";
        }
    }
}


function ChangeCheckpoint(direction)
{
    //if(currentCheckpointIndex < items[typeOfItemToCheck]["controlepunten"].length){
        currentCheckpointIndex += direction;
        ShowCurrentCheckpoint();
    //}
}


function SetCheckpointValue(checkpointToStoreTo, valueToStore)
{
    dataArray[checkpointToStoreTo] = valueToStore;
    console.log(dataArray);
}


function passCheckpoint()
{
    SetCheckpointValue(currentCheckpointIndex, "pass");
    ChangeCheckpoint(+1);
}


function failCheckpoint()
{
    SetCheckpointValue(currentCheckpointIndex, "fail");
    ChangeCheckpoint(+1);
}