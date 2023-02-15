import * as gamePlay from "./gameplay_functions.js" 
// import{gameLength,pos2} from "./game_data.js"
import {chicagoBulls,newYorkKnicks} from "./game_data.js"
import {leagueTeams} from "./player_generator.js"
export{homeTeam,roadTeam,pos}

//Game Sim Variables
// let gameLength = 2880
let pos = 1
// let shotClock=24
// let teamOneScore = 0
// let teamTwoScore = 0


//Creates class and methods for Team 
let GameTeam = class {
    constructor(team){
        this.city = team.city
        this.teamName = team.teamName
        this.shortName = team.shortName
        this.roster = team.roster
        this.inGame = [{'PG':''},{'SG':''},{'SF':''},{'PF':''},{'C':''}]
        this.onBench = []
        leagueTeams.push(this)
        this.hasPossession = 'no'
        this.score = 0
    }
}

GameTeam.prototype.setStarters = function(){
    this.roster.sort((a, b)=> b.pRat_overall-a.pRat_overall)

    //Set players into starting positions
    for(let j = 0;j<5;j++){
        let inGamePos = Object.keys(this.inGame[j])[0]
        let start = function(j,roster,inGame){

        for(let i=0;i<roster.length;i++){
                if (roster[i].position===inGamePos&&roster[i].inactive==='n'){
                    inGame[j][inGamePos]=roster.splice(i,1)[0]
                    return inGame[j][inGamePos].benchStatus='court'
                }
            }
        }
        start(j,this.roster,this.inGame)
    }

    //push remaining players to the bench and clear the roster
    this.onBench = this.roster.slice()
    this.roster =[]
}

GameTeam.prototype.makeSubs = function(){
    //Reset roster
    this.roster = this.onBench.slice()//Bench moved back to the roster
    this.onBench = [] //Bench reset to empty

    //Move each player in-game back to the roster and reset each in-game position
    for(let i = 0;i<5;i++){
        let inGamePlayer= Object.values(this.inGame[i])[0]
        inGamePlayer.benchStatus = 'bench'
        this.roster.push(inGamePlayer)
        this.inGame[i][Object.keys(this.inGame[i])[0]]='' 
    }

    this.roster.sort((a, b)=>(b.pRat_overall*b.fatigue)-(a.pRat_overall*a.fatigue))  //Sorts players by overall effectiveness considering fatigue
    
   
    // this.roster.forEach(item=>console.log(`${item.name}(${item.position}) - ${item.pRat_overall*item.fatigue}`))



    //Set players into in-game positions
    for(let j = 0;j<this.inGame.length;j++){

        let sub = function(j,roster,inGame){



            for(let i=0;i<12;i++){
                let inGamePos = Object.keys(inGame[j])[0]
                if (roster[i].position===inGamePos){
                    inGame[j][inGamePos]=roster.splice(i,1)[0]
                    return inGame[j][inGamePos].benchStatus='court'
                }
            }
        }
        sub(j,this.roster,this.inGame)
    }

    //push remaining players to the bench and clear the roster
    this.onBench = this.roster.slice()
    this.roster =[]
}



//Loads Teams into the Simulation
let homeTeam = new GameTeam(chicagoBulls)
let roadTeam = new GameTeam(newYorkKnicks)

homeTeam.setStarters()
roadTeam.setStarters()

// HTML Output
document.getElementById('home-team').innerHTML=`${homeTeam.city} ${homeTeam.teamName}`
document.getElementById('road-team').innerHTML=`${roadTeam.city} ${roadTeam.teamName}`

function display(){
    
    document.getElementById('home-score').innerHTML=`${homeTeam.score}`
    document.getElementById('road-score').innerHTML=`${roadTeam.score}`

    document.getElementById('homePG').innerHTML=`${homeTeam.inGame[0].PG.name} (${homeTeam.inGame[0].PG.pRat_overall}) | Fatigue- ${(homeTeam.inGame[0].PG.fatigue)*100} | Pts- ${(homeTeam.inGame[0].PG.boxScore.points)} | FGs- ${(homeTeam.inGame[0].PG.boxScore.FG)}/${(homeTeam.inGame[0].PG.boxScore.FGA)} | FTs- ${(homeTeam.inGame[0].PG.boxScore.FT)}/${(homeTeam.inGame[0].PG.boxScore.FTA)} | Reb - ${(homeTeam.inGame[0].PG.boxScore.rebounds)} | Ast - ${(homeTeam.inGame[0].PG.boxScore.assists)} | Fls - ${(homeTeam.inGame[0].PG.boxScore.fouls)}`
    document.getElementById('roadPG').innerHTML=`${roadTeam.inGame[0].PG.name} (${roadTeam.inGame[0].PG.pRat_overall}) | Fatigue- ${(roadTeam.inGame[0].PG.fatigue)*100} | Pts- ${(roadTeam.inGame[0].PG.boxScore.points)} | FGs- ${(roadTeam.inGame[0].PG.boxScore.FG)}/${(roadTeam.inGame[0].PG.boxScore.FGA)} | FTs- ${(roadTeam.inGame[0].PG.boxScore.FT)}/${(roadTeam.inGame[0].PG.boxScore.FTA)} | Reb - ${(roadTeam.inGame[0].PG.boxScore.rebounds)} | Ast - ${(roadTeam.inGame[0].PG.boxScore.assists)} | Fls - ${(roadTeam.inGame[0].PG.boxScore.fouls)}`
    
    document.getElementById('homeSG').innerHTML=`${homeTeam.inGame[1].SG.name} (${homeTeam.inGame[1].SG.pRat_overall}) | Fatigue- ${(homeTeam.inGame[1].SG.fatigue)*100} | Pts- ${(homeTeam.inGame[1].SG.boxScore.points)} | FGs- ${(homeTeam.inGame[1].SG.boxScore.FG)}/${(homeTeam.inGame[1].SG.boxScore.FGA)} | FTs- ${(homeTeam.inGame[1].SG.boxScore.FT)}/${(homeTeam.inGame[1].SG.boxScore.FTA)} | Reb - ${(homeTeam.inGame[1].SG.boxScore.rebounds)} | Ast - ${(homeTeam.inGame[1].SG.boxScore.assists)} | Fls - ${(homeTeam.inGame[1].SG.boxScore.fouls)}`
    document.getElementById('roadSG').innerHTML=`${roadTeam.inGame[1].SG.name} (${roadTeam.inGame[1].SG.pRat_overall}) | Fatigue- ${(roadTeam.inGame[1].SG.fatigue)*100} | Pts- ${(roadTeam.inGame[1].SG.boxScore.points)} | FGs- ${(roadTeam.inGame[1].SG.boxScore.FG)}/${(roadTeam.inGame[1].SG.boxScore.FGA)} | FTs- ${(roadTeam.inGame[1].SG.boxScore.FT)}/${(roadTeam.inGame[1].SG.boxScore.FTA)} | Reb - ${(roadTeam.inGame[1].SG.boxScore.rebounds)} | Ast - ${(roadTeam.inGame[1].SG.boxScore.assists)} | Fls - ${(roadTeam.inGame[1].SG.boxScore.fouls)}`
    
    document.getElementById('homeSF').innerHTML=`${homeTeam.inGame[2].SF.name} (${homeTeam.inGame[2].SF.pRat_overall}) | Fatigue- ${(homeTeam.inGame[2].SF.fatigue)*100} | Pts- ${(homeTeam.inGame[2].SF.boxScore.points)} | FGs- ${(homeTeam.inGame[2].SF.boxScore.FG)}/${(homeTeam.inGame[2].SF.boxScore.FGA)} | FTs- ${(homeTeam.inGame[2].SF.boxScore.FT)}/${(homeTeam.inGame[2].SF.boxScore.FTA)} | Reb - ${(homeTeam.inGame[2].SF.boxScore.rebounds)} | Ast - ${(homeTeam.inGame[2].SF.boxScore.assists)} | Fls - ${(homeTeam.inGame[2].SF.boxScore.fouls)}`
    document.getElementById('roadSF').innerHTML=`${roadTeam.inGame[2].SF.name} (${roadTeam.inGame[2].SF.pRat_overall}) | Fatigue- ${(roadTeam.inGame[2].SF.fatigue)*100} | Pts- ${(roadTeam.inGame[2].SF.boxScore.points)} | FGs- ${(roadTeam.inGame[2].SF.boxScore.FG)}/${(roadTeam.inGame[2].SF.boxScore.FGA)} | FTs- ${(roadTeam.inGame[2].SF.boxScore.FT)}/${(roadTeam.inGame[2].SF.boxScore.FTA)} | Reb - ${(roadTeam.inGame[2].SF.boxScore.rebounds)} | Ast - ${(roadTeam.inGame[2].SF.boxScore.assists)} | Fls - ${(roadTeam.inGame[2].SF.boxScore.fouls)}`
    
    document.getElementById('homePF').innerHTML=`${homeTeam.inGame[3].PF.name} (${homeTeam.inGame[3].PF.pRat_overall}) | Fatigue- ${(homeTeam.inGame[3].PF.fatigue)*100} | Pts- ${(homeTeam.inGame[3].PF.boxScore.points)} | FGs- ${(homeTeam.inGame[3].PF.boxScore.FG)}/${(homeTeam.inGame[3].PF.boxScore.FGA)} | FTs- ${(homeTeam.inGame[3].PF.boxScore.FT)}/${(homeTeam.inGame[3].PF.boxScore.FTA)} | Reb - ${(homeTeam.inGame[3].PF.boxScore.rebounds)} | Ast - ${(homeTeam.inGame[3].PF.boxScore.assists)} | Fls - ${(homeTeam.inGame[3].PF.boxScore.fouls)}`
    document.getElementById('roadPF').innerHTML=`${roadTeam.inGame[3].PF.name} (${roadTeam.inGame[3].PF.pRat_overall}) | Fatigue- ${(roadTeam.inGame[3].PF.fatigue)*100} | Pts- ${(roadTeam.inGame[3].PF.boxScore.points)} | FGs- ${(roadTeam.inGame[3].PF.boxScore.FG)}/${(roadTeam.inGame[3].PF.boxScore.FGA)} | FTs- ${(roadTeam.inGame[3].PF.boxScore.FT)}/${(roadTeam.inGame[3].PF.boxScore.FTA)} | Reb - ${(roadTeam.inGame[3].PF.boxScore.rebounds)} | Ast - ${(roadTeam.inGame[3].PF.boxScore.assists)} | Fls - ${(roadTeam.inGame[3].PF.boxScore.fouls)}`
    
    document.getElementById('homeC').innerHTML=`${homeTeam.inGame[4].C.name} (${homeTeam.inGame[4].C.pRat_overall}) | Fatigue- ${(homeTeam.inGame[4].C.fatigue)*100} | Pts- ${(homeTeam.inGame[4].C.boxScore.points)} | FGs- ${(homeTeam.inGame[4].C.boxScore.FG)}/${(homeTeam.inGame[4].C.boxScore.FGA)} | FTs- ${(homeTeam.inGame[4].C.boxScore.FT)}/${(homeTeam.inGame[4].C.boxScore.FTA)} | Reb - ${(homeTeam.inGame[4].C.boxScore.rebounds)} | Ast - ${(homeTeam.inGame[4].C.boxScore.assists)} | Fls - ${(homeTeam.inGame[4].C.boxScore.fouls)}`
    document.getElementById('roadC').innerHTML=`${roadTeam.inGame[4].C.name} (${roadTeam.inGame[4].C.pRat_overall}) | Fatigue- ${(roadTeam.inGame[4].C.fatigue)*100} | Pts- ${(roadTeam.inGame[4].C.boxScore.points)} | FGs- ${(roadTeam.inGame[4].C.boxScore.FG)}/${(roadTeam.inGame[4].C.boxScore.FGA)} | FTs- ${(roadTeam.inGame[4].C.boxScore.FT)}/${(roadTeam.inGame[4].C.boxScore.FTA)}  | Reb - ${(roadTeam.inGame[4].C.boxScore.rebounds)} | Ast - ${(roadTeam.inGame[4].C.boxScore.assists)} | Fls - ${(roadTeam.inGame[4].C.boxScore.fouls)}`
}

display()
document.getElementById('display').addEventListener('click',display)

document.getElementById('reload').addEventListener('click',reload)


//--------------------------------------------------------------------------------------------------------------------------------------------------
//  Game Sim Below
//--------------------------------------------------------------------------------------------------------------------------------------------------

//Tip-off assigned to the Bulls
homeTeam.hasPossession='yes'
roadTeam.hasPossession='no'


// gamePlay.simPos(homeTeam,roadTeam)

// console.log('')
// console.log('LeBron, Lowry and Lavine are tired...')
// homeTeam.inGame[2].SF.fatigue = .8
// homeTeam.inGame[1].SG.fatigue = .8
// homeTeam.inGame[0].PG.fatigue = .8



// homeTeam.makeSubs()

// console.log(homeTeam.city,homeTeam.teamName,homeTeam.inGame,homeTeam.onBench)
// console.log(roadTeam.teamName,roadTeam.city,roadTeam.inGame,roadTeam.onBench)

for(let i = 1;i<=100;i++){
    gamePlay.simPos(homeTeam,roadTeam,pos)
    // if(homeTeam.hasPossession ==='yes'){
    //     console.log(`The ${homeTeam.teamName} have possession.`)
    // }else{
    //     console.log(`The ${roadTeam.teamName} have possession.`)
    // }
    pos++
    display()
}



console.log(homeTeam.teamName,':',homeTeam.score)
console.log(roadTeam.teamName,':',roadTeam.score)

function reload(){
}
console.log(roadTeam.inGame[1].SG.boxScore.TP,roadTeam.inGame[1].SG.boxScore.TPA)

function reset(){

//     offTeam.map(item=>item.boxScore.points=0)
//     offTeam.map(item=>item.boxScore.assists=0)
//     offTeam.map(item=>item.boxScore.rebounds=0)
//     offTeam.map(item=>item.boxScore.steals=0)
//     offTeam.map(item=>item.boxScore.blocks=0)
//     offTeam.map(item=>item.boxScore.FG=0)
//     offTeam.map(item=>item.boxScore.FGA=0)

//     defTeam.map(item=>item.boxScore.points=0)
//     defTeam.map(item=>item.boxScore.assists=0)
//     defTeam.map(item=>item.boxScore.rebounds=0)
//     defTeam.map(item=>item.boxScore.steals=0)
//     defTeam.map(item=>item.boxScore.blocks=0)
//     defTeam.map(item=>item.boxScore.FG=0)
//     defTeam.map(item=>item.boxScore.FGA=0)

//     pos=0
}




