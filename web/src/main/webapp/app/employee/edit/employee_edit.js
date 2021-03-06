/**
 */
(function (window, angular, $) {
    var app = angular.module('eccrm.base.employee.edit', [
        'eccrm.base.employee',
        'eccrm.angular',
        'base.org',
        'eccrm.directive.ztree',
        'eccrm.angularstrap'
    ]);
    app.controller('Ctrl', function ($scope, CommonUtils, EmployeeConstant, OrgTree, EmployeeService, AlertFactory) {
        // 性别
        EmployeeConstant.sex(function (data) {
            $scope.sex = data;
            $scope.sex.unshift({name: '请选择...'});
        });
        // 加载政治面貌
        EmployeeConstant.zzmm(function (data) {
            $scope.zzmm = data;
            $scope.zzmm.unshift({name: '请选择'});
        });

        $scope.employee = {
            status: "2",
            gender: "BP_MAN"
        };

        $scope.OrgztreeOptions = OrgTree.dynamicTree(function (node) {
            $scope.employee.orgId = node.id;
            $scope.employee.orgName = node.name;
        });
        //回到上一个页面
        $scope.back = CommonUtils.back;

        var type = $scope.pageType = $('#pageType').val();
        var id = $('#id').val();

        // 头像
        $scope.uploadOptions = {
            labelText: '头像',
            maxFile: 1,
            thumb: true,
            thumbWidth: 120,
            thumbHeight: 140,
            showTable: false,
            onSuccess: function (o) {
                var id = o.id;
                $('#imageId').html('<img style="height: 140px;width: 120px;" src="' + CommonUtils.contextPathURL('/attachment/temp/view?id=' + id) + '"/>');
                $scope.$apply(function () {
                    $scope.employee.attachmentIds = id;
                    $scope.employee.picture = id;
                });
            },

            onDelete: function () {
                $('#imageId').html('');
                $scope.employee.attachmentIds = null;
                $scope.employee.picture = null;
            },
            bid: id,
            swfOption: {
                fileSizeLimit: 10 * 1000 * 1000,
                fileTypeExts: "*.png;*.jpg"
            }
        };

        var validate = function () {
            if ($scope.employee.outer == true && !$scope.employee.company) {
                AlertFactory.error('如果是“外协人员”，请指定班组!');
                return false;
            }
            return true;
        };
        // 移除头像
        $scope.removePicture = function () {
            $scope.uploadOptions.removeAll();
            $scope.employee.picture = null;
        };

        //保存
        $scope.save = function () {
            if (validate()) {
                var promise = EmployeeService.save($scope.employee, function (data) {
                    $scope.form.$setValidity('committed', false);
                    AlertFactory.success('保存成功!');
                    CommonUtils.addTab('update');
                    CommonUtils.delay($scope.back, 2000);
                });
                CommonUtils.loading(promise);
            }
        };


        //更新
        $scope.update = function () {
            if (validate()) {
                var promise = EmployeeService.update($scope.employee, function (data) {
                    $scope.form.$setValidity('committed', false);
                    AlertFactory.success('更新成功!');
                    CommonUtils.addTab('update');
                    CommonUtils.delay($scope.back, 2000);
                });
                CommonUtils.loading(promise);
            }
        };
        var originalName;
        var load = function (id, callback) {
            var promise = EmployeeService.get({id: id}, function (data) {
                $scope.employee = data.data || [];
                originalName = $scope.employee.extensionNumber;
                $scope.employee.organization = {
                    id: $scope.employee.organizationId,
                    name: $scope.employee.organizationName
                };

                // 头像
                var imageId = $scope.employee.picture;
                if (imageId) {
                    $('#imageId').html('<img style="height: 140px;width: 120px;" src="' + CommonUtils.contextPathURL('/attachment/view?id=' + imageId) + '"/>');
                }
                angular.isFunction(callback) && callback();
            });
            CommonUtils.loading(promise);
        };
        if (type == 'add') {

        } else if (type == 'modify') {
            load(id);
        } else if (type == 'detail') {
            load(id, function () {
                $('input,textarea,select').attr('disabled', 'disabled');
            });
        }
    });
})(window, angular, jQuery);