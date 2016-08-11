	angular.module("app",[])


	.controller('MyCtrl',function($scope) {
		$scope.pet=$petdc.data;
	
		$scope.imgdata=$petdc.imgdata;
		$scope.imgsmall=$petdc.imgsmall;
		$scope.imgdatawidth=$petdc.width;
		$scope.petname = $petdc.selfdata.petdata == null ? $petdc.petname : $petdc.selfdata.petdata.name;
		$scope.logo="img/logo.png";
		$scope.showdetailimg = function (s) {

		    // $(".smallist").click(function () { alert(1); $(this).addClass("active").siblings().removeClass("active"); })
		    debugger;
		    $scope.imgdata = s.petimages;
		    $petdc.imgdata = s.petimages;
		    $scope.pet = s;
		    $scope.pet.petsex = $scope.pet.petsex == 0 ? "公" : "母";
		    $scope.pet.bridthday = $scope.pet.petdate + "月";
		    $scope.pet.name = $scope.pet.user.name;
		    $scope.pet.phone = $scope.pet.user.phone;
		    $petdc.data = $scope.pets;

			console.log(s);
		}

		$(function () {
		    $petdc.lib.getuser(function (data) {
		        $petdc.selfdata = data;
		        
		    })
		    $petdc.lib.getsmaillimgs(function (data) {
		      
		        $petdc.smailimgdata = data;
		        $petdc.imgsmall = data.data;
		        $scope.imgsmall = $petdc.imgsmall;

		        $scope.showdetailimg(data.data[2]);

		        $scope.$apply();

		    }, $petdc.index + 1, 15);
		    
		})
		

		
		// body...
	})

	.controller('InPutInfo',function($scope){
		
	    $scope.myimgs = $petdc.myimgs;

	    $scope.submit = function () {
	        alert($scope.pet.pettype + "" + $scope.pet.petsex);

	    }
	

	    $scope.pet = { pettype: "中华田园犬", petsex: "sex", bridthday: "bridthday", weigth: "weigth", location: "location", petname: "nikename", master: "master", phone: "phone" },
		
		$scope.pet.pettype = "中华田园犬";
	    $scope.pet.petsex = "母";
	    $scope.pet.bridthday="2016/06/01";
	    $scope.pet.weight="10";
	    $scope.pet.arear="hangz";
	    $scope.pet.petname = "米雪";
	    $scope.pet.master="sue";
	    $scope.pet.phone="15558008200";
	    $scope.pet.info = "雪纳瑞";
	    $scope.selected = '';

	    $scope.sextype = [{ "type": 0, "sex": "公" }, { "type": 1, "sex": "母" }]
        
		$scope.dogtype = [];
		$(function () {
		    $petdc.lib.getdogtype(function (data) {
		        $scope.dogtype = data.data;
		        $scope.$apply();
		    })

		})

		$scope.pet.bridthday = new Date()

		
		
	

		$scope.back=function(){
			alert(1);
		}
	     $scope.addimg=function () {
		        //alert(1);
		        $img.capturePhotoUrl();
		    }
		  

		
		var $img = {
		    capturePhotoUrl: function () {

		        navigator.camera.getPicture($img.onSUccess, function (data) { alert(data) },
                    {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                        allowEdit: true,
                        targetWidth: 500,
                        targetHeight: 500,

                    })
		    },
		    capturecameraUrl: function () {
		        navigator.camera.getPicture($img.onSUccess, function (data) { alert(data) },
                    {
                        quality: 50,
                        destinationType: Camera.DestinationType.FILE_URI,
                        sourceType: Camera.PictureSourceType.CAMERA,

                        targetWidth: 500,
                        targetHeight: 500,

                    })
		    },
		    onSUccess: function (imgUrl) {




		        if ($scope.myimgs.length < 9) {
		            $img.uploadajax({
		                method: "post",
		                fileKey: "file",
		                fileURL: imgUrl,
		                success: function (data) {
		                    $scope.myimgs.push(data.response.data);
		                    $scope.$apply();
		                } 
		            })
		            
		        }
		        else {

		            alert("最多九张第一张是封面");
		        }

		    },
		    uploadajax: function (options) {

		        var _ksuccess = options.success;
		        var _kerror = options.erro;
		        var ksuccess = function (data) {
		      
		            if (_ksuccess) {
		                try {
		                    if (typeof data.response == "string") {
		                        data.response = JSON.parse(data.response);
		                    }
		                    _ksuccess(data);
		                } catch (e) {
		                    _ksuccess(data);
		                }
		            }

		        }
		        if (_ksuccess) { delete options.success }
		        var kerror = function (data) {
		        
		            if (_kerror) {
		                _kerror(data);
		            }
		        }
		        if (_kerror) { delete options.erro }

		        if (!options.fileURL) {
		            throw "Not FileURL or URL";
		        }
		        var uri = "http://dcpet.zibr.cn/file/file/uploadfile" 
		        delete options.url;
		        var fileURL = options.fileURL;
		        delete options.fileURL;
		        var fileKey = (options.fileKey) ? options.fileKey : "file";
		        var method = (options.method) ? options.method : "post";
		        if (options.fileKey) { delete options.fileKey }
		        if (options.method) { delete options.method; }
		        //上传参数
		        var _options = new FileUploadOptions();
		        _options.fileKey = fileKey;
		        _options.fileName = "pet.jpg";
		        //_options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
		        _options.mimeType = "text/plain";
		        _options.httpMethod = method;
		        if (options.data && typeof options.data == "object") {
		            _options.params = options.data;
		        } else {
		            _options.params = options;
		        }
		        //上传类
		        var ft = new FileTransfer();
		        ft.onprogress = function (progressEvent) {
		            if (progressEvent.lengthComputable) {
		                var progress = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
		                //$.afui.showMask('上传' + progress + '%');
		            } else {
		              //  $.afui.showMask('上传完成');
		                //loadingStatus.increment();//未知
		            }
		        };
		        ft.upload(fileURL, uri, ksuccess, kerror, _options);
		    }

		}
		


	})


	var $petdc = {
        dogdata:[],
	    smailimgdata:{},
        index:0,
	    selfdata:{},
	    lib:new Object(),
	    uuid: "",
	    platform:"",
	    devicename:"",
		width:document.body.clientWidth-10,
		petname:"请补全自己宝贝资料（坐拥家里三枪）",
		imgsmall:[1,2,5,6,8,"fs"],
		myimgs:[],
		imgdata:["a","e","r"],
		data:{kind:"kid",sex:"sex",bridthday:"bridthday",weigth:"weigth",location:"location",nikename:"nikename",master:"master",phone:"phone"},
		login:function(data){
			console.log(data.name+data.pass);

		},

		urlhead: "http://dcpet.zibr.cn/api",

		ajax: function (option) {

		    option.url = this.urlhead + encodeURI(option.url) + "uuid=" + $petdc.uuid + "&platform=" + $petdc.platform + "&device="+$petdc.devicename;

		    var _beforeSend = option.beforeSend;

		    option.beforeSend = function (xhr) {
		      
		        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		        //xhr.setRequestHeader('safe_token', token);//请加token    
		        //xhr.setRequestHeader('uuid', $petdc.uuid);
		        //xhr.setRequestHeader('platform', $petdc.platform);
		        //xhr.setRequestHeader('device', $petdc.devicename);

		        if (_beforeSend != null) {
		            _beforeSend(xhr);
		        }
		    }

		    var _success = option.success;

		    option.success = function (data) {

		        if (data.status == 200) {
		            if (_success) { _success(data); }
		        }
		        else {

		            alert(data.error);
		        }
		       
		    }
		    $.ajax(option);

		},

	}

	function petmove(){
		//需要滑动的dom
		var dom,md,nab,actClass;
		var width,sp,ep,spY,lmd,nmd,rmd,right,maxmove,canmove,active;
		//dom1 触摸的DIV  md1做出相应的div  nab1 对应的nav classname需要给nav添加的class
		this.init=function(dom1,md1,nab1,classname)
		{
			var that=this;
			dom=dom1;
			md=md1;
			nab=nab1;
			actClass=classname;
			md=$(md1);
			width=parseInt(md.width());
			$(document).on("touchstart",dom,start);
			//dom=$(dom);
			
			maxmove=md.length-1;
			nmd=0;
			nextD(0);
		};



		var start=function(e){
			var that=this;
			if(active)return;
			e.preventDefault();

			
			//width=md.width();
			sp=e.originalEvent.targetTouches[0].clientX;
			spY=e.originalEvent.targetTouches[0].clientY;
			canmove=false;

			 $(dom).on("touchmove", touchmove);
             $(dom).on("touchend", touchend);

		};
		var touchmove=function(e){
			//var that=$move;
			if(active)return;
			var nowX=e.originalEvent.targetTouches[0].clientX;
			var nowY=e.originalEvent.targetTouches[0].clientY;
			ep=nowX-sp;
			var Y=nowY-spY;
			ep=parseInt(ep);
			
			if(Math.abs(ep)/Math.abs(Y)>2)canmove=true;

			if(canmove){
				//可以左右滑动了
				if(ep>0){
					md.eq(nmd).css("left", ep + "px");
                     md.eq(lmd).css("left", (ep - width) + "px");
				}
				else{
					md.eq(nmd).css("left", ep + "px");
                     md.eq(rmd).css("left", (ep + width) + "px");
				}
			}


			//that.next=that.ep>0? that.now-1:that.now+1;
			//if(next<0||that.next>that.maxmove) return;

			 
                //dom.css("left",  tpep + "px");
		};
		var touchend=function(e){
			var that=this;
			$(dom).off("touchmove",touchmove);
			$(dom).off("touchend",touchend);
			if(!canmove)return;
			active=true;

			if(ep>50)moveto(false);
			else if(ep<50)moveto(true);
			else{
		    var ndm=lmd;
			var wm=width;
			if(ep<0){wm=-width;ndm=rmd;}

				md.eq(ndm).animate({"left":wm+"px"},200);
				md.eq(nmd).animate({"left":"0px"},200,function(){active=false})

			}



			ep=0;


		};
		var nextD=function(ad,nd,callback){
			var that=this;
			var len=arguments.length;
			if(len==1){
				if(ad==0){lmd=maxmove;rmd=1}
				else if(ad==maxmove){lmd=ad-1;rmd=0}
				else{lmd=ad-1;rmd=ad+1}
			}
			else{
				if(ad>nd){lmd=nd;right=false;}
				else if(nd>ad){rmd=nd;right=true}
				else{that.nextD(ad);}

			}
			nmd=ad;
			md.hide();
			md.eq(nmd).css("left",0).show();
			if(lmd>=0)md.eq(lmd).css("left","-"+width+"px").show();
			if(rmd>=0)md.eq(rmd).css("left",width+"px").show();
			if(callback&&typeof(callback)=="function")callback();

		};
		var moveto=function(right){
			active=true;
			var that=this;
			var ndm=lmd;
			var wm=width;
			if(right){wm=-width;ndm=rmd;}

				md.eq(nmd).animate({"left":wm+"px"},200);
				md.eq(ndm).animate({"left":"0px"},200,function(){
					if(nab)nab.eq(ndm).addClass(actClass).siblings().removeClass(actClass);

					nextD(ndm);
					active=false;
				});
		};

	}

	$(function () {
		var imgdul=new petmove();
	imgdul.init(
		".detalimg",
		".imgul li",
		$(".imgpoint li"),
		"active"
	)

	// smimg.init(
	// 	".smallimg",
	// 	".smallimg>ul>li"
	// 	)
	})

	function clicksmall(dom) {
	   $(dom).addClass("active").siblings().removeClass("active");
	}






	