import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

import { Ng2TreeSettings, NodeMenuItemAction, TreeModel } from "ng2-tree";
import { PrivilegeListService } from "../../privilege/privilege-list/privilege-list.service";
import { CommonMessage } from "@core/services/common-message.service";
import { isArray } from "util";
import { FormGroup } from "@angular/forms";
import { AuthorizeApiService } from '../api.service';

@Component({
    templateUrl: './authorize-list.component.html',
    styleUrls: ['./authorize-list.component.less']
})

export class AuthorizeListComponent implements OnInit {

    public ffs: TreeModel;
    public settings: Ng2TreeSettings = {
        rootIsVisible: true,
        showCheckboxes: false
    };
    @ViewChild('treeFFS') public treeFFS;
    tableData: any[] = [];
    userAuthData: any[] = [];
    platList = [];
    selPlat = '';
    uid = '';
    userId = '';
    userList = [
        {name: '用户1', value: '1'},
        {name: '用户2', value: '2'},
        {name: '用户3', value: '3'},
        {name: '用户4', value: '4'},
        {name: '用户5', value: '5'},
    ];
    isVisible = false;
    selectedRows: any[] = [];
    _allChecked = false;
    _displayData: Array<any> = [];
    _indeterminate = false;

    _displayDataChange($event) {
        this._displayData = $event;
    }

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.tableData.filter(value => value.checked);
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => data.checked = true);
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }

    constructor(private cm: CommonMessage, private as: AuthorizeApiService, private router: Router) {
    }

    ngOnInit() {
        this.getPlatList();
    }


    handleOk() {
        const data = {uid: this.uid, auth: this.getAuthIds()};
        this.as.authToUser(data).then(msg => {
            if (this.cm.checkCode(msg)) {
                this.cm.createMessage('success', '授权成功');
                this._checkAll(false);
            }
        });
        this.handleCancel();
    }

    handleCancel = () => {
        this.resetModal();
        this.isVisible = false;
        return false;
    }

    showModal = () => {
        this.isVisible = true;
    }

    hideModal = () => {
        this.isVisible = false;
    }

    resetModal() {
        this.uid = '';
    }


    accredit() {
        this.showModal();
    }

    getAuthIds() {
        const arr = [];
        this.selectedRows.forEach(row => {
            arr.push(row.auth_id);
        });
        return arr;
    }

    treeNodeSel(e) {
        const id = e.node.node['data-id'];
        this.getTableList(id);
    }

    changePlat(id) {
        this.platList.forEach(plat => {
            if (plat.content === '') {
                this.cm.createMessage('info', '该平台暂无权限');
            }
            if (plat.id === id) {
                const content = JSON.parse(plat.content);
                content['settings']['rightMenu'] = false;
                this.ffs = content;
                this.getTableList(content['data-id']);
            }
        });
    }

    getPlatList() {
        this.as.getPlatList().then(data => {
            if (this.cm.checkCode(data)) {
                this.platList = data.data;
                this.selPlat = this.platList[0].id;
                this.changePlat(this.selPlat);
                const content = this.platList[0].content;
                if (content) {
                    const id = JSON.parse(content)['data-id'];
                    this.getTableList(id);
                }
            }
        });
    }

    getTableList(id) {
        this.as.getAuth(id).then(msg => {
            if (this.cm.checkCode(msg)) {
                this.tableData = msg.data;
            }
        });
    }

    cancel = function () {
    };


}
