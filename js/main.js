// 🧩인트로
window.addEventListener("load", function(){
	let start=document.querySelector("#start");
	let pageList=document.querySelectorAll(".container section");
	let header = document.querySelector("header"); 
	let navList=document.querySelectorAll("header nav li");
	let skill=document.querySelector("#skill")

	let isMobile="";
	let mobileMenuWidth;

	let nav=document.querySelector("header nav");
	let tabMenu=document.getElementById("tab");
	let dim=document.querySelector(".dim");

	function resizeFunction(){
		mobileMenuWidth=nav.clientWidth;

		if(window.innerWidth > 720) {
			if(isMobile != "desktop") isMobile="desktop";
		}
		else {
			if(isMobile != "mobile") isMobile="mobile";
		}
	}

	resizeFunction();

window.addEventListener("resize", function() {
  resizeFunction();

  if (isMobile == "desktop" && nav.classList.contains("on")) {
    document.body.classList.remove("fixed");
    tab.classList.remove("on");
    nav.classList.remove("on");
    dim.classList.remove("active");

    gsap.to(tab, {
      x: 0,
      duration: 0.3
    });
  }
});

tab.addEventListener("click", function(e) {
  e.preventDefault();

  if (document.body.classList.contains("fixed") == false) {
    document.body.classList.add("fixed");
    tab.classList.add("on");
    nav.classList.add("on");
    dim.classList.add("active");

    gsap.to(tab, {
      x: -1 * mobileMenuWidth,
      duration: 0.3
    });
  } else {
    document.body.classList.remove("fixed");
    tab.classList.remove("on");
    nav.classList.remove("on");
    dim.classList.remove("active");

    gsap.to(tab, {
      x: 0,
      duration: 0.3
    });
  }
});


const subMenuLinks = nav.querySelectorAll('a');

subMenuLinks.forEach(link => {
  link.addEventListener("click", function() {
    document.body.classList.remove("fixed");
    tab.classList.remove("on");
    nav.classList.remove("on");
    dim.classList.remove("active");

    gsap.to(tab, {
      x: 0,
      duration: 0.3
    });

  });
});



	lenisAnimation();

	navList.forEach(function(item, i){
		navList[i].addEventListener("click", function(e){
			e.preventDefault();
		
			topPos=pageList[i].offsetTop;

			gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){
				// nav.classList.remove("active");
			}});
		});
	});

	// 인트로 쿠키
	gsap.set(".main .keytext .txt span, .main .subtxt span", {
		opacity: 0,
		yPercent: 110
	});

	function mainTextMotion(){
		gsap.to(".main .keytext .txt span, .main .subtxt span", {
			opacity: 1,
			yPercent: 0,
			duration: 0.5,
			stagger: 0.05,
			ease: "power1"
		});
	}

	function GetCookie(name){
		let value=null, search=name+"=";

		if(document.cookie.length > 0){
			let offset=document.cookie.indexOf(search);

			if(offset != -1){
				offset+=search.length;
				let end=document.cookie.indexOf(";", offset);

				if(end == -1) end=document.cookie.length;
				value=decodeURI(document.cookie.substring(offset, end));
			}
		} return value;
	}

	function setCookie(name, value, expiredays){
		let days=expiredays;
		let expires;

		if(days){
			let date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires="; expires="+date.toGMTString();
		}
		else{
			expires="";
		}

		document.cookie=name+"="+value+expires+"; path=/";
	}

	if(GetCookie("intro") != "hide"){
		document.querySelector("#intro").classList.add("visible");

		gsap.fromTo(".loding_bar .progress .bar", { width: 0 }, {
			width: "100%",
			duration: 2,
			ease: "none",
			onComplete : function(){
				gsap.to(intro, {
					opacity: 0,
					duration: 0.8,
					onComplete: function(){
						intro.remove();
						mainTextMotion();
						setCookie("intro", "hide", 1);
					}
				})
			}
		});
	}
	else{
		intro.remove();
		mainTextMotion();
	}

	// 메인 페이지 비디오 속도 조절
	const video = document.querySelector(".bg_video");
	video.playbackRate = 0.4; // 원하는 속도로 설정 (예: 1.5배)

	const ftVideo=document.querySelector(".ft_video");
	ftVideo.playbackRate = 0.4;


	// 자기소개 p태그 인터렉션
	gsap.fromTo("#me .contant p",
			{ y: 50, opacity: 0 }, 
			{
				y: 0, 
				opacity: 1,
				stagger: 0.4, 
				duration: 3, 
				ease: "power2.out", 
				scrollTrigger: {
						trigger: "#me", 
						start: "top center", 
						end: "bottom center", 
				}
			}
	);

	// 모토
	let pTags=[
		document.querySelector(".first-parallel"),
		document.querySelector(".second-parallel"),
		document.querySelector(".third-parallel"),
	];

	let textArrays=[
		"User-friendly User-centered User-friendly User-friendly User-centered User-friendly",
		"Adaptable Team Player Adaptable Team Player Adaptable Team Player Adaptable Team Player",
		"Creatively Solving Problems Creatively Solving Problems Creatively Solving Problems Creatively Solving Problems"
	].map(text => text.split(" "));

	scrollText(pTags, textArrays);


	// .txtbox 순차 애니메이션
	gsap.fromTo("#skill .contants .txtbox",
		{ y: 100, opacity: 0 },
		{
			y: 0, 
			opacity: 1, 
			stagger: 1, 
			duration: 2, 
			ease: "power2.out", 

				// ScrollTrigger 설정
			scrollTrigger: {
				trigger: "#skill", 
				start: "top 40%", 
				end: "bottom 40%",
				// markers: true
			}
		}
	);

	// 프로젝트
	let openSoureList=document.querySelectorAll("#project .item_img");

	openSoureList.forEach(function(item, i){
		item.addEventListener("mousemove", function(e){
			let w=item.clientWidth;
			let h=item.clientHeight;

			let xVal=e.offsetX-w/2;
			let yVal=e.offsetY-h/2;

			gsap.to(item.querySelector("img"), { x: xVal/2, y: yVal/2 });
		});
	});

	// 프로젝트 라인 인터렉션
		gsap.fromTo("#project .right",
		{ x: -100, opacity: 0 }, 
		{
			x: 0, 
			opacity: 1, 
			stagger: 0.8, 
			duration: 2, 
			ease: "power2.out", 

			scrollTrigger: {
				trigger: "#project", 
				start: "top center", 
				end: "bottom center",
				// markers: true
			}
		}
	);

	// 오픈소스
		new Swiper(".updateSwiper", {
			slidesPerView: 1,
			centeredSlides: true,
			spaceBetween: 10,
			breakpoints: {
				768: {
					spaceBetween: 0,
					pagination: {
						el: ".updateSwiper .swiper-pagination",
						type: "fraction"
					},
					navigation: {
						prevEl: ".updateSwiper .swiper-button-prev",
						nextEl: ".updateSwiper .swiper-button-next"
					}
				}
			}
		});
	
		const mediaQuery=gsap.matchMedia();
	
		mediaQuery.add("(min-width: 769px)", function(){
			gsap.from(".comment .aosup", {
				y: 300,
				opacity: 0,
				duration: 0.8,
				scrollTrigger: {
					trigger: ".comment",
					scrub: true,
					start: "top 50%"
				}
			});
	
			let deviceWidth=window.innerWidth;
	
			const updateTl=gsap.timeline({
				scrollTrigger: {
					trigger: ".update",
					scrub: true,
					pin: true,
					start: "top top",
					end: "+="+1200
				}
			});
	
			updateTl.to(".open_top", {
				x: deviceWidth >= 1920 ? 414 : (deviceWidth >= 1024 ? 265 : 90)
			}, "ontime1");
	
			updateTl.to(".open_bottom", {
				x: deviceWidth >= 1920 ? -414 : (deviceWidth >= 1024 ? -265 : -90)
			}, "ontime1");
	
			updateTl.to(".open_top", { y: -194 }, "ontime2");
	
			updateTl.to(".open_bottom", { y: 200 }, "ontime2");
	
			updateTl.to(".updateSwiper", { display: "block", height: 400 }, "ontime2");
	
			updateTl.to(".update_btn", { display: "block", opacity: 1});
		});
	
		mediaQuery.add("(max-width: 768px)", function(){
	
			gsap.from(".update_title", {
				y: -50,
				opacity: 0,
				duration: 1,
				scrollTrigger: {
					trigger: ".update",
					start: "top 80%",
					toggleActions: "play none none reset"
				}
			});
		});

	});







