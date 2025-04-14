declare const buildTimePlugin: () => {
    name: string
    transform(code: string): string | null
}

export default buildTimePlugin
