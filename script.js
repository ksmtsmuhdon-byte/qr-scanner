function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    let isProcessing = false;
    function onScanSuccess(decodedText) {
        if (isProcessing) return; // Cegah pemanggilan ulang
        isProcessing = true; // Set flag menjadi true

        if (isValidURL(decodedText)) {
            // Buka URL di tab baru
            const newTab = window.open(decodedText, "_blank");

            // Tutup tab baru setelah 5 detik
            setTimeout(() => {
                if (newTab) {
                    newTab.close();
                }
                window.focus(); // Fokus kembali ke tab scanner
                isProcessing = false; // Reset flag setelah selesai
            }, 5000);

            // Tampilkan Snackbar
            setTimeout(() => showSnackbar("Scanned successfully!"), 3000); // Delay 1 detik sebelum snackbar muncul

        } else {
            showSnackbar("Invalid QR Code!");
        }

        console.log("Scanned result:", decodedText);
    }

   let html5QrCode = new Html5Qrcode("my-qr-reader");
html5QrCode.start(
    { facingMode: "user" },
    { fps: 10, qrbox: 250 },
    onScanSuccess
);
    html5QrCode.render(onScanSuccess);
});

function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;

    // Tambahkan kelas untuk menampilkan snackbar
    snackbar.classList.remove("hidden");
    snackbar.classList.add("show");

    // Hapus kelas setelah 5 detik
    setTimeout(() => {
        snackbar.classList.add("hidden");
        snackbar.classList.remove("show");
    }, 5000);
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}


