function Certifications() {
  return (
    <section className="py-20 px-10 bg-green-100 text-center">
      <h2 className="text-4xl font-bold mb-10 text-green-900">Certifications</h2>
      <div className="flex justify-center gap-12">
        <img src="/assets/ayush.png" alt="AYUSH Certified" className="h-20" />
        <img src="/assets/lab.png" alt="Lab Tested" className="h-20" />
        <img src="/assets/eco.png" alt="Eco Friendly" className="h-20" />
      </div>
      <p className="mt-6 text-lg text-green-700 italic">
        Every batch verified and certified for purity.
      </p>
    </section>
  );
}

export default Certifications;
