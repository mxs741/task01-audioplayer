var btns = document.querySelectorAll('.btn');
var page = document.querySelector('.root');
var currentAudio = '';
var audio = new Audio(currentAudio);
var icon;
var iconAddress;
btns.forEach(function (btn) {
    btn.addEventListener('click', function (evt) {
        var target = evt.currentTarget;
        var img = target.children[0];
        if (target) {
            audio.paused ?
                (audio.play(), img.src = "./icons/pause.svg",
                    icon = img,
                    iconAddress = "./icons/".concat(target.dataset.sound, ".svg")) :
                (audio.pause(), img.src = "./icons/".concat(target.dataset.sound, ".svg"));
            if (currentAudio !== "./sounds/".concat(target.dataset.sound, ".mp3")) {
                audio.pause();
                icon.src = iconAddress;
                icon = img;
                iconAddress = "./icons/".concat(target.dataset.sound, ".svg");
                page.style.backgroundImage = "url('./img/".concat(target.dataset.sound, "-bg.jpg')");
                currentAudio = "./sounds/".concat(target.dataset.sound, ".mp3");
                audio = new Audio("./sounds/".concat(target.dataset.sound, ".mp3"));
                img.src = "./icons/pause.svg";
                audio.volume = changeVolume(audio);
                audio.play();
            }
            changeVolume(audio);
        }
    });
});
function changeVolume(audio) {
    var volume = document.querySelector('.volume');
    volume.addEventListener('input', function () {
        audio.volume = parseFloat(volume.value);
    });
    return parseFloat(volume.value);
}
