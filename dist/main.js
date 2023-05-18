const box = document.querySelector('.box');
let set = document.getElementById('setting');
let sizeBox = 10; // 10, 15, 25
let them = '';
let countClick = 0;


if(localStorage.getItem('them')) {
    them = localStorage.getItem('them');
    changeThem(them);
} else {
    them = 'themLight';
    changeThem(them)
}

// Открытие окна настроек
set.addEventListener('click', () => {
    document.querySelector('.settingBoxShadow').classList.toggle('dNone');
});
// Смена темы
document.querySelector('.settingBoxShadow').addEventListener('click', () => {
    if (event.target.classList.contains('setVar') == true) {
        document.querySelector('.settingBoxShadow').classList.toggle('dNone');
        if (event.target.classList.contains('setVarLvl') == true) {
            console.log('change ' + event.target.id)
        } else {
            changeThem(event.target.id);
        }
    } else if (event.target.classList.contains('settingBoxShadow') == true) {
        document.querySelector('.settingBoxShadow').classList.toggle('dNone');
    }
});
function changeThem (name) {
    localStorage.setItem('them', name);
    document.body.classList = name;
}
