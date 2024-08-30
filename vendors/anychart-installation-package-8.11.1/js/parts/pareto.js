if(!_.pareto){_.pareto=1;(function($){var TT=function(a){$.Mr.call(this,a);this.i=[];this.f=[];this.ih=[];this.b=0},UT=function(a,b,c,d,e){$.vB.call(this,a,b,c,d,e)},WT=function(a,b,c){if($.n(c)&&-1<c){var d=null;a=a.data();$.n(a)&&(a=a.Rl(c),$.J(a,TT)||$.J(a,VT))&&(d={},d.cf=$.Wm(a.kD(c),2),d.rf=$.Wm(a.dH(c),2))}d&&(b.cf=d.cf,b.rf=d.rf)},VT=function(a){$.Mr.call(this,a)},XT=function(){$.UB.call(this);this.Ga("pareto");this.j=$.ht();this.j.uh(0).ei(100);this.re="pareto"},YT=function(a){if($.n(a.i)){var b=a.i;$.Gr(b);b=b.b;var c=a.zi(0),
d;c?d=c.bb():d=a.bb();d.uh(0);b?d.ei(b):d.ei(1)}},Qga=function(a,b){return $.Io(a)?$.Io(b)?-1:1:$.Io(b)?-1:b-a},Rga=function(a){var b=new XT;b.ta("defaultSeriesType","column");b.Wg();b.$c();b.data(a);return b};$.H(TT,$.Mr);$.g=TT.prototype;$.g.sa=1;$.g.ck=function(a,b,c){a=TT.u.ck.call(this,a,b,c);"value"==c&&(a=$.N(a),(0,window.isNaN)(a)||0>a)&&(a=0);return a};
$.g.xC=function(){this.i=[];this.f=[];this.ih=[];this.b=0;this.I(1);for(var a=this.$(),b;a.advance();)b=a.get("value"),this.ih.push(b),this.b+=b;if(this.ih.length)if(0==this.b)for(a=0;a<this.ih.length;a++)this.i[a]=0,this.f[a]=0;else for(this.i[0]=this.f[0]=100*this.ih[0]/this.b,a=1;a<this.ih.length;a++)this.i[a]=100*this.ih[a]/this.b,this.f[a]=this.f[a-1]+100*this.ih[a]/this.b;return null};$.g.NI=function(a){this.Bt=null;$.X(a,16)&&this.B(1,16)};$.g.kD=function(a){return this.f[a]};$.g.dH=function(a){return this.i[a]};
$.g.vj=function(a){return this.ih[a]};$.H(UT,$.vB);$.g=UT.prototype;$.g.mF={"%BubbleSize":"size","%RangeStart":"low","%RangeEnd":"high","%XValue":"x","%CF":"cf","%RF":"rf"};$.g.vm=function(a,b){var c=UT.u.vm.call(this,a,b),d=this.data(),e;$.n(d)&&$.n(c.index)&&-1<(e=Number(c.index.value))&&(d=d.Rl(e),$.J(d,TT)||$.J(d,VT))&&(c.cf={value:$.Wm(d.kD(e),2),type:"number"},c.rf={value:$.Wm(d.dH(e),2),type:"number"});return c};$.g.He=function(a,b){var c=UT.u.He.call(this,a,b);WT(this,c,c.index);return c};
$.g.Yi=function(a){a=UT.u.Yi.call(this,a);WT(this,a,a.index);return a};$.g.be=function(a){var b=UT.u.be.call(this,a);WT(this,b,a);return b};$.H(VT,$.Mr);VT.prototype.ck=function(a,b,c){return"value"==c?this.de.kD(b):VT.u.ck.call(this,a,b,c)};VT.prototype.kD=function(a){return this.de.kD(a)};VT.prototype.dH=function(a){return this.de.dH(a)};$.H(XT,$.UB);
XT.prototype.data=function(a,b){if($.n(a)){if(a){var c=a.title||a.caption;c&&this.title(c);a.rows&&(a=a.rows)}if(this.XI!==a){this.XI=a;$.pd(this.dm);$.J(a,$.Fr)?this.de=this.dm=a.Ui():$.J(a,$.Pr)?this.de=this.dm=a.Yd():this.de=(this.dm=new $.Pr($.A(a)||$.z(a)?a:null,b)).Yd();this.ka();this.i&&$.nr(this.i,this.dd,this);$.pd(this.i);this.i=new TT(this.de.sort("value",Qga));$.L(this.i,this.dd,this);YT(this);c=this.zi(0);var d=this.zi(1);this.K&&$.pd(this.K);this.K=this.i.Ui();c||(c=this.column());c.data(this.K);
this.P&&$.pd(this.P);this.P=new VT(this.i);d||(d=this.line().clip(!1).Db(!0).bb(this.j));d.data(this.P);this.da(!0)}return this}return this.i};XT.prototype.dd=function(a){$.X(a,16)&&YT(this)};var ZT={},$T=$.WG|7864320;ZT.area={Fb:1,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH,$.sH,$.NH,$.IH,$.AH,$.vH,$.OH,$.JH,$.PH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};ZT.bar={Fb:6,Kb:2,Lb:[$.WH,$.vH,$.DH,$.PH,$.FH,$.JH,$.KH,$.OH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};
ZT.box={Fb:3,Kb:2,Lb:[$.WH,$.vH,$.LP,$.MP,$.NP],Ob:null,Jb:null,Cb:$T,Ab:"highest",zb:"lowest"};ZT.bubble={Fb:4,Kb:2,Lb:[$.yH,$.zH,$.CH,$.EH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"value"};ZT.candlestick={Fb:5,Kb:2,Lb:[$.FH,$.JH,$.KH,$.OH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};ZT.column={Fb:6,Kb:2,Lb:[$.WH,$.vH,$.DH,$.PH,$.FH,$.JH,$.KH,$.OH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};ZT["jump-line"]={Fb:19,Kb:2,Lb:[$.tH,$.LH,$.GH,$.uH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"value"};
ZT.stick={Fb:20,Kb:2,Lb:[$.tH,$.LH,$.GH,$.uH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};ZT.line={Fb:8,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"value"};ZT.marker={Fb:9,Kb:2,Lb:[$.WH,$.vH,$.DH,$.PH,$.FH,$.JH,$.KH,$.OH],Ob:null,Jb:null,Cb:$.WG|3670016,Ab:"value",zb:"value"};ZT.ohlc={Fb:10,Kb:2,Lb:[$.GH,$.LH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};ZT["range-area"]={Fb:11,Kb:1,Lb:[$.sH,$.VH,$.RH,$.vH,$.QH,$.UH,$.xH,$.wH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};
ZT["range-bar"]={Fb:12,Kb:2,Lb:[$.WH,$.vH,$.SH,$.TH,$.xH,$.wH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};ZT["range-column"]={Fb:12,Kb:2,Lb:[$.WH,$.vH,$.SH,$.TH,$.xH,$.wH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};ZT["range-spline-area"]={Fb:13,Kb:1,Lb:[$.sH,$.RH,$.VH,$.vH,$.QH,$.UH,$.xH,$.wH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};ZT["range-step-area"]={Fb:14,Kb:1,Lb:[$.sH,$.vH,$.RH,$.VH],Ob:null,Jb:null,Cb:$T,Ab:"high",zb:"low"};
ZT.spline={Fb:15,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"value"};ZT["spline-area"]={Fb:16,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH,$.sH,$.NH,$.IH,$.AH,$.vH,$.OH,$.JH,$.PH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};ZT["step-area"]={Fb:17,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH,$.sH,$.NH,$.IH,$.AH,$.vH,$.OH,$.JH,$.PH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"zero"};ZT["step-line"]={Fb:18,Kb:1,Lb:[$.tH,$.MH,$.HH,$.BH],Ob:null,Jb:null,Cb:$T,Ab:"value",zb:"value"};XT.prototype.fj=ZT;$.Nz(XT,XT.prototype.fj);
$.g=XT.prototype;$.g.Ft=function(a,b){return new UT(this,this,a,b,!0)};$.g.xA=function(){return $.dt};$.g.tD=function(){return["Pareto chart xScale","ordinal"]};$.g.jH=function(){return 3};$.g.MM=function(){return["Pareto chart yScale","scatter","linear, log"]};$.g.rs=function(){return[this]};$.g.fD=function(){return["value","CF","RF"]};$.g.I4=function(a,b,c){b=c.ma();c=this.i.Rl(b);a[1]=c.vj(b);a[2]=c.kD(b);a[3]=c.dH(b)};$.g.ob=function(){this.J(131072)&&YT(this);XT.u.ob.call(this)};
$.g.Qh=function(a){this.J(131072)&&YT(this);return XT.u.Qh.call(this,a)};$.g.N1=function(){return this.Ra()};$.g.R=function(){$.ud(this.i,this.de,this.dm,this.K,this.P);this.P=this.K=this.dm=this.de=this.i=null;$.pd(this.j);this.j=null;XT.u.R.call(this)};$.g.F=function(){var a=XT.u.F.call(this);$.n(this.data())&&(a.chart.data=this.data().F());return a};$.g.Wg=function(a){XT.u.Wg.call(this,a);this.ij(1).scale()||this.ij(1).scale(this.j)};
$.g.U=function(a,b){XT.u.U.call(this,a,b);b&&this.ij(1).scale(this.j);"data"in a&&this.data(a.data)};var aU=XT.prototype;aU.data=aU.data;aU.xScale=aU.Ra;aU.yScale=aU.bb;aU.crosshair=aU.mh;aU.xGrid=aU.im;aU.yGrid=aU.km;aU.xMinorGrid=aU.Nr;aU.yMinorGrid=aU.Qr;aU.xAxis=aU.Zh;aU.getXAxesCount=aU.sD;aU.yAxis=aU.ij;aU.getYAxesCount=aU.uD;aU.getSeries=aU.ff;aU.lineMarker=aU.Xm;aU.rangeMarker=aU.fn;aU.textMarker=aU.ln;aU.palette=aU.cc;aU.markerPalette=aU.Mf;aU.hatchFillPalette=aU.ve;aU.getType=aU.Ma;
aU.addSeries=aU.jl;aU.getSeriesAt=aU.zi;aU.getSeriesCount=aU.tj;aU.removeSeries=aU.xo;aU.removeSeriesAt=aU.Qn;aU.removeAllSeries=aU.Cp;aU.getPlotBounds=aU.cg;aU.xZoom=aU.Sq;aU.yZoom=aU.Tq;aU.xScroller=aU.Lp;aU.yScroller=aU.Rr;aU.getStat=aU.Rg;aU.annotations=aU.Lk;aU.getXScales=aU.uy;aU.getYScales=aU.wy;$.Wp.pareto=Rga;$.F("anychart.pareto",Rga);}).call(this,$)}
