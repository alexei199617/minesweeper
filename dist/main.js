let sizeField; // 10, 15, 25
let theme;
let countClick = 0;
let countBomb;
let sec = 00;



//Очень страшное добавление элементов на страницу
(function() {
  const settingBoxShadow = document.createElement('div');
  settingBoxShadow.className = 'settingBoxShadow dNone';
  document.body.appendChild(settingBoxShadow);
  const settingBox = document.createElement('div');
  settingBox.className = 'settingBox';
  settingBoxShadow.appendChild(settingBox);
  const setText1 = document.createElement('div');
  setText1.className = 'setText';
  setText1.innerHTML = 'Theme:';
  settingBox.appendChild(setText1);
  const setVars1 = document.createElement('div');
  setVars1.className = 'setVars';
  settingBox.appendChild(setVars1);
  const themeLight = document.createElement('div');
  themeLight.className = 'setVar';
  themeLight.id = 'themeLight';
  setVars1.appendChild(themeLight);
  const themeDark = document.createElement('div');
  themeDark.className = 'setVar';
  themeDark.id = 'themeDark';
  setVars1.appendChild(themeDark);
  const themeGreen = document.createElement('div');
  themeGreen.className = 'setVar';
  themeGreen.id = 'themeGreen';
  setVars1.appendChild(themeGreen);
  const setText2 = document.createElement('div');
  setText2.className = 'setText';
  setText2.innerHTML = 'Level:';
  settingBox.appendChild(setText2);
  const setVars2 = document.createElement('div');
  setVars2.className = 'setVars';
  settingBox.appendChild(setVars2);
  const lvl10 = document.createElement('div');
  lvl10.className = 'setVar setVarLvl';
  lvl10.id = 'lvl-10';
  lvl10.innerHTML = '10';
  setVars2.appendChild(lvl10);
  const lvl15 = document.createElement('div');
  lvl15.className = 'setVar setVarLvl';
  lvl15.id = 'lvl-15';
  lvl15.innerHTML = '15';
  setVars2.appendChild(lvl15);
  const lvl25 = document.createElement('div');
  lvl25.className = 'setVar setVarLvl';
  lvl25.id = 'lvl-25';
  lvl25.innerHTML = '25';
  setVars2.appendChild(lvl25);
  const header = document.createElement('div');
  header.className = 'header';
  document.body.appendChild(header);
  const statistic = document.createElement('div');
  statistic.className = 'headerIcon';
  statistic.id = 'statistic';
  header.appendChild(statistic);
  const setting = document.createElement('div');
  setting.className = 'headerIcon';
  setting.id = 'setting';
  header.appendChild(setting);
  const minefield = document.createElement('div');
  minefield.id = 'minefield';
  document.body.appendChild(minefield);
  const status = document.createElement('div');
  status.className = 'status';
  document.body.appendChild(status);
  const time = document.createElement('div');
  time.className = 'time';
  status.appendChild(time);
  const timeText = document.createElement('div');
  timeText.innerHTML = 'time';
  time.appendChild(timeText);
  const timeBox = document.createElement('div');
  timeBox.className = 'statusBox';
  timeBox.id = 'time';
  timeBox.innerHTML = '0:00';
  time.appendChild(timeBox);
  const click = document.createElement('div');
  click.className = 'click';
  status.appendChild(click);
  const clickText = document.createElement('div');
  clickText.innerHTML = 'click';
  click.appendChild(clickText);
  const clickBox = document.createElement('div');
  clickBox.className = 'statusBox';
  clickBox.id = 'click';
  clickBox.innerHTML = 0;
  click.appendChild(clickBox);
  const bomb = document.createElement('div');
  bomb.className = 'bomb';
  status.appendChild(bomb);
  const bombText = document.createElement('div');
  bombText.innerHTML = 'bomb';
  bomb.appendChild(bombText);
  const bombBox = document.createElement('div');
  bombBox.className = 'statusBox';
  bombBox.id = 'bomb';
  bomb.appendChild(bombBox);
})();


if (localStorage.getItem('theme')) {
  theme = localStorage.getItem('theme');
  changeTheme(theme);
} else {
  theme = 'themeLight';
  changeTheme(theme)
}

function changeTheme(name) {
  localStorage.setItem('theme', name);
  document.body.classList = name;
}

if (localStorage.getItem('sizeField')) {
  sizeField = localStorage.getItem('sizeField');
  createCell(sizeField);
} else {
  sizeField = 10;
  createCell(sizeField)
}


// Открытие окна настроек
document.getElementById('setting').addEventListener('click', () => {
  document.querySelector('.settingBoxShadow').classList.toggle('dNone');
});
// Смена темы и размера
document.querySelector('.settingBoxShadow').addEventListener('click', () => {
  if (event.target.classList.contains('setVar') == true) {
    document.querySelector('.settingBoxShadow').classList.toggle('dNone');
    if (event.target.classList.contains('setVarLvl') == true) {
      createCell(String(event.target.id).slice(-2));
    } else {
      changeTheme(event.target.id);
    }
  } else if (event.target.classList.contains('settingBoxShadow') == true) {
    document.querySelector('.settingBoxShadow').classList.toggle('dNone');
  }
});

function createCell(size) {
  localStorage.setItem('sizeField', size);
  deleteCell();
  const field = document.getElementById('minefield');
  field.classList = 'minefield-' + size;
  for (let i = 1; i < (size * size + 1); i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    field.appendChild(cell);
  }
  if (size == 10) {
    countBomb = 10;
  } else if (size == 15) {
    countBomb = 30;
  } else if (size == 25) {
    countBomb = 99;
  }
  document.getElementById('bomb').innerHTML = countBomb;
  return ('size ' + size);
}
// очищение поля minefield перед добавлением новых элементов
function deleteCell() {
  document.getElementById('minefield').innerHTML = '';
  return
}

//клик по элементу поля
document.getElementById('minefield').addEventListener('click', () => {
  if (event.target.classList.contains('cell')) {
    if (countClick < 1) {
      game('start', event.target);
    }
    game('play', event.target);
    // event.target.classList.add('active');
  }
});

function game(state, et) {
  countClick++;
  if (state == 'start') {
    showTime()
    console.log('start game');
    et.classList.add('active');
  } else if (state == 'end') {
    console.log('game over')
    return;
  } else {
    et.classList.add('active');
  }
}

function showTime(stat) {
  if (stat == 'end') {
    return game('end');
  }
  if (sec / 60 > 99) {
    return game('end');
  }
  sec++;
  let minute = 0;
  let timeStr;
  let symbol = ':';
  if (sec > 59) {
    minute = Math.floor(sec / 60);
  }
  if ((sec - minute * 60) < 10) {
    symbol = ':0';
  } else {
    symbol = ':';
  }
  timeStr = minute + symbol + (sec - minute * 60);
  document.getElementById('time').innerHTML = timeStr;
  setTimeout(showTime, 1000);
}
