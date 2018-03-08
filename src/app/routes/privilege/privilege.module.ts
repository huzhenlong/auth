import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

// list,detail
import { PlatformListComponent } from "./platform-list/platform-list.component";
import { PlatformDetailComponent } from "./platform-detail/platform-detail.component";
import { PrivilegeListComponent } from "./privilege-list/privilege-list.component";

// service
import { CommonService } from "@core/services/common.service";

import { PlatformListService } from "./platform-list/platform-list.service";
import { PlatformDetailService } from "./platform-detail/platform-detail.service";
import { PrivilegeListService } from "./privilege-list/privilege-list.service";
import {CommonMessage} from "@core/services/common-message.service";
import {ReactiveFormsModule} from "@angular/forms";

const routes
: Routes = [
    {path: '', redirectTo: 'platform-list'},
    {path: 'platform-list', component: PlatformListComponent},
    {path: 'platform-detail', component: PlatformDetailComponent},
    {path: 'privilege-list', component: PrivilegeListComponent},
];

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PlatformListComponent,
        PlatformDetailComponent,
        PrivilegeListComponent
    ],
    providers: [
        CommonService,
        CommonMessage,
        PlatformListService,
        PlatformDetailService,
        PrivilegeListService
    ],
    exports: [RouterModule]
})

export class PrivilegeModule {}
