import { Component } from '@angular/core';
import { MenuService } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
    selector: 'header-icon',
    template: `
        <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" class="header-icon">
            <div class="item" nz-dropdown>
                <i class="anticon anticon-appstore-o"></i>
            </div>
            <div nz-menu class="wd-xl">
                <div nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
                    <div *ngFor="let p of apps" nz-col [nzSpan]="12"  class="app-icon" (click)="changePlatform(p.key)">
                        <i class="anticon bg-error text-white" [ngClass]="p.icon"></i>
                        <small>{{p.text}}</small>
                    </div>
                   
                </div>
            </div>
        </nz-dropdown>
    `
})
export class HeaderIconComponent {
    apps = [];

    constructor(private menu: MenuService,
                private router: Router) {

    }

}
