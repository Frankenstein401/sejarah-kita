export interface ResponseEntry {
  keywords: string[];
  response: string;
}

export const responses: ResponseEntry[] = [
  {
    keywords: ["halo", "hai", "hey", "hi", "salam", "selamat", "pagi", "siang", "sore", "malam"],
    response:
      "Halo cucuku! Selamat datang. Eyang senang sekali kamu mampir. Mau tanya-tanya soal sejarah Indonesia? Eyang siap bercerita!",
  },
  {
    keywords: ["borobudur", "candi"],
    response:
      "Ah, Borobudur! Candi Buddha terbesar di dunia ini dibangun pada abad ke-8 oleh Dinasti Syailendra, cucuku. Bayangkan, 2 juta blok batu disusun tanpa perekat! Nenek moyang kita memang luar biasa.",
  },
  {
    keywords: ["majapahit", "gajah mada", "hayam wuruk"],
    response:
      "Majapahit, kerajaan terbesar Nusantara! Di bawah Gajah Mada dan Hayam Wuruk, wilayahnya membentang dari Sumatra hingga Papua. Sumpah Palapa menjadi simbol persatuan yang menginspirasi bangsa kita hingga kini, cucuku.",
  },
  {
    keywords: ["sriwijaya", "palembang", "maritim"],
    response:
      "Sriwijaya adalah kerajaan maritim raksasa yang berpusat di Palembang, cucuku. Selama hampir 600 tahun, mereka menguasai Selat Malaka dan menjadi pusat pembelajaran agama Buddha terbesar di Asia Tenggara. Hebat, bukan?",
  },
  {
    keywords: ["proklamasi", "merdeka", "kemerdekaan", "1945", "soekarno", "sukarno", "hatta"],
    response:
      "17 Agustus 1945, cucuku — hari yang mengubah segalanya. Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia. Teks proklamasinya hanya dua kalimat, tapi maknanya menggetarkan dunia. Jangan pernah lupakan perjuangan para pahlawan kita.",
  },
  {
    keywords: ["wayang", "dalang", "kulit"],
    response:
      "Wayang kulit adalah warisan budaya tak benda UNESCO dari Indonesia, cucuku! Sang dalang bisa memainkan pertunjukan semalam suntuk, menghidupkan cerita Ramayana dan Mahabharata. Eyang dulu sering nonton di kampung, indah sekali.",
  },
  {
    keywords: ["batik", "kain", "motif"],
    response:
      "Batik adalah jiwa budaya Jawa, cucuku. Setiap motif punya makna mendalam — dari parang yang melambangkan kekuatan, hingga kawung yang bermakna kesucian. Tahun 2009, UNESCO mengakui batik sebagai Warisan Budaya Tak Benda Indonesia.",
  },
  {
    keywords: ["website", "sejarahkita", "situs", "platform"],
    response:
      "SejarahKita dibuat untuk menghidupkan kembali cerita-cerita sejarah Indonesia secara digital, cucuku. Dengan timeline interaktif, peta, dan artikel mendalam — supaya generasi muda sepertimu bisa belajar sejarah dengan cara yang menyenangkan!",
  },
  {
    keywords: ["siapa", "kamu", "eyang", "nama"],
    response:
      "Eyang namanya EyangKu! Eyang di sini untuk menemani cucuku menjelajahi sejarah Indonesia. Anggap saja Eyang ini nenek/kakek bijak yang suka bercerita tentang masa lalu bangsa kita.",
  },
  {
    keywords: ["terima kasih", "makasih", "thanks", "trims"],
    response:
      "Sama-sama, cucuku! Eyang senang bisa membantu. Kalau ada yang ingin ditanyakan lagi, jangan sungkan ya. Sejarah itu menarik kalau kita mau mendalaminya!",
  },
];

const fallbackResponses: string[] = [
  "Hmm, Eyang belum begitu paham pertanyaanmu, cucuku. Coba tanyakan tentang kerajaan Nusantara, Borobudur, Proklamasi, wayang, atau batik!",
  "Maaf ya cucuku, Eyang kurang mengerti. Tapi coba tanyakan tentang sejarah Indonesia — Sriwijaya, Majapahit, atau kemerdekaan misalnya!",
  "Eyang masih belajar nih, cucuku! Coba tanya tentang topik sejarah Indonesia yang spesifik ya. Eyang paling suka cerita soal kerajaan-kerajaan Nusantara!",
];

export function matchResponse(input: string): string {
  const normalized = input.toLowerCase().trim();

  for (const entry of responses) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return entry.response;
    }
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
