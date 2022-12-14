

let homeTeam_inGame = [{'PG':''},{'SG':''},{'SF':''},{'PF':''},{'C':''}]
let homeTeam_onBench =[]

let roster = [
    {name:'LaMelo Ball',position:'PG',fatigue:1,stamina:88,overall:86,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Harrison Barnes',position:'SF',fatigue:1,stamina:85,overall:77,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Horace Grant',position:'PF',fatigue:1,stamina:85,overall:86,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Blake Griffin',position:'PF',fatigue:1,stamina:85,overall:83,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'LeBron James',position:'SF',fatigue:1,stamina:92,overall:95,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Nikola Jokic',position:'C',fatigue:1,stamina:90,overall:89,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'DeAndre Jordan',position:'C',fatigue:1,stamina:85,overall:83,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Zach Lavine',position:'SG',fatigue:1,stamina:88,overall:87,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Kenyon Martin',position:'PF',fatigue:1,stamina:80,overall:73,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Kris Middleton',position:'SF',fatigue:1,stamina:89,overall:88,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Bobby Phills',position:'SG',fatigue:1,stamina:82,overall:74,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0},
    {name:'Marcus Smart',position:'PG',fatigue:1,stamina:80,overall:75,minutesPlayed:0,inactive:'n',bench:'yes',benchCoolDown:0}
]

//Core functions ---------------------------------------------------------------------------------------------------------------------

function setStarters(){
 
    roster.sort((a, b)=> b.overall-a.overall)
    console.log('')
    console.log('Roster sorted by Overall rating:')
    roster.forEach(item=>console.log(`${item.name}(${item.position}) - ${item.overall}`))

    //Set players into starting positions
    for(let j = 0;j<homeTeam_inGame.length;j++){
        let inGamePos = Object.keys(homeTeam_inGame[j])[0]
        let start = function (j){
            for(let i=0;i<roster.length;i++){
                if (roster[i].position===inGamePos&&roster[i].inactive==='n'){
                    // console.log(roster[i].name)
                    homeTeam_inGame[j][inGamePos]=roster.splice(i,1)[0]
                    return homeTeam_inGame[j][inGamePos].bench='no'
                }
            }
        }
        start(j)

    }

    //push remaining players to the bench and clear the roster
    homeTeam_onBench = roster.slice()
    roster =[]
}

function makeSubs(){
    //Reset roster
    roster = homeTeam_onBench.slice()//Bench moved back to the roster
    homeTeam_onBench = [] //Bench reset to empty



    //Move each player in-game back to the roster and reset each in-game position
    for(let i = 0;i<homeTeam_inGame.length;i++){
        let inGamePlayer= Object.values(homeTeam_inGame[i])[0]
        inGamePlayer.bench = 'yes'
        roster.push(inGamePlayer) 
        homeTeam_inGame[i][Object.keys(homeTeam_inGame[i])[0]]='' 
    }


    roster.sort((a, b)=> (b.overall*b.fatigue)-(a.overall*a.fatigue))  //Sorts players by overall effectiveness considering fatigue
    
   
    // roster.forEach(item=>console.log(`${item.name}(${item.position}) - ${item.overall*item.fatigue}`))



    //Set players into in-game positions
    for(let j = 0;j<homeTeam_inGame.length;j++){

        let sub = function (j){

            for(let i=0;i<roster.length;i++){
                let inGamePos = Object.keys(homeTeam_inGame[j])[0]
                if (roster[i].position===inGamePos){
                    // console.log(roster[i].name)
                    homeTeam_inGame[j][inGamePos]=roster.splice(i,1)[0]
                    return homeTeam_inGame[j][inGamePos].bench='no'
                }
            }
        }
        sub(j)
    }

    //push remaining players to the bench and clear the roster
    homeTeam_onBench = roster.slice()
    roster =[]
}


//--------------------------------------------------------------------------------------------------------------------------

//Logging the initial state of rosters and line-ups

console.log('Roster:')
roster.forEach(item=>console.log(`${item.name}(${item.position}) - ${item.overall}`))

console.log('')
console.log('Starters not set yet...')

console.log('Starting PG:',homeTeam_inGame[0].PG.name)
console.log('Starting SG:',homeTeam_inGame[1].SG.name)
console.log('Starting SF:',homeTeam_inGame[2].SF.name)
console.log('Starting PF:',homeTeam_inGame[3].PF.name)
console.log('Starting C: ',homeTeam_inGame[4].C.name)
console.log('')

console.log('')
console.log('In Game:',homeTeam_inGame.length)
console.log('On Bench:',homeTeam_onBench.length)
console.log('Roster:', roster.length)
console.log('')


//Setting starters
console.log('Setting starters...')
setStarters()


console.log('')
console.log('Starting Line-up is set...')
console.log('Starting PG:',homeTeam_inGame[0].PG.name)
console.log('Starting SG:',homeTeam_inGame[1].SG.name)
console.log('Starting SF:',homeTeam_inGame[2].SF.name)
console.log('Starting PF:',homeTeam_inGame[3].PF.name)
console.log('Starting C: ',homeTeam_inGame[4].C.name)
console.log('')

console.log('In Game:',homeTeam_inGame.length)
console.log('On Bench:',homeTeam_onBench.length)
console.log('Roster:', roster.length)
console.log('')

// console.log(homeTeam_inGame)
// console.log(homeTeam_onBench)



homeTeam_inGame[0].PG.fatigue = .88
homeTeam_inGame[1].SG.fatigue = .8
homeTeam_inGame[2].SF.fatigue = .90
homeTeam_inGame[3].PF.fatigue = .8
homeTeam_inGame[4].C.fatigue = .8

// homeTeam_inGame[2].SF.inactive = 'y'
// homeTeam_inGame[4].C.inactive = 'y'


//Making subs
console.log('Making substitutions...')
makeSubs()

console.log('')
console.log('Subs have been made...')
console.log('Starting PG:',homeTeam_inGame[0].PG.name)
console.log('Starting SG:',homeTeam_inGame[1].SG.name)
console.log('Starting SF:',homeTeam_inGame[2].SF.name)
console.log('Starting PF:',homeTeam_inGame[3].PF.name)
console.log('Starting C: ',homeTeam_inGame[4].C.name)
console.log('')

console.log(homeTeam_inGame)
console.log(homeTeam_onBench)