export default function buildTimePlugin() {
    return {
        name: 'build-time-plugin',
        config: () => {
            var currentTime = new Date()
            var year = currentTime.getFullYear()
            var month = String(currentTime.getMonth() + 1).padStart(2, '0')
            var day = String(currentTime.getDate()).padStart(2, '0')
            var hours = String(currentTime.getHours()).padStart(2, '0')
            var minutes = String(currentTime.getMinutes()).padStart(2, '0')
            var seconds = String(currentTime.getSeconds()).padStart(2, '0')
            var formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            return {
                define: {
                    'import.meta.env.BUILD_TIME': JSON.stringify(formattedTime),
                },
            }
        },
    }
}
