import { LayoutComponent } from '../layout/layout.component';

export const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'privilege', pathMatch: 'full'},
            {path: 'privilege', loadChildren: './privilege/privilege.module#PrivilegeModule'},
            {path: 'authorize', loadChildren: './authorize/authorize.module#AuthorizeModule'},
        ]
    },
];
