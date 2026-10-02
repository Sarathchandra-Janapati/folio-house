import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap grid min-h-[50vh] content-center gap-4 py-24">
      <p className="label">404</p>
      <h1 className="display-l">This page was never cut.</h1>
      <Link href="/" className="btn btn-primary w-fit">Back to Folio House</Link>
    </div>
  );
}
