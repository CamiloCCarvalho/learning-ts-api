let listUser: UserGithub[] = []

interface UserGithub {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
    reposList?: ListRepos[]
    message?: "Not Found"
}

interface ListRepos {
    nameRepo: string
    fork: boolean
    description: string
    isPrivate: boolean
    stargazers_count: number
}

async function getUserGithub(name: string) {
    const response = await fetch(`https://api.github.com/users/${name}`)
    const data = await response.json()
    let newUser: UserGithub = {
        id: data["id"],
        login: data["login"],
        name: data["name"],
        bio: data["bio"],
        public_repos: data["public_repos"],
        repos_url: data["repos_url"]
    }
    if(data.message) {
        console.log(`Usuario ${name} não foi encontrado`)
    } else {
        listUser.push(newUser)
        console.log(` Novo Usuario add com sucesso:  ${newUser}`)
    }
}

async function getUserInfo(name:string) {
    await getUserGithub(name)
    const response = await fetch(`https://api.github.com/users/${name}/repos`)
    const data = await response.json()
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
    console.log(`Lista de Usuarios total: ${listStringUsers}`)
}

function getTotalRepos():void {
    let totalRepos:number = 0
    listUser.forEach(element => {
        totalRepos += element.public_repos
    })
    console.log(`Numero total de REPOS: ${totalRepos}`)
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
    console.log(`Lista do TOPFIVE:\n 
                 Name(1): ${topFive.first[0]} | NumberRepos: ${topFive.first[1]}\n
                 Name(2): ${topFive.second[0]} | NumberRepos: ${topFive.second[1]}\n
                 Name(3): ${topFive.third[0]} | NumberRepos: ${topFive.third[1]}\n
                 Name(4): ${topFive.fourth[0]} | NumberRepos: ${topFive.fourth[1]}\n
                 Name(5): ${topFive.fifth[0]} | NumberRepos: ${topFive.fifth[1]}\n`)
}

async function exec() {
    await getUserInfo("camiloccarvalho")
    await getUserInfo("Kwynto")
    await getUserInfo("dirambora")
    await getUserInfo("jonangeles-sanchez")
    await getUserInfo("david-kariuki")

    showUsers()
    showTopFive()
    getTotalRepos()
}