import {Component, OnInit} from "@angular/core";
import {Router, NavigationExtras} from "@angular/router";
import {PlatformListService} from "./platform-list.service";
import {HttpClient} from "@angular/common/http";
import {CommonMessage} from "@core/services/common-message.service";
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
    templateUrl: './platform-list.component.html',
    styleUrls: ['./platform-list.component.less']
})

export class PlatformListComponent implements OnInit {

    searchParams: any = {
        platId: '',
    };
    plat = {name: '', desc: '', path: ''};
    loading = false;
    isVisible = false;
    isUpdate = false;
    addButton = [{id: '__add_button'}];
    list: any[] = [];
    cache: any[] = [];
    form: FormGroup;

    constructor(private api: PlatformListService,
                private http: HttpClient,
                private cm: CommonMessage,
                private router: Router,
                private _fb: FormBuilder) {
        this.form = this._fb.group({
            'name': ['', Validators.required],
            'path': ['', Validators.required],
            'desc': '',
        });
    }

    ngOnInit() {
        this.getPlatList();
    }

    handleOk() {
        this.isVisible = false;
        if (this.isUpdate) {
            this.api.updatePlat(this.plat['id'], this.plat).then(data => {
                this.cm.createMessage('success', '更新成功');
                this.getPlatList();
            });
        } else {
            this.api.createPlat(this.form.value).then(data => {
                this.cm.createMessage('success', '创建成功');
                this.getPlatList();
            });
        }
    }

    handleCancel() {
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
    }

    createPlat() {
        this.isUpdate = false;
        this.resetPlat();
        this.show();
    }

    editPlat(plat) {
        this.isUpdate = true;
        this.plat = plat;
        this.form.patchValue(plat);
        this.show();
    }

    resetPlat() {
        this.form.reset();
    }

    deletePlat(id) {
        this.api.deletePlat(id).then(data => {
            if (data.code === 0) {
                this.cm.createMessage('success', '删除成功');
                this.getPlatList();
            }
        });
    }

    getPlatList() {
        this.api.getPlatList().then(data => {
            console.log(data);
            this.list = this.addButton.concat(data.data);
            this.cache = data.data;
        });
    }

    getUpdateTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm');
    }


    search(val) {
        if (!val) {
            this.list = this.addButton.concat(this.cache);
        } else {
            this.list = this.addButton.concat(this.cache.filter(item => {
                if (item.name) {
                    return item.name.includes(val);
                }
            }));
        }
    }

    go(item) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: item.id,
                name: item.name,
                res_id: item.resource_id
            }
        };
        this.router.navigate(['/privilege/platform-detail'], navigationExtras);
    }
}
