import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Globals } from '../../../globals';

@Component({
    selector: 'crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.less']
})
export class CrudComponent implements OnInit {
    cph:           Array<any> = [];

    sideToResetRight:  string;
    sideToResetLeft:   string;
    prevDir:           string;

    constructor(private globals: Globals) {         
        this.cph = [
            {name: 'Gardin\'s', 
            xXx: [{
                    type: 'Shark week', 
                    link: 'https://www.youtube.com/watch?v=o3uJCCa5w2A'
                }
            ]},
            {name: 'BOONGA\'s',   
            xXx: [{
                    type: 'MOAI',  
                    link: 'https://www.youtube.com/shorts/ExHIeR_drZY' 
                },
                {
                    type: 'MOAI 2',  
                    link: 'https://www.youtube.com/shorts/fBiFr1QzVmg' 
                },
            ]},
            {name: 'Gnäll\'s', 
            xXx: [{
                    type: 'Whining', 
                    link: 'https://www.youtube.com/watch?v=6KvtfMPUunQ'
                }
            ]},
            {name: 'Jotun\'s', 
            xXx: [{
                    type: 'Live Concert', link: 'https://www.youtube.com/watch?v=c_jomXhjUjI'
                }
            ]}
        ];
    }
    
    ngOnInit() {
    }

    newSide(activeSide: string, next: string, dir: string) {
        if(dir === 'right') {
            if(this.prevDir !== 'right') {
                if(next !== 'front')
                    $('.front').css({'transform-origin': 'left', 'transform': 'translateX(100%) rotateY(90deg)'});

                if(next !== 'right')
                    $('.right').css({'transform-origin': 'left', 'transform': 'translateX(100%) rotateY(90deg)'});

                if(next !== 'back')
                    $('.back').css({'transform-origin':  'left', 'transform': 'translateX(100%) rotateY(90deg)'});

                if(next !== 'left')
                    $('.left').css({'transform-origin':  'left', 'transform': 'translateX(100%) rotateY(90deg)'});
            }

            if(this.sideToResetRight) {
                $('.' + this.sideToResetRight).css({'transform-origin': 'left', 'transform': 'translateX(100%) rotateY(90deg)'});
            }
    
            $('.' + activeSide).css({'transform-origin': 'right', 'transform': 'translateX(-100%) rotateY(90deg)'});
            $('.' + next).css({'transform-origin': 'right', 'transform': 'translateX(0) rotateY(0)'});
    
            this.sideToResetRight = activeSide;
        }
        else if(dir === 'left') {
            if(this.prevDir !== 'left') {
                if(next !== 'front')
                    $('.front').css({'transform-origin': 'right', 'transform': 'translateX(-100%) rotateY(90deg)'});

                if(next !== 'right')
                    $('.right').css({'transform-origin': 'right', 'transform': 'translateX(-100%) rotateY(90deg)'});

                if(next !== 'back')
                    $('.back').css({'transform-origin':  'right', 'transform': 'translateX(-100%) rotateY(90deg)'});

                if(next !== 'left')
                    $('.left').css({'transform-origin':  'right', 'transform': 'translateX(-100%) rotateY(90deg)'});
            }

            if(this.sideToResetLeft) {
                $('.' + this.sideToResetLeft).css({'transform-origin': 'right', 'transform': 'translateX(-100%) rotateY(90deg)'});
            }
    
            $('.' + activeSide).css({'transform-origin': 'left', 'transform': 'translateX(100%) rotateY(90deg)'});
            $('.' + next).css({'transform-origin': 'left', 'transform': 'translateX(0) rotateY(0)'});
    
            this.sideToResetLeft = activeSide;    
        }

        this.prevDir = dir;
    }
}
