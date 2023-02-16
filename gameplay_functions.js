//Export functions
// import{gameLength} from "./game_data.js"
// export{simPos,setStarters,makeSubs,reload,testSim}
// import{homeTeam,roadTeam,pos} from "./app_game_sim.js"
export{testSim}


function testSim(home,away){
    // console.log(home)
    // console.log(away)

}


//Simulate a possession
function simPos(home,road,posCount){
    let offense,defense,offTeam
    let score = 0
    
    let shooter,defRebounder,offRebounder, assister, stealer, defender = ''
    let shotSelection = ''
    let shotOutcome = ''
    let assistOutcome = ''
    let shotDescription = ''
    let defenseDescription =''
    let defensiveOutcome = ''
    let possessionOutcome = ''
    let pointValue = 0

    //Set offensive and defensive teams
    if(home.hasPossession ==='yes'){
        offTeam = home
        offense = home.inGame
        score = home.score
        defense = road.inGame

    }else{
        offTeam = road
        offense = road.inGame
        score = road.score
        defense = home.inGame

    }

    // //Display offensive PG and offRating
    // console.log(offense[0].PG)
    // console.log(offense[0].PG.pRat_offOverall)

    //Defines the shot function
    function shot(off_shooter,shot_selection){
        //Sets the output language for the possesion result
        function madeShotPhrase(){
            switch(Math.floor(Math.random()*(7)+1)){
            case 1: return 'knocks down'
            break
            case 2: return 'hits'
            break
            case 3: return 'connects on'
            break
            case 4: return 'drills'
            break
            case 5: return 'floats in'
            break
            case 6: return 'with a high-arching rainbow... He connects on'
            break
            case 7: return 'drains'
            break
            default: 'hits'
            }
        }
        function shotTypePhrase(x){
            switch(x){
                case 'pRat_closeShot':
                    switch(Math.floor(Math.random()*(3)+1)){
                        case 1: return 'a jump hook'
                        break
                        case 2: return 'the shot after driving the lane and finishing with a lay-up'
                        break
                        case 3: return 'an easy bucket at the rim'
                        break
                        default:'4th option'
                    }
                break
                case 'pRat_midShot':
                    switch(Math.floor(Math.random()*(3)+1)){
                        case 1: return 'a jumper from the wing'
                        break
                        case 2: return 'a mid-range shot'
                        break
                        case 3: return 'a well-contested, fall-away jumper'
                        break
                        default:'a 20-footer'
                    }
                break
                case 'pRat_longShot': switch(Math.floor(Math.random()*(3)+1)){
                    case 1: return 'a jumper from beyond the arc'
                    break
                    case 2: return 'a 40-footer from the logo'
                    break
                    case 3: return 'a three-pointer'
                    break
                    default:'4th option'
                }
                
                default: 'xxx'
                }
            
        }

        let defAttribute = 0
        let defMultiplier = 0
    
        //Set Defender
        switch(off_shooter.positionName){
        case 'Point Guard': defender =  defense[0].PG
        break
        case 'Shooting Guard': defender = defense[1].SG
        break
        case 'Small Forward': defender = defense[2].SF
        break
        case 'Power Forward': defender = defense[3].PF
        break
        default: defender = defense[4].C
        }
    
        //Set defensive attribute
        switch(shot_selection){
            case 'pRat_closeShot': defAttribute = defender.pRat_intDef
            break
            case 'pRat_midShot': defAttribute = defender.pRat_perDef
            break
            default: defAttribute = defender.pRat_perDef
        }
    
        //Set defensive Multiplier
        if(defAttribute>=90){
            defMultiplier = (defAttribute/10)*5.5
        }else if(defAttribute>=80){
            defMultiplier = (defAttribute/10)*4.8
        }else if(defAttribute>=70){
            defMultiplier = (defAttribute/10)*3.5
        }else if(defAttribute>=60){
            defMultiplier = (defAttribute/10)*2
        }else{
            defMultiplier = (defAttribute/10)*1
        }
        
        //Take the shot
            
            let rand = Math.floor(Math.random()*(100-1)+1)
    
            if (off_shooter[shot_selection]>=(rand+defMultiplier)){
                 shotDescription = (`${off_shooter.name} ${madeShotPhrase()} ${shotTypePhrase(shot_selection)}`)
                 off_shooter.boxScore.FG++
                 off_shooter.boxScore.FGA++

                 if(shot_selection==='pRat_longShot'){
                    off_shooter.boxScore.TP++
                    off_shooter.boxScore.TPA++
                 }

                 return 'Make'
              
            }else{
                shotDescription = (`Missed shot by ${off_shooter.name}`)
                off_shooter.boxScore.FGA++

                if(shot_selection==='pRat_longShot'){
                    off_shooter.boxScore.TPA++
                 }
                return 'Miss'
            }
        
    
        
    }

    //Sets the percentage likelihood for each player to make the specified (attribute) play
    function setPriority(team,attribute){
        let distributionArray = []
        let x = [offense[0].PG[attribute],offense[1].SG[attribute],offense[2].SF[attribute],offense[3].PF[attribute],offense[4].C[attribute]]

        let y = x.map(item=>{
            if(item>=85){
                return item*6
            }else if(item>=80){
                return item*5
            }else if(item>=74){
                return item*4
            }else if(item>=67){
                return item*3
            }else if(item>=60){
                return item*2
            }else{
                return item
            }
        })

        let a = y.map(item=>(item/y.reduce((a,b)=>a+b)))

        let pgPriority = a[0]
        let sgPriority = a[1]
        let sfPriority = a[2]
        let pfPriority = a[3]
        let cPriority = a[4]

        let arr = [[pgPriority,team[0].PG],[sgPriority,team[1].SG],[sfPriority,team[2].SF],[pfPriority,team[3].PF],[cPriority,team[4].C]]

        distributionArray = arr.sort((a, b)=> b[0]-a[0])
        
        // //Display percentage breakdown
        distributionArray.forEach(item=>console.log(attribute,(item[1].name),'-',((item[0])*100).toFixed(1),'%'))
        console.log('')
    


        //Selects a player for the attribute based on the weighted distribution
    
        let rand = Math.random()
        if(rand<distributionArray[4][0]){
            return distributionArray[4][1]
        }

        rand-=distributionArray[4][0]

        if(rand<distributionArray[3][0]){
            return distributionArray[3][1]
        }

        rand-=distributionArray[3][0]

        if(rand<distributionArray[2][0]){
            return distributionArray[2][1]
        }

        rand-=distributionArray[2][0]

        if(rand<distributionArray[1][0]){
            return distributionArray[1][1]
        }else{
            return distributionArray[0][1]
        }
        
    }

    //Assigns the player to shoot, assist, defensive rebound, offensive rebound and steal on each possession
    assister = setPriority(offense,'pRat_passing') 
    shooter = setPriority(offense,'pRat_offOverall')
    defRebounder = setPriority(offense,'pRat_defRebound')
    offRebounder = setPriority(offense,'pRat_offRebound')
    stealer = setPriority(defense,'pRat_steal')
    

    //player selects a shot
    switch(Math.floor(Math.random()*(3)+1)){
        case 1: shotSelection =  'pRat_closeShot';pointValue = 2
        break
        case 2: shotSelection = 'pRat_midShot';pointValue = 2
        break
        default: shotSelection = 'pRat_longShot';pointValue = 3
    }

    //Take the shot or defense gets a steal
    if(Math.random()<=.09){
        
        //add turnover stat and acrue
        stealer.boxScore.steals++

        console.log(`Pos ${pos}: STEAL!!! The ball is stolen by ${stealer.name}.`)
        console.log('')
    }else{
        
        shotOutcome = shot(shooter,shotSelection)

        //shot outcome triggers
        if(shotOutcome === 'Make'){
            shooter.boxScore.points += pointValue
            offTeam.score+=pointValue
            
            

            //Teammate to assist
            if(Math.random()>.4){

                if(shooter.position===assister.position){
                    assistOutcome = ''
                }else{
                    assister.boxScore.assists += 1
                    assistOutcome = ` (Assisted by ${assister.name})`

                }

            }else{
                assistOutcome = ''
            }

            //Check for foul and shoot freethrow
            if(Math.random()<.3){
                shotDescription = `Foul called on ${defender.name}...${shooter.name} finishes the shot with a chance for the And-One!`
                freeThrows('andOne',shooter,shotSelection)

                offTeam.score+=pointValue
                defender.boxScore.fouls++

                if(defender.boxScore.fouls===6){
                    defender.inactive = 'y'
                    shotDescription+=` ${defender.name} has fouled out of the game.`
                    //run subs---------------------------------------------------------------------------------------------------------------
                }
            }

        }else{
            
            //defense selects a player to block
            switch(Math.floor(Math.random()*(5)+1)){
                case 1: defender =  defense[0].PG
                break
                case 2: defender = defense[1].SG
                break
                case 3: defender = defense[2].SF
                break
                case 4: defender = defense[3].PF
                break
                default: defender = defense[4].C
            }
    //defensive outcome------------------------------------------------------------
            if(Math.floor(Math.random()>.9)){
                console.log('blocked shot!!!!!!!!!!')
                // defensiveOutcome = 'blocked shot'; defender.boxScore.blocks+=1
                
            }else{
                if(Math.random()>.78){
                    // console.log('offensive rebound',offRebounder)
                    defensiveOutcome = ` ${offRebounder.name} gets the offensive rebound and the ${offTeam.teamName} reset the offense.`
                    offRebounder.boxScore.rebounds+=1                           
                    
                    //change possession
                    if(home.hasPossession ==='yes'){
                        homeTeam.hasPossession = 'no'
                        roadTeam.hasPossession = 'yes'
                    }else{
                        homeTeam.hasPossession = 'yes'
                        roadTeam.hasPossession = 'no'
                    }

                }else{
                    // console.log('defensive rebound',defRebounder)
                    defensiveOutcome = `Rebounded by ${defRebounder.name}.`
                    defRebounder.boxScore.rebounds+=1
                }
                

            }
            assistOutcome = ''

            

        }
        
        //Post the shot outcome
        console.log(`Pos ${posCount}: ${shotDescription}${assistOutcome}. ${defensiveOutcome}`)

        console.log('')
    }
    //change possession
    if(home.hasPossession ==='yes'){
        homeTeam.hasPossession = 'no'
        roadTeam.hasPossession = 'yes'
    }else{
        homeTeam.hasPossession = 'yes'
        roadTeam.hasPossession = 'no'
    }
    
}

//Set starting line-up
function setStarters(team){
 
    team.roster.sort((a, b)=> b.overall-a.overall)

    //Set players into starting positions
    for(let j = 0;j<homeTeam_inGame.length;j++){
        let inGamePos = Object.keys(homeTeam_inGame[j])[0]
        let start = function (j){
            for(let i=0;i<roster.length;i++){
                if (roster[i].position===inGamePos&&roster[i].inactive==='n'){
                    // console.log(roster[i].name)
                    homeTeam_inGame[j][inGamePos]=roster.splice(i,1)[0]
                    return homeTeam_inGame[j][inGamePos].benchStatus='court'
                }
            }
        }
        start(j)

    }

    //push remaining players to the bench and clear the roster
    homeTeam_onBench = roster.slice()
    roster =[]
}

//Make substitutions
function makeSubs(){
    //Reset roster
    roster = homeTeam_onBench.slice()//Bench moved back to the roster
    homeTeam_onBench = [] //Bench reset to empty



    //Move each player in-game back to the roster and reset each in-game position
    for(let i = 0;i<homeTeam_inGame.length;i++){
        let inGamePlayer= Object.values(homeTeam_inGame[i])[0]
        inGamePlayer.benchStatus = 'bench'
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
                    return homeTeam_inGame[j][inGamePos].benchStatus='court'
                }
            }
        }
        sub(j)
    }

    //push remaining players to the bench and clear the roster
    homeTeam_onBench = roster.slice()
    roster =[]
}

//Runs 100 possesions
function reload(){

    offTeam.map(item=>item.boxScore.points=0)
    offTeam.map(item=>item.boxScore.assists=0)
    offTeam.map(item=>item.boxScore.rebounds=0)
    offTeam.map(item=>item.boxScore.steals=0)
    offTeam.map(item=>item.boxScore.blocks=0)
    offTeam.map(item=>item.boxScore.FG=0)
    offTeam.map(item=>item.boxScore.FGA=0)

    defTeam.map(item=>item.boxScore.points=0)
    defTeam.map(item=>item.boxScore.assists=0)
    defTeam.map(item=>item.boxScore.rebounds=0)
    defTeam.map(item=>item.boxScore.steals=0)
    defTeam.map(item=>item.boxScore.blocks=0)
    defTeam.map(item=>item.boxScore.FG=0)
    defTeam.map(item=>item.boxScore.FGA=0)

    pos=0
    
    simPos(100)
}

//Shoots freethrows
function freeThrows(foulType,shooter,shotSelection,offTeam){
    let ftCount =0

    //Sets the freethrow count 
    if(shotSelection === 'pRat_closeShot'||shotSelection === 'pRat_midShot'){
        ftCount = 2
        console.log(ftCount)
    }else{
        ftCount = 3
        console.log(ftCount)
    }

    function shoot(shooter,count){
        let i=1
        while(i<=count){
            let x = Math.floor((Math.random()*100))
            if(x<shooter.pRat_freeThrow){
                console.log(`${shooter.name} makes the freethrow.`,x)
                
                shooter.boxScore.points += 1
                shooter.boxScore.FT+=1
                shooter.boxScore.FTA+=1
            }else{
                console.log(`${shooter.name} misses the freethrow.`,x)
                shooter.boxScore.FTA+=1
            }
            i++
        }
    }

    switch(foulType){
        case 'andOne': shoot(shooter,1)
        break
        case 'technicalFoul': shoot(shooter,1)
        break
        case 'shootingFoul':shoot(shooter,ftCount)
        break

        default: console.log('hi')
    }
}


