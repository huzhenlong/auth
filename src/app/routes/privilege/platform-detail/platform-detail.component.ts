import {Component, OnInit, ViewChild} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

import {PlatformDetailService} from "./platform-detail.service";
import {MenuItemSelectedEvent, Ng2TreeSettings, NodeEvent, NodeMenuItemAction, TreeModel} from "ng2-tree";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonMessage} from "@core/services/common-message.service";

@Component({
    templateUrl: './platform-detail.component.html',
    styleUrls: ['./platform-detail.component.less']
})

export class PlatformDetailComponent implements OnInit {

    platInfo: any;
    public ffs: TreeModel;
    curNode: any;
    pathPrefix = '';
    public settings: Ng2TreeSettings = {
        rootIsVisible: true,
        showCheckboxes: false
    };
    isVisible = false;
    opeList = [];
    plat = {path: '', operations: null};
    form: FormGroup;
    @ViewChild('treeFFS') public treeFFS;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cm: CommonMessage,
                private _message: NzMessageService,
                private ds: PlatformDetailService,
                private _fb: FormBuilder) {
        this.form = this._fb.group({
            'path': ['', Validators.required],
            'operations': '',
        });
    }

    ngOnInit() {
        this.platInfo = this.route.snapshot.queryParams;
        this.getOpeList();
        this.ds.getPlatCon(this.platInfo.id).then(data => {
            if (this.cm.checkCode(data)) {
                this.initTree(data.data.content);
            }
        });
    }

    getOpeList() {
        this.ds.getOpeList().then(data => {
            this.opeList = data.data;
        });
    }

    initTree(con?: any) {
        if (con) {
            this.ffs = JSON.parse(con);
        } else {
            this.ffs = {
                id: this.platInfo['id'],
                value: this.platInfo['name'],
                'data-id': this.platInfo['res_id'],
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
                    menuItems: [
                        {action: NodeMenuItemAction.NewFolder, name: '添加父节点', cssClass: 'fa fa-folder-o'},
                        {action: NodeMenuItemAction.NewTag, name: '添加子节点', cssClass: 'fa fa-file-o'},
                        {action: NodeMenuItemAction.Rename, name: '重命名节点', cssClass: 'node-menu-item-icon rename'},
                        {action: NodeMenuItemAction.Remove, name: '删除节点', cssClass: 'node-menu-item-icon remove'},
                        {action: NodeMenuItemAction.Custom, name: '建权', cssClass: 'anticon anticon-api'}
                    ]
                },
                children: []
            };
        }

    }

    saveTree() {
        this.ds.updatePlat(this.platInfo.id, {content: JSON.stringify(this.ffs)});
    }

    onNodeRemoved(e: NodeEvent): void {
        this.curNode = e.node;
        this.ds.deleteAuth(this.curNode.node['data-id']).then(data => {
            if (this.cm.checkCode(data)) {
                this.cm.createMessage('success', '删除成功');
                this.arrRemoveById([this.ffs], this.getNodeId());
                this.saveTree();
                console.log(this.ffs);
            }
        });
    }

    onNodeRenamed(e: NodeEvent): void {
        this.curNode = e.node;
        this.arrUpdateNameById([this.ffs], this.getNodeId(), this.curNode.value);
        this.saveTree();
        console.log(this.ffs);
    }


    onNodeFFSCreated(e: NodeEvent): void {
        this.curNode = e.node;
        this.setPathPrefix();
        this.showModal();
    }

    setPathPrefix() {
        const nodeParent = this.curNode.parent;
        if (nodeParent) {
            const id = nodeParent.node['data-id'];
            this.ds.getAuth(id).then(data => {
                this.pathPrefix = data.data.path;
            });
        }
    }

    getPathPrefix() {
        return this.pathPrefix;
    }

    getParentId() {
        const nodeParent = this.curNode.parent;
        if (nodeParent) {
            return nodeParent.node['id'];
        }
    }
    getNodeId() {
       return this.curNode.id;
    }


    setPath(e) {
        const that = this;
        that.curNode = e.node;
        that.setPathPrefix();
        that.ds.getAuth(this.curNode.node['data-id']).then(data => {
            const str = data.data.path;
            const path = str.replace(that.getPathPrefix(), '');
            that.form.patchValue({path: path, operations: data.data.operations});
        });
        that.showModal();
    }

    handleOk() {
        const res_id = this.curNode.node['data-id'];
        if (res_id) {
            const authData = Object.assign(this.form.value,
                {path: this.getPathPrefix() + this.form.value.path});
            this.ds.updateAuth(res_id, authData).then(data => {
                if (this.cm.checkCode(data)) {
                    this.cm.createMessage('success', '更新成功');
                    this.saveTree();
                }
            });
        } else {
            const authData = Object.assign(this.form.value,
                {app_id: +this.platInfo.id, path: this.getPathPrefix() + this.form.value.path});
            this.ds.createAuth(authData).then(data => {
                if (this.cm.checkCode(data)) {
                    this.cm.createMessage('success', '创建成功');
                    this.curNode.node['data-id'] = data.data.resource_id;
                    this.arrAddChildById([this.ffs], this.getParentId(),
                        {
                            value: this.curNode.value,
                            id: this.curNode.id,
                            'data-id': this.curNode.node['data-id'],
                            children: []
                        });
                    this.saveTree();
                    console.log(this.ffs);
                }
            });
        }
        this.hideModal();
    }

    handleCancel = () => {
        this.resetModal();
        this.isVisible = false;
        const controller = this.treeFFS.getControllerByNodeId(this.curNode.id);
        if (controller && !this.curNode.node['data-id']) {
            controller.remove();
        }
        return false;
    };

    showModal = () => {
        this.isVisible = true;
    };

    hideModal = () => {
        this.isVisible = false;
        this.resetModal();
    };

    resetModal() {
        this.form.reset();
    }

    arrRemoveById(arr, id) {
        const that = this;
        return arr.filter(function (item, i) {
            if (item.children) {
                item.children = that.arrRemoveById(item.children, id);
            }
            return item.id !== id;
        });
    }

    arrAddChildById(arr, id, obj) {
        const that = this;
        arr.forEach(item => {
            if (item.id === id) {
                item.children.push(obj);
            } else {
                that.arrAddChildById(item.children, id, obj);
            }
        });
    }

    arrUpdateNameById(arr, id, name) {
        const that = this;
        arr.forEach(item => {
            if (item.id === id) {
                item.value = name;
            } else {
                that.arrUpdateNameById(item.children, id, name);
            }
        });
    }

}
