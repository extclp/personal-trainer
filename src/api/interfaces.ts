export interface HomeData {
    address: string[];
    image: string[];
    announcement: string[];
    notice: {
        id: number;
        name: string;
        is_top: boolean;
    }[];
    academic_news: ({
        id: number;
        name: string;
        title: string;
        image: boolean;
    } | {
        id: number;
        name: boolean;
        title: string;
        image: boolean;
    })[];
    message: {
        username: string;
        message: string;
        time: string;
        image: boolean;
    }[];
}