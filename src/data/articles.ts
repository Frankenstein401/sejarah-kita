export interface Article {
  slug: string;
  title: string;
  era: string;
  year: string;
  summary: string;
  heroImage?: string;
  content: ArticleSection[];
  relatedSlugs: string[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export const articles: Article[] = [
  {
    slug: "kerajaan-kutai",
    title: "Kerajaan Kutai",
    era: "Hindu-Buddha",
    year: "Abad ke-4 M",
    summary: "Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur, dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
    content: [
      {
        heading: "Latar Belakang",
        paragraphs: [
          "Kerajaan Kutai merupakan kerajaan Hindu tertua di Indonesia yang diperkirakan berdiri pada abad ke-4 Masehi. Kerajaan ini terletak di hulu Sungai Mahakam, Kalimantan Timur. Keberadaan kerajaan ini diketahui dari penemuan tujuh buah prasasti yang dikenal sebagai Prasasti Yupa.",
          "Prasasti-prasasti tersebut ditulis dalam huruf Pallawa dan bahasa Sanskerta, menunjukkan adanya pengaruh kebudayaan India yang kuat pada masa itu. Prasasti ini merupakan bukti tertulis tertua tentang keberadaan kerajaan di Nusantara.",
          "Nama 'Kutai' sendiri berasal dari kata dalam bahasa lokal yang merujuk pada wilayah di sekitar Sungai Mahakam. Para ahli sejarah memperkirakan bahwa kerajaan ini berkembang berkat posisi strategisnya di jalur perdagangan sungai yang menghubungkan pedalaman Kalimantan dengan pesisir timur.",
          "Proses Indianisasi di Kutai diperkirakan terjadi melalui jalur perdagangan maritim. Para pedagang dan pendeta Hindu dari India membawa serta kebudayaan, agama, dan sistem pemerintahan yang kemudian diadopsi oleh penguasa lokal. Ini menunjukkan bahwa proses akulturasi berlangsung secara damai, bukan melalui penaklukan militer.",
        ],
      },
      {
        heading: "Raja-Raja Kutai",
        paragraphs: [
          "Berdasarkan Prasasti Yupa, silsilah raja-raja Kutai dimulai dari Kudungga, yang merupakan nama asli Indonesia (bukan nama Sanskrit). Hal ini menunjukkan bahwa kerajaan ini awalnya didirikan oleh penguasa lokal sebelum mengalami proses Indianisasi.",
          "Putra Kudungga bernama Aswawarman yang disebut sebagai 'wangsakarta' atau pembentuk keluarga raja. Gelar ini menunjukkan bahwa Aswawarman-lah yang pertama kali menganut agama Hindu dan mengadopsi tradisi kerajaan India, sehingga dianggap sebagai pendiri dinasti baru.",
          "Aswawarman memiliki tiga orang putra, dan yang paling terkenal adalah Mulawarman. Raja Mulawarman dikenal sebagai raja yang dermawan karena mengadakan upacara kurban emas yang besar dan menyumbangkan 20.000 ekor sapi kepada para Brahmana di sebuah tempat suci bernama Waprakeswara.",
          "Upacara kurban yang diadakan Mulawarman menunjukkan kemakmuran ekonomi kerajaan Kutai. Kemampuan untuk menyumbangkan 20.000 ekor sapi dan emas dalam jumlah besar membuktikan bahwa Kutai merupakan kerajaan yang kaya dan makmur pada masanya.",
          "Para sejarawan menduga bahwa setelah Mulawarman, Kerajaan Kutai terus eksis selama beberapa abad, namun tidak ada catatan tertulis yang tersisa. Kerajaan ini kemungkinan terus berkembang sebagai pusat perdagangan di Kalimantan hingga digantikan oleh kerajaan-kerajaan Islam di kemudian hari.",
        ],
      },
      {
        heading: "Kehidupan Masyarakat dan Ekonomi",
        paragraphs: [
          "Masyarakat Kerajaan Kutai hidup dari pertanian, perdagangan, dan perikanan di sepanjang Sungai Mahakam. Sungai ini menjadi urat nadi kehidupan ekonomi, berfungsi sebagai jalur transportasi utama dan sumber penghidupan masyarakat.",
          "Pengaruh Hindu terlihat dari praktik keagamaan yang mengikuti tradisi Weda, khususnya pemujaan terhadap Dewa Siwa. Upacara-upacara keagamaan dilakukan secara teratur, dipimpin oleh para Brahmana yang tinggal di sekitar istana raja.",
          "Kutai juga merupakan salah satu titik perdagangan penting di jalur perdagangan maritim antara India dan Cina. Letak geografisnya yang strategis di muara Sungai Mahakam memungkinkan akses ke perdagangan laut dan menjadikannya pelabuhan singgah bagi kapal-kapal dagang.",
          "Komoditas perdagangan utama Kutai meliputi hasil hutan seperti kayu gaharu, damar, lilin lebah, dan sarang burung walet. Produk-produk ini sangat diminati oleh pedagang dari India, Cina, dan wilayah Asia Tenggara lainnya.",
          "Sistem sosial masyarakat Kutai kemungkinan dipengaruhi oleh sistem kasta Hindu, meskipun penerapannya tidak seketat di India. Masyarakat terbagi menjadi golongan bangsawan, kaum agamawan (Brahmana), pedagang, dan rakyat biasa yang bekerja sebagai petani dan nelayan.",
        ],
      },
      {
        heading: "Peninggalan Sejarah",
        paragraphs: [
          "Peninggalan utama dari Kerajaan Kutai adalah tujuh buah Prasasti Yupa yang ditemukan di daerah Muara Kaman, Kalimantan Timur. Prasasti ini berupa tiang batu yang digunakan untuk mengikat hewan kurban dalam upacara keagamaan Hindu.",
          "Prasasti Yupa pertama kali ditemukan pada tahun 1879 oleh seorang pejabat Belanda. Penemuan ini sangat penting karena membuktikan bahwa peradaban Hindu sudah eksis di Kalimantan jauh sebelum yang diduga sebelumnya.",
          "Selain prasasti, ditemukan juga berbagai artefak seperti arca-arca kecil dan perhiasan yang menunjukkan tingginya peradaban masyarakat Kutai pada masa itu. Temuan-temuan ini kini tersimpan di Museum Nasional Indonesia di Jakarta.",
          "Situs Muara Kaman hingga kini masih menjadi objek penelitian arkeologi. Penggalian-penggalian yang dilakukan secara berkala terus mengungkap sisa-sisa peradaban Kutai, termasuk fondasi bangunan, pecahan gerabah, dan artefak logam.",
          "Kerajaan Kutai memiliki signifikansi khusus dalam sejarah Indonesia karena membuktikan bahwa proses pembentukan negara (state formation) di Nusantara sudah dimulai sejak abad ke-4 Masehi, menjadikan Indonesia salah satu kawasan tertua dalam hal peradaban terorganisir di Asia Tenggara.",
        ],
      },
      {
        heading: "Pengaruh dan Warisan Kutai",
        paragraphs: [
          "Kerajaan Kutai memberikan warisan penting dalam sejarah Indonesia sebagai bukti awal masuknya peradaban Hindu ke Nusantara. Proses akulturasi yang terjadi di Kutai menjadi model bagi penyebaran kebudayaan India di wilayah-wilayah lain di kepulauan Indonesia.",
          "Tradisi keagamaan Hindu yang diperkenalkan di Kutai kemudian menyebar ke berbagai wilayah di Kalimantan dan pulau-pulau lainnya. Jejak-jejak pengaruh ini masih dapat ditemukan dalam tradisi dan ritual masyarakat Dayak di pedalaman Kalimantan.",
          "Dalam konteks modern, Kutai menjadi salah satu kebanggaan sejarah Kalimantan Timur. Pemerintah setempat menjadikan warisan Kutai sebagai identitas budaya daerah, dengan berbagai festival dan acara budaya yang mengangkat tema kerajaan kuno ini.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kerajaan-tarumanagara"],
  },
  {
    slug: "kerajaan-sriwijaya",
    title: "Kerajaan Sriwijaya",
    era: "Hindu-Buddha",
    year: "Abad ke-7 – 13 M",
    summary: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang, menjadi pusat perdagangan dan pendidikan agama Buddha.",
    content: [
      {
        heading: "Kejayaan Maritim",
        paragraphs: [
          "Sriwijaya merupakan kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang, Sumatera Selatan. Kerajaan ini menguasai jalur perdagangan laut antara India, Cina, dan kepulauan Nusantara selama hampir enam abad, dari abad ke-7 hingga ke-13 Masehi.",
          "Kekuatan angkatan laut Sriwijaya memungkinkannya menguasai Selat Malaka, salah satu jalur perdagangan paling penting di dunia. Pedagang dari berbagai penjuru dunia singgah di pelabuhan-pelabuhan Sriwijaya, menjadikannya pusat perdagangan internasional yang ramai.",
          "Armada laut Sriwijaya terdiri dari kapal-kapal perang besar yang dilengkapi dengan senjata dan prajurit terlatih. Dengan kekuatan militer ini, Sriwijaya mampu mengamankan jalur-jalur perdagangan dan memungut pajak dari kapal-kapal dagang yang melintas.",
          "Pelabuhan-pelabuhan Sriwijaya tidak hanya berfungsi sebagai tempat singgah perdagangan, tetapi juga sebagai pusat pertukaran budaya antara berbagai bangsa. Pedagang Arab, India, Cina, dan Persia bertemu dan berinteraksi di pelabuhan-pelabuhan Sriwijaya, menciptakan masyarakat kosmopolitan yang kaya akan keberagaman.",
        ],
      },
      {
        heading: "Pusat Pendidikan Buddha",
        paragraphs: [
          "Sriwijaya dikenal sebagai pusat pembelajaran agama Buddha terbesar di Asia Tenggara. Pendeta Cina I-Tsing yang mengunjungi Sriwijaya pada tahun 671 M mencatat bahwa terdapat lebih dari 1.000 biksu yang tinggal dan belajar di sana.",
          "I-Tsing menyarankan para pelajar Buddha dari Cina untuk singgah di Sriwijaya terlebih dahulu untuk mempelajari bahasa Sanskerta dan ajaran Buddha sebelum melanjutkan perjalanan ke India. Hal ini menunjukkan tingginya kualitas pendidikan di Sriwijaya, setara dengan universitas-universitas besar di India seperti Nalanda.",
          "Kurikulum pembelajaran di Sriwijaya meliputi studi tentang tata bahasa Sanskerta, filsafat Buddha Mahayana, logika, seni sastra, dan meditasi. Para guru besar dari India dan Cina sering diundang untuk mengajar, menciptakan pertukaran intelektual yang dinamis.",
          "Atisha Dipankara, seorang guru besar Buddha dari Bengal, India, pernah belajar di Sriwijaya selama 12 tahun di bawah bimbingan guru Dharmakirti sebelum melanjutkan misi dakwahnya ke Tibet. Fakta ini menunjukkan reputasi internasional Sriwijaya sebagai pusat keilmuan.",
          "Perpustakaan-perpustakaan di Sriwijaya menyimpan ribuan manuskrip dalam bahasa Sanskerta, Pali, dan bahasa-bahasa lokal. Koleksi ini menjadikan Sriwijaya sebagai salah satu pusat penyimpanan pengetahuan terbesar di Asia pada masanya.",
        ],
      },
      {
        heading: "Hubungan Internasional dan Diplomasi",
        paragraphs: [
          "Sriwijaya menjalin hubungan diplomatik dengan berbagai kerajaan besar di Asia, termasuk Dinasti Tang dan Song di Cina, serta kerajaan-kerajaan di India. Hubungan ini memperkuat posisi Sriwijaya sebagai kekuatan regional yang disegani.",
          "Catatan sejarah Cina mencatat bahwa Sriwijaya mengirimkan duta-duta ke istana kaisar Cina secara teratur. Hubungan diplomatik ini bukan hanya bersifat seremonial, tetapi juga melibatkan perjanjian perdagangan dan pertahanan bersama.",
          "Pengaruh Sriwijaya bahkan mencapai hingga Filipina, Thailand, dan Kamboja. Kerajaan ini mengirimkan duta-duta ke Cina dan menerima pengakuan sebagai kerajaan besar yang setara dengan kekuatan-kekuatan utama di Asia.",
          "Di sisi barat, Sriwijaya menjalin hubungan dengan Kekhalifahan Abbasiyah di Baghdad. Pedagang Arab yang datang ke Sriwijaya mencatat kemakmuran dan keindahan ibu kota kerajaan ini. Hubungan dengan dunia Arab juga membuka jalur perdagangan rempah-rempah ke Timur Tengah dan Eropa.",
          "Sriwijaya juga menerapkan kebijakan 'mandala', yaitu sistem hubungan antar-negara yang bersifat hierarkis. Kerajaan-kerajaan kecil di sekitarnya mengakui supremasi Sriwijaya dan membayar upeti, sementara Sriwijaya memberikan perlindungan militer dan akses perdagangan.",
        ],
      },
      {
        heading: "Kehidupan Sosial dan Budaya",
        paragraphs: [
          "Masyarakat Sriwijaya hidup dalam lingkungan kosmopolitan yang multikultural. Penduduknya terdiri dari berbagai suku dan bangsa, termasuk orang Melayu, India, Cina, Arab, dan Persia. Keragaman ini tercermin dalam bahasa, makanan, dan tradisi yang beragam.",
          "Bahasa Melayu Kuno digunakan sebagai lingua franca di wilayah Sriwijaya. Prasasti-prasasti yang ditemukan di Palembang, Bangka, dan Jambi menggunakan bahasa Melayu Kuno dengan aksara Pallawa, menunjukkan bahwa bahasa ini sudah menjadi bahasa resmi kerajaan.",
          "Seni dan arsitektur Sriwijaya sangat dipengaruhi oleh tradisi Buddha. Candi-candi dan stupa-stupa dibangun di berbagai penjuru kerajaan. Meskipun sebagian besar telah hancur, beberapa peninggalan masih dapat ditemukan di situs Muaro Jambi dan Bukit Siguntang di Palembang.",
          "Kehidupan ekonomi masyarakat Sriwijaya sangat bergantung pada perdagangan maritim. Selain sebagai pedagang, masyarakat juga bekerja sebagai petani, nelayan, pengrajin, dan pekerja pelabuhan. Komoditas utama yang diperdagangkan meliputi rempah-rempah, kapur barus, kemenyan, dan emas.",
        ],
      },
      {
        heading: "Kemunduran dan Keruntuhan",
        paragraphs: [
          "Kemunduran Sriwijaya dimulai pada abad ke-11 ketika diserang oleh Kerajaan Chola dari India Selatan pada tahun 1025 M. Raja Rajendra Chola I meluncurkan serangan besar-besaran terhadap pelabuhan-pelabuhan Sriwijaya, menghancurkan dominasinya atas jalur perdagangan.",
          "Serangan Chola merupakan pukulan telak bagi Sriwijaya. Meskipun kerajaan ini tidak langsung runtuh, kekuasaannya atas Selat Malaka mulai melemah. Pelabuhan-pelabuhan yang sebelumnya di bawah kendali Sriwijaya mulai beroperasi secara independen.",
          "Pada abad ke-13, kemunculan Kerajaan Majapahit di Jawa dan pergeseran jalur perdagangan semakin mempercepat kemunduran Sriwijaya. Ekspedisi militer Majapahit di bawah Adityawarman berhasil menguasai sebagian wilayah Sriwijaya di Sumatera.",
          "Faktor internal juga berperan dalam keruntuhan Sriwijaya. Perang saudara, melemahnya otoritas pusat, dan pemberontakan daerah-daerah taklukan semakin melemahkan kerajaan ini. Pada akhir abad ke-13, Sriwijaya praktis sudah tidak lagi menjadi kekuatan regional.",
          "Warisan Sriwijaya tetap hidup dalam identitas budaya Melayu dan tradisi maritim Nusantara. Konsep 'Melayu' yang diperkenalkan Sriwijaya kemudian menjadi identitas yang luas, mencakup masyarakat di Sumatera, Semenanjung Malaya, dan wilayah-wilayah lainnya.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-kutai", "kerajaan-majapahit"],
  },
  {
    slug: "kerajaan-tarumanagara",
    title: "Kerajaan Tarumanagara",
    era: "Hindu-Buddha",
    year: "Abad ke-5 – 7 M",
    summary: "Kerajaan Hindu kuno di Jawa Barat yang dikenal melalui prasasti-prasasti peninggalan Raja Purnawarman.",
    content: [
      {
        heading: "Sejarah Berdiri",
        paragraphs: [
          "Kerajaan Tarumanagara adalah kerajaan Hindu yang terletak di wilayah Jawa Barat dan diperkirakan berdiri pada abad ke-5 Masehi. Kerajaan ini merupakan salah satu kerajaan tertua di Pulau Jawa dan menjadi bukti penting bahwa peradaban tinggi sudah berkembang di wilayah ini sejak berabad-abad lalu.",
          "Keberadaan kerajaan ini diketahui dari penemuan berbagai prasasti batu yang tersebar di wilayah Jawa Barat dan Banten. Prasasti-prasasti tersebut memberikan gambaran tentang kehidupan politik, keagamaan, dan sosial pada masa itu.",
          "Nama 'Tarumanagara' kemungkinan berasal dari kata 'taruma' yang merujuk pada pohon nila (indigo) yang banyak tumbuh di wilayah tersebut. Menurut sumber Cina, kerajaan ini mengirimkan duta ke istana Kaisar Cina pada tahun 528 M, membuktikan bahwa Tarumanagara sudah memiliki hubungan internasional sejak masa awal.",
          "Para arkeolog memperkirakan bahwa pusat kerajaan terletak di sekitar wilayah Bogor dan Bekasi sekarang. Penemuan prasasti-prasasti di berbagai lokasi menunjukkan bahwa wilayah kekuasaan Tarumanagara cukup luas, mencakup hampir seluruh Jawa Barat dan Banten.",
        ],
      },
      {
        heading: "Raja Purnawarman",
        paragraphs: [
          "Raja paling terkenal dari Kerajaan Tarumanagara adalah Purnawarman. Ia meninggalkan banyak prasasti, di antaranya Prasasti Ciaruteun yang menampilkan jejak tapak kaki raja yang disamakan dengan tapak kaki Dewa Wisnu, menunjukkan konsep devaraja (raja-dewa) yang dianut.",
          "Prasasti Tugu, salah satu prasasti terpenting, menceritakan tentang penggalian saluran air (sungai buatan) sepanjang 6.122 tombak (sekitar 11 km) yang dilakukan atas perintah Purnawarman. Proyek ini menunjukkan kemampuan teknik dan kepemimpinan yang luar biasa.",
          "Purnawarman juga membangun saluran air kedua yang disebut Gomati, yang dipersembahkan kepada para Brahmana. Proyek-proyek irigasi ini menunjukkan bahwa pemerintahan Purnawarman sangat memperhatikan kesejahteraan rakyat dan pembangunan infrastruktur pertanian.",
          "Prasasti Kebon Kopi menampilkan jejak kaki gajah yang disamakan dengan gajah Airawata, kendaraan Dewa Indra. Prasasti ini menunjukkan kekuatan militer Purnawarman yang disimbolkan dengan gajah perang, serta legitimasi religiusnya sebagai raja yang dilindungi para dewa.",
          "Selain prasasti di atas, ditemukan juga Prasasti Jambu yang menyebutkan keberanian dan kekuatan Raja Purnawarman. Prasasti ini menggambarkan Purnawarman sebagai raja yang tangguh dan gagah perkasa, dihormati oleh rakyat dan ditakuti oleh musuh-musuhnya.",
        ],
      },
      {
        heading: "Peradaban dan Budaya",
        paragraphs: [
          "Masyarakat Tarumanagara menganut agama Hindu, khususnya aliran Wisnu. Hal ini terlihat dari prasasti-prasasti yang menyebut raja sebagai penjelmaan Dewa Wisnu, konsep yang juga diterapkan di kerajaan-kerajaan Hindu lainnya di Asia Tenggara.",
          "Kerajaan ini memiliki sistem irigasi yang maju, menunjukkan bahwa pertanian merupakan tulang punggung perekonomian. Saluran-saluran air yang dibangun Purnawarman tidak hanya berfungsi untuk mengairi sawah, tetapi juga sebagai sarana pengendalian banjir di dataran rendah.",
          "Tarumanagara juga terlibat dalam perdagangan internasional melalui pelabuhan-pelabuhan di pantai utara Jawa. Catatan Cina menyebutkan bahwa Tarumanagara mengekspor hasil pertanian, rempah-rempah, dan produk hutan ke Cina dan India.",
          "Kehidupan seni dan budaya di Tarumanagara dipengaruhi oleh tradisi Hindu India namun tetap mempertahankan unsur-unsur lokal. Seni pahat yang ditemukan pada prasasti-prasasti menunjukkan keterampilan tinggi dalam seni ukir batu.",
          "Sistem tulisan yang digunakan di Tarumanagara adalah aksara Pallawa yang diadaptasi dari India Selatan. Penggunaan bahasa Sanskerta dalam prasasti menunjukkan bahwa kaum terpelajar di Tarumanagara menguasai bahasa ini dengan baik.",
        ],
      },
      {
        heading: "Hubungan dengan Kerajaan Lain",
        paragraphs: [
          "Tarumanagara menjalin hubungan diplomatik dengan Cina. Catatan sejarah Dinasti Liang menyebutkan bahwa pada tahun 528 M, duta dari Tarumanagara datang ke istana kaisar Cina membawa hadiah-hadiah berharga.",
          "Hubungan dengan India juga sangat erat, terlihat dari pengaruh kuat kebudayaan India dalam kehidupan kerajaan. Para Brahmana dari India kemungkinan berperan sebagai penasihat raja dan pemimpin upacara keagamaan.",
          "Setelah abad ke-7, Tarumanagara diperkirakan digantikan oleh Kerajaan Sunda. Proses peralihan kekuasaan ini masih menjadi perdebatan di kalangan sejarawan, apakah melalui pewarisan dinasti atau melalui konflik internal.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-kutai", "kerajaan-sriwijaya"],
  },
  {
    slug: "kerajaan-majapahit",
    title: "Kerajaan Majapahit",
    era: "Hindu-Buddha",
    year: "1293 – 1527 M",
    summary: "Kerajaan terbesar di Nusantara yang berhasil menyatukan hampir seluruh wilayah kepulauan Indonesia di bawah kepemimpinan Gajah Mada.",
    content: [
      {
        heading: "Berdirinya Majapahit",
        paragraphs: [
          "Kerajaan Majapahit didirikan oleh Raden Wijaya pada tahun 1293 setelah berhasil mengalahkan pasukan Mongol yang dikirim oleh Kaisar Kubilai Khan. Dengan kecerdikannya, Raden Wijaya memanfaatkan pasukan Mongol untuk mengalahkan musuhnya, Jayakatwang dari Kediri, kemudian membalikkan serangan kepada tentara Mongol.",
          "Pusat kerajaan terletak di Trowulan, Jawa Timur. Raden Wijaya kemudian bergelar Kertarajasa Jayawardhana dan menjadi raja pertama Majapahit. Ia mendirikan ibu kota yang megah dengan tata kota yang terencana, dilengkapi dengan kanal-kanal air, jalan-jalan lebar, dan bangunan-bangunan monumental.",
          "Sebelum mendirikan Majapahit, Raden Wijaya mengalami masa-masa sulit. Ia harus melarikan diri dari kejaran Jayakatwang dan bersembunyi di hutan Tarik. Berkat bantuan penduduk setempat dan dukungan dari Madura, ia berhasil membangun kekuatan untuk merebut kembali kekuasaan.",
          "Strategi Raden Wijaya dalam menghadapi invasi Mongol merupakan salah satu contoh kecerdikan politik dan militer yang luar biasa dalam sejarah Indonesia. Ia berpura-pura tunduk kepada Mongol, kemudian memanfaatkan kekuatan militer mereka untuk mengalahkan musuh internalnya, sebelum akhirnya mengusir tentara Mongol dari Jawa.",
        ],
      },
      {
        heading: "Masa Kejayaan di Bawah Hayam Wuruk",
        paragraphs: [
          "Majapahit mencapai puncak kejayaannya pada masa pemerintahan Raja Hayam Wuruk (1350-1389) dengan Mahapatih Gajah Mada. Gajah Mada bersumpah dalam Sumpah Palapa untuk tidak akan makan palapa (rempah-rempah) sebelum berhasil menyatukan seluruh Nusantara.",
          "Di bawah kepemimpinan mereka, wilayah kekuasaan Majapahit membentang dari Sumatera hingga Papua, bahkan mencakup sebagian Semenanjung Malaya dan Filipina Selatan. Kitab Negarakertagama karya Mpu Prapanca mencatat setidaknya 98 daerah yang berada di bawah pengaruh Majapahit.",
          "Masa ini juga ditandai dengan kemajuan seni dan sastra. Selain Negarakertagama, karya sastra penting lainnya adalah Sutasoma karya Mpu Tantular yang memuat semboyan 'Bhinneka Tunggal Ika' yang kemudian menjadi semboyan negara Indonesia.",
          "Hayam Wuruk sendiri dikenal sebagai raja yang cakap dan berbudaya tinggi. Ia mahir dalam berbagai bidang seni, termasuk seni tari, musik, dan sastra. Istananya menjadi pusat kebudayaan yang menarik seniman dan cendekiawan dari seluruh Nusantara.",
          "Gajah Mada, sebagai Mahapatih, menjalankan pemerintahan dengan tegas dan efisien. Ia merancang strategi militer dan diplomatik yang berhasil memperluas wilayah Majapahit secara drastis. Keberhasilannya dalam menyatukan Nusantara menjadikannya salah satu tokoh terbesar dalam sejarah Indonesia.",
        ],
      },
      {
        heading: "Struktur Pemerintahan",
        paragraphs: [
          "Majapahit memiliki sistem pemerintahan yang terstruktur dan kompleks. Raja dibantu oleh Mahapatih (perdana menteri), Rakryan Mahamantri Katrini (tiga menteri utama), dan para pejabat daerah yang disebut Bhre.",
          "Sistem pemerintahan ini memungkinkan Majapahit mengelola wilayah yang sangat luas secara efektif. Daerah-daerah taklukan diberikan otonomi namun harus mengakui kedaulatan Majapahit dan membayar upeti secara teratur.",
          "Di tingkat pusat, terdapat berbagai lembaga yang mengurus urusan keagamaan, peradilan, militer, dan keuangan. Sistem birokrasi ini cukup maju untuk ukuran zamannya dan memungkinkan administrasi yang efisien.",
          "Wilayah Majapahit dibagi menjadi beberapa kategori: wilayah inti (Jawa Timur), wilayah taklukan langsung, dan wilayah vasal yang memiliki otonomi luas. Masing-masing memiliki hubungan yang berbeda dengan pemerintah pusat di Trowulan.",
          "Sistem hukum Majapahit diatur dalam kitab undang-undang yang mengatur berbagai aspek kehidupan masyarakat, dari hukum pidana hingga peraturan perdagangan. Pengadilan diselenggarakan secara teratur untuk menyelesaikan sengketa dan menegakkan keadilan.",
        ],
      },
      {
        heading: "Kehidupan Ekonomi dan Perdagangan",
        paragraphs: [
          "Majapahit memiliki perekonomian yang sangat maju, ditopang oleh perdagangan rempah-rempah, pertanian, dan kerajinan tangan. Pelabuhan-pelabuhan utama di pantai utara Jawa menjadi pusat perdagangan internasional yang ramai.",
          "Pedagang dari Cina, India, Arab, dan Persia datang ke pelabuhan-pelabuhan Majapahit untuk berdagang. Rempah-rempah seperti cengkeh, pala, dan lada merupakan komoditas utama yang sangat diminati oleh pedagang asing.",
          "Pertanian padi di dataran-dataran subur Jawa Timur menjadi tulang punggung ekonomi domestik. Sistem irigasi yang canggih memungkinkan produksi padi yang melimpah, mampu menghidupi populasi yang besar.",
          "Kerajinan tangan Majapahit, termasuk kain tenun, perhiasan emas, dan keramik, juga menjadi komoditas perdagangan penting. Kualitas produk-produk ini diakui secara internasional dan diminati oleh para pedagang asing.",
          "Mata uang yang digunakan di Majapahit meliputi koin tembaga Cina dan logam mulia lokal. Sistem ekonomi moneter ini menunjukkan tingkat sofistikasi ekonomi yang tinggi dan integrasi dengan jaringan perdagangan global.",
        ],
      },
      {
        heading: "Kemunduran dan Keruntuhan",
        paragraphs: [
          "Setelah wafatnya Hayam Wuruk pada tahun 1389, Majapahit mengalami perang saudara yang dikenal sebagai Perang Paregreg (1405-1406). Konflik perebutan takhta ini sangat melemahkan kekuatan Majapahit dari dalam.",
          "Pada abad ke-15, penyebaran Islam semakin meluas di Nusantara. Banyak daerah taklukan yang melepaskan diri dan memeluk agama Islam, membentuk kesultanan-kesultanan baru yang independen.",
          "Kesultanan Demak yang didirikan oleh Raden Patah akhirnya mengakhiri kekuasaan Majapahit sekitar tahun 1527. Sebagian besar bangsawan Majapahit yang tidak memeluk Islam mengungsi ke Bali, membawa serta tradisi Hindu-Jawa yang masih lestari hingga kini.",
          "Faktor alam juga diduga berperan dalam keruntuhan Majapahit. Banjir besar, kekeringan, dan bencana alam lainnya merusak infrastruktur pertanian dan mengurangi produksi pangan, memperparah ketidakstabilan politik yang sudah terjadi.",
        ],
      },
      {
        heading: "Warisan Majapahit",
        paragraphs: [
          "Warisan terbesar Majapahit bagi Indonesia adalah konsep persatuan Nusantara. Sumpah Palapa Gajah Mada menjadi inspirasi bagi cita-cita persatuan bangsa Indonesia. Semboyan Bhinneka Tunggal Ika dari kitab Sutasoma menjadi semboyan resmi negara.",
          "Peninggalan arkeologis Majapahit yang ditemukan di Trowulan menunjukkan tingginya peradaban kerajaan ini, termasuk sistem tata kota yang terencana, kanal-kanal air, dan berbagai candi serta arca yang indah.",
          "Tradisi budaya Majapahit masih hidup di Bali dan sebagian Jawa Timur. Tari-tarian, upacara keagamaan, seni arsitektur, dan sistem sosial yang berasal dari Majapahit terus dipraktikkan oleh masyarakat Bali hingga kini.",
          "Dalam konteks modern, Majapahit sering dijadikan simbol kejayaan masa lalu Indonesia. Para pendiri bangsa Indonesia, termasuk Soekarno, sering merujuk pada kejayaan Majapahit untuk membangkitkan semangat nasionalisme dan kebanggaan nasional.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kesultanan-demak"],
  },
  {
    slug: "kesultanan-demak",
    title: "Kesultanan Demak",
    era: "Kesultanan",
    year: "1475 – 1554 M",
    summary: "Kesultanan Islam pertama di Pulau Jawa yang memainkan peran penting dalam penyebaran agama Islam di Nusantara.",
    content: [
      {
        heading: "Berdirinya Kesultanan Demak",
        paragraphs: [
          "Kesultanan Demak didirikan oleh Raden Patah sekitar tahun 1475 di pesisir utara Jawa Tengah. Raden Patah diperkirakan merupakan keturunan dari raja terakhir Majapahit, sehingga Demak dianggap sebagai penerus sah kekuasaan Majapahit dalam bentuk kerajaan Islam.",
          "Berdirinya Demak menandai era baru dalam sejarah Indonesia, yaitu peralihan dari kerajaan Hindu-Buddha ke kesultanan Islam. Demak menjadi pusat penyebaran Islam di Jawa dan sekitarnya, menarik para ulama dan pedagang Muslim dari berbagai penjuru.",
          "Letak Demak di pesisir utara Jawa sangat strategis untuk perdagangan. Pelabuhan Demak menjadi salah satu pelabuhan tersibuk di Jawa, menghubungkan perdagangan antara Malaka, Jawa, dan kepulauan Maluku yang kaya rempah-rempah.",
          "Proses peralihan dari Hindu ke Islam di Demak berlangsung relatif damai. Raden Patah mengkombinasikan legitimasi dinasti Majapahit dengan otoritas keagamaan Islam, sehingga transisi kekuasaan dapat diterima oleh masyarakat luas.",
        ],
      },
      {
        heading: "Wali Songo dan Penyebaran Islam",
        paragraphs: [
          "Penyebaran Islam di Jawa tidak terlepas dari peran Wali Songo, sembilan orang wali penyebar Islam yang legendaris. Sunan Kalijaga, Sunan Ampel, Sunan Giri, dan wali lainnya menggunakan pendekatan kultural dalam menyebarkan Islam.",
          "Para Wali Songo mengadaptasi kesenian dan tradisi lokal untuk menyampaikan ajaran Islam. Wayang, gamelan, dan tembang Jawa digunakan sebagai media dakwah, sehingga Islam dapat diterima dengan baik oleh masyarakat Jawa tanpa menghapus tradisi lokal.",
          "Sunan Kalijaga, salah satu wali yang paling terkenal, menciptakan lagu-lagu Jawa bernuansa Islami dan menggunakan pertunjukan wayang untuk menyampaikan pesan-pesan keagamaan. Pendekatan akulturatif ini menjadi ciri khas penyebaran Islam di Jawa.",
          "Sunan Ampel, yang dianggap sebagai pelopor Wali Songo, mendirikan pesantren di Ampel Denta, Surabaya. Pesantren ini menjadi pusat pendidikan Islam pertama di Jawa dan menghasilkan banyak ulama dan mubalig yang kemudian menyebarkan Islam ke berbagai daerah.",
          "Model dakwah Wali Songo yang toleran dan akomodatif terhadap budaya lokal menghasilkan Islam Nusantara yang khas — Islam yang harmonis dengan tradisi dan budaya setempat, berbeda dengan praktik Islam di kawasan Timur Tengah dan Asia Selatan.",
        ],
      },
      {
        heading: "Masjid Agung Demak",
        paragraphs: [
          "Peninggalan paling terkenal dari Kesultanan Demak adalah Masjid Agung Demak yang dibangun oleh Wali Songo. Masjid ini memiliki arsitektur unik dengan atap tumpang tiga yang melambangkan Iman, Islam, dan Ihsan.",
          "Salah satu tiang utama masjid, yang disebut Soko Tatal, terbuat dari serpihan-serpihan kayu yang disatukan oleh Sunan Kalijaga. Menurut legenda, tiang ini dibuat dalam satu malam sebagai bukti karamah (keajaiban) sang wali.",
          "Masjid Agung Demak dibangun dengan gotong royong oleh para wali dan masyarakat sekitar. Proses pembangunannya dipenuhi kisah-kisah legendaris yang menunjukkan kerja sama dan semangat keagamaan para pendiri Islam di Jawa.",
          "Arsitektur Masjid Agung Demak menunjukkan perpaduan antara tradisi bangunan Jawa dan arsitektur Islam. Atap tumpang yang menyerupai meru (gunung suci Hindu) diadaptasi menjadi simbol Islam, menunjukkan proses akulturasi budaya yang harmonis.",
          "Masjid ini hingga kini masih berdiri dan menjadi salah satu masjid tertua di Indonesia. Setiap tahun, ribuan peziarah datang untuk mengunjungi masjid ini dan makam-makam para wali yang berada di sekitarnya.",
        ],
      },
      {
        heading: "Perlawanan terhadap Portugis",
        paragraphs: [
          "Kesultanan Demak aktif melawan ekspansi Portugis di Nusantara. Pada tahun 1513, Demak mengirim pasukan untuk membantu Kesultanan Malaka yang diserang Portugis, meskipun serangan tersebut tidak berhasil membebaskan Malaka.",
          "Demak juga mengirimkan armada laut untuk menyerang benteng Portugis di Malaka pada beberapa kesempatan lainnya. Meskipun tidak pernah berhasil merebut kembali Malaka, perlawanan ini menunjukkan komitmen Demak dalam melawan kolonialisme Eropa.",
          "Perlawanan Demak terhadap Portugis juga bermotif ekonomi. Jatuhnya Malaka ke tangan Portugis mengganggu jalur perdagangan tradisional yang selama berabad-abad dikuasai oleh pedagang-pedagang Muslim Nusantara.",
          "Strategi Demak melawan Portugis melibatkan aliansi dengan kesultanan-kesultanan lain di Nusantara. Kerja sama ini menunjukkan solidaritas antar-kerajaan Islam dalam menghadapi ancaman dari luar.",
        ],
      },
      {
        heading: "Warisan dan Pengaruh",
        paragraphs: [
          "Kesultanan Demak meninggalkan warisan yang mendalam dalam sejarah Indonesia. Sebagai kesultanan Islam pertama di Jawa, Demak menjadi model bagi kesultanan-kesultanan lain yang berdiri kemudian.",
          "Tradisi Islam Jawa yang dikembangkan pada masa Demak, dengan perpaduan antara ajaran Islam dan budaya Jawa, tetap menjadi ciri khas Islam di Indonesia hingga kini. Tradisi seperti sekaten, grebeg, dan berbagai upacara keagamaan lainnya berakar dari masa Demak.",
          "Setelah Demak, kekuasaan berpindah ke Kesultanan Pajang dan kemudian Kesultanan Mataram Islam. Keduanya melanjutkan tradisi dan warisan Demak sebagai pusat kekuasaan Islam di Jawa.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-majapahit", "perlawanan-kolonialisme"],
  },
  {
    slug: "perlawanan-kolonialisme",
    title: "Perlawanan terhadap Kolonialisme",
    era: "Kolonial",
    year: "Abad ke-16 – 20 M",
    summary: "Perjuangan rakyat Indonesia melawan penjajahan VOC dan Hindia Belanda selama berabad-abad.",
    content: [
      {
        heading: "Kedatangan Bangsa Eropa",
        paragraphs: [
          "Bangsa Eropa pertama yang tiba di Nusantara adalah Portugis, yang berhasil merebut Malaka pada tahun 1511. Kemudian disusul oleh Spanyol, Belanda, dan Inggris. Mereka tertarik dengan kekayaan rempah-rempah Nusantara yang sangat bernilai di pasar Eropa.",
          "Pada tahun 1602, Belanda mendirikan VOC (Vereenigde Oostindische Compagnie) yang kemudian menjadi kekuatan kolonial dominan di Nusantara. VOC menerapkan monopoli perdagangan yang merugikan rakyat Indonesia dan menghancurkan sistem perdagangan bebas yang sudah ada sebelumnya.",
          "VOC tidak hanya berdagang, tetapi juga membangun benteng-benteng, angkatan bersenjata, dan sistem administrasi kolonial. Dengan kekuatan militer dan politik ini, VOC secara bertahap menguasai wilayah-wilayah strategis di Nusantara.",
          "Kebijakan monopoli VOC sangat merugikan rakyat Indonesia. Di Kepulauan Maluku, misalnya, VOC menerapkan kebijakan ekstirpasi — penebangan paksa pohon-pohon rempah di luar wilayah yang mereka kontrol untuk menjaga harga tetap tinggi di pasar Eropa.",
        ],
      },
      {
        heading: "Perlawanan di Berbagai Daerah",
        paragraphs: [
          "Perlawanan terhadap kolonialisme terjadi di seluruh penjuru Nusantara. Sultan Hasanuddin dari Makassar melawan VOC dengan gagah berani hingga dijuluki 'Ayam Jantan dari Timur'. Kerajaan Gowa-Tallo yang dipimpinnya merupakan kekuatan maritim besar yang menentang monopoli VOC.",
          "Perang Padri di Sumatera Barat (1803-1837) dipimpin oleh Tuanku Imam Bonjol. Perang ini bermula dari konflik internal antara kaum Padri (pembaharu Islam) dan kaum Adat, namun berubah menjadi perang melawan Belanda ketika kaum Adat meminta bantuan kolonial.",
          "Pangeran Diponegoro memimpin Perang Jawa (1825-1830), perang terbesar yang pernah dihadapi Belanda di Nusantara. Perang ini menelan biaya besar dan menewaskan sekitar 200.000 orang dari pihak Indonesia dan 15.000 dari pihak Belanda.",
          "Di Aceh, perlawanan yang dipimpin oleh Teuku Umar dan Cut Nyak Dhien berlangsung selama puluhan tahun (1873-1914). Perlawanan sengit rakyat Aceh membuat Belanda sangat kesulitan menaklukkan wilayah ini, dan Perang Aceh menjadi perang paling lama dan paling berdarah dalam sejarah kolonialisme Belanda.",
          "Di Bali, perlawanan rakyat terhadap Belanda berakhir tragis dengan peristiwa Puputan (pertempuran sampai mati) di Badung (1906) dan Klungkung (1908). Raja-raja Bali memilih mati berperang daripada menyerah kepada Belanda, menunjukkan keberanian luar biasa dalam mempertahankan kehormatan.",
          "Perlawanan Sisingamangaraja XII di Tapanuli (1878-1907) menunjukkan semangat juang rakyat Batak melawan kolonialisme. Sisingamangaraja XII menggunakan taktik gerilya dan berhasil bertahan selama hampir tiga dekade sebelum akhirnya gugur.",
        ],
      },
      {
        heading: "Sistem Tanam Paksa",
        paragraphs: [
          "Pada tahun 1830, Gubernur Jenderal Van den Bosch menerapkan Sistem Tanam Paksa (Cultuurstelsel). Rakyat dipaksa menanam tanaman ekspor di sepertiga lahan mereka untuk diserahkan kepada pemerintah kolonial tanpa imbalan yang layak.",
          "Sistem ini menyebabkan penderitaan luar biasa bagi rakyat Indonesia. Kelaparan dan kemiskinan merajalela karena rakyat tidak memiliki cukup waktu dan lahan untuk menanam padi bagi kebutuhan pangan mereka sendiri.",
          "Bagi Belanda, sistem ini menghasilkan keuntungan besar yang disebut 'batig slot' (saldo menguntungkan). Hasil tanam paksa digunakan untuk membiayai pembangunan di Belanda, termasuk pembangunan jalur kereta api dan pelunasan utang nasional.",
          "Tanaman-tanaman yang wajib ditanam meliputi kopi, tebu, nila (indigo), teh, dan tembakau. Setiap desa diwajibkan menyediakan tenaga kerja dan lahan untuk menanam komoditas ini. Kepala desa yang gagal memenuhi target akan dihukum.",
          "Multatuli (Eduard Douwes Dekker), seorang pejabat Belanda yang menyaksikan kekejaman tanam paksa, menulis novel 'Max Havelaar' (1860) yang mengungkap penderitaan rakyat Indonesia. Novel ini menimbulkan gelombang protes di Belanda dan berkontribusi pada penghapusan sistem tanam paksa.",
        ],
      },
      {
        heading: "Politik Etis dan Dampaknya",
        paragraphs: [
          "Pada awal abad ke-20, Belanda menerapkan Politik Etis yang terdiri dari tiga program: irigasi (pembangunan pengairan), emigrasi (transmigrasi), dan edukasi (pendidikan). Kebijakan ini dimaksudkan sebagai 'balas budi' kepada rakyat Indonesia.",
          "Ironinya, kebijakan edukasi justru melahirkan kaum terpelajar Indonesia yang kemudian menjadi pelopor pergerakan nasional. Tokoh-tokoh seperti Soekarno, Hatta, dan Sjahrir mengenyam pendidikan Barat dan menggunakannya untuk memperjuangkan kemerdekaan.",
          "Program irigasi dan emigrasi lebih banyak menguntungkan kepentingan ekonomi kolonial daripada rakyat Indonesia. Pembangunan irigasi ditujukan untuk meningkatkan produksi perkebunan, bukan untuk kesejahteraan petani pribumi.",
          "Meskipun demikian, Politik Etis membuka akses pendidikan bagi sebagian kecil rakyat Indonesia. Sekolah-sekolah yang didirikan menghasilkan golongan terpelajar baru yang memiliki kesadaran politik dan nasionalisme yang tinggi.",
          "Kaum terpelajar ini kemudian mendirikan organisasi-organisasi modern seperti Budi Utomo (1908), Sarekat Islam (1912), dan Perhimpunan Indonesia di Belanda. Mereka menggunakan pengetahuan dan keterampilan yang diperoleh dari pendidikan Barat untuk melawan sistem kolonial itu sendiri.",
        ],
      },
      {
        heading: "Dampak Kolonialisme terhadap Indonesia",
        paragraphs: [
          "Kolonialisme meninggalkan dampak yang sangat mendalam terhadap Indonesia. Secara ekonomi, eksploitasi selama berabad-abad menyebabkan kemiskinan struktural yang dampaknya masih terasa hingga jauh setelah kemerdekaan.",
          "Secara sosial, kolonialisme menciptakan stratifikasi masyarakat yang kompleks. Sistem kelas yang diterapkan Belanda — yang membagi masyarakat menjadi golongan Eropa, Timur Asing, dan Pribumi — meninggalkan luka sosial yang mendalam.",
          "Namun, perjuangan melawan kolonialisme juga melahirkan semangat persatuan dan nasionalisme Indonesia. Pengalaman penderitaan bersama di bawah penjajahan menjadi perekat yang menyatukan berbagai suku dan etnis menjadi satu bangsa Indonesia.",
        ],
      },
    ],
    relatedSlugs: ["kesultanan-demak", "kebangkitan-nasional"],
  },
  {
    slug: "kebangkitan-nasional",
    title: "Kebangkitan Nasional",
    era: "Pergerakan",
    year: "1908 – 1945",
    summary: "Era pergerakan nasional yang menandai bangkitnya kesadaran berbangsa dan semangat kemerdekaan Indonesia.",
    content: [
      {
        heading: "Budi Utomo dan Awal Pergerakan",
        paragraphs: [
          "Pada tanggal 20 Mei 1908, dr. Soetomo dan mahasiswa STOVIA mendirikan Budi Utomo, organisasi modern pertama di Indonesia. Meskipun masih bersifat kedaerahan (Jawa-sentris), Budi Utomo menandai dimulainya era pergerakan nasional yang terorganisir.",
          "Setelah Budi Utomo, bermunculan organisasi-organisasi lain seperti Sarekat Islam (1912), Indische Partij (1912), dan Muhammadiyah (1912). Organisasi-organisasi ini memiliki tujuan dan pendekatan berbeda, tetapi semuanya bertujuan memajukan rakyat Indonesia.",
          "Sarekat Islam yang didirikan oleh H. Samanhudi pada tahun 1912 berkembang menjadi organisasi massa pertama di Indonesia dengan jutaan anggota. Awalnya bergerak di bidang ekonomi untuk melindungi pedagang batik pribumi, organisasi ini kemudian berkembang menjadi gerakan politik yang menuntut keadilan sosial.",
          "Indische Partij yang didirikan oleh tiga serangkai — E.F.E. Douwes Dekker, Tjipto Mangunkusumo, dan Ki Hadjar Dewantara — merupakan organisasi politik pertama yang secara eksplisit menuntut kemerdekaan Indonesia. Ketiga pemimpinnya diasingkan oleh Belanda karena aktivitas politiknya.",
          "Muhammadiyah yang didirikan oleh K.H. Ahmad Dahlan di Yogyakarta fokus pada pembaharuan Islam dan pendidikan. Organisasi ini mendirikan ribuan sekolah, rumah sakit, dan panti asuhan di seluruh Indonesia, memberikan kontribusi besar dalam bidang sosial dan pendidikan.",
        ],
      },
      {
        heading: "Sumpah Pemuda 1928",
        paragraphs: [
          "Peristiwa paling monumental dalam pergerakan nasional adalah Sumpah Pemuda yang diikrarkan pada tanggal 28 Oktober 1928. Para pemuda dari berbagai suku dan daerah bersumpah: Satu Nusa, Satu Bangsa, dan Satu Bahasa — Indonesia.",
          "Sumpah Pemuda menjadi tonggak penting dalam pembentukan identitas nasional Indonesia. Bahasa Melayu resmi dipilih sebagai bahasa persatuan dengan nama 'Bahasa Indonesia', menyatukan ratusan suku bangsa dengan bahasa yang berbeda-beda.",
          "Lagu Indonesia Raya yang diciptakan oleh W.R. Supratman juga pertama kali diperdengarkan dalam Kongres Pemuda II ini. Lagu ini kemudian menjadi lagu kebangsaan Republik Indonesia dan simbol semangat persatuan bangsa.",
          "Kongres Pemuda II dihadiri oleh perwakilan dari berbagai organisasi pemuda daerah, termasuk Jong Java, Jong Sumatranen Bond, Jong Islamieten Bond, Jong Celebes, dan lainnya. Keberhasilan kongres ini dalam merumuskan identitas nasional menunjukkan kedewasaan politik para pemuda Indonesia.",
          "Sebelum Sumpah Pemuda, identitas masyarakat Indonesia bersifat kedaerahan dan kesukuan. Sumpah Pemuda berhasil mentransformasikan identitas ini menjadi identitas nasional yang inklusif, melampaui batas-batas suku, agama, dan daerah.",
        ],
      },
      {
        heading: "Tokoh-Tokoh Pergerakan",
        paragraphs: [
          "Soekarno mendirikan PNI (Partai Nasional Indonesia) pada tahun 1927 dengan tujuan kemerdekaan penuh. Dengan pidato-pidatonya yang membara, Soekarno mampu membangkitkan semangat nasionalisme di kalangan rakyat dan menjadi simbol perjuangan kemerdekaan.",
          "Mohammad Hatta dan Sutan Sjahrir memimpin gerakan nasionalis dari Belanda melalui organisasi Perhimpunan Indonesia. Keduanya merupakan pemikir dan intelektual yang memberikan landasan ideologis bagi perjuangan kemerdekaan Indonesia.",
          "Ki Hadjar Dewantara mendirikan Taman Siswa pada tahun 1922 sebagai bentuk perlawanan melalui pendidikan. Semboyannya 'Ing ngarso sung tulodho, ing madyo mangun karso, tut wuri handayani' menjadi filosofi pendidikan Indonesia yang masih relevan hingga kini.",
          "R.A. Kartini, meskipun wafat pada tahun 1904, menjadi pelopor emansipasi perempuan Indonesia. Surat-suratnya yang dikumpulkan dalam buku 'Habis Gelap Terbitlah Terang' menginspirasi generasi perempuan Indonesia untuk mengejar pendidikan dan kesetaraan.",
          "Tan Malaka merupakan tokoh pergerakan yang radikal dan kontroversial. Ia menyebarkan gagasan komunisme dan nasionalisme, dan menulis buku 'Naar de Republiek Indonesia' (Menuju Republik Indonesia) yang mempengaruhi banyak aktivis kemerdekaan.",
          "Agus Salim, diplomat dan politikus ulung, memperjuangkan kemerdekaan melalui jalur diplomasi dan politik. Kecerdasannya dalam bernegosiasi dan kemampuan berbahasa asingnya menjadikannya salah satu tokoh pergerakan yang paling dihormati.",
        ],
      },
      {
        heading: "Pendudukan Jepang dan Dampaknya",
        paragraphs: [
          "Pada tanggal 8 Maret 1942, Jepang berhasil mengalahkan Belanda dan menduduki Indonesia. Awalnya, kedatangan Jepang disambut oleh sebagian rakyat Indonesia yang berharap pembebasan dari penjajahan Belanda.",
          "Jepang menerapkan kebijakan yang kontradiktif: di satu sisi memobilisasi rakyat Indonesia untuk kepentingan perang, di sisi lain memberikan ruang bagi nasionalisme Indonesia. Organisasi-organisasi seperti PUTERA dan Jawa Hokokai dibentuk dengan melibatkan tokoh-tokoh nasionalis Indonesia.",
          "Jepang membentuk PETA (Pembela Tanah Air) dan Heiho sebagai pasukan militer pribumi. Pelatihan militer ini kemudian menjadi modal penting bagi perjuangan kemerdekaan Indonesia, karena banyak anggota PETA yang kemudian menjadi perwira TNI.",
          "Penderitaan rakyat Indonesia justru semakin berat di bawah pendudukan Jepang. Sistem romusha (kerja paksa) menewaskan jutaan orang Indonesia yang dipekerjakan dalam proyek-proyek militer Jepang tanpa upah yang layak.",
          "Menjelang akhir perang, Jepang membentuk BPUPKI (Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia) pada tahun 1945 yang bertugas merumuskan dasar negara dan konstitusi Indonesia.",
        ],
      },
      {
        heading: "Menuju Kemerdekaan",
        paragraphs: [
          "Pada sidang BPUPKI, Soekarno mengusulkan Pancasila sebagai dasar negara pada 1 Juni 1945. Lima sila yang diusulkan — Kebangsaan, Internasionalisme, Mufakat, Kesejahteraan Sosial, dan Ketuhanan — menjadi fondasi ideologis negara Indonesia.",
          "PPKI (Panitia Persiapan Kemerdekaan Indonesia) dibentuk untuk mempersiapkan segala hal terkait kemerdekaan. Anggotanya terdiri dari tokoh-tokoh terkemuka dari seluruh Indonesia yang bertugas menyusun konstitusi dan struktur pemerintahan.",
          "Setelah Jepang menyerah kepada Sekutu pada 15 Agustus 1945 akibat bom atom di Hiroshima dan Nagasaki, para pemuda mendesak Soekarno-Hatta untuk segera memproklamasikan kemerdekaan tanpa menunggu persetujuan Jepang.",
          "Ketegangan antara golongan tua (yang ingin menunggu momen tepat) dan golongan muda (yang ingin proklamasi segera) mencapai puncaknya dengan peristiwa Rengasdengklok. Tekanan dari para pemuda akhirnya mendorong percepatan proklamasi kemerdekaan.",
        ],
      },
    ],
    relatedSlugs: ["perlawanan-kolonialisme", "proklamasi-kemerdekaan"],
  },
  {
    slug: "proklamasi-kemerdekaan",
    title: "Proklamasi Kemerdekaan Indonesia",
    era: "Kemerdekaan",
    year: "17 Agustus 1945",
    summary: "Detik-detik bersejarah proklamasi kemerdekaan Republik Indonesia oleh Soekarno-Hatta.",
    content: [
      {
        heading: "Peristiwa Rengasdengklok",
        paragraphs: [
          "Pada tanggal 16 Agustus 1945, sekelompok pemuda yang dipimpin oleh Soekarni, Chaerul Saleh, dan Wikana membawa Soekarno dan Hatta ke Rengasdengklok, Karawang. Para pemuda mendesak agar proklamasi segera dilakukan tanpa menunggu persetujuan Jepang.",
          "Para pemuda khawatir bahwa penundaan proklamasi akan memberikan kesempatan bagi Sekutu untuk mendarat di Indonesia dan mengembalikan kekuasaan kolonial Belanda. Mereka merasa bahwa momentum kemerdekaan harus segera dimanfaatkan.",
          "Setelah negosiasi yang alot antara golongan tua dan golongan muda, akhirnya disepakati bahwa proklamasi akan dilakukan keesokan harinya, 17 Agustus 1945. Ahmad Soebardjo berperan penting sebagai mediator antara kedua kelompok ini.",
          "Peristiwa Rengasdengklok menunjukkan betapa besar semangat dan keberanian para pemuda Indonesia dalam memperjuangkan kemerdekaan. Meskipun kontroversial, tindakan mereka dianggap sebagai katalis yang mempercepat proklamasi kemerdekaan.",
        ],
      },
      {
        heading: "Perumusan Teks Proklamasi",
        paragraphs: [
          "Pada malam tanggal 16 Agustus 1945, teks proklamasi dirumuskan di rumah Laksamana Tadashi Maeda di Jalan Imam Bonjol No. 1, Jakarta. Rumah ini dipilih karena dianggap aman dari pengawasan militer Jepang.",
          "Soekarno, Hatta, dan Ahmad Soebardjo merumuskan teks proklamasi. Proses perumusan berlangsung dalam suasana tegang namun penuh semangat. Soekarno menulis draf awal dengan tulisan tangan, sementara Hatta dan Soebardjo memberikan masukan.",
          "Teks proklamasi ditulis tangan oleh Soekarno atas saran Hatta yang menginginkan agar dokumen bersejarah ini memiliki sentuhan personal. Sayuti Melik kemudian mengetik ulang teks tersebut dengan beberapa perubahan, termasuk penambahan 'atas nama bangsa Indonesia' yang diusulkan oleh Soekarni.",
          "Kata-kata dalam teks proklamasi dipilih dengan sangat hati-hati. Kalimat yang singkat namun padat ini mencerminkan kebulatan tekad bangsa Indonesia untuk merdeka dan berdaulat. Setiap kata mengandung makna yang mendalam tentang harga diri dan kebebasan.",
          "Perubahan dari 'tempoh' menjadi 'tempo' dan penggunaan ejaan lama menunjukkan bahwa teks ini ditulis dalam waktu yang sangat terbatas. Namun, justru kesederhanaan inilah yang membuat teks proklamasi begitu kuat dan bermakna.",
        ],
      },
      {
        heading: "Detik-Detik Proklamasi",
        paragraphs: [
          "Pada hari Jumat, 17 Agustus 1945, pukul 10.00 WIB, Ir. Soekarno didampingi Drs. Mohammad Hatta membacakan teks Proklamasi Kemerdekaan Indonesia di Jalan Pegangsaan Timur 56, Jakarta (sekarang Jalan Proklamasi).",
          "\"Kami bangsa Indonesia dengan ini menjatakan kemerdekaan Indonesia. Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan dengan tjara saksama dan dalam tempo jang sesingkat-singkatnja.\"",
          "Setelah pembacaan proklamasi, bendera Merah Putih yang dijahit oleh Ibu Fatmawati dikibarkan diiringi lagu Indonesia Raya. Peristiwa ini menandai lahirnya Republik Indonesia sebagai negara merdeka dan berdaulat.",
          "Upacara proklamasi berlangsung sederhana namun penuh khidmat. Hanya sekitar seribu orang yang hadir, termasuk para pemuda, tokoh pergerakan, dan masyarakat sekitar. Namun, maknanya bergema ke seluruh pelosok Nusantara.",
          "Latifah Iskandar dan Fatmawati, istri Soekarno, menjahit bendera Merah Putih yang dikibarkan pada hari proklamasi. Bendera sederhana ini kemudian menjadi 'Bendera Pusaka' yang disimpan sebagai benda bersejarah nasional.",
          "Soekarno membacakan proklamasi dengan suara yang tegas dan penuh keyakinan. Momen ini diabadikan dalam ingatan kolektif bangsa Indonesia sebagai titik balik sejarah — dari bangsa yang dijajah menjadi bangsa yang merdeka dan berdaulat.",
        ],
      },
      {
        heading: "Penyebaran Berita Kemerdekaan",
        paragraphs: [
          "Berita proklamasi disebarkan ke seluruh Indonesia melalui berbagai cara. Para pemuda mengambil alih kantor-kantor berita dan stasiun radio untuk menyiarkan berita kemerdekaan. Surat selebaran dan telegram dikirimkan ke berbagai daerah.",
          "Di berbagai daerah, rakyat merespons proklamasi dengan penuh semangat. Bendera Merah Putih dikibarkan di mana-mana dan rakyat mulai mengambil alih pemerintahan dari tangan Jepang.",
          "Proses pengambilalihan kekuasaan dari Jepang tidak selalu berjalan mulus. Di beberapa daerah, terjadi bentrokan antara rakyat Indonesia dengan tentara Jepang yang masih bersenjata. Namun, semangat kemerdekaan yang membara mendorong rakyat untuk terus berjuang.",
          "Media cetak memainkan peran penting dalam menyebarkan berita kemerdekaan. Koran-koran seperti Soeara Asia dan Tjahaja segera menerbitkan berita proklamasi, meskipun harus menghadapi sensor dari pihak Jepang.",
          "Di luar negeri, berita proklamasi Indonesia juga mendapat perhatian internasional. Radio-radio di Australia, India, dan negara-negara lain menyiarkan berita tentang kemerdekaan Indonesia, memperkuat legitimasi internasional Republik Indonesia yang baru lahir.",
        ],
      },
      {
        heading: "Mempertahankan Kemerdekaan",
        paragraphs: [
          "Setelah proklamasi, Indonesia harus menghadapi upaya Belanda untuk kembali menjajah melalui agresi militer. Pertempuran 10 November 1945 di Surabaya menjadi bukti semangat juang rakyat Indonesia mempertahankan kemerdekaan.",
          "Pertempuran Surabaya dipicu oleh tewasnya Brigadir Jenderal A.W.S. Mallaby dari pihak Sekutu. Bung Tomo dengan pidato-pidatonya yang berapi-api di Radio Pemberontakan membakar semangat arek-arek Surabaya untuk bertempur mati-matian melawan pasukan Inggris.",
          "Peristiwa 10 November kemudian diperingati sebagai Hari Pahlawan, mengenang keberanian dan pengorbanan rakyat Surabaya yang menjadi inspirasi bagi perjuangan kemerdekaan di seluruh Indonesia.",
          "Agresi Militer Belanda I (1947) dan II (1948) merupakan upaya terakhir Belanda untuk mengembalikan kekuasaannya di Indonesia. Serangan-serangan ini mendapat kecaman keras dari masyarakat internasional, termasuk PBB.",
          "Melalui perjuangan diplomasi dan militer, Indonesia akhirnya memperoleh pengakuan kedaulatan dari Belanda pada tanggal 27 Desember 1949 melalui Konferensi Meja Bundar di Den Haag. Pengakuan ini mengakhiri era kolonialisme Belanda di Indonesia dan mengukuhkan kemerdekaan Indonesia di mata dunia internasional.",
          "Perjuangan mempertahankan kemerdekaan melibatkan seluruh lapisan masyarakat Indonesia — dari tentara profesional hingga rakyat biasa, dari perkotaan hingga pedesaan. Semangat persatuan inilah yang menjadi kekuatan utama Indonesia dalam mempertahankan kemerdekaannya.",
        ],
      },
    ],
    relatedSlugs: ["kebangkitan-nasional", "perlawanan-kolonialisme"],
  },
  {
    slug: "borobudur",
    title: "Candi Borobudur",
    era: "Hindu-Buddha",
    year: "Abad ke-8 – 9 M",
    summary: "Candi Buddha terbesar di dunia yang dibangun oleh Dinasti Syailendra, mahakarya arsitektur Indonesia.",
    content: [
      {
        heading: "Pembangunan Borobudur",
        paragraphs: [
          "Candi Borobudur dibangun pada masa Dinasti Syailendra sekitar abad ke-8 hingga ke-9 Masehi. Terletak di Magelang, Jawa Tengah, Borobudur merupakan candi Buddha terbesar di dunia dan salah satu monumen paling megah yang pernah dibangun manusia.",
          "Pembangunan Borobudur diperkirakan melibatkan puluhan ribu pekerja dan memakan waktu sekitar 75 tahun. Candi ini dibangun tanpa menggunakan perekat, melainkan dengan sistem interlocking (saling mengunci) yang sangat presisi.",
          "Dinasti Syailendra yang menguasai Jawa Tengah pada abad ke-8 dan ke-9 merupakan penganut agama Buddha Mahayana yang taat. Mereka membangun Borobudur sebagai tempat ibadah dan ziarah bagi umat Buddha dari seluruh Asia.",
          "Lokasi pembangunan Borobudur dipilih dengan cermat. Terletak di lembah antara dua gunung berapi kembar (Sundoro dan Sumbing) dan dua sungai (Progo dan Elo), posisi ini dianggap sakral dalam kosmologi Buddha karena menyerupai bentuk mandala.",
          "Diperkirakan lebih dari 2 juta blok batu andesit digunakan untuk membangun Borobudur. Batu-batu ini ditambang dari sungai-sungai di sekitar lokasi dan dibawa ke situs menggunakan tenaga manusia, tanpa bantuan mesin atau hewan penarik.",
        ],
      },
      {
        heading: "Arsitektur dan Struktur",
        paragraphs: [
          "Borobudur berbentuk punden berundak dengan 10 tingkat, terdiri dari 6 tingkat berbentuk bujur sangkar dan 3 tingkat berbentuk lingkaran, ditutup oleh sebuah stupa besar di puncak. Candi ini memiliki 2.672 panel relief dan 504 arca Buddha.",
          "Struktur Borobudur melambangkan kosmologi Buddha. Tiga zona utama melambangkan tiga alam dalam ajaran Buddha: Kamadhatu (alam nafsu) di dasar, Rupadhatu (alam bentuk) di tengah, dan Arupadhatu (alam tanpa bentuk) di puncak.",
          "Di setiap tingkat lingkaran terdapat stupa-stupa berlubang yang masing-masing berisi arca Buddha dalam posisi meditasi. Total terdapat 72 stupa berlubang yang mengelilingi stupa utama di puncak.",
          "Dimensi Borobudur sangat mengesankan: luas dasar 123 x 123 meter, tinggi asli 42 meter (kini 34,5 meter setelah bagian puncak rusak). Jika direntangkan, total jalur peziarah yang mengelilingi candi mencapai sekitar 5 km.",
          "Setiap sisi candi memiliki tangga yang mengarah ke puncak, dengan gerbang-gerbang dan lorong-lorong yang dirancang agar peziarah dapat berjalan searah jarum jam (pradaksina) sambil menyaksikan relief-relief cerita Buddha.",
        ],
      },
      {
        heading: "Relief dan Cerita",
        paragraphs: [
          "Panel-panel relief di Borobudur menceritakan kisah-kisah dari kitab suci Buddha, termasuk Jataka (kisah kehidupan lampau Buddha), Lalitavistara (riwayat hidup Buddha Gautama), dan Gandavyuha (perjalanan spiritual Sudhana).",
          "Jika direntangkan, total panjang panel relief Borobudur mencapai sekitar 5 km, menjadikannya salah satu kumpulan relief terlengkap di dunia. Relief-relief ini juga memberikan gambaran berharga tentang kehidupan masyarakat Jawa kuno.",
          "Relief di bagian kaki candi (Kamadhatu) yang sekarang tertutup menggambarkan hukum karma — perbuatan baik dan buruk serta akibatnya. Relief ini menggambarkan kehidupan sehari-hari masyarakat Jawa kuno dengan sangat detail, termasuk rumah, pakaian, kendaraan, dan kegiatan pertanian.",
          "Relief Lalitavistara di tingkat pertama menceritakan riwayat hidup Pangeran Siddhartha dari kelahiran hingga pencapaian pencerahan menjadi Buddha. Cerita ini digambarkan dalam 120 panel yang sangat detail dan artistik.",
          "Relief Gandavyuha menceritakan perjalanan Sudhana dalam mencari kebijaksanaan tertinggi. Ia mengunjungi 53 guru spiritual yang masing-masing memberikan pelajaran berbeda. Kisah ini melambangkan perjalanan spiritual manusia menuju pencerahan.",
          "Para ahli seni menganggap relief Borobudur sebagai salah satu pencapaian tertinggi seni pahat batu di dunia. Kehalusan detail, proporsi yang tepat, dan ekspresi wajah yang hidup menunjukkan kemahiran luar biasa para pemahatnya.",
        ],
      },
      {
        heading: "Penemuan Kembali dan Pemugaran",
        paragraphs: [
          "Setelah berabad-abad tertutup oleh abu vulkanik dan vegetasi lebat, Borobudur ditemukan kembali pada tahun 1814 oleh Sir Thomas Stamford Raffles, Gubernur Jenderal Hindia Belanda saat itu. Raffles mengirim insinyur Belanda H.C. Cornelius untuk menyelidiki situs tersebut.",
          "Pada awal abad ke-20, pemerintah Hindia Belanda melakukan pemugaran pertama di bawah pimpinan Theodoor van Erp (1907-1911). Pemugaran ini berhasil memulihkan sebagian besar struktur candi, meskipun masalah drainase dan stabilitas tanah belum sepenuhnya teratasi.",
          "Pemugaran besar-besaran dilakukan oleh UNESCO dan pemerintah Indonesia pada tahun 1975-1982 dengan dana sekitar 25 juta dolar AS. Proyek ini melibatkan pembongkaran dan pemasangan ulang jutaan blok batu, serta pemasangan sistem drainase modern.",
          "Pada tahun 1991, Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO. Pengakuan ini menegaskan nilai universal Borobudur sebagai mahakarya kejeniusan manusia dan warisan budaya dunia yang tak ternilai.",
          "Kini, Borobudur menjadi salah satu destinasi wisata terpenting di Indonesia, dikunjungi oleh jutaan wisatawan setiap tahun. Candi ini juga masih menjadi tempat ziarah umat Buddha, terutama saat perayaan Waisak yang dirayakan setiap tahun di puncak candi.",
        ],
      },
      {
        heading: "Signifikansi Budaya dan Spiritual",
        paragraphs: [
          "Borobudur bukan hanya sebuah monumen bersejarah, tetapi juga simbol pencapaian tertinggi peradaban Indonesia kuno. Kemampuan untuk membangun struktur sedemikian megah dan kompleks menunjukkan tingginya peradaban masyarakat Jawa pada abad ke-8 dan ke-9.",
          "Dalam tradisi Buddha, Borobudur melambangkan perjalanan spiritual dari alam keduniawian menuju pencerahan. Peziarah yang berjalan dari dasar candi ke puncak mengalami transformasi spiritual — dari kegelapan nafsu duniawi menuju cahaya kebijaksanaan.",
          "Borobudur juga menjadi bukti toleransi beragama di Jawa kuno. Pada periode yang sama, candi Hindu Prambanan dibangun tidak jauh dari Borobudur, menunjukkan bahwa kedua agama hidup berdampingan secara harmonis di bawah dinasti yang berbeda.",
          "Dalam konteks modern, Borobudur menjadi simbol kebanggaan nasional Indonesia dan ikon budaya yang diakui dunia. Candi ini menjadi bukti bahwa Indonesia memiliki peradaban yang setara dengan peradaban-peradaban besar lainnya di dunia.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kerajaan-majapahit"],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((a) => a.slug === slug);
};

export const getArticlesByEra = (era: string): Article[] => {
  return articles.filter((a) => a.era === era);
};

export const getRelatedArticles = (slugs: string[]): Article[] => {
  return articles.filter((a) => slugs.includes(a.slug));
};
