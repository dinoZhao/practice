!function(a,b) {
  "function"==typeof
  define&&(define.amd||define.cmd)?define(function() {
    return b(a)
  }):b(a,!0)
  }(this,function(a,b) {
  function c(b,c,d) {
    a.WeixinJSBridge?WeixinJSBridge.invoke(b,e(c),function(a) {
      h(b,a,d)
    }):k(b,d)
    }  function d(b,c,d) {
    a.WeixinJSBridge?WeixinJSBridge.on(b,function(a) {
      d&&d.trigger&&d.trigger(a),h(b,a,c)
    }):d?k(b,d):k(b,c)
    }  
    function e(a) {
    return a=a||
             {},a.appId=D.appId,a.verifyAppId=D.appId,a.verifySignType="sha1",a.verifyTimesta
                                            mp=D.timestamp+"",a.verifyNonceStr=D.nonceStr,a.verifySignature=D.signature,a
  }
  function f(a) {
    return
    { timeStamp:a.timestamp+"",nonceStr:a.nonceStr,"package":a["package"],paySign:a.p
aySign,signType:a.signType||"SHA1"
    }
  }  function g(a) {
    return
    a.postalCode=a.addressPostalCode,delete
                 a.addressPostalCode,a.provinceName=a.proviceFirstStageName,delete
                     a.proviceFirstStageName,a.cityName=a.addressCitySecondStageName,delete
                         a.addressCitySecondStageName,a.countryName=a.addressCountiesThirdStageName,delet
                             e a.addressCountiesThirdStageName,a.detailInfo=a.addressDetailInfo,delete
                                 a.addressDetailInfo,a
  }  function h(a,b,c) {
    "openEnterpriseChat"==a&&(b.errCode=b.err_code),delete b.err_code,delete
    b.err_desc,delete b.err_detail;    var d=b.errMsg;    d||(d=b.err_msg,delete
        b.err_msg,d=i(a,d),b.errMsg=d),c=c|| {},c._complete&&(c._complete(b),delete
                                         c._complete),d=b.errMsg||"",D.debug&&!c.isInnerInvoke&&alert(JSON.stringify(b));
    var e=d.indexOf(":"),f=d.substring(e+1);    switch(f) {
    case"ok":
    c.success&&c.success(b);      break;    case"cancel":
    c.cancel&&c.cancel(b);      break;    default:      c.fail&&c.fail(b)
    }
    c.complete&&c.complete(b)
  }  function i(a,b) {
    var c=a,d=q[c];    d&&(c=d);
    var e="ok";    if(b) {
      var f=b.indexOf(":");
      e=b.substring(f+1),"confirm"==e&&(e="ok"),"failed"==e&&(e="fail"),-
        1!=e.indexOf("failed_")&&(e=e.substring(7)),-
        1!=e.indexOf("fail_")&&(e=e.substring(5)),e=e.replace(/_/g,"
            "),e=e.toLowerCase(),("access denied"==e||"no permission to
                                  execute"==e)&&(e="permission denied"),"config"==c&&"function not
                 exist"==e&&(e="ok"),""==e&&(e="fail")
    }    return b=c+":"+e
  }  function j(a)
{ if(a) {
      for(var b=0,c=a.length; c>b; ++b) {
        var d=a[b],e=p[d];
        e&&(a[b]=e)
      }      return a
    }
  }  function k(a,b) {
    if(!(!D.debug||b&&b.isInnerInvoke)) {
      var c=q[a];
      c&&(a=c),b&&b._complete&&delete b._complete,console.log('"'+a+'",',b||"")
    }
  }  function l(a) {
    if(!(v||w||D.debug||"6.0.2">A||C.systemType<0)) {
      var
      b=new Image;      C.appId=D.appId,C.initTime=B.initEndTime-
                                B.initStartTime,C.preVerifyTime=B.preVerifyEndTime-
      B.preVerifyStartTime,I.getNetworkType({isInnerInvoke:!0,success:function(a) {
        C.networkType=a.networkType;        var
        c="https://open.weixin.qq.com/sdk/report?v="+C.version+"&o="+C.isPreVerifyOk+"&s
          ="+C.systemType+"&c="+C.clientVersion+"&a="+C.appId+"&n="+C.networkType+"&i="+C.
          initTime+"&p="+C.preVerifyTime+"&u="+C.url;        b.src=c
      }
                                                                          })
    }
  }  function m() {
    return(new Date).getTime()
  }  function n(b) {
    x&&(a.WeixinJSBridge?b():r.addEventListener&&r.addEventListener("WeixinJSBridgeR
        eady",b,!1))
  }  function o() {
    I.invoke||(I.invoke=function(b,c,d) {
      a.WeixinJSBridge&&WeixinJSBridge.invoke(b,e(c),d)
    },I.on=function(b,c) {
      a.WeixinJSBridge&&WeixinJSBridge.on(b,c)
    })
  }  if(!a.jWeixin) {
    var p=
    { config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAp
pMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:
"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePre
view",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid"
,addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayReque
st",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"st
artMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:
"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddr
      ess"
    },q=function() {
      var a= {};      for(var b in p)a[p[b]]=b;      return
      a
    }(),r=a.document,s=r.title,t=navigator.userAgent.toLowerCase(),u=navigator.platf
                                 orm.toLowerCase(),v=!(!u.match("mac")&&!u.match("win")),w=-
                                     1!=t.indexOf("wxdebugger"),x=-1!=t.indexOf("micromessenger"),y=-
                                         1!=t.indexOf("android"),z=-1!=t.indexOf("iphone")||-
    1!=t.indexOf("ipad"),A=function() {
      var
      a=t.match(/micromessenger\/(\d+\.\d+\.\d+)/)||t.match(/micromessenger\/(\d+\.\d+
                                                                             )/);      return a?a[1]:""
    }(),B=
    {initStartTime:m(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},C=
    { version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,sy
stemType:z?1:y?2:-1,clientVersion:A,url:encodeURIComponent(location.href)
    },D=
    {},E= {_completes:[]},F= {state:0,data:{}};    n(function() {
      B.initEndTime=m()
    });    var G=!1,H=[],I=
    { config:function(a) {
        D=a,k("config",a); var b=D.check===!1?!1:!0; n(function() {
if(b)c(p.config, {verifyJsApiList:j(D.jsApiList)},function() {
            E._complete=function(a)
            {B.preVerifyEndTime=m(),F.state=1,F.data=a},E.success=function(a)
            {C.isPreVerifyOk=0},E.fail=function(a) {
              E._fail?E._fail(a):F.state=-
              1
            };          var a=E._completes;          return a.push(function() {
              l()
            }),E.complete=function(b) {
              for(var c=0,d=a.length; d>c; ++c)a[c]();
              E._completes=[]
            },E
          }()),B.preVerifyStartTime=m();        else {
            F.state=1;          for(var a=E._completes,d=0,e=a.length; e>d; ++d)a[d]();
            E._completes=[]
          }
        }),D.beta&&o()
},ready:function(a){0!=F.state?a():(E._completes.push(a),!x&&D.debug&&a())},erro
r:function(a) {
        "6.0.2">A||(-
                    1==F.state?a(F.data):E._fail=a)
},checkJsApi:function(a) {
        var b=function(a) {
          var b=a.checkResult;        for(var c in b) {
            var d=q[c];
            d&&(b[d]=b[c],delete b[c])
          }        return a
        };
        c("checkJsApi", {jsApiList:j(a.jsApiList)},function() {
          return
          a._complete=function(a) {
            if(y) {
              var c=a.checkResult;
              c&&(a.checkResult=JSON.parse(c))
            } a=b(a)
          },a
        }())
},onMenuShareTimeline:function(a) {
        d(p.onMenuShareTimeline, {complete:function() {
          c("shareTimeline",
          { title:a.title||s,desc:a.title||s,img_url:a.imgUrl||"",link:a.link||location.hre
f,type:a.type||"link",data_url:a.dataUrl||""
          },a)
        }
                                 },a)
},onMenuShareAppMessage:function(a) {
        d(p.onMenuShareAppMessage, {complete:function
        () {
          c("sendAppMessage",
          { title:a.title||s,desc:a.desc||"",link:a.link||location.href,img_url:a.imgUrl||"
",type:a.type||"link",data_url:a.dataUrl||""
          },a)
        }
                                   },a)
},onMenuShareQQ:function(a) {
        d(p.onMenuShareQQ, {complete:function() {
          c("shareQQ",
          { title:a.title||s,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.hre
            f
          },a)
        }
                           },a)
},onMenuShareWeibo:function(a) {
        d(p.onMenuShareWeibo, {complete:function() {
          c("shareWeiboApp",
          { title:a.title||s,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.hre
            f
          },a)
        }
                              },a)
},onMenuShareQZone:function(a) {
        d(p.onMenuShareQZone, {complete:function() {
          c("shareQZone",
          { title:a.title||s,desc:a.desc||"",img_url:a.imgUrl||"",link:a.link||location.hre
            f
          },a)
        }
                              },a)
},startRecord:function(a){c("startRecord",{},a)},stopRecord:function(a) {
        c("stopR
          ecord", {},a)
},onVoiceRecordEnd:function(a){d("onVoiceRecordEnd",a)},playVoice:fu
nction(a){c("playVoice",{localId:a.localId},a)},pauseVoice:function(a) {
        c("pauseV
          oice", {localId:a.localId},a)
},stopVoice:function(a) {
        c("stopVoice", {localId:a.loc
                        alId
                       },a)
},onVoicePlayEnd:function(a){d("onVoicePlayEnd",a)},uploadVoice:function
      (a) {
        c("uploadVoice", {localId:a.localId,isShowProgressTips:0==a.isShowProgressTip
                          s?0:1
                         },a)
},downloadVoice:function(a) {
        c("downloadVoice", {serverId:a.serverId,isSh
                            owProgressTips:0==a.isShowProgressTips?0:1
                           },a)
},translateVoice:function(a) {
        c("tr
          anslateVoice", {localId:a.localId,isShowProgressTips:0==a.isShowProgressTips?0:1}
          ,a)
},chooseImage:function(a) {
        c("chooseImage", {scene:"1|2",count:a.count||9,sizeT
                          ype:a.sizeType||["original","compressed"],sourceType:a.sourceType||["album","cam
                              era"]
        },function() {
          return a._complete=function(a) {
            if(y) {
              var b=a.localIds;            b&&(a.localIds=JSON.parse(b))
            }
          },a
        }())
},getLocation:function(a){},previewImage:function(a) {
        c(p.previewImage, {current:a
                           .current,urls:a.urls
                          },a)
},uploadImage:function(a) {
        c("uploadImage", {localId:a.loc
                          alId,isShowProgressTips:0==a.isShowProgressTips?0:1
                         },a)
},downloadImage:function(
        a) {
        c("downloadImage", {serverId:a.serverId,isShowProgressTips:0==a.isShowProgress
                            Tips?0:1
                           },a)
},getLocalImgData:function(a) {
        G===!1?(G=!0,c("getLocalImgData", {loca
                                           lId:a.localId
        },function() {
          return a._complete=function(a) {
            if(G=!1,H.length>0) {
              var b=H.shift();
              wx.getLocalImgData(b)
            }
          },a
        }())):H.push(a)
},getNetworkType:function(a) {
        var b=function(a) {
          var b=a.errMsg;
          a.errMsg="getNetworkType:ok";        var c=a.subtype;        if(delete
              a.subtype,c)a.networkType=c;        else {
            var
            d=b.indexOf(":"),e=b.substring(d+1);          switch(e) {
            case"wifi":
            case"edge":          case"wwan":            a.networkType=e;            break;
            default:            a.errMsg="getNetworkType:fail"
            }
          }
          return a
        }; c("getNetworkType", {},function() {
          return
          a._complete=function(a) {a=b(a)},a
        }())
},openLocation:function(a) {
        c("openLocation", {latitude:a.latitude,longitude:a.lon
                           gitude,name:a.name||"",address:a.address||"",scale:a.scale||28,infoUrl:a.infoUrl
                           ||""
                          },a)
},getLocation:function(a) {
        a=a|| {},c(p.getLocation, {type:a.type||"wgs84"}
        ,function() {
          return a._complete=function(a) {delete a.type},a
        }())
},hideOptionMenu:function(a){c("hideOptionMenu",{},a)},showOptionMenu:function(a
                                                                              ){c("showOptionMenu",{},a)},closeWindow:function(a) {
        a=a|| {},c("closeWindow", {},a
                  )
},hideMenuItems:function(a){c("hideMenuItems",{menuList:a.menuList},a)},showMen
uItems:function(a){c("showMenuItems",{menuList:a.menuList},a)},hideAllNonBaseMen
uItem:function(a){c("hideAllNonBaseMenuItem",{},a)},showAllNonBaseMenuItem:funct
ion(a){c("showAllNonBaseMenuItem",{},a)},scanQRCode:function(a) {
        a=a|| {},c("scanQ
                   RCode", {needResult:a.needResult||0,scanType:a.scanType||["qrCode","barCode"]},fu
        nction() {
          return a._complete=function(a) {
            if(z) {
              var b=a.resultStr;            if(b) {
                var c=JSON.parse(b);
                a.resultStr=c&&c.scan_code&&c.scan_code.scan_result
              }
            }
          },a
        }())
},openAddress:function(a) {
        c(p.openAddress, {},function() {
          return a._complete=function(a) {a=g(a)},a
        }())
},openProductSpecificView:function(a) {
        c(p.openProductSpecificView, {pid:a.product
                                      Id,view_type:a.viewType||0,ext_info:a.extInfo
                                     },a)
},addCard:function(a) {
        for(var
            b=a.cardList,d=[],e=0,f=b.length; f>e; ++e) {
          var g=b[e],h=
          {card_id:g.cardId,card_ext:g.cardExt};        d.push(h)
        }
        c(p.addCard, {card_list:d},function() {
          return a._complete=function(a) {
            var b=a.card_list;          if(b) {
              b=JSON.parse(b);
              for(var c=0,d=b.length; d>c; ++c) {
                var e=b[c];
                e.cardId=e.card_id,e.cardExt=e.card_ext,e.isSuccess=e.is_succ?!0:!1,delete
                                             e.card_id,delete e.card_ext,delete e.is_succ
              }
              a.cardList=b,delete a.card_list
            }
          },a
        }())
},chooseCard:function(a) {
        c("chooseCard", {app_id:D.appId,location_id:a.shopId||""
                         ,sign_type:a.signType||"SHA1",card_id:a.cardId||"",card_type:a.cardType||"",card
                         _sign:a.cardSign,time_stamp:a.timestamp+"",nonce_str:a.nonceStr
        },function() {
          return a._complete=function(a) {
            a.cardList=a.choose_card_info,delete
                       a.choose_card_info
          },a
        }())
},openCard:function(a) {
        for(var
            b=a.cardList,d=[],e=0,f=b.length; f>e; ++e) {
          var g=b[e],h=
          {card_id:g.cardId,code:g.code};        d.push(h)
        }
        c(p.openCard, {card_list:d},a)
},consumeAndShareCard:function(a) {
        c(p.consumeAndSha
          reCard, {consumedCardId:a.cardId,consumedCode:a.code},a)
},chooseWXPay:function(a)
      {c(p.chooseWXPay,f(a),a)},openEnterpriseRedPacket:function(a) {
        c(p.openEnterprise
        RedPacket,f(a),a)
},startSearchBeacons:function(a) {
        c(p.startSearchBeacons, {
          ticket
:a.ticket
        },a)
},stopSearchBeacons:function(a){c(p.stopSearchBeacons,{},a)},onSear
chBeacons:function(a){d(p.onSearchBeacons,a)},openEnterpriseChat:function(a) {
        c("openEnterpriseChat", {useridlist:a.userIds,chatname:a.groupName},a)
      }
    },J=1,K= {};    return r.addEventListener("error",function(a) {
      if(!y) {
        var b=a.target,c=b.tagName,d=b.src;
        if("IMG"==c||"VIDEO"==c||"AUDIO"==c||"SOURCE"==c) {
          var e=-
                1!=d.indexOf("wxlocalresource://");          if(e) {
            a.preventDefault(),a.stopPropagation();            var f=b["wx-id"];
            if(f||(f=J++,b["wx-id"]=f),K[f])return;            K[f]=!0,wx.ready(function() {
              wx.getLocalImgData({localId:d,success:function(a) {
                b.src=a.localData
              }
                                 })
            })
          }
        }
      }
    },!0),r.addEventListener("load",function(a) {
      if(!y) {
        var b=a.target,c=b.tagName;        b.src;
        if("IMG"==c||"VIDEO"==c||"AUDIO"==c||"SOURCE"==c) {
          var d=b["wx-id"];
          d&&(K[d]=!1)
        }
      }
    },!0),b&&(a.wx=a.jWeixin=I),I
  }
});
