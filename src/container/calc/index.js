class Calc {
  static #value = ''
  static #NAME = 'calc'

  static #isDot = false
  static #isDotBefore = false

  static add = (newValue) => {
    if (isNaN(this.#value[this.#value.length - 2])) {
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot === false
      ) {
        return null
      }
    }
    console.log(this.#value)
    this.#value = this.#value.concat(newValue)
    this.#output()
  }

  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    if (this.#isDot) {
      return null
    }
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static backspace = () => {
    if (this.#value === '') {
      return null
    }

    if (this.#value[this.#value.length - 1] === '.') {
      this.#isDot = false
    } else if (isNaN(this.#value[this.#value.length - 1])) {
      this.#isDot = this.#isDotBefore
      this.#isDotBefore = false
    }
    this.#value = this.#value.slice(
      0,
      this.#value.length - 1,
    )
    this.#output()
  }

  static op = (opValue) => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDotBefore = this.#isDot
    this.#isDot = false
  }

  static reset = () => {
    this.#value = ''
    this.#output()
    this.#isDot = false
    this.#isDotBefore = false
  }

  static result = () => {
    this.#value = String(eval(this.#value))
    if (this.#value.includes('.')) {
      this.#isDot = true
    } else {
      this.#isDot = false
    }
    this.#output()
    this.#isDotBefore = false
  }

  static #save = () => {
    window.localStorage.setItem(this.#NAME, this.#value)
  }

  static #load = () => {
    this.#value =
      window.localStorage.getItem(this.#NAME) || ''
  }

  static init = () => {
    this.#load()
    this.#output()
  }
}

window.calc = Calc

document.addEventListener('DOMContentLoaded', () => {
  Calc.init()
})
