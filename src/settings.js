const BENCH = "Benchwarmer.Bench"
const BIN = "Benchwarmer.Bin"
const BUILD = "Benchwarmer.BuildOnAllSlopedFootpaths"
const PRESERVE = "Benchwarmer.PreserveOtherAdditions"

export default class Settings {
  constructor(all) {
    this.benches = all.filter(a => a.identifier.includes("bench"))
    this.bins = all.filter(a => a.identifier.includes("litter"))
  }

  get bench() {
    return this.benches[this.selections.bench].index
  }

  get bin() {
    return this.bins[this.selections.bin].index
  }

  get selections() {
    const bench = context.sharedStorage.get(BENCH, 1)
    const bin = context.sharedStorage.get(BIN, 1)

    return { bench, bin }
  }

  get buildBinsOnAllSlopedPaths() {
    return context.sharedStorage.get(BUILD, false)
  }

  get preserveOtherAdditions() {
    return context.sharedStorage.get(PRESERVE, true)
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

  set preserveOtherAdditions(value) {
    context.sharedStorage.set(PRESERVE, value)
  }

  get configured() {
    return this.bench !== null && this.bin !== null
  }
}
