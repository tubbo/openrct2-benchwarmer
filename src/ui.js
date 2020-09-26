const LABEL_X = 10
const INPUT_X = 70
let y = 0

export function dropdown(text, choices, selectedIndex, onChange) {
  const items = choices.map(b => `${b.name} ${b.identifier}`)

  y += 20

  return [
    {
      type: "label",
      x: LABEL_X,
      y,
      width: 50,
      height: 10,
      text
    },
    {
      type: "dropdown",
      x: INPUT_X,
      y,
      width: 200,
      height: 10,
      items,
      selectedIndex,
      onChange
    },
  ]
}

export function checkbox(text, isChecked, onChange) {
  y += 15

  return {
    type: "checkbox",
    x: LABEL_X,
    y,
    width: 200,
    height: 15,
    isChecked,
    text,
    onChange,
  }
}

export function button(text, onClick) {
  y += 20

  return {
    type: "button",
    text,
    x: 10,
    y: y,
    width: 50,
    height: 20,
    onClick
  }
}
