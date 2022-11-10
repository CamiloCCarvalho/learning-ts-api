let listUser: UserGithub[] = []

interface UserGithub {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
    reposList?: ListRepos[]
}

interface ListRepos {
    nameRepo: string
    fork: boolean
    description: string
    isPrivate: boolean
    stargazers_count: number
}

async function getUserGithub(name: string) {
    let response = await fetch(`https://api.github.com/users/${name}`)
    let data = await response.json()
    let newUser: UserGithub = {
        id: data["id"],
        login: data["login"],
        name: data["name"],
        bio: data["bio"],
        public_repos: data["public_repos"],
        repos_url: data["repos_url"]
    }
    listUser.push(newUser)
    console.log(\\\\\\\\\\\\\\newUser)
}

async function getUserInfo(name:string) {
    await getUserGithub(name)
    let response = await fetch(`https://api.github.com/users/${name}/repos`)
    let data = await response.json()
    console.log(data)
    listUser.forEach((element, index) => {
        if(element.name == name){
            let list:ListRepos = {
                nameRepo: data.name,
                fork: data.fork,
                description: data.description,
                isPrivate: data.private,
                stargazers_count: data.stargazers_count
            } 
            listUser[index].reposList.push(list)
        }
    })
}

interface TopFiveList {
    first: [string, number],
    second: [string, number],
    third: [string, number],
    fourth: [string, number],
    fifth: [string, number]
}

function showUsers() {
    let listStringUsers:string = ''
    listUser.forEach(element => {
        listStringUsers += `${element.name} | `
    })
    console.log(listStringUsers)
}

function getTotalRepos():number {
    let totalRepos:number = 0
    listUser.forEach(element => {
        totalRepos += element.public_repos
    })
    return totalRepos
}

function showTopFive() {
    listUser.sort((firstItem, secondItem)=> {
        if(secondItem.reposList > firstItem.reposList){
            return 1
        }
        if(secondItem.reposList < firstItem.reposList){
            return -1
        }
        return 0
    })
    let topFive: TopFiveList = {
        first: [listUser[0].name, listUser[0].public_repos],
        second: [listUser[1].name, listUser[1].public_repos],
        third: [listUser[2].name, listUser[2].public_repos],
        fourth: [listUser[3].name, listUser[3].public_repos],
        fifth: [listUser[4].name, listUser[4].public_repos]
    }
    console.log(topFive)
}


getUserInfo("camiloccarvalho")
getUserInfo("Kwynto")
getUserInfo("dirambora")
getUserInfo("jonangeles-sanchez")
getUserInfo("david-kariuki")
showUsers()
getTotalRepos()
showTopFive()
