import { request, type Data } from "./common";

export function orderList(data: Data) {
    return request("/customer_teacher/order", data)
}

export function orderListF(data: Data) {
    return request("/customer/finished_order", data)
}