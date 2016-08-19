'use strict'

const fs = require('fs')



class Config {
    constructor(newObj) {
      this.rules = newObj.rules
    }

    static parseFromFilePath(filePath) {

        return new Config (JSON.parse(fs.readFileSync(filePath, 'utf8')))
    }

}

//console.log(Config)

module.exports = {
    Config
}
