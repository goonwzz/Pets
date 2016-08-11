$petdc.lib = new petlib();
function petlib() {

    this.getuser = function (callback) {
        $petdc.ajax({
            url: "/user/data?",
            type: "get",
            success: function (data) {
                callback(data);
            }
        })
    }
    this.getsmaillimgs = function (callback, index, size) {
        var _index=1;
        var _size=10;
        if (index) _index = index;
        if (size) _size = size;

        $petdc.ajax({
            //pet?index=1&size=5&uuid=12345&device=iphone6s&platform=ios
            url: "/pet?index="+index+"&size="+size+"&",
            type: "get",
            success: function (data) {
                callback(data);
            }
        })
    }


    this.getdogtype = function (callback) {

        $petdc.ajax({
            //pet?index=1&size=5&uuid=12345&device=iphone6s&platform=ios
            url: "/common/pettype?type=0&",
            type: "get",
            success: function (data) {
                callback(data);
            }
        })
    }

    this.getcattype = function (callback) {

        $petdc.ajax({
            //pet?index=1&size=5&uuid=12345&device=iphone6s&platform=ios
            url: "/common/pettype?type=1&",
            type: "get",
            success: function (data) {
                callback(data);
            }
        })
    }

}