export const constants = {
    configTemplate: {
        ai: {
            base: {
                provider: '',
                model: '',
                key: ''
            },
            thinking: {
                provider: '',
                model: '',
                key: ''
            }
        },
        search: {
            key: '',
            cx: ''
        }
    },
    baseUrl: import.meta.env.VITE_API_ENDPOINT,
}