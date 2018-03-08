const OPERATION = [{
    "text": "",
    "group": true,
    "children": [
        {
            "text": "平台",
            "translate": "平台",
            "icon": "anticon anticon-appstore-o",
            "link": "/privilege/platform-list",
            "children": [
                {
                    "text": "平台列表",
                    "translate": "平台列表",
                    "link": "/privilege/platform-list",
                    "children": [

                    ]
                },
                /*{
                    "text": "平台详情",
                    "translate": "平台详情",
                    "link": "/privilege/platform-detail",
                    "children": [

                    ]
                },*/
                /*{
                    "text": "权限列表",
                    "translate": "权限列表",
                    "link": "/privilege/privilege-list",
                    "children": [

                    ]
                },*/
            ]
        },
        {
            "text": "权限",
            "translate": "权限",
            "icon": "anticon anticon-solution",
            "link": "/authorize/authorize-list",
            "children": [
                {
                    "text": "权限列表",
                    "translate": "权限列表",
                    "link": "/authorize/authorize-list",
                    "children": [

                    ]
                },
            ]
        }
    ]
}];

export const CONF = {
    "app": {
        "name": "MFW",
        "description": "Operation Platform"
    },
    "user": {
        "name": "mfw-user",
        "avatar": "./assets/img/logo_gonglve_v6.png",
        "email": "xxx@mfw.com"
    },
    "menu": OPERATION
};
