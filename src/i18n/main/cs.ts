export const i18n = {
  tower: 'věž',
  wall: 'zeď',
  resource: 'zdroj',

  brick: 'cihla',
  bricks: 'cihly',
  gem: 'drahokam',
  gems: 'drahokamy',
  recruit: 'příšera',
  recruits: 'příšery',

  quarry: 'těžba', // i.e. brick production
  magic: 'magie', // i.e. gem production
  dungeon: 'jeskyně', // i.e. recruit production

  'Your %s': 'Tvůj/Tvoje %s', // Your quarry/tower
  "Opponent's %s": '%s soupeře', // Opponent's quarry/tower

  '1 brick': '1 cihla',
  '%s bricks': '%s cihly', // 3 bricks
  '1 gem': '1 drahokam',
  '%s gems': '%s drahokamy', // 3 gems
  '1 recruit': '1 příšera',
  '%s recruits': '%s příšery', // 3 recruits

  'This card costs %s': 'Tato karta stojí %s', // This card costs 3 bricks
  allUnusableTip:
    'Všechny karty jsou nepoužitelné, kartu musíte odhodit kliknutím pravým tlačítkem nebo dlouhým stisknutím',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Váš/Vaše %sp', // Your bricks
  "Opponent's %sp": '%sp soupeře', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Dosáhněte %s2 a vyhrajte', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (výroba %ss)', // quarry (brick production)

  discarded: 'odložená',
  'Discard a card': 'Odhoďte kartu',

  'You Win!': 'Vyhrál jsi!',
  'You Lose!': 'Prohrál jsi!',
  'Tie Game': 'Remízová hra',

  '%s has reached the victory condition': '%s dosáhla vítězné podmínky', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition': '%s dosáhly vítězné podmínky', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': 'Vašemu protivníkovi nezbyla žádná věž',
  'You have no tower left': 'Nezbyla ti žádná věž',

  'Review cards': 'Zkontrolujte karty',
  'Hide cards': 'Skryjte karty',

  '. ': '. ',

  Preferences: 'Předvolby',
  ': ': ': ',
  'Your Name': 'Vaše jméno',
  "Opponent's Name": 'Jméno soupeře',

  'Choose a Tavern (Preset Preferences)':
    'Vyberte hospodu (přednastavené předvolby)',
  'Castle in Enroth': 'Zámek v Enrothu',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Výchozí',
  Customized: 'Přizpůsobené',

  'Starting Conditions': 'Počáteční podmínky',
  'Victory Conditions': 'Podmínky vítězství',

  'Minimum is starting %s1 + 1 = %s0': 'Minimální startovací %s1 + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    'Minimum je MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'Další předvolby',
  'Cards in Hand': 'Karty v ruce',

  'AI Level': 'Úroveň AI',
  Genius: 'Geniální',
  Smart: 'Chytrý',
  Mediocre: 'Průměrný',
  Stupid: 'Hloupý',
  Idiotic: 'Idiotský',

  Multiplayer: 'Více hráčů',
  off: 'zakázáno',
  on: 'povoleno',
  'Your ID': 'Vaše ID',
  "Enter your opponent's ID": 'Zadejte ID soupeře',
  Connect: 'Připojit',
  Copy: 'Kopie',
  'Copied 📋✅': 'Zkopírováno 📋✅',

  'Connecting to the network ⌛': 'Připojení k síti ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'Připojeno k síti (ale ne k nikomu) 🟡',
  'Connecting to ID %s ⌛': 'Připojení k ID %s ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'Připojeno k ID %s ✅ Jste hostitel 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'Připojeno pomocí ID %s ✅ Jste host 💼',
  'Connection failed ❌': 'Připojení se nezdařilo ❌',
  'Disconnected 🔌': 'Odpojeno 🔌',
  'You are playing against computer AI': 'Hrajete proti počítačové AI',
  'You are playing against human': 'Hrajete proti člověku',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Vy a váš soupeř jste odpojeni. Přejděte prosím do „Předvoleb“ a začněte novou hru.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Režim pro více hráčů je experimentální a funguje pouze pro uživatele za nesymetrickou sítí NAT',

  Reset: 'Resetovat',
  'Apply & New Game': 'Použít a nová hra',
  Cancel: 'Zrušit',

  'Game mode': 'Game mode',
  'Choose a game mode': 'Choose a game mode',
  Classic: 'Classic',
  Draft: 'Draft',

  Language: 'Jazyk',

  'Sound & Graphics': 'Zvuk a Grafika',
  Sound: 'Zvuk',
  Volume: 'Hlasitost',
  Mute: 'Ztlumit',
  'Stereo Sound': 'Stereofonní zvuk',
  Graphics: 'Grafika',
  'Disable animation': 'Zakázat animaci',
  Pixelation: 'Pixelace',
  'Visual Preset': 'Vizuální předvolba',
  'Filter may slow down the game': 'Filtr může zpomalit hru',

  Normal: 'Normální',
  Vibrant: 'Živý',
  'Black and white': 'Černobílý',
  Nostalgia: 'Nostalgie',
  Bright: 'Jasný',
  Dark: 'Temný',

  Brightness: 'Jasnost',
  Contrast: 'Kontrast',
  Grayscale: 'Stupně šedi',
  Sepia: 'Sépiová',
  Saturate: 'Sytost',
  Hue: 'Odstín',
  Invert: 'Invertovat',
  Opacity: 'Krytí',

  Twist: 'Kroutit',
  Grain: 'Zrnitý',

  Filters: 'Filtry',

  Help: 'Nápověda',
  'Toggle Full Screen': 'Přepnout na celou obrazovku',
  GitHub: 'GitHub',

  'Bold font': 'Tučné písmo',
  ERATHIAN: 'Používejte Erathian %s (pouze jazyky s latinkou)',

  'ArcoMage HD': 'Archmages',

  DESC: 'Webový bezplatný a open source HD klon karetní hry Arcomage pro 3DO a NWC z roku 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Pro zobrazení dalších informací (včetně %s1) přejděte na %s, označte repozitář hvězdičkou a sledujte %s2.',

  'the GitHub project page': 'stránka projektu GitHub',

  'an informative tutorial image in English':
    'informativní výukový obrázek v angličtině',

  'Game rules': 'Pravidla hry',

  GAMERULES: `Podmínky vítězství jsou v každém hostinci různé. Stavíš svojí věž a snažíš se zničit věž protivníka nebo se snažíš nashromáždit stanovené množství zdrojů dříve, než to udělá tvůj protivník.
Velká žlutá čísla v sloupcích jsou generátory. Ty určují, kolik nových jednotek jednotlivých zdrojů ti přibude v dalším tahu. Malá černá čísla v sloupcích jsou tvoje zásoby zdrojů. Ty určují, kolik jednotek budeš moci utratit v tomto tahu.
Karty: Každá má svou cenu pro zahrání. Ta je značena v kroužku v pravém dolním rohu karty. Tato hodnota bude odečtena z tvých zdrojů podle barvy karty. Levým kliknutím kartu vynášíš do hry. Pravým kliknutím na kartě ji odhodíš z ruky.
Cihly se generují v červeném generátoru těžby, drahokamy v modrém generátoru magie a příšery v zelené jeskyni.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Bez použitelné nebo vyřazitelné karty se váš soupeř vzdal',
  'With no usable or discardable card, you have surrendered':
    'Bez použitelné nebo vyřazitelné karty jste se vzdali',
  'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)':
    'Bez použitelné nebo vyřazitelné karty se musíte vzdát. Otevřete okno "%s1" a klikněte na "%s2" (nebo o to požádejte soupeře)',
  // %s1 and %s2 do not need to be translated. %s1 = 'Preferences' ; %s2 = 'Apply & New Game'

  'Please rotate your device to landscape mode':
    'Otočte zařízení do režimu na šířku',

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
