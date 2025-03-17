import {useEffect, useState} from "react";

import {constants} from '../config/config';

export function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const onResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return size;
}

export interface useCopyToClipboardProps {
    timeout?: number
}

export function useCopyToClipboard({timeout = 2000}: useCopyToClipboardProps) {
    const [isCopied, setIsCopied] = useState<Boolean>(false)

    const copyToClipboard = (value: string) => {
        if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
            return
        }

        if (!value) {
            return
        }

        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true)

            setTimeout(() => {
                setIsCopied(false)
            }, timeout)
        })
    }

    return {isCopied, copyToClipboard}
}

export function isJsonFilled(obj: any): boolean {
    if (obj === null || obj === undefined) return false; // 直接排除 null 和 undefined

    if (typeof obj === "string") return obj.trim() !== ""; // 字符串不能是空
    if (typeof obj === "number" || typeof obj === "boolean") return true; // 数字和布尔值始终有效

    if (Array.isArray(obj)) return obj.length > 0 && obj.every(isJsonFilled); // 数组不能是空，并且所有元素都有效

    if (typeof obj === "object") {
        const keys = Object.keys(obj);
        if (keys.length === 0) return false; // 空对象无效
        return keys.every(key => isJsonFilled(obj[key])); // 递归检查所有值
    }

    return false; // 其他情况都视为空
}

export function validateJsonStructure(template: any, target: any): boolean {
    if (typeof template !== "object" || typeof target !== "object" || template === null || target === null) {
        return false; // 结构不对，直接返回 false
    }

    return Object.keys(template).every(key => {
        if (!(key in target)) return false; // 目标 JSON 缺少模板中的 key

        const templateValue = template[key];
        const targetValue = target[key];

        if (typeof templateValue === "object" && !Array.isArray(templateValue)) {
            // 递归检查嵌套对象
            return validateJsonStructure(templateValue, targetValue);
        } else {
            // 其他类型：不能是空值
            return isJsonFilled(targetValue);
        }
    });
}

export function validateConfig(config: any): boolean {
    return validateJsonStructure(constants.configTemplate, config);
}

export function setConfig(config: object | null) {
    if (!config) {
        localStorage.setItem('config', null);
    } else {
        localStorage.setItem('config', JSON.stringify(config));
    }
}

export function getConfig(): object {
    return JSON.parse(localStorage.getItem('config') || '{}');
}