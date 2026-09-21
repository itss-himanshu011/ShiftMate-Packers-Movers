const header=document.querySelector("header");

window.addEventListener("scroll",function(){
if(window.scrollY>50){
header.style.background="#ffffff";
header.style.boxShadow="0 5px 15px rgba(0,0,0,0.15)";
}
else{
header.style.background="#ffffff";
header.style.boxShadow="0 2px 10px rgba(0,0,0,0.1)";
}
});

const sections = document.querySelectorAll("section:not(#contact)");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease";
    observer.observe(section);
});

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.style.position="fixed";
topBtn.style.bottom="25px";
topBtn.style.right="25px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#0b5ed7";
topBtn.style.color="#fff";
topBtn.style.fontSize="24px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.boxShadow="0 5px 15px rgba(0,0,0,0.2)";
topBtn.style.zIndex="999";

document.body.appendChild(topBtn);

window.addEventListener("scroll",function(){
if(window.scrollY>300){
topBtn.style.display="block";
}
else{
topBtn.style.display="none";
}
});

topBtn.addEventListener("click",function(){
window.scrollTo({
top:0,
behavior:"smooth"
});
});

const cards=document.querySelectorAll(".card");

cards.forEach((card)=>{
card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-10px) scale(1.05)";
});
card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0) scale(1)";
});
});

const quoteForm=document.getElementById("quoteForm");

if(quoteForm){
quoteForm.addEventListener("submit", function(event){
	event.preventDefault();

	const submitButton=quoteForm.querySelector('button[type="submit"]');
	if(submitButton){
		submitButton.disabled=true;
		submitButton.textContent="Sending...";
	}

	const formData=new FormData(quoteForm);

	fetch("https://formsubmit.co/ajax/shiftmate011@gmail.com", {
		method:"POST",
		body:formData,
		headers:{
			"Accept":"application/json"
		}
	})
	.then(function(response){
		if(!response.ok){
			throw new Error("Submission failed");
		}
		return response.json();
	})
	.then(function(){
		window.location.href="thankyou.html";
	})
	.catch(function(){
		if(submitButton){
			submitButton.disabled=false;
			submitButton.textContent="Get Free Quote";
		}
		alert("There was a problem sending your request. Please try again.");
	});
});
}

const photoInput=document.getElementById("photos");
const photoPreview=document.getElementById("photo-preview");
const videoInput=document.getElementById("video");
const videoFileName=document.getElementById("video-file-name");
const photoDropzone=document.getElementById("photos-dropzone");
const videoDropzone=document.getElementById("video-dropzone");
const galleryPhotosInput=document.getElementById("galleryPhotos");
const galleryPreview=document.getElementById("gallery-preview");
const galleryDropzone=document.getElementById("gallery-photos-dropzone");
const galleryContainer=document.querySelector(".gallery-container");
const galleryModal=document.getElementById("galleryModal");
const galleryModalImage=document.getElementById("galleryModalImage");
const closeGalleryModal=document.getElementById("closeGalleryModal");

function renderPhotoPreview(files){
photoPreview.innerHTML="";

if(!files || files.length===0){
return;
}

Array.from(files).forEach((file)=>{
if(!file.type.startsWith("image/")){
return;
}

const previewBox=document.createElement("div");
previewBox.className="preview-item";

const img=document.createElement("img");
img.src=URL.createObjectURL(file);
img.alt=file.name;
img.className="preview-image";

const name=document.createElement("span");
name.textContent=file.name;
name.className="preview-name";

previewBox.appendChild(img);
previewBox.appendChild(name);
photoPreview.appendChild(previewBox);
});
}

function updateVideoSelection(files){
if(!videoFileName){
return;
}

videoFileName.innerHTML="";

if(!files || files.length===0){
return;
}

Array.from(files).forEach((file)=>{
const fileChip=document.createElement("span");
fileChip.className="file-chip";
fileChip.textContent=file.name;
videoFileName.appendChild(fileChip);
});
}

function renderGalleryPreview(files){
if(!galleryPreview || !galleryContainer){
return;
}

galleryPreview.innerHTML="";

if(!files || files.length===0){
return;
}

Array.from(files).forEach((file)=>{
if(!file.type.startsWith("image/")){
return;
}

const previewBox=document.createElement("div");
previewBox.className="preview-item";

const img=document.createElement("img");
img.src=URL.createObjectURL(file);
img.alt=file.name;
img.className="preview-image";

const name=document.createElement("span");
name.textContent=file.name;
name.className="preview-name";

previewBox.appendChild(img);
previewBox.appendChild(name);
galleryPreview.appendChild(previewBox);

const galleryItem=document.createElement("div");
galleryItem.className="gallery-item";

const galleryImg=document.createElement("img");
galleryImg.src=URL.createObjectURL(file);
galleryImg.alt=file.name;

galleryItem.appendChild(galleryImg);
galleryContainer.appendChild(galleryItem);
});
}

function openGalleryModal(imageSrc){
if(!galleryModal || !galleryModalImage){
return;
}

galleryModalImage.src=imageSrc;
galleryModal.classList.add("show");
galleryModal.setAttribute("aria-hidden","false");
}

function closeGalleryModalView(){
if(!galleryModal || !galleryModalImage){
return;
}

galleryModal.classList.remove("show");
galleryModal.setAttribute("aria-hidden","true");
galleryModalImage.src="";
}

function attachDropzone(dropzone, input, onDropCallback){
if(!dropzone || !input){
return;
}

	dropzone.addEventListener("dragover", function(event){
		event.preventDefault();
		dropzone.classList.add("dragover");
	});

	dropzone.addEventListener("dragleave", function(){
		dropzone.classList.remove("dragover");
	});

	dropzone.addEventListener("drop", function(event){
		event.preventDefault();
		dropzone.classList.remove("dragover");

		const droppedFiles=event.dataTransfer.files;
		if(!droppedFiles || droppedFiles.length===0){
			return;
		}

		const dataTransfer=new DataTransfer();
		Array.from(droppedFiles).forEach((file)=>dataTransfer.items.add(file));
		input.files=dataTransfer.files;
		if(typeof onDropCallback === "function"){
			onDropCallback(dataTransfer.files);
		}
	});
}

if(photoInput && photoPreview){
photoInput.addEventListener("change", function(){
renderPhotoPreview(this.files);
});
}

if(galleryPhotosInput && galleryPreview){
galleryPhotosInput.addEventListener("change", function(){
renderGalleryPreview(this.files);
});
}

if(videoInput){
videoInput.addEventListener("change", function(){
updateVideoSelection(this.files);
});
}

attachDropzone(photoDropzone, photoInput, function(files){
renderPhotoPreview(files);
});

attachDropzone(galleryDropzone, galleryPhotosInput, function(files){
renderGalleryPreview(files);
});

attachDropzone(videoDropzone, videoInput, function(files){
updateVideoSelection(files);
});

if(galleryContainer){
galleryContainer.querySelectorAll("img").forEach((img)=>{
img.addEventListener("click", function(){
openGalleryModal(this.src);
});
});
}

if(closeGalleryModal){
closeGalleryModal.addEventListener("click", closeGalleryModalView);
}

if(galleryModal){
galleryModal.addEventListener("click", function(event){
if(event.target === galleryModal){
closeGalleryModalView();
}
});
}

window.addEventListener("keydown", function(event){
if(event.key === "Escape" && galleryModal && galleryModal.classList.contains("show")){
closeGalleryModalView();
}
});


// FAQ question modal handlers
const openQuestionBtn = document.getElementById('openQuestionBtn');
const questionModal = document.getElementById('questionModal');
const closeQuestionModal = document.getElementById('closeQuestionModal');
const questionForm = document.getElementById('questionForm');

if(openQuestionBtn && questionModal){
	openQuestionBtn.addEventListener('click', function(){
		questionModal.setAttribute('aria-hidden','false');
	});
}

if(closeQuestionModal && questionModal){
	closeQuestionModal.addEventListener('click', function(){
		questionModal.setAttribute('aria-hidden','true');
	});
}

if(questionModal){
	questionModal.addEventListener('click', function(event){
		if(event.target === questionModal){
			questionModal.setAttribute('aria-hidden','true');
		}
	});
}

if(questionForm){
	questionForm.addEventListener('submit', function(e){
		e.preventDefault();

		const submitBtn = questionForm.querySelector('button[type="submit"]');
		if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

		const formData = new FormData(questionForm);

		fetch('https://formsubmit.co/ajax/shiftmate011@gmail.com', {
			method: 'POST',
			body: formData,
			headers: { 'Accept': 'application/json' }
		})
		.then(function(response){
			if(!response.ok) throw new Error('Submission failed');
			return response.json();
		})
		.then(function(){
			questionModal.setAttribute('aria-hidden','true');
			if(submitBtn){ submitBtn.textContent = 'Submitted'; }
			alert('Thanks! Your question has been sent. We will respond via email.');
			questionForm.reset();
		})
		.catch(function(){
			if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Submit Question'; }
			alert('There was a problem sending your question. Please try again.');
		});
	});
}

// Review modal handlers (open/close, rating, submit, render)
const openReviewBtnEl = document.getElementById('openReviewBtn');
const reviewModal = document.getElementById('reviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');
const reviewForm = document.getElementById('reviewForm');
const reviewStars = document.getElementById('reviewStars');
const reviewsList = document.getElementById('reviewsList');

let reviewRating = 5;

function escapeHtml(str){
	return String(str)
		.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;')
		.replace(/"/g,'&quot;')
		.replace(/'/g,'&#039;');
}

if(reviewStars){
	// initialize stars (default 5)
	reviewStars.querySelectorAll('.star').forEach(s=> s.classList.toggle('active', parseInt(s.getAttribute('data-value'))<=reviewRating));
	reviewStars.querySelectorAll('.star').forEach(btn => {
		btn.addEventListener('click', function(){
			reviewRating = parseInt(this.getAttribute('data-value'),10) || 0;
			reviewStars.querySelectorAll('.star').forEach(s=> s.classList.toggle('active', parseInt(s.getAttribute('data-value'))<=reviewRating));
		});
	});
}

if(openReviewBtnEl && reviewModal){
	openReviewBtnEl.addEventListener('click', function(){
		reviewModal.setAttribute('aria-hidden','false');
	});
}

if(closeReviewModal && reviewModal){
	closeReviewModal.addEventListener('click', function(){
		reviewModal.setAttribute('aria-hidden','true');
	});
}

if(reviewModal){
	reviewModal.addEventListener('click', function(event){
		if(event.target === reviewModal){
			reviewModal.setAttribute('aria-hidden','true');
		}
	});
}

if(reviewForm){
	reviewForm.addEventListener('submit', function(e){
		e.preventDefault();

		const submitBtn = reviewForm.querySelector('button[type="submit"]');
		if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

		const formData = new FormData(reviewForm);
		formData.append('rating', reviewRating);

		fetch('https://formsubmit.co/ajax/shiftmate011@gmail.com', {
			method: 'POST',
			body: formData,
			headers: { 'Accept': 'application/json' }
		})
		.then(function(response){
			if(!response.ok) throw new Error('Submission failed');
			return response.json();
		})
		.then(function(){
			// render review on page
			const name = document.getElementById('reviewName') ? document.getElementById('reviewName').value : 'Anonymous';
			const city = document.getElementById('reviewCity') ? document.getElementById('reviewCity').value : '';
			const text = document.getElementById('reviewText') ? document.getElementById('reviewText').value : '';

			const card = document.createElement('div');
			card.className = 'testimonial-card';
			const starsHtml = '★'.repeat(reviewRating) + '☆'.repeat(Math.max(0,5-reviewRating));
			card.innerHTML = '<img src="images/avatar1.svg" alt="Customer avatar"><h3>' + escapeHtml(name) + '</h3><p class="testimonial-city">' + escapeHtml(city) + '</p><div class="stars">' + starsHtml + '</div><p>' + escapeHtml(text) + '</p>';

			// attach uploaded media previews to the review card
			const files = reviewFilesInput ? reviewFilesInput.files : null;
			if(files && files.length){
				const mediaWrap = document.createElement('div');
				mediaWrap.className = 'review-media';
				Array.from(files).forEach(file=>{
					if(file.type.startsWith('image/')){
						const img = document.createElement('img');
						img.src = URL.createObjectURL(file);
						img.alt = file.name;
						img.style.maxWidth = '120px';
						img.style.margin = '6px';
						mediaWrap.appendChild(img);
					}else if(file.type.startsWith('video/')){
						const vid = document.createElement('video');
						vid.src = URL.createObjectURL(file);
						vid.controls = true;
						vid.style.maxWidth = '200px';
						vid.style.display = 'block';
						vid.style.margin = '6px 0';
						mediaWrap.appendChild(vid);
					}
				});
				card.appendChild(mediaWrap);
			}

			if(reviewsList){ reviewsList.prepend(card); }

			reviewModal.setAttribute('aria-hidden','true');
			if(submitBtn){ submitBtn.textContent = 'Submitted'; }
			reviewForm.reset();
			reviewRating = 5;
			if(reviewStars) reviewStars.querySelectorAll('.star').forEach(s=> s.classList.remove('active'));
		})
		.catch(function(){
			if(submitBtn){ submitBtn.disabled = false; submitBtn.textContent = 'Submit Review'; }
			alert('There was a problem sending your review. Please try again.');
		});
	});
}

// Combined review files preview handler (images and videos)
const reviewFilesInput = document.getElementById('reviewFiles');
const reviewFilesPreview = document.getElementById('reviewFilesPreview');

function renderReviewFilesPreview(files){
	if(!reviewFilesPreview) return;
	reviewFilesPreview.innerHTML = '';
	if(!files || files.length === 0) return;

	Array.from(files).forEach(file => {
		const box = document.createElement('div');
		box.className = 'preview-item';

		if(file.type.startsWith('image/')){
			const img = document.createElement('img');
			img.src = URL.createObjectURL(file);
			img.alt = file.name;
			box.appendChild(img);
		} else if(file.type.startsWith('video/')){
			const vid = document.createElement('video');
			vid.src = URL.createObjectURL(file);
			vid.controls = true;
			box.appendChild(vid);
		} else {
			const span = document.createElement('span');
			span.textContent = file.name;
			box.appendChild(span);
		}

		reviewFilesPreview.appendChild(box);
	});
}

if(reviewFilesInput){
	reviewFilesInput.addEventListener('change', function(){
		renderReviewFilesPreview(this.files);
	});
}
