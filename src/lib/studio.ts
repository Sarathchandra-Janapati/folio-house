// The person behind this build. Edit these values to change the "Get a site like this" page.
export const STUDIO = {
  name: "Sarath Chandra Janapati",
  short: "Sarath",
  role: "AI engineer and web developer",
  city: "Hyderabad",
  email: "sarathchandra.janapati@gmail.com",
  github: "https://github.com/Sarathchandra-Janapati",
  githubHandle: "Sarathchandra-Janapati",
  // Set prices here when you are ready to publish them. Leave as null to show "Quote on request".
  packages: [
    {
      name: "Designer portfolio",
      for: "One designer or a small studio",
      price: null as string | null,
      includes: [
        "Home, work index and a page per project",
        "About, services and a contact form",
        "Animations and layouts tuned to your work",
        "Hosting set up on your own domain",
      ],
    },
    {
      name: "Studio site with CMS",
      for: "Studios that publish often",
      price: null as string | null,
      includes: [
        "Everything in Designer portfolio",
        "Add projects yourself, no code",
        "Case-study templates with specs and credits",
        "Enquiry inbox and email alerts",
      ],
      featured: true,
    },
    {
      name: "Marketplace like Folio House",
      for: "Collectives, schools and platforms",
      price: null as string | null,
      includes: [
        "Category pages for each discipline",
        "Designer sign-up and profile pages",
        "Search, saved work and brief forms",
        "Admin tools to review new designers",
      ],
    },
  ],
};
