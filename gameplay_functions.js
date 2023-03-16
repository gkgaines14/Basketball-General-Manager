//Export functions
import{firstNamePool_Black,firstNamePool_Gen,lastNamePool_Black,lastNamePool_White,collegeNamePool,createdPlayerPool, leagueTeamList} from "./app_game_data.js"
export{freeThrows,createNewPlayer,postPlayerCardData}

let playerIdNumber=10001

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
                case 'pRat_threeShot': switch(Math.floor(Math.random()*(3)+1)){
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

                 if(shot_selection==='pRat_threeShot'){
                    off_shooter.boxscore.TP++
                    off_shooter.boxscore.TPA++
                 }

                 return 'Make'
              
            }else{
                shotDescription = (`Missed shot by ${off_shooter.name}`)
                off_shooter.boxscore.FGA++

                if(shot_selection==='pRat_threeShot'){
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
        default: shotSelection = 'pRat_threeShot';pointValue = 3
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
 
    team.roster.sort((a, b)=> b.pRat_Overall-a.pRat_Overall)

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


    roster.sort((a, b)=> (b.pRat_overall*b.fatigue)-(a.pRat_overall*a.fatigue))  //Sorts players by overall effectiveness considering fatigue
    
   
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
    //Skin tone and hair color shaders
    const whiteSkinOne = 'invert(67%) sepia(21%) saturate(750%) hue-rotate(353deg) brightness(103%) contrast(92%)';
    const blackSkinOne = 'invert(60%) sepia(23%) saturate(827%) hue-rotate(356deg) brightness(94%) contrast(91%)';
    const blackSkinTwo = 'invert(31%) sepia(11%) saturate(2569%) hue-rotate(341deg) brightness(97%) contrast(80%)';
    const blackSkinThree = 'invert(13%) sepia(12%) saturate(4757%) hue-rotate(351deg) brightness(100%) contrast(96%)';
    const blackSkinFour = 'invert(9%) sepia(51%) saturate(533%) hue-rotate(354deg) brightness(93%) contrast(92%)';
    
    const whiteHairOne = 'invert(57%) sepia(41%) saturate(546%) hue-rotate(16deg) brightness(98%) contrast(89%)';
    const whiteHairTwo = 'invert(23%) sepia(43%) saturate(845%) hue-rotate(2deg) brightness(98%) contrast(97%)';
    const whiteHairThree = 'invert(30%) sepia(79%) saturate(1273%) hue-rotate(359deg) brightness(90%) contrast(111%)';

    // function calcOverall(player){
    //     return Math.round((player.pRat_speed+player.pRat_closeShot+player.pRat_midShot)/3)
    // }
    
    function generateCollege(){
        return collegeNamePool[Math.floor(Math.random()*(collegeNamePool.length-1)+0)]
    }

    function generatePositionName(){
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

    function generatePosition(pos){
        switch(pos){
        case 'Point Guard': return 'PG'
        break;
        case 'Shooting Guard': return 'SG'
        break;
        case 'Small Forward': return 'SF'
        break;
        case 'Power Forward': return 'PF'
        break;
        default: return 'C'
        }
        
    }

    // function generateRace(){
    //     return (Math.floor(Math.random()*(100-1)+0)<30)?'white':'black' ;
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

    // function generateExp(exp){
    //     if(exp==='rookie'){
    //         return 0
    //     }
    //         let x = Math.floor(Math.random()*(15-1)+1)
    //         return x
    //         // return Math.floor(Math.random()*(15-1)+1)
    // }

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
        if(x===6){
            let backRand = Math.floor(Math.random()*(3)+1)
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

    function generateComplexion(race){
        if(race === 'white'){
            return 1;
        }else{
            return Math.floor(Math.random()*(5-2+1)+2)
        }
    }

    function generateSkinTone(complexion){

        switch(complexion){
                case 1: return whiteSkinOne;
                break;
                case 2: return blackSkinOne;
                break;
                case 3: return blackSkinTwo;
                break;
                case 4: return blackSkinThree;
                break;
                default: return blackSkinFour;
            }
    }

    function generateOutline(complexion){
        switch(complexion){
                case 1: return 'invert(54%) sepia(68%) saturate(260%) hue-rotate(353deg) brightness(92%) contrast(91%)';
                break;
                case 2: return 'invert(44%) sepia(24%) saturate(827%) hue-rotate(355deg) brightness(96%) contrast(88%)';
                break;
                case 3: return 'invert(26%) sepia(15%) saturate(1691%) hue-rotate(341deg) brightness(94%) contrast(91%)';
                break;
                case 4: return 'invert(11%) sepia(6%) saturate(6547%) hue-rotate(348deg) brightness(95%) contrast(98%)';
                break;
                default: return 'invert(7%) sepia(15%) saturate(1212%) hue-rotate(352deg) brightness(94%) contrast(99%)';
            }
    }
    
    function generateHairColor(complexion){
        if(complexion === 1){
            var hairRand = Math.floor(Math.random()*(4)+1)
            switch(hairRand){
                case 1: return whiteHairOne;
                break;
                case 2: return whiteHairTwo;
                break;
                case 3: return whiteHairThree;
                break;
                default: return '';
            }
        }else{
            return '';
        }
    }

    function generateArchetype(position){
        let rand = Math.random();
        let split = .11
        console.log(rand)
        switch(position){
            case 'PG': 
                if(rand<split){
                    return 'Defensive Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Floor General'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Drive and Kick'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    console.log(rand)
                    return 'Shoot First'
                }else{
                    console.log(rand)
                    return 'Balanced'
                };
            break;
            case 'SG': 
                if(rand<split){
                    return 'Defensive Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Long Range Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'ISO Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    console.log(rand)
                    return 'Mid Range Specialist'
                }else{
                    console.log(rand)
                    return 'Balanced'
                };
            break;
            case 'SF': 
                if(rand<split){
                    return 'Defensive Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Long Range Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'ISO Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    console.log(rand)
                    return 'Point Forward'
                }else{
                    console.log(rand)
                    return 'Balanced'
                };
            break;
            case 'PF': 
                if(rand<split){
                    return 'Rebound Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Rim Protector'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Stretch Four'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    console.log(rand)
                    return 'Enforcer'
                }else{
                    console.log(rand)
                    return 'Balanced'
                };
            break;
            default: 
                case 'C': 
                if(rand<split){
                    return 'Rebound Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Rim Protector'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    return 'Low Post Specialist'
                }
                rand-=split
                console.log(rand)

                if(rand<split){
                    console.log(rand)
                    return 'Euro Ball'
                }else{
                    console.log(rand)
                    return 'Balanced'
                };
        }
        
        let archetype
        return position
    }

    function generateArchetypeRange(archetype){
        console.log(archetype);
        switch(archetype){
            case 'PGBalanced':return [65,85,65,85,65,85,65,85,65,85,50,90,65,85,65,85,50,90,65,85,60,65,60,80,60,80,60,65,60,85,60,85,55,75,55,75,65,85,65,85,65,85,65,85,65,85];
            break;
            case 'PGFloor General':return [60,85,60,85,60,90,60,95,50,90,50,90,70,95,70,90,70,90,80,95,50,70,65,90,65,90,50,70,65,90,70,90,50,80,50,80,65,95,50,80,50,95,50,90,50,90];
            break;
            case 'PGDrive and Kick':return [70,85,50,90,50,90,60,95,60,90,50,90,70,95,75,90,50,90,65,90,50,70,50,90,50,90,50,70,50,90,50,90,50,80,50,80,75,95,50,80,65,95,70,95,60,90];
            break;
            case 'PGShoot First':return [70,95,65,95,65,95,60,95,60,95,50,90,55,80,70,90,50,90,65,90,50,70,50,90,50,90,50,70,50,90,50,90,50,80,50,80,65,95,50,80,50,95,50,90,50,90];
            break;
            case 'PGDefensive Specialist':return [50,80,50,80,50,90,60,90,60,90,50,90,55,85,65,90,50,90,65,90,60,80,75,95,70,95,65,80,70,95,75,95,50,80,50,80,70,95,50,80,50,95,50,90,50,90];
            break;
            default:return [65,85,65,85,65,85,65,85,65,85,50,90,65,85,65,85,50,90,65,85,60,65,60,80,60,80,60,65,60,85,60,85,55,75,55,75,65,85,65,85,65,85,65,85,65,85];
        }
    }

    function generateRatings(player){
        //Variables for the player attribute assignment 
        let attList = ['pRat_closeShot', 'pRat_midShot', 'pRat_threeShot', 'pRat_freeThrow', 'pRat_dunking', 'pRat_andOne', 'pRat_passing', 'pRat_ballHandle', 'pRat_clutchness', 'pRat_offIQ', 'pRat_intDef', 'pRat_perDef', 'pRat_steal', 'pRat_block', 'pRat_helpDef', 'pRat_defIQ', 'pRat_offRebound', 'pRat_defRebound', 'pRat_speed', 'pRat_strength', 'pRat_jumping', 'pRat_stamina', 'pRat_durability'];
        let attPos = 0;

        console.log(player.archetypeRatingRange);
        console.log(attList);
        console.log(attPos);
        attList.forEach((item)=>{
        //     // player[item]=randRange[attPos]
            player[item]=Math.floor(Math.random()*((player.archetypeRatingRange[attPos+1])-(player.archetypeRatingRange[attPos]))+player.archetypeRatingRange[attPos]);
            // player[item]=player.archetypeRatingRange[attPos]
            console.log(player.archetypeRatingRange[attPos]);
            console.log(player.archetypeRatingRange[attPos+1]);
            console.log(item,player[item]);    
            console.log(attPos);
            attPos+=2;
            console.log(attPos);
        });
    }

    let Player = class {
        // constructor(race,exp){
        constructor(input){
            this.pID=playerIdNumber++;
            this.race = input.race;
            // this.race=generateRace()
            this.positionName=generatePositionName();
            this.position=generatePosition(this.positionName);
            this.firstName=generateFirstName(this.race);
            this.lastName=generateLastName(this.race);
            this.inches = generateInches(this.positionName);
            this.height= (Math.floor(this.inches/12)).toString()+"'"+(this.inches%12).toString()+'"';
            // this.yearsOfExp = exp;
            this.yearsOfExp = input.exp;
            this.age= generateAge(this.yearsOfExp);
            this.jerseyNumber= Math.floor(Math.random()*(56)).toString();
            this.college= generateCollege();
            this.potential = Math.floor(Math.random()*(5)+1);
            this.peakAge = Math.floor(Math.random()*(34-29)+29);
            this.retirementAge= this.peakAge +Math.floor(Math.random()*(7-3+1)+3);
            // this.team = leagueTeamList[0];
            this.avFrontNum = Math.floor(Math.random()*(8)+1);
            this.avFront = `images/player_avatars/front_${this.avFrontNum}.png`;
            this.avBack = generateBack(this.avFrontNum);
            this.avBeard = `images/player_avatars/beard_${Math.floor(Math.random()*(14)+1)}.png`;
            this.avEyebrows = `images/player_avatars/eyebrows_${Math.floor(Math.random()*(3)+1)}.png`;
            this.avComplexion = generateComplexion(this.race);
            this.avSkinTone = generateSkinTone(this.avComplexion);
            this.avOutline = generateOutline(this.avComplexion);
            this.avHairColor = generateHairColor(this.avComplexion);
            this.archetype = generateArchetype(this.position);
            this.archetypeRatingRange = generateArchetypeRange(this.position+this.archetype);
            this.pRat_personality = Math.floor(Math.random()*(99-60)+60);
            this.playerDetails = function (){
                console.log('');
                console.log('Player ID - ',this.pID);
                console.log('------------------');
                console.log('Name:',this.firstName,this.lastName);
                console.log('Race:',this.race);
                console.log('Age: ',this.age);
                console.log('Height: ',this.height);
                console.log('College: ',this.college);
                console.log('Position: ',this.position);
                console.log('Position Archetype: ',this.archetype);
                console.log('Jersey Number: ',this.jerseyNumber);
                console.log('Experience: ',(this.yearsOfExp===0)?'Rookie':this.yearsOfExp);
                console.log('Potential: ',this.potential);
                console.log('Peak at Age: ',this.peakAge);
                console.log('Retirement at Age: ',this.retirementAge);
            }

            // createdPlayerPool.push(this)
            // freeAgency.roster.push(this)


            this.boxscore = {points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99};
            this.benchStatus='bench';
            this.inactive='n';

            // Generate ratings based on archetype
            generateRatings(this);
            
            // this.overall = calcOverall(this);
            this.pRat_offOverall = Math.floor((this.pRat_closeShot+this.pRat_midShot+this.pRat_threeShot+this.pRat_freeThrow+this.pRat_dunking+this.pRat_andOne+this.pRat_passing+this.pRat_ballHandle+this.pRat_clutchness+this.pRat_offIQ)/10);
            this.pRat_defOverall = Math.floor((this.pRat_intDef+this.pRat_perDef+this.pRat_steal+this.pRat_block+this.pRat_helpDef+this.pRat_defIQ)/6);
            this.pRat_overall=Math.floor((this.pRat_offOverall+this.pRat_defOverall+this.pRat_offRebound+this.pRat_defRebound+this.pRat_speed+this.pRat_strength+this.pRat_jumping+this.pRat_stamina+this.pRat_durability)/9);

            // Player Badges
            this.badgeOne = 'images/medals/gold_lockdown.png';
            this.badgeTwo = 'images/medals/gold_shooter4.png';
            this.badgeThree = 'images/medals/gold_stamina.png';
            this.badgeFour = 'images/medals/gold_iron_man.png';
        }
    } 

    // Player.prototype.postData = function(){
    //         const name = document.querySelector('#name');
    //         const position = document.querySelector('#position');
    //         const acrhetype = document.querySelector('#archetype');

    
    //         const back= document.querySelector('#back');
    //         const head = document.querySelector('#head');
    //         const outline = document.querySelector('#outline');
    //         const eyebrows = document.querySelector('#eyebrows');
    //         const front = document.querySelector('#front'); 
    //         const beard = document.querySelector('#beard'); 
    
    //         const college = document.querySelector('#college');
    //         const height = document.querySelector('#height');
    //         const jerseyNum = document.querySelector('#jersey-num');
    //         const potential = document.querySelector('#potential');
    //         const age = document.querySelector('#age');
    //         const exp = document.querySelector('#exp');
    //         const peakAge = document.querySelector('#peak-age');
    //         const retireAge = document.querySelector('#retire-age');

    //         const badgeOne = document.querySelector('#badge-one');
    //         const badgeOneContainer = document.querySelector('#badge-one-container');
    //         const badgeTwo = document.querySelector('#badge-two');
    //         const badgeTwoContainer = document.querySelector('#badge-two-container');
    //         const badgeThree = document.querySelector('#badge-three');
    //         const badgeThreeContainer = document.querySelector('#badge-three-container');
    //         const badgeFour = document.querySelector('#badge-four');
    //         const badgeFourContainer = document.querySelector('#badge-four-container');


    //         // Player attribute elements
    //         const ovrRating = document.querySelector('#att-ovr-rating');
    //         const closeShot = document.querySelector('#att-close-shot');
    //         const midShot = document.querySelector('#att-mid-range');
    //         const threeShot = document.querySelector('#att-three-shot');
    //         const freeThrow = document.querySelector('#att-free-throw');
    //         const dunking = document.querySelector('#att-dunking');
    //         const andOne = document.querySelector('#att-and-one');
    //         const passing = document.querySelector('#att-passing');
    //         const ballHandle = document.querySelector('#att-ball-handle');
    //         const clutchness = document.querySelector('#att-clutchness');
    //         const offIq = document.querySelector('#att-off-iq');
    //         const intDef = document.querySelector('#att-int-def');
    //         const perDef = document.querySelector('#att-per-def');
    //         const steal = document.querySelector('#att-steal');
    //         const block = document.querySelector('#att-block');
    //         const helpDef = document.querySelector('#att-help-def');
    //         const defIq = document.querySelector('#att-def-iq');
    //         const offReb = document.querySelector('#att-off-reb');
    //         const defReb = document.querySelector('#att-def-reb');
    //         const speed = document.querySelector('#att-speed');
    //         const strength = document.querySelector('#att-strength');
    //         const jumping = document.querySelector('#att-jumping');
    //         const stamina = document.querySelector('#att-stamina');
    //         const durability = document.querySelector('#att-durability');
    //         const personality = document.querySelector('#att-personality');
    
    //         //Post Header
    //         name.innerText = `${this.firstName} ${this.lastName}`;
    //         position.innerText = this.position;
    //         archetype.innerText = this.archetype;
    
    //         // Post Avatar
    //         back.src = this.avBack;
    //         back.style.filter = this.avHairColor;
    //         // head.src = player.head
    //         head.style.filter = this.avSkinTone;
    //         outline.style.filter = this.avOutline;
    //         eyebrows.src = this.avEyebrows;
    //         eyebrows.style.filter = this.avHairColor;
    //         front.src = this.avFront;
    //         front.style.filter = this.avHairColor;
    //         beard.src = this.avBeard;
    //         beard.style.filter = this.avHairColor;
    //         // headband.src = 'images/player_avatars/headband.png'
    
    //         // Post Demographics
    //         college.innerText = this.college;
    //         height.innerText = this.height;
    //         jerseyNum.innerText = this.jerseyNumber;
    //         potential.innerText = this.potential;
    //         age.innerText = this.age;
    //         exp.innerText = (this.yearsOfExp===0)?'Rookie':this.yearsOfExp;
    //         peakAge.innerText = this.peakAge;
    //         retireAge.innerText = this.retirementAge;
            
    //         // Post Attributes
    //         ovrRating.innerText = this.pRat_Overall;
    //         closeShot.innerText = this.pRat_closeShot;
    //         midShot.innerText = this.pRat_midShot;
    //         threeShot.innerText = this.pRat_threeShot;
    //         freeThrow.innerText = this.pRat_freeThrow;
    //         dunking.innerText = this.pRat_dunking;
    //         andOne.innerText = this.pRat_andOne;
    //         passing.innerText = this.pRat_passing;
    //         ballHandle.innerText = this.pRat_ballHandle;
    //         clutchness.innerText = this.pRat_clutchness;
    //         offIq.innerText = this.pRat_offIQ;
    //         intDef.innerText = this.pRat_intDef;
    //         perDef.innerText = this.pRat_perDef;
    //         steal.innerText = this.pRat_steal;
    //         block.innerText = this.pRat_block;
    //         helpDef.innerText = this.pRat_helpDef;
    //         defIq.innerText = this.pRat_defIQ;
    //         offReb.innerText = this.pRat_offRebound;
    //         defReb.innerText = this.pRat_defRebound;
    //         speed.innerText = this.pRat_speed;
    //         strength.innerText = this.pRat_strength;
    //         jumping.innerText = this.pRat_jumping;
    //         stamina.innerText = this.pRat_stamina;
    //         durability.innerText = this.pRat_durability;
    //         personality.innerText = this.pRat_personality;

    //         // Post Badges
    //         badgeOne.src = this.badgeOne;
    //         badgeOneContainer.style.display = 'block';
    //         badgeTwo.src = this.badgeTwo;
    //         badgeTwoContainer.style.display = 'block';
    //         badgeThree.src = this.badgeThree;
    //         badgeThreeContainer.style.display = 'block';
    //         badgeFour.src = this.badgeFour;
    //         badgeFourContainer.style.display = 'block';
    // }

    Player.prototype.describe= function(){
        console.log("");
        console.log('Player ID - ',this.pID);
        console.log('------------------');
        console.log('Name:',this.firstName,this.lastName);
        console.log('Race:',this.race);
        console.log('Age: ',this.age);
        console.log('Height: ',this.height);
        console.log('College: ',this.college);
        console.log('Position: ',this.position);
        console.log('Position Archetype: ',this.archetype);
        console.log('Jersey Number: ',this.jerseyNumber);
        console.log('Experience: ',(this.yearsOfExp===0)?'Rookie':this.yearsOfExp);
        console.log('Potential: ',this.potential);
        console.log('Peak at Age: ',this.peakAge);
        console.log('Retirement at Age: ',this.retirementAge);
        // console.log('Team: ',this.team.teamName);
    }

    Player.prototype.signToTeam= function(team){
        team.roster.push(this);
        this.team = team;
    }

    Player.prototype.cutFromTeam= function(){
        createdPlayerPool.push(this);
        oldTeam.roster.splice();
    }

    Player.prototype.trade= function(oldTeam,newTeam){
        oldTeam.roster.splice(oldTeam.roster.indexOf(this),1);
        newTeam.roster.push(this);
        this.team = newTeam;
    }
    
    Player.prototype.developPlayer= function(attribute,val){
        this[attribute] += val;
        this.pRat_overall = calcOverall(this);
    }

    let x = new Player(race);
    // console.log(x.boxscore)
    // console.log(x.describe())
    return x;

}

// 
function postPlayerCardData(player){
    const name = document.querySelector('#name');
    const position = document.querySelector('#position');
    const acrhetype = document.querySelector('#archetype');

    const back= document.querySelector('#back');
    const head = document.querySelector('#head');
    const outline = document.querySelector('#outline');
    const eyebrows = document.querySelector('#eyebrows');
    const front = document.querySelector('#front'); 
    const beard = document.querySelector('#beard'); 

    const college = document.querySelector('#college');
    const height = document.querySelector('#height');
    const jerseyNum = document.querySelector('#jersey-num');
    const potential = document.querySelector('#potential');
    const age = document.querySelector('#age');
    const exp = document.querySelector('#exp');
    const peakAge = document.querySelector('#peak-age');
    const retireAge = document.querySelector('#retire-age');

    const badgeOne = document.querySelector('#badge-one');
    const badgeOneContainer = document.querySelector('#badge-one-container');
    const badgeTwo = document.querySelector('#badge-two');
    const badgeTwoContainer = document.querySelector('#badge-two-container');
    const badgeThree = document.querySelector('#badge-three');
    const badgeThreeContainer = document.querySelector('#badge-three-container');
    const badgeFour = document.querySelector('#badge-four');
    const badgeFourContainer = document.querySelector('#badge-four-container');


    // Player attribute elements
    const ovrRating = document.querySelector('#att-ovr-rating');
    const closeShot = document.querySelector('#att-close-shot');
    const midShot = document.querySelector('#att-mid-range');
    const threeShot = document.querySelector('#att-three-shot');
    const freeThrow = document.querySelector('#att-free-throw');
    const dunking = document.querySelector('#att-dunking');
    const andOne = document.querySelector('#att-and-one');
    const passing = document.querySelector('#att-passing');
    const ballHandle = document.querySelector('#att-ball-handle');
    const clutchness = document.querySelector('#att-clutchness');
    const offIq = document.querySelector('#att-off-iq');
    const intDef = document.querySelector('#att-int-def');
    const perDef = document.querySelector('#att-per-def');
    const steal = document.querySelector('#att-steal');
    const block = document.querySelector('#att-block');
    const helpDef = document.querySelector('#att-help-def');
    const defIq = document.querySelector('#att-def-iq');
    const offReb = document.querySelector('#att-off-reb');
    const defReb = document.querySelector('#att-def-reb');
    const speed = document.querySelector('#att-speed');
    const strength = document.querySelector('#att-strength');
    const jumping = document.querySelector('#att-jumping');
    const stamina = document.querySelector('#att-stamina');
    const durability = document.querySelector('#att-durability');
    const personality = document.querySelector('#att-personality');

    //Post Header
    name.innerText = `${player.firstName} ${player.lastName}`;
    position.innerText = player.position;
    archetype.innerText = player.archetype;

    // Post Avatar
    back.src = player.avBack;
    back.style.filter = player.avHairColor;
    // head.src = player.head
    head.style.filter = player.avSkinTone;
    outline.style.filter = player.avOutline;
    eyebrows.src = player.avEyebrows;
    eyebrows.style.filter = player.avHairColor;
    front.src = player.avFront;
    front.style.filter = player.avHairColor;
    beard.src = player.avBeard;
    beard.style.filter = player.avHairColor;
    // headband.src = 'images/player_avatars/headband.png'

    // Post Demographics
    college.innerText = player.college;
    height.innerText = player.height;
    jerseyNum.innerText = player.jerseyNumber;
    potential.innerText = player.potential;
    age.innerText = player.age;
    exp.innerText = (player.yearsOfExp===0)?'Rookie':player.yearsOfExp;
    peakAge.innerText = player.peakAge;
    retireAge.innerText = player.retirementAge;
    
    // Post Attributes
    ovrRating.innerText = player.pRat_overall;
    closeShot.innerText = player.pRat_closeShot;
    midShot.innerText = player.pRat_midShot;
    threeShot.innerText = player.pRat_threeShot;
    freeThrow.innerText = player.pRat_freeThrow;
    dunking.innerText = player.pRat_dunking;
    andOne.innerText = player.pRat_andOne;
    passing.innerText = player.pRat_passing;
    ballHandle.innerText = player.pRat_ballHandle;
    clutchness.innerText = player.pRat_clutchness;
    offIq.innerText = player.pRat_offIQ;
    intDef.innerText = player.pRat_intDef;
    perDef.innerText = player.pRat_perDef;
    steal.innerText = player.pRat_steal;
    block.innerText = player.pRat_block;
    helpDef.innerText = player.pRat_helpDef;
    defIq.innerText = player.pRat_defIQ;
    offReb.innerText = player.pRat_offRebound;
    defReb.innerText = player.pRat_defRebound;
    speed.innerText = player.pRat_speed;
    strength.innerText = player.pRat_strength;
    jumping.innerText = player.pRat_jumping;
    stamina.innerText = player.pRat_stamina;
    durability.innerText = player.pRat_durability;
    personality.innerText = player.pRat_personality;

    // Post Badges
    badgeOne.src = player.badgeOne;
    badgeOneContainer.style.display = 'block';
    badgeTwo.src = player.badgeTwo;
    badgeTwoContainer.style.display = 'block';
    badgeThree.src = player.badgeThree;
    badgeThreeContainer.style.display = 'block';
    badgeFour.src = player.badgeFour;
    badgeFourContainer.style.display = 'block';
}

export function calcOverallRatings(player){
    console.log('Ratings')
    player.pRat_overall=Math.round(
        (
            (player.pRat_offOverall*3)+
            (player.pRat_defOverall*3)+
            (player.pRat_offRebound*2)+
            (player.pRat_defRebound*2)+
            player.pRat_speed+
            player.pRat_strength+
            player.pRat_jumping+
            player.pRat_stamina+
            player.pRat_durability
        )
        /15);
    player.pRat_offOverall = Math.round((player.pRat_closeShot+player.pRat_midShot+player.pRat_threeShot+player.pRat_freeThrow+player.pRat_dunking+player.pRat_andOne+player.pRat_passing+player.pRat_ballHandle+player.pRat_clutchness+player.pRat_offIQ)/10);
    player.pRat_defOverall = Math.round((player.pRat_intDef+player.pRat_perDef+player.pRat_steal+player.pRat_block+player.pRat_helpDef+player.pRat_defIQ)/6);

}
