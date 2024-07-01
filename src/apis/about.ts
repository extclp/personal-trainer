import { request } from "@/api/common";

export function fee() {
    return request('/fee/detail')
}

export function manual() {
    return request("/manual/detail")
}

export interface About {
    "time": string,
    "title": string
    "content": string
}