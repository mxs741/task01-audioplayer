const btns = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>
const page = document.querySelector('.root') as HTMLElement
let currentAudio: string = ''
let audio: HTMLAudioElement = new Audio(currentAudio)
let icon: HTMLImageElement
let iconAddress: string

btns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (evt: MouseEvent) => {
    const target = evt.currentTarget as HTMLButtonElement
    const img = target.children[0] as HTMLImageElement
    if (target) {
      audio.paused ?
      (audio.play(), img.src = `./icons/pause.svg`,
        icon = img,
        iconAddress = `./icons/${target.dataset.sound}.svg`) :
      (audio.pause(), img.src = `./icons/${target.dataset.sound}.svg`)

      if (currentAudio !== `./sounds/${target.dataset.sound}.mp3`) {
        audio.pause()
        icon.src = iconAddress
        icon = img
        iconAddress = `./icons/${target.dataset.sound}.svg`

        page.style.backgroundImage = `url('./img/${target.dataset.sound}-bg.jpg')`
        currentAudio = `./sounds/${target.dataset.sound}.mp3`

        audio = new Audio(`./sounds/${target.dataset.sound}.mp3`)
        img.src = `./icons/pause.svg`
        audio.volume = changeVolume(audio)
        audio.play()
      }
      changeVolume(audio)
    }
  })
})

function changeVolume(audio: HTMLAudioElement): number {
  const volume: HTMLInputElement = document.querySelector('.volume') as HTMLInputElement
  volume.addEventListener('input', () => {
    audio.volume = parseFloat(volume.value)
  })
  return parseFloat(volume.value)
}