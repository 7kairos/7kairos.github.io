/* MILKYMON: REGIONS — STORY QUIZ
   Edit STEPS to change the story. Each four-option question scores:
     01 Baylands · 02 Valhalla · 03 Karp Kingdom · 04 Hokundra
   Special Pokédex and dialogue scenes do NOT affect region scoring.
   [DRAFT] marks text written to fill gaps in the author's outline.
*/

const REGION_ORDER = ['baylands', 'valhalla', 'karp', 'hokundra'];
const REGION_INFO = {
  baylands: { title: 'BAYLANDS', subtitle: 'a life by the water', mascot: ['Tirtouga', 564], color: '#d5b447', text: 'where rivers are roads, people and Pokémon live side by side, and there is always another coastline to explore.' },
  valhalla: { title: 'VALHALLA', subtitle: 'make something that lasts', mascot: ['Trapinch', 328], color: '#e76a65', text: 'endless dunes, a city rising from the past, and the freedom to build a new story of your own.' },
  karp: { title: 'KARP KINGDOM', subtitle: 'find your people', mascot: ['Magikarp', 129], color: '#79aa77', text: 'forest villages, unexpected adventures, familiar faces and just the right amount of friendly chaos.' },
  hokundra: { title: 'HOKUNDRA', subtitle: 'there is more to discover', mascot: ['Amaura', 698], color: '#729acf', text: 'icy mountains, mysteries waiting to be solved, and a community that looks after one another.' }
};
const DEX = [
  {name:'Bulbasaur',id:1,type:'grass',origin:'kanto'}, {name:'Chespin',id:650,type:'grass',origin:'kalos'}, {name:'Rowlet',id:722,type:'grass',origin:'alola'},
  {name:'Charmander',id:4,type:'fire',origin:'kanto'}, {name:'Fennekin',id:653,type:'fire',origin:'kalos'}, {name:'Litten',id:725,type:'fire',origin:'alola'},
  {name:'Squirtle',id:7,type:'water',origin:'kanto'}, {name:'Froakie',id:656,type:'water',origin:'kalos'}, {name:'Popplio',id:728,type:'water',origin:'alola'},
  {name:'Pikachu',id:25,type:'electric',origin:'kanto'}
];
const P = (name, id) => ({name, id});
const STEPS = [
  {
    "id": "bedroom",
    "type": "question",
    "place": "your bedroom",
    "label": "001 / THE BEGINNING",
    "text": "it's a bright and sunny day, and you've just started your pokémon journey. you need to head to professor kat's research center to pick out your starter pokémon.",
    "options": [
      "i can’t wait to meet my lifelong best friend!",
      "i’m going to become the best pokémon trainer EVER!",
      "i need a cup of tea first.",
      "i want to learn everything i can about the world ahead. [DRAFT]"
    ]
  },
  {
    "id": "starter",
    "type": "starter",
    "place": "professor kat's research center",
    "label": "SPECIAL ENCOUNTER / POKÉDEX",
    "intro": "you finally made it! professor kat has quite a large selection of starter pokémon. which one will join you on this journey?"
  },
  {
    "id": "after-starter",
    "type": "question",
    "place": "the research center",
    "text": "{starter}! awesome! what a great choice. now that you’re all set, what are you going to do?",
    "options": [
      "spend time hanging out with my new friend, maybe at the beach!",
      "probably get distracted for an hour, frolicking in the fields.",
      "grab a pint at the tipsy karp and catch up with my mates.",
      "invite my best friend on my pokémon journey!"
    ]
  },
  {
    "id": "battle",
    "type": "question",
    "place": "research center, exterior",
    "quote": "“i’ve been waiting for this day since forever! ... oh, hey! did you just get a starter from professor kat, too? so did i. LET’S BATTLE!”",
    "text": "a young trainer approaches you, bursting with excitement. how do you answer?",
    "options": [
      "i’m not much of a battler, but i’ll give it my best!",
      "you’re going DOWN.",
      "you’re *way* out of your depth!",
      "AAAAHHHH!!!"
    ]
  },
  {
    "id": "battle-aftermath",
    "type": "scene",
    "place": "research center, exterior",
    "label": "A LITTLE DETOUR",
    "intro": "hey, you wiped the floor with that guy! you’re suddenly feeling pretty thirsty after that battle.",
    "quote": "the young trainer is comforting his sad pokémon.",
    "hoverQuote": "“we’ll train harder next time! ...also, good match. tell your pokémon i said hi!”",
    "note": "hover over or tap the dialogue to hear what the trainer says.",
    "end": "let’s go to the tipsy karp!"
  },
  {
    "id": "tavern-drink",
    "type": "question",
    "place": "the tipsy karp · inside",
    "text": "a warm, medieval tavern. you finally sit down at the counter. what do you feel like drinking?",
    "options": [
      "a piña colada, served in a coconut.",
      "a big pint of cactus juice.",
      "a nice, warm cup of tea.",
      "*all* the booze."
    ]
  },
  {
    "id": "tavern-box",
    "type": "question",
    "place": "the tipsy karp · inside",
    "text": "a strange-looking person approaches you. “quickly, take this box! it will give you your heart’s deepest desires.” the person leaves abruptly. might as well open it. what do you see inside?",
    "options": [
      "photographs of friends and family that you had lost long ago.",
      "trophies and medals for becoming the best pokémon champion, all engraved with my name.",
      "a blossoming paradise where all my best friends can stay!",
      "riches beyond my wildest dreams."
    ]
  },
  {
    "id": "tavern-catch",
    "type": "question",
    "place": "the tipsy karp · outside",
    "text": "on your way out, a pokémon near the exit catches your eye. you decide to invite it to join your party! your new friend is a...",
    "options": [
      "helpful lapras",
      "confident dreepy",
      "sociable pansage",
      "hyperactive riolu"
    ],
    "recruits": [
      {
        "name": "Lapras",
        "id": 131
      },
      {
        "name": "Dreepy",
        "id": 885
      },
      {
        "name": "Pansage",
        "id": 511
      },
      {
        "name": "Riolu",
        "id": 447
      }
    ]
  },
  {
    "id": "bathhouse",
    "type": "question",
    "place": "the greece-asia bathhouse · valhalla",
    "text": "after the tavern, you head to the greece-asia bathhouse in valhalla. ivory walls and steamy waters greet you. once you get there, you decide to...",
    "options": [
      "have a nice, relaxing soak with my friends and pokémon.",
      "start a water balloon fight!",
      "swim around and enjoy the warmth.",
      "release buckets of fish into the water..."
    ]
  },
  {
    "id": "hoopa",
    "type": "question",
    "place": "the forest",
    "text": "on the way to the shopping center on the baylands’ resident isle, you spot a strange floating figure. you move a little closer. it’s hoopa! what do you do?",
    "options": [
      "start talking to it! introduce myself and my pokémon team.",
      "pull out my pokédex to scan it.",
      "watch quietly and see what it does. [DRAFT]",
      "try and catch it!"
    ]
  },
  {
    "id": "resident-shops",
    "type": "question",
    "place": "baylands · resident isle",
    "text": "hoopa disappears just as quickly as it appeared. when you finally reach resident isle, there’s so much to see! what do you visit first?",
    "options": [
      "a little trip to the bookstore — abra’s archives!",
      "the food at smoliv garden smells real good...",
      "time for a change! maybe the milotic market hat store.",
      "a sweet treat from psyduck’s pop rocks."
    ]
  },
  {
    "id": "beach-day",
    "type": "question",
    "place": "baylands · resident isle",
    "text": "after a nice, long rest at the inn, you take your pokémon for a beach day. what are you doing?",
    "options": [
      "lounging in the sun, getting a good tan going.",
      "building sandcastles! as many as possible!",
      "going for a swim in the water.",
      "meeting new people and exploring the area."
    ]
  },
  {
    "id": "beach-catch",
    "type": "question",
    "place": "baylands · the beach",
    "text": "a friendly pokémon has been following you all afternoon, eager to join the adventure. welcome to the team...",
    "options": [
      "oshawott!",
      "psyduck!",
      "trumbeak!",
      "lycanroc!"
    ],
    "recruits": [
      {
        "name": "Oshawott",
        "id": 501
      },
      {
        "name": "Psyduck",
        "id": 54
      },
      {
        "name": "Trumbeak",
        "id": 732
      },
      {
        "name": "Lycanroc",
        "id": 745
      }
    ]
  },
  {
    "id": "plains-food",
    "type": "question",
    "place": "the plains",
    "text": "time to see new hokundra! while travelling across the plains, a pokémon pops out of the grass and snatches your bag. turns out it’s just hungry. what do you do?",
    "options": [
      "set up my cooking pot and make everyone a hearty meal.",
      "share some of my lunch with it.",
      "offer it some tea and biscuits.",
      "look for some food together!"
    ]
  },
  {
    "id": "plains-catch",
    "type": "question",
    "place": "the plains",
    "text": "you all have such a fun time that you decide to invite one of the pokémon you met to come along. who joins your team?",
    "options": [
      "eevee",
      "munchlax",
      "farfetch’d",
      "togepi"
    ],
    "recruits": [
      {
        "name": "Eevee",
        "id": 133
      },
      {
        "name": "Munchlax",
        "id": 446
      },
      {
        "name": "Farfetch'd",
        "id": 83
      },
      {
        "name": "Togepi",
        "id": 175
      }
    ]
  },
  {
    "id": "hokundra-plans",
    "type": "question",
    "place": "new hokundra",
    "text": "snow, snow, and more snow! though it’s still under construction, new hokundra has plenty to explore. what will you do first?",
    "options": [
      "take some time to see all the pokémon native to this area.",
      "peek into that “mine” people keep talking about. i love a good adventure!",
      "visit the market! do some shopping. maybe play some (flat) basketball.",
      "the casino, obviously. #neverbackdownneverwhat"
    ]
  },
  {
    "id": "hokundra-snow",
    "type": "question",
    "place": "new hokundra · blizzard",
    "draft": true,
    "text": "[DRAFT] a sudden snowstorm sweeps through the town. you notice some trainers and their pokémon trying to make it back to shelter. [DRAFT] what do you do?",
    "options": [
      "[DRAFT] guide everyone safely across the frozen river.",
      "[DRAFT] build a sturdy shelter before the storm gets worse.",
      "[DRAFT] gather everyone together and keep spirits high.",
      "[DRAFT] study the tracks in the snow to find a safe route."
    ]
  },
  {
    "id": "hokundra-catch",
    "type": "question",
    "place": "new hokundra · merchant’s stall",
    "text": "a travelling pokémon merchant offers you another companion. your party still has room for one more! who do you pick?",
    "options": [
      "zorua",
      "kirlia",
      "grookey",
      "froslass"
    ],
    "recruits": [
      {
        "name": "Zorua",
        "id": 570
      },
      {
        "name": "Kirlia",
        "id": 281
      },
      {
        "name": "Grookey",
        "id": 810
      },
      {
        "name": "Froslass",
        "id": 478
      }
    ]
  },
  {
    "id": "city-train",
    "type": "question",
    "place": "the milky express · en route",
    "draft": true,
    "text": "[DRAFT] you board the milky express for the trip to milky city. past the window, all four regions begin to look like one big world. [DRAFT] what are you doing on the train?",
    "options": [
      "watching the changing scenery through the window.",
      "sketching ideas for something incredible to build.",
      "sharing snacks and stories with the other passengers.",
      "studying the route map and asking the conductor questions."
    ]
  },
  {
    "id": "city-festival",
    "type": "question",
    "place": "milky city · central plaza",
    "draft": true,
    "text": "[DRAFT] the capital is buzzing! there’s a festival in the plaza, with a booth run by each region. [DRAFT] which booth catches your eye?",
    "options": [
      "a little waterway obstacle course for pokémon.",
      "a building contest full of ambitious creations.",
      "a community stage where anyone can perform.",
      "a puzzle booth filled with hidden lore."
    ]
  },
  {
    "id": "city-wish",
    "type": "question",
    "place": "milky city · notice board",
    "draft": true,
    "text": "[DRAFT] someone has set up a bulletin board asking visitors for one thing they would add to milkymon. [DRAFT] what do you write?",
    "options": [
      "more rivers, boats, and beautiful places to explore.",
      "more room for huge projects and ambitious builds.",
      "more community parties and places to make friends.",
      "more libraries, expeditions, and mysteries to uncover."
    ]
  },
  {
    "id": "city-catch",
    "type": "question",
    "place": "milky city · pokémon festival",
    "draft": true,
    "text": "[DRAFT] a final pokémon approaches you among the festival stalls. it seems ready to join your adventure. this will complete your team of six! [DRAFT] who gets the final spot?",
    "options": [
      "marill",
      "trapinch",
      "hoppip",
      "snorunt"
    ],
    "recruits": [
      {
        "name": "Marill",
        "id": 183
      },
      {
        "name": "Trapinch",
        "id": 328
      },
      {
        "name": "Hoppip",
        "id": 187
      },
      {
        "name": "Snorunt",
        "id": 361
      }
    ]
  },
  {
    "id": "city-home",
    "type": "question",
    "place": "milky city · the final stop",
    "draft": true,
    "text": "[DRAFT] the sun sets over milky city. surrounded by the friends and pokémon you met along the way, you think about what your new home should feel like. [DRAFT] what matters most to you?",
    "options": [
      "the freedom to discover somewhere new every day.",
      "the chance to create something that lasts.",
      "people who make even the ordinary days fun.",
      "a community that helps me grow and learn."
    ]
  }
];

const $ = (selector) => document.querySelector(selector);
const questions = STEPS.filter(step => step.type === 'question');
const count2 = n => String(n).padStart(2, '0');
const state = {index:0, highWater:0, answers:{}, starter:null, finished:false, audio:true, trainer:'', started:false};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let spriteSerial = 0;
let audioContext = null;
let audioLastAt = 0;
let selectedDex = null;

function getAnswer(step) { return Number.isInteger(state.answers[step.id]) ? state.answers[step.id] : null; }
// Intentionally no sessionStorage or localStorage. Every visit starts fresh.
// Remove data written by earlier versions of the quiz, if present.
try { sessionStorage.removeItem('milkymon-story-journey-v1'); } catch (_) {}
function saveState() { /* No persistence: quiz state exists only in page memory. */ }
function starterPokemon() { return DEX.find(p => p.id === state.starter) || null; }
function replaceTokens(text) { return String(text || '').replaceAll('{starter}', starterPokemon()?.name || 'your starter'); }
function pretty(text) { return replaceTokens(text).replace(/\[DRAFT\]\s*/g, '').replaceAll('*', ''); }
function scoreResult() {
  const tally = Object.fromEntries(REGION_ORDER.map(name => [name, 0]));
  questions.forEach(step => {
    const answer = getAnswer(step);
    if (answer !== null) tally[REGION_ORDER[answer]]++;
  });
  const largest = Math.max(...Object.values(tally));
  const tied = REGION_ORDER.filter(key => tally[key] === largest);
  // Tie-break using the most recent answer that favored one of the tied regions.
  const winner = tied.length === 1 ? tied[0] : [...questions].reverse().map(q => {
    const a = getAnswer(q); return a === null ? null : REGION_ORDER[a];
  }).find(key => tied.includes(key)) || tied[0];
  return {tally, winner};
}
function teamPokemon() {
  const members = [];
  const starter = starterPokemon();
  if (starter) members.push(starter);
  for (const step of STEPS) {
    if (!step.recruits) continue;
    const answer = getAnswer(step);
    if (answer !== null) members.push(step.recruits[answer]);
  }
  return members.slice(0, 6);
}

function spriteSources(pokemon) {
  const slug = pokemon.name.toLowerCase().replace(/['’]/g,'').replace(/\s+/g,'-');
  return [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
    `https://play.pokemonshowdown.com/sprites/ani/${slug}.gif`,
    `assets/sprite-${slug}.png`
  ];
}
function loadSprite(img, pokemon, fallback) {
  const token = ++spriteSerial;
  img.dataset.spriteToken = String(token);
  img.hidden = true;
  img.removeAttribute('src');
  if (fallback) fallback.hidden = false;
  const paths = spriteSources(pokemon);
  let i = 0;
  function attempt() {
    if (img.dataset.spriteToken !== String(token) || !img.isConnected) return;
    if (i >= paths.length) return;
    const path = paths[i++];
    const check = new Image();
    let done = false;
    const timeout = window.setTimeout(() => finish(false), path.startsWith('http') ? 1700 : 950);
    function finish(ok) {
      if (done) return;
      done = true;
      window.clearTimeout(timeout);
      check.onload = null; check.onerror = null;
      if (img.dataset.spriteToken !== String(token) || !img.isConnected) return;
      if (ok) {
        img.src = path;
        img.hidden = false;
        if (fallback) fallback.hidden = true;
      } else attempt();
    }
    check.onload = () => finish(true);
    check.onerror = () => finish(false);
    check.src = path;
  }
  queueMicrotask(attempt);
}
function makeSprite(pokemon, className='team-sprite') {
  const frame = document.createElement('span');
  frame.className = 'image-frame';
  const fallback = document.createElement('span');
  fallback.className = 'sprite-fallback';
  fallback.textContent = '✧';
  fallback.setAttribute('aria-hidden', 'true');
  const img = document.createElement('img');
  img.className = className;
  img.alt = `${pokemon.name} sprite`;
  img.loading = 'lazy';
  frame.append(fallback,img);
  loadSprite(img,pokemon,fallback);
  return frame;
}
function renderTeam() {
  const root = $('#team-slots'); root.replaceChildren();
  const party = teamPokemon();
  for (let i=0; i<6; i++) {
    const item = document.createElement('div'); item.className = `team-slot ${party[i] ? 'is-filled' : ''}`;
    if (party[i]) {item.appendChild(makeSprite(party[i])); const name=document.createElement('span');name.textContent=party[i].name; item.appendChild(name);} 
    else {item.innerHTML=`<span class="team-slot-empty">${count2(i+1)}</span><span>empty slot</span>`;}
    root.appendChild(item);
  }
  $('#team-count').textContent = `${party.length} / 6`;
}
// No typewriter animation: story text is displayed immediately.
function cancelType() {}
// Progress dots are interactive for previously visited stops only.
// Scored answers are also validated before every attempted jump.
function canJumpTo(i) {
  if (!state.started || i < 0 || i > state.highWater) return false;
  for (let j = 0; j < i; j++) {
    const step = STEPS[j];
    if (step.type === 'question' && getAnswer(step) === null) return false;
    if (step.type === 'starter' && !starterPokemon()) return false;
  }
  return true;
}
function jumpToStop(i) {
  if (!canJumpTo(i)) return;
  state.finished = false;
  state.index = i;
  renderStep();
}
function setProgress() {
  const answered = questions.filter(q => getAnswer(q) !== null).length;
  const number = state.started ? answered : 0;
  const bar = $('#quiz-progress');
  bar.setAttribute('aria-valuemax', String(questions.length));
  bar.setAttribute('aria-valuenow', String(number));
  $('#quiz-progress-fill').style.width = `${100 * number / questions.length}%`;
  $('#quiz-progress-text').textContent = `${count2(number)} / ${count2(questions.length)}`;
  const nav = $('#quiz-stop-jumps');
  nav.style.setProperty('--stop-count', STEPS.length);
  nav.replaceChildren();
  STEPS.forEach((step, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'progress-stop';
    dot.textContent = '•';
    const isAvailable = canJumpTo(i);
    dot.disabled = !isAvailable;
    dot.classList.toggle('is-visited', isAvailable);
    dot.classList.toggle('is-current', state.started && !state.finished && i === state.index);
    dot.setAttribute('aria-label', `Return to stop ${count2(i + 1)}: ${step.place}`);
    dot.title = isAvailable ? `Stop ${count2(i+1)} · ${step.place}` : 'Complete earlier stops to unlock';
    if (state.started && !state.finished && i === state.index) dot.setAttribute('aria-current','step');
    dot.addEventListener('click', () => jumpToStop(i));
    nav.appendChild(dot);
  });
}
function addChoice(root,text,i,active,onSelect) {
  const b=document.createElement('button'); b.type='button';b.className='quiz-choice'+(active?' is-selected':'');b.setAttribute('aria-pressed',String(active));
  const code=document.createElement('span');code.className='choice-number';code.textContent=count2(i+1);
  const value=document.createElement('span');value.className='choice-label';value.textContent=pretty(text);
  const mark=document.createElement('span');mark.className='choice-mark';mark.textContent=active?'◆':'◇';mark.setAttribute('aria-hidden','true');
  b.append(code,value,mark); b.addEventListener('click',onSelect);root.appendChild(b);
}
function setNav(canNext,label='NEXT STOP ↗') {
  $('#step-prev').disabled=state.index===0;
  $('#step-next').disabled=!canNext;
  $('#step-next').textContent=label;
}
function questionNumber(step) {return questions.findIndex(q=>q.id===step.id)+1;}
// Optional scene artwork: add image: 'assets/your-image.png' to any STEPS entry.
// imageAlt and imageCaption are optional; no file means no empty image column.
let sceneArtworkSerial = 0;
function renderSceneArtwork(step) {
  const serial = ++sceneArtworkSerial;
  const holder = $('#scene-visual');
  const image = $('#scene-image');
  const caption = $('#scene-image-caption');
  const screen = $('#question-screen');
  holder.hidden = true;
  screen.classList.remove('has-scene-image');
  image.removeAttribute('src');
  image.alt = '';
  caption.hidden = true;
  caption.textContent = '';
  if (typeof step.image !== 'string' || !step.image.trim()) return;
  const url = step.image.trim();
  const probe = new Image();
  probe.onload = () => {
    if (serial !== sceneArtworkSerial || STEPS[state.index] !== step) return;
    image.src = url;
    image.alt = step.imageAlt || `illustration for ${step.place}`;
    caption.textContent = step.imageCaption || '';
    caption.hidden = !caption.textContent;
    holder.hidden = false;
    screen.classList.add('has-scene-image');
  };
  probe.onerror = () => {
    // Silently retain text-only layout when an optional asset is missing.
  };
  probe.src = url;
}
function renderQuestion(step) {
  $('#scene-label').textContent = `STOP ${count2(questionNumber(step))} / ${step.place.toUpperCase()}`;
  $('#scene-text').textContent = pretty(step.text);
  const quote = $('#scene-quote');
  quote.hidden = !step.quote;
  quote.textContent = pretty(step.quote || '');
  const root = $('#answer-list');
  root.replaceChildren();
  step.options.forEach((option,i) => addChoice(root,option,i,getAnswer(step)===i,() => {
    state.answers[step.id] = i;
    renderTeam();
    [...root.children].forEach((child,j) => {
      const active = j === i;
      child.classList.toggle('is-selected',active);
      child.setAttribute('aria-pressed',String(active));
      child.querySelector('.choice-mark').textContent = active ? '◆' : '◇';
    });
    setNav(true,state.index===STEPS.length-1 ? 'FIND MY REGION ↗' : 'NEXT STOP ↗');
    setProgress();
  }));
  root.hidden = false;
  $('#special-zone').hidden = true;
  setNav(getAnswer(step)!==null,state.index===STEPS.length-1 ? 'FIND MY REGION ↗' : 'NEXT STOP ↗');
}
function showSpecial() {$('#answer-list').hidden=true;$('#special-zone').hidden=false;$('#special-zone').replaceChildren();}
function renderStarter(step) {
  $('#scene-label').textContent=step.place.toUpperCase();
  $('#scene-text').textContent=step.intro;
  $('#scene-quote').hidden=true;
  // Only the scene heading and description appear here; no duplicate dialogue heading.
  showSpecial();
  const box=document.createElement('div');box.className='special-card';
  const pokemon=starterPokemon();
  const left=document.createElement('div');left.className='special-card-copy';
  left.innerHTML='<span class="micro-label">PROFESSOR KAT’S POKÉDEX</span><strong></strong><p>browse by type, region, or name. pick the one who feels right!</p>';
  left.querySelector('strong').textContent=pokemon?`${pokemon.name} is ready to go!`:'10 possible partners. one big adventure.';
  const right=document.createElement('div');right.className='special-card-right';
  if(pokemon)right.appendChild(makeSprite(pokemon,'special-sprite'));
  const button=document.createElement('button');button.className='accent-button';button.textContent=pokemon?'CHANGE STARTER ↗':'OPEN THE POKÉDEX ↗';button.onclick=openDex;
  right.appendChild(button);box.append(left,right);$('#special-zone').appendChild(box);
  setNav(Boolean(pokemon),'CONTINUE JOURNEY ↗');
}
function renderScene(step) {
  $('#scene-label').textContent=step.place.toUpperCase();
  $('#scene-text').textContent=pretty([step.intro,step.end].filter(Boolean).join(' '));
  $('#scene-quote').hidden=true;
  showSpecial();
  const node=document.createElement('button');node.type='button';node.className='dialogue-card';
  node.innerHTML='<span class="micro-label">A PASSING TRAINER / HOVER OR TAP ↗</span><span class="dialogue-content"></span><span class="dialogue-foot">the dialogue changes when you interact with it ♡</span>';
  let toggled=false;
  const content=node.querySelector('.dialogue-content');
  content.textContent=step.quote;
  node.addEventListener('pointerenter',()=>{content.textContent=step.hoverQuote;});
  node.addEventListener('pointerleave',()=>{if(!toggled)content.textContent=step.quote;});
  node.addEventListener('focus',()=>{content.textContent=step.hoverQuote;});
  node.addEventListener('blur',()=>{if(!toggled)content.textContent=step.quote;});
  node.addEventListener('click',()=>{toggled=!toggled;content.textContent=toggled?step.hoverQuote:step.quote;});
  $('#special-zone').appendChild(node);
  setNav(true,'TO THE TIPSY KARP ↗');
}
function renderStep() {
  cancelType();$('#welcome-screen').hidden=true;$('#result-screen').hidden=true;$('#question-screen').hidden=false;
  $('#page-subtitle').textContent='YOUR ADVENTURE / IN PROGRESS';
  const step=STEPS[state.index];
  renderSceneArtwork(step);
  if(step.type==='question') renderQuestion(step);
  else if(step.type==='starter') renderStarter(step);
  else renderScene(step);
  renderTeam();setProgress();saveState();
}
function advance() {
  const step=STEPS[state.index];
  if(step.type==='question'&&getAnswer(step)===null)return;
  if(step.type==='starter'&&!starterPokemon())return;
  if(state.index<STEPS.length-1){state.index++;state.highWater=Math.max(state.highWater,state.index);renderStep();}
  else if(questions.every(q=>getAnswer(q)!==null)&&starterPokemon()){state.finished=true;showResult();saveState();}
}
function rewind() {if(state.finished)state.finished=false;if(state.index>0){state.index--;renderStep();}}
// The region result becomes a custom trainer card rather than an ordinary ticket.
let resultPortraitRequest = 0;
function setResultPortrait(username) {
  const request = ++resultPortraitRequest;
  const portrait = $('#trainer-card-portrait');
  const fallback = $('#trainer-card-pokeball');
  portrait.hidden = true;
  portrait.removeAttribute('src');
  fallback.hidden = false;
  if (!username) return;

  const existing = $('#trainer-avatar-small img');
  if (existing?.complete && existing.naturalWidth > 0) {
    portrait.src = existing.src;
    portrait.alt = `${username}'s Minecraft head`;
    portrait.hidden = false;
    fallback.hidden = true;
    return;
  }
  const encoded = encodeURIComponent(username);
  const urls = [
    `https://api.mcheads.org/head/${encoded}/128`,
    `https://api.mcheads.org/head/${encoded}/128/hat`
  ];
  function tryPortrait(index) {
    if (index >= urls.length || request !== resultPortraitRequest) return;
    const probe = new Image();
    probe.onload = () => {
      if (request !== resultPortraitRequest || !state.finished) return;
      portrait.src = probe.src;
      portrait.alt = `${username}'s Minecraft head`;
      portrait.hidden = false;
      fallback.hidden = true;
    };
    probe.onerror = () => tryPortrait(index + 1);
    probe.src = urls[index];
  }
  tryPortrait(0);
}
function renderResultParty() {
  const root = $('#trainer-card-party');
  root.replaceChildren();
  const party = teamPokemon();
  for (let i=0;i<6;i++) {
    const cell = document.createElement('div');
    cell.className = 'tc-pokemon-cell';
    if (party[i]) {
      cell.appendChild(makeSprite(party[i],'tc-pokemon-sprite'));
      const name = document.createElement('span');
      name.className = 'tc-pokemon-name';
      name.textContent = party[i].name;
      cell.appendChild(name);
    } else {
      const number = document.createElement('span');
      number.className = 'tc-empty-number';
      number.textContent = count2(i+1);
      const name = document.createElement('span');
      name.className = 'tc-pokemon-name';
      name.textContent = 'empty slot';
      cell.append(number,name);
    }
    root.appendChild(cell);
  }
  $('#trainer-card-party-count').textContent = `${count2(party.length)} / 06`;
}
function showResult() {
  cancelType();
  $('#welcome-screen').hidden = true;
  $('#question-screen').hidden = true;
  $('#result-screen').hidden = false;
  $('#page-subtitle').textContent = 'YOUR TRAINER CARD / JOURNEY COMPLETE';
  const {winner,tally} = scoreResult();
  const data = REGION_INFO[winner];
  const card = $('#trainer-card');
  const palettes = {
    valhalla: {wash:'#fff0ed', mid:'#f6d6d2', edge:'#d9928b', ink:'#993e3b'},
    hokundra: {wash:'#edf5fc', mid:'#d9eafd', edge:'#9bbddd', ink:'#436f9f'},
    baylands: {wash:'#fff8e1', mid:'#fae7ad', edge:'#d9bb62', ink:'#83671a'},
    karp: {wash:'#edf7e9', mid:'#daedd5', edge:'#a1c29b', ink:'#436d40'}
  };
  const colors = palettes[winner];
  for (const [name,value] of Object.entries(colors)) card.style.setProperty(`--tc-${name}`,value);
  card.dataset.region = winner;
  const name = state.trainer || 'YOU!';
  $('#trainer-card-name').textContent = name;
  $('#trainer-card-display-name').textContent = name;
  $('#region-title').textContent = data.title;
  $('#region-subtitle').textContent = data.subtitle;
  $('#region-description').textContent = data.text;
  $('#trainer-card-date').textContent = new Intl.DateTimeFormat('en-GB', {
    day:'2-digit', month:'short', year:'numeric'
  }).format(new Date()).toUpperCase();
  setResultPortrait(state.trainer);
  $('#result-mascot').replaceChildren(makeSprite(P(...data.mascot),'tc-mascot-sprite'));
  renderResultParty();
  const tallyRoot = $('#score-chart');
  tallyRoot.replaceChildren();
  REGION_ORDER.forEach(key => {
    const row = document.createElement('div');
    row.className = 'score-line';
    row.innerHTML = '<span></span><div class="score-track"><i></i></div><strong></strong>';
    row.querySelector('span').textContent = REGION_INFO[key].title;
    row.querySelector('i').style.width = `${tally[key]/questions.length*100}%`;
    row.querySelector('i').style.backgroundColor = REGION_INFO[key].color;
    row.querySelector('strong').textContent = tally[key];
    tallyRoot.appendChild(row);
  });
  renderTeam();
  setProgress();
  $('#region-title').focus({preventScroll:true});
}

function clearQuizState() {
  ++resultPortraitRequest;
  state.index=0; state.highWater=0; state.answers={}; state.starter=null;
  state.finished=false; state.trainer=''; state.started=false;
}
function resetQuiz() {
  clearQuizState();
  renderWelcome();
}
function renderWelcome() {
  cancelType();
  $('#welcome-screen').hidden=false;
  $('#question-screen').hidden=true;
  $('#result-screen').hidden=true;
  $('#page-subtitle').textContent='PASSENGER CHECK-IN / YOUR JOURNEY AWAITS';
  updateTrainerIdentity('');
  renderTeam(); setProgress();
  $('#minecraft-name').value='';
  $('#name-feedback').textContent="your username isn't saved by Milkymon. minecraft heads are fetched from MCHeads.";
  resetTrainerHead();
}
function beginJourney(name) {
  state.trainer = name;
  state.started = true;
  state.index = 0;
  state.highWater = 0;
  updateTrainerIdentity(name || 'YOU!');
  if (name) loadTrainerHead(name);
  else resetTrainerHead();
  renderStep();
}


/* Minecraft player head from mcheads.org. Uses image endpoints directly,
   not cross-origin canvas or a custom skin parser. */
let headRequest = 0;
let headDebounce = null;
function resetTrainerHead() {
  ++headRequest;
  const avatar = $('#trainer-avatar-small');
  avatar.replaceChildren();
  avatar.textContent = '?';
}
function updateTrainerIdentity(displayName = '') {
  $('#trainer-name-small').textContent = displayName || '???';
  $('#trainer-identity').hidden = false;
}
function loadTrainerHead(username) {
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    resetTrainerHead();
    return;
  }
  const request = ++headRequest;
  const encoded = encodeURIComponent(username);
  const candidates = [
    `https://api.mcheads.org/head/${encoded}/128`,
    `https://api.mcheads.org/head/${encoded}/128/hat`
  ];
  // Avoid a broken thumbnail and ignore late responses for older usernames.
  function tryHead(index) {
    if (request !== headRequest) return;
    if (index >= candidates.length) {
      $('#trainer-avatar-small').textContent = '?';
      return;
    }
    const image = new Image();
    image.alt = '';
    image.decoding = 'async';
    image.onload = () => {
      if (request !== headRequest) return;
      $('#trainer-avatar-small').replaceChildren(image);
    };
    image.onerror = () => tryHead(index + 1);
    image.src = candidates[index];
  }
  tryHead(0);
}
$('#minecraft-name').addEventListener('input', event => {
  const username = event.target.value.trim();
  clearTimeout(headDebounce);
  resetTrainerHead(); // Also invalidates older network responses.
  updateTrainerIdentity(username || '');
  if (/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    headDebounce = setTimeout(() => loadTrainerHead(username), 350);
  }
});
$('#trainer-form').addEventListener('submit', event => {
  event.preventDefault();
  const username = $('#minecraft-name').value.trim();
  if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
    $('#name-feedback').textContent = 'enter a valid Java Minecraft username (3–16 characters, letters/numbers/_).';
    $('#minecraft-name').focus();
    return;
  }
  clearTimeout(headDebounce);
  beginJourney(username);
});
$('#guest-start').addEventListener('click', () => {
  clearTimeout(headDebounce);
  beginJourney('');
});

/* Pokédex: name search, type and origin filters, hover sounds, confirmation. */
const dexDialog=$('#pokedex-dialog');
const dexGrid=$('#dex-grid');
const dexType=$('#dex-type');const dexRegion=$('#dex-region');const dexSearch=$('#dex-search');
function playBeep() {
  if(!state.audio)return;
  const now=performance.now();if(now-audioLastAt<65)return;audioLastAt=now;
  try {
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
    if(!audioContext)audioContext=new AC();
    if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
    const osc=audioContext.createOscillator(),gain=audioContext.createGain(),start=audioContext.currentTime;
    osc.type='square';osc.frequency.setValueAtTime(640,start);osc.frequency.exponentialRampToValueAtTime(760,start+.04);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.016,start+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,start+.07);
    osc.connect(gain).connect(audioContext.destination);osc.start(start);osc.stop(start+.075);
  }catch(_){}
}
function updateDexPreview() {
  const pokemon=DEX.find(p=>p.id===selectedDex);
  const preview=$('#dex-preview');preview.replaceChildren();
  if(pokemon){preview.appendChild(makeSprite(pokemon,'dex-preview-sprite'));
    const text=document.createElement('div');text.innerHTML='<strong></strong><span></span>';
    text.querySelector('strong').textContent=pokemon.name;
    text.querySelector('span').textContent=`#${String(pokemon.id).padStart(3,'0')} · ${pokemon.type.toUpperCase()} · ${pokemon.origin.toUpperCase()}`;
    preview.appendChild(text);
  }else preview.textContent='select a pokémon to see its entry ♡';
  $('#dex-confirm').disabled=!pokemon;
}
function renderDex() {
  dexGrid.replaceChildren();
  const filtered=DEX.filter(p=>(dexType.value==='all'||p.type===dexType.value)&&(dexRegion.value==='all'||p.origin===dexRegion.value)&&p.name.toLowerCase().includes(dexSearch.value.trim().toLowerCase())).sort((a,b)=>a.id-b.id);
  for(const pokemon of filtered){
    const card=document.createElement('button');card.type='button';card.className='dex-cell'+(selectedDex===pokemon.id?' selected':'');
    card.setAttribute('aria-pressed',String(selectedDex===pokemon.id));card.dataset.id=String(pokemon.id);
    card.appendChild(makeSprite(pokemon,'dex-cell-sprite'));
    const name=document.createElement('span');name.className='dex-cell-name';name.textContent=pokemon.name;
    const detail=document.createElement('span');detail.className='dex-cell-meta';detail.textContent=`#${String(pokemon.id).padStart(3,'0')}`;
    card.append(name,detail);
    card.addEventListener('pointerenter',playBeep);
    card.addEventListener('focus',()=>{if(document.activeElement===card)playBeep();});
    card.addEventListener('click',()=>{selectedDex=pokemon.id;playBeep();renderDex();updateDexPreview();});
    dexGrid.appendChild(card);
  }
  $('#dex-empty').hidden=filtered.length!==0;
}
function openDex() {
  selectedDex=state.starter;
  dexType.value='all';dexRegion.value='all';dexSearch.value='';
  renderDex();updateDexPreview();dexDialog.showModal();
}
function closeDex(){if(dexDialog.open)dexDialog.close();}
$('#dex-close').addEventListener('click',closeDex);
$('#dex-confirm').addEventListener('click',()=>{if(!DEX.some(p=>p.id===selectedDex))return;state.starter=selectedDex;closeDex();renderStep();});
dexDialog.addEventListener('click',event=>{if(event.target===dexDialog)closeDex();});
[dexType,dexRegion].forEach(el=>el.addEventListener('change',renderDex));
dexSearch.addEventListener('input',renderDex);
$('#dex-sound').addEventListener('click',()=>{state.audio=!state.audio;$('#dex-sound').textContent=state.audio?'SFX ON ♫':'SFX OFF ♡';$('#dex-sound').setAttribute('aria-pressed',String(state.audio));saveState();});
$('#step-next').addEventListener('click',advance);
$('#step-prev').addEventListener('click',rewind);
$('#restart-journey').addEventListener('click',resetQuiz);
$('#result-back').addEventListener('click',()=>{state.finished=false;renderStep();});
$('#dex-sound').textContent=state.audio?'SFX ON ♫':'SFX OFF ♡';
$('#dex-sound').setAttribute('aria-pressed',String(state.audio));
renderWelcome();
// A restored back-forward cache page must also start a fresh journey.
window.addEventListener('pagehide', clearQuizState);
window.addEventListener('pageshow', event => { if (event.persisted) resetQuiz(); });

// Optional logo reveal, matching the other Milkymon pages.
document.querySelectorAll('.brand-mark-image').forEach(img=>{
  const reveal=()=>{if(img.naturalWidth>0)img.closest('.brand-mark')?.classList.add('has-logo');};
  img.addEventListener('load',reveal);img.addEventListener('error',()=>{img.hidden=true;});if(img.complete)reveal();
});
