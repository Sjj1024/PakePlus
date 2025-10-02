export default {
    // get data from local
    async load() {
        return (
            await fetch(
                'https://api.github.com/repos/Sjj1024/PakePlus/releases',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28',
                    },
                }
            )
        ).json()
    },
}
