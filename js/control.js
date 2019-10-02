// Wenn das Dokument geladen wurde, führe initFunc() aus
document.addEventListener('DOMContentLoaded', showFunc);
//  Benötigt um herauszufinden, ob man nach Doppelclick auf Bildschirm
// klieckt
var doppelclick = false;

/**
 * Lade und zeige alle Bilder
 */
function showFunc() {
  document.addEventListener('click', clickDocumentFunc);
  document.addEventListener('dblclick', doubleClickFunc);

  var url = 'showObject.php';
  var request = new Request(url);

  /* Fetch: Per AJAX alle Objekte vom Server laden */
  /* Ergnis von Server ist in data */
  fetch(request)
  .then(response => response.text())
  .then(data => {
    console.log(data);
    document.querySelector('#show').innerHTML = data;
    makeDraggable();
  })
  .catch(error => {
      console.log('Request failed', error);
  });/*- Ende fetch */

  // Neues Bild via Form einfügen:
  // Wenn das Formular abgesendet wird, führe insertFunc() aus
  //document.querySelector('#formFooter').addEventListener('submit',insertFunc);
}; /* Ende initFunc */

// Doppelclick
function doubleClickFunc(ereignis) {
  console.log("Doppelclick");
  if (ereignis.target.nodeName=="DIV") {
    try {
      Draggables.forEach(item => {
        item.disable();
      })
    } catch(err) {
      // … und gebe eine Meldung aus, wenn es keine gibt
      console.log("no Draggable objects");
    }
    doppelclick = true;
  }
}

// Auf Bildschirm geklickt. Inhalt einfügen
// 2 Möglichkeiten: a) man klickt, um Inhalt einzufügen
// b) Man klickt nach Edit-Doppelklick
function clickDocumentFunc(ereignis) {
  console.log(ereignis.target.nodeName)
  if (ereignis.target.nodeName=="DIV") {
    // nichts tun
  } else {
    console.log("Click");

    // Wenn vorher Doppelklick gemacht wurde
    if (doppelclick==true) {
      // Bei Kombination Doppelclick-Click DB aktualisieren, weil man mit Doppelklick
      // bestehenden Inhalt geändert hat. currentElement kommt von onDrop,
      // welches auch auf Mausclick reagiert.
      //console.log(currentElement);
      updateFunc(currentElement);
      doppelclick = false;
      makeDraggable();
    } else {
      // Klick auf Bildschirm für neues Element einzufügen
      // Position übermitteln
      insertFunc(ereignis);
    }
  }
}

/**
 * Ein neues Objekt einfügen
 */
function insertFunc(ereignis) {
  var x = event.clientX;
  var y = event.clientY;
  console.log("X coords: " + x + ", Y coords: " + y);
  var currentContent = "?x=";
  currentContent += x;
  currentContent += "&y=";
  currentContent += y;


// In DB speichern
var url = 'insertObject.php' + currentContent;
var request = new Request(url, {
  method: 'GET',
});

  /* Fetch: Sende das neue Bild per AJAX an den Server */
fetch(request)
  .then(response => response.text())
  .then(data => {
    // Erhalte als Antwort alle Objekte
    // und ersetze das aktuelle HTML mit dem neuen vom Server
    console.log(data);
    var el = document.createElement('div');
    el.innerHTML = data;
    console.log(data)
    document.querySelector('#show').appendChild(el.firstChild);
    makeDraggable();
    doppelclick = false;
  })
  .catch(error => {
    console.log('Request failed', error);
  });/* Ende fetch */
};  /* Ende insertFunc */

/**
 * Objekte draggable machen
 */
function makeDraggable() {
  // Probiere alle Draggables zu deaktiveren…
  // weil sonst «Geister»-Elemnte ohne Inhalt, nur mit Anfassern zurückbleiben
  try {
    Draggables.forEach(item => {
      item.disable();
    })
  } catch(err) {
    // … und gebe eine Meldung aus, wenn es keine gibt
    console.log("no Draggable objects");
  }

  // Mache alle Objekte draggable
  Draggables = Subjx('.draggable').drag(DragMethods);
};

/**
 * Eine Sammlung von Funktionen, die aufgerufen wird, wenn etwas mit den draggable Objekten gemacht wird.
 */
var DragMethods = {
  /**
   * Wenn ein Objekt losgelassen wird:
   * Sende die Daten an die Datenbank
   */
  onDrop(ereignis, element) {
    // Funktion updateFunc aufgerufen
    updateFunc(element);
    // wird in function clickDocumentFunc verwendet
    currentElement = element;
  } /* Ende onDrop */
}; /* Ende methods */

function updateFunc(element) {
  console.log("UpdateFunc")
  // Alle Eigenschaften herausfinden:
  var id = element.id;   // eg "id_166", but only needed "166"
  id = id.substring(3, id.length);
  var h = element.clientHeight; // Elementhöhe
  var w = element.clientWidth; // Elementbreite
  var x = element.offsetLeft; // Element: X-Position
  var y = element.offsetTop; // Element: Y-Position
  var cont = element.innerHTML;
  // Den Rotationswinkel berechnen:
  // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  var values = element.style.transform.split('(')[1],
  values = values.split(')')[0],
  values = values.split(',');
  var rot = Math.round(Math.asin(values[1]) * (180/Math.PI));
  // URL zusammensetzen
  var currentContent = "?id=";
  currentContent += id;
  currentContent += "&x=";
  currentContent += x;
  currentContent += "&y=";
  currentContent += y;
  currentContent += "&w=";
  currentContent += w;
  currentContent += "&h=";
  currentContent += h;
  currentContent += "&rot=";
  currentContent += rot;
  currentContent += "&cont=";
  currentContent += cont;

  // In DB speichern: nur Daten schicken, keine Daten empfangen
  var url = 'updateObject.php' + currentContent;
  //console.log(url);
  var request = new Request(url, {
      method: 'GET'
  });

  /* Fetch: URL per AJAX aufrufen, um Daten in DB zu speichern */
  fetch(request)
    .catch(error => {
        console.log('Request failed', error);
    });/*- Ende fetch */
}
