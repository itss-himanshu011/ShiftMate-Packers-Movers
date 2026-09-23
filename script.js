document.addEventListener("DOMContentLoaded", function () {

    /* ================= HEADER ================= */

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            header.style.background = "#ffffff";
            header.style.boxShadow = "0 3px 15px rgba(0,0,0,.12)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";
        }

    });


    /* ================= DATE ================= */

    const dateInput = document.getElementById("movingDate");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min = `${year}-${month}-${day}`;

    }


    /* ================= QUOTE FORM ================= */

    const quoteForm = document.getElementById("quoteForm");

    if (quoteForm) {

        quoteForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const submitButton =
                quoteForm.querySelector('button[type="submit"]');

            if (submitButton) {

                submitButton.disabled = true;
                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            }

            const formData = new FormData(quoteForm);

            fetch(
                "https://formsubmit.co/ajax/kikku20041127@gmail.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            )

            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Submission failed");
                }

                return response.json();

            })

            .then(function () {

                /*
                This flag allows thankyou.html to open
                ONLY after successful form submission.
                */

                sessionStorage.setItem(
                    "shiftmateSubmitted",
                    "1"
                );

                window.location.href = "thankyou.html";

            })

            .catch(function () {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-paper-plane"></i> Get Free Quote';

                }

                alert(
                    "There was a problem sending your request. Please try again."
                );

            });

        });

    }


    /* ================= PHOTO PREVIEW ================= */

    const photoInput =
        document.getElementById("photos");

    const photoPreview =
        document.getElementById("photo-preview");

    if (photoInput && photoPreview) {

        photoInput.addEventListener(
            "change",
            function () {

                photoPreview.innerHTML = "";

                Array.from(this.files).forEach(
                    function (file) {

                        if (!file.type.startsWith("image/")) {
                            return;
                        }

                        const box =
                            document.createElement("div");

                        box.className =
                            "preview-item";

                        const image =
                            document.createElement("img");

                        image.src =
                            URL.createObjectURL(file);

                        image.alt =
                            file.name;

                        box.appendChild(image);

                        photoPreview.appendChild(box);

                    }
                );

            }
        );

    }


    /* ================= VIDEO PREVIEW ================= */

    const videoInput =
        document.getElementById("video");

    const videoName =
        document.getElementById("video-file-name");

    if (videoInput && videoName) {

        videoInput.addEventListener(
            "change",
            function () {

                videoName.innerHTML = "";

                if (this.files.length > 0) {

                    const chip =
                        document.createElement("span");

                    chip.className =
                        "file-chip";

                    chip.textContent =
                        this.files[0].name;

                    videoName.appendChild(chip);

                }

            }
        );

    }


    /* ================= GALLERY MODAL ================= */

    const galleryModal =
        document.getElementById("galleryModal");

    const galleryModalImage =
        document.getElementById("galleryModalImage");

    const closeGalleryModal =
        document.getElementById("closeGalleryModal");

    document.querySelectorAll(
        ".gallery-container img"
    ).forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                if (!galleryModal || !galleryModalImage) {
                    return;
                }

                galleryModalImage.src =
                    this.src;

                galleryModal.classList.add("show");

                galleryModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }
        );

    });


    if (closeGalleryModal) {

        closeGalleryModal.addEventListener(
            "click",
            function () {

                galleryModal.classList.remove("show");

                galleryModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );

    }


    /* ================= ASK QUESTION ================= */

    const questionModal =
        document.getElementById("questionModal");

    const openQuestionBtn =
        document.getElementById("openQuestionBtn");

    const closeQuestionModal =
        document.getElementById("closeQuestionModal");

    const questionForm =
        document.getElementById("questionForm");


    function openQuestion() {

        questionModal.classList.add("show");

        questionModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeQuestion() {

        questionModal.classList.remove("show");

        questionModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (openQuestionBtn) {
        openQuestionBtn.addEventListener(
            "click",
            openQuestion
        );
    }


    if (closeQuestionModal) {
        closeQuestionModal.addEventListener(
            "click",
            closeQuestion
        );
    }


    if (questionForm) {

        questionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const button =
                    questionForm.querySelector(
                        'button[type="submit"]'
                    );

                button.disabled = true;
                button.textContent = "Sending...";

                const formData =
                    new FormData(questionForm);

                fetch(
                    "https://formsubmit.co/ajax/kikku20041127@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                )

                .then(function (response) {

                    if (!response.ok) {
                        throw new Error("Failed");
                    }

                    return response.json();

                })

                .then(function () {

                    alert(
                        "Your question has been sent successfully."
                    );

                    questionForm.reset();

                    closeQuestion();

                    button.disabled = false;

                    button.textContent =
                        "Submit Question";

                })

                .catch(function () {

                    button.disabled = false;

                    button.textContent =
                        "Submit Question";

                    alert(
                        "Unable to send your question. Please try again."
                    );

                });

            }
        );

    }


    /* ================= REVIEW MODAL ================= */

    const reviewModal =
        document.getElementById("reviewModal");

    const openReviewBtn =
        document.getElementById("openReviewBtn");

    const closeReviewModal =
        document.getElementById("closeReviewModal");

    const reviewForm =
        document.getElementById("reviewForm");


    if (openReviewBtn) {

        openReviewBtn.addEventListener(
            "click",
            function () {

                reviewModal.classList.add("show");

                reviewModal.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }
        );

    }


    if (closeReviewModal) {

        closeReviewModal.addEventListener(
            "click",
            function () {

                reviewModal.classList.remove("show");

                reviewModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }
        );

    }


    /* ================= STAR RATING ================= */

    let reviewRating = 5;

    const stars =
        document.querySelectorAll(
            "#reviewStars .star"
        );

    stars.forEach(function (star) {

        star.addEventListener(
            "click",
            function () {

                reviewRating =
                    Number(this.dataset.value);

                stars.forEach(
                    function (item) {

                        if (
                            Number(item.dataset.value)
                            <= reviewRating
                        ) {

                            item.textContent = "★";
                            item.classList.add("active");

                        } else {

                            item.textContent = "☆";
                            item.classList.remove("active");

                        }

                    }
                );

            }
        );

    });


    /* ================= REVIEW SUBMISSION ================= */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const button =
                    reviewForm.querySelector(
                        'button[type="submit"]'
                    );

                button.disabled = true;
                button.textContent = "Sending...";

                const formData =
                    new FormData(reviewForm);

                formData.append(
                    "rating",
                    reviewRating
                );

                fetch(
                    "https://formsubmit.co/ajax/kikku20041127@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                )

                .then(function (response) {

                    if (!response.ok) {
                        throw new Error("Failed");
                    }

                    return response.json();

                })

                .then(function () {

                    alert(
                        "Thank you! Your review has been submitted."
                    );

                    reviewForm.reset();

                    reviewModal.classList.remove("show");

                    reviewModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    button.disabled = false;

                    button.textContent =
                        "Submit Review";

                })

                .catch(function () {

                    button.disabled = false;

                    button.textContent =
                        "Submit Review";

                    alert(
                        "Unable to submit your review. Please try again."
                    );

                });

            }
        );

    }


    /* =====================================================
       MAP LOCATION PICKER
       ===================================================== */

    let mapPicker = null;
    let mapMarker = null;
    let mapPickerTarget = "from";

    const INDIA_CENTER =
        [22.9734, 78.6569];


    const mapModal =
        document.getElementById("mapModal");

    const mapSearchInput =
        document.getElementById("mapSearchInput");

    const mapSearchBtn =
        document.getElementById("mapSearchBtn");

    const mapSearchResults =
        document.getElementById("mapSearchResults");

    const closeMapModal =
        document.getElementById("closeMapModal");


    function closeMap() {

        if (!mapModal) {
            return;
        }

        mapModal.classList.remove("open");

        mapModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    function setMapAddress(address) {

        const target =
            document.getElementById(
                mapPickerTarget
            );

        if (target) {

            target.value = address;

            target.dispatchEvent(
                new Event(
                    "input",
                    {
                        bubbles: true
                    }
                )
            );

        }

        closeMap();

    }


    function escapeHtml(text) {

        const div =
            document.createElement("div");

        div.textContent =
            text || "";

        return div.innerHTML;

    }


    function createAddress(data, lat, lon) {

        const address =
            data && data.address
                ? data.address
                : {};

        const parts = [

            address.house_number,

            address.road,

            address.neighbourhood,

            address.suburb,

            address.city ||
            address.town ||
            address.village ||
            address.municipality,

            address.state_district,

            address.state,

            address.postcode

        ].filter(Boolean);

        return (
            parts.join(", ")
            ||
            data.display_name
            ||
            `${lat.toFixed(6)}, ${lon.toFixed(6)}`
        );

    }


    function reverseGeocode(lat, lon) {

        const url =
            "https://nominatim.openstreetmap.org/reverse" +
            "?format=jsonv2" +
            "&lat=" + encodeURIComponent(lat) +
            "&lon=" + encodeURIComponent(lon) +
            "&zoom=18" +
            "&addressdetails=1";

        fetch(url, {

            headers: {
                "Accept-Language":
                    "en-IN,en"
            }

        })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Reverse geocoding failed");
            }

            return response.json();

        })

        .then(function (data) {

            const address =
                createAddress(
                    data,
                    lat,
                    lon
                );

            setMapAddress(address);

        })

        .catch(function () {

            setMapAddress(
                `${lat.toFixed(6)}, ${lon.toFixed(6)}`
            );

        });

    }


    function showSearchResults(results) {

        if (!mapSearchResults) {
            return;
        }

        mapSearchResults.innerHTML = "";

        if (!results.length) {

            mapSearchResults.innerHTML =
                '<div class="map-no-results">' +
                'No location found. Try another address.' +
                '</div>';

            return;

        }


        results.forEach(
            function (result) {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.className =
                    "map-search-result";

                button.innerHTML =
                    '<i class="fa-solid fa-location-dot"></i>' +
                    '<span>' +
                    escapeHtml(
                        result.display_name
                    ) +
                    '</span>';


                button.addEventListener(
                    "click",
                    function () {

                        const lat =
                            parseFloat(result.lat);

                        const lon =
                            parseFloat(result.lon);


                        if (mapPicker) {

                            mapPicker.setView(
                                [lat, lon],
                                16
                            );

                        }


                        if (mapMarker) {

                            mapMarker.setLatLng(
                                [lat, lon]
                            );

                        }


                        setMapAddress(
                            result.display_name
                        );

                    }
                );


                mapSearchResults.appendChild(
                    button
                );

            }
        );

    }


    function searchLocation() {

        if (!mapSearchInput) {
            return;
        }

        const query =
            mapSearchInput.value.trim();


        if (query.length < 2) {

            mapSearchResults.innerHTML =
                '<div class="map-no-results">' +
                'Type at least 2 characters.' +
                '</div>';

            return;

        }


        mapSearchResults.innerHTML =
            '<div class="map-no-results">' +
            'Searching...' +
            '</div>';


        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=jsonv2" +
            "&addressdetails=1" +
            "&limit=6" +
            "&countrycodes=in" +
            "&q=" +
            encodeURIComponent(query);


        fetch(url, {

            headers: {
                "Accept-Language":
                    "en-IN,en"
            }

        })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Search failed");
            }

            return response.json();

        })

        .then(function (results) {

            showSearchResults(results);

        })

        .catch(function () {

            mapSearchResults.innerHTML =
                '<div class="map-no-results">' +
                'Search temporarily unavailable. ' +
                'You can tap directly on the map.' +
                '</div>';

        });

    }


    function openMapSelector(target) {

        if (!mapModal) {
            return;
        }

        mapPickerTarget =
            target || "from";


        mapModal.classList.add("open");

        mapModal.setAttribute(
            "aria-hidden",
            "false"
        );


        if (mapSearchInput) {
            mapSearchInput.value = "";
            mapSearchInput.focus();
        }


        if (mapSearchResults) {
            mapSearchResults.innerHTML = "";
        }


        if (!window.L) {

            alert(
                "Map library could not be loaded. Please refresh the page."
            );

            return;

        }


        if (!mapPicker) {

            mapPicker =
                L.map(
                    "map",
                    {
                        zoomControl: true
                    }
                ).setView(
                    INDIA_CENTER,
                    5
                );


            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        "&copy; OpenStreetMap contributors",

                    maxZoom: 19
                }
            ).addTo(mapPicker);


            mapMarker =
                L.marker(
                    INDIA_CENTER
                ).addTo(mapPicker);


            mapPicker.on(
                "click",
                function (event) {

                    const lat =
                        event.latlng.lat;

                    const lon =
                        event.latlng.lng;


                    mapMarker.setLatLng(
                        [lat, lon]
                    );


                    reverseGeocode(
                        lat,
                        lon
                    );

                }
            );

        }


        setTimeout(
            function () {

                mapPicker.invalidateSize();

            },
            200
        );

    }


    document
        .querySelectorAll(".map-target-btn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openMapSelector(
                        button.getAttribute(
                            "data-target"
                        )
                    );

                }
            );

        });


    if (closeMapModal) {

        closeMapModal.addEventListener(
            "click",
            closeMap
        );

    }


    if (mapModal) {

        mapModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    mapModal
                ) {

                    closeMap();

                }

            }
        );

    }


    if (mapSearchBtn) {

        mapSearchBtn.addEventListener(
            "click",
            searchLocation
        );

    }


    if (mapSearchInput) {

        mapSearchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchLocation();

                }

            }
        );

    }


    /* ================= ESCAPE ================= */

    window.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            closeMap();

            if (galleryModal) {

                galleryModal.classList.remove(
                    "show"
                );

            }

            if (reviewModal) {

                reviewModal.classList.remove(
                    "show"
                );

            }

            if (questionModal) {

                questionModal.classList.remove(
                    "show"
                );

            }

        }
    );


    /* ================= BACK TO TOP ================= */

    const backTop =
        document.createElement("button");

    backTop.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    backTop.className =
        "back-to-top";

    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        backTop
    );


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

});
/* =========================
   CUSTOMER REVIEWS
========================= */

.testimonial-container{
    display:grid !important;
    grid-template-columns:repeat(3,1fr);
    gap:24px;
    width:100%;
    max-width:1200px;
    margin:35px auto 0;
    padding:0 20px;
}

.testimonial-card{
    background:#fff !important;
    border:1px solid #e2e5d9 !important;
    border-radius:18px !important;
    padding:28px !important;
    min-height:210px;
    box-shadow:0 8px 25px rgba(0,0,0,.07) !important;
    text-align:center;
}

.testimonial-card .stars{
    color:#68743a;
    font-size:22px;
    letter-spacing:3px;
    margin-bottom:15px;
}

.testimonial-card p{
    color:#555;
    font-size:15px;
    line-height:1.7;
    margin:0 0 18px;
}

.testimonial-card h4{
    margin:0 0 4px;
    color:#222;
    font-size:16px;
}

.testimonial-card span{
    color:#777;
    font-size:13px;
}

@media(max-width:900px){

    .testimonial-container{
        grid-template-columns:1fr 1fr;
    }

}

@media(max-width:600px){

    .testimonial-container{
        grid-template-columns:1fr;
        padding:0 10px;
    }

}
