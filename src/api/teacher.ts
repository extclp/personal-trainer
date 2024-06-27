import { request, type Data } from "./common";

export function orderPublic(data: Data) {
    return request('/order/list', data)
}

export function orderList(data: Data) {
    return request("/customer_teacher/order", data)
}

export function orderListF(data: Data) {
    return request("/customer/finished_order", data)
}

export interface OrderList {
    orders: {
        order_id: string;
        cost: boolean;
        teacher: boolean;
        status: string;
        subject: string;
        course_time: boolean;
    }[];
}

export interface OrderPublic {
    address: string[];
    search_list: {
        teachingCourse: string[];
        student: string[];
        teachingPosition: string[];
        teachingStyle: string[];
    };
    orders: {
        teaching_position: string;
        cost: boolean;
        student_sex: string;
        address: string;
        subject: string;
        course_time: boolean;
        request: string;
    }[];
}