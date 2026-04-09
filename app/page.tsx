export default function Page() {
  return (
    <main style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Resume App Working
        </h1>
        <p style={{ marginTop: "10px", color: "#666" }}>
          Backend + API next
        </p>
      </div>
    </main>
  );
}