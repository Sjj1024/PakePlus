/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.json' {
    const content: any
    export default content
}

declare module 'crypto-js' {
    const content: any
    export default content
}
