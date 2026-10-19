document.addEventListener("DOMContentLoaded", function () {
    // Task 1: validate the contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const formMessage = document.getElementById("formMessage");

        function checkPasswords() {
            confirmPassword.setCustomValidity(password.value === confirmPassword.value ? "" : "Passwords do not match.");
            confirmPassword.classList.toggle("is-invalid", password.value !== confirmPassword.value && confirmPassword.value.length > 0);
        }
        password.addEventListener("input", checkPasswords);
        confirmPassword.addEventListener("input", checkPasswords);

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            checkPasswords();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                formMessage.textContent = "Please complete all required fields correctly. Password must be at least 8 characters and both passwords must match.";
                formMessage.className = "mt-3 text-danger";
                contactForm.reportValidity();
                return;
            }
            formMessage.textContent = "Form validated successfully! This demo does not send data to a server.";
            formMessage.className = "mt-3 text-success";
        });
        contactForm.addEventListener("reset", function () {
            contactForm.classList.remove("was-validated");
            formMessage.textContent = "";
            confirmPassword.setCustomValidity("");
            confirmPassword.classList.remove("is-invalid");
        });
    }

    // Task 2: FAQ accordion
    document.querySelectorAll(".faq-question").forEach(function (button) {
        button.addEventListener("click", function () {
            const item = button.closest(".faq-item");
            const willOpen = !item.classList.contains("open");
            item.classList.toggle("open", willOpen);
            button.setAttribute("aria-expanded", String(willOpen));
        });
    });

    // Task 3: subscription popup
    const popup = document.getElementById("subscriptionModal");
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    if (popup && openPopupBtn && closePopupBtn) {
        function closePopup() {
            popup.classList.remove("show");
            popup.setAttribute("aria-hidden", "true");
        }
        openPopupBtn.addEventListener("click", function () {
            popup.classList.add("show");
            popup.setAttribute("aria-hidden", "false");
        });
        closePopupBtn.addEventListener("click", closePopup);
        popup.addEventListener("click", function (event) {
            if (event.target === popup) closePopup();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closePopup();
        });
        const subscriptionForm = document.getElementById("subscriptionForm");
        subscriptionForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (subscriptionForm.checkValidity()) {
                document.getElementById("subscriptionMessage").textContent = "Thank you! Your details passed validation.";
                subscriptionForm.reset();
            } else {
                subscriptionForm.reportValidity();
            }
        });
    }

    // Task 4: cycle through background colors
    const colorButton = document.getElementById("changeColorBtn");
    if (colorButton) {
        let colorIndex = 0;
        const colorClasses = ["color-change-1", "color-change-2", "color-change-3", "color-change-4"];
        colorButton.addEventListener("click", function () {
            document.body.classList.remove(...colorClasses);
            document.body.classList.add(colorClasses[colorIndex]);
            colorIndex = (colorIndex + 1) % colorClasses.length;
        });
    }

    // Task 5: show and update the current date and time
    const dateTime = document.getElementById("dateTime");
    if (dateTime) {
        function updateDateTime() {
            dateTime.textContent = new Date().toLocaleString("en-US", {
                year: "numeric", month: "long", day: "numeric",
                hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true
            });
        }
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
});
