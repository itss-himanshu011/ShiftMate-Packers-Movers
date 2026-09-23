/* =========================================================
   SHIFTMATE PACKERS & MOVERS
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 30) {
            header.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.12)";
        } else {
            header.style.boxShadow =
                "0 2px 15px rgba(0,0,0,.08)";
        }

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topBtn = document.createElement("button");

    topBtn.id = "backToTop";
    topBtn.innerHTML = "↑";
    topBtn.setAttribute("aria-label", "Back to top");

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

    });

    topBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       SCROLL ANIMATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section:not(.hero)"
        );

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.08
            }
        );

    sections.forEach(function (section) {

        section.style.opacity = "0";
        section.style.transform =
            "translateY(25px)";
        section.style.transition =
            "opacity .7s ease, transform .7s ease";

        observer.observe(section);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       DATE PICKER
    ===================================================== */

    const movingDate =
        document.getElementById("movingDate");

    if (movingDate) {

        const today =
            new Date().toISOString().split("T")[0];

        movingDate.min = today;

    }


    /* =====================================================
       QUOTE FORM
    ===================================================== */

    const quoteForm =
        document.getElementById("quoteForm");

    const quoteSuccess =
        document.getElementById("quoteSuccess");

    const quoteReplyTo =
        document.getElementById("quoteReplyTo");

    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const email =
                    quoteForm.querySelector(
                        'input[name="email"]'
                    );

                if (
                    email &&
                    quoteReplyTo
                ) {
                    quoteReplyTo.value =
                        email.value;
                }

                const submitButton =
                    quoteForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                }

                const formData =
                    new FormData(quoteForm);

                fetch(
                    "https://formsubmit.co/ajax/shiftmate011@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                )

                .then(function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Submission failed"
                        );
                    }

                    return response.json();

                })

                .then(function () {

                    quoteForm.reset();

                    if (quoteSuccess) {
                        quoteSuccess.classList.add(
                            "show"
                        );
                    }

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Get Free Quote';

                    }

                    setTimeout(function () {

                        if (quoteSuccess) {
                            quoteSuccess.classList.remove(
                                "show"
                            );
                        }

                    }, 7000);

                })

                .catch(function () {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Get Free Quote';

                    }

                    alert(
                        "There was a problem sending your enquiry. Please try again."
                    );

                });

            }
        );

    }


    /* =====================================================
       PHOTO PREVIEW
    ===================================================== */

    const photoInput =
        document.getElementById("photos");

    const photoPreview =
        document.getElementById(
            "photo-preview"
        );

    function renderPhotoPreview(files) {

        if (!photoPreview) return;

        photoPreview.innerHTML = "";

        if (!files || !files.length) {
            return;
        }

        Array.from(files).forEach(function (file) {

            if (!file.type.startsWith("image/")) {
                return;
            }

            const box =
                document.createElement("div");

            box.className =
                "preview-item";

            const img =
                document.createElement("img");

            img.src =
                URL.createObjectURL(file);

            img.alt =
                file.name;

            const name =
                document.createElement("span");

            name.className =
                "preview-name";

            name.textContent =
                file.name;

            box.appendChild(img);
            box.appendChild(name);

            photoPreview.appendChild(box);

        });

    }

    if (photoInput) {

        photoInput.addEventListener(
            "change",
            function () {
                renderPhotoPreview(
                    this.files
                );
            }
        );

    }


    /* =====================================================
       VIDEO PREVIEW
    ===================================================== */

    const videoInput =
        document.getElementById("video");

    const videoFileName =
        document.getElementById(
            "video-file-name"
        );

    if (videoInput) {

        videoInput.addEventListener(
            "change",
            function () {

                if (!videoFileName) return;

                videoFileName.innerHTML = "";

                if (!this.files.length) {
                    return;
                }

                Array.from(this.files).forEach(
                    function (file) {

                        const chip =
                            document.createElement(
                                "span"
                            );

                        chip.textContent =
                            file.name;

                        videoFileName.appendChild(
                            chip
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       DRAG & DROP
    ===================================================== */

    function setupDropzone(
        dropzone,
        input,
        callback
    ) {

        if (!dropzone || !input) {
            return;
        }

        dropzone.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

                dropzone.classList.add(
                    "dragover"
                );

            }
        );

        dropzone.addEventListener(
            "dragleave",
            function () {

                dropzone.classList.remove(
                    "dragover"
                );

            }
        );

        dropzone.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();

                dropzone.classList.remove(
                    "dragover"
                );

                const files =
                    event.dataTransfer.files;

                if (!files.length) {
                    return;
                }

                const transfer =
                    new DataTransfer();

                Array.from(files).forEach(
                    function (file) {
                        transfer.items.add(file);
                    }
                );

                input.files =
                    transfer.files;

                if (callback) {
                    callback(
                        transfer.files
                    );
                }

            }
        );

    }

    setupDropzone(
        document.getElementById(
            "photos-dropzone"
        ),
        photoInput,
        renderPhotoPreview
    );

    setupDropzone(
        document.getElementById(
            "video-dropzone"
        ),
        videoInput,
        function (files) {

            if (!videoFileName) return;

            videoFileName.textContent =
                files.length
                    ? files[0].name
                    : "";

        }
    );


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryModal =
        document.getElementById(
            "galleryModal"
        );

    const galleryModalImage =
        document.getElementById(
            "galleryModalImage"
        );

    const closeGalleryModal =
        document.getElementById(
            "closeGalleryModal"
        );

    document
        .querySelectorAll(
            ".gallery-container img"
        )
        .forEach(function (img) {

            img.addEventListener(
                "click",
                function () {

                    if (!galleryModal ||
                        !galleryModalImage) {
                        return;
                    }

                    galleryModalImage.src =
                        this.src;

                    galleryModal.classList.add(
                        "show"
                    );

                    galleryModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                }
            );

        });

    function closeGallery() {

        if (!galleryModal) return;

        galleryModal.classList.remove(
            "show"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    if (closeGalleryModal) {

        closeGalleryModal.addEventListener(
            "click",
            closeGallery
        );

    }

    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    galleryModal
                ) {
                    closeGallery();
                }

            }
        );

    }


    /* =====================================================
       FAQ
    ===================================================== */

    document
        .querySelectorAll(
            ".faq-list details"
        )
        .forEach(function (detail) {

            detail.addEventListener(
                "toggle",
                function () {

                    if (!detail.open) {
                        return;
                    }

                    document
                        .querySelectorAll(
                            ".faq-list details"
                        )
                        .forEach(
                            function (other) {

                                if (
                                    other !== detail
                                ) {
                                    other.open =
                                        false;
                                }

                            }
                        );

                }
            );

        });


    /* =====================================================
       QUESTION MODAL
    ===================================================== */

    const openQuestionBtn =
        document.getElementById(
            "openQuestionBtn"
        );

    const questionModal =
        document.getElementById(
            "questionModal"
        );

    const closeQuestionModal =
        document.getElementById(
            "closeQuestionModal"
        );

    const questionForm =
        document.getElementById(
            "questionForm"
        );

    function openQuestion() {

        if (!questionModal) return;

        questionModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    function closeQuestion() {

        if (!questionModal) return;

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

    if (questionModal) {

        questionModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    questionModal
                ) {
                    closeQuestion();
                }

            }
        );

    }


    /* =====================================================
       ASK QUESTION → EMAIL
    ===================================================== */

    if (questionForm) {

        questionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const submitButton =
                    questionForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML =
                        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                }

                const formData =
                    new FormData(
                        questionForm
                    );

                formData.append(
                    "_subject",
                    "New ShiftMate Website Question"
                );

                formData.append(
                    "_template",
                    "table"
                );

                const email =
                    document.getElementById(
                        "qEmail"
                    );

                if (email) {

                    formData.append(
                        "_replyto",
                        email.value
                    );

                }

                fetch(
                    "https://formsubmit.co/ajax/shiftmate011@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                )

                .then(function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Question failed"
                        );
                    }

                    return response.json();

                })

                .then(function () {

                    closeQuestion();

                    questionForm.reset();

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Send Question';

                    }

                    alert(
                        "Thank you! Your question has been sent to ShiftMate."
                    );

                })

                .catch(function () {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            '<i class="fa-solid fa-paper-plane"></i> Send Question';

                    }

                    alert(
                        "There was a problem sending your question. Please try again."
                    );

                });

            }
        );

    }


    /* =====================================================
       REVIEW MODAL
    ===================================================== */

    const openReviewBtn =
        document.getElementById(
            "openReviewBtn"
        );

    const reviewModal =
        document.getElementById(
            "reviewModal"
        );

    const closeReviewModal =
        document.getElementById(
            "closeReviewModal"
        );

    const reviewForm =
        document.getElementById(
            "reviewForm"
        );

    const reviewStars =
        document.getElementById(
            "reviewStars"
        );

    const reviewsList =
        document.getElementById(
            "reviewsList"
        );

    let reviewRating = 5;


    function openReview() {

        if (!reviewModal) return;

        reviewModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeReview() {

        if (!reviewModal) return;

        reviewModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (openReviewBtn) {

        openReviewBtn.addEventListener(
            "click",
            openReview
        );

    }


    if (closeReviewModal) {

        closeReviewModal.addEventListener(
            "click",
            closeReview
        );

    }


    if (reviewModal) {

        reviewModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    reviewModal
                ) {
                    closeReview();
                }

            }
        );

    }


    /* =====================================================
       REVIEW STARS
    ===================================================== */

    if (reviewStars) {

        const stars =
            reviewStars.querySelectorAll(
                ".star"
            );

        function updateStars() {

            stars.forEach(
                function (star) {

                    const value =
                        Number(
                            star.dataset.value
                        );

                    star.classList.toggle(
                        "active",
                        value <= reviewRating
                    );

                }
            );

        }

        reviewRating = 5;
        updateStars();

        stars.forEach(
            function (star) {

                star.addEventListener(
                    "click",
                    function () {

                        reviewRating =
                            Number(
                                this.dataset.value
                            );

                        updateStars();

                    }
                );

            }
        );

    }


    /* =====================================================
       REVIEW FILE PREVIEW
    ===================================================== */

    const reviewFiles =
        document.getElementById(
            "reviewFiles"
        );

    const reviewFilesPreview =
        document.getElementById(
            "reviewFilesPreview"
        );

    function renderReviewFiles(files) {

        if (!reviewFilesPreview) {
            return;
        }

        reviewFilesPreview.innerHTML = "";

        Array.from(files || [])
            .forEach(function (file) {

                const box =
                    document.createElement(
                        "div"
                    );

                box.className =
                    "preview-item";

                if (
                    file.type.startsWith(
                        "image/"
                    )
                ) {

                    const img =
                        document.createElement(
                            "img"
                        );

                    img.src =
                        URL.createObjectURL(
                            file
                        );

                    box.appendChild(img);

                } else if (
                    file.type.startsWith(
                        "video/"
                    )
                ) {

                    const video =
                        document.createElement(
                            "video"
                        );

                    video.src =
                        URL.createObjectURL(
                            file
                        );

                    video.controls = true;

                    box.appendChild(video);

                }

                reviewFilesPreview.appendChild(
                    box
                );

            });

    }


    if (reviewFiles) {

        reviewFiles.addEventListener(
            "change",
            function () {

                renderReviewFiles(
                    this.files
                );

            }
        );

    }


    /* =====================================================
       REVIEW SUBMIT
    ===================================================== */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const submitButton =
                    reviewForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Sending...";

                }

                const name =
                    document.getElementById(
                        "reviewName"
                    ).value;

                const city =
                    document.getElementById(
                        "reviewCity"
                    ).value;

                const text =
                    document.getElementById(
                        "reviewText"
                    ).value;

                const formData =
                    new FormData(
                        reviewForm
                    );

                formData.append(
                    "rating",
                    reviewRating
                );

                formData.append(
                    "_subject",
                    "New ShiftMate Customer Review"
                );

                formData.append(
                    "_template",
                    "table"
                );

                fetch(
                    "https://formsubmit.co/ajax/shiftmate011@gmail.com",
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                )

                .then(function (response) {

                    if (!response.ok) {
                        throw new Error(
                            "Review failed"
                        );
                    }

                    return response.json();

                })

                .then(function () {

                    const empty =
                        reviewsList.querySelector(
                            ".testimonial-empty"
                        );

                    if (empty) {
                        empty.remove();
                    }

                    const card =
                        document.createElement(
                            "div"
                        );

                    card.className =
                        "testimonial-card";

                    const stars =
                        "★".repeat(
                            reviewRating
                        ) +
                        "☆".repeat(
                            5 - reviewRating
                        );

                    card.innerHTML = `
                        <h3>${escapeHTML(name)}</h3>
                        <div class="testimonial-city">
                            ${escapeHTML(city)}
                        </div>
                        <div class="stars">
                            ${stars}
                        </div>
                        <p>
                            ${escapeHTML(text)}
                        </p>
                    `;

                    if (reviewsList) {
                        reviewsList.prepend(card);
                    }

                    reviewForm.reset();

                    reviewRating = 5;

                    if (reviewStars) {

                        reviewStars
                            .querySelectorAll(
                                ".star"
                            )
                            .forEach(
                                function (star) {

                                    const value =
                                        Number(
                                            star.dataset.value
                                        );

                                    star.classList.toggle(
                                        "active",
                                        value <= 5
                                    );

                                }
                            );

                    }

                    closeReview();

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Submit Review";

                    }

                    alert(
                        "Thank you for sharing your review!"
                    );

                })

                .catch(function () {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Submit Review";

                    }

                    alert(
                        "There was a problem submitting your review. Please try again."
                    );

                });

            }
        );

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       MAP
    ===================================================== */

    let mapPicker = null;
    let mapMarker = null;

    let mapPickerTarget = "from";

    const mapModal =
        document.getElementById(
            "mapModal"
        );

    const closeMapModal =
        document.getElementById(
            "closeMapModal"
        );

    const mapSearchInput =
        document.getElementById(
            "mapSearchInput"
        );

    const mapSearchBtn =
        document.getElementById(
            "mapSearchBtn"
        );

    const mapSearchResults =
        document.getElementById(
            "mapSearchResults"
        );


    /* =====================================================
       ADDRESS FORMAT
    ===================================================== */

    function formatAddress(data) {

        if (!data) return "";

        const address =
            data.address || {};

        const parts = [

            address.house_number,
            address.road,
            address.neighbourhood,
            address.suburb,
            address.city ||
            address.town ||
            address.village,
            address.state,
            address.postcode,
            address.country

        ].filter(Boolean);

        return (
            parts.join(", ") ||
            data.display_name ||
            ""
        );

    }


    /* =====================================================
       SELECT MAP LOCATION
    ===================================================== */

    function selectLocation(
        lat,
        lng,
        displayAddress
    ) {

        if (!mapPicker) return;

        mapPicker.setView(
            [lat, lng],
            16,
            {
                animate:true
            }
        );

        if (!mapMarker) {

            mapMarker =
                L.marker(
                    [lat, lng]
                ).addTo(
                    mapPicker
                );

        } else {

            mapMarker.setLatLng(
                [lat, lng]
            );

        }

        const target =
            document.getElementById(
                mapPickerTarget
            );

        if (target) {

            target.value =
                displayAddress ||
                `${lat}, ${lng}`;

        }

        closeMap();

    }


    /* =====================================================
       OPEN MAP
    ===================================================== */

    function openMap(targetFieldId) {

        if (!mapModal) return;

        mapPickerTarget =
            targetFieldId || "from";

        mapModal.classList.add(
            "open"
        );

        mapModal.setAttribute(
            "aria-hidden",
            "false"
        );

        if (!window.L) {

            alert(
                "Map library is not available right now."
            );

            return;

        }

        if (!mapPicker) {

            mapPicker =
                L.map("map", {
                    zoomControl:true
                }).setView(
                    [26.8467,80.9462],
                    6
                );

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        "&copy; OpenStreetMap contributors"
                }
            ).addTo(
                mapPicker
            );

            mapMarker =
                L.marker(
                    [26.8467,80.9462]
                ).addTo(
                    mapPicker
                );

            mapPicker.on(
                "click",
                function (event) {

                    const lat =
                        event.latlng.lat;

                    const lng =
                        event.latlng.lng;

                    if (mapMarker) {
                        mapMarker.setLatLng(
                            [lat,lng]
                        );
                    }

                    fetch(
                        "https://nominatim.openstreetmap.org/reverse?" +
                        new URLSearchParams({

                            format:"jsonv2",

                            lat:lat,

                            lon:lng,

                            zoom:"18",

                            addressdetails:"1",

                            "accept-language":"en"

                        })
                    )

                    .then(
                        response =>
                            response.json()
                    )

                    .then(
                        data => {

                            selectLocation(
                                lat,
                                lng,
                                formatAddress(data)
                            );

                        }
                    )

                    .catch(
                        function () {

                            selectLocation(
                                lat,
                                lng,
                                `${lat}, ${lng}`
                            );

                        }
                    );

                }
            );

        }

        setTimeout(
            function () {

                mapPicker.invalidateSize();

            },
            150
        );

        if (mapSearchInput) {

            mapSearchInput.value = "";

            mapSearchInput.focus();

        }

        if (mapSearchResults) {

            mapSearchResults.innerHTML =
                "";

            mapSearchResults.style.display =
                "none";

        }

    }


    /* =====================================================
       CLOSE MAP
    ===================================================== */

    function closeMap() {

        if (!mapModal) return;

        mapModal.classList.remove(
            "open"
        );

        mapModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       MAP BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            ".map-target-btn"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openMap(
                        button.dataset.target
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


    /* =====================================================
       MAP SEARCH
    ===================================================== */

    let searchTimer = null;

    function searchMap() {

        if (!mapSearchInput) return;

        const query =
            mapSearchInput.value.trim();

        if (query.length < 3) {

            if (mapSearchResults) {

                mapSearchResults.innerHTML =
                    '<div class="map-search-empty">Type at least 3 characters.</div>';

                mapSearchResults.style.display =
                    "block";

            }

            return;

        }

        if (mapSearchResults) {

            mapSearchResults.innerHTML =
                '<div class="map-search-empty">Searching...</div>';

            mapSearchResults.style.display =
                "block";

        }

        const params =
            new URLSearchParams({

                q:query,

                format:"jsonv2",

                addressdetails:"1",

                limit:"6",

                countrycodes:"in",

                "accept-language":"en"

            });

        fetch(
            "https://nominatim.openstreetmap.org/search?" +
            params.toString()
        )

        .then(
            response =>
                response.json()
        )

        .then(
            results => {

                if (!mapSearchResults) {
                    return;
                }

                mapSearchResults.innerHTML =
                    "";

                if (
                    !results ||
                    results.length === 0
                ) {

                    mapSearchResults.innerHTML =
                        '<div class="map-search-empty">No matching location found. Try another search.</div>';

                    mapSearchResults.style.display =
                        "block";

                    return;

                }

                results.forEach(
                    function (result) {

                        const button =
                            document.createElement(
                                "button"
                            );

                        button.type =
                            "button";

                        button.className =
                            "map-search-result";

                        button.innerHTML = `
                            <i class="fa-solid fa-location-dot"></i>
                            <span class="map-result-text">
                                <strong>
                                    ${escapeHTML(
                                        result.name ||
                                        result.display_name.split(",")[0]
                                    )}
                                </strong>
                                <small>
                                    ${escapeHTML(
                                        result.display_name
                                    )}
                                </small>
                            </span>
                        `;

                        button.addEventListener(
                            "click",
                            function () {

                                const lat =
                                    Number(
                                        result.lat
                                    );

                                const lng =
                                    Number(
                                        result.lon
                                    );

                                selectLocation(
                                    lat,
                                    lng,
                                    formatAddress(
                                        result
                                    )
                                );

                            }
                        );

                        mapSearchResults.appendChild(
                            button
                        );

                    }
                );

                mapSearchResults.style.display =
                    "block";

            }
        )

        .catch(
            function () {

                if (!mapSearchResults) {
                    return;
                }

                mapSearchResults.innerHTML =
                    '<div class="map-search-empty">Search is temporarily unavailable. You can still tap the map.</div>';

                mapSearchResults.style.display =
                    "block";

            }
        );

    }


    if (mapSearchBtn) {

        mapSearchBtn.addEventListener(
            "click",
            searchMap
        );

    }


    if (mapSearchInput) {

        mapSearchInput.addEventListener(
            "input",
            function () {

                clearTimeout(
                    searchTimer
                );

                searchTimer =
                    setTimeout(
                        searchMap,
                        650
                    );

            }
        );

        mapSearchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    searchMap();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {
                return;
            }

            closeMap();
            closeQuestion();
            closeReview();
            closeGallery();

        }
    );

});
