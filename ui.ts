const LABEL_X = 10;
const INPUT_X = 70;

let y = 0;

export type ChangeEventHandler<Value> = (value: Value) => void;

export type ClickEventHandler = () => void;

export type Choice = {
  name: string;
  identifier: string;
};

export function Document(...widgets: Widget[]): Widget[] {
  y = 0;

  return widgets;
}

export function Dropdown(
  text: string,
  choices: Choice[],
  selectedIndex: number,
  onChange: ChangeEventHandler<number>
): [LabelWidget, DropdownWidget] {
  const items = choices.map((b) => `${b.name} ${b.identifier}`);

  y += 20;

  return [
    {
      type: "label",
      x: LABEL_X,
      y,
      width: 60,
      height: 10,
      text,
    },
    {
      type: "dropdown",
      x: INPUT_X,
      y,
      width: 200,
      height: 10,
      items,
      selectedIndex,
      onChange,
    },
  ];
}

export function Checkbox(
  text: string,
  isChecked: boolean,
  onChange: ChangeEventHandler<boolean>
): CheckboxWidget {
  y += 15;

  return {
    type: "checkbox",
    x: LABEL_X,
    y,
    width: 200,
    height: 15,
    isChecked,
    text,
    onChange,
  };
}

export function Button(text: string, onClick: ClickEventHandler): ButtonWidget {
  y += 20;

  return {
    type: "button",
    text,
    x: 10,
    y: y,
    width: 100,
    height: 20,
    onClick,
  };
}
