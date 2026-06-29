export const i18n = {
  tower: 'tour',
  wall: 'mur',
  resource: 'ressource',

  brick: 'brique',
  bricks: 'briques',
  gem: 'gemme',
  gems: 'gemmes',
  recruit: 'recrue',
  recruits: 'recrues',

  quarry: 'carrière', // i.e. brick production
  magic: 'magie', // i.e. gem production
  dungeon: 'donjon', // i.e. recruit production

  'Your %s': 'Votre %s', // Your quarry/tower
  "Opponent's %s": '%s de l’adversaire', // Opponent's quarry/tower

  '1 brick': '1 brique',
  '%s bricks': '%s briques', // 3 bricks
  '1 gem': '1 gemme',
  '%s gems': '%s gemmes', // 3 gems
  '1 recruit': '1 recrue',
  '%s recruits': '%s recrues', // 3 recruits

  'This card costs %s': 'Cette carte coûte %s', // This card costs 3 bricks
  allUnusableTip:
    'Toutes les cartes sont inutilisables, vous devez défausser une carte en faisant un clic droit ou un appui long dessus',

  // %ss = 'brick', %sp = 'bricks'
  'Your %sp': 'Vos %sp', // Your bricks
  "Opponent's %sp": '%sp de l’adversaire', // Opponent's bricks

  '%s1. Reach %s2 to win': '%s1. Atteignez %s2 pour gagner', // Your tower/bricks/gems/recruits = n. Reach 100 to win

  // %s = 'quarry', %ss = 'brick', %sp = 'bricks'
  '%s (%ss production)': '%s (production de %sp)', // quarry (brick production)

  discarded: 'se défausser',
  'Discard a card': 'Se défausser',

  'You Win!': 'Vous avez gagné',
  'You Lose!': 'Vous avez perdu',
  'Tie Game': 'Match nul',

  '%s has reached the victory condition':
    '%s a atteint la condition de victoire', // %s = 'Your tower', "Opponent's tower"
  '%s have reached the victory condition':
    '%s ont atteint la condition de victoire', // %s = 'Your bricks', "Opponent's bricks", "Your gems", ...
  'Your opponent has no tower left': 'Votre adversaire n’a plus de tour',
  'You have no tower left': 'Vous n’avez plus de tour',

  'Review cards': 'Revoir les cartes',
  'Hide cards': 'Cacher les cartes',

  '. ': '. ',

  Preferences: 'Préférences',
  ': ': '\u00A0: ',
  'Your Name': 'Votre nom',
  "Opponent's Name": 'Nom de l’adversaire',

  'Choose a Tavern (Preset Preferences)':
    'Choisissez une taverne (préférences prédéfinies)',
  'Castle in Enroth': 'Château à Enroth',
  Antagarich: 'Antagarich',
  Jadame: 'Jadame',
  Default: 'Par défaut',
  Customized: 'Personnalisé',

  'Starting Conditions': 'Conditions de départ',
  'Victory Conditions': 'Conditions de victoire',

  'Minimum is starting %s1 + 1 = %s0': 'Le minimum est %s1 de départ + 1 = %s0',
  'Minimum is MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0':
    'Le minimum est MAX(%s1+%s2, %s3+%s4, %s5+%s6) + 1 = %s0',

  'Other Preferences': 'Autres préférences',
  'Cards in Hand': 'Cartes en main',

  'AI Level': 'Niveau d’IA',
  Genius: 'Génial',
  Smart: 'Intelligent',
  Mediocre: 'Médiocre',
  Stupid: 'Stupide',
  Idiotic: 'Idiot',

  Multiplayer: 'Multijoueur',
  off: 'désactivé',
  on: 'activé',
  'Your ID': 'Votre ID',
  "Enter your opponent's ID": 'Entrez l’ID de votre adversaire',
  Connect: 'Connectez',
  Copy: 'Copier',
  'Copied 📋✅': 'Copié 📋✅',

  'Connecting to the network ⌛': 'Connexion au réseau en cours ⌛',
  'Connected to the network (but not to anyone) 🟡':
    'Connecté au réseau (mais pas à quelqu’un) 🟡',
  'Connecting to ID %s ⌛': 'Connexion à l’ID %s en cours ⌛',
  "Connected to ID %s ✅ You're the host 🏠":
    'Connecté à l’ID %s ✅ Vous êtes l’hôte 🏠',
  "Connected by ID %s ✅ You're the guest 💼":
    'Connecté par ID %s ✅ Vous êtes l’invité 💼',
  'Connection failed ❌': 'La connexion a échoué ❌',
  'Disconnected 🔌': 'Déconnecté 🔌',
  'You are playing against computer AI':
    'Vous jouez contre l’IA de votre ordinateur',
  'You are playing against human': 'Vous jouez contre un humain',

  'You and your opponent are disconnected. Please go to "Preferences" and start a new game.':
    'Vous et votre adversaire êtes déconnectés. Veuillez aller dans «\u00A0Préférences\u00A0» et commencer un nouveau jeu.',

  'Multiplayer Mode is experimental and works only for users behind non-symmetric NAT':
    'Le mode multijoueur est expérimental et ne fonctionne que pour les utilisateurs derrière un NAT non symétrique',

  Reset: 'Réinitialiser',
  'Apply & New Game': 'Appliquer & Nouveau jeu',
  Cancel: 'Annuler',

  'Game mode': 'Game mode',
  'Choose a game mode': 'Choose a game mode',
  Classic: 'Classic',
  Draft: 'Draft',
  'Draft (beta)': 'Draft (bêta)',

  Language: 'Langue',

  'Sound & Graphics': 'Son & Image',
  Sound: 'Son',
  Volume: 'Volume',
  Mute: 'Sourdine',
  'Stereo Sound': 'Son stéréo',
  Graphics: 'Image',
  'Disable animation': 'Désactiver l’animation',
  Pixelation: 'Pixelation',
  'Visual Preset': 'Préréglage visuel',
  'Filter may slow down the game': 'Le filtre peut ralentir le jeu',

  Normal: 'Normal',
  Vibrant: 'Vibrant',
  'Black and white': 'Noir et blanc',
  Nostalgia: 'Nostalgie',
  Bright: 'Lumineux',
  Dark: 'Sombre',

  Brightness: 'Luminosité',
  Contrast: 'Contraste',
  Grayscale: 'Niveaux de gris',
  Sepia: 'Sépia',
  Saturate: 'Saturation',
  Hue: 'Teinte',
  Invert: 'Inverser',
  Opacity: 'Opacité',

  Twist: 'Tordre',
  Grain: 'Grain',

  Filters: 'Filtres',

  Help: 'Aide',
  'Toggle Full Screen': 'Basculer en plein écran',
  GitHub: 'GitHub',

  'Bold font': 'Police en gras',
  ERATHIAN: 'Utiliser Erathian %s (langues à caractères latins uniquement)',

  'ArcoMage HD': 'Archmages',

  DESC: 'Clone HD web gratuit et open source du jeu de cartes Arcomage de 3DO et NWC en 2000',

  'Please go to %s to view more information (including %s1), star the repo and follow %s2 there.':
    'Merci d’aller à %s pour voir plus d’informations (y compris %s1), star le repo et suivre %s2.',

  'the GitHub project page': 'la page du projet GitHub',

  'an informative tutorial image in English':
    'une image tutorielle informative en anglais',

  'Game rules': 'Les règles du jeu',

  GAMERULES: `Les conditions de victoire diffèrent selon les auberges. Pour remporter la partie, vous devez généralement être le premier à construire votre tour, détruire la tour adverse ou amasser plus de ressources que l’adversaire.
Les chiffres jaunes sont vos productions. Il s’agit du nombre d’unités d’une ressource que vous amassez à chaque tour. Les chiffres noirs sont les ressources elles-mêmes. Il s’agit des unités dont vous disposez et que vous pouvez dépenser.
Cartes\u00A0: chaque carte requiert un certain nombre de ressources pour pouvoir être utilisée, indiqué dans l’angle inférieur droit de la carte. Le coût d’utilisation est soustrait aux ressources selon la couleur de la carte. Cliquez sur une carte avec le bouton gauche de la souris pour la jouer. Cliquez sur une carte avec le bouton droit de la souris pour se défausser.
En Rouge, votre Carrière qui produit des Briques. En Bleu, votre Magie qui produit des Gemmes. En Vert, votre Donjon qui produit des Recrues.`,

  'With no usable or discardable card, your opponent has surrendered':
    'Sans carte utilisable ou défaussable, votre adversaire a capitulé',
  'With no usable or discardable card, you have surrendered':
    'Sans carte utilisable ou défaussable, vous avez capitulé',
  'With no usable or discardable card, you must surrender. Open the "%s1" window and click "%s2" (or ask your opponent to do so)':
    'Sans carte utilisable ou défaussable, vous devez capituler. Ouvrez la fenêtre « %s1 » et cliquez sur « %s2 » (ou demandez à votre adversaire de le faire)',
  // %s1 and %s2 do not need to be translated. %s1 = 'Preferences' ; %s2 = 'Apply & New Game'

  'Please rotate your device to landscape mode':
    'Veuillez faire pivoter votre appareil en mode paysage',

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
