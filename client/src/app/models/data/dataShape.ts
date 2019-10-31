export interface DataShape<T> {
    content: T[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Object;
    size: number;
    sort: Object;
    totalElements: number;
    totalPages: number;
}