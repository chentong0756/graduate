 ;(function(){
//登陆函数
var username;
$("body").on("click","#login",function(){
	var login={
			userName:$(".username").val(),
			password:$(".password").val()
		}
		username=$(".username").val();
		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/login",
	 		type:"POST",	
	 		dataType:"json",  
	 		data:login,
			success: function (data) {
					if (data.code == "200")
					{
						//console.log($(".identity input:checked").val());
						$.ajax({	
					 		url:"http://yiranblade.cn/lbms/login/"+username,
					 		type:"GET",	
					 		dataType:"json",
					 		success:function(data){
					 			if(data.code=="200")
					 			{ 	
					 				//console.log(data);
					 				if((data.data.power=="admin") && ($(".identity input:checked").val()=="管理员")){
					 					self.location="admin.html?id="+data.data.userId;
					 				}
					 				else if((data.data.power=="student") && ($(".identity input:checked").val()=="学生")){
					 					self.location="student.html?id="+data.data.userId;
					 				}
					 				else if((data.data.power=="teacher") && ($(".identity input:checked").val()=="教师")){
					 					self.location="teacher.html?id="+data.data.userId;
					 				}
					 				else
					 					alert("用户信息和身份并不匹配哦");
					 			}
					 			else{
					 				alert("错误发生了");
					 			}
					 		}
				 		});	
					}
					if (data.code == "400")
					{
						alert("信息格式错误");
					}
					if(data.code == "501")
					{
						alert("客观慢点呦-您的请求过于频繁");
					}
					if(data.code == "500")
					{
						alert("用户名或密码输入错误");
					}
					if(data.code == "502")
					{
						alert("用户名或密码输入错误");
					}
				},
			error:function(){
				alert("用户名或密码输入错误");
			}
		});
	});
//获取调转页面后传入的参数
 var url = location.search;
 if (url.indexOf("?") != -1){
 	var begin=url.indexOf("=");
 	username=url.substr(begin+1,8);
 }
//通过实验id获取实验名称
function ajaxgetitemname(itemid){
	var itemname;
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item/"+itemid,
	 		type:"GET",	
	 		async:false,
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				//console.log(data.data.itemname);
	 				itemname=data.data.itemname;
	 			}
	 			else{
	 				alert("错误发生了");
	 			}
	 		}
 		});	
	return itemname;
}
//通过教师id获取教师姓名
function ajaxgetteaname(teaid){
	var teaname;
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/"+teaid,
	 		type:"GET",	
	 		async:false,
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				//console.log(data.data.itemname);
	 				teaname=data.data.name;
	 			}
	 			else{
	 				alert("错误发生了");
	 			}
	 		}
 		});	
	return teaname;
}

 //学生管理模块
 //学生管理-个人信息组件
 var PersonInformation=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Studentpassword/>,  document.getElementById("info_student"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PersonInformation">
	 			<div className="title">
	     		 个人信息
	    		</div>
			    <div id="information">
			    	<ul className="teacher_infor">
		    			<li><span>学号 :</span><span>{result.numid}</span></li>
		    			<li><span>姓名 :</span><span>{result.name}</span></li>
		    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
		    			<li><span>专业 :</span><span>{result.specialization}</span></li>
		    			<li><span>年级 :</span><span>{result.grade}</span></li>
		    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
  //学生管理-修改密码
 var Studentpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			numId:username,
  		}
  		console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/student",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Studentpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
//学生管理-查看公告
 var PublicInformation=React.createClass({
 	handleClick:function(e){
 		if(e.target.textContent=="阅读全文")
 		{
 			e.target.parentNode.className="whole";
 		 	e.target.textContent="收起";
 		}
 		else
 		{	
 			e.target.parentNode.className="half";	
 			e.target.textContent="阅读全文";
 		}
 	},
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PublicInformation">
 				<div className="title">
	     		 查看公告
	    		</div>
 				<ul>
 					{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i} className="half">
		    						{result.noticecontent}
					    			<span className="deploy" onClick={this.handleClick}>阅读全文</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
 				</ul>
 			</div>
 		)
 	}
 });

//学生管理-查看已预约实验
 var OrderTestok=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	getgrade:function(batid){
  		//console.log(batid);
  		//点击获取成绩
  		 $.ajax({	
	 		url:"http://yiranblade.cn/lbms/test/"+batid+"&"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				if(data.data.results!=null)
	 					alert(data.data.results);
	 				else
	 					alert("成绩还未录入,请耐心等待");
	 			}
	 			else{
	 				alert("成绩还未录入,请耐心等待");
	 			}
	 		},
	 		error:function(){
	 			alert("成绩还未录入,请耐心等待");
	 		}
 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="OrderTestok">
 				<div className="title">
	     		 查看已预约实验
	    		</div>
 				<ul className="student_infor">
 					<li><span>批次编号</span><span className="stu_item">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span><span>成绩</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="stu_item">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
		    						<span className="getgrade" onClick={(event)=>{event.stopPropagation(),this.getgrade(result.batid);}}>获取成绩</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
 				</ul>
 			</div>
 		)
 	}
 });
  //学生管理-预约实验
 var OrderTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	orderclick:function(batid,okid){
  		//预约实验不能同时预约同一项实验
 		var test={
 			batid:batid,
 			numid:username
 		}
 		var j=0;
 		//console.log(JSON.stringify(test));
 		//获取到该学生已经预约的实验id
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				for(var i=0;i<data.data.length;i++)
	 				{
	 					//console.log(data.data[i].itemid);
	 					//判断此时预约的实验id是否存在，若存在则不能继续预约
	 					if(data.data[i].itemid==okid)
	 						j=1;
	 				}
	 				if(j==0)
	 				{
	 					//不存在则发送请求，预约成功
		 				$.ajax({	
					 		url:"http://yiranblade.cn/lbms/batch/student/"+batid+"&"+username,
					 		type:"PUT",	
					 		dataType:"json", 
					 		"contentType":"application/json",  
					 		data:JSON.stringify(test),
					 		success:function(data){
					 			if(data.code=="200")
					 			{
					 				alert("预约成功");
					 			}
					 			else{
					 				alert("预约失败");
					 			}
					 		},
					 		error:function(){
					 			alert("批次编号信息不存在");
					 		}
				 		});
				 	}
				 	else{
				 		alert("你不能同时预约同一项实验哦");
				 	}
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});		
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="OrderTest">
 				<div className="title">
	     		 	预约实验
	    		</div>
	    		<h4>这里是全部项目批次:</h4>
	    		<ul className="admin_infor" id="posit">
	    			<li><span>批次编号</span><span className="it_name">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">预约</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.orderclick(result.batid,result.itemid); } } className="stu_delete">预约</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

$(".stuent_infor").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PersonInformation data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})

$(".stuent_public").click(function(){
	 $.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PublicInformation data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".stuent_test").click(function(){
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/student/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<OrderTestok data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".stuent_score").click(function(){
	ReactDOM.render(	<PersonScore />,  document.getElementById("info_student"));
})
$(".stuent_order").click(function(){
	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<OrderTest data={data}/>,  document.getElementById("info_student"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})

//管理员管理模块

//管理员管理-学生管理
 var AdminStudent=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新学生页面
	 	ReactDOM.render(	<AdminAddstudent/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(numid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/student/"+numid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(grade,name,sex,sep,con,numid){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminRestudent grade={grade} name={name} sex={sex} sep={sep} con={con} numid={numid}/>,  document.getElementById("info_admin"));
  	},
  	componentDidMount:function(){
  	 	window.addEventListener('keydown', this.handleKeyDown);
	},
	handleKeyDown:function(e){
		//搜索
		if(e.keyCode==13 && $(".admin_search input").val()!="")
		{
			var special=$(".admin_search input").val();
			$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/page/special/"+special+"&1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<SearchInformation data={data}/>,  this.refs.admin_infor );
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 			});
		}
	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminStudent">
 				<div className="title">
	     		 	学生管理
	    		</div>
	    		<h4>这里是全部学生: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor" ref="admin_infor">
	    			<li key={i}>
		    			<span>姓名</span>
		    			<span>学号</span>
		    			<span>性别</span>
		    			<span>专业</span>
					    <span>删除</span>
					    <span>修改</span>
					</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.numid}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.numid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.grade,result.name,result.sex,result.specialization,result.contact,result.numid); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
 //管理员管理-搜索学生
 var SearchInformation=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
	    		<ul className="SearchInformation">
	    			<li key={i}>
		    			<span>姓名</span>
		    			<span>学号</span>
		    			<span>性别</span>
		    			<span>专业</span>
					    <span>删除</span>
					    <span>修改</span>
					</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.numid}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.numid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.grade,result.name,result.sex,result.specialization,result.contact,result.numid); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 		)
 	}
 });
 //管理员管理-添加新学生
 var AdminAddstudent=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		specialization:$(".write_spec").val(),
	 		grade:$(".write_grade").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				//console.log(data);
	 				alert("新增管理员用户名为 "+data.data+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddstudent">
 				<div className="title">
	     		 	添加新学生
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>年级 :</span><input type="text" name="write_in" className="write_grade" /></li>
	    			<li><span>专业 :</span><input type="text" name="write_in" className="write_spec" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改学生信息
 var AdminRestudent=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			numid:$(".write_numid").val(),
 			name:$(".write_name").val(),
	 		sex:sex,
	 		specialization:$(".write_spec").val(),
	 		grade:$(".write_grade").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminRestudent">
 				<div className="title">
	     		 	修改学生信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>学号 :</span><input type="text" name="write_in" className="write_numid" value={this.props.numid} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>年级 :</span><input type="text" name="write_in" className="write_grade" defaultValue={this.props.grade} /></li>
	    			<li><span>专业 :</span><input type="text" name="write_in" className="write_spec" defaultValue={this.props.sep} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-教师管理
 var AdminTeacher=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新教师页面
	 	ReactDOM.render(	<AdminAddteacher/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(teaid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/teacher/"+teaid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(title,name,sex,edu,con,teaid){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReteacher title={title} name={name} sex={sex} edu={edu} con={con} teaid={teaid}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminTeacher">
 				<div className="title">
	     		 	教师管理
	    		</div>
	    		<h4>这里是全部教师: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>姓名</span><span>性别</span><span>院系</span><span>工号</span><span>学历</span>
	    				<span>删除</span><span>修改</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.title}</span>
		    						<span>{result.teaid}</span>
		    						<span>{result.education}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.teaid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.title,result.name,result.sex,result.education,result.contact,result.teaid); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-添加新教师
 var AdminAddteacher=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var teacher={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		title:$(".write_title").val(),
	 		education:$(".write_edu").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(teacher));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(teacher),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("新增管理员用户名为 "+data.data+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddteacher">
 				<div className="title">
	     		 	添加新教师
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>院系 :</span><input type="text" name="write_in" className="write_title" /></li>
	    			<li><span>学历 :</span><input type="text" name="write_in" className="write_edu" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

//管理员管理-修改教师信息
 var AdminReteacher=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var teacher={
 			teaid:$(".write_teaid").val(),
 			name:$(".write_name").val(),
	 		sex:sex,
	 		title:$(".write_title").val(),
	 		education:$(".write_edu").val(),
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(teacher));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(teacher),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReteacher">
 				<div className="title">
	     		 	修改教师信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>工号 :</span><input type="text" name="write_in" className="write_teaid" value={this.props.teaid} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>院系 :</span><input type="text" name="write_in" className="write_title" defaultValue={this.props.title} /></li>
	    			<li><span>学历 :</span><input type="text" name="write_in" className="write_edu" defaultValue={this.props.edu} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

  //管理员管理-管理员管理
 var AdminAdmin=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新管理员页面
	 	ReactDOM.render(	<AdminAddadmin/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(admid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/administrator/"+admid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(name,sex,con,admid){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReadmin name={name} sex={sex} con={con} admid={admid}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminAdmin">
 				<div className="title">
	     		 	管理员
	    		</div>
	    		<h4>这里是全部管理员: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>姓名</span><span>性别</span><span>管理工号</span>
	    				<span>删除</span><span>修改</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.admid}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.admid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.name,result.sex,result.contact,result.admid); } } className="stu_revise">修改</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-添加新管理员
 var AdminAddadmin=React.createClass({
 	addclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			name:$(".write_name").val(),
	 		sex:sex,
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("新增管理员用户名为 "+data.data+"\n默认密码为11111111"+"\n信息已成功保存");
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddadmin">
 				<div className="title">
	     		 	添加新管理员
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改管理员信息
 var AdminReadmin=React.createClass({
 	reviseclick:function(){
 		if($(".write_sex").val()=="男")
 			var sex="0";
 		else
 			var sex="1";

 		var student={
 			admid:$(".write_admid").val(),
 			name:$(".write_name").val(),
	 		sex:sex,
	 		contact:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(student),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReadmin">
 				<div className="title">
	     		 	修改管理员信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>管理公号 :</span><input type="text" name="write_in" className="write_admid" value={this.props.admid} /></li>
	    			<li><span>姓名 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>性别 :</span><input type="text" name="write_in" className="write_sex" defaultValue={(this.props.sex)=="0"?"男":"女"} /></li>
	    			<li><span>联系方式 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.con} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });
  //管理员管理-项目管理
 var AdminTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAdditem/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(itemid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/item/"+itemid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(name,itemid,term,cour){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReitem name={name} itemid={itemid} cour={cour} term={term}/>,  document.getElementById("info_admin"));
  	},
  	adddisclick:function(itemid){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAddTestdis itemid={itemid}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminTest">
 				<div className="title">
	     		 	项目管理
	    		</div>
	    		<h4>这里是全部项目: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			<li><span>实验名称</span><span>学期</span><span>实验所属课程</span><span>实验编号</span>
	    				<span>删除</span><span>修改</span><span>设置</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.itemname}</span>
		    						<span>{result.term}</span>
		    						<span>{result.coursename}</span>
		    						<span>{result.itemid}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.itemid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.itemname,result.itemid,result.term,result.coursename); } } className="stu_revise">修改</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.adddisclick(result.itemid); } } className="stu_adddis">设置批次</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新项目
 var AdminAdditem=React.createClass({
 	addclick:function(){
 		var item={
 			itemname:$(".write_name").val(),
	 		term:$(".write_term").val(),
	 		coursename:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(item),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAdditem">
 				<div className="title">
	     		 	添加新项目
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验名称 :</span><input type="text" name="write_in" className="write_name" /></li>
	    			<li><span>学期 :</span><input type="text" name="write_in" className="write_term" /></li>
	    			<li><span>实验所属课程 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改项目信息
 var AdminReitem=React.createClass({
 	reviseclick:function(){
 		var item={
 			itemid:$(".write_admid").val(),
 			itemname:$(".write_name").val(),
	 		term:$(".write_term").val(),
	 		coursename:$(".write_cont").val(),
 		};
 		//console.log(JSON.stringify(student));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(item),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReitem">
 				<div className="title">
	     		 	修改项目信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_admid" value={this.props.itemid} /></li>
	    			<li><span>实验名称 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.name} /></li>
	    			<li><span>学期 :</span><input type="text" name="write_in" className="write_term"  defaultValue={this.props.term}/></li>
	    			<li><span>实验所属课程 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.cour} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

  //管理员管理-项目批次管理
 var AdminTestdis=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	deleteclick:function(batid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/batch/"+batid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(batid,itemid,teaid,lab,date,seg){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReTestdis batid={batid} itemid={itemid} teaid={teaid} lab={lab} date={date} seg={seg}/>,  document.getElementById("info_admin"));
  	},
  	getstuclick:function(batid){
  		//点击获取该实验批次的学生
  		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+batid+"/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminGetstu data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminTestdis">
 				<div className="title">
	     		 	项目批次管理
	    		</div>
	    		<h4>这里是全部项目批次:</h4>
	    		<ul className="admin_infor">
	    			<li><span>批次编号</span><span className="it_name">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span>
	    				<span className="stu_del">删除</span><span className="stu_re">修改</span><span className="stu_s">学生</span>
	    			</li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span>{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.batid); } } className="stu_delete">删除</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.batid,result.itemid,result.teaid,result.laboratory,result.date,result.segmentation); } } className="stu_revise">修改</span>
					    			<span onClick={ (event)=>{event.stopPropagation(),this.getstuclick(result.batid); } } className="stu_stu">查看预约学生</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
//管理员管理-获取预约该项目批次的学生
 var AdminGetstu=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
 	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
  		//console.log(result);
 		this.state.result=result;
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminGetstu">
 				<div className="title">
	     		 	预约该项目批次的学生
	    		</div>
	    		<ul className="admin_infor">
	    			<li key={i}><span>姓名</span><span>学号</span><span>性别</span><span>专业</span><span>年级</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				var numid=result.numid;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.numid}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
		    						<span>{result.grade}</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新项目批次
 var AdminAddTestdis=React.createClass({
 	addclick:function(){
 		var testdis={
 			itemid:$(".write_name").val(),
	 		teaid:$(".write_term").val(),
	 		laboratory:$(".write_cont").val(),
	 		date:$(".write_date").val(),
	 		segmentation:$(".write_seg").val(),

 		};
 		//console.log(JSON.stringify(testdis));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(testdis),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		},
	 		error:function(){
	 			alert("您输入的教师信息不存在");
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddTestdis">
 				<div className="title">
	     		 	添加新项目批次
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_name" value={this.props.itemid}/></li>
	    			<li><span>教师工号 :</span><input type="text" name="write_in" className="write_term" /></li>
	    			<li><span>实验地点 :</span><input type="text" name="write_in" className="write_cont" /></li>
	    			<li><span>实验日期 :</span><input type="text" name="write_in" className="write_date" /></li>
	    			<li><span>节次 :</span><input type="text" name="write_in" className="write_seg" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改项目批次信息
 var AdminReTestdis=React.createClass({
 	reviseclick:function(){
 		var batch={
 			batid:$(".write_testid").val(),
 			itemid:$(".write_admid").val(),
 			teaid:$(".write_name").val(),
	 		laboratory:$(".write_term").val(),
	 		date:$(".write_cont").val(),
	 		segmentation:$(".write_seg").val()
 		};
 		//console.log(JSON.stringify(batch));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(batch),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminReTestdis">
 				<div className="title">
	     		 	修改实验批次信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>实验批次编号 :</span><input type="text" name="write_in" className="write_testid" value={this.props.batid} /></li>
	    			<li><span>实验编号 :</span><input type="text" name="write_in" className="write_admid" defaultValue={this.props.itemid} /></li>
	    			<li><span>教师工号 :</span><input type="text" name="write_in" className="write_name" defaultValue={this.props.teaid} /></li>
	    			<li><span>实验地点 :</span><input type="text" name="write_in" className="write_term"  defaultValue={this.props.lab}/></li>
	    			<li><span>实验日期 :</span><input type="text" name="write_in" className="write_cont" defaultValue={this.props.date} /></li>
	    			<li><span>节次 :</span><input type="text" name="write_in" className="write_seg" defaultValue={this.props.seg} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });

   //管理员管理-公告管理
 var AdminPublic=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	addclick:function(){
  		//点击添加跳转至添加添加新项目页面
	 	ReactDOM.render(	<AdminAddnotice/>,  document.getElementById("info_admin"));
  	},
  	deleteclick:function(noticeid){
  		//点击删除跳出窗口询问是否删除
  		//console.log(e.target.textContent);
  		if(confirm("确认删除吗？"))
  		{
  			$.ajax({	
		 		url:"http://yiranblade.cn/lbms/notice/"+noticeid,
		 		type:"DELETE",	
		 		dataType:"json",  
		 		success:function(data){
		 			if(data.code=="200")
		 			{
		 				alert("删除成功");
		 				location.reload(true);
		 			}
		 			else{
		 				alert("删除失败");
		 			}
		 		}
 			});
  		}
  	},
  	reviseclick:function(noticeid,content){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminRenotice noticeid={noticeid} content={content}/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="AdminPublic">
 				<div className="title">
	     		 	公告栏管理
	    		</div>
	    		<h4>这里是全部公告: <span className="stu_add" onClick={this.addclick}>增加</span></h4>
	    		<ul className="admin_infor">
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						{result.noticecontent}
					    			<div>
					    				<span onClick={ (event)=>{event.stopPropagation(),this.deleteclick(result.noticeid); } } className="stu_delete">删除</span>
					    				<span onClick={ (event)=>{event.stopPropagation(),this.reviseclick(result.noticeid,result.noticecontent); } } className="stu_revise">修改</span>
					    			</div>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//管理员管理-添加新公告
 var AdminAddnotice=React.createClass({
 	addclick:function(){
 		var notice={
 			noticecontent:$(".write_name").val(),
 		};
 		//console.log(JSON.stringify(notice));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice",
	 		type:"POST",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(notice),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("成功添加,信息已保存")
	 			}
	 			else{
	 				alert("保存失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminAddnotice">
 				<div className="title">
	     		 	添加新项目
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>公告内容 :</span><input type="text" name="write_in" className="write_name" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="添加" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

 //管理员管理-修改公告信息
 var AdminRenotice=React.createClass({
 	reviseclick:function(){
 		var notice={
 			noticeid:this.props.noticeid,
 			noticetile:"通知",
	 		noticecontent:$(".write_con").val()
 		};
 		//console.log(JSON.stringify(notice));
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice",
	 		type:"PUT",	
	 		dataType:"json", 
	 		"contentType":"application/json",  
	 		data:JSON.stringify(notice),
	 		success:function(data){
	 			if(data.code=="200")
	 			{
	 				alert("信息已更新成功")
	 			}
	 			else{
	 				alert("更新失败");
	 			}
	 		}
 		});
 	},
 	render:function(){
 		return(
 			<div id="AdminRenotice">
 				<div className="title">
	     		 	修改公告信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>公告内容 :</span><input type="text" name="write_in" className="write_con" defaultValue={this.props.content} /></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改" className="entering" onClick={this.reviseclick}/>
 			</div>
 		)
 	}
 });
 //管理员管理-个人信息组件
 var PersonInfor=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Personpassword/>,  document.getElementById("info_admin"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="PersonInfor">
	 			<div className="title">
	     		 个人信息
	    		</div>
			    <div id="information">
			    	<ul className="teacher_infor">
		    			<li><span>管理工号 :</span><span>{result.admid}</span></li>
		    			<li><span>姓名 :</span><span>{result.name}</span></li>
		    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
		    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
  //管理员管理-修改密码
 var Personpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			adId:username,
  		}
  		//console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/administrator",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Personpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });

//点击目录获取相应的界面
 $(".admin_stu").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminStudent data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_tea").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTeacher data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_admin").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminAdmin data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_test").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/item/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTest data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_public").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/notice/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminPublic data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_testdis").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/page/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<AdminTestdis data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
$(".admin_person").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/administrator/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<PersonInfor data={data}/>,  document.getElementById("info_admin"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})


 //教师管理-项目管理
 var TeacherTest=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
 		this.state.result=result;
  	},
  	checkstu:function(batid){
  		//点击获取该实验批次的学生
  		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/student/"+batid+"/1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TeaGetstu data={data} batid={batid}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="TeacherTest">
 				<div className="title">
	     		 	项目管理
	    		</div>
	    		<h4>这里是您的实验项目:</h4>
	    		<ul className="teacher_infor">
	    			<li><span>批次编号</span><span className="item_name">实验名称</span><span>教师姓名</span><span>实验地点</span><span>实验日期</span><span>节次</span><span>学生</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.batid}</span>
		    						<span className="item_name">{ajaxgetitemname(result.itemid)}</span>
		    						<span className="tea_name">{ajaxgetteaname(result.teaid)}</span>
		    						<span>{result.laboratory}</span>
		    						<span>{result.date}</span>
		    						<span>{result.segmentation}</span>
		    						<span className="checkstu" onClick={(event)=>{event.stopPropagation(),this.checkstu(result.batid);}}>查看预约学生</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });

//教师管理-获取预约该项目批次的学生
 var TeaGetstu=React.createClass({
 	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
 	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data.recordList;
  		//console.log(result);
 		this.state.result=result;
  	},
  	enterstu:function(batid,numid,grade){
  		//点击跳转至录入成绩界面
  		ReactDOM.render(	<TeacherStuinfo numid={numid} batid={batid} grade={grade}/>,  document.getElementById("info_teacher"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="TeaGetstu">
 				<div className="title">
	     		 	预约该项目批次的学生
	    		</div>
	    		<ul className="admin_infor">
	    			<li key={i}><span>姓名</span><span>学号</span><span>性别</span><span>专业</span><span>年级</span><span>成绩</span></li>
	    			{
		    			result.map(function(result){
		    				i++;
		    				return(
		    					<li key={i}>
		    						<span>{result.name}</span>
		    						<span>{result.numid}</span>
		    						<span>{(result.sex)=="0"?"男":"女"}</span>
		    						<span>{result.specialization}</span>
		    						<span>{result.grade}</span>
		    						<span className="enterstu" onClick={(event)=>{event.stopPropagation(),this.enterstu(this.props.batid,result.numid,result.grade);}}>录入成绩</span>
					    		</li>
		    				)
		    			}.bind(this))
	    			}
	    		</ul>
 			</div>
 		)
 	}
 });
 //教师管理-录入学生成绩
 var TeacherStuinfo=React.createClass({
 	addclick:function(){
 		//发送获取成绩请求获取成绩id
 		$.ajax({	
	 		url:"http://yiranblade.cn/lbms/test/"+$(".write_batid").val()+"&"+$(".write_numid").val(),
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				var testid=data.data.testid;
	 				//console.log(testid);
	 				var Stuinfo={
			 			testid:testid,
			 			batid:$(".write_batid").val(),
			 			numid:$(".write_numid").val(),
			 			grade:$(".write_grade").val(),
			 			results:$(".write_results").val()
			 		};
			 		//console.log(JSON.stringify(Stuinfo));
	 				$.ajax({	
				 		url:"http://yiranblade.cn/lbms/test",
				 		type:"PUT",	
				 		dataType:"json", 
				 		"contentType":"application/json",  
				 		data:JSON.stringify(Stuinfo),
				 		success:function(data){
				 			if(data.code=="200")
				 			{
				 				alert("录入添加 , 信息已保存")
				 			}
				 			else{
				 				alert("录入失败");
				 			}
				 		}
			 		});
	 			}
	 			else{
	 				alert("录入失败,原因可能为 该学生没有预约您的实验 或 您的试验中没有此项");
	 			}
	 		},
	 		error:function(){
	 			alert("信息不存在");
	 		}
 		});				
 	},
 	render:function(){
 		return(
 			<div id="TeacherStuinfo">
 				<div className="title">
	     		 	录入学生成绩信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>批次编号 :</span><input type="text" name="write_in" className="write_batid" value={this.props.batid} /></li>
	    			<li><span>学号 :</span><input type="text" name="write_in" className="write_numid" value={this.props.numid}/></li>
	    			<li><span>年级 :</span><input type="text" name="write_in" className="write_grade" value={this.props.grade} /></li>
	    			<li><span>分数 :</span><input type="text" name="write_in" className="write_results" /></li>
	    		</ul>
	    		<input type="button" name="entering" value="录入" className="entering" onClick={this.addclick}/>
 			</div>
 		)
 	}
 });

//教师管理-教师信息
 var TeacherTea=React.createClass({
  	getInitialState: function () {
	    return{
	      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data.data;
 		this.state.result=result;
  	},
  	reviseclick:function(noticeid,content){
  		//点击修改跳转至修改页面
  		ReactDOM.render(	<AdminReteainfo noticeid={noticeid} content={content}/>,  document.getElementById("info_admin"));
  	},
  	changeclick:function(){
  		//点击跳转至修改密码页面
  		ReactDOM.render(	<Teacherpassword/>,  document.getElementById("info_teacher"));
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		return(
 			<div id="TeacherTea">
 				<div className="title">
	     		 	个人信息
	    		</div>
	    		<ul className="teacher_infor">
	    			<li><span>工号 :</span><span>{result.teaid}</span></li>
	    			<li><span>姓名 :</span><span>{result.name}</span></li>
	    			<li><span>性别 :</span><span>{(result.sex)=="0"?"男":"女"}</span></li>
	    			<li><span>院系 :</span><span>{result.title}</span></li>
	    			<li><span>学位 :</span><span>{result.education}</span></li>
	    			<li><span>联系方式 :</span><span>{result.contact}</span></li>
	    		</ul>
	    		<input type="button" name="entering" value="修改密码" className="entering" onClick={this.changeclick}/>
 			</div>
 		)
 	}
 });
  //教师管理-修改密码
 var Teacherpassword=React.createClass({
 	getInitialState: function () {
		    return{
		      result:[]
	    };
  	},
  	ajaxchange:function(data){
  		//ajax转化 将data中部分信息提取出来渲染到页面中
  		var result=data;
 		this.state.result=result;
  	},
  	changeclick:function(){
  		var admin={
  			password:$(".write_password").val(),
  			teaId:username,
  		}
  		//console.log(admin);
  		$.ajax({	
			url:"http://yiranblade.cn/lbms/cipher/teacher",
			type:"POST",	
			dataType:"json", 
			data:admin,
			success:function(data){
				if(data.code=="200")
				{
					alert("修改成功 , 信息已保存")
				}
				else{
					alert("修改失败");
				}
			 }
		});
  	},
 	render:function(){
 		this.ajaxchange(this.props.data);
 		var result = this.state.result;
 		//console.log(result);
 		var i=-1;
 		return(
 			<div id="Teacherpassword">
	 			<div className="title">
	     		 	修改密码
	    		</div>
			    <div id="information">
			    	<ul className="student_infor">
	    			<li><span>新密码 :</span><input type="text" name="write_in" className="write_password" /></li>
	    			</ul>
	    			<input type="button" name="entering" value="修改" className="entering" onClick={this.changeclick}/>
			    </div>	
		    </div>	
 		)
 	}
 });
$(".teacher_tea").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/teacher/"+username,
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 
	 				ReactDOM.render(	<TeacherTea data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				alert("no");
	 			}
	 		}
 		});
})
  $(".teacher_stuinfo").click(function(){
	ReactDOM.render(	<TeacherStuinfo/>,  document.getElementById("info_teacher"));
})
$(".teacher_test").click(function(){
 	$.ajax({	
	 		url:"http://yiranblade.cn/lbms/batch/teacher/"+username+"&1",
	 		type:"GET",	
	 		dataType:"json",
	 		success:function(data){
	 			if(data.code=="200")
	 			{ 	
	 				ReactDOM.render(	<TeacherTest data={data}/>,  document.getElementById("info_teacher"));
	 			}
	 			else{
	 				//console.log(data.data);
	 				alert("no");
	 			}
	 		}
 		});
})

})();