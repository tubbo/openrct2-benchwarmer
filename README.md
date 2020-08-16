# Benchwarmer

A plugin for [OpenRCT2][] that quickly builds benches and litter bins on
each alternating footpath tile. This is generally the best way to ensure
your park value stays high, and is a very tedious part of playing
RollerCoaster Tycoon 2.

## Features

- Select which bin and bench you wish to place.
- Optionally $5 for benches and $3 for bins from your cash, so you can
  play scenarios as if you placed each piece yourself.

## Installation

Download the [latest release][] from GitHub. Then, unzip the archive and
place the plugin in your OpenRCT2 plugin folder. On macOS, this is
`~/Library/Application Support/OpenRCT2/plugin`.

## Usage

This plugin adds a new dialog window to the "Map" menu, where all other
plugins are located, allowing you to choose which two pieces of
bench/bin scenery you wish to add to the map.

<img />

After selecting the two pieces of scenery, click the "Add benches and
bins to footpaths" button to automatically add each bin and bench to
your footpaths. You can uncheck the "Deduct cash" checkbox if you're
playing in a sandboxed mode, and you don't want the cost of this
construction to deduct from your cash on hand.

## Development

If you wish to contribute to this project, make sure it builds locally
before pushing your changes.

To do this, install dependencies with Yarn:

```bash
yarn
```

Then, build the project to the local **build/** folder. There should be
no errors.

```bash
yarn build
```

Also, make sure to run ESLint before pushing your changes:

```bash
yarn test
```

[latest release]: https://github.com/tubbo/openrct2-benchwarmer/releases
[OpenRCT2]: https://openrct2.org/
