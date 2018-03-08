import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { StartupService } from './core/services/startup.service';
import { LocalStorageService } from './core/services/localStorage.service';

import { DefaultInterceptor } from '@core/net/default.interceptor';

// i18n
import { I18NService } from './core/i18n/i18n.service';
import { ALAIN_I18N_TOKEN } from '@delon/theme';

import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
registerLocaleData(localeZhHans);



export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        CoreModule,
        LayoutModule,
        RoutesModule,
        // i18n
        TranslateModule.forRoot({
            useDefaultLang: true
        })
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'zh-Hans'},
        {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        {provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false},
        {provide: APP_BASE_HREF, useValue: '/'},
        LocalStorageService,
        // 本地缓存
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
