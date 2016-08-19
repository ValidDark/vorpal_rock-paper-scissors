'use strict'

const {
    Config
} = require('./Config')

const _ = require('lodash')
const vorpal = require('vorpal')
const path = require('path')

const cli = vorpal()


let yourWins = 0
let cpuWins = 0

let config =
    Config
    .parseFromFilePath(path.resolve(__dirname, 'config.json'))



let configKeys = _.keys(config.rules)



cli
    .command('play <move>', 'plays the given move, options are : ' + configKeys)
    .alias('throw')
    .action(function(args, callback) {

        let yourMove = args.move
        let cpuMove = configKeys[Math.floor((Math.random() * configKeys.length))]

        let isMoveValid = false

        for (var validMove of configKeys) {
            if (yourMove === validMove) {
                isMoveValid = true
            }
        }



        console.log("you picked : " + yourMove)

        if (isMoveValid === false) {
            console.log('--INVALID MOVE -- possible moves are: ' + configKeys)
        } else {
            console.log("Computer picked : " + cpuMove)


            config.rules[yourMove].forEach(x => {
                    if (cpuMove === x) {
                        console.log("--- YOU WIN ---")
                        yourWins++
                    }
                })
                //console.log(config.rules[yourMove] + "&&&&&&&&&&&&")
            config.rules[cpuMove].forEach(x => {
                    if (yourMove === x) {
                        console.log("--- YOU LOSE ---")
                        cpuWins++
                    }
                })
                //if (config.rules[yourMove])
            if (yourMove === cpuMove) {
                console.log("--- IT'S A TIE ---")
            }
        }


        callback()
    })


cli
    .command('config <rule>', 'changes the rules, defaults to basic.  Options are : basic,spock,crazy')
    .alias('rule')
    .action(function(args, callback) {
        if (args.rule === "basic") {
            config =
                Config
                .parseFromFilePath(path.resolve(__dirname, 'config.json'))
        }

        if (args.rule === "spock") {
            config =
                Config
                .parseFromFilePath(path.resolve(__dirname, 'config2.json'))
        }

        if (args.rule === "crazy") {
            config =
                Config
                .parseFromFilePath(path.resolve(__dirname, 'config3.json'))
        }

        configKeys = _.keys(config.rules)
        console.log("Rules have been changed to:" + args.rule)
        callback()
    })

    cli
        .command('score', 'shows the current score.')
        .alias('points')
        .action(function(args, callback) {
            console.log('\':------------------------------------:\'')
            console.log('   Your Points: ' + yourWins + '    CPU Points: ' + cpuWins)
            console.log('.:------------------------------------:.')
            callback()
        })


module.exports = cli

//play command with required arg  move,  move being rock, paper, or scissors
//if invalid move, say invalid move, and show correct moves
//if valid move, RNG computers move.

//should explort const cli
