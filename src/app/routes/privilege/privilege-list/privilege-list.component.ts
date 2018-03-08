import {Component, OnInit} from "@angular/core";
import {Router, NavigationExtras} from "@angular/router";
import {CommonMessage} from "@core/services/common-message.service";
import {PrivilegeListService} from "./privilege-list.service";
import {NodeMenuItemAction, TreeModel} from "ng2-tree";

@Component({
    templateUrl: './privilege-list.component.html',
    styleUrls: ['./privilege-list.component.less']
})

export class PrivilegeListComponent implements OnInit {

    tableData: any[] = [
        {checked: false, id: 1, name: '目的地', plat: 'mdd', res: '/mobile/mdd/index', ope: 'create'},
        {checked: false, id: 2, name: '推送', plat: 'push', res: '/mobile/push/task', ope: 'delete'}
    ];
    tableTotal: any = 0;
    tableCurPage: any = 1;
    tableLoading = false;
    searchForm = {plat: ''};
    platList = [
        {name: '目的地', value: 'mdd'},
        {name: '推送', value: 'push'},
    ];
    opeList = [
        {name: '查看', value: 'get'},
        {name: '新建', value: 'create'},
        {name: '更新', value: 'put'},
        {name: '删除', value: 'delete'},
    ];
    isVisible = false;
    selectedRows: any[] = [];
    allChecked = false;
    indeterminate = false;
    public ffs: TreeModel = {
        value: '资源',
        id: 1,
        settings: {
            cssClasses: {
                expanded: 'fa fa-caret-down',
                collapsed: 'fa fa-caret-right',
                empty: 'fa fa-caret-right disabled',
                leaf: 'fa'
            },
            templates: {
                node: '<i class="fa fa-folder-o"></i>',
                leaf: '<i class="fa fa-file-o"></i>'
            },
        },
        children: [{value: '资源1', id: 2}, {value: '资源2', id: 3}]
    };


    constructor(private cm: CommonMessage, private ps: PrivilegeListService, private router: Router) {
    }

    ngOnInit() {
        this.getTableList();
    }

    editAuth(curData) {

    }

    cancel = function () {
    };


    delAuth(curData) {

    }


    getTableList(offset?: any, page?: any) {
        const that = this;
        const searchJson = Object.assign({offset: offset ? offset : 0, limit: 20}, this.searchForm);
        /*that.tableLoading = true;
        that.ps.getRuleList(searchJson).then(msg => {
            that.tableLoading = false;
            if (that.cm.checkSuccess(msg)) {
                const data = msg.data;
                that.tableTotal = data.total;
                that.tableCurPage = page ? page : 1;
                that.tableData = data.list;
            }
        });*/
    }

    search() {
        this.getTableList();
    }


    tablePageChange(e) {
        const that = this;
        const offset = (e - 1) * 50;
        that.getTableList(offset, e);
    }

    createAuth() {
        this.showModal();
    }

    handleOk() {

    }

    handleCancel = () => {
        this.resetModal();
        this.isVisible = false;
        return false;
    };

    showModal = () => {
        this.isVisible = true;
    };

    hideModal = () => {
        this.isVisible = false;
    };

    resetModal() {

    }

    platChange(val) {

    }

    checkAll(value: boolean) {
        this.tableData.forEach(i => {
            i.checked = value;
        });
        this.refreshStatus();
    }

    refreshStatus() {
        const allChecked = this.tableData.every(value => value.checked);
        const allUnChecked = this.tableData.every(value => !value.checked);
        this.allChecked = allChecked;
        this.indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.tableData.filter(value => value.checked);
    }

}
