export function Footer() {
  const version: string = "0.1";
  const license: string = "GPL 3.0";

  return (
    <footer>
      <div className="landing-info wrap">
        <span>v{version}<b>·</b>{license}</span>
      </div>
    </footer>
  );
}
