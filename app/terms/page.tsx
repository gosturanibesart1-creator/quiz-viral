export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Terms of Service</h1>
        <p className="text-white/70">Përditësuar së fundmi: 3 Prill 2026</p>

        <p className="text-white/80 leading-7">
          Duke përdorur Sfida e Miqësisë, ju pranoni këto terma përdorimi.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Përdorimi i platformës</h2>
          <p className="text-white/80 leading-7">
            Platforma përdoret për krijimin dhe shpërndarjen e quiz-eve argëtuese.
            Ndalohet përdorimi për përmbajtje ofenduese, mashtruese, të paligjshme
            ose të dëmshme.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Përmbajtja e përdoruesit</h2>
          <p className="text-white/80 leading-7">
            Përdoruesit janë përgjegjës për pyetjet, përgjigjet dhe çdo përmbajtje
            që krijojnë ose ndajnë përmes platformës.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Disponueshmëria</h2>
          <p className="text-white/80 leading-7">
            Ne përpiqemi ta mbajmë platformën funksionale, por nuk garantojmë
            akses të pandërprerë në çdo kohë.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Kufizimi i përgjegjësisë</h2>
          <p className="text-white/80 leading-7">
            Platforma ofrohet siç është. Ne nuk mbajmë përgjegjësi për humbje,
            ndërprerje apo dëme që mund të vijnë nga përdorimi i saj.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Ndryshime</h2>
          <p className="text-white/80 leading-7">
            Këto terma mund të përditësohen herë pas here. Vazhdimi i përdorimit
            të platformës pas ndryshimeve nënkupton pranimin e tyre.
          </p>
        </section>
      </div>
    </main>
  );
}