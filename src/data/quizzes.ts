export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  articleSlug: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    articleSlug: "kerajaan-kutai",
    questions: [
      { question: "Di mana letak Kerajaan Kutai?", options: ["Sumatera Selatan", "Kalimantan Timur", "Jawa Tengah", "Sulawesi Selatan"], correctIndex: 1, explanation: "Kerajaan Kutai terletak di tepi Sungai Mahakam, Kalimantan Timur." },
      { question: "Apa nama prasasti peninggalan Kerajaan Kutai?", options: ["Prasasti Tugu", "Prasasti Ciaruteun", "Prasasti Yupa", "Prasasti Kalasan"], correctIndex: 2, explanation: "Kerajaan Kutai meninggalkan 7 Prasasti Yupa yang ditulis dalam aksara Pallawa." },
      { question: "Siapa raja Kutai yang terkenal paling dermawan?", options: ["Kudungga", "Aswawarman", "Mulawarman", "Purnawarman"], correctIndex: 2, explanation: "Raja Mulawarman dikenal dermawan karena menyumbangkan 20.000 ekor sapi kepada para Brahmana." },
      { question: "Dalam aksara apa Prasasti Yupa ditulis?", options: ["Aksara Jawa", "Aksara Arab", "Aksara Pallawa", "Aksara Latin"], correctIndex: 2, explanation: "Prasasti Yupa ditulis dalam aksara Pallawa dan bahasa Sansekerta." },
      { question: "Siapa pendiri dinasti raja-raja Kutai?", options: ["Mulawarman", "Kudungga", "Aswawarman", "Purnawarman"], correctIndex: 1, explanation: "Kudungga adalah raja pertama dalam silsilah raja-raja Kutai, dengan nama asli Indonesia (bukan Sanskrit)." },
      { question: "Berapa jumlah Prasasti Yupa yang ditemukan?", options: ["3 buah", "5 buah", "7 buah", "10 buah"], correctIndex: 2, explanation: "Ditemukan 7 buah Prasasti Yupa di daerah Muara Kaman." },
      { question: "Apa julukan Aswawarman dalam prasasti?", options: ["Raja dermawan", "Pembentuk keluarga raja", "Penakluk dunia", "Pelindung rakyat"], correctIndex: 1, explanation: "Aswawarman disebut sebagai 'wangsakarta' atau pembentuk keluarga raja." },
      { question: "Agama apa yang dianut masyarakat Kutai?", options: ["Buddha", "Islam", "Hindu", "Konghucu"], correctIndex: 2, explanation: "Masyarakat Kutai menganut agama Hindu, terlihat dari pemujaan terhadap Dewa Siwa." },
      { question: "Pada abad ke berapa Kerajaan Kutai berdiri?", options: ["Abad ke-2", "Abad ke-4", "Abad ke-6", "Abad ke-8"], correctIndex: 1, explanation: "Kerajaan Kutai berdiri sekitar abad ke-4 Masehi." },
      { question: "Apa fungsi Prasasti Yupa?", options: ["Tanda batas wilayah", "Tiang untuk mengikat hewan kurban", "Monumen kemenangan perang", "Penanda makam raja"], correctIndex: 1, explanation: "Prasasti Yupa berupa tiang batu yang digunakan untuk mengikat hewan kurban dalam upacara keagamaan Hindu." },
    ],
  },
  {
    articleSlug: "kerajaan-sriwijaya",
    questions: [
      { question: "Di mana pusat Kerajaan Sriwijaya?", options: ["Jambi", "Palembang", "Lampung", "Bengkulu"], correctIndex: 1, explanation: "Kerajaan Sriwijaya berpusat di Palembang, Sumatera Selatan." },
      { question: "Selat apa yang dikuasai Sriwijaya?", options: ["Selat Sunda", "Selat Bali", "Selat Malaka", "Selat Lombok"], correctIndex: 2, explanation: "Sriwijaya menguasai Selat Malaka, jalur perdagangan paling penting di dunia." },
      { question: "Siapa pendeta Cina yang mencatat kehidupan di Sriwijaya?", options: ["Fa-Hien", "I-Tsing", "Xuan Zang", "Marco Polo"], correctIndex: 1, explanation: "I-Tsing mengunjungi Sriwijaya pada tahun 671 M dan mencatat terdapat lebih dari 1.000 biksu." },
      { question: "Sriwijaya dikenal sebagai pusat pendidikan agama apa?", options: ["Hindu", "Islam", "Buddha", "Kristen"], correctIndex: 2, explanation: "Sriwijaya dikenal sebagai pusat pembelajaran agama Buddha terbesar di Asia Tenggara." },
      { question: "Berapa jumlah biksu yang tinggal di Sriwijaya menurut I-Tsing?", options: ["100", "500", "Lebih dari 1.000", "5.000"], correctIndex: 2, explanation: "I-Tsing mencatat terdapat lebih dari 1.000 biksu yang tinggal dan belajar di Sriwijaya." },
      { question: "Kerajaan mana yang menyerang Sriwijaya pada 1025 M?", options: ["Majapahit", "Chola", "Mongol", "Mataram"], correctIndex: 1, explanation: "Kerajaan Chola dari India Selatan menyerang Sriwijaya pada tahun 1025 M." },
      { question: "Komoditas utama perdagangan Sriwijaya adalah?", options: ["Emas", "Rempah-rempah", "Sutra", "Keramik"], correctIndex: 1, explanation: "Sriwijaya menjadi pusat perdagangan rempah terbesar di Asia Tenggara." },
      { question: "Pada abad ke berapa Sriwijaya berdiri?", options: ["Abad ke-5", "Abad ke-6", "Abad ke-7", "Abad ke-8"], correctIndex: 2, explanation: "Kerajaan Sriwijaya berdiri sekitar abad ke-7 Masehi." },
      { question: "Siapa raja pertama Sriwijaya?", options: ["Balaputradewa", "Dapunta Hyang Sri Jayanasa", "Dharmasetu", "Samaratungga"], correctIndex: 1, explanation: "Raja Dapunta Hyang Sri Jayanasa adalah raja pertama Sriwijaya." },
      { question: "Sriwijaya menjalin hubungan diplomatik dengan dinasti mana di Cina?", options: ["Dinasti Han", "Dinasti Ming", "Dinasti Tang dan Song", "Dinasti Qing"], correctIndex: 2, explanation: "Sriwijaya menjalin hubungan dengan Dinasti Tang dan Song di Cina." },
    ],
  },
  {
    articleSlug: "kerajaan-tarumanagara",
    questions: [
      { question: "Di wilayah mana Kerajaan Tarumanagara terletak?", options: ["Jawa Timur", "Jawa Barat", "Jawa Tengah", "Bali"], correctIndex: 1, explanation: "Kerajaan Tarumanagara terletak di wilayah Jawa Barat." },
      { question: "Siapa raja paling terkenal dari Tarumanagara?", options: ["Mulawarman", "Purnawarman", "Kudungga", "Sanjaya"], correctIndex: 1, explanation: "Raja Purnawarman adalah raja paling terkenal dari Kerajaan Tarumanagara." },
      { question: "Prasasti mana yang menampilkan jejak tapak kaki raja?", options: ["Prasasti Tugu", "Prasasti Ciaruteun", "Prasasti Yupa", "Prasasti Kalasan"], correctIndex: 1, explanation: "Prasasti Ciaruteun menampilkan jejak tapak kaki raja yang disamakan dengan tapak kaki Dewa Wisnu." },
      { question: "Berapa panjang saluran air yang digali atas perintah Purnawarman?", options: ["Sekitar 5 km", "Sekitar 11 km", "Sekitar 20 km", "Sekitar 50 km"], correctIndex: 1, explanation: "Saluran air sepanjang 6.122 tombak (sekitar 11 km) tercatat dalam Prasasti Tugu." },
      { question: "Aliran Hindu apa yang dianut Tarumanagara?", options: ["Siwa", "Wisnu", "Brahma", "Ganesha"], correctIndex: 1, explanation: "Masyarakat Tarumanagara menganut aliran Wisnu, terlihat dari prasasti yang menyebut raja sebagai penjelmaan Dewa Wisnu." },
      { question: "Pada abad ke berapa Tarumanagara diperkirakan berdiri?", options: ["Abad ke-3", "Abad ke-4", "Abad ke-5", "Abad ke-7"], correctIndex: 2, explanation: "Kerajaan Tarumanagara diperkirakan berdiri pada abad ke-5 Masehi." },
      { question: "Apa tulang punggung perekonomian Tarumanagara?", options: ["Pertambangan", "Pertanian", "Perikanan", "Perdagangan rempah"], correctIndex: 1, explanation: "Pertanian merupakan tulang punggung perekonomian Tarumanagara, didukung sistem irigasi yang maju." },
      { question: "Di mana prasasti-prasasti Tarumanagara ditemukan?", options: ["Sumatera dan Kalimantan", "Jawa Barat dan Banten", "Jawa Tengah dan Yogyakarta", "Bali dan Lombok"], correctIndex: 1, explanation: "Prasasti-prasasti tersebar di wilayah Jawa Barat dan Banten." },
      { question: "Tapak kaki di Prasasti Ciaruteun disamakan dengan dewa apa?", options: ["Siwa", "Brahma", "Wisnu", "Indra"], correctIndex: 2, explanation: "Tapak kaki raja disamakan dengan tapak kaki Dewa Wisnu." },
      { question: "Perdagangan internasional Tarumanagara melalui pelabuhan di mana?", options: ["Pantai selatan Jawa", "Pantai utara Jawa", "Pantai barat Sumatera", "Pantai timur Kalimantan"], correctIndex: 1, explanation: "Tarumanagara terlibat dalam perdagangan melalui pelabuhan-pelabuhan di pantai utara Jawa." },
    ],
  },
  {
    articleSlug: "kerajaan-majapahit",
    questions: [
      { question: "Siapa pendiri Kerajaan Majapahit?", options: ["Gajah Mada", "Hayam Wuruk", "Raden Wijaya", "Tribhuwana"], correctIndex: 2, explanation: "Kerajaan Majapahit didirikan oleh Raden Wijaya pada tahun 1293." },
      { question: "Apa isi Sumpah Palapa?", options: ["Menyatukan seluruh Nusantara", "Mengusir penjajah", "Membangun candi", "Menyebarkan agama"], correctIndex: 0, explanation: "Gajah Mada bersumpah tidak akan makan palapa sebelum menyatukan seluruh Nusantara." },
      { question: "Siapa penulis kitab Negarakertagama?", options: ["Mpu Tantular", "Mpu Prapanca", "Mpu Sedah", "Mpu Panuluh"], correctIndex: 1, explanation: "Kitab Negarakertagama ditulis oleh Mpu Prapanca yang mencatat kejayaan Majapahit." },
      { question: "Apa arti semboyan Bhinneka Tunggal Ika?", options: ["Bersatu kita teguh", "Berbeda-beda tetapi tetap satu", "Satu bangsa satu bahasa", "Merdeka atau mati"], correctIndex: 1, explanation: "Bhinneka Tunggal Ika berarti 'Berbeda-beda tetapi tetap satu', dari kitab Sutasoma karya Mpu Tantular." },
      { question: "Di mana pusat Kerajaan Majapahit?", options: ["Surabaya", "Trowulan", "Kediri", "Malang"], correctIndex: 1, explanation: "Pusat Kerajaan Majapahit terletak di Trowulan, Jawa Timur." },
      { question: "Tahun berapa Majapahit didirikan?", options: ["1275", "1293", "1300", "1350"], correctIndex: 1, explanation: "Majapahit didirikan pada tahun 1293 setelah mengusir pasukan Mongol." },
      { question: "Pasukan dari mana yang dimanfaatkan Raden Wijaya?", options: ["Cina", "India", "Mongol", "Arab"], correctIndex: 2, explanation: "Raden Wijaya memanfaatkan pasukan Mongol untuk mengalahkan Jayakatwang dari Kediri." },
      { question: "Apa nama perang saudara setelah wafatnya Hayam Wuruk?", options: ["Perang Bubat", "Perang Paregreg", "Perang Jawa", "Perang Padri"], correctIndex: 1, explanation: "Perang Paregreg (1405-1406) adalah perang saudara perebutan takhta yang melemahkan Majapahit." },
      { question: "Siapa yang mengakhiri kekuasaan Majapahit?", options: ["Portugis", "Belanda", "Kesultanan Demak", "Kerajaan Chola"], correctIndex: 2, explanation: "Kesultanan Demak yang didirikan Raden Patah mengakhiri kekuasaan Majapahit sekitar 1527." },
      { question: "Berapa daerah yang tercatat di bawah pengaruh Majapahit?", options: ["50 daerah", "75 daerah", "98 daerah", "120 daerah"], correctIndex: 2, explanation: "Kitab Negarakertagama mencatat setidaknya 98 daerah di bawah pengaruh Majapahit." },
    ],
  },
  {
    articleSlug: "kesultanan-demak",
    questions: [
      { question: "Siapa pendiri Kesultanan Demak?", options: ["Sultan Agung", "Raden Patah", "Sunan Kalijaga", "Sultan Hasanuddin"], correctIndex: 1, explanation: "Kesultanan Demak didirikan oleh Raden Patah sekitar tahun 1475." },
      { question: "Apa peran utama Wali Songo?", options: ["Memimpin perang", "Menyebarkan Islam", "Membangun istana", "Menulis kitab"], correctIndex: 1, explanation: "Wali Songo adalah sembilan wali yang berperan dalam penyebaran Islam di Jawa." },
      { question: "Apa nama tiang unik di Masjid Agung Demak?", options: ["Soko Guru", "Soko Tatal", "Soko Suci", "Soko Agung"], correctIndex: 1, explanation: "Soko Tatal terbuat dari serpihan-serpihan kayu yang disatukan oleh Sunan Kalijaga." },
      { question: "Berapa tingkat atap tumpang Masjid Agung Demak?", options: ["Dua", "Tiga", "Empat", "Lima"], correctIndex: 1, explanation: "Atap tumpang tiga melambangkan Iman, Islam, dan Ihsan." },
      { question: "Bangsa Eropa mana yang dilawan Demak?", options: ["Belanda", "Inggris", "Portugis", "Spanyol"], correctIndex: 2, explanation: "Kesultanan Demak aktif melawan ekspansi Portugis di Nusantara." },
      { question: "Tahun berapa Demak menyerang Malaka?", options: ["1500", "1513", "1527", "1550"], correctIndex: 1, explanation: "Pada tahun 1513, Demak mengirim pasukan untuk membantu Kesultanan Malaka melawan Portugis." },
      { question: "Media apa yang digunakan Wali Songo untuk dakwah?", options: ["Pidato politik", "Wayang dan gamelan", "Buku cetak", "Surat kabar"], correctIndex: 1, explanation: "Para Wali Songo menggunakan wayang, gamelan, dan tembang Jawa sebagai media dakwah." },
      { question: "Kesultanan Demak dianggap penerus kerajaan mana?", options: ["Sriwijaya", "Mataram", "Majapahit", "Singhasari"], correctIndex: 2, explanation: "Raden Patah diperkirakan keturunan raja terakhir Majapahit, sehingga Demak dianggap penerus Majapahit." },
      { question: "Berapa lama Kesultanan Demak berdiri?", options: ["Sekitar 50 tahun", "Sekitar 80 tahun", "Sekitar 100 tahun", "Sekitar 150 tahun"], correctIndex: 1, explanation: "Kesultanan Demak berdiri dari 1475 hingga 1554 M, sekitar 80 tahun." },
      { question: "Di mana letak Kesultanan Demak?", options: ["Pesisir selatan Jawa", "Pesisir utara Jawa Tengah", "Pedalaman Jawa Timur", "Pesisir barat Sumatera"], correctIndex: 1, explanation: "Kesultanan Demak terletak di pesisir utara Jawa Tengah." },
    ],
  },
  {
    articleSlug: "perlawanan-kolonialisme",
    questions: [
      { question: "Bangsa Eropa pertama yang tiba di Nusantara?", options: ["Belanda", "Inggris", "Portugis", "Spanyol"], correctIndex: 2, explanation: "Portugis adalah bangsa Eropa pertama yang tiba, berhasil merebut Malaka pada 1511." },
      { question: "Tahun berapa VOC didirikan?", options: ["1596", "1602", "1619", "1650"], correctIndex: 1, explanation: "VOC didirikan pada tahun 1602 oleh Belanda." },
      { question: "Siapa yang dijuluki 'Ayam Jantan dari Timur'?", options: ["Pangeran Diponegoro", "Sultan Hasanuddin", "Tuanku Imam Bonjol", "Teuku Umar"], correctIndex: 1, explanation: "Sultan Hasanuddin dari Makassar dijuluki 'Ayam Jantan dari Timur' karena keberaniannya." },
      { question: "Perang Jawa dipimpin oleh siapa?", options: ["Sultan Agung", "Pangeran Diponegoro", "Sultan Hasanuddin", "Cut Nyak Dhien"], correctIndex: 1, explanation: "Pangeran Diponegoro memimpin Perang Jawa (1825-1830)." },
      { question: "Apa itu Sistem Tanam Paksa?", options: ["Wajib militer", "Rakyat dipaksa menanam tanaman ekspor", "Larangan bertani", "Pajak tanah"], correctIndex: 1, explanation: "Rakyat dipaksa menanam tanaman ekspor di sepertiga lahan mereka untuk pemerintah kolonial." },
      { question: "Siapa yang menerapkan Sistem Tanam Paksa?", options: ["Raffles", "Daendels", "Van den Bosch", "Van Heutsz"], correctIndex: 2, explanation: "Gubernur Jenderal Van den Bosch menerapkan Sistem Tanam Paksa pada 1830." },
      { question: "Politik Etis terdiri dari apa saja?", options: ["Militer, politik, ekonomi", "Irigasi, emigrasi, edukasi", "Hukum, agama, budaya", "Pertanian, industri, perdagangan"], correctIndex: 1, explanation: "Politik Etis terdiri dari irigasi, emigrasi, dan edukasi." },
      { question: "Berapa lama Perang Aceh berlangsung?", options: ["10 tahun", "20 tahun", "30 tahun", "Lebih dari 40 tahun"], correctIndex: 3, explanation: "Perang Aceh berlangsung dari 1873 hingga 1914, lebih dari 40 tahun." },
      { question: "Berapa korban dari pihak Indonesia dalam Perang Jawa?", options: ["50.000", "100.000", "200.000", "500.000"], correctIndex: 2, explanation: "Perang Jawa menewaskan sekitar 200.000 orang dari pihak Indonesia." },
      { question: "Siapa pemimpin perlawanan wanita dari Aceh?", options: ["Kartini", "Cut Nyak Dhien", "Fatmawati", "Dewi Sartika"], correctIndex: 1, explanation: "Cut Nyak Dhien memimpin perlawanan sengit di Aceh selama puluhan tahun." },
    ],
  },
  {
    articleSlug: "kebangkitan-nasional",
    questions: [
      { question: "Kapan Budi Utomo didirikan?", options: ["1905", "1908", "1912", "1920"], correctIndex: 1, explanation: "Budi Utomo didirikan pada 20 Mei 1908." },
      { question: "Siapa pendiri Budi Utomo?", options: ["Soekarno dan Hatta", "dr. Soetomo dan dr. Wahidin", "Ki Hadjar Dewantara", "HOS Tjokroaminoto"], correctIndex: 1, explanation: "dr. Soetomo dan mahasiswa STOVIA mendirikan Budi Utomo." },
      { question: "Kapan Sumpah Pemuda diikrarkan?", options: ["27 Oktober 1928", "28 Oktober 1928", "17 Agustus 1928", "20 Mei 1928"], correctIndex: 1, explanation: "Sumpah Pemuda diikrarkan pada 28 Oktober 1928." },
      { question: "Siapa pencipta lagu Indonesia Raya?", options: ["Ismail Marzuki", "W.R. Supratman", "C. Simanjuntak", "Kusbini"], correctIndex: 1, explanation: "Lagu Indonesia Raya diciptakan oleh W.R. Supratman dan pertama kali diperdengarkan di Kongres Pemuda II." },
      { question: "Tahun berapa PNI didirikan Soekarno?", options: ["1920", "1925", "1927", "1930"], correctIndex: 2, explanation: "Soekarno mendirikan PNI pada tahun 1927." },
      { question: "Ki Hadjar Dewantara mendirikan lembaga pendidikan apa?", options: ["STOVIA", "Muhammadiyah", "Taman Siswa", "INS Kayutanam"], correctIndex: 2, explanation: "Ki Hadjar Dewantara mendirikan Taman Siswa pada tahun 1922." },
      { question: "Apa nama badan yang merumuskan dasar negara?", options: ["PPKI", "BPUPKI", "KNIP", "DPA"], correctIndex: 1, explanation: "BPUPKI bertugas merumuskan dasar negara Indonesia." },
      { question: "Kapan Soekarno mengusulkan Pancasila?", options: ["1 Mei 1945", "1 Juni 1945", "17 Agustus 1945", "28 Oktober 1945"], correctIndex: 1, explanation: "Soekarno mengusulkan Pancasila pada 1 Juni 1945 dalam sidang BPUPKI." },
      { question: "Apa isi Sumpah Pemuda?", options: ["Satu nusa, satu bangsa, satu bahasa", "Merdeka atau mati", "Bersatu kita teguh", "Sekali merdeka tetap merdeka"], correctIndex: 0, explanation: "Sumpah Pemuda berisi ikrar satu tanah air, satu bangsa, dan satu bahasa: Indonesia." },
      { question: "Organisasi apa yang didirikan tahun 1912?", options: ["Budi Utomo", "Sarekat Islam dan Muhammadiyah", "PNI", "Taman Siswa"], correctIndex: 1, explanation: "Sarekat Islam dan Muhammadiyah sama-sama didirikan pada tahun 1912." },
    ],
  },
  {
    articleSlug: "proklamasi-kemerdekaan",
    questions: [
      { question: "Kapan Proklamasi Kemerdekaan dibacakan?", options: ["15 Agustus 1945", "16 Agustus 1945", "17 Agustus 1945", "18 Agustus 1945"], correctIndex: 2, explanation: "Proklamasi dibacakan pada 17 Agustus 1945 pukul 10.00 WIB." },
      { question: "Di mana teks Proklamasi dibacakan?", options: ["Istana Merdeka", "Jalan Pegangsaan Timur 56", "Lapangan Ikada", "Gedung BPUPKI"], correctIndex: 1, explanation: "Proklamasi dibacakan di Jalan Pegangsaan Timur 56, Jakarta." },
      { question: "Siapa yang mengetik ulang teks Proklamasi?", options: ["Soekarno", "Hatta", "Sayuti Melik", "Ahmad Soebardjo"], correctIndex: 2, explanation: "Sayuti Melik mengetik ulang teks yang ditulis tangan oleh Soekarno." },
      { question: "Apa peristiwa yang terjadi di Rengasdengklok?", options: ["Penandatanganan proklamasi", "Penculikan Soekarno-Hatta oleh pemuda", "Pertempuran melawan Jepang", "Pembentukan kabinet"], correctIndex: 1, explanation: "Para pemuda membawa Soekarno dan Hatta ke Rengasdengklok untuk mendesak proklamasi segera." },
      { question: "Di rumah siapa teks Proklamasi dirumuskan?", options: ["Soekarno", "Ahmad Soebardjo", "Laksamana Maeda", "Wikana"], correctIndex: 2, explanation: "Teks dirumuskan di rumah Laksamana Tadashi Maeda di Jalan Imam Bonjol No. 1." },
      { question: "Siapa yang menjahit bendera Merah Putih pertama?", options: ["Cut Nyak Dhien", "Kartini", "Fatmawati", "Dewi Sartika"], correctIndex: 2, explanation: "Bendera Merah Putih dijahit oleh Ibu Fatmawati." },
      { question: "Kapan pertempuran 10 November terjadi?", options: ["1944", "1945", "1946", "1947"], correctIndex: 1, explanation: "Pertempuran 10 November 1945 di Surabaya menjadi bukti semangat mempertahankan kemerdekaan." },
      { question: "Kapan Indonesia mendapat pengakuan kedaulatan dari Belanda?", options: ["17 Agustus 1945", "10 November 1945", "27 Desember 1949", "1 Januari 1950"], correctIndex: 2, explanation: "Indonesia memperoleh pengakuan kedaulatan pada 27 Desember 1949 melalui KMB." },
      { question: "Siapa yang memimpin golongan pemuda di Rengasdengklok?", options: ["Soekarno", "Soekarni dan Chaerul Saleh", "Mohammad Hatta", "Ahmad Soebardjo"], correctIndex: 1, explanation: "Soekarni, Chaerul Saleh, dan Wikana memimpin gerakan pemuda di Rengasdengklok." },
      { question: "Lagu apa yang dinyanyikan saat pengibaran bendera?", options: ["Bagimu Negeri", "Indonesia Raya", "Halo-Halo Bandung", "Syukur"], correctIndex: 1, explanation: "Bendera Merah Putih dikibarkan diiringi lagu Indonesia Raya." },
    ],
  },
  {
    articleSlug: "borobudur",
    questions: [
      { question: "Di mana Candi Borobudur terletak?", options: ["Yogyakarta", "Magelang, Jawa Tengah", "Solo, Jawa Tengah", "Semarang"], correctIndex: 1, explanation: "Candi Borobudur terletak di Magelang, Jawa Tengah." },
      { question: "Dinasti apa yang membangun Borobudur?", options: ["Sanjaya", "Syailendra", "Isyana", "Mataram"], correctIndex: 1, explanation: "Borobudur dibangun oleh Dinasti Syailendra pada abad ke-8 hingga ke-9." },
      { question: "Berapa jumlah panel relief di Borobudur?", options: ["1.460", "2.672", "3.500", "5.000"], correctIndex: 1, explanation: "Borobudur memiliki 2.672 panel relief." },
      { question: "Berapa jumlah arca Buddha di Borobudur?", options: ["300", "404", "504", "672"], correctIndex: 2, explanation: "Borobudur memiliki 504 arca Buddha." },
      { question: "Berapa tingkat yang dimiliki Borobudur?", options: ["5", "8", "10", "12"], correctIndex: 2, explanation: "Borobudur memiliki 10 tingkat: 6 bujur sangkar dan 3 lingkaran ditutup stupa besar." },
      { question: "Apa nama tiga alam dalam kosmologi Buddha di Borobudur?", options: ["Langit, bumi, neraka", "Kamadhatu, Rupadhatu, Arupadhatu", "Kama, Rupa, Arupa", "Deva, Manusia, Asura"], correctIndex: 1, explanation: "Tiga zona: Kamadhatu (alam nafsu), Rupadhatu (alam bentuk), Arupadhatu (alam tanpa bentuk)." },
      { question: "Siapa yang menemukan kembali Borobudur?", options: ["Raffles", "Daendels", "Van den Bosch", "Coen"], correctIndex: 0, explanation: "Sir Thomas Stamford Raffles menemukan kembali Borobudur pada tahun 1814." },
      { question: "Tahun berapa Borobudur ditetapkan sebagai Situs UNESCO?", options: ["1975", "1982", "1991", "2000"], correctIndex: 2, explanation: "Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO pada tahun 1991." },
      { question: "Berapa lama perkiraan pembangunan Borobudur?", options: ["25 tahun", "50 tahun", "75 tahun", "100 tahun"], correctIndex: 2, explanation: "Pembangunan Borobudur diperkirakan memakan waktu sekitar 75 tahun." },
      { question: "Berapa total panjang panel relief jika direntangkan?", options: ["1 km", "3 km", "5 km", "10 km"], correctIndex: 2, explanation: "Total panjang panel relief Borobudur mencapai sekitar 5 km." },
    ],
  },
];

export const getQuizBySlug = (slug: string): Quiz | undefined => {
  return quizzes.find((q) => q.articleSlug === slug);
};
