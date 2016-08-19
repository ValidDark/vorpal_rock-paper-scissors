'use strict'

const { Config } = require('./Config')

const _ = require('lodash')
const vorpal = require('vorpal')
const fs = require('fs')
const path = require('path')

const cli = vorpal()


const config =
  Config
    .parseFromFilePath(path.resolve(__dirname, 'config.json'))



const configKeys = _.keys(config.rules)



cli
  .command('play <move>','plays the given move, options are ' + configKeys)
  .action(function (args, callback){

        let yourMove = args.move
        let cpuMove = configKeys[Math.floor((Math.random() * configKeys.length))]

        console.log("you picked : " + yourMove)
        console.log("Computer picked : " +  cpuMove)

        //if (config.rules[yourMove])
        if (yourMove == cpuMove)
        {
          console.log("--- IT'S A TIE ---")
        }
        if (cpuMove == config.rules[yourMove])
        {
          console.log("--- YOU WIN ---")
        }
        if(yourMove == config.rules[cpuMove])
        {
          console.log("--- YOU LOSE ---")
        }

        callback()
      })



module.exports =  cli

//play command with required arg  move,  move being rock, paper, or scissors
//if invalid move, say invalid move, and show correct moves
//if valid move, RNG computers move.

//should explort const cli
