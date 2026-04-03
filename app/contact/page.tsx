export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Contact</h1>

        <p className="text-white/80 leading-7">
          Për pyetje, sugjerime ose raportim problemesh, mund të na kontaktoni te:
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-lg font-semibold">Email</p>
          <a
            href="mailto:sebihvr5@gmail.com"
            className="text-white/80 underline hover:text-white"
          >
            sebihvr5@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}