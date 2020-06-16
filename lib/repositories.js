import 'isomorphic-fetch'

export async function getRepositories(){

  const response = await fetch('https://api.github.com/orgs/rocketseat/repos')
  const repositoriesJSON = await response.json()
  console.log(repositoriesJSON)
  return repositoriesJSON.toString()
}