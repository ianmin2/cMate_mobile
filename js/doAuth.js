var js = document.createElement("script");
var css = document.createElement("link");
js.type = "text/javascript";
js.src 	= "`mmenu/js/jquery.mmenu.min.js";
css.rel	= "stylesheet";
css.type= "text/css";
css.href= "mmenu/css/jquery.mmenu.css";


 $__url_ = 'http://ianmin2.tk/insy214/php/CMBasics_proc.php';
 //$__url_ = "http://eleanor/courses/php/CMBasics_proc.php";
$(function(){
	
	$__result 			= $("#rr");
	$__command			= $("#command"); 
	
document.body.appendChild(js);
document.body.appendChild(css);
	//$("head").append("<link rel='stylesheet' href='style/style.css' >");	
	
});


		
	function getSubjects(){
		
		$.ajax({
			url: $__url_,
			data: {method: "getMyCourses", institution: localStorage.getItem("inst"), major: localStorage.getItem("major"), id: localStorage.getItem("id")},
			dataType:"jsonp",
			success: function(resp){
				
				$d_cours	= resp['data']['command']['done'];
				$d_progr = resp['data']['message'];
				
				//localStorage.setItem("d_cours", JSON.stringify($d_cours));
				//localStorage.setItem("d_progr", JSON.stringify($d_progr));
				
				doGrading($d_cours, $d_progr);
				
				//console.log(resp['data']['message']);
				//console.log(resp['data']['command']['done']);
			}	
		});
		
	}
	
	
	
	function doGrading($d_cours, $d_progr){
		
		$_grading_ = {"a":localStorage.getItem("a") , "b":localStorage.getItem("b") , "c":localStorage.getItem("c") , "d":localStorage.getItem("d") , "e":localStorage.getItem("e") , "f":localStorage.getItem("f") , "a+":localStorage.getItem("ap") , "b+":localStorage.getItem("bp") , "c+":localStorage.getItem("cp") , "d+":localStorage.getItem("dp") , "a-":localStorage.getItem("am") , "b-":localStorage.getItem("bm") , "c-":localStorage.getItem("cm") , "d-":localStorage.getItem("dm") }
		
		//alert($_grading_['a']);
		$grade_scor = Array();
		$grade_weig = Array();
		$grade_for  = Array();
		//GET THE CREDITS EARNED ON THE COMPLETION OF A COURSE
		for($obj in $d_progr){
			
			$garde = $d_progr[$obj]['grade'].toLowerCase();
			//alert($garde);
			if($_grading_[$garde] == null){$_grading_[$garde] = 0}
			$grade_scor.push($_grading_[$garde]);			
			
		}
		
		//GET THE ACTUAL WEIGHT OF THE COURSE
		for($obj in $d_cours){
			
			//alert($d_cours[$obj]['weight'] + " \n\n" + $d_cours[$obj]['name'] );
			
			$grade_weig.push($d_cours[$obj]['weight'] );
			$grade_for.push($d_cours[$obj]['name']);
			
		}
		
		
		myGPA($grade_scor, $grade_weig, $grade_for);
				
	}
	
	function myGPA(myScores, myWeights, myTitles){
		
		$resp_dat 	= "";
		$_grade_p 	= 0;
		$_credi_h 	= 0;
		
		for(i =0; i < myScores.length; i++){
			
			$resp_dat = $resp_dat + '<a class="list-group-item allow-badge widget uib_w_4" data-uib="twitter%20bootstrap/list_item" data-ver="0"><h4 class="list-group-item-heading">'+ myTitles[i]+'</h4><p class="list-group-item-text"><b>score:</b> '+ (myScores[i] * myWeights[i])  +'</p><p> <b>Weight:</b> ' + myWeights[i] + ' </p></a>';
			
			$_grade_p = $_grade_p  	+ (myScores[i] * myWeights[i]);
			$_credi_h = $_credi_h	+  (myWeights[i] * 1 );
			
		}
		
		$_gpa_ =  ($_grade_p / $_credi_h);
		
		$resp_dat = $resp_dat + '<a class="list-group-item allow-badge widget uib_w_4" data-uib="twitter%20bootstrap/list_item" data-ver="0"><h4 class="list-group-item-heading"><code style="color:#F00;"><b>CUMULATIVE GPA</b></code></h4><p class="list-group-item-text"><b>GPA:</b><code style="color:navy;"> '+ $_gpa_ +' </code></p><p><b>Hours:</b> <code style="color:green;"> ' + $_credi_h + '</code> </p></a>';
		$__result.html($resp_dat);
		
		
		
	}



	function getGrading(){
		
		$.ajax({
			url:$__url_,
			data:{method: "loadGrades" ,institution : localStorage.getItem("inst")},
			dataType:"jsonp",
			success: function(resp){
				
				if(resp['response'] == "SUCCESS"){
													
					$dat = resp['data']['message'][0];
					
					$nameArr = Array("ap","a","am","bp","b","bm","cp","c","cm","dp","d","dm","e","f","ng","dg");
					
					for($obj in $nameArr){
						
						localStorage.setItem($nameArr[$obj], $dat[$nameArr[$obj]]);
						
					}
																
					$__command.html( "<script>" + resp['data']['command'] );
					
				}else{
					
					
					$__command.html( "<script>" + resp['data']['command'] );
					
				}
				
			}
			
		});
		
	}


	function loadGrades(){
		
		$.ajax({
	 
					url : $__url_,
					data: { method:'loadGrades', institution : localStorage.getItem("inst") },
					dataType:'jsonp',
					success: function(resp){
													
						//If the user's credentials are correct, set a unique identification Key  to authenticate the user.					
						if(resp["response"] == "SUCCESS"){
							
							$dat_ = resp["data"]["message"][0];
							console.log($dat_);
							
							   $_ap = $("#ap").val($dat_["ap"]);      	$_cp = $("#cp").val($dat_["cp"]);
							   $_a  = $("#a").val($dat_["a"]);         	$_c = $("#c").val($dat_["c"]);
							   $_am = $("#am").val($dat_["am"]);        $_cm = $("#cm").val($dat_["cm"]);
							   $_bp = $("#bp").val($dat_["bp"]);        $_dp = $("#dp").val($dat_["dp"]);
							   $_b  = $("#b").val($dat_["b"]);         	$_d = $("#d").val($dat_["d"]);
							   $_bm = $("#bm").val($dat_["bm"]);        $_dm = $("#dm").val($dat_["dm"]);
							   $_e  = $("#e").val($dat_["e"]);        	$_f = $("#f").val($dat_["f"]);
							
							$__command.html( "<script>" + resp["data"]["command"]  );
																						
						}else{
							
							$__command.html( "<script>" + resp["data"]["command"]  );
							
						}
						
						
						
					}
			
							
			});	
		
	}


	function startGrading($institut, $country){
		
		 $.ajax({
	 
					url : $__url_,
					data: { method:'startGrading', institution : $institut, country: $country },
					dataType:'jsonp',
					success: function(resp){
													
						//If the user's credentials are correct, set a unique identification Key  to authenticate the user.					
						if(resp["response"] == "SUCCESS"){
							
							$__command.html( "<script>" + resp["data"]["command"]  );
																						
						}else{
							
							$__command.html( "<script>" + resp["data"]["command"]  );
							
						}
						
						
						
					}
			
							
			});	
		
	}


	function doSetGrade(){
		
			   $_ap = $("#ap").val();      	 $_cp = $("#cp").val();
               $_a  = $("#a").val();         $_c = $("#c").val();
               $_am = $("#am").val();        $_cm = $("#cm").val();
               $_bp = $("#bp").val();        $_dp = $("#dp").val();
               $_b  = $("#b").val();         $_d = $("#d").val();
               $_bm = $("#bm").val();        $_dm = $("#dm").val();
               $_e  = $("#e").val();         $_f = $("#f").val();
              
             $.ajax({
	 
					url : $__url_,
					data: { method:'setGrading', institution : localStorage.getItem("inst"), a:$_a , b:$_b , c:$_c , d:$_d , e:$_e , f:$_f , ap:$_ap , bp:$_bp , cp:$_cp , dp:$_dp , am:$_am , bm:$_bm, cm:$_cm , dm:$_dm },
					dataType:'jsonp',
					success: function(resp){
                        
                    if(resp['response'] == "SUCCESS"){
													
													$_res = "'#result'";$("#rr").html('<div class="panel widget uib_w_8 d-margins panel-success" data-uib="twitter%20bootstrap/panel" data-ver="0" id="result" style="border-bottom:3px solid #999; max-width:95%; margin:0 auto;"><div class="panel-heading" align="right"><p style="text-align:right;"><a style="color:red; text-decoration:none;" href="javascript:+$('+$_res+').fadeOut()"><div style="border:1px solid #000; font-weight:bold; float:right; padding:1px; border-radius:5px;">X</div></a></p><p style="text-align:center;">' +  resp['data']['message'] +  '</p> </div></div>');
													$__command.html( "<script>" + resp['data']['command'] );
													
												}else{
													
													$_res = "'#result'";$("#rr").html('<div class="panel widget uib_w_8 d-margins panel-danger" data-uib="twitter%20bootstrap/panel" data-ver="0" id="result" style="border-bottom:3px solid #999; max-width:95%; margin:0 auto;"><div class="panel-heading" align="right"><p style="text-align:right;"><a style="color:red; text-decoration:none;" href="javascript:+$('+$_res+').fadeOut()"><div style="border:1px solid #000; font-weight:bold; float:right; padding:1px; border-radius:5px;">X</div></a></p><p style="text-align:center;">' +  resp['data']['message'] +  '</p> </div></div>');
													$__command.html( "<script>" + resp['data']['command'] );
													
												}
												
                        
                    }
                 
             });	
		
	}


	function baseAuth(){
			if(localStorage.getItem("identification") == "" || localStorage.getItem("identification") == null || localStorage.getItem("identification") == "undefined"){
				localStorage.clear();
				doBasicLoginAuth();
			} 
		}

	function mapMajor($_course){
		
			$_institution = localStorage.getItem("inst");
			$_major		  = localStorage.getItem("major");
			
				 $.ajax({
				
						url : $__url_,
						data: { method:"mapMajor", institution:$_institution, major:$_major, course:$_course },
						dataType:'jsonp',
						success: function(resp){
						//<span class="widget uib_w_2 d-margins label label-primary" data-uib="twitter%20bootstrap/badge_and_label" data-ver="0">COMPLETE</span>
							if(resp["response"] == "SUCCESS" ){
								alert(resp['data']['message']);
								$__command.html("<script>" + resp['data']['command'] + "</script>");																
							}else if(resp["response"] == "ERROR" ){
								alert(resp['data']['message']);
								$__command.html("<script>" + resp['data']['command'] + "</script>");
							}else{
								$__result.html("UNDEFINED RESPONSE MESSAGE.");
							}
							
						
						}
						
			 });
			
		}
		
		
		
		
		function unmapMajor($_course){
		
			$_institution = localStorage.getItem("inst");
			$_major		  = localStorage.getItem("major");
			
				 $.ajax({
				
						url : $__url_,
						data: { method:"unmapMajor", institution:$_institution, major:$_major, course:$_course },
						dataType:'jsonp',
						success: function(resp){
						
							if(resp["response"] == "SUCCESS" ){
								alert(resp['data']['message']);
								$__command.html("<script>" + resp['data']['command'] + "</script>");																
							}else if(resp["response"] == "ERROR" ){
								alert(resp['data']['message']);
								$__command.html("<script>" + resp['data']['command'] + "</script>");
							}else{
								$__result.html("UNDEFINED RESPONSE MESSAGE.");
							}
							
						
						}
						
			 });
			
		}




	function noSpace($data){
	
    	return $data.replace(/ /g,"_");
		
	}
	
		
	//Basic Authentication to ensure that the security key has been set
	function doBasicLoginAuth(){
		
		$__loginKey = localStorage.getItem("loginKey");
		$__identification = localStorage.getItem("identification");
		
		if($__loginKey == null || $__loginKey == "" || $__identification == null || $__identification == ""){
			
			window.location = "do_Login.html";
			
		}else{
			
			window.location = "main_panel.html";
			
		}	
		
	}




	function doSecureAuth(){
		
		$__loginKey = localStorage.getItem("loginKey");
		$__identification = localStorage.getItem("identification");
		
			
		
		 $.ajax({
	 
					url : $__url_,
					data: { method:'doSecureAuth', loginKey : $__loginKey, identification : $__identification  },
					dataType:'jsonp',
					success: function(resp){
													
						//If the user's credentials are correct, set a unique identification Key  to authenticate the user.					
						if(resp["response"] == "SUCCESS"){
								
							$__command.html( "<script>" + resp["data"]["command"] + "</script>" );
																						
						}else{
							
							$__command.html( "<script>" + resp["data"]["command"] + "</script>" );
							
						}
						
						
						
					}
			
							
			});	
		
	}




	function makeList($data){
		$_out = "";
		
		for($dat in $data){
		
			$identy = noSpace($data[$dat]['name'] + $data[$dat]['code']);
			
			$_out = $_out + '<a class="list-group-item allow-badge widget uib_w_2 d-margins" data-uib="twitter%20bootstrap/list_item" data-ver="0"><h4 class="list-group-item-heading">' +  $data[$dat]['code'] + '</h4><p class="list-group-item-text">' + $data[$dat]['name'] + '</p></a><div class="table-thing widget uib_w_3 d-margins" data-uib="twitter%20bootstrap/button_menu" data-ver="0"><label class="narrow-control"></label><div class="wide-control btn-group inline-widget"><button class="btn btn-default">ACTION</button><button class="btn dropdown-toggle btn-default" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"><li><a href="javascript:mapMajor(' + $data[$dat]['id'] + ');">Add to Major</a></li><li class="divider"></li><li><a href="javascript:unmapMajor(' + $data[$dat]['id'] + ');">Remove From Major</a></li></ul></div></div><span class="uib_shim"></span>';
			
		}
		
		return $_out;
		
		
	}		



	function getMyCourses($_course_list){
		
			
		$__done = $_course_list['done'];
		$__undone = $_course_list['undone'];
		
		//console.log($__undone);
		//code , id , name, weight
		
		$d_course = "";
		$u_course = "";
		
		
		//make a list of the undone courses.
		for($_course in $__undone){
            $u_course = $u_course + '<a class="list-group-item allow-badge widget uib_w_10" data-uib="twitter%20bootstrap/list_item" data-ver="0" href="javascript:updateProgress(' + $__undone[$_course]['id']  + ' );"><h4 class="list-group-item-heading">' + $__undone[$_course]['code'] + '</h4><p class="list-group-item-text">'+ $__undone[$_course]['name'] +'</p><p class="list-group-item-text">' + $__undone[$_course]['weight']  + ' Hours</p></a>';
						
		}
		
		for($_course in $__done){
			
			$prep_arr = Array();
			$prep_arr['command'] = "window.localStorage.setItem('curr_course', "+   $__done[$_course]['name'] + " );";
			
            $d_course = $d_course + '<a class="list-group-item allow-badge widget uib_w_10" data-uib="twitter%20bootstrap/list_item" data-ver="0" href="javascript:updateProgress(' + $__done[$_course]['id'] + ');"><h4 class="list-group-item-heading">' + $__done[$_course]['code'] + '</h4><p class="list-group-item-text">' + $__done[$_course]['name'] + '</p><p class="list-group-item-text">' + $__done[$_course]['weight'] + ' Hours </p></a>';
            
		}
		
		
		$_results_ = Array();
		$_results_["done"] 		= $d_course;
		$_results_["undone"] 	= $u_course;
		
		return $_results_;
		//console.log($_results_)
		
		
	}
	


	function updateProgress($courseId){
		
		$.ajax({
			 
							url : $__url_,
							data: { method:'getCourseById', id : $courseId , identification :localStorage.getItem('id') },
							dataType:'jsonp',
							success: function(resp){
								console.log(resp)
								if(resp["response"] == "SUCCESS"){
									
									$__result.html('');
									$('body').html('<link rel="stylesheet" type="text/css" href="css/testing_main.less.css" class="main-less"><div class="uwrap"><div class="upage" id="mainpage"><div class="upage-outer"><div class="upage-content" id="mainsub"><div class="grid grid-pad urow uib_row_1 row-height-1" data-uib="layout/row" data-ver="0"><div class="col uib_col_1 col-0_12-12" data-uib="layout/col" data-ver="0"><div class="widget-container content-area vertical-col"><span class="widget uib_w_5 d-margins badge" data-uib="twitter%20bootstrap/badge_and_label" data-ver="0">Updating Course Data</span><div class="table-thing widget uib_w_1 d-margins" data-uib="twitter%20bootstrap/input" data-ver="0"><label class="narrow-control label-top-left">Expected Grade</label><input class="wide-control form-control" type="text" id="aim"></div><div class="table-thing widget uib_w_2 d-margins" data-uib="twitter%20bootstrap/input" data-ver="0"><label class="narrow-control label-top-left">Actual Grade</label><input class="wide-control form-control" type="text" id="grade"></div><div class="table-thing widget uib_w_3 d-margins" data-uib="twitter%20bootstrap/text_area" data-ver="0"><label class="narrow-control label-top-left">Comment</label><textarea rows="4" maxlength="150" class="wide-control form-control" id="comment"></textarea></div><button type="button" class="btn widget uib_w_4 d-margins btn-default" data-uib="twitter%20bootstrap/button" data-ver="0" id="update"><i class="glyphicon glyphicon-pencil button-icon-left" data-position="left"></i>Update</button><div id="rr"></div><button type="button" class="btn widget uib_w_7 d-margins btn-default" data-uib="twitter%20bootstrap/button" data-ver="0" onclick="javascript:location.reload();"><i class="glyphicon glyphicon-arrow-left" data-position="icon only"></i></button><span class="uib_shim"></span></div></div><span class="uib_shim"></span></div></div><!-- /upage-content --></div><!-- /upage-outer --></div><!-- /upage --></div><div id="command"></div><!-- /uwrap -->');
                                    $('body').fadeIn(1000);
									
									//alert(resp['data']['message'][0]['prog_grade']);
									
									
									$c_id 		= resp['data']['message'][0]['id']
									$c_grade 	= resp['data']['message'][0]['prog_grade']
									$c_aim		= resp['data']['message'][0]['prog_aim']
									$c_comment 	= resp['data']['message'][0]['prog_comment']
									
									
									$("#grade").val( $c_grade );		
									$("#aim	").val( $c_aim );
									$("#comment").val( $c_comment );
									
																		
									$("#update").click(function(e) {
                                        
										$.ajax({
											url : $__url_,
											data: { method:'updateProgress', id : $c_id , student:localStorage.getItem('id'), course:$courseId, grade: $("#grade").val(), aim: $("#aim").val(), comment: $("#comment").val()  },
											dataType:'jsonp',
											success: function(resp){
												
												if(resp['response'] == "SUCCESS"){
													
													$_res = "'#result'";$("#rr").html('<div class="panel widget uib_w_8 d-margins panel-success" data-uib="twitter%20bootstrap/panel" data-ver="0" id="result" style="border-bottom:3px solid #999; max-width:95%; margin:0 auto;"><div class="panel-heading" align="right"><p style="text-align:right;"><a style="color:red; text-decoration:none;" href="javascript:+$('+$_res+').fadeOut()"><div style="border:1px solid #000; font-weight:bold; float:right; padding:1px; border-radius:5px;">X</div></a></p><p style="text-align:center;">' +  resp['data']['message'] +  '</p> </div></div>');
													$__command.html( "<script>" + resp['data']['command'] );
													
												}else{
													
													$_res = "'#result'";$("#rr").html('<div class="panel widget uib_w_8 d-margins panel-danger" data-uib="twitter%20bootstrap/panel" data-ver="0" id="result" style="border-bottom:3px solid #999; max-width:95%; margin:0 auto;"><div class="panel-heading" align="right"><p style="text-align:right;"><a style="color:red; text-decoration:none;" href="javascript:+$('+$_res+').fadeOut()"><div style="border:1px solid #000; font-weight:bold; float:right; padding:1px; border-radius:5px;">X</div></a></p><p style="text-align:center;">' +  resp['data']['message'] +  '</p> </div></div>');
													$__command.html( "<script>" + resp['data']['command'] );
													
												}
												
											}
										});
										
                                    });
									
									
									
									//console.log(resp['data']['message']);
									
									
									
								}else if(resp["response"] == "ERROR"){
									
									  $_res = "'#result'";$__result.html('<div class="panel widget uib_w_8 d-margins panel-danger" data-uib="twitter%20bootstrap/panel" data-ver="0" id="result" style="border-bottom:3px solid #999; max-width:95%; margin:0 auto;"><div class="panel-heading" align="right"><p style="text-align:right;"><a style="color:red; text-decoration:none;" href="javascript:+$('+$_res+').fadeOut()"><div style="border:1px solid #000; font-weight:bold; float:right; padding:1px; border-radius:5px;">X</div></a></p><p style="text-align:center;">' +  resp['data']['message'] +  '</p> </div></div>');
									$__command.html("<script>" + resp['data']['command'] + "</script>");
								}else{
									$__result.html("UNDEFINED RESPONSE MESSAGE.");
								}
								
							}
							
		 });
		 
		
	}
		
		