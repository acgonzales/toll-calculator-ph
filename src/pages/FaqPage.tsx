export default function FaqPage() {
  const faqItems = [
    {
      question: 'How does it work?',
      answer:
        'Our toll calculator uses <a class="text-primary" href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer">Mapbox</a> to provide location search and route directions. When you select your entry and exit points, the system analyzes the route against our <a class="text-primary" href="https://geojson.io/#id=github:acgonzales/toll-calculator-ph/blob/main/public/toll-gates.geojson" target="_blank" rel="noopener noreferrer">toll gate database (geojson)</a> to detect where your journey crosses toll gates. The system then calculates the total toll fees based on your vehicle class and the current rates for each toll gate.',
    },
    {
      question: 'Is this free?',
      answer:
        'Yes, our toll calculator is completely free to use and the project is open source on <a class="text-primary" href="https://www.github.com/acgonzales/toll-calculator-ph" target="_blank" rel="noopener noreferrer">GitHub</a>. While we aim to keep it free forever, we welcome donations to help cover our Mapbox API costs, which are essential for providing accurate route calculations.',
    },
    {
      question: 'How can I report incorrect toll rates or gate locations?',
      answer:
        'If you notice any discrepancies with toll prices or gate placements, please <a class="text-primary" href="https://github.com/acgonzales/toll-calculator-ph/issues" target="_blank" rel="noopener noreferrer">open a GitHub issue</a> or contact me at my <a class="text-primary" href="mailto:aaroncgonzales.dev@gmail.com">email</a>. We appreciate your help in keeping our data accurate!',
    },
    {
      question: 'How do I contribute?',
      answer:
        'We welcome contributions from the community! You can help by: <ul class="list-disc pl-4 mt-2"><li>Mapping toll gates through our <a class="text-primary" href="https://github.com/acgonzales/toll-calculator-ph/blob/main/public/toll-gates.geojson" target="_blank" rel="noopener noreferrer">GeoJSON database</a></li><li>Creating a <a class="text-primary" href="https://github.com/acgonzales/toll-calculator-ph/pulls" target="_blank" rel="noopener noreferrer">pull request</a> for code improvements</li><li>Reporting issues or suggesting features through <a class="text-primary" href="https://github.com/acgonzales/toll-calculator-ph/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a></li></ul>For direct communication, you can reach out via <a class="text-primary" href="mailto:aaroncgonzales.dev@gmail.com">email</a>.',
    },
    {
      question: 'How can I support this project?',
      answer:
        'If you find this tool helpful, you can support the project in several ways: <ul class="list-disc pl-4 mt-2"><li>Buy me a coffee through <a class="text-primary" href="https://buymeacoffee.com/acgonzales" target="_blank" rel="noopener noreferrer">buymeacoffee</a></li><li>Contact me directly at my <a class="text-primary" href="mailto:aaroncgonzales.dev@gmail.com">email address</a> for more options.</li></ul>Your support helps cover API costs and enables continuous improvements to the calculator. Thank you! 🙏',
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="collapse-plus rounded-box border-base-content/5 bg-base-100 collapse border"
        >
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-md font-medium">{item.question}</div>
          <div className="collapse-content">
            <p className="text-base-content/70" dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </div>
      ))}
    </div>
  );
}
