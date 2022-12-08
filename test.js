
let shooter =  {name:'James',position:'SF',positionName:'Small Forward',boxScore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0},benchStatus:'bench',inactive:'n',fatigue:1,pRat_overall:94,pRat_offOverall:87,pRat_closeShot:94, pRat_midShot:86, pRat_longShot:82, pRat_freeThrow:72, pRat_offIQ:98, pRat_speed:87, pRat_strength:89, pRat_jumping:89, pRat_stamina:99, pRat_durability:97, pRat_dunking:90, pRat_andOne:95, pRat_passing:90, pRat_ballHandle:87, pRat_defIQ:82, pRat_intDef:82, pRat_perDef:89, pRat_steal:75, pRat_block:70, pRat_helpDef:90, pRat_offRebound:65, pRat_defRebound:75}
let defender = {name:'Middleton',position:'SF',positionName:'Small Forward',boxScore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0},benchStatus:'bench',inactive:'n',fatigue:1,pRat_overall:85,pRat_offOverall:82,pRat_closeShot:75, pRat_midShot:83, pRat_longShot:87, pRat_freeThrow:88, pRat_offIQ:80, pRat_speed:71, pRat_strength:73, pRat_jumping:66, pRat_stamina:92, pRat_durability:90, pRat_dunking:65, pRat_andOne:65, pRat_passing:78, pRat_ballHandle:77, pRat_defIQ:72, pRat_intDef:72, pRat_perDef:85, pRat_steal:50, pRat_block:50, pRat_helpDef:83, pRat_offRebound:50, pRat_defRebound:65}
    
let foul = true
let foulType = 'shootingFoul'
let shot = 'pRat_longShot'

defender.boxScore.fouls+=1
if(defender.boxScore.fouls===6){
    //set player to inactive
    //run subs
}

function freeThrows(foulType,shooter,defender,shotSelection){
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
                // offTeam.score+=pointValue
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


freeThrows('technicalFoul',shooter,defender,'pRat_longShot')
console.log('')
freeThrows(foulType,shooter,defender,shot)
console.log('')

freeThrows('andOne',shooter,defender,shot)
console.log('')

freeThrows(foulType,shooter,defender,'pRat_midShot')
console.log('')

freeThrows(foulType,shooter,defender,shot)
console.log(shooter.boxScore.points,shooter.boxScore.FT,shooter.boxScore.FTA)

console.log(defender.boxScore.fouls)