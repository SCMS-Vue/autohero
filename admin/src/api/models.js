/* eslint-disable */

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
var doors = [
  {
    label: '2/3 Türen',
    value: '2/3',
  },
  {
    label: '4/5 Türen',
    value: '4/5'
  },
  {
    label: '6/7 Türen',
    value: '6/7'
  },
]
var emissionsklasse = [
  {
    label: 'EURO 6',
    value: 'EURO 6',
    children: doors
  },
  {
    label: 'EURO 5',
    value: 'EURO 5',
    children: doors
  },
  {
    label: 'EURO 4',
    value: 'EURO 4',
    children: doors
  },
  {
    label: 'EURO 3',
    value: 'EURO 3',
    children: doors
  },
  {
    label: 'EURO 2',
    value: 'EURO 2',
    children: doors
  },
  {
    label: 'EURO 1',
    value: 'EURO 1',
    children: doors
  }
]

const interior = [
  {
    label: 'Polsterung: Alcantara',
    value: 'Alcantara'
  },
  {
    label: 'Polsterung: Stoff',
    value: 'Stoff'
  },
  {
    label: 'Polsterung: Leder',
    value: 'Leder'
  },
  {
    label: 'Polsterung: Teilleder',
    value: 'Teilleder'
  },
  {
    label: 'Polsterung: Kunstleder',
    value: 'Kunstleder'
  },
  {
    label: 'Polsterung: Kunststoff',
    value: 'Kunststoff'
  },
  {
    label: 'Polsterung: Velours',
    value: 'Velours'
  },
  {
    label: 'Polsterung: Andere',
    value: 'Andere'
  },

]
export const colors = [
  {
    label: 'Farbe: Schwarz',
    value: 'Schwarz',
    children: interior
  },
  {
    label: 'Farbe: Grau',
    value: 'Grau',
    children: interior
  },
  {
    label: 'Farbe: Weiß',
    value: 'Weiß',
    children: interior
  },
  {
    label: 'Farbe: Silber',
    value: 'Silber',
    children: interior
  },
  {
    label: 'Farbe: Braun',
    value: 'Braun',
    children: interior
  },
  {
    label: 'Farbe: Rot',
    value: 'Rot',
    children: interior
  },
  {
    label: 'Farbe: Blau',
    value: 'Blau',
    children: interior
  },
  {
    label: 'Farbe: Grün',
    value: 'Grün',
    children: interior
  },
  {
    label: 'Farbe: Metallic',
    value: 'Metallic',
    children: interior
  },
  {
    label: 'Farbe: Beige',
    value: 'Beige',
    children: interior
  },
  {
    label: 'Farbe: Gelb',
    value: 'Gelb',
    children: interior
  },
  {
    label: 'Farbe: Orange',
    value: 'Orange',
    children: interior
  },
  {
    label: 'Farbe: Lila',
    value: 'Lila',
    children: interior
  },
  {
    label: 'Farbe: Gold',
    value: 'Gold',
    children: interior
  },
]

function rangekm(start = 0, end = 500000) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    let obb = {
      label: i.format().replace(',', ' ') + ' km',
      value: i.format().replace(',', ' ') + ' km',
      children: emissionsklasse,
    }
    ans.push(obb);
    i += 4999;
  }
  return ans;
}
const kilemeters = rangekm();

function range(start = 1980, end = 2021) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    let obb = {
      label: i,
      value: i,
      children: interior
    }
    ans.push(obb);
  }
  return ans;
}


function seatsrange(start = 1, end = 10) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    let obb = {
      label: i + ' Sitzplätze',
      value: i
    }
      ans.push(obb);
  }
  return ans;
}


const modelyear = range().reverse();
const months = [
  {
    label: 'Jan.',
    value: '01',
    children: modelyear
  },
  {
    label: 'Feb.',
    value: '02',
    children: modelyear
  },
  {
    label: 'Mar.',
    value: '03',
    children: modelyear
  },
  {
    label: 'Apr.',
    value: '04',
    children: modelyear
  },
  {
    label: 'May',
    value: '05',
    children: modelyear
  },
  {
    label: 'June',
    value: '06',
    children: modelyear
  },
  {
    label: 'July',
    value: '07',
    children: modelyear
  },
  {
    label: 'Aug.',
    value: '08',
    children: modelyear
  },
  {
    label: 'Sept.',
    value: '09',
    children: modelyear
  },
  {
    label: 'Oct.',
    value: '10',
    children: modelyear
  },
  {
    label: 'Nov.',
    value: '11',
    children: modelyear
  },
  {
    label: 'Dec.',
    value: '12',
    children: modelyear
  }
]
const transmission = [
  {
    label: 'Schaltgetriebe',
    value: 'Schaltgetriebe',
    children: kilemeters
  },
  {
    label: 'Automatik',
    value: 'Automatik',
    children: kilemeters
  },
  {
    label: 'Halbautomatisch',
    value: 'Halbautomatisch',
    children: kilemeters
  },
  {
    label: 'Duplex',
    value: 'Duplex',
    children: kilemeters
  },

]

export const fuletypes = [
  {
    label: 'Benzin',
    value: 'Benzin',
    children: transmission
  },
  {
    label: 'Diesel',
    value: 'Diesel',
    children: transmission
  },
  {
    label: 'Gas',
    value: 'Gas',
    children: transmission
  },
  {
    label: 'Erdgas',
    value: 'Erdgas',
    children: transmission
  },
  {
    label: 'Elektro',
    value: 'Elektro',
    children: transmission
  },
  {
    label: 'Ethanol',
    value: 'Ethanol',
    children: transmission
  },
  {
    label: 'Hybrid',
    value: 'Hybrid',
    children: transmission
  },
  {
    label: 'Wasserstoff',
    value: 'Wasserstoff',
    children: transmission
  }
]
const seats = seatsrange();
export const body = [
  {
    label: 'Limousine',
    value: 'Limousine',
    children: seats,
  },
  {
    label: 'Van / Kleinbus',
    value: 'Van / Kleinbus',
    children: seats,
  },
  {
    label: 'Cabrio / Roadster',
    value: 'Cabrio / Roadster',
    children: seats,
  },
  {
    label: 'Kombi',
    value: 'Kombi',
    children: seats,
  },
  {
    label: 'Sportwagen / Coupé',
    value: 'Sportwagen / Coupé',
    children: seats,
  },
  {
    label: 'SUV / Geländewagen / Pickup',
    value: 'SUV / Geländewagen / Pickup',
    children: seats,
  },
  {
    label: 'Kleinwagen',
    value: 'Kleinwagen',
    children: seats,
  },
  {
    label: 'Cabrio',
    value: 'Cabrio',
    children: seats,
  },
  {
    label: 'Andere',
    value: 'Andere',
    children: seats,
  }
]


const countries = [{
  label: "Deutschland",
  value: "Deutschland"
}, {
  label: "Albania",
  value: "Albania"
}, {
  label: "Austria",
  value: "Austria"
}, {
  label: "Åland Islands",
  value: "Åland Islands"
}, {
  label: "Bosnia and Herzegovina",
  value: "Bosnia and Herzegovina"
}, {
  label: "Belgium",
  value: "Belgium"
}, {
  label: "Bulgaria",
  value: "Bulgaria"
}, {
  label: "Belarus",
  value: "Belarus"
}, {
  label: "Switzerland",
  value: "Switzerland"
}, {
  label: "Cyprus",
  value: "Cyprus"
}, {
  label: "Czech Republic",
  value: "Czech Republic"
}, {
  label: "Germany",
  value: "Germany"
}, {
  label: "Denmark",
  value: "Denmark"
}, {
  label: "Estonia",
  value: "Estonia"
}, {
  label: "Spain",
  value: "Spain"
}, {
  label: "Finland",
  value: "Finland"
}, {
  label: "France",
  value: "France"
}, {
  label: "United Kingdon",
  value: "United Kingdon"
}, {
  label: "Greece",
  value: "Greece"
}, {
  label: "Croatia",
  value: "Croatia"
}, {
  label: "Hungary",
  value: "Hungary"
}, {
  label: "Ireland",
  value: "Ireland"
}, {
  label: "Italy",
  value: "Italy"
}, {
  label: "Lithuania",
  value: "Lithuania"
}, {
  label: "Luxembourg",
  value: "Luxembourg"
}, {
  label: "Latvia",
  value: "Latvia"
}, {
  label: "Monaco",
  value: "Monaco"
}, {
  label: "Moldova",
  value: "Moldova"
}, {
  label: "Malta",
  value: "Malta"
}, {
  label: "Netherlands",
  value: "Netherlands"
}, {
  label: "Norway",
  value: "Norway"
}, {
  label: "Poland",
  value: "Poland"
}, {
  label: "Portugal",
  value: "Portugal"
}, {
  label: "Romania",
  value: "Romania"
}, {
  label: "Sweden",
  value: "Sweden"
}, {
  label: "Slovenia",
  value: "Slovenia"
}, {
  label: "Slovakia",
  value: "Slovakia"
}, {
  label: "Ukraine",
  value: "Ukraine"
}]


function ownersrange(start = 1, end = 10) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    let obb = {
      label: i + ' Vorbesitzer',
      value: i,
      children: countries
    }
      ans.push(obb);
  }
  return ans;
}
export const owners = ownersrange()

export const caroptions = [
  {
    label: 'Unfallauto',
    value: false
  },
  {
    label: 'Originalmotor',
    value: true
  },
  {
    label: 'Gewerbliche',
    value: false
  }

]

const ffeatures = [
  {
    label: 'Highlights',
    children: []
  },
  {
    label: 'Komfort',
    children: [
      {
        label: 'Berganfahr-Assistent (HSA)',
        value: false
      },
      {
        label: 'Sitzheizung vorn',
        value: false
      },
      {
        label: 'Fensterheber elektrisch',
        value: false
      },
      {
        label: 'Handsfree Entry & Drive',
        value: false
      },
      {
        label: 'Klimaautomatik 2-Zonen',
        value: false
      },
      {
        label: 'Leder Lenkrad',
        value: false
      },
      {
        label: 'Park-Assistent mit 360° Bewegungssensoren',
        value: false
      },
      {
        label: 'Einparkhilfe vorn und hinten',
        value: false
      },
      {
        label: 'Rücksitzbank geteilt/klappbar',
        value: false
      },
      {
        label: 'Verglasung hinten abgedunkelt',
        value: false
      },
      {
        label: 'Geschwindigkeitsregelanlage',
        value: false
      },
      {
        label: 'Sitzheizung vorn und hinten',
        value: false
      },
      {
        label: 'Sportsitze vorn',
        value: false
      },
      {
        label: 'Elektr. Kofferraumdeckel',
        value: false
      },
      {
        label: 'Servoschliessung für Kofferraumdeckel',
        value: false
      },
      {
        label: 'Hold assist',
        value: false
      },
      {
        label: 'Komfort-Klimaautomatik 4-Zonen',
        value: false
      },
      {
        label: 'Mittelarmlehne vorn',
        value: false
      },
      {
        label: 'Rücksitzlehne geteilt/klappbar',
        value: false
      },
      {
        label: 'Geschwindigkeits-Regelanlage (Tempomat)',
        value: false
      },
      {
        label: 'Zentralverriegelung mit Fernbedienung',
        value: false
      },
      {
        label: 'Adaptive Cruise Control',
        value: false
      },
      {
        label: 'Durchladeeinrichtung mit Skisack',
        value: false
      },
      {
        label: 'Fahrassistenz-System: Anfahr-Assistent',
        value: false
      },
      {
        label: 'Lenkrad heizbar (Leder) mit Multifunktion',
        value: false
      },
      {
        label: 'Einparkhilfe vorn und hinten, optisch (APS Plus)',
        value: false
      },
      {
        label: 'Sitze vorn elektr. verstellbar (links mit Memory)',
        value: false
      },
      {
        label: 'Sport-Fahrwerk',
        value: false
      },
      {
        label: 'Soft-Close-Automatik',
        value: false
      },
      {
        label: 'Heckklappenbetätigung automatisch',
        value: false
      },
      {
        label: 'Geschwindigkeitsregelanlage',
        value: false
      },
      {
        label: 'Durchladeeinrichtung (Mittelarmlehne hinten)',
        value: false
      },
      {
        label: 'Adaptive Drive Fahrwerk',
        value: false
      },
      {
        label: 'Komfortzugang (Schließ-/Startsystem)',
        value: false
      },
      {
        label: 'Lenkrad (Leder) mit Multifunktion',
        value: false
      },
      {
        label: 'Park-Distance-Control (PDC)',
        value: false
      },
      {
        label: 'Komfortsitze vorn elektr. verstellbar (mit Memory)',
        value: false
      },
      {
        label: 'Sonnenschutzrollo an Türscheiben hinten',
        value: false
      },
      {
        label: 'Geschwindigkeits-Regelanlage mit Bremsfunktion',
        value: false
      },
      {
        label: 'Zentralverriegelung mit Fernbedienung',
        value: false
      },
      {
        label: 'Sport-Fahrwerk (M-Technic)',
        value: false
      },{
        label: 'Automatische Distanzregelung (ACC)',
        value: false
      }
    ]
  },
  {
    label: 'Multimedia',
    children: [
      {
        label: 'USB-Anschluss',
        value: false
      },
      {
        label: 'AUX-IN-Anschluss',
        value: false
      },
      {
        label: 'SD-Karten-Schnittstelle',
        value: false
      },
      {
        label: 'Freisprecheinrichtung Bluetooth',
        value: false
      },
      {
        label: 'Multifunktionsanzeige',
        value: false
      },
      {
        label: 'Vorrüstung Mobiltelefon/Handy',
        value: false
      },
      {
        label: 'Bordcomputer',
        value: false
      },
      {
        label: 'Speed-Limit-Anzeige',
        value: false
      },
      {
        label: 'MP3-Schnittstelle für Mobiltelefon/Handy',
        value: false
      },
      {
        label: 'Sprachbediensystem',
        value: false
      },
      {
        label: 'Bluetooth-Schnittstelle',
        value: false
      },
      {
        label: 'Sicherheitssystem SYNC',
        value: false
      },
      {
        label: 'Handy mit Bluetooth',
        value: false
      },
      {
        label: 'Bord-/Verbrauchscomputer',
        value: false
      },
      {
        label: 'SOS-Notruffunktion',
        value: false
      },
      {
        label: 'Apple Play',
        value: false
      },
      {
        label: 'Android Auto',
        value: false
      },
      {
        label: 'USB-Anschluss in Mittelkonsole',
        value: false
      }
    ]
  },
  {
    label: 'Lich Und Sicht',
    children: [
      {
        label: 'Außenspiegel elektr. anklappbar',
        value: false
      },
      {
        label: 'Außenspiegel elektr. verstell- und heizbar',
        value: false
      },
      {
        label: 'Nebelscheinwerfer',
        value: false
      },
      {
        label: 'Außenspiegel elektr. verstell- und heizbar, beide',
        value: false
      },
      {
        label: 'Außenspiegel elektr. klappbar, mit Abblendautomatik',
        value: false
      },
      {
        label: 'Nebelscheinwerfer integriert',
        value: false
      },
      {
        label: 'Heckleuchten LED',
        value: false
      },
      {
        label: 'Scheinwerfer-Reinigungsanlage (SRA)',
        value: false
      },
      {
        label: 'Licht- und Regensensor',
        value: false
      },
      {
        label: 'Tagfahrlicht',
        value: false
      },
      {
        label: 'Wärmeschutzverglasung grün getönt',
        value: false
      },
      {
        label: 'Adaptives Kurvenlicht',
        value: false
      },
      {
        label: 'Automatische Fahrlichtschaltung',
        value: false
      },
      {
        label: 'Tagfahrlicht LED',
        value: false
      },
      {
        label: 'Scheibenwischer mit Regensensor',
        value: false
      },
      {
        label: 'Wärmeschutzverglasung',
        value: false
      },



    ]
  },
  {
    label: 'Sicherheit',
    children: [
      {
        label: 'Anti-Blockier-System (ABS)',
        value: false
      },
      {
        label: 'Airbag Fahrer-/Beifahrerseite',
        value: false
      },
      {
        label: 'Seitenairbag vorn',
        value: false
      },
      {
        label: 'Kopf-Airbag-System (Sideguard)',
        value: false
      },
      {
        label: 'Elektron. Differentialsperre (EDS)',
        value: false
      },
      {
        label: 'Antriebs-Schlupfregelung (ASR)',
        value: false
      },
      {
        label: 'Elektron. Stabilitäts-Programm (ESP)',
        value: false
      },
      {
        label: 'Isofix-Aufnahmen für Kindersitz',
        value: false
      },
      {
        label: 'Reifenkontroll-Anzeige',
        value: false
      },
      {
        label: 'Wegfahrsperre (elektronisch)',
        value: false
      },
      {
        label: 'Sitze vorn mit Anti-Submarining-Airbag',
        value: false
      },
      {
        label: 'Airbag Beifahrerseite abschaltbar',
        value: false
      },
      {
        label: 'Kopf-Airbag-System hinten',
        value: false
      },
      {
        label: 'Kopf-Airbag-System vorn',
        value: false
      },
      {
        label: 'Anti-Submarining-Airbag im Fond',
        value: false
      },
      {
        label: 'Antischlupfregelung (ASR)',
        value: false
      },
      {
        label: 'Notbrems-Assistent',
        value: false
      },
      {
        label: 'Reifendruck-Kontrollsystem',
        value: false
      },
      {
        label: 'Bremsassistent',
        value: false
      },
      {
        label: 'Dynamische Stabilitäts-Control (DSC)',
        value: false
      },
      {
        label: 'Gurtstraffer',
        value: false
      },
      {
        label: 'Kopf-Schulter-Airbag vorn und hinten',
        value: false
      },
      {
        label: 'Traktionskontrolle',
        value: false
      },
      {
        label: 'Innenraumüberwachung',
        value: false
      },
      {
        label: 'Dynamische Stabilitätskontrolle (DSC)',
        value: false
      },
      {
        label: 'Fahrassistenz-System: Notbrems-Assistent',
        value: false
      }
    ]
  },
  {
    label: 'Weiteres',
    children: [
      {
        label: 'Ambiente-Beleuchtung',
        value: false
      },
      {
        label: 'Radioempfang digital (DAB)',
        value: false
      },
      {
        label: '8 Lautsprecher',
        value: false
      },
      {
        label: 'Elektr. Bremskraftverteilung',
        value: false
      },
      {
        label: 'Geschwindigkeits-Begrenzeranlage',
        value: false
      },
      {
        label: 'Heckscheibe heizbar',
        value: false
      },
      {
        label: 'Innenspiegel mit Abblendautomatik',
        value: false
      },
      {
        label: 'Lendenwirbelstütze vorn',
        value: false
      },
      {
        label: 'Lenksäule (Lenkrad) höhenverstellbar',
        value: false
      },
      {
        label: 'Lenksäule (Lenkrad) längsverstellbar',
        value: false
      },
      {
        label: 'Mittelarmlehne hinten mit Fach',
        value: false
      },
      {
        label: 'Parkbremse elektrisch',
        value: false
      },
      {
        label: 'Schalt-/Wählhebelgriff Leder',
        value: false
      },
      {
        label: 'Sitz vorn links höhenverstellbar',
        value: false
      },
      {
        label: 'Sitz vorn rechts höhenverstellbar',
        value: false
      },
      {
        label: 'Sonnenblenden mit Spiegel (beleuchtet)',
        value: false
      },
      {
        label: 'Steckdose (12V-Anschluß) 2.Sitzreihe',
        value: false
      },
      {
        label: 'Tachometeranzeige digital',
        value: false
      },
      {
        label: 'Visio Plus-Paket',
        value: false
      },
      {
        label: 'Zusatzsteckdose in Mittelkonsole',
        value: false
      },
      {
        label: 'Komfort-Paket',
        value: false
      },
      {
        label: 'Getriebe 7-Gang - Doppelkupplungsgetriebe',
        value: false
      },
      {
        label: 'Otto-Partikelfilter (GPF)',
        value: false
      },
      {
        label: 'Dachreling',
        value: false
      },
      {
        label: 'Eco Mode (Fahrmodusschalter)',
        value: false
      },
      {
        label: 'Fahrassistenz-System: Multi-Sense (Fahrmodusschalter)',
        value: false
      },
      {
        label: 'Start/Stop-Anlage',
        value: false
      },
      {
        label: 'Servolenkung geschwindigkeitsabhängig',
        value: false
      },
      {
        label: 'Metallic-Lackierung',
        value: false
      },
      {
        label: 'Bremsanlage mit Rekuperationssystem',
        value: false
      },
      {
        label: 'Frontscheibe mit Bandfilter oben',
        value: false
      },
      {
        label: 'Gepäcknetz an Vordersitzlehne',
        value: false
      },
      {
        label: 'Gepäckraum-Abtrennung (Netz)',
        value: false
      },
      {
        label: 'Getränkehalter in Mittelkonsole',
        value: false
      },
      {
        label: 'Glanz-Paket',
        value: false
      },
      {
        label: 'Mittelarmlehne hinten mit Fach',
        value: false
      },
      {
        label: 'Reifen-Reparaturkit',
        value: false
      },
      {
        label: 'Ablage-Paket',
        value: false
      },
      {
        label: 'Ambiente-Beleuchtung',
        value: false
      },
      {
        label: 'Einstiegleisten mit Schriftzug',
        value: false
      },
      {
        label: 'Business-Paket',
        value: false
      },
      {
        label: 'Vorbereitung Rear Seat Entertainment (RSE)',
        value: false
      },
      {
        label: 'Sound-System BOSE',
        value: false
      },
      {
        label: 'Antriebsart: Frontantrieb',
        value: false
      },
      {
        label: 'Dachreling (Aluminium)',
        value: false
      },
      {
        label: 'Servolenkung elektro-mechanisch',
        value: false
      },
      {
        label: 'Aktive Kopfstützen',
        value: false
      },
      {
        label: 'Aktive Motorhaube',
        value: false
      },
      {
        label: 'Außentemperaturanzeige',
        value: false
      },
      {
        label: 'Bremsenergierückgewinnung',
        value: false
      },
      {
        label: 'Drehzahlmesser',
        value: false
      },
      {
        label: 'Dynamische Bremsleuchte',
        value: false
      },
      {
        label: 'Exterieurumfänge Wagenfarbe',
        value: false
      },
      {
        label: 'Fußmatten Velours',
        value: false
      },
      {
        label: 'Außenspiegel Wagenfarbe',
        value: false
      },
      {
        label: 'Energierückgewinnung',
        value: false
      },
      {
        label: 'Gepäckraumabdeckung / Rollo',
        value: false
      },
      {
        label: 'Modellpflege',
        value: false
      },
      {
        label: 'Dimmer Instrumentenbeleuchtung',
        value: false
      },
      {
        label: 'Sicht-Paket',
        value: false
      },
      {
        label: 'Intelligent Protection System (IPS)',
        value: false
      }
    ]
  }
];

export const features = ffeatures;

export const rules = {
  modelvariant: [
    { required: true, message: 'Please input Modelvariant', trigger: 'blur' }
  ],
  registration: [
    { required: true, message: 'Please pick a date', trigger: 'change' }
  ],
  service: [
    { required: true, message: 'Please pick a date', trigger: 'change' }
  ],
  enginecmc: [
    { required: true, message: 'Please input Enginecmc', trigger: 'blur' }
  ],
  co2emissions: [
    { type: 'array', required: true, message: 'Please input co2 emissions', trigger: 'blur' }
  ]
}
