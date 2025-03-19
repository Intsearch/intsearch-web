import {fetchEventSource} from "@microsoft/fetch-event-source";

import {constants} from "@/config/config";
import {getConfig} from "@/utils/utils";

export default {
    search: async (kw, {onOpen, onMessage, onClose, onError}) => {
        if (!kw) {
            return null;
        }

        const prompt = kw.trim();
        if (!prompt) {
            return null;
        }

        try {
            const config = getConfig();
            if (config.search) {
                if (!config.search.key) {
                    config.search['key'] = '';
                }
                if (!config.search.cx) {
                    config.search['cx'] = '';
                }
            }
            if (!config.search) {
                config['search'] = {
                    key: '',
                    cx: ''
                };
            }

            await fetchEventSource(`${constants.baseUrl}/search`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify({
                    ...config,
                    q: prompt
                }),
                onopen: onOpen,
                onmessage: (res) => {
                    onMessage(JSON.parse(res.data));
                },
                onerror: (e) => {
                    throw e; // 取消请求，防止重试
                },
                onclose: onClose,
            });
        } catch (e) {
            onError(e);
        }
    },
    getConfig: async () => {
        try {
            const res = await fetch(`${constants.baseUrl}/config`, {
                method: 'POST'
            });
            if (!res.ok) {
                console.error(res);
                return false;
            }

            const data = await res.json();
            if (data.code !== 0) {
                return false;
            }

            return data.data;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};