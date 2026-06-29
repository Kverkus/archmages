export const i18n = {
  tower: 'torony',
  wall: 'fal',
  resource: 'nyersanyag',

  brick: 'tégla',
  bricks: 'tégla',
  gem: 'drágakő',
  gems: 'drágakő',
  recruit: 'szörny',
  recruits: 'szörny',

  quarry: 'bánya', // i.e. brick production
  magic: 'mágia', // i.e. gem production
  dungeon: 'állatkert', // i.e. recruit production

  'Your %s': 'Saját %s', // Your quarry/tower
  "Opponent's %s": 'Ellenséges %s', // Opponent's quarry/tower

  '1 brick': '1 tégla',
  '%s bricks': '%s tégla', // 3 bricks
  '1 gem': '1 drágakő',
  '%s gems': '%s drágakő', // 3 gems
  '1 recruit': '1 szörny',
  '%s recruits': '%s szörny', // 3 recruits

  'This card costs %s': 'Kijátszáshoz szükséges: %s', // This card costs 3 bricks
  allUnusableTip:
    'Egyik kártya sem használható, dobj el egy kártyát jobb egérgombbal vagy hosszan kattintva',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Saját %sp', // Your bricks
  "Opponent's %sp": 'Ellenséges %sp', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Győzelemhez szükséges: %s2', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (%ss termelés)', // quarry (brick production)

  discarded: 'eldobva',
  'Discard a card': 'Dobj el egy kártyát',

  'You Win!': 'Nyertél!',
  'You Lose!': 'Vesztettél!',
  'Tie Game': 'Döntetlen',

  '%s has reached the victory condition': '%s elérte a győzelmi feltételt', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition': '%s elérte a győzelmi feltételt', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': 'Az ellenségednek nem maradt tornya',
  'You have no tower left': 'Nem maradt tornyod',

  'Review cards': 'Kártyák megtekintése',
  'Hide cards': 'Kártyák elrejtése',

  '. ': '. ',

  Preferences: 'Beállítások',
  ': ': ': ',
  'Your Name': 'Saját név',
  "Opponent's Name": 'Ellenfél neve',

  'Choose a Tavern (Preset Preferences)':
    'Válassz Fogadót (Előre definiált beállítások)',
  'Castle in Enroth': 'Kastély Enrothban',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Alapértelmezett',
  Customized: 'Egyedi',

  'Starting Conditions': 'Kezdő paraméterek',
  'Victory Conditions': 'Győzelmi feltételek',

  'Minimum is starting %s1 + 1 = %s0': 'Legalább a kezdő %s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    'Legalább MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'Egyéb beállítások',
  'Cards in Hand': 'Kártyák a kézben',

  'AI Level': 'AI szint',
  Genius: 'Géniusz',
  Smart: 'Okos',
  Mediocre: 'Középszerű',
  Stupid: 'Hülye',
  Idiotic: 'Idióta',

  Multiplayer: 'Többjátékos',
  off: 'kikapcsolva',
  on: 'bekapcsolva',
  'Your ID': 'Saját azonosító',
  "Enter your opponent's ID": 'Add meg az ellenfeled azonosítóját',
  Connect: 'Csatlakozás',
  Copy: 'Másol',
  'Copied 📋✅': 'Másolva 📋✅',

  'Connecting to the network ⌛': 'Csatlakozás a hálózathoz ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'Csatlakozva a hálózathoz (de senkihez) 🟡',
  'Connecting to ID %s ⌛': 'Csatlakozás hozzá: %s ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'Csatlakozva hozzá: %s ✅ Te vagy a házigazda 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'Csatlakozva %s azonosítóval ✅ Te vagy a vendég 💼',
  'Connection failed ❌': 'Csatlakozás sikertelen ❌',
  'Disconnected 🔌': 'Kapcsolat megszakadt 🔌',
  'You are playing against computer AI': 'Számítógép ellen játszol',
  'You are playing against human': 'Ember ellen játszol',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Megszakadt az ellenfeleddel a kapcsolat. Kérlek menj a Beállításokhoz és indíts új játékot.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'A többjátékos mód kísérleti jellegű és csak nem szimmetrikus NAT mögötti felhasználóknál működik',

  Reset: 'Visszaállítás',
  'Apply & New Game': 'Alkalmazás és új játék',
  Cancel: 'Mégse',

  'Game mode': 'Game mode',
  'Choose a game mode': 'Choose a game mode',
  Classic: 'Classic',
  Draft: 'Draft',
  'Draft (beta)': 'Draft (béta)',

  Language: 'Nyelv',

  'Sound & Graphics': 'Hang és grafika',
  Sound: 'Hang',
  Volume: 'Hangerő',
  Mute: 'Némítás',
  'Stereo Sound': 'Sztereó hang',
  Graphics: 'Grafika',
  'Disable animation': 'Animáció kikapcsolása',
  Pixelation: 'Pixelesítés',
  'Visual Preset': 'Vizuális előbeállítás',
  'Filter may slow down the game': 'A szűrő lassíthatja a játékot',

  Normal: 'Normál',
  Vibrant: 'Élénk',
  'Black and white': 'Fekete-fehér',
  Nostalgia: 'Nosztalgia',
  Bright: 'Világos',
  Dark: 'Sötét',

  Brightness: 'Fényerő',
  Contrast: 'Kontraszt',
  Grayscale: 'Szürkeárnyalat',
  Sepia: 'Szépia',
  Saturate: 'Telítettség',
  Hue: 'Árnyalat',
  Invert: 'Negatív',
  Opacity: 'Átlátszóság',

  Twist: 'Torzítás',
  Grain: 'Szemcsézettség',

  Filters: 'Szűrők',

  Help: 'Súgó',
  'Toggle Full Screen': 'Teljes képernyő',
  GitHub: 'GitHub',

  'Bold font': 'Félkövér betűtípus',
  ERATHIAN: 'Használj Erathiait %s (csak latin betűs nyelvek)',

  'ArcoMage HD': 'Archmages',

  DESC: 'Webes, ingyenes és nyílt forráskódú HD-klónja a 3DO és NWC által 2000-ben kiadott Arcomage kártyajátéknak.',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Látogass el %s további információért (beleértve %s1), csillagozd be a projektet és kövesd %s2-t.',

  'the GitHub project page': 'a projekt GitHub oldalára',

  'an informative tutorial image in English':
    'egy informatív, angol nyelvű oktatóképet',

  'Game rules': 'Játékszabály',

  GAMERULES: `A győzelmi feltételek fogadónként változnak. Építsd fel a tornyodat, rombold le az ellenfeled tornyát, vagy gyűjts össze elég erőforrást, mielőtt az ellenfeled tenné meg.
A nagy sárga számok a termelést jelzik, ami azt mutatja, hogy a következő körben hány új egységnyi erőforrást kapsz az adott típusból. A kis fekete számok a jelenleg elérhető erőforrásaidat mutatják, amiket felhasználhatsz az aktuális körben.
Kártyák: Mindegyiknek megvan a maga játékköltsége, ami a kártya jobb alsó sarkában van jelölve. Ez a költség a kártya színének megfelelő erőforrásból kerül levonásra. Bal egérgombbal kijátszod a kártyát, jobbal pedig eldobod kijátszás nélkül.
A piros a bányát jelöli, ami téglákat termel. A kék a mágia, ami a drágaköveket állítja elő. A zöld pedig az állatkert, ami a szörnyeket biztosítja.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Kijátszható és/vagy eldobható kártyák hiányában az ellenfeled feladta',
  'With no usable or discardable card, you have surrendered':
    'Kijátszható és/vagy eldobható kártyák hiányában feladtad',
  'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)':
    'Kijátszható és/vagy eldobható kártyák hiányában fel kell adnod. Nyisd meg a "%s1"at és kattints az "%s2" gombra (vagy kérd meg az ellenfeled ugyanerre)',
  // %s1 and %s2 do not need to be translated. %s1 = 'Preferences' ; %s2 = 'Apply & New Game'

  'Please rotate your device to landscape mode':
    'Kérlek fordítsd fekvő módba a készüléked',

  'Draft Complete': 'Draft Complete',
  'Between Matches': 'Current progress',
  'Draft progress saved': 'Draft progress saved',
  'Your draft progress has been saved. You can continue later.':
    'Your draft progress has been saved. You can continue later.',
  'You already have a draft run in progress.':
    'You already have a draft run in progress.',
  Continue: 'Continue',
  'New Draft': 'New Draft',
  'Choose a card': 'Choose a card',
  'Last match: win': 'Last match: win',
  'Last match: loss': 'Last match: loss',
  'Last match: tie': 'Last match: tie',
  Wins: 'Wins',
  Losses: 'Losses',
  'Next match': 'Next match',
  Modes: 'Modes',
  'Draft Victory': 'Draft Victory',
  'Draft Defeat': 'Draft Defeat',
  'Draw pile': 'Draw pile',
  'Discard pile': 'Discard pile',
  'Player deck': 'Player deck',
  'Opponent deck': 'Opponent deck',
  OK: 'OK',
}
