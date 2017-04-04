import smoothscroll from './libs/smoothscroll'

function main() {
  smoothscroll(400)
}

if (window.i) {
  main()
} else {
  window.addEventListener('load', main)
}
