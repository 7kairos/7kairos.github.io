/* Scroll-aware train navigation. */
const stationNav = document.querySelector('.station-nav');
const stationLinks = [...document.querySelectorAll('.station-link')];
const stationSections = stationLinks.map(link => document.getElementById(link.dataset.stop));
let scrollPending = false;

function updateStation() {
  const trigger = Math.min(window.innerHeight * .44, 460);
  let current = 0;
  stationSections.forEach((section, i) => {
    if (section && section.getBoundingClientRect().top <= trigger) current = i;
  });
  stationLinks.forEach((link, i) => {
    link.classList.toggle('is-current', i === current);
    link.classList.toggle('is-passed', i < current);
    if (i === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  stationNav.style.setProperty('--progress-width', `${current * 25}%`);
  scrollPending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateStation); }
}, { passive: true });
window.addEventListener('resize', updateStation);
window.addEventListener('load', updateStation);
updateStation();

/* Who's That Pokémon? — 100 Pokémon with online-first sprites.
 * 1. PokeAPI species lookup and sprite URLs.
 * 2. Pokémon Showdown sprite library.
 * 3. Locally bundled assets/sprite-*.png (offline fallback).
 */
const POKEMON_FILES = [
  'altaria',
  'amaura',
  'ampharos',
  'audino',
  'bouffalant',
  'buizel',
  'bulbasaur',
  'bunnelby',
  'burmy-plant',
  'butterfree-f',
  'cacturne-f',
  'chandelure',
  'charmander',
  'cherubi',
  'combee-f',
  'corphish',
  'cubone',
  'deerling-spring',
  'diancie',
  'ditto',
  'dragonair',
  'drifloon',
  'eevee',
  'elekid',
  'espurr',
  'exeggcute',
  'farfetchd',
  'flygon',
  'garchomp-f',
  'gastly',
  'glameow',
  'hoopa-confined',
  'hoothoot',
  'hoppip',
  'hypno-f',
  'jigglypuff',
  'kirlia',
  'klink',
  'krokorok',
  'lapras',
  'lickitung',
  'lilligant',
  'lotad',
  'luvdisc',
  'magikarp',
  'magnemite',
  'mankey',
  'marill',
  'masquerain',
  'mawile',
  'mew',
  'mienshao',
  'miltank',
  'mimikyu',
  'minccino',
  'murkrow-f',
  'natu',
  'nihilego',
  'oddish',
  'paras',
  'pidove',
  'pikachu',
  'ponyta',
  'porygon',
  'psyduck',
  'riolu',
  'roselia-f',
  'rotom-normal',
  'scraggy',
  'sentret',
  'sewaddle',
  'shellder',
  'shelmet',
  'shuckle',
  'slugma',
  'smeargle',
  'snorlax',
  'snorunt',
  'solrock',
  'spheal',
  'spoink',
  'squirtle',
  'starly-f',
  'sudowoodo-f',
  'tangela',
  'tauros',
  'tinkaton',
  'tirtouga',
  'togepi',
  'torkoal',
  'trapinch',
  'trubbish',
  'ursaring-f',
  'voltorb',
  'vulpix',
  'wailmer',
  'wobbuffet',
  'wooper-f',
  'zoroark',
  'zubat-f'
];

// These variants have a special sprite filename, but are guessed by species.
const POKEMON_NAMES = {
  'farfetchd': "Farfetch'd",
  'burmy-plant': 'Burmy',
  'deerling-spring': 'Deerling',
  'hoopa-confined': 'Hoopa',
  'rotom-normal': 'Rotom'
};
const POKEMON = POKEMON_FILES.map(slug => ({
  slug,
  name: POKEMON_NAMES[slug] ||
    (slug.endsWith('-f') ? slug.slice(0, -2) : slug)
      .replace(/(^|-)\w/g, value => value.toUpperCase())
}));

const TOTAL_ROUNDS = 10;
const spriteImage = document.getElementById('pokemon-sprite');
const spriteQuestion = document.getElementById('sprite-question');
const optionsContainer = document.getElementById('answer-options');
const roundElement = document.getElementById('game-round');
const scoreElement = document.getElementById('game-score');
const gameMessage = document.getElementById('game-message');
const nextButton = document.getElementById('next-round');
const restartButton = document.getElementById('restart-game');
const gameDisplay = document.querySelector('.mystery-display');
let rounds = [], roundIndex = 0, score = 0, answered = false, spriteRequestNonce = 0;

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

// PokeAPI uses species names, while some local files encode gender or forms.
const POKEAPI_NAMES = {
  'burmy-plant': 'burmy',
  'deerling-spring': 'deerling',
  'hoopa-confined': 'hoopa',
  'rotom-normal': 'rotom'
};
function speciesSlug(pokemon) {
  return POKEAPI_NAMES[pokemon.slug] || pokemon.slug.replace(/-f$/, '');
}

// Load into a temporary Image first so broken external URLs never appear.
// The deadline ensures that a disconnected network doesn't stall the game.
function testSpriteUrl(url, timeout = 1900) {
  return new Promise(resolve => {
    const attempt = new Image();
    let done = false;
    const finish = good => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      attempt.onload = null;
      attempt.onerror = null;
      resolve(good);
    };
    const timer = setTimeout(() => finish(false), timeout);
    attempt.onload = () => finish(true);
    attempt.onerror = () => finish(false);
    attempt.src = url;
  });
}

async function pokeApiSpriteUrls(pokemon) {
  const slug = speciesSlug(pokemon);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2200);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(slug)}`,
      { signal: controller.signal }
    );
    if (!response.ok) return [];
    const info = await response.json();
    const sprites = info.sprites || {};
    // Prefer the female sprite for locally named *-f variants.
    const front = pokemon.slug.endsWith('-f')
      ? [sprites.front_female, sprites.front_default]
      : [sprites.front_default];
    return [
      ...front,
      sprites.other?.showdown?.front_default,
      sprites.other?.['official-artwork']?.front_default
    ].filter(Boolean);
  } catch (_) {
    return []; // No connection, timeout or API error: try another provider.
  } finally {
    clearTimeout(timer);
  }
}

async function loadSprite(pokemon) {
  const token = ++spriteRequestNonce;
  const active = () => token === spriteRequestNonce && rounds[roundIndex]?.slug === pokemon.slug;
  spriteImage.hidden = true;
  spriteImage.removeAttribute('src');
  spriteQuestion.textContent = '?';
  gameDisplay.classList.remove('sprite-unavailable');
  // Don't let users answer before their mystery Pokémon has appeared.
  [...optionsContainer.children].forEach(button => { button.disabled = true; });

  const slug = speciesSlug(pokemon);
  const showdownUrl = `https://play.pokemonshowdown.com/sprites/ani/${slug}.gif`;
  const showdownStaticUrl = `https://play.pokemonshowdown.com/sprites/gen5/${slug}.png`;
  const localUrl = `assets/sprite-${pokemon.slug}.png`;

  const apiUrls = await pokeApiSpriteUrls(pokemon);
  if (!active()) return; // Ignore an old response after Next / Restart.

  // Keep the source order deliberate: PokéAPI, online sprites, then local PNG.
  const urls = [...new Set([...apiUrls, showdownUrl, showdownStaticUrl, localUrl])];
  for (const url of urls) {
    if (!active()) return;
    const online = url !== localUrl;
    if (await testSpriteUrl(url, online ? 1600 : 2200)) {
      if (!active()) return;
      spriteImage.src = url;
      spriteImage.hidden = false;
      [...optionsContainer.children].forEach(button => { button.disabled = false; });
      return;
    }
  }

  // Only reach this state when *all* online and local sprite sources fail.
  if (!active()) return;
  answered = true;
  gameDisplay.classList.add('sprite-unavailable');
  gameMessage.textContent = `Couldn't load ${pokemon.name}'s sprite online or from ${localUrl}.`;
  gameMessage.className = 'game-message is-miss';
  nextButton.textContent = roundIndex === TOTAL_ROUNDS - 1 ? 'SEE MY SCORE →' : 'SKIP POKÉMON →';
  nextButton.hidden = false;
}
function renderRound() {
  answered = false;
  const pokemon = rounds[roundIndex];
  roundElement.textContent = `${String(roundIndex + 1).padStart(2, '0')} / ${String(TOTAL_ROUNDS).padStart(2, '0')}`;
  scoreElement.textContent = String(score).padStart(2, '0');
  gameDisplay.classList.remove('is-revealed', 'sprite-unavailable');
  spriteImage.alt = 'Silhouette of a mystery Pokémon';
  gameMessage.textContent = '';
  gameMessage.className = 'game-message';
  nextButton.hidden = true;
  nextButton.textContent = 'NEXT POKÉMON →';

  const choices = shuffle([pokemon, ...shuffle(POKEMON.filter(p => p.slug !== pokemon.slug)).slice(0, 3)]);
  optionsContainer.replaceChildren();
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-choice';
    button.textContent = choice.name;
    button.addEventListener('click', () => makeGuess(choice.slug, button));
    optionsContainer.appendChild(button);
  });
  loadSprite(pokemon);
}

function makeGuess(guessSlug, button) {
  if (answered) return;
  answered = true;
  const pokemon = rounds[roundIndex];
  const correct = guessSlug === pokemon.slug;
  if (correct) score += 1;
  scoreElement.textContent = String(score).padStart(2, '0');
  gameDisplay.classList.add('is-revealed');
  spriteImage.alt = pokemon.name;
  spriteQuestion.textContent = '✦';
  [...optionsContainer.children].forEach(choice => {
    choice.disabled = true;
    if (choice.textContent === pokemon.name) choice.classList.add('is-correct');
    else if (choice === button) choice.classList.add('is-wrong');
  });
  gameMessage.textContent = correct
    ? `✦ You got it! It's ${pokemon.name}!`
    : `It's ${pokemon.name}! You'll get the next one.`;
  gameMessage.classList.add(correct ? 'is-success' : 'is-miss');
  nextButton.hidden = false;
  if (roundIndex === TOTAL_ROUNDS - 1) nextButton.textContent = 'SEE MY SCORE →';
}

function showFinalScore() {
  ++spriteRequestNonce;
  roundElement.textContent = 'COMPLETE';
  gameDisplay.classList.add('is-revealed');
  spriteImage.hidden = true;
  spriteQuestion.textContent = '★';
  optionsContainer.replaceChildren();
  gameMessage.className = 'game-message is-success';
  gameMessage.textContent = score === TOTAL_ROUNDS
    ? `perfect! ${score}/${TOTAL_ROUNDS} — you're a pokémon professor!`
    : `${score}/${TOTAL_ROUNDS} correct! the next train is ready whenever you are.`;
  nextButton.textContent = 'PLAY AGAIN ↻';
  nextButton.hidden = false;
}

function startGame() {
  rounds = shuffle(POKEMON).slice(0, TOTAL_ROUNDS);
  roundIndex = 0;
  score = 0;
  renderRound();
}

nextButton.addEventListener('click', () => {
  if (roundIndex === TOTAL_ROUNDS - 1) {
    if (roundElement.textContent === 'COMPLETE') startGame();
    else showFinalScore();
  } else {
    roundIndex += 1;
    renderRound();
  }
});
restartButton.addEventListener('click', startGame);
startGame();

/* Live boarding-pass timestamp, shown in each visitor's local time. */
function updateBoardingPassClock() {
  const dateField = document.getElementById('ticket-date');
  const timeField = document.getElementById('ticket-time');
  if (!dateField || !timeField) return;
  const now = new Date();
  const dateParts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).formatToParts(now);
  const day = dateParts.find(p => p.type === 'day')?.value ?? '--';
  const month = dateParts.find(p => p.type === 'month')?.value?.toUpperCase() ?? '---';
  const year = dateParts.find(p => p.type === 'year')?.value ?? '----';
  dateField.textContent = `${day} ${month} ${year}`;
  timeField.textContent = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' }).format(now).replace(/\u202f/g, ' ');
}
updateBoardingPassClock();
setInterval(updateBoardingPassClock, 60000);

/* Bundle original offline mascots, upgrade to the real game sprites if online. */
document.querySelectorAll('.mascot-sprite[data-official-sprite]').forEach(img => {
  const replacement = new Image();
  replacement.onload = () => { img.src = replacement.src; };
  replacement.src = img.dataset.officialSprite;
});


/* Optional real Milkymon logo. This exact filename is used in both places.
   Until the supplied asset exists, a tiny pixel flower is shown as fallback. */
document.querySelectorAll('.brand-mark-image').forEach(img => {
  const reveal = () => {
    if (img.naturalWidth > 0) img.closest('.brand-mark')?.classList.add('has-logo');
  };
  img.addEventListener('load', reveal);
  img.addEventListener('error', () => { img.hidden = true; });
  if (img.complete) {
    if (img.naturalWidth > 0) reveal();
    else img.hidden = true;
  }
});
