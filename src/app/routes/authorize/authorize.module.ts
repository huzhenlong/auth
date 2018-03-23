import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

// list,detail
import { AuthorizeListComponent } from "./authorize-list/authorize-list.component";

// service
import { CommonService } from "@core/services/common.service";

import {CommonMessage} from "@core/services/common-message.service";
import { AuthorizeSearchComponent } from './authorize-search/authorize-search.component';
import { AuthorizeApiService } from './api.service';


const routes
    : Routes = [
    {path: '', redirectTo: 'authorize-list'},
    {path: 'authorize-list', component: AuthorizeListComponent},
    {path: 'authorize-search', component: AuthorizeSearchComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AuthorizeListComponent,
        AuthorizeSearchComponent,
    ],
    providers: [
        AuthorizeApiService,
        CommonService,
        CommonMessage,
    ],
    exports: [RouterModule]
})

export class AuthorizeModule {}

