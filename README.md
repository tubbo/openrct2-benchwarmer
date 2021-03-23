# Benchwarmer

A plugin for [OpenRCT2][] that quickly builds benches and litter bins on
each alternating footpath tile. This is generally the best way to ensure
your park value stays high, and is a very tedious part of playing
RollerCoaster Tycoon 2.

## Installation

Download the [latest release][] from GitHub. Then, place the `.js` file
in your [OpenRCT2 plugin folder][].

- On macOS, this is `~/Library/Application Support/OpenRCT2/plugin`.
- On Windows, this is `%USERPROFILE%\Documents\OpenRCT2\plugin`.
- On Linux, this is `$XDG_CONFIG_HOME/OpenRCT2/plugin`.
  (`$XDG_CONFIG_HOME` is typically set to `~/.config`)

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

Make sure you have `$OPENRCT2_BIN` set to your OpenRCT2 CLI, and
`$OPENRCT2_DIR` set to the directory in which OpenRCT2 keeps all its
user content.

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
[openrct2]: https://openrct2.org/
[openrct2 plugin folder]: https://www.pcgamingwiki.com/wiki/OpenRCT2#Configuration_file.28s.29_location
