import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => dashboard, * => stores, * => warehouse, * => movements, * => error, * => login, * => callback', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' }),
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease', style({ left: '0%' }))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ]);

export const childAnimation =
  trigger('childRouteAnimations', [
    transition('* => list, * => details, * => assign', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ top: '-100vh' }),
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease', style({ top: '100vh', opacity: "0" }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease', style({ top: '0vh', opacity: "1" }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);