declare module 'edge.js' {
    export default {
        registerViews: (path: string) => any,
        render: (template: string, data: any = {}) => any
    };
}
