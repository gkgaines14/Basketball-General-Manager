// import * as gamePlay from "./gameplay_functions.js" 
// import {homeTeamRoster} from "./app_launch.js"
// import { leagueTeams } from "./player_generator.js"
import {leagueTeamList} from "./app_game_data.js"
import {createNewPlayer, freeThrows, postPlayerCardData} from "./gameplay_functions.js"


// Launches the app and controls screen management
const pageManager = {
    
    init: ()=>{
        let page = document.body.id

        switch(page){
            case 'sim-game-page': 
            launchSim();
            console.log(page);
            break;

            case 'roster-page': 
            loadRosterPage();
            console.log(page);
            break;
            
            case 'player-generator': 
            loadPlayerGenerator();
            console.log(page);
            break;

            default: 
            loadMenu();
            console.log(page);
        };
        
    },
}

pageManager.init();


// Launch Landing Page
function loadRosterPage(){
    let freeAgentList= document.getElementById('free-agent-list');
    let freeAgentRoster = leagueTeamList[0].roster
    let homeTeamRoster = [{
        pg:{},
        sg:{},
        sf:{},
        pf:{},
        c:{},
        BenchOne:{},
        BenchTwo:{},
        BenchThree:{},
        BenchFour:{},
        BenchFive:{},
        BenchSix:{},
        BenchSeven:{},
        BenchEight:{},
    }];

    let awayTeamRoster = [{
        pg:{},
        sg:{},
        sf:{},
        pf:{},
        c:{},
        BenchOne:{},
        BenchTwo:{},
        BenchThree:{},
        BenchFour:{},
        BenchFive:{},
        BenchSix:{},
        BenchSeven:{},
        BenchEight:{},
    }];
    
    // add Created player to Free Agents
    leagueTeamList[0].roster.push(createNewPlayer({race:'white',exp:0}))
    leagueTeamList[0].roster[leagueTeamList[0].roster.length-1].describe()
    console.log(leagueTeamList[0].roster[(leagueTeamList[0].roster.length-1)])
    // console.log(leagueTeamList[0].roster[(leagueTeamList[0].roster.length-2)])
    // console.log(leagueTeamList[0].roster[(leagueTeamList[0].roster.length-1)].firstName)
    // console.log(leagueTeamList[0].roster[(leagueTeamList[0].roster.length-1)].benchStatus)
    // console.log(leagueTeamList[0].roster[(leagueTeamList[0].roster.length-1)].pID)


    setFreeAgents();
    
    const draggables = document.querySelectorAll('.name-box');
    const containers = document.querySelectorAll('.position-tile');
    const dropdowns = document.querySelectorAll('.dropdown');
    const confirmButton = document.querySelector('#confirm-btn');
    const gmRoster = document.querySelector('#gm-roster')
    const cpuRoster = document.querySelector('#cpu-roster')
    

    function setFreeAgents(){

        if(1===1){
            freeAgentRoster = JSON.parse(sessionStorage.getItem('fAList'))
        }else{
            
        }

        freeAgentRoster.forEach(item=>{
            const tile = document.createElement('div')
            tile.classList.add('position-tile','filled')
            tile.dataset.arr="freeAgent"
            tile.innerHTML =`
            <div class="name-box" data-pid="${item.pID}" draggable=true>
        
            <div class="name-box-player">
            <i class="fas fa-grip-lines"></i>
            <p class="name">${item.firstName} ${item.lastName} (${item.position})</p>
            </div>

            <div class="name-box-ratings">
            <p> Ovr: <span style="color:blue">${item.pRat_overall}</span></p>
            <p> Off: <span style="color:blue">${item.pRat_offOverall}</span></p>
            <p> Def: <span style="color:blue">${item.pRat_defOverall}</span></p>
            </div>

            </div>
            `
            freeAgentList.appendChild(tile)

        })


    }


    draggables.forEach(item=>{
        item.addEventListener('dragstart',()=>{
            item.classList.add('dragging');
            // console.log('drag start',item.dataset.pid)
            item.parentElement.classList.remove('filled')
            item.parentElement.classList.add('empty')
        })

        item.addEventListener('dragend',()=>{
            item.classList.remove('dragging');
        })

    });



    containers.forEach(item =>{
        item.addEventListener('dragover',(e)=>{
            e.preventDefault();
        });
        
        item.addEventListener('drop',()=>{
            const selected = document.querySelector('.dragging');
            
            if(item.classList.contains('filled')){
                console.log('filled')
            }else{
                item.appendChild(selected);
                item.classList.remove('empty')
                item.classList.add('filled')
            }
            
        });
    });

    
    dropdowns.forEach(dropdown =>{
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.dropdown-menu');
        const options = dropdown.querySelectorAll('.dropdown-menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', ()=>{
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('dropdown-menu-open');
        });

        options.forEach(option =>{
            option.addEventListener('click',()=>{
                selected.innerText = option.innerText
                // console.log(selected)
                // option.innerText
                select.classList.remove('selected-clicked');

                caret.classList.remove('caret-rotate');

                menu.classList.remove('dropdown-menu-open');

                options.forEach(option=>{
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });

    confirmButton.addEventListener('click',()=>{
        // Set Teams Selections
        var gameTeams = document.querySelectorAll('.active');
        let hTeam = leagueTeamList.find(item=>item.tID===gameTeams[0].dataset.tid)
        let aTeam = leagueTeamList.find(item=>item.tID===gameTeams[1].dataset.tid)

        //Set Home Team Roster
        const gmArray = gmRoster.querySelectorAll('.home-s-tile')
        gmArray.forEach(item=>{
            if(item.lastElementChild.dataset.pid){
                freeAgentRoster.find(slot=>slot.pID===Number(item.lastElementChild.dataset.pid)).benchStatus = item.dataset.benchStatus;
                homeTeamRoster[0][item.dataset.pos]=freeAgentRoster.find(slot=>slot.pID===Number(item.lastElementChild.dataset.pid));
            }else{
                homeTeamRoster[0][item.dataset.pos]={pID:1001,firstName:'',lastName:'',position:'',positionName:'Power Forward',boxscore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99},benchStatus:'',inactive:'n',pRat_overall:95,pRat_offOverall:86,pRat_closeShot:95, pRat_midShot:83, pRat_threeShot:75, pRat_freeThrow:68, pRat_offIQ:91, pRat_speed:90, pRat_strength:94, pRat_jumping:85, pRat_stamina:98, pRat_durability:91, pRat_dunking:95, pRat_andOne:97, pRat_passing:84, pRat_ballHandle:87, pRat_defIQ:90, pRat_intDef:92, pRat_perDef:92, pRat_steal:80, pRat_block:82, pRat_helpDef:96, pRat_offRebound:75, pRat_defRebound:92}
            }
        })

        hTeam.roster = homeTeamRoster
        sessionStorage.setItem("hTeam",JSON.stringify(hTeam));


        //Set Away Team Roster

        const cpuArray = cpuRoster.querySelectorAll('.away-s-tile')

        cpuArray.forEach(item=>{
            if(item.lastElementChild.dataset.pid){
                freeAgentRoster.find(slot=>slot.pID===Number(item.lastElementChild.dataset.pid)).benchStatus = item.dataset.benchStatus;
                awayTeamRoster[0][item.dataset.pos]=freeAgentRoster.find(slot=>slot.pID===Number(item.lastElementChild.dataset.pid));
            }else{
                awayTeamRoster[0][item.dataset.pos]={pID:1002,firstName:'',lastName:'',position:'',positionName:'Power Forward',boxscore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99},benchStatus:'',inactive:'n',pRat_overall:95,pRat_offOverall:86,pRat_closeShot:95, pRat_midShot:83, pRat_threeShot:75, pRat_freeThrow:68, pRat_offIQ:91, pRat_speed:90, pRat_strength:94, pRat_jumping:85, pRat_stamina:98, pRat_durability:91, pRat_dunking:95, pRat_andOne:97, pRat_passing:84, pRat_ballHandle:87, pRat_defIQ:90, pRat_intDef:92, pRat_perDef:92, pRat_steal:80, pRat_block:82, pRat_helpDef:96, pRat_offRebound:75, pRat_defRebound:92}
            }
        })

        aTeam.roster = awayTeamRoster
        sessionStorage.setItem("aTeam",JSON.stringify(aTeam));


        // Validity Check
        
        window.location.href = "sim_game_page.html";

    });
};

// Load Simulation Page and Simulate a Game
function launchSim(){
// Load UI Elements -----------------------------------------------------------------------------------------------------------------
    
    let homeTeam = JSON.parse(sessionStorage.getItem("hTeam"));
    let awayTeam = JSON.parse(sessionStorage.getItem("aTeam"));

    console.log(homeTeam.roster[0].pg)
    console.log(homeTeam.roster[0].pg.playerDetails)

    // let y = createNewPlayer({race:'white',exp:0})
    // y.describe()
    // y.playerDetails()
    // console.log(y)


    const hpg = document.querySelector('#h-pg-name');
    const hsg = document.querySelector('#h-sg-name');
    const hsf = document.querySelector('#h-sf-name');
    const hpf = document.querySelector('#h-pf-name');
    const hc = document.querySelector('#h-c-name');
    const hBenchOne = document.querySelector('#h-b-one-name');
    const hBenchTwo = document.querySelector('#h-b-two-name');
    const hBenchThree = document.querySelector('#h-b-three-name');
    const hBenchFour = document.querySelector('#h-b-four-name');
    const hBenchFive = document.querySelector('#h-b-five-name');
    const hBenchSix = document.querySelector('#h-b-six-name');
    const hBenchSeven = document.querySelector('#h-b-seven-name');
    const hBenchEight = document.querySelector('#h-b-eight-name');

    const homePosList = [
        [hpg,'pg'],
        [hsg,'sg'],
        [hsf,'sf'],
        [hpf,'pf'],
        [hc,'c'],
        [hBenchOne,'BenchOne'],
        [hBenchTwo,'BenchTwo'],
        [hBenchThree,'BenchThree'],
        [hBenchFour,'BenchFour'],
        [hBenchFive,'BenchFive'],
        [hBenchSix,'BenchSix'],
        [hBenchSeven,'BenchSeven'],
        [hBenchEight,'BenchEight'],
    ];

    const apg = document.querySelector('#a-pg-name');
    const asg = document.querySelector('#a-sg-name');
    const asf = document.querySelector('#a-sf-name');
    const apf = document.querySelector('#a-pf-name');
    const ac = document.querySelector('#a-c-name');
    const aBenchOne = document.querySelector('#a-b-one-name');
    const aBenchTwo = document.querySelector('#a-b-two-name');
    const aBenchThree = document.querySelector('#a-b-three-name');
    const aBenchFour = document.querySelector('#a-b-four-name');
    const aBenchFive = document.querySelector('#a-b-five-name');
    const aBenchSix = document.querySelector('#a-b-six-name');
    const aBenchSeven = document.querySelector('#a-b-seven-name');
    const aBenchEight = document.querySelector('#a-b-eight-name');
    
    const awayPosList = [
        [apg,'pg'],
        [asg,'sg'],
        [asf,'sf'],
        [apf,'pf'],
        [ac,'c'],
        [aBenchOne,'BenchOne'],
        [aBenchTwo,'BenchTwo'],
        [aBenchThree,'BenchThree'],
        [aBenchFour,'BenchFour'],
        [aBenchFive,'BenchFive'],
        [aBenchSix,'BenchSix'],
        [aBenchSeven,'BenchSeven'],
        [aBenchEight,'BenchEight'],
    ];

    const hLogo = document.querySelector('#h-logo-box')
    const hScore = document.querySelector('#h-score');
    const hReb = document.querySelector('#h-t-reb');
    const hAst = document.querySelector('#h-t-ast');
    const hFG = document.querySelector('#h-t-fgp');
    const hTPS = document.querySelector('#h-t-tps');

    const aLogo = document.querySelector('#a-logo-box')
    const aScore = document.querySelector('#a-score');
    const aReb = document.querySelector('#a-t-reb');
    const aAst = document.querySelector('#a-t-ast');
    const aFG = document.querySelector('#a-t-fgp');
    const aTPS = document.querySelector('#a-t-tps');

    // Buttons
    const advanceButton = document.querySelector('#advance-button');

    // Sets team data and styles
    const root = document.documentElement.style;

    // Load home team
    root.setProperty('--home-p-color',homeTeam.primaryColor);
    root.setProperty('--home-s-color',homeTeam.secondaryColor);
    root.setProperty('--home-color-high',homeTeam.highColor);
    document.getElementById('h-city').innerHTML = homeTeam.city;
    document.getElementById('h-team-name').innerHTML = homeTeam.teamName;
    hLogo.src = homeTeam.logo;


    // Load away team
    root.setProperty('--away-p-color',awayTeam.primaryColor);
    root.setProperty('--away-s-color',awayTeam.secondaryColor);
    root.setProperty('--away-color-high',awayTeam.highColor);
    document.getElementById('a-city').innerHTML = awayTeam.city;
    document.getElementById('a-team-name').innerHTML = awayTeam.teamName;
    aLogo.src = awayTeam.logo

    // Mouseover for position icon
    const boxscoreTiles = document.querySelectorAll('.boxscore-tile');
    boxscoreTiles.forEach(tile => {
        tile.addEventListener('mouseover',()=>{
            if(tile.classList.contains('home')){
                tile.firstChild.nextElementSibling.className = 'h-pos-icon';
            }else if(tile.classList.contains('away')){
                tile.firstChild.nextElementSibling.className = 'a-pos-icon';
            }
            // Fatigue Bar
            tile.lastElementChild.style.display = 'block';
            tile.lastElementChild.firstElementChild.style.height=`${(tile.childNodes[5].lastElementChild.innerText)*.20}px`;
            if(tile.childNodes[5].lastElementChild.innerText<75 && tile.childNodes[5].lastElementChild.innerText>49){
                tile.lastElementChild.firstElementChild.style.backgroundColor='orange';
            }else if(tile.childNodes[5].lastElementChild.innerText<50){
                tile.lastElementChild.firstElementChild.style.backgroundColor='red';

            }
        })

        tile.addEventListener('mouseout',()=>{
            if(tile.classList.contains('away')||tile.classList.contains('home')){
                tile.firstChild.nextElementSibling.className = 'b-pos-icon';
            }
            tile.lastElementChild.style.display = 'none';

        });
    });

    // Post Player Data
    postPlayerData();

    // Run the simulation ------------------------------------------------------------------------------------------------------------------------    
    advanceButton.addEventListener('click', ()=>{
        simGame(homeTeam,awayTeam,200)
        });



    // Posts data to the UI
    function postPlayerData(){
        // Post Home Team Data
        homePosList.forEach(item=>{
            //Post Player Name
            item[0].innerText = `${homeTeam.roster[0][item[1]].firstName.charAt(0)}. ${homeTeam.roster[0][item[1]].lastName}`;
            // Post Player Stats
            item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                stat.innerText = homeTeam.roster[0][item[1]].boxscore[stat.dataset.statCat];
            });

            // if(homeTeam.roster[0][item[1]].lastName, homeTeam.roster[0][item[1]].benchStatus==='bench'){
            //     item[0].parentElement.firstChild.nextElementSibling.innerText = homeTeam.roster[0][item[1]].position
            // };
        });
        
        // Post Away Team Data
        awayPosList.forEach(item=>{
            //Post Player Name
            item[0].innerText = `${awayTeam.roster[0][item[1]].firstName.charAt(0)}. ${awayTeam.roster[0][item[1]].lastName}`;
            // Post Player Stats
            item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                stat.innerText = awayTeam.roster[0][item[1]].boxscore[stat.dataset.statCat];
            });

            // if(awayTeam.roster[0][item[1]].lastName, awayTeam.roster[0][item[1]].benchStatus==='bench'){
            //     item[0].parentElement.firstChild.nextElementSibling.innerText = awayTeam.roster[0][item[1]].position;
            // };
        });

        // Calculates the team totals for stat categories - Takes team, position list, stat category and html element as parameters
        function sumTeamStats(team,posList,statCat){
            let catSum = 0
            for(let i=0;i<13;i++){
                // console.log(homeTeam.roster[0][homePosList[i][1]].boxscore.points)
                catSum+=team.roster[0][posList[i][1]].boxscore[statCat]
            }
            return catSum
        }

        // Post home team total stats
        hScore.innerText = sumTeamStats(homeTeam,homePosList,'points')
        hReb.innerText= sumTeamStats(homeTeam,homePosList,'rebounds')
        hAst.innerText= sumTeamStats(homeTeam,homePosList,'assists',hAst)
        hFG.innerText=`${Math.round((sumTeamStats(homeTeam,homePosList,'FG'))/(sumTeamStats(homeTeam,homePosList,'FGA'))*100)}%`
        hTPS.innerText=`${Math.round((sumTeamStats(homeTeam,homePosList,'TP'))/(sumTeamStats(homeTeam,homePosList,'TPA'))*100)}%`

        // Post away team total stats
        aScore.innerText = sumTeamStats(awayTeam,awayPosList,'points')
        aReb.innerText= sumTeamStats(awayTeam,awayPosList,'rebounds')
        aAst.innerText= sumTeamStats(awayTeam,awayPosList,'assists',hAst)
        aFG.innerText=`${Math.round((sumTeamStats(awayTeam,awayPosList,'FG'))/(sumTeamStats(awayTeam,awayPosList,'FGA'))*100)}%`
        aTPS.innerText=`${Math.round((sumTeamStats(awayTeam,awayPosList,'TP'))/(sumTeamStats(awayTeam,awayPosList,'TPA'))*100)}%`
    };

    // Simulate an entire game by number of possessions
    function simGame(homeTeam,roadTeam,possesions){
        let x = 0
        while (x<possesions){
            simPos(homeTeam,roadTeam)
            x++
        }
    }

    //Simulate possession(s)
    function simPos(homeTeam,roadTeam){
        // add score property to teams
        homeTeam.score = 0;
        roadTeam.score = 0;
        
        let offense,defense;
        let score = 0;
        
        let shooter,defRebounder,offRebounder, assister, stealer, defender;
        let shotSelection = ''
        let shotOutcome = ''
        let assistOutcome = ''
        let shotDescription = ''
        let defenseDescription =''
        let defensiveOutcome = ''
        let possessionOutcome = ''
        let pointValue = 0
        let posCount = 1

        //Defines the shot function
        function takeShot(shooter,shot_selection){
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
            let setDefender = function(){
                let dPlayer
                let posArr = ['pg','sg','sf','pf','c']
                posArr.forEach(item=>{
                    if(offense.roster[0][item].pID===shooter.pID){
                        dPlayer = defense.roster[0][item]
                    }
                })
                return dPlayer
            }
            
            defender = setDefender()
        
            //Set defensive attribute
            switch(shot_selection){
                case 'pRat_closeShot': defAttribute = defender.pRat_intDef;
                break
                case 'pRat_midShot': defAttribute = defender.pRat_perDef;
                break
                default: defAttribute = defender.pRat_perDef;
            }
        
            //Set defensive Multiplier
            if(defAttribute>=90){
                defMultiplier = (defAttribute/10)*6.5
            }else if(defAttribute>=80){
                defMultiplier = (defAttribute/10)*5.8
            }else if(defAttribute>=70){
                defMultiplier = (defAttribute/10)*4.5
            }else if(defAttribute>=60){
                defMultiplier = (defAttribute/10)*3
            }else{
                defMultiplier = (defAttribute/10)*2
            }
            
            //Take the shot
                
                let rand = Math.floor(Math.random()*(100-1)+1)
                console.log(shotSelection,'-',shooter[shotSelection])
                console.log('def att- ',defAttribute)
                console.log('def mult- ',defMultiplier)
                console.log('rand- ',rand)
        
                if (shooter[shot_selection]>=(rand+defMultiplier)){
                    shotDescription = (`${shooter.lastName} ${madeShotPhrase()} ${shotTypePhrase(shot_selection)}`)
                    shooter.boxscore.FG++
                    shooter.boxscore.FGA++

                    if(shot_selection==='pRat_threeShot'){
                        shooter.boxscore.TP++
                        shooter.boxscore.TPA++
                    }

                    return 'Make'
                
                }else{
                    shotDescription = (`Missed shot by ${shooter.lastName}`)
                    shooter.boxscore.FGA++

                    if(shot_selection==='pRat_threeShot'){
                        shooter.boxscore.TPA++
                    }
                    return 'Miss'
                }
                
        }

        //Sets the percentage likelihood for each player to make the specified (attribute) play
        function setPriority(team,attribute){
            let playerAttRatings = [team.roster[0].pg[attribute],team.roster[0].sg[attribute],team.roster[0].sf[attribute],team.roster[0].pf[attribute],team.roster[0].c[attribute]]

            let weightedRatings = playerAttRatings.map(item=>{
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

            let weightedPercent = weightedRatings.map(item=>(item/weightedRatings.reduce((a,b)=>a+b)))

            let pgPriority = weightedPercent[0]
            let sgPriority = weightedPercent[1]
            let sfPriority = weightedPercent[2]
            let pfPriority = weightedPercent[3]
            let cPriority = weightedPercent[4]

            let distributionArray = [[pgPriority,team.roster[0].pg],[sgPriority,team.roster[0].sg],[sfPriority,team.roster[0].sf],[pfPriority,team.roster[0].pf],[cPriority,team.roster[0].c]].sort((a, b)=> b[0]-a[0])

                

            //Display percentage breakdown for back-end observation
            distributionArray.forEach(item=>console.log(attribute,(item[1].lastName),'-',((item[0])*100).toFixed(1),'%'))
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

        //1. Set offensive and defensive teams for the possesion
        if(homeTeam.hasPossession ==='yes'){
            offense = homeTeam;
            score = homeTeam.score;
            defense = roadTeam;
        }else{
            offense = roadTeam;
            score = roadTeam.score;
            defense = homeTeam;
        }

        //2. Assigns the player to shoot, assist, defensive rebound, offensive rebound and steal on each possession
        assister = setPriority(offense,'pRat_passing');
        shooter = setPriority(offense,'pRat_offOverall');
        offRebounder = setPriority(offense,'pRat_offRebound');
        defRebounder = setPriority(defense,'pRat_defRebound');
        stealer = setPriority(defense,'pRat_steal');
        
        // console.log('Offense - ',offense.teamName)
        // console.log('Assister - ',assister)
        // console.log('Shooter - ',shooter)
        // console.log('Off Reb - ',offRebounder)
        // console.log('Def Reb - ',defRebounder)
        // console.log('Steal - ',stealer)


        //3. Sets the shot selection
        switch(Math.floor(Math.random()*(3)+1)){
            case 1: shotSelection =  'pRat_closeShot';pointValue = 2;
            break
            case 2: shotSelection = 'pRat_midShot';pointValue = 2;
            break
            default: shotSelection = 'pRat_threeShot';pointValue = 3;
        }

        //4. Offense takes the shot or defense gets a steal
        if(Math.random()<=.09){
    
            //add turnover stat and acrue
            stealer.boxscore.steals++;

            console.log(`Pos ${posCount}: STEAL!!! The ball is stolen by ${stealer.lastName}.`)
            console.log('')
        }else{
            
            shotOutcome = takeShot(shooter,shotSelection);

            //shot outcome triggers
            if(shotOutcome === 'Make'){
                shooter.boxscore.points += pointValue;
                offense.score+=pointValue;
                
                

                //Teammate to assist
                if(Math.random()>.4){

                    if(shooter.position===assister.position){
                        assistOutcome = '';
                    }else{
                        assister.boxscore.assists += 1
                        assistOutcome = ` (Assisted by ${assister.lastName})`

                    }

                }else{
                    assistOutcome = ''
                }

                //Check for foul and shoot freethrow
                if(Math.random()<.3){
                    shotDescription = `Foul called on ${defender.LastName}...${shooter.lastName} finishes the shot with a chance for the And-One!`
                    freeThrows('andOne',shooter,shotSelection)

                    offense.score+=pointValue
                    defender.boxscore.fouls++

                    if(defender.boxscore.fouls===6){
                        defender.inactive = 'y'
                        shotDescription+=` ${defender.lastName} has fouled out of the game.`
                        //create functino to remove inactive player
                        //run subs---------------------------------------------------------------------------------------------------------------
                    }
                }

            }else{
                
                //defense selects a player to block
                switch(Math.floor(Math.random()*(5)+1)){
                    case 1: defender =  defense.roster[0].pg
                    break
                    case 2: defender = defense.roster[0].sg
                    break
                    case 3: defender = defense.roster[0].sf
                    break
                    case 4: defender = defense.roster[0].pf
                    break
                    default: defender = defense.roster[0].c
                }
        //defensive outcome------------------------------------------------------------
                if(Math.floor(Math.random()>.9)){
                    console.log('blocked shot!!!!!!!!!!')
                    // defensiveOutcome = 'blocked shot'; defender.boxscore.blocks+=1
                    
                }else{
                    if(Math.random()>.78){
                        // console.log('offensive rebound',offRebounder)
                        defensiveOutcome = ` ${offRebounder.lastName} gets the offensive rebound and the ${offense.teamName} reset the offense.`
                        offRebounder.boxscore.rebounds+=1                           
                        
                        //change possession
                        if(homeTeam.hasPossession ==='yes'){
                            homeTeam.hasPossession = 'no'
                            roadTeam.hasPossession = 'yes'
                        }else{
                            homeTeam.hasPossession = 'yes'
                            roadTeam.hasPossession = 'no'
                        }

                    }else{
                        // console.log('defensive rebound',defRebounder)
                        defensiveOutcome = `Rebounded by ${defRebounder.lastName}.`
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
        if(homeTeam.hasPossession ==='yes'){
            homeTeam.hasPossession = 'no'
            roadTeam.hasPossession = 'yes'
        }else{
            homeTeam.hasPossession = 'yes'
            roadTeam.hasPossession = 'no'
        }
        
        posCount++
        postPlayerData()
    }
    
};

// Load Player Generator page
function loadPlayerGenerator(){

    console.log('hi player gen');


    const submitButton = document.querySelector('#submit-btn');
    const modifyButton = document.querySelector('#modify-btn');
    const saveButton = document.querySelector('#save-btn');
    const dropdowns = document.querySelectorAll('.dropdown');
    const teamName = document.querySelector('#team-name');
    const city = document.querySelector('#city');

    const modScreen = document.querySelector('#mod-screen');
    const modSave = document.querySelector('#mod-save-btn');
    const counters = document.querySelectorAll('.counter-box');

    let logo = document.querySelector('#logo');
    let root = document.documentElement.style;
    let createdPlayer;

    root.setProperty('--home-p-color',leagueTeamList[0].primaryColor);
    root.setProperty('--home-s-color',leagueTeamList[0].secondaryColor);
    root.setProperty('--home-color-high',leagueTeamList[0].highColor);
    root.setProperty('--home-logo',leagueTeamList[0].logo);

    // city.innerText = leagueTeamList[0].city
    // teamName.innerText = leagueTeamList[0].teamName

    console.log(leagueTeamList[0])

    dropdowns.forEach(dropdown =>{
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.dropdown-menu');
        const options = dropdown.querySelectorAll('.dropdown-menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', ()=>{
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('dropdown-menu-open');
        });

        options.forEach(option =>{
            option.addEventListener('click',()=>{
                selected.innerText = option.innerText
                // console.log(selected)
                // option.innerText
                select.classList.remove('selected-clicked');

                caret.classList.remove('caret-rotate');

                menu.classList.remove('dropdown-menu-open');

                options.forEach(option=>{
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });
    
    submitButton.addEventListener('click',()=>{        
        console.clear();

        let playerRace = document.querySelectorAll('.active')[0].dataset.race;
        let playerExp = (document.querySelectorAll('.active')[1].dataset.exp==='rookie')?0:Math.floor(Math.random()*(15-1)+1);
        let team = leagueTeamList.find(team=>team.tID===document.querySelectorAll('.active')[2].dataset.tid);
        
        root.setProperty('--home-p-color',team.primaryColor);
        root.setProperty('--home-s-color',team.secondaryColor);
        root.setProperty('--home-color-high',team.highColor);
        root.setProperty('--home-logo',team.logo);

        city.innerText = team.city;
        teamName.innerText = team.teamName;
        logo.src = team.logo;

        let playerInput = {race:playerRace,exp:playerExp};
        createdPlayer = createNewPlayer(playerInput);

        postPlayerCardData(createdPlayer)
        console.log(createdPlayer.describe())
        console.log(createdPlayer)
    })
    
    modifyButton.addEventListener('click',()=>{

        const overall = document.querySelector('#mod-ovr-rating');
        const offOverall = document.querySelector('#mod-off-ovr');
        const defOverall = document.querySelector('#mod-def-ovr');
        const firstName = document.querySelector('#mod-first-name');
        const lastName = document.querySelector('#mod-last-name');
        const college = document.querySelector('#mod-college');
        const ovrRating = document.querySelector('#mod-ovr-rating');
        const closeShot = document.querySelector('#mod-close-shot');
        const midShot = document.querySelector('#mod-mid-shot');
        const threeShot = document.querySelector('#mod-three-shot');
        const freeThrow = document.querySelector('#mod-free-throw');
        const dunking = document.querySelector('#mod-dunking');
        const andOne = document.querySelector('#mod-and-one');
        const passing = document.querySelector('#mod-passing');
        const ballHandle = document.querySelector('#mod-handle');
        const clutchness = document.querySelector('#mod-clutch');
        const offIq = document.querySelector('#mod-off-iq');
        const intDef = document.querySelector('#mod-int-def');
        const perDef = document.querySelector('#mod-per-def');
        const steal = document.querySelector('#mod-steal');
        const block = document.querySelector('#mod-block');
        const helpDef = document.querySelector('#mod-help-def');
        const defIq = document.querySelector('#mod-def-iq');
        const offReb = document.querySelector('#mod-off-reb');
        const defReb = document.querySelector('#mod-def-reb');
        const potential = document.querySelector('#mod-potential');
        const peak = document.querySelector('#mod-peak-age');
        const retire = document.querySelector('#mod-ret-age');
        const speed = document.querySelector('#mod-speed');
        const strength = document.querySelector('#mod-strength');
        const jumping = document.querySelector('#mod-jumping');
        const stamina = document.querySelector('#mod-stamina');
        const durability = document.querySelector('#mod-durability');
        const personality = document.querySelector('#mod-personality');

        overall.innerText = createdPlayer.pRat_overall
        offOverall.innerText = createdPlayer.pRat_offOverall
        defOverall.innerText = createdPlayer.pRat_defOverall
        firstName.defaultValue = createdPlayer.firstName
        lastName.defaultValue = createdPlayer.lastName
        college.defaultValue = createdPlayer.college
        ovrRating.defaultValue = createdPlayer.pRat_overall
        closeShot.defaultValue = createdPlayer.pRat_closeShot;
        midShot.defaultValue = createdPlayer.pRat_midShot;
        threeShot.defaultValue = createdPlayer.pRat_threeShot;
        freeThrow.defaultValue = createdPlayer.pRat_freeThrow;
        dunking.defaultValue = createdPlayer.pRat_dunking;
        andOne.defaultValue = createdPlayer.pRat_andOne;
        passing.defaultValue = createdPlayer.pRat_passing;
        ballHandle.defaultValue = createdPlayer.pRat_ballHandle;
        clutchness.defaultValue = createdPlayer.pRat_clutchness;
        offIq.defaultValue = createdPlayer.pRat_offIQ;
        intDef.defaultValue = createdPlayer.pRat_intDef;
        perDef.defaultValue = createdPlayer.pRat_perDef;
        steal.defaultValue = createdPlayer.pRat_steal;
        block.defaultValue = createdPlayer.pRat_block;
        helpDef.defaultValue = createdPlayer.pRat_helpDef;
        defIq.defaultValue = createdPlayer.pRat_defIQ;
        offReb.defaultValue = createdPlayer.pRat_offRebound;
        defReb.defaultValue = createdPlayer.pRat_defRebound;
        potential.defaultValue = createdPlayer.potential;
        peak.defaultValue = createdPlayer.peakAge;
        retire.defaultValue = createdPlayer.retirementAge;
        speed.defaultValue = createdPlayer.pRat_speed;
        strength.defaultValue = createdPlayer.pRat_strength;
        jumping.defaultValue = createdPlayer.pRat_jumping;
        stamina.defaultValue = createdPlayer.pRat_stamina;
        durability.defaultValue = createdPlayer.pRat_durability;
        personality.defaultValue = createdPlayer.pRat_personality;




        console.log('Modify')
        modScreen.style.display='flex'
        console.log(passing)
        console.log(createdPlayer.lastName)


    });



    saveButton.addEventListener('click',()=>{
        leagueTeamList[0].roster.push(createdPlayer)
        console.log(
        leagueTeamList[0].roster)
        sessionStorage.setItem('fAList',JSON.stringify(leagueTeamList[0].roster))
    });


    modSave.addEventListener('click',()=>{
        modScreen.style.display='none'








    })

    counters.forEach(counter=>{
        counter.addEventListener('click',(event)=>{
            console.log(event.target.classList[0])
            switch(event.target.classList[0]){
                case 'minus':
                    (counter.childNodes[3].value>counter.childNodes[3].dataset.min)?counter.childNodes[3].value--:
                    counter.childNodes[3].value=counter.childNodes[3].dataset.min;
                break;
                case 'plus':
                    (counter.childNodes[3].value===counter.childNodes[3].dataset.max)?'':counter.childNodes[3].value++;
                break;
                default:;
            }
        })
    })


};

function loadMenu(){
    console.log('this is the menu page')

    // var audio = new Audio('drop-it-124014.mp3');
    // setTimeout(()=>audio.play(),100);
    // audio.volume = 0.4;
    // audio.loop=true;

    const test = document.querySelector('#menu')
    const menuButton = document.querySelector('.menu-button')
    const menuList = document.querySelector('.menu-list')
    const caret = document.querySelector('.caret');

    menuButton.addEventListener('click',()=>{
        caret.classList.toggle('caret-rotate');
        if(menuButton.classList.contains('menu-button-open')){
            console.log('open')
            menuList.classList.toggle('menu-list-open')
            setTimeout(()=>menuButton.classList.toggle('menu-button-open'),700)
        }else{
            menuButton.classList.toggle('menu-button-open');
            setTimeout(()=>menuList.classList.toggle('menu-list-open'),400);
        }

    })


    // let Test = class{
    //     constructor(a){
    //         this.kone=2*a;
    //         this.ktwo=this.kone+1;
    //         this.kthree=this.ktwo+1;
    //     }
    // }


    // let y = createNewPlayer({race:'black',exp:0})

    // console.log(y)


    // console.log(JSON.stringify(y))

    // console.log(z)
};
