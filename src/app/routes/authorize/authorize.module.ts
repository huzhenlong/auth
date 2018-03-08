import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

// list,detail
import { AuthorizeListComponent } from "./authorize-list/authorize-list.component";

// service
import { CommonService } from "@core/services/common.service";

import { AuthorizeListService } from "./authorize-list/authorize-list.service";
import {CommonMessage} from "@core/services/common-message.service";


const routes
    : Routes = [
    {path: '', redirectTo: 'authorize-list'},
    {path: 'authorize-list', component: AuthorizeListComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AuthorizeListComponent,
    ],
    providers: [
        CommonService,
        AuthorizeListService,
        CommonMessage
    ],
    exports: [RouterModule]
})

export class AuthorizeModule {}

