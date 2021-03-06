angular.module('http_engine', ['ngRoute']).service('http', function($http) {
    this.post = function(path, _data, cb) {
        $http({
            url: path,
            method: 'POST',
            data: _data
        }).then(function(res_data) {
            cb(null, res_data.data);
        }, function(err) {
            cb(err, null);
        });
    };
    this.get = function(path, _data, cb) {
        if (_data == {}) {
            _data = null;
        }
        $http({
            url: path,
            method: 'GET',
            data: _data
        }).then(function(res_data) {
            cb(null, res_data.data);
        }, function(err) {
            cb(err, null);
        });
    };
    this.delete = function(path, _data, cb) {
        if (_data == {}) {
            _data = null;
        }
        $http({
            url: path + '?' + data,
            method: 'DELETE',
        }).then(function(res_data) {
            cb(null, res_data.data);
        }, function(err) {
            cb(err, null);
        });
    };
});
