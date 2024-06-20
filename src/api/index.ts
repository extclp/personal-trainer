import { request, type Data } from "@/api/common";

export function home() {
    return request("/home")
}

export function rolling(data: Data) {
    return request("/rolling", data)
}

export function news(data: Data) {
    return request("/academic/titles", data)
}

export function search(data: Data) {
    return request("/search", data)
}


// ======= 登录 =======
export function login(data: Data) {
    return request("/quick_login",data)
}

export function sendCode(data: Data) {
    return request("/mobile", data)
}

export function logout(data: Data) {
    return request("/logout", data)
}

// ======= 老师 =======
export function teacherRegister(data: Data) {
    return request("/teacher", data)
}

export function teacherUpdate(data: Data) {
    return request("/edit/teacher", data)
}

export function teacherArticles(data: Data) {
    return request("/getone2all", data)
}

export function finishedOrder(data: Data) {
    return request("/myfinishedorder", data)
}

export function orders(data: Data) {
    return request("/myorder", data)
}


// ======= 留言 =======
export function messageList(data: Data) {
    return request("/mymessage", data)
}

export function messageSend(data: Data) {
    return request("/leavingmessage", data)
}


// ======= 我的 =======
export function detailManual(data: Data) {
    return request("/manual/detail", data)
}

export function detailFee(data: Data) {
    return request("/fee/detail", data)
}

// ======= 收藏 =======
export function collect(data: Data) {
    return request("/my/like", data)
}

export function collectArticle(data: Data) {
    return request("/academic/like", data)
}