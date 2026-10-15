// Hamburger Menu Functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-btn");

if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function () {
        dropdown.classList.remove("active");
    });

    dropdown.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}

// Current Page Functionality For Product Pages
const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".dropdown-menu a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        const ddBtn = document.querySelector(".dropdown-btn");
        if (ddBtn) ddBtn.classList.add("active");
    }
});

// FAQ Accordion
const faqs = document.querySelectorAll(".faq");

if (faqs.length) {
    faqs.forEach(faq => {
        faq.addEventListener("click", () => {
            faqs.forEach(item => {
                if (item !== faq) item.classList.remove("active");
            });
            faq.classList.toggle("active");
        });
    });
}

// TESTIMONIAL Slider
const slides = document.querySelector(".slides");
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

if (slides && prevBtn && nextBtn && dots.length) {
    let currentIndex = 0;

    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= testimonials.length) currentIndex = 0;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = testimonials.length - 1;
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });
}

// ============================================
// // ============================================
// CHECKLIST -> FORM -> THANK YOU OVERLAY SYSTEM
// ============================================

const checklistFloat = document.querySelector(".checklist-float");
const checklistOverlay = document.querySelector(".checklist-overlay");
const checklistClose = document.querySelector(".checklist-close");
const capChecks = document.querySelectorAll(".cap-check");
const checklistSubmit = document.querySelector(".checklist-submit");

const formOverlay = document.querySelector(".form-overlay");
const formClose = document.querySelector(".form-close");
const formBack = document.querySelector(".form-back");

const thankyouOverlay = document.querySelector(".thankyou-overlay");
const thankyouClose = document.querySelector(".thankyou-close");

const capForm = document.querySelector(".cap-form");

const body = document.body;


// ============================================
// BODY OVERLAY STATE
// ============================================

function updateOverlayState() {

    const isAnyOverlayOpen = [
        checklistOverlay,
        formOverlay,
        thankyouOverlay
    ].some(el =>
        el && el.classList.contains("active")
    );

    body.classList.toggle(
        "overlay-open",
        isAnyOverlayOpen
    );
}


// ============================================
// OPEN CHECKLIST
// ============================================

if (checklistFloat && checklistOverlay) {

    checklistFloat.addEventListener("click", () => {

        checklistOverlay.classList.add("active");

        updateOverlayState();

    });

}


// ============================================
// CLOSE CHECKLIST
// ============================================

if (checklistClose && checklistOverlay) {

    checklistClose.addEventListener("click", () => {

        checklistOverlay.classList.remove("active");

        updateOverlayState();

    });

}


// ============================================
// CLOSE CHECKLIST BY CLICKING OUTSIDE
// ============================================

if (checklistOverlay) {

    checklistOverlay.addEventListener("click", (e) => {

        if (e.target === checklistOverlay) {

            checklistOverlay.classList.remove("active");

            updateOverlayState();

        }

    });

}


// ============================================
// SHOW NEXT BUTTON WHEN CAPABILITY SELECTED
// ============================================

if (capChecks.length && checklistSubmit) {

    function updateSubmitButton() {

        const anyChecked =
            Array.from(capChecks)
                .some(cb => cb.checked);

        checklistSubmit.classList.toggle(
            "show",
            anyChecked
        );

    }


    capChecks.forEach(cb => {

        cb.addEventListener(
            "change",
            updateSubmitButton
        );

    });


    // ========================================
    // CHECKLIST -> FORM
    // ========================================

    checklistSubmit.addEventListener("click", () => {

        const anyChecked =
            Array.from(capChecks)
                .some(cb => cb.checked);

        if (!anyChecked) {

            alert(
                "Please select at least one capability."
            );

            return;

        }


        if (formOverlay) {

            checklistOverlay.classList.remove(
                "active"
            );

            formOverlay.classList.add(
                "active"
            );

            updateOverlayState();

        }

    });

}


// ============================================
// FORM BACK -> CHECKLIST
// ============================================

if (formBack && formOverlay) {

    formBack.addEventListener("click", () => {

        formOverlay.classList.remove(
            "active"
        );

        if (checklistOverlay) {

            checklistOverlay.classList.add(
                "active"
            );

        }

        updateOverlayState();

    });

}


// ============================================
// FORM CLOSE
// ============================================

if (formClose && formOverlay) {

    formClose.addEventListener("click", () => {

        formOverlay.classList.remove(
            "active"
        );

        updateOverlayState();

    });

}


// ============================================
// CLOSE FORM BY CLICKING OUTSIDE
// ============================================

if (formOverlay) {

    formOverlay.addEventListener("click", (e) => {

        if (e.target === formOverlay) {

            formOverlay.classList.remove(
                "active"
            );

            updateOverlayState();

        }

    });

}


// ============================================
// FORM SUBMIT -> WEB3FORMS
// ============================================

if (capForm) {

    capForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            // --------------------------------
            // VALIDATE FORM
            // --------------------------------

            if (!capForm.checkValidity()) {

                capForm.reportValidity();

                return;

            }


            // --------------------------------
            // CREATE FORM DATA
            // --------------------------------

            const formData =
                new FormData(capForm);


            // --------------------------------
            // GET SELECTED CAPABILITIES
            // --------------------------------

            const selectedCapabilities =
                Array.from(capChecks)

                    .filter(cb => cb.checked)

                    .map(cb =>
                        cb.closest("label")
                            ?.querySelector("span")
                            ?.textContent
                            .trim()
                    )

                    .filter(Boolean);


            // --------------------------------
            // CREATE NUMBERED CAPABILITY LIST
            // --------------------------------

            if (selectedCapabilities.length) {

                const capabilityText =
                    selectedCapabilities
                        .map(
                            (capability, index) =>
                                `[${index + 1}] ${capability}`
                        )
                        .join("\n");


                formData.set(
                    "Selected Capabilities",
                    capabilityText
                );

            }


            // --------------------------------
            // WEB3FORMS BOT CHECK
            // --------------------------------

            formData.set(
                "botcheck",
                formData.get("botcheck") || ""
            );


            // --------------------------------
            // SEND TO WEB3FORMS
            // --------------------------------

            try {

                const res = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );


                const data =
                    await res.json();


                console.log(
                    "Web3Forms response:",
                    data
                );


                if (
                    !res.ok ||
                    data.success !== true
                ) {

                    throw new Error(
                        data.message ||
                        "Submission failed"
                    );

                }


                // --------------------------------
                // CLOSE FORM
                // --------------------------------

                if (formOverlay) {

                    formOverlay.classList.remove(
                        "active"
                    );

                }


                // --------------------------------
                // CLOSE CHECKLIST
                // --------------------------------

                if (checklistOverlay) {

                    checklistOverlay.classList.remove(
                        "active"
                    );

                }


                // --------------------------------
                // SHOW THANK YOU
                // --------------------------------

                if (thankyouOverlay) {

                    thankyouOverlay.classList.add(
                        "active"
                    );

                }


                updateOverlayState();


                // --------------------------------
                // RESET FORM
                // --------------------------------

                capForm.reset();


                // --------------------------------
                // RESET CHECKBOXES
                // --------------------------------

                capChecks.forEach(cb => {

                    cb.checked = false;

                });


                // --------------------------------
                // HIDE NEXT BUTTON
                // --------------------------------

                if (checklistSubmit) {

                    checklistSubmit.classList.remove(
                        "show"
                    );

                }


            } catch (err) {

                console.error(
                    "Web3Forms Error:",
                    err
                );


                alert(
                    "Sorry, there was an error submitting your details. " +
                    "Please try again or contact us directly at " +
                    "contact@marsquant.com."
                );

            }

        }
    );

}


// ============================================
// THANK YOU CLOSE
// ============================================

if (thankyouClose && thankyouOverlay) {

    thankyouClose.addEventListener("click", () => {

        thankyouOverlay.classList.remove(
            "active"
        );

        updateOverlayState();

    });

}


// ============================================
// CLOSE THANK YOU BY CLICKING OUTSIDE
// ============================================

if (thankyouOverlay) {

    thankyouOverlay.addEventListener("click", (e) => {

        if (e.target === thankyouOverlay) {

            thankyouOverlay.classList.remove(
                "active"
            );

            updateOverlayState();

        }

    });

}