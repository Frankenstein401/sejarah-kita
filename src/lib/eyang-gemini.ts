import { GoogleGenerativeAI, type ChatSession, type Tool } from "@google/generative-ai";
import { apiClient } from "@/lib/api-client";

// ─── Helpers ────────────────────────────────────────────────────────────

function getStoredUser(): { role?: string; name?: string } | null {
  try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
}
export function isAdminUser(): boolean {
  return getStoredUser()?.role === "admin";
}

// ─── System Prompt ───────────────────────────────────────────────────────

const BASE_SYSTEM = `Kamu adalah EyangKu, asisten AI bijaksana di website SejarahKita — website edukasi sejarah Indonesia.

Kepribadian:
- Berbicara hangat dan bijak seperti kakek dalam Bahasa Indonesia
- Sapa pengguna dengan "cucuku" sesekali
- Ahli sejarah Indonesia: kerajaan, kolonial, kemerdekaan, modern
- Kalau ditanya sejarah, ceritakan dengan menarik dan detail
- Jangan pernah sebut bahwa kamu Gemini — kamu hanya EyangKu

Batasan:
- Hanya menjawab soal sejarah Indonesia atau website SejarahKita
- Untuk topik lain, arahkan kembali ke sejarah dengan sopan`;

const ADMIN_EXTRA = `

Pengguna saat ini adalah ADMIN website SejarahKita.
Kamu bisa membantu admin mengelola website: lihat komentar, hapus komentar, lihat timeline, hapus event timeline.
Kalau admin minta lihat/hapus sesuatu, gunakan fungsi yang tersedia. Setelah berhasil, konfirmasi dengan ramah.`;

// ─── Tools (function calling) ────────────────────────────────────────────

const ADMIN_TOOLS: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "lihat_komentar",
        description: "Tampilkan daftar komentar di website. Bisa dicari berdasarkan kata kunci.",
        parameters: {
          type: "object" as any,
          properties: {
            search: { type: "string", description: "Kata kunci pencarian (opsional)" },
          },
        },
      },
      {
        name: "hapus_komentar",
        description: "Hapus satu komentar berdasarkan ID-nya.",
        parameters: {
          type: "object" as any,
          properties: {
            id: { type: "string", description: "ID komentar yang akan dihapus" },
          },
          required: ["id"],
        },
      },
      {
        name: "lihat_timeline",
        description: "Tampilkan daftar event sejarah di timeline website.",
        parameters: {
          type: "object" as any,
          properties: {},
        },
      },
      {
        name: "hapus_timeline",
        description: "Hapus satu event timeline berdasarkan ID-nya.",
        parameters: {
          type: "object" as any,
          properties: {
            id: { type: "string", description: "ID event timeline yang akan dihapus" },
          },
          required: ["id"],
        },
      },
      {
        name: "lihat_artikel",
        description: "Tampilkan daftar artikel sejarah yang ada di website.",
        parameters: {
          type: "object" as any,
          properties: {},
        },
      },
    ],
  },
];

// ─── Function Executor ───────────────────────────────────────────────────

async function runFunction(name: string, args: Record<string, any>): Promise<string> {
  try {
    switch (name) {
      case "lihat_komentar": {
        const { data } = await apiClient.get("/admin/discussions", {
          params: args.search ? { search: args.search } : {},
        });
        const list = (data.data ?? []).slice(0, 8);
        if (!list.length) return "Tidak ada komentar" + (args.search ? ` dengan kata kunci "${args.search}"` : "") + ".";
        return list
          .map((c: any, i: number) =>
            `${i + 1}. ID: ${c.id}\n   👤 ${c.user?.name ?? "?"} | 📄 ${c.article?.title ?? "?"}\n   💬 "${c.message?.slice(0, 80)}${c.message?.length > 80 ? "…" : ""}"`
          )
          .join("\n\n");
      }

      case "hapus_komentar": {
        await apiClient.delete(`/admin/discussions/${args.id}`);
        return `Komentar dengan ID ${args.id} berhasil dihapus.`;
      }

      case "lihat_timeline": {
        const { data } = await apiClient.get("/admin/timeline");
        const list = (data.data ?? []).slice(0, 8);
        if (!list.length) return "Belum ada event di timeline.";
        return list
          .map((e: any, i: number) =>
            `${i + 1}. ID: ${e.id}\n   📅 ${e.year} — ${e.title}`
          )
          .join("\n\n");
      }

      case "hapus_timeline": {
        await apiClient.delete(`/admin/timeline/${args.id}`);
        return `Event timeline dengan ID ${args.id} berhasil dihapus.`;
      }

      case "lihat_artikel": {
        const { data } = await apiClient.get("/admin/articles");
        const list = (data.data ?? []).slice(0, 8);
        if (!list.length) return "Belum ada artikel.";
        return list
          .map((a: any, i: number) =>
            `${i + 1}. "${a.title}" (${a.year}) — slug: ${a.slug}`
          )
          .join("\n");
      }

      default:
        return "Fungsi tidak dikenal.";
    }
  } catch (err: any) {
    return `Gagal menjalankan aksi: ${err?.response?.data?.message ?? err?.message ?? "error tidak diketahui"}.`;
  }
}

// ─── Chat Session Manager ────────────────────────────────────────────────

let _session: ChatSession | null = null;
let _sessionIsAdmin = false;

export function resetSession() {
  _session = null;
}

export async function sendToEyang(userText: string): Promise<string> {
  const admin = isAdminUser();

  // Re-init session jika role berubah
  if (!_session || _sessionIsAdmin !== admin) {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: BASE_SYSTEM + (admin ? ADMIN_EXTRA : ""),
      tools: admin ? ADMIN_TOOLS : undefined,
    });
    _session = model.startChat({ history: [] });
    _sessionIsAdmin = admin;
  }

  let result = await _session.sendMessage(userText);
  let response = result.response;

  // Resolve function calls (bisa berantai)
  while (response.functionCalls()?.length) {
    const calls = response.functionCalls()!;
    const functionResponses = await Promise.all(
      calls.map(async (call) => ({
        functionResponse: {
          name: call.name,
          response: { result: await runFunction(call.name, call.args as Record<string, any>) },
        },
      }))
    );

    result = await _session.sendMessage(functionResponses);
    response = result.response;
  }

  return response.text();
}
