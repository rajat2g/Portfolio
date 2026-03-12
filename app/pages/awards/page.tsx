export default function AwardsPage() {
  return (
    <div style={{ marginTop: "2vh" }}>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">Awards and Honors</h1>

      <p className="mb-8 text-neutral-700">Recognition for contributions to geotechnical engineering, tunneling, and underground construction.</p>

      <h2 className="text-xl font-bold mb-4">Awards</h2>

      <ul>
        <li className="mb-6">
          <a href="https://www.enr.com/blogs/13-critical-path/post/62244-industry-judges-select-enr-2026-national-top-20-under-40" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline">ENR National Top 20 Under 40</a>
          <p className="text-sm text-neutral-500">2026</p>
          <p className="text-sm text-neutral-600">Awarded by: Engineering News-Record (ENR)</p>
          <p className="text-neutral-800">Selected by a national panel of industry judges from over 420 entries across all five ENR regions, recognizing technical excellence, digital innovation, and leadership in advancing underground construction practices.</p>
        </li>

        <li className="mb-6">
          <a href="https://www.enr.com/articles/62571-enr-wests-2025-top-young-professionals" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline">ENR West Top Young Professionals</a>
          <p className="text-sm text-neutral-500">2026</p>
          <p className="text-sm text-neutral-600">Awarded by: Engineering News-Record (ENR) West</p>
          <p className="text-neutral-800">Named among 30 up-and-coming AEC industry leaders from California, Washington, Oregon, Hawaii, and Alaska. Regional winners were automatically entered into the National Top 20 Under 40 contest.</p>
        </li>
      </ul>
    </div>
  );
}
