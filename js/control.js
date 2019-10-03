// Wenn das Dokument geladen wurde, führe showFunc() aus
document.addEventListener('DOMContentLoaded', showFunc);
/*  Benötigt um herauszufinden, ob man nach Doppelclick auf Bildschirm
    klickt um die Handlers wieder zu zeigen */
var doppelclick = false;

// Lade und zeige alle Objekte
function showFunc() {
  // Klick auf Dokument zum Erstellen von Objekten
  // Doppelklick auf Text zum Editieren
  document.addEventListener('click', clickDocumentFunc);
  document.addEventListener('dblclick', doubleClickFunc);

  var url = 'showObject.php';
  var request = new Request(url);

  // Fetch: Per AJAX alle Objekte vom Server laden
  // Ergnis von Server ist in data
  fetch(request)
  .then(response => response.text())
  .then(data => {
    console.log(data);
    document.querySelector('#show').innerHTML = data;
    makeDraggableFunc();
  })
  .catch(error => {
      console.log('Request failed', error);
  }) // Ende fetch
} // Ende showFunc

/*  Auf Bildschirm geklickt. Inhalt einfügen. 2 Möglichkeiten:
    a) man klickt, um Inhalt einzufügen
    b) Man klickt nach Edit-Doppelklick */
function clickDocumentFunc(ereignis) {
  console.log(ereignis.target.nodeName)
  if (ereignis.target.nodeName=="DIV") {
    // nichts tun
  } else {
    console.log("Click auf Bildschirm");

    // Wenn vorher Doppelklick gemacht wurde
    if (doppelclick == true) {
      /*  Bei Kombination Doppelclick-Click DB aktualisieren, weil man mit Doppelklick
          bestehenden Inhalt geändert hat. currentElement kommt von onDrop,
          welches auch auf Mausclick reagiert */
      updateFunc(currentElement);
      doppelclick = false;
      makeDraggableFunc();
    } else {
      // Klick auf Bildschirm für neues Element einzufügen
      // Position übermitteln
      insertFunc(ereignis);
    }
  }
} // Ende clickDocumentFunc

// Doppelclick
function doubleClickFunc(ereignis) {
  console.log("Doppelclick");
  if (ereignis.target.nodeName=="DIV") {
    try {
      Draggables.forEach(item => {
        item.disable();
      })
    } catch(err) {
      // nicht tun
    }
    // Weil Doppelclick gemacht wurde: Variable auf true setzen
    doppelclick = true;
  }
} // Ende doubleClickFunc

// Ein neues Objekt einfügen
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

  // Fetch: Sende das neue Objekt per AJAX an den Server
fetch(request)
  .then(response => response.text())
  .then(data => {
    /*  Erhalte als Antwort alle Objekte
        und ersetze das aktuelle HTML mit dem neuen vom Server */
    console.log(data);
    var el = document.createElement('div');
    el.innerHTML = data;
    console.log(data)
    document.querySelector('#show').appendChild(el.firstChild);
    makeDraggableFunc();
    doppelclick = false;
  })
  .catch(error => {
    console.log('Request failed', error);
  }) // Ende fetch
}  // Ende insertFunc

// Objekte draggable machen
function makeDraggableFunc() {
  /*  Probiere alle Draggables zu deaktiveren…
      weil sonst «Geister»-Elemnte ohne Inhalt, nur mit Anfassern zurückbleiben */
  try {
    Draggables.forEach(item => {
      item.disable();
    })
  } catch(err) {
    // nichts tun
  }

  // Mache alle Objekte draggable
  Draggables = subjx('.draggable').drag(DragMethods);
} // Ende makeDraggableFunc

// Eine Sammlung von Funktionen, die aufgerufen wird, wenn etwas mit den draggable Objekten gemacht wird
var DragMethods = {
  /* Wenn ein Objekt losgelassen wird:
    Sende die Daten an die Datenbank  */
  onDrop(ereignis, element) {
    // Funktion updateFunc aufgerufen
    updateFunc(element);
    // wird in function clickDocumentFunc verwendet
    currentElement = element;
  } // Ende onDrop
} // Ende methods

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
  })

  // Fetch: URL per AJAX aufrufen, um Daten in DB zu speichern
  fetch(request)
    .catch(error => {
        console.log('Request failed', error);
    }) //- Ende fetch
}
