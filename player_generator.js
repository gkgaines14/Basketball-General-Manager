export {leagueTeams}



const firstNamePool_Black = ["Andre","Anfernee","Braylan","Braylen","Camron","D'Angelo","Dajuan","Damari","Damarion","Damonte","Dasean","Dashawn","Dayshawn","Deangelo","Deante","Deanthony","Dejuan","Demari","Demario","Demarion","Deonta","Deontay","Deonte","Dequan","Derrell","Derrion","Desean","Devonta","Dontez","Dujuan","Jahmir","Jermaine","Jamar","JaMarcus","Jamari","Jamario","Jamarius","Jamell","Jamere","Jamichael","Jaquan","Jarell","Jarrell","Javaris","Javeon","Javion","Javon","Javontae","Javonte","Jaylon","Jayquan","Jayvion","Jerel","Jerell","Johnell","Journey","Kadarius","Kamarion","Kendarius","Keondre","Keontae","Keshaun","Keshawn","Keshon","Keyshawn","Khiry","Khyree","Lamarion","Latrell","Maleek","Malique","Marcellus","Marshawn","Rashod","Reginald","Seven","Shamar","Shaquan","Shedrick","Sincere","Syncere","Taquan","TaShaun","Tashawn","Taurean","Tayshaun","Tayshawn","Tayvon","Terell","Terrion","Travion","Tre","Tremaine","Treveon","Trevion","Tyquan","Tyree","Tyrek","Tyrell","Tysean","Tyshaun"]
const firstNamePool_Gen = ["Aaron","Adam","Alan","Albert","Alexander","Andrew","Anthony","Arthur","Austin","Benjamin","Billy","Bobby","Brandon","Brian","Bruce","Bryan","Carl","Charles","Christian","Christopher","Daniel","David","Dennis","Donald","Douglas","Dylan","Edward","Elijah","Eric","Ethan","Eugene","Frank","Gabriel","Gary","George","Gerald","Greg","Harold","Henry","Jack","Jacob","James","Jason","Jeffrey","Jeremy","Jerry","Jesse","Joe","John","Johnny","Jonathan","Jordan","Jose","Joseph","Joshua","Juan","Justin","Keith","Kenneth","Kevin","Kyle","Larry","Lawrence","Logan","Louis","Mark","Matthew","Michael","Nathan","Nicholas","Noah","Patrick","Paul","Peter","Philip","Ralph","Randy","Raymond","Richard","Robert","Roger","Ronald","Roy","Russell","Ryan","Samuel","Scott","Sean","Stephen","Steven","Terry","Thomas","Timothy","Tyler","Vincent","Walter","Wayne","William","Willie","Zachary"]
const lastNamePool = ["Adams","Allen","Alvarez","Anderson","Bailey","Baker","Bennet","Booker","Brooks","Brown","Campbell","Carter","Clark","Collins","Cook","Cooper","Cox","Davis","Diaz","Edwards","Evans","Flores","Foster","Gaines","Gomez","Gonzales","Gray","Green","Hall","Harris","Hernandez","Hill","Howard","Hughes","Jackson","James","Jimenez","Johnson","Jones","Kelly","Kim","Kincaid","King","Kyles","Lee","Lewis","Long","Lopez","Martin","Mendoza","Miller","Mitchell","Moore","Morales","Morgan","Morris","Murphy","Myers","Nelson","Parker","Paul","Peterson","Phillips","Price","Ramos","Reed","Reyes","Richardson","Roberts","Robinson","Rodriguez","Rogers","Ross","Ruiz","Sanchez","Sanders","Scott","Smith","Stewart","Taylor","Thomas","Thompson","Torres","Turner","Walker","Ward","Watson","White","Williams","Williams","Williams","Williams","Williams","Williams","Wilson","Wood","Wright","Young"]
const collegeNamePool = ["Alabama","Arizona","Arizona","Arizona","Arizona","Arizona","Arizona State","Arizona State","Arizona State","Arizona State","Arkansas","Army","Auburn","Baylor","Boston College","Bryant","BYU","Cal State Fullerton","California","Clemson","Clemson","Clemson","Clemson","Connecticut","Connecticut","Connecticut","Creighton","Duke","Duke","Duke","Duke","Duke","Duke","Duke","Duke","Duke","Duke","Duke","FIU","Florida","Florida","Florida State","Fresno State","Georgia","Georgia Tech","Gonzaga","Gonzaga","Gonzaga","Gonzaga","Gonzaga","Gonzaga","Gonzaga","Houston","Illinois","Illinois","Illinois","Illinois","Illinois","Illinois","Illinois-Chicago","Indiana","Indiana","Indiana","Indiana","Indiana","Indiana State","Iowa","Kansas","Kansas","Kansas","Kansas","Kentucky","Kentucky","Kentucky","Kentucky","Kentucky","Long Beach State","Louisiana","Louisiana Tech","Louisville","Louisville","Louisville","Louisville","LSU","LSU","LSU","LSU","Maryland","Maryland","Maryland","Maryland","Mercer","Miami","Miami","Miami","Miami","Michigan","Michigan","Michigan","Michigan","Michigan","Michigan","Michigan","Minnesota","Mississippi State","Missouri","NC State","NC State","Nebraska","New Mexico","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","North Carolina","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Ohio State","Oklahoma","Oklahoma State","Ole Miss","Oral Roberts","Oregon","Oregon","Oregon","Oregon","Oregon","Oregon","Oregon","Oregon State","Pepperdine","Rice","Rice","Saint Louis","Saint Louis","San Diego State","San Diego State","South Alabama","South Carolina","South Florida","Southeastern Louisiana","Southern California","Southern Miss","St. John’s","St. John’s","St. John’s","St. John’s","Stanford","Stanford","TCU","Tennessee","Tennessee Tech","Texas","Texas A&M","Texas A&M","Texas A&M","Texas A&M","Texas A&M","Texas A&M","Texas Tech","Troy","Tulane","Tulane","UC Irvine","UC Irvine","UC Irvine","UC Irvine","USC","USC","USC","USC","USC","USC","USC","UCLA","UCLA","UCLA","UCLA","UCLA","UCLA","UCLA","UCLA","UMass","UMass","UMass","UMass","UMass","UMass","UMass","UNC Wilmington","Virginia","Virginia","Virginia","Virginia","Virginia","Virginia"]
const createdPlayerPool =[]
const leagueTeams =[]
let playerIdNumber=10001
let team = []

function generateRookies(){
}

//Function that creates batches of new players 
function createNewPlayer(count,years){
    
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
    function generateRace(){
    if(Math.floor(Math.random()*(100-1)+0)<30){
        return 'White'
        }else{
            return 'Black'
        }
    }
    function generateFirstName(race){
        if(race==='White'){
            return firstNamePool_Gen[Math.floor(Math.random()*(firstNamePool_Gen.length-1)+0)]
        }else{
            return firstNamePool_Black.concat(firstNamePool_Gen)[Math.floor(Math.random()*((firstNamePool_Black.length+firstNamePool_Gen.length)-1)+0)]

        }
    }
    function generateLastName(){
    
        return lastNamePool[Math.floor(Math.random()*(lastNamePool.length-1)+0)]
    }
    function generateInches(position){
        let inches = 0
        let height = ''
        
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
    function generateExp(expLevel){
        if(expLevel===0){
            return 0
        }else{
            return Math.floor(Math.random()*(15-1)+1)
        }
    }
    function generateAge(exp){
        if(exp===0){
            return Math.floor(Math.random()*(23-19)+19)
        }else{
            return (Math.floor(Math.random()*(23-19)+19))+exp
        }
    }

    let Player = class {
        constructor(levelOfExp){
            this.pID=playerIdNumber++
            this.race=generateRace()
            this.position=generatePosition()
            this.firstName=generateFirstName(this.race)
            this.lastName=generateLastName()
            this.inches = generateInches(this.position)
            this.height= (Math.floor(this.inches/12)).toString()+"'"+(this.inches%12).toString()+'"'
            this.yearsOfExp = generateExp(levelOfExp)
            this.age= generateAge(this.yearsOfExp)
            this.jerseyNumber= Math.floor(Math.random()*(56)).toString()
            this.college= generateCollege()
            this.potential = Math.floor(Math.random()*(11)+1).toString()
            this.peakAge = Math.floor(Math.random()*(34-29)+29)
            this.retirementAge= this.peakAge +Math.floor(Math.random()*(8-3)+3)
            this.team = freeAgency
            createdPlayerPool.push(this)
            freeAgency.roster.push(this)

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

    for(let i=0;i<count;i++){
        let x = new Player(years)
    }


}






// team.push(createdPlayerPool.find(item => item.pID === 10301))
// console.log(team[0])
// team[0].describe()

// console.log("")
// console.log('Player JJ ------------------------------------')
// console.log("")

// let jj =new Player(33)
// jj.describe()

// console.log("")
// console.log('All Gaines Players ------------------------------------')
// console.log("")



//Defines the Team class
export class Team {
    constructor(city,teamName,shortName){
        this.city = city
        this.teamName = teamName
        this.shortName = shortName
        this.roster = []
        leagueTeams.push(this)
    }
}
// let freeAgency = new Team('XXX','Free Agency','FA')
// let chicagoBulls = new Team('Chicago','Bulls','CHI')
// let newYorkKnicks = new Team('New York','Knicks','NYK')
// let losAngelesLakers = new Team('Los Angeles','Lakers','LAL')
let portlandTrailblazers = new Team('Portland','Trailblazers','POR')

console.log(portlandTrailblazers)

// createNewPlayer(200,1)


// console.log(leagueTeams)
// console.log(createdPlayerPool)
// console.log(freeAgency.roster)

// createdPlayerPool[4].signToTeam(chicagoBulls)
// createdPlayerPool.filter(item=>item.pID===10023)[0].signToTeam(chicagoBulls)

// console.log('Bulls Roster',chicagoBulls.roster)
// chicagoBulls.roster.map(item=>item.describe())

// // createdPlayerPool.filter(item=>item.pID===10123)[0].describe()

// createdPlayerPool.filter(item=>item.pID===10023)[0].trade(chicagoBulls,newYorkKnicks)

// chicagoBulls.roster.map(item=>item.describe())
// newYorkKnicks.roster.map(item=>item.describe())

// console.log('Bulls Roster', chicagoBulls.roster)
// console.log('Knicks Roster',newYorkKnicks.roster)


// console.log(createdPlayerPool.filter(item=>item.pID===10123)[0].speed)
// console.log(createdPlayerPool.filter(item=>item.pID===10123)[0].overall)

// createdPlayerPool.filter(item=>item.pID===10123)[0].developPlayer('speed',-50)

// console.log(createdPlayerPool.filter(item=>item.pID===10123)[0].speed)
// console.log(createdPlayerPool.filter(item=>item.pID===10123)[0].overall)







// let c = Math.random().toString()

// console.log(c.substring(15))

// //Create 400 players
// for(let i=0;i<400;i++){
//     let x = new Player()
//     // createdPlayerPool.push(x)
// }

// let x = createdPlayerPool.filter(item=>item.lastName==='Gaines')
// console.log(x)
// x.forEach(item=>item.describe())



