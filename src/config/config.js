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
    clarityID: import.meta.env.VITE_CLARITY_ID
}