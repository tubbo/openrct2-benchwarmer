# Benchwarmer

A plugin for [OpenRCT2][] that quickly builds benches and litter bins on
each alternating footpath tile. This is generally the best way to ensure
your park value stays high, and is a very tedious part of playing
RollerCoaster Tycoon 2.

## Installation

Download the [latest release][] from GitHub. Then, place the `.js` file
in your OpenRCT2 plugin folder. On macOS, this is `~/Library/Application Support/OpenRCT2/plugin`.

## Usage

This plugin adds a new dialog window to the "Map" menu, where all other
plugins are located, allowing you to choose which two pieces of
bench/bin scenery you wish to add to the map.

After selecting the two pieces of scenery, click the "Add" button to
automatically add each bin and bench to your footpaths. Benches are
added to footpaths with an even index, and bins are added to footpaths
with an odd index. Sloped footpaths and ride queues are ignored.

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
