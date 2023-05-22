let sizeField; // 10, 15, 25
let theme;
let countClick = 0;
let countBomb;
let sec = 0;
let timeState = true;
let arrBomb = [];
let arrStatistic = [];



//Очень страшное добавление элементов на страницу
(function() {
  const boxShadow = document.createElement('div');
  boxShadow.className = 'boxShadow dNone';
  document.body.appendChild(boxShadow);
  const settingBox = document.createElement('div');
  settingBox.className = 'settingBox';
  boxShadow.appendChild(settingBox);
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
  const restart = document.createElement('div');
  restart.className = 'headerIcon';
  restart.id = 'restart';
  header.appendChild(restart);
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


//resrart
document.getElementById('restart').addEventListener('click', gameReturn);
// Открытие окна настроек
document.getElementById('setting').addEventListener('click', () => {
  document.querySelector('.boxShadow').classList.toggle('dNone');
});
// Смена темы и размера
document.querySelector('.boxShadow').addEventListener('click', () => {
  if (event.target.classList.contains('setVar') == true) {
    document.querySelector('.boxShadow').classList.toggle('dNone');
    if (event.target.classList.contains('setVarLvl') == true) {
      gameReturn();
      createCell(String(event.target.id).slice(-2));
    } else {
      changeTheme(event.target.id);
    }
  } else if (event.target.classList.contains('boxShadow') == true) {
    document.querySelector('.boxShadow').classList.toggle('dNone');
  }
});

function createCell(size) {
  localStorage.setItem('sizeField', size);
  sizeField = size;
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
  }
});
document.getElementById('minefield').addEventListener('contextmenu', () => {
  event.preventDefault();
  if (event.target.classList.contains('cell')) {
    if (!event.target.classList.contains('active')) {
      event.target.classList.toggle('cellRightClick');
    }
  }
})


function game (state, et) {
  if (state == 'start') {
    gameStart(et);
    return
  } else if (state == 'end') {
    gameEnd('lose');
    return;
  } else if (state == 'finish') {
    gameEnd('finish');
  } else {
    changeCountClick(et);
  }
}

function gameStart (et) {
  timeState = true;
  createBomb(et);
  showTime();
  console.log('start game');
}

function gameEnd (state) {
  if (state == 'finish') {
    console.log('finish game');
    alert('Hooray! You found all mines in ' + sec + ' seconds and ' + countClick + ' moves!');
    gameEndStatistic();
  } else if (state == 'lose') {
    console.log('game over');
    alert('Game over. Try again');
    gameEndStatistic();
  }
  document.querySelectorAll('.cellBomb').forEach(item => {
    item.classList.add('active');
  });
  // setTimeout(gameReturn, 5000);
  gameReturn();
}
function gameEndStatistic () {
  let click = document.getElementById('click').value
}

function gameReturn() {
  timeState = false;
  createCell(sizeField);
  countClick = 0;
  sec = 0;
  arrBomb = [];
  document.getElementById('time').innerHTML = ' 0:00';
  document.getElementById('click').innerHTML = countClick;
}

function changeCountClick(et) {
  if (et.classList.contains('cellBomb')) {
    if (!et.classList.contains('cellRightClick')) {
      et.classList.add('active');
      game('end');
    }
  } else if (!et.classList.contains('active')) {
    if (!et.classList.contains('cellRightClick')) {
      et.classList.add('active');
      countClick++;
    }
    document.getElementById('click').innerHTML = countClick;
    cellClearMore(et);
    if (document.querySelectorAll('.active').length == (sizeField*sizeField-countBomb)) {
      return game('finish');
    }
  }
}

function showTime(stat) {
  if (timeState == false) {
    return
  }
  if (stat == 'lose') {
    game('end');
    return;
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

function createBomb (et) {
  while (arrBomb.length < (countBomb)) {
    let num = getRandomInt(sizeField*sizeField);
    if (num != et.id) {
      arrBomb.push(num);
    }
  }
  arrBomb.forEach(item => {
    document.getElementById(item).classList.add('cellBomb');
    cellCloseId(cellNum(item, sizeField));
  });
  if (document.querySelectorAll('.cellBomb').length < countBomb) {
    generateLastBomb()
  }
}
function generateLastBomb () {
  let smallNum = getRandomInt(sizeField*sizeField);
  if (document.getElementById(smallNum).classList.contains('cellBomb')) {
    return generateLastBomb();
  } else {
    document.getElementById(smallNum).classList.add('cellBomb');
    cellCloseId(cellNum(smallNum, sizeField));
  }
  if (document.querySelectorAll('.cellBomb').length < countBomb) {
    generateLastBomb()
  }
}

function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}
function cellNum (nums, sizes) {
  let num = Number(nums);
  let size = Number(sizes);
  let smollArr = [];
  smollArr.push(num - size - 1);
  smollArr.push(num - size);
  smollArr.push(num - size + 1);
  smollArr.push(num - 1);
  smollArr.push(num + 1);
  smollArr.push(num + size - 1);
  smollArr.push(num + size);
  smollArr.push(num + size + 1);
  return smollArr;
}


function cellCloseId (arr) {
  arr.forEach(num => {
    if (document.getElementById(num)) {
      if (document.getElementById(num).classList.contains('cellBomb')) {
        return
      } else if (document.getElementById(num).classList.contains('cellClose')) {
        for (let i = 8; i > 0; i--) {
          if (document.getElementById(num).classList.contains('cellClose-' + i)) {
            document.getElementById(num).classList.remove('cellClose-' + i);
            document.getElementById(num).classList.add('cellClose-' + (i+1));
            return
          }
        }
      } else {
        document.getElementById(num).classList.add('cellClose');
        document.getElementById(num).classList.add('cellClose-1');
      }
    }
  });
}

function cellClearMore (et) {
  if (!et.classList.contains('cellClose')) {
    if (!et.classList.contains('cellRightClick')) {
      cellClearActive(et)
    }
  }
}
function cellClearActive (et) {
  cellNum(et.id, sizeField).forEach(num => {
    if (document.getElementById(num)) {
      if (document.getElementById(num).classList.contains('cellBomb')) {
        return
      } else if (document.getElementById(num).classList.contains('cellRightClick')) {
        return
      } else if (!document.getElementById(num).classList.contains('cellClose')) {
        document.getElementById(num).classList.add('active')
      }
    }
  });

}
