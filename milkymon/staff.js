/* ============================================================
   MILKYMON STAFF PROFILES!

   For each person, edit:
     region: "valhalla" | "hokundra" | "baylands" | "karp kingdom" | "milky city" | ""
     does:   What this person handles on the team
     about:  Short personal introduction
     likes / dislikes: Array of small tags: ["building", "coffee"]
     pokemon: Name of their favorite Pokemon, e.g. "Eevee"
     pokemonId: National Pokedex number, e.g. 133 (shows a sprite)
     pokemonSprite: (optional) local URL, e.g. "assets/eevee.png"

   ============================================================ */
const STAFF_PROFILES = {
  admins: [
    { name: 'kat', art: 'assets/art kat.png',    region: 'milky city', does: 'our wallet (our beautiful owner!!). gave birth to milkymon. straight from her uterus.', about: '', likes: [], dislikes: [], pokemon: 'mimikyu', pokemonId: 778, pokemonSprite: '' },
    { name: 'kaia', art: 'assets/art kairos.png', region: 'baylands', does: 'i built this website! designed the discord channel, rules and info layouts, and hr meetings..', about: '', likes: ["strawberries", "skullpanda blindboxes", "matcha & coffee!", "minecraft duh", "swimming!"], dislikes: ["brayan", "valorant (jk im an addict)", "fomo :("], pokemon: 'tinkaton', pokemonId: 959, pokemonSprite: 'assets/sprite-tinkaton.png' },
    { name: 'sergi', art: 'assets/art sergi.png',  region: 'valhalla', does: 'our npc goat! creates worldbuilding storylines and events.', about: '', likes: [], dislikes: [], pokemon: '', pokemonId: null, pokemonSprite: '' }
  ],
  staff: [
    { name: 'exi',    art: 'assets/art exi.png',    region: 'hokundra', does: '', about: '', likes: [], dislikes: [], pokemon: '', pokemonId: null, pokemonSprite: '' },
    { name: 'silver', art: 'assets/art silver.png', region: 'valhalla', does: 'build, chat, and not building.', about: 'leader of valhalla, 0/5 builds completed..', likes: ["money", "cozy games", "pudding"], dislikes: ["beef patties", "ai", "studying"], pokemon: 'nihilego', pokemonId: 793, pokemonSprite: 'assets/sprite-nihilego.png' },
    { name: 'ana',    art: 'assets/art ana.png',    region: 'valhalla', does: 'plan, help, chat and build', about: 'i love ducks so much!!!', likes: ["DUCKS", "food", "music", "gambling"], dislikes: ["chewing sounds", "disorganization", "work", "disappointing asmr"], pokemon: 'psyduck', pokemonId: 54, pokemonSprite: 'assets/sprite-psyduck.png' },
    { name: 'nickel', art: 'assets/art nickel.png', region: 'baylands', does: '', about: '', likes: [], dislikes: [], pokemon: '', pokemonId: null, pokemonSprite: '' },
    { name: 'squish', art: 'assets/art squish.png', region: 'valhalla', does: 'collecting stuff, making food and getting distracted.', about: 'streams rarely, lurks and is constantly tired.', likes: ["food", "chai", "sleeping", "games", "my dog!!"], dislikes: ["work", "the texture of napkins"], pokemon: 'lickitung', pokemonId: 108, pokemonSprite: 'assets/sprite-lickitung.png' }
  ]
};

const REGION_COLORS = {
  'valhalla': '#e76a65',
  'hokundra': '#729acf',
  'baylands': '#f6ca39',
  'karp kingdom': '#79aa77',
  'milky city': '#f28cba'
};

const twoDigits = number => String(number).padStart(2, '0');

function setText(container, selector, value) {
  container.querySelector(selector).textContent = value;
}

function renderChips(container, selector, values) {
  const target = container.querySelector(selector);
  target.replaceChildren();
  (values && values.length ? values : ['coming soon']).forEach(value => {
    const chip = document.createElement('span');
    chip.className = 'crew-chip';
    chip.textContent = value;
    target.appendChild(chip);
  });
}

function createCarousel(root) {
  const group = root.dataset.group;
  const people = STAFF_PROFILES[group];
  const section = root.closest('.crew-team-section');
  const image = root.querySelector('.crew-character-art');
  const fallback = root.querySelector('.crew-art-fallback');
  const sprite = root.querySelector('.crew-pokemon-img');
  const pokeball = root.querySelector('.crew-pokeball');
  let current = 0;
  let imageRequest = 0;
  let spriteRequest = 0;
  let downX = null;

  function renderArtwork(person) {
    const request = ++imageRequest;
    image.hidden = true;
    image.removeAttribute('src');
    fallback.hidden = false;
    fallback.querySelector(':scope > span').textContent = `ADD ${person.art.split('/').pop().toUpperCase()}`;
    const attempt = new Image();
    attempt.onload = () => {
      if (request !== imageRequest) return;
      image.src = attempt.src;
      image.alt = `${person.name}'s character artwork`;
      image.hidden = false;
      fallback.hidden = true;
    };
    attempt.onerror = () => { if (request === imageRequest) fallback.hidden = false; };
    attempt.src = person.art;
  }

  function pokemonAssetPath(value) {
    const name = String(value || '').trim();
    if (!name) return '';
    const isWebOrRoot = /^(https?:\/\/|data:image\/|\/)/i.test(name);
    const prefix = isWebOrRoot || name.startsWith('assets/') || name.startsWith('./') ? '' : 'assets/';
    return prefix + (/\.(png|gif|webp|svg)(?:[?#]|$)/i.test(name) ? name : `${name}.png`);
  }

  function renderPokemon(person) {
    const request = ++spriteRequest;
    const pokemonName = String(person.pokemon || '').trim();
    sprite.hidden = true;
    sprite.removeAttribute('src');
    pokeball.hidden = false;
    setText(root, '[data-favorite]', pokemonName || '???');
    setText(root, '[data-favorite-note]', pokemonName ? '' : 'waiting for this trainer\'s pick');

    if (!pokemonName && !person.pokemonId && !person.pokemonSprite) return;

    const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
    const candidates = [];
    if (person.pokemonSprite) candidates.push(pokemonAssetPath(person.pokemonSprite));
    if (person.pokemonId) {
      // Prefer the small, pixel-style Pokémon sprite when available.
      candidates.push(`${base}/${person.pokemonId}.png`);
      candidates.push(`${base}/other/showdown/${person.pokemonId}.gif`);
      // Official artwork is a fallback for Pokémon without a classic sprite.
      candidates.push(`${base}/other/official-artwork/${person.pokemonId}.png`);
    }

    // Try each image in order. Missing local files no longer block the ID sprite.
    function tryImages(paths, index = 0) {
      if (request !== spriteRequest) return;
      if (index >= paths.length) {
        if (pokemonName) lookupByName();
        return;
      }
      const candidate = new Image();
      candidate.onload = () => {
        if (request !== spriteRequest) return;
        sprite.src = candidate.src;
        sprite.alt = `${pokemonName || 'Favorite Pokémon'} sprite`;
        sprite.hidden = false;
        pokeball.hidden = true;
      };
      candidate.onerror = () => tryImages(paths, index + 1);
      candidate.src = paths[index];
    }

    let lookedUpName = false;
    async function lookupByName() {
      if (lookedUpName || request !== spriteRequest) return;
      lookedUpName = true;
      try {
        const slug = pokemonName.toLowerCase().replace(/\s+/g, '-');
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(slug)}`);
        if (!response.ok) return;
        const pokemon = await response.json();
        if (request !== spriteRequest) return;
        const sprites = [
          pokemon.sprites?.front_default,
          pokemon.sprites?.other?.showdown?.front_default,
          pokemon.sprites?.other?.['official-artwork']?.front_default
        ].filter(Boolean);
        // Don't infinitely re-query if an API image fails.
        tryApiImages(sprites);
      } catch (_) {
        // No internet? Retain the Pokéball, rather than a broken image.
      }
    }

    function tryApiImages(paths, index = 0) {
      if (request !== spriteRequest || index >= paths.length) return;
      const candidate = new Image();
      candidate.onload = () => {
        if (request !== spriteRequest) return;
        sprite.src = candidate.src;
        sprite.alt = `${pokemonName} sprite`;
        sprite.hidden = false;
        pokeball.hidden = true;
      };
      candidate.onerror = () => tryApiImages(paths, index + 1);
      candidate.src = paths[index];
    }

    tryImages(candidates);
  }

  function display(i) {
    current = (i + people.length) % people.length;
    const person = people[current];
    setText(root, '[data-name]', person.name);
    setText(root, '[data-rank]', `${group === 'admins' ? 'ADMIN TEAM' : 'STAFF TEAM'} / ${twoDigits(current + 1)}`);
    setText(root, '[data-art-count]', `${twoDigits(current + 1)} / ${twoDigits(people.length)}`);
    setText(root, '[data-does]', person.does || 'what this trainer does around the server goes here ♡');
    setText(root, '[data-about]', person.about || 'a little introduction from this trainer is coming soon.');
    const region = root.querySelector('[data-region]');
    region.lastChild.textContent = ` REGION / ${(person.region || 'TBA').toUpperCase()}`;
    region.style.setProperty('--badge-color', REGION_COLORS[(person.region || '').toLowerCase()] || '#c47a9b');
    renderChips(root, '[data-likes]', person.likes);
    renderChips(root, '[data-dislikes]', person.dislikes);
    renderArtwork(person);
    renderPokemon(person);
    root.querySelector('.crew-announcement').textContent = `${person.name}, ${group === 'admins' ? 'admin' : 'staff member'} ${current + 1} of ${people.length}`;
    const card = root.querySelector('.crew-feature-card');
    card.classList.remove('crew-enter');
    void card.offsetWidth;
    card.classList.add('crew-enter');
  }

  section.querySelector('[data-prev]').addEventListener('click', () => display(current - 1));
  section.querySelector('[data-next]').addEventListener('click', () => display(current + 1));
  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      display(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  root.addEventListener('touchstart', event => { downX = event.changedTouches[0]?.screenX ?? null; }, { passive: true });
  root.addEventListener('touchend', event => {
    if (downX === null) return;
    const movement = (event.changedTouches[0]?.screenX ?? downX) - downX;
    if (Math.abs(movement) > 65) display(current + (movement < 0 ? 1 : -1));
    downX = null;
  }, { passive: true });
  display(0);
}

document.querySelectorAll('.crew-carousel').forEach(createCarousel);

/* Show the real logo when assets/milkymon_logo_ONE.png is present. */
document.querySelectorAll('.brand-mark-image').forEach(img => {
  const reveal = () => {
    if (img.naturalWidth > 0) img.closest('.brand-mark')?.classList.add('has-logo');
  };
  img.addEventListener('load', reveal);
  img.addEventListener('error', () => { img.hidden = true; });
  if (img.complete) reveal();
});

/* The three-stop train line highlights the section in view. */
const crewStops = [...document.querySelectorAll('[data-crew-stop]')];
const staffSection = document.getElementById('staff');
function updateCrewRoute() {
  const threshold = Math.min(window.innerHeight * .4, 400);
  const active = staffSection && staffSection.getBoundingClientRect().top <= threshold ? 'staff' : 'admins';
  crewStops.forEach(stop => {
    const here = stop.dataset.crewStop === active;
    stop.classList.toggle('is-here', here);
    if (here) stop.setAttribute('aria-current', 'location');
    else stop.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateCrewRoute, { passive: true });
window.addEventListener('resize', updateCrewRoute);
window.addEventListener('load', updateCrewRoute);
updateCrewRoute();
