'use strict';

angular.module('app')
    .controller('DialogSaveRequestCtrl', ['$scope', '$mdDialog', '$rester', 'isNew', 'collection', 'title', 'showHistoryWarning',
        function ($scope, $mdDialog, $rester, isNew, collection, title, showHistoryWarning) {

            let collections = null;

            function getFilteredCollections(query) {
                if (!query) return collections;

                let lowercaseQuery = angular.lowercase(query);
                return collections.filter(c => angular.lowercase(c).indexOf(lowercaseQuery) > -1);
            }

            $scope.isNew = isNew;
            $scope.collection = collection;
            $scope.title = title;
            $scope.overwrite = true;
            $scope.showHistoryWarning = showHistoryWarning;

            $scope.queryCollections = function (query) {
                if (collections === null) {
                    return $rester.getRequestCollections().then(result => {
                        collections = result;

                        return getFilteredCollections(query);
                    });
                } else {
                    return getFilteredCollections(query);
                }
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function () {
                $mdDialog.hide({
                    collection: $scope.collection,
                    title: $scope.title,
                    overwrite: $scope.overwrite
                });
            };

        }
    ]);
