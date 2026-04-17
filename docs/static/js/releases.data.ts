export default {
    // get data from local
    async load() {
        const getReleases = await fetch(
            'https://api.github.com/repos/Sjj1024/PakePlus/releases',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            }
        )
        const data = await getReleases.json()
        console.log('getReleases data', JSON.stringify(data))
        return data
    },
}
