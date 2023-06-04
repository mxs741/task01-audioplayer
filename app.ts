const btns = document.querySelectorAll('.btn') as NodeListOf<HTMLElement>
const page = document.querySelector('.root') as HTMLElement
let currentAudio: string = ''
let audio: HTMLAudioElement = new Audio(currentAudio)
let icon: HTMLImageElement
let iconAddress: string

btns.forEach(btn => {
  btn.addEventListener('click', (evt: any) => {
    audio.paused ?
    (audio.play(), evt.currentTarget.children[0].src = `./icons/pause.svg`,
      icon = evt.currentTarget.children[0],
      iconAddress = `./icons/${evt.currentTarget.dataset.sound}.svg`) :
    (audio.pause(), evt.currentTarget.children[0].src = `./icons/${evt.currentTarget.dataset.sound}.svg`)

    if (currentAudio !== `./sounds/${evt.currentTarget.dataset.sound}.mp3`) {
      audio.pause()
      icon.src = iconAddress
      icon = evt.currentTarget.children[0]
      iconAddress = `./icons/${evt.currentTarget.dataset.sound}.svg`

      page.style.backgroundImage = `url('./img/${evt.currentTarget.dataset.sound}-bg.jpg')`
      currentAudio = `./sounds/${evt.currentTarget.dataset.sound}.mp3`

      audio = new Audio(`./sounds/${evt.currentTarget.dataset.sound}.mp3`)
      evt.currentTarget.children[0].src = `./icons/pause.svg`
      audio.volume = changeVolume(audio)
      audio.play()
    }
    changeVolume(audio)
  })
})

function changeVolume(audio: HTMLAudioElement): number {
  const volume = document.querySelector('.volume') as HTMLInputElement
  volume.addEventListener('input', () => {
    audio.volume = parseFloat(volume.value)
  })
  return parseFloat(volume.value)
}