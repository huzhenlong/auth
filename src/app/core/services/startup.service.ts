import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { I18NService } from '../i18n/i18n.service';
import { LocalStorageService } from './localStorage.service';
import { CONF } from '@core/conf/config';


/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(private menuService: MenuService,
                private i18n: I18NService,
                private settingService: SettingsService,
                private aclService: ACLService,
                private titleService: TitleService,
                private httpClient: HttpClient,
                private injector: Injector,
                private local: LocalStorageService) {
    }

    load(): Promise<any> {

        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            const res = CONF;
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(res.user);
            this.settingService.setLayout('theme', 'B');
            // ACL：设置权限为全量
            this.aclService.setFull(true);

            // 初始化菜单
            this.menuService.add(res.menu);
            // i18n：设置默认语言
            this.i18n.use('zh-CH');
            // 设置页面标题的后缀
            this.titleService.suffix = res.app.name;

            resolve(res);

        });
    }
}

