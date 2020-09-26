const BENCH = "Benchwarmer.Bench"
const BIN = "Benchwarmer.Bin"
const BUILD = "Benchwarmer.BuildOnAllSlopedFootpaths"

export default class Settings {
  constructor(all) {
    this.benches = all.filter(a => a.identifier.includes("bench"))
    this.bins = all.filter(a => a.identifier.includes("litter"))
  }

  get bench() {
    return this.benches[this.benchIndex].index
  }

  get bin() {
    return this.benches[this.binIndex].index
  }

  get benchIndex() {
    return context.sharedStorage.get(BENCH, 1)
  }

  get binIndex() {
    return context.sharedStorage.get(BIN, 1)
  }

  get buildBinsOnAllSlopedPaths() {
    return context.sharedStorage.get(BUILD, false)
  }

  set bench(number) {
    context.sharedStorage.set(BENCH, number)
  }

  set bin(number) {
    context.sharedStorage.set(BIN, number)
  }

  set buildBinsOnAllSlopedPaths(value) {
    context.sharedStorage.set(BUILD, value)
  }

  get configured() {
    return this.bench !== null && this.bin !== null
  }
}
