//Export functions
import{firstNamePool_Black,firstNamePool_Gen,lastNamePool_Black,lastNamePool_White,collegeNamePool,createdPlayerPool, leagueTeamList} from "./app_game_data.js"
export{freeThrows,createNewPlayer}

let playerIdNumber=10001

//Simulate a possession
function simPos(home,road,posCount){

    console.log(homeTeam.roster[0].pg);
    console.log(awayTeam.roster[0].pg);

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
                 off_shooter.boxscore.FG++
                 off_shooter.boxscore.FGA++

                 if(shot_selection==='pRat_longShot'){
                    off_shooter.boxscore.TP++
                    off_shooter.boxscore.TPA++
                 }

                 return 'Make'
              
            }else{
                shotDescription = (`Missed shot by ${off_shooter.name}`)
                off_shooter.boxscore.FGA++

                if(shot_selection==='pRat_longShot'){
                    off_shooter.boxscore.TPA++
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
        stealer.boxscore.steals++

        console.log(`Pos ${pos}: STEAL!!! The ball is stolen by ${stealer.name}.`)
        console.log('')
    }else{
        
        shotOutcome = shot(shooter,shotSelection)

        //shot outcome triggers
        if(shotOutcome === 'Make'){
            shooter.boxscore.points += pointValue
            offTeam.score+=pointValue
            
            

            //Teammate to assist
            if(Math.random()>.4){

                if(shooter.position===assister.position){
                    assistOutcome = ''
                }else{
                    assister.boxscore.assists += 1
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
                defender.boxscore.fouls++

                if(defender.boxscore.fouls===6){
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
                // defensiveOutcome = 'blocked shot'; defender.boxscore.blocks+=1
                
            }else{
                if(Math.random()>.78){
                    // console.log('offensive rebound',offRebounder)
                    defensiveOutcome = ` ${offRebounder.name} gets the offensive rebound and the ${offTeam.teamName} reset the offense.`
                    offRebounder.boxscore.rebounds+=1                           
                    
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
                    defRebounder.boxscore.rebounds+=1
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

    offTeam.map(item=>item.boxscore.points=0)
    offTeam.map(item=>item.boxscore.assists=0)
    offTeam.map(item=>item.boxscore.rebounds=0)
    offTeam.map(item=>item.boxscore.steals=0)
    offTeam.map(item=>item.boxscore.blocks=0)
    offTeam.map(item=>item.boxscore.FG=0)
    offTeam.map(item=>item.boxscore.FGA=0)

    defTeam.map(item=>item.boxscore.points=0)
    defTeam.map(item=>item.boxscore.assists=0)
    defTeam.map(item=>item.boxscore.rebounds=0)
    defTeam.map(item=>item.boxscore.steals=0)
    defTeam.map(item=>item.boxscore.blocks=0)
    defTeam.map(item=>item.boxscore.FG=0)
    defTeam.map(item=>item.boxscore.FGA=0)

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
                console.log(`${shooter.lastName} makes the freethrow.`,x)
                
                shooter.boxscore.points += 1
                shooter.boxscore.FT+=1
                shooter.boxscore.FTA+=1
            }else{
                console.log(`${shooter.lastName} misses the freethrow.`,x)
                shooter.boxscore.FTA+=1
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

//Function that creates new players based on number of years of experience
function createNewPlayer(race){
    console.log(race)
    function calcOverall(x){
        return Math.round((x.speed+x.closeShot+x.midshot)/3)
    }
    
    function generateCollege(){
        return collegeNamePool[Math.floor(Math.random()*(collegeNamePool.length-1)+0)]
    }
    function generatePosition(){
        switch(Math.floor(Math.random()*(5)+1)){
        case 1: return 'Point Guard'
        break;
        case 2: return 'Shooting Guard'
        break;
        case 3: return 'Small Forward'
        break;
        case 4: return 'Power Forward'
        break;
        default: return 'Center'
        }
        
    }
    // function generateRace(){
    // if(Math.floor(Math.random()*(100-1)+0)<30){
    //     return 'White'
    //     }else{
    //         return 'Black'
    //     }
    // }
    function generateFirstName(race){
        if(race==='white'){
            return firstNamePool_Gen[Math.floor(Math.random()*(firstNamePool_Gen.length-1)+0)]
        }else{
            return firstNamePool_Black.concat(firstNamePool_Gen)[Math.floor(Math.random()*((firstNamePool_Black.length+firstNamePool_Gen.length)-1)+0)]

        }
    }
    function generateLastName(race){
        if(race==='white'){
            return lastNamePool_White[Math.floor(Math.random()*(lastNamePool_White.length-1)+0)]
        }else{
            return lastNamePool_Black[Math.floor(Math.random()*(lastNamePool_Black.length-1)+0)]
        }
    }
    function generateInches(position){
        
        switch(position){
            case 'Point Guard':return Math.floor(Math.random()*(77-71)+71)
            break;
            case 'Shooting Guard':return Math.floor(Math.random()*(80-75)+75)
            break;
            case 'Small Forward':return Math.floor(Math.random()*(81-77)+77)
            break;
            case 'Power Forward':return Math.floor(Math.random()*(83-79)+79)
            break;
            case 'Center':return Math.floor(Math.random()*(89-81)+81)
            break;
        }
        
    }
    function generateExp(){
            return Math.floor(Math.random()*(15-1)+1)
    }
    // function generateExp(expLevel){
    //     if(expLevel===0){
    //         return 0
    //     }else{
    //         return Math.floor(Math.random()*(15-1)+1)
    //     }
    // }
    function generateAge(exp){
        if(exp===0){
            return Math.floor(Math.random()*(23-19)+19)
        }else{
            return (Math.floor(Math.random()*(23-19)+19))+exp
        }
    }

    function generateBack(x){
        console.log(x)
        if(x===6){
            let backRand = Math.floor(Math.random()*(3)+1)
            console.log('front was a 6')
            switch(backRand){
            case 1: return 'images/player_avatars/back_1.png'
            break;
            case 2: return 'images/player_avatars/back_2.png'
            break;
            default: return 'images/player_avatars/back_3.png'
            }
        }else{
            return 'images/player_avatars/back_1.png'
        }
    }

    let Player = class {
        constructor(race){
            this.pID=playerIdNumber++
            this.race = race
            // this.race=generateRace()
            this.position=generatePosition();
            this.firstName=generateFirstName(this.race);
            this.lastName=generateLastName(this.race);
            this.inches = generateInches(this.position);
            this.height= (Math.floor(this.inches/12)).toString()+"'"+(this.inches%12).toString()+'"';
            this.yearsOfExp = generateExp();
            this.age= generateAge(this.yearsOfExp);
            this.jerseyNumber= Math.floor(Math.random()*(56)).toString();
            this.college= generateCollege();
            this.potential = Math.floor(Math.random()*(11)+1).toString();
            this.peakAge = Math.floor(Math.random()*(34-29)+29);
            this.retirementAge= this.peakAge +Math.floor(Math.random()*(8-3)+3);
            this.team = leagueTeamList[0];
            this.avFrontNum = Math.floor(Math.random()*(6)+1);
            this.avFront = `images/player_avatars/front_${this.avFrontNum}.png`;
            this.avBack = generateBack(this.avFrontNum);
            this.avBeard = `images/player_avatars/beard_${Math.floor(Math.random()*(12)+1)}.png`;
            this.avEyebrows = `images/player_avatars/eyebrows_${Math.floor(Math.random()*(3)+1)}.png`;




            // createdPlayerPool.push(this)
            // freeAgency.roster.push(this)

            this.speed = 95
            this.closeShot = 89
            this.midshot = 83
            this.overall = calcOverall(this)
        }
    } 

    Player.prototype.describe= function(){
        console.log("")
        console.log('Player ID - ',this.pID)
        console.log('------------------')
        console.log('Name:',this.firstName,this.lastName)
        console.log('Race:',this.race)
        console.log('Age: ',this.age)
        console.log('Height: ',this.height)
        console.log('College: ',this.college)
        console.log('Position: ',this.position)
        console.log('Jersey Number: ',this.jerseyNumber)
        console.log('Experience: ',(this.yearsOfExp===0)?'Rookie':this.yearsOfExp)
        console.log('Potential: ',this.potential)
        console.log('Peak at Age: ',this.peakAge)
        console.log('Retirement at Age: ',this.retirementAge)
        console.log('Team: ',this.team.teamName)
    }
    Player.prototype.signToTeam= function(team){
        team.roster.push(this)
        this.team = team
    }
    Player.prototype.cutFromTeam= function(){
        createdPlayerPool.push(this)
        oldTeam.roster.splice()
    }

    Player.prototype.trade= function(oldTeam,newTeam){
        oldTeam.roster.splice(oldTeam.roster.indexOf(this),1)
        newTeam.roster.push(this)
        this.team = newTeam
    }
    
    Player.prototype.developPlayer= function(attribute,val){
        this[attribute] += val
        this.overall = calcOverall(this)
    }

    // for(let i=0;i<count;i++){
    let x = new Player(race)
    // }

    return x

}

