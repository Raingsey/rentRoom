import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-picture-blog',
  templateUrl: './picture-set.component.html',
  styleUrls: ['./picture-set.component.scss'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateY(100%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
                ])
            ]
        ),
        trigger('slideIn', [
            state('*', style({ 'overflow-y': 'auto', 'overflow-x': 'hidden' })),
            state('void', style({ 'overflow-y': 'auto', 'overflow-x': 'hidden' })),
            transition('* => void', [
                style({ height: '*' }),
                animate(250, style({ height: 0 }))
            ]),
            transition('void => *', [
                style({ height: '0' }),
                animate(250, style({ height: '*' }))
            ])
        ])
    ]
})
export class PictureBlogComponent implements OnInit {

    @Input() set_title = '';
    @Input() bg_color = 'rgba(0,0,0,0.04)';
    @Input() border_color = '0d1120';
    showContent = true;
    constructor() { }

    ngOnInit() {
    }
    toggleContent() {
        this.showContent = !this.showContent;
    }


}
