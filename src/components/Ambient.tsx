// Fixed background glows and film grain shared by every page.
export function Ambient() {
  return (
    <>
      <div className="aurora" aria-hidden><span /><span /><span /></div>
      <div className="grain" aria-hidden />
    </>
  );
}
