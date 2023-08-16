export function getTotalJam(jamMasuk, jamKeluar) {
    // Konversi jam masuk dan jam keluar menjadi detik
    var detikMasuk = getDetik(jamMasuk);
    var detikKeluar = getDetik(jamKeluar);

    // Hitung selisih waktu dalam detik
    var selisihDetik = detikKeluar - detikMasuk;

    // Jika selisih detik negatif, tambahkan 24 jam (86400 detik)
    if (selisihDetik < 0) {
        selisihDetik += 86400;
    }

    // Konversi selisih detik menjadi jam dan menit
    var jam = Math.floor(selisihDetik / 3600);
    var menit = Math.floor((selisihDetik % 3600) / 60);

    // Format jam dan menit menjadi string dengan tambahan nol di depan jika perlu
    var jamStr = padZero(jam);
    var menitStr = padZero(menit);

    // Gabungkan jam dan menit dalam format "hh:mm"
    var totalJam = jamStr + ":" + menitStr;

    return totalJam;
}

function getDetik(jam) {
    var splitJam = jam.split(":");
    var jam = parseInt(splitJam[0]);
    var menit = parseInt(splitJam[1]);
    var detik = jam * 3600 + menit * 60;

    return detik;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}

// Contoh penggunaan
var jamMasuk = "21:30";
var jamKeluar = "01:45";

var totalJam = getTotalJam(jamMasuk, jamKeluar);
console.log(totalJam);
