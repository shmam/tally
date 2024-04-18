class Counter {
    constructor() {
        this.map = {}
    }

    count(key) {
        if (this.map[key] === undefined) {
            this.map[key] = 0
        }
        this.map[key]++
    }

    getCount() {
        return this.map
    }
}

module.exports = Counter;