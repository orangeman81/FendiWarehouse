import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Action } from './action';

export abstract class Store<T> {
    ////////////////////////////////////////// LEGEND ///////////////////////////////////////////////
    /// $ at the end = Subject /// $ at the beginning = Obsrvable /// S at the end = Subscription ///
    /////////////////////////////////////////////////////////////////////////////////////////////////
    private state$: BehaviorSubject<T>;
    public $state: Observable<T>;

    private actions$: Subject<Action>;
    public $actions: Observable<Action>;

    protected constructor(inistialState: T) {
        this.state$ = new BehaviorSubject<T>(inistialState);
        this.$state = this.state$.asObservable();
        this.actions$ = new Subject<Action>();
        this.$actions = this.actions$.asObservable();
    }

    get state() {
        return this.state$.getValue();
    }

    set state(next: T) {
        this.state$.next(next);
    }

    public dispatch(next: Action): void {
        this.actions$.next(next);
    }
}
