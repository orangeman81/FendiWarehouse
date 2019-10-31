export class DataState<T> {

    constructor(
        public data: T[],
        public total: number,
        public page: number,
        public query?: string,
        public loaded?: boolean
    ) { }

}