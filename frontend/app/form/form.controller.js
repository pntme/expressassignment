(function() {
    'use strict';
    angular.module('node')
        .controller('formCtrl', formCtrl);

    function formCtrl($scope, $http) {
        pagecall();

        function pagecall() {
            $http({
                    url: 'http://localhost:3000/userlist',
                    method: "GET",
                })
                .then(function(response) {
                        $scope.alluser = response.data.userlist;
                        $scope.name = "";
                        $scope.email1 = "";
                        $scope.newusername="";
                        $scope.newemail="";
                    },
                    function(response) {});
        }
        $scope.submit = function() {
            $http({
                    url: 'http://localhost:3000/adduser',
                    method: "POST",
                    data: {
                        'username': $scope.name,
                        'useremail': $scope.email1
                    }
                })
                .then(function(response) {
                        console.log(response)
                        pagecall();
                    },
                    function(response) {

                    });
        }
        $scope.deleteuser = function(object) {
            $http({
                url: 'http://localhost:3000/deleteuser',
                method: 'DELETE',
                data: {
                    id: object._id
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function(res) {
                console.log(res.data);
                pagecall();
            }, function(error) {
                console.log(error);
            });
        };
        var existingobj;
        $scope.edituser = function(object) {
            existingobj = object;
        }
        $scope.update = function() {
            $("#myModal").hide();
            $http({
                    url: 'http://localhost:3000/updateuser',
                    method: "PUT",
                    data: {
                        'id': existingobj._id,
                        'username': $scope.newusername,
                        'useremail': $scope.newemail
                    }
                })
                .then(function(response) {
                        console.log(response)
                        pagecall();
                    },
                    function(response) {

                    });
        }


    }

})();