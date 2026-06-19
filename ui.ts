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
  label: string,
  items: string[],
  selectedIndex: number,
  onChange: (index: number) => void
): Widget[] {
  y += 20;
  const namedItems: string[] = items.map((a, index) => {
    if (a === "None") return a;
    return `${a} type-${index}`;
  });
  return [
    { type: "label", x: 10, y, width: 100, height: 10, text: label },
    {
      type: "dropdown",
      x: 110,
      y,
      width: 180,
      height: 12,
      items: namedItems,
      selectedIndex: selectedIndex,
      onChange: onChange,
    },
  ];
}

export function Checkbox(
  text: string,
  isChecked: boolean,
  onChange: ChangeEventHandler<boolean>,
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
