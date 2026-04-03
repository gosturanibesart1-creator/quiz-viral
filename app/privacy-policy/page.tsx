export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-white/70">Përditësuar së fundmi: 3 Prill 2026</p>

        <p className="text-white/80 leading-7">
          Sfida e Miqësisë respekton privatësinë e përdoruesve. Kjo faqe shpjegon
          çfarë informacioni mund të mblidhet, si përdoret dhe si mbrohet.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Çfarë të dhënash mbledhim</h2>
          <p className="text-white/80 leading-7">
            Kur përdoruesit krijojnë një quiz, platforma mund të ruajë pyetjet,
            përgjigjet, emrin e quiz-it, rezultatet dhe informacione bazë teknike
            për funksionimin e faqes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Si përdoren të dhënat</h2>
          <p className="text-white/80 leading-7">
            Të dhënat përdoren vetëm për të ofruar funksionalitetin e quiz-it,
            për të ruajtur rezultatet, për të përmirësuar eksperiencën e përdoruesit
            dhe për të mbajtur platformën funksionale dhe të sigurt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Cookies dhe reklamat</h2>
          <p className="text-white/80 leading-7">
            Faqja mund të përdorë cookies ose teknologji të ngjashme për analizë,
            performancë dhe reklama. Shërbime të palëve të treta si Google AdSense
            mund të përdorin cookies për të shfaqur reklama më të përshtatshme.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Shërbime të palëve të treta</h2>
          <p className="text-white/80 leading-7">
            Platforma mund të përdorë shërbime si Firebase për ruajtjen e të dhënave
            dhe autentikim, si dhe shërbime reklamuese ose analitike kur nevojitet.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Siguria</h2>
          <p className="text-white/80 leading-7">
            Ne marrim masa të arsyeshme teknike për të mbrojtur të dhënat e
            përdoruesve, por asnjë sistem online nuk garanton siguri absolute.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p className="text-white/80 leading-7">
            Për pyetje rreth privatësisë, na kontaktoni te{" "}
            <a
              href="mailto:sebihvr5@gmail.com"
              className="underline hover:text-white"
            >
              sebihvr5@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}