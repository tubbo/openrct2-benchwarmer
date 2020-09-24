# Changelog

## [v0.3.1][] - 9/24/2020

Bug fixes related to insufficient funds and overwriting custom scenery additions.

### Changed

- [Prevent Building Bins/Benches With Insufficient Funds](https://github.com/tubbo/openrct2-benchwarmer/pull/21)
- [Prevent Overwriting Other Path Additions](https://github.com/tubbo/openrct2-benchwarmer/pull/22)

## [v0.3.0][] - 9/16/2020

This minor release adds a new option for building only bins on sloped
footpaths, in addition to some fixes regarding how much money is spent
on benches/bins when they are placed as well as which ones are placed.
Shoutout to @pencil for all the great work they have done! Also, thanks to
@RundesBalli for reporting the sloped footpaths issue.

### Added

- [Build bins on all sloped footpaths](https://github.com/tubbo/openrct2-benchwarmer/pull/13)
- [Build on paths with construction rights](https://github.com/tubbo/openrct2-benchwarmer/pull/16)

### Changed

- [Don't charge money when no addition added](https://github.com/tubbo/openrct2-benchwarmer/pull/15)

## [v0.2.0][] - 9/1/2020

Shoutouts to @pencil and @gfrewqpoiu for all their great work on this
release, and @RundesBalli / @nepumax for reporting their issues. It's
good to see y'all finding this plugin useful.

### Added

- [Select first element in list by default](https://github.com/tubbo/openrct2-benchwarmer/pull/7)
- [Allow building items with index 0](https://github.com/tubbo/openrct2-benchwarmer/pull/8)

### Changed

- [Make search for benches and bins independent of game language](https://github.com/tubbo/openrct2-benchwarmer/pull/3)
- [Fix accuracy of bench/bin alternation](https://github.com/tubbo/openrct2-benchwarmer/pull/5)
- [Ignore sloped paths more reliably](https://github.com/tubbo/openrct2-benchwarmer/pull/6)

## [v0.1.1][] - 8/19/2020

A quick bug fix. Shoutout to @Fred-1044276 for catching this one.

### Changed

- [Fix bins/benches being built on footpaths outside park's ownership](https://github.com/tubbo/openrct2-benchwarmer/commit/f02c1d3539c779d667ac18c05dd4e5c7f8e09512)

## v0.1.0 - 8/16/2020

Initial Release

[v0.1.1]: https://github.com/tubbo/openrct2-benchwarmer/compare/v0.1.0...v0.1.1
[v0.2.0]: https://github.com/tubbo/openrct2-benchwarmer/compare/v0.1.1...v0.2.0
[v0.3.0]: https://github.com/tubbo/openrct2-benchwarmer/compare/v0.2.0...v0.3.0
[v0.3.1]: https://github.com/tubbo/openrct2-benchwarmer/compare/v0.3.0...v0.3.1
