import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { colors } from "../theme";
import { AppShell } from "../components/AppShell";

export const ComparisonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Documents appear (0-1s)
  const docOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Analyzing state (1-4s)
  const analyzingStart = Math.round(1 * fps);
  const analyzingEnd = Math.round(4 * fps);
  const isAnalyzing = frame >= analyzingStart && frame < analyzingEnd;

  // Spinner rotation
  const spinnerRotation = interpolate(
    frame,
    [analyzingStart, analyzingEnd],
    [0, 1080],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Phase 3: Analysis panel slides in (4-5s)
  const panelSlideStart = analyzingEnd;
  const panelWidth = 340;
  const panelX = interpolate(
    frame,
    [panelSlideStart, panelSlideStart + 0.5 * fps],
    [panelWidth, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );
  const panelVisible = frame >= panelSlideStart;

  // Phase 4: Results populate (5-8s)
  const resultsStart = panelSlideStart + Math.round(0.6 * fps);

  // Count-up for compliant
  const compliantCount = Math.round(
    interpolate(
      frame,
      [resultsStart, resultsStart + 1 * fps],
      [0, 27],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // Count-up for non-compliant
  const ncCount = Math.round(
    interpolate(
      frame,
      [resultsStart + 0.2 * fps, resultsStart + 0.8 * fps],
      [0, 3],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // Count-up for advisory
  const advisoryCount = Math.round(
    interpolate(
      frame,
      [resultsStart + 0.3 * fps, resultsStart + 1 * fps],
      [0, 6],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // Phase 5: Exception items appear (staggered)
  const exceptionsStart = resultsStart + Math.round(1.2 * fps);

  // Document highlights appear after analysis
  const highlightsOpacity = interpolate(
    frame,
    [panelSlideStart + 0.3 * fps, panelSlideStart + 0.8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Status badges on COI column
  const statusBadgesOpacity = interpolate(
    frame,
    [panelSlideStart, panelSlideStart + 0.4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rightContent = (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {panelVisible && (
        <div
          style={{
            height: 32,
            padding: "0 12px",
            border: `1px solid ${colors.border.strong}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "white",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.secondary}
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: colors.text.primary }}>
            Analysis Panel
          </span>
        </div>
      )}
      {isAnalyzing ? (
        <div
          style={{
            height: 32,
            padding: "0 14px",
            backgroundColor: colors.accent.blue,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            style={{ transform: `rotate(${spinnerRotation}deg)` }}
          >
            <circle cx="12" cy="12" r="10" opacity="0.3" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
            Analyzing...
          </span>
        </div>
      ) : !panelVisible ? (
        <div
          style={{
            height: 32,
            padding: "0 14px",
            backgroundColor: colors.accent.blue,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: "white" }}>
            Analyze
          </span>
        </div>
      ) : null}
    </div>
  );

  return (
    <AbsoluteFill>
      <AppShell
        breadcrumbs={["New Comparison", "Document Comparison"]}
        rightContent={rightContent}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            opacity: docOpacity,
          }}
        >
          {/* Left Document Panel - Comparison Documents */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: `1px solid ${colors.border.default}`,
            }}
          >
            <DocPanelHeader label="Comparison Documents" />
            <div
              style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                padding: 16,
                overflow: "hidden",
              }}
            >
              <DocumentMock side="comparison" hlOpacity={highlightsOpacity} />
            </div>
          </div>

          {/* Right Document Panel - COI Documents */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: panelVisible
                ? `1px solid ${colors.border.default}`
                : "none",
            }}
          >
            <DocPanelHeader
              label="COI Documents"
              statusBadges={
                panelVisible
                  ? [
                      {
                        text: `${ncCount} non-compliant`,
                        color: colors.status.noncompliant,
                        opacity: statusBadgesOpacity,
                      },
                      {
                        text: `${advisoryCount} advisories`,
                        color: colors.status.advisory,
                        opacity: statusBadgesOpacity,
                      },
                    ]
                  : undefined
              }
            />
            <div
              style={{
                flex: 1,
                backgroundColor: "#F8F9FA",
                padding: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <DocumentMock side="coi" hlOpacity={highlightsOpacity} />
            </div>
          </div>

          {/* Analysis Panel */}
          {panelVisible && (
            <div
              style={{
                width: panelWidth,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: colors.bg.card,
                transform: `translateX(${panelX}px)`,
                overflow: "hidden",
              }}
            >
              <AnalysisPanel
                frame={frame}
                fps={fps}
                resultsStart={resultsStart}
                exceptionsStart={exceptionsStart}
                compliantCount={compliantCount}
                ncCount={ncCount}
                advisoryCount={advisoryCount}
              />
            </div>
          )}
        </div>
      </AppShell>
    </AbsoluteFill>
  );
};

// Document panel header with zoom controls
const DocPanelHeader: React.FC<{
  label: string;
  statusBadges?: Array<{
    text: string;
    color: string;
    opacity: number;
  }>;
}> = ({ label, statusBadges }) => (
  <div
    style={{
      height: 40,
      padding: "0 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${colors.border.default}`,
      flexShrink: 0,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{ fontSize: 13, fontWeight: 500, color: colors.text.primary }}
      >
        {label}
      </span>
      {statusBadges?.map((badge, i) => (
        <span
          key={i}
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: badge.color,
            opacity: badge.opacity,
          }}
        >
          {badge.text}
        </span>
      ))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.text.tertiary}
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <span
        style={{
          fontSize: 12,
          color: colors.text.secondary,
          margin: "0 4px",
        }}
      >
        100%
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.text.tertiary}
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="11" y1="8" x2="11" y2="14" />
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={colors.text.tertiary}
        strokeWidth="2"
        style={{ marginLeft: 4 }}
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
      </svg>
    </div>
  </div>
);

// Realistic CSIO Certificate of Liability Insurance - full document
const DocumentMock: React.FC<{ side: "comparison" | "coi"; hlOpacity?: number }> = ({ side, hlOpacity = 0 }) => {
  const isApproved = side === "comparison";
  const effDate = isApproved ? "2024/08/25" : "2025/08/25";
  const expDate = isApproved ? "2025/08/25" : "2026/08/25";
  const eachOccDed = isApproved ? "2,500" : "10,000";
  const tenantsDed = isApproved ? "2,500" : "10,000";
  const certDate = isApproved ? "2025/04/29" : "2025/08/19";

  // Highlight colors (both sides)
  const GREEN = "34, 197, 94";
  const RED = "239, 68, 68";
  const AMBER = "245, 158, 11";
  const PURPLE = "147, 51, 234";
  const hl = hlOpacity;
  const serialMap: Record<string, string> = isApproved
    ? {
        "3F7KT2B91MN638471": PURPLE,
        "3F7KT2B91MN638473": PURPLE,
        "3F7KT2B91MN638477": PURPLE,
        "ZBK10291": RED,
        "1NKZL70X9PJ435892": RED,
      }
    : {
        "3F7KT2B91MN638472": AMBER,
        "3F7KT2B91MN638474": AMBER,
        "3F7KT2B91MN638478": AMBER,
        "ZBK10291": RED,
        "1NKZL70X9PJ435892": RED,
      };
  const shl = (s: string) => hl > 0 ? (serialMap[s] || GREEN) : undefined;
  const hlBg = (rgb: string): React.CSSProperties => hl > 0 ? {
    backgroundColor: `rgba(${rgb}, ${0.18 * hl})`,
    outline: `1.5px solid rgba(${rgb}, ${0.5 * hl})`,
    borderRadius: 1,
    padding: "0 1px",
  } : {};

  const f = 6.5;
  const bdr = "1px solid #1a1a1a";
  const bdrLight = "1px solid #555";
  const bdrMed = "1px solid #999";
  const cellPad = "2px 4px";

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 2,
        border: "1px solid #ccc",
        padding: "10px 10px 6px",
        height: "100%",
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#1a1a1a",
        lineHeight: 1.35,
      }}
    >
      {/* Header row: CSIO logo + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 4,
          gap: 12,
        }}
      >
        <span style={{ fontSize: f + 4, fontWeight: 700, letterSpacing: 1 }}>
          CSIO
        </span>
        <span
          style={{
            fontSize: f + 3,
            fontWeight: 700,
            flex: 1,
            textAlign: "center",
          }}
        >
          CERTIFICATE OF LIABILITY INSURANCE
        </span>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          border: bdr,
          padding: "3px 5px",
          fontSize: f - 1,
          textAlign: "center",
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        This certificate is issued as a matter of information only and confers
        no rights upon the certificate holder and imposes no liability on the
        insurer. This certificate does not amend, extend or alter the coverage
        afforded by the policies below.
      </div>

      {/* Sections 1 & 2 side by side */}
      <div style={{ display: "flex", marginBottom: 3 }}>
        <div style={{ flex: 1, borderRight: bdr }}>
          <SectionHeader num="1" text="CERTIFICATE HOLDER - NAME AND MAILING ADDRESS" f={f} />
          <div style={{ padding: "3px 5px", fontSize: f }}>
            <div style={{ fontWeight: 500 }}>Test Company Equipment Finance</div>
            {isApproved ? (
              <div style={hl > 0 ? hlBg(RED) : {}}>
                <div>5678 Industrial Blvd, Suite 200</div>
                <div style={{ height: 3 }} />
                <div style={{ display: "flex", gap: 16 }}>
                  <span>Vancouver</span>
                  <span>BC</span>
                  <span style={{ fontSize: f - 1 }}>
                    <span style={{ fontSize: f - 2, verticalAlign: "super" }}>POSTAL</span> V6B 1A1
                  </span>
                </div>
              </div>
            ) : (
              <div style={hl > 0 ? hlBg(RED) : {}}>
                <div>1234 Main st.</div>
                <div style={{ height: 3 }} />
                <div style={{ display: "flex", gap: 16 }}>
                  <span>Prince George</span>
                  <span>BC</span>
                  <span style={{ fontSize: f - 1 }}>
                    <span style={{ fontSize: f - 2, verticalAlign: "super" }}>POSTAL</span> ABC 123
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <SectionHeader num="2" text="INSURED'S FULL NAME AND MAILING ADDRESS" f={f} />
          <div style={{ padding: "3px 5px", fontSize: f }}>
            <div style={{ fontWeight: 500 }}>Ricky Bobby Construction Ltd.</div>
            <div style={{ height: 3 }} />
            <div>1234 Ricky Avenue</div>
            <div style={{ display: "flex", gap: 16 }}>
              <span>Bobby Town</span>
              <span>AB</span>
              <span style={{ fontSize: f - 1 }}>
                <span style={{ fontSize: f - 2, verticalAlign: "super" }}>POSTAL</span> R1K B8Y
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div style={{ marginBottom: 2 }}>
        <SectionHeader
          num="3"
          text="DESCRIPTION OF OPERATIONS/LOCATIONS/AUTOMOBILES/SPECIAL ITEMS TO WHICH THIS CERTIFICATE APPLIES"
          f={f}
          small
        />
        <div style={{ padding: "2px 5px", fontSize: f }}>
          Construction of commercial sites. Hauling materials back and forth from sites.
        </div>
        <div style={{ padding: "1px 5px", fontSize: f, color: "#555" }}>See Attached...</div>
      </div>

      {/* Section 4 - Coverages */}
      <div style={{ marginBottom: 2 }}>
        <SectionHeader num="4" text="COVERAGES" f={f} />
        <div style={{ fontSize: f - 1.5, marginBottom: 2, padding: "0 2px", lineHeight: 1.25 }}>
          This is to certify that the policies of insurance listed below have been issued to the
          insured named above for the policy period indicated notwithstanding any requirements, terms
          or conditions of any contract.
        </div>

        {/* Coverage Table */}
        <div style={{ display: "flex", fontSize: f - 1 }}>
          {/* Left: Type of Insurance */}
          <div style={{ flex: 1, borderRight: bdr, borderTop: bdr }}>
            <div
              style={{
                display: "flex",
                borderBottom: bdr,
                fontWeight: 700,
                fontSize: f - 1.5,
                textAlign: "center",
              }}
            >
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight }}>TYPE OF INSURANCE</div>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight }}>
                INSURANCE COMPANY<br />AND POLICY NUMBER
              </div>
              <div style={{ flex: 1, padding: cellPad, borderRight: bdrLight }}>EFFECTIVE<br />DATE</div>
              <div style={{ flex: 1, padding: cellPad }}>EXPIRY<br />DATE</div>
            </div>

            {/* CGL */}
            <div style={{ display: "flex", borderBottom: bdrLight, minHeight: 36 }}>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontWeight: 600, fontSize: f - 1 }}>
                COMMERCIAL GENERAL LIABILITY
                <div style={{ fontSize: f - 2, fontWeight: 400, marginTop: 1 }}>
                  <div>☐ CLAIMS MADE &nbsp; OR &nbsp; ☒ OCCURRENCE</div>
                  <div>☒ PRODUCTS AND / OR COMPLETED OPS</div>
                  <div>☒ EMPLOYER'S LIABILITY</div>
                  <div>☒ CROSS LIABILITY</div>
                  <div style={{ height: 2 }} />
                  <div>☐ WAIVER OF SUBROGATION</div>
                  <div style={{ height: 2 }} />
                  <div>☒ TENANTS LEGAL LIABILITY</div>
                  <div>☒ POLLUTION LIABILITY EXTENSION</div>
                  <div>☒ Hook Liability</div>
                  <div>☒ Fire Fighting</div>
                </div>
              </div>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>
                Jean Girard Insurance Company<br />{hl > 0 ? <span style={hlBg(GREEN)}>12345678</span> : "12345678"}
              </div>
              <div style={{ flex: 1, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>{effDate}</div>
              <div style={{ flex: 1, padding: cellPad, fontSize: f - 1 }}>{hl > 0 ? <span style={hlBg(GREEN)}>{expDate}</span> : expDate}</div>
            </div>

            {/* Non-owned / Hired */}
            <div style={{ display: "flex", borderBottom: bdrLight, minHeight: 12 }}>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontSize: f - 2 }}>
                ☒ NON-OWNED AUTOMOBILES<br />☒ HIRED AUTOMOBILES
              </div>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>
                Jean Girard Insurance Company<br />{hl > 0 ? <span style={hlBg(GREEN)}>12345678</span> : "12345678"}
              </div>
              <div style={{ flex: 1, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>{effDate}</div>
              <div style={{ flex: 1, padding: cellPad, fontSize: f - 1 }}>{hl > 0 ? <span style={hlBg(GREEN)}>{expDate}</span> : expDate}</div>
            </div>

            {/* Automobile */}
            <div style={{ display: "flex", borderBottom: bdrLight, minHeight: 28 }}>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontWeight: 600, fontSize: f - 1 }}>
                AUTOMOBILE LIABILITY
                <div style={{ fontSize: f - 2, fontWeight: 400, marginTop: 1 }}>
                  <div>☐ DESCRIBED AUTOMOBILES</div>
                  <div>☒ ALL OWNED AUTOMOBILES</div>
                  <div>☒ LEASED AUTOMOBILES **</div>
                  <div style={{ fontSize: f - 2.5, marginTop: 1 }}>
                    ** ALL AUTOMOBILES LEASED IN EXCESS OF 30 DAYS WHERE THE INSURED IS REQUIRED TO PROVIDE INSURANCE
                  </div>
                </div>
              </div>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>
                B&H Insurance Company of Canada<br />{hl > 0 ? <span style={hlBg(GREEN)}>AUT0482079</span> : "AUT0482079"}
              </div>
              <div style={{ flex: 1, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>{effDate}</div>
              <div style={{ flex: 1, padding: cellPad, fontSize: f - 1 }}>{hl > 0 ? <span style={hlBg(GREEN)}>{expDate}</span> : expDate}</div>
            </div>

            {/* Excess */}
            <div style={{ display: "flex", minHeight: 16 }}>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontWeight: 600, fontSize: f - 1 }}>
                EXCESS LIABILITY
                <div style={{ fontSize: f - 2, fontWeight: 400, marginTop: 1 }}>☒ UMBRELLA FORM</div>
              </div>
              <div style={{ flex: 2, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>
                B&H Underwriters<br />{hl > 0 ? <span style={hlBg(GREEN)}>BHU1017547</span> : "BHU1017547"}
              </div>
              <div style={{ flex: 1, padding: cellPad, borderRight: bdrLight, fontSize: f - 1 }}>{effDate}</div>
              <div style={{ flex: 1, padding: cellPad, fontSize: f - 1 }}>{hl > 0 ? <span style={hlBg(GREEN)}>{expDate}</span> : expDate}</div>
            </div>
          </div>

          {/* Right: Limits */}
          <div style={{ flex: 1, borderTop: bdr }}>
            <div style={{ borderBottom: bdr, fontWeight: 700, fontSize: f - 1.5, textAlign: "center", padding: cellPad }}>
              LIMITS OF LIABILITY<br />
              <span style={{ fontSize: f - 2, fontWeight: 400 }}>(Canadian dollars unless indicated otherwise)</span>
            </div>
            <div style={{ display: "flex", borderBottom: bdrLight, fontWeight: 700, fontSize: f - 2, textAlign: "center" }}>
              <div style={{ flex: 3, padding: "1px 2px", borderRight: bdrLight }}>COVERAGE</div>
              <div style={{ flex: 1, padding: "1px 2px", borderRight: bdrLight }}>DED.</div>
              <div style={{ flex: 1.5, padding: "1px 2px" }}>AMOUNT OF<br />INSURANCE</div>
            </div>
            <LR label="COMMERCIAL GENERAL LIABILITY" bold />
            <LR label="BODILY INJURY AND PROPERTY DAMAGE" />
            <LR label="  LIABILITY - GENERAL AGGREGATE" amount="5,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="  - EACH OCCURRENCE" ded={eachOccDed} amount="2,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="PRODUCTS AND COMPLETED OPERATIONS AGGREGATE" amount="2,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="  ☐ PERSONAL INJURY LIABILITY" />
            <LR label="  OR" />
            <LR label="  ☒ PERSONAL AND ADVERTISING INJURY LIABILITY" amount="2,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="MEDICAL PAYMENTS" amount="25,000" />
            <LR label="TENANTS LEGAL LIABILITY" ded={tenantsDed} amount="500,000" amountHL={GREEN} hlO={hl} />
            <LR label="POLLUTION LIABILITY EXTENSION" ded="25,000" amount="2,000,000" />
            <LR label="Hook Liability" ded="2,500" amount="100,000" />
            <LR label="Forest Fire Expense" ded="25,000" amount="2,000,000" />
            <LR label="NON-OWNED AUTOMOBILES" amount="2,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="HIRED AUTOMOBILES" ded="2,500" amount="2,000,000" />
            <LR label="BODILY INJURY AND PROPERTY DAMAGE COMBINED" amount="2,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="BODILY INJURY  (PER PERSON)" />
            <LR label="BODILY INJURY  (PER ACCIDENT)" />
            <LR label="PROPERTY DAMAGE" />
            <LR label="EACH OCCURRENCE" amount="8,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="AGGREGATE" amount="8,000,000" amountHL={GREEN} hlO={hl} />
            <LR label="SIR" ded="10,000" />
          </div>
        </div>
      </div>

      {/* Section 5 - Cancellation */}
      <div style={{ marginBottom: 2 }}>
        <SectionHeader num="5" text="CANCELLATION" f={f} />
        <div style={{ fontSize: f - 1.5, padding: "2px 5px", lineHeight: 1.25 }}>
          Should any of the above described policies be cancelled before the expiration date thereof,
          the issuing company will endeavor to mail <span style={{ textDecoration: "underline" }}>15</span> days written notice to the certificate holder named above.
        </div>
      </div>

      {/* Sections 6 & 7 side by side */}
      <div style={{ display: "flex", marginBottom: 2 }}>
        <div style={{ flex: 1, borderRight: bdr }}>
          <SectionHeader num="6" text="BROKERAGE/AGENCY FULL NAME AND MAILING ADDRESS" f={f} />
          <div style={{ padding: "2px 5px", fontSize: f - 0.5 }}>
            <div style={{ fontWeight: 500 }}>Dale & Brennan Insurance Ltd.</div>
            <div>Suite 123, 12345 Main st.</div>
            <div style={{ display: "flex", gap: 16 }}>
              <span>Calgary</span><span>AB</span>
              <span style={{ fontSize: f - 1 }}>
                <span style={{ fontSize: f - 2, verticalAlign: "super" }}>POSTAL</span> D4LB4N
              </span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <SectionHeader num="7" text="ADDITIONAL INSURED NAME AND MAILING ADDRESS" f={f} />
          <div style={{ padding: "2px 5px", fontSize: f - 1.5, color: "#555" }}>
            (Commercial General Liability - but only with respect to the operations of the Named Insured)
          </div>
        </div>
      </div>

      {/* Section 8 - Certificate Authorization */}
      <div style={{ marginBottom: 4 }}>
        <SectionHeader num="8" text="CERTIFICATE AUTHORIZATION" f={f} />
        <div style={{ padding: "2px 5px", fontSize: f - 0.5, display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: f - 1, color: "#555" }}>ISSUER Dale & Brennan Insurance Ltd.</div>
            <div style={{ fontSize: f - 1, color: "#555", marginTop: 2 }}>
              AUTHORIZED REPRESENTATIVE Ron Burgundy, Managing Partner
            </div>
            <div style={{ marginTop: 2, fontStyle: "italic", fontSize: f - 0.5 }}>
              SIGNATURE OF AUTHORIZED REPRESENTATIVE &nbsp;&nbsp;
              <span style={{ fontFamily: "cursive", fontSize: f + 1 }}>RB</span>
            </div>
          </div>
          <div style={{ fontSize: f - 1, textAlign: "right", color: "#555" }}>
            <div>TYPE Phone &nbsp; NO. 123-456-7890</div>
            <div>TYPE Fax &nbsp;&nbsp;&nbsp; NO. 098-765-4321</div>
            <div style={{ marginTop: 3 }}>DATE {certDate}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: f - 2, color: "#888", borderTop: bdrMed, paddingTop: 2 }}>
        <span>CSIO - Certificate of Liability Insurance CA301e 201609</span>
        <span>&copy;2016, Centre for Study of Insurance Operations. All rights reserved.</span>
      </div>

      {/* ============ PAGE 2: DESCRIPTIONS CONTINUED ============ */}
      <div style={{ borderTop: "2px solid #ccc", marginTop: 8, paddingTop: 6 }}>
        <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: f + 1,
            borderBottom: bdr,
            paddingBottom: 3,
            marginBottom: 6,
            textDecoration: "underline",
          }}
        >
          DESCRIPTIONS Continued.
        </div>

        <div style={{ border: bdr, padding: "6px 8px", fontSize: f - 0.5, lineHeight: 1.5 }}>
          {/* CGL endorsements */}
          <div style={{ fontWeight: 600, marginBottom: 2 }}>With respect to Commercial General Liability:</div>
          <div style={{ marginBottom: 6 }}>
            Blanket Contractual Liability, Broad Form Property Damage, Severability of Interest & Cross Liability Included.
            <br />
            Employers Liability with a $2,000,000 limit of coverage and Subject to a $2,500 deductible Included.
          </div>

          <div style={{ fontWeight: 600, marginBottom: 2 }}>With respect to Umbrella Liability:</div>
          <div style={{ marginBottom: 6 }}>
            Does not extend to cover over the Pollution Liability Coverage.
          </div>

          {/* Equipment schedule - the dense part */}
          <div style={{ fontWeight: 600, marginBottom: 2 }}>With respect to Commercial Auto:</div>
          <div style={{ marginBottom: 4 }}>
            Certificate Holder is added as a Lienholder/Loss Payee/Lessor with respect to the below unit:
          </div>

          {/* Equipment Group 1: Mack Trucks */}
          <EquipLine
            text="2025 Mack GR64F DUMP TRUCK C/W SK1000 15 FT GRAVEL BOX SN 2500815"
            serial="4K7JP9LD2XN638472"
            value="$299,679.00"
            serialHL={shl("4K7JP9LD2XN638472")} hlO={hl}
          />
          <EquipLine
            text="2025 Mack GR64F DUMP TRUCK C/W SK1000 15FT GRAVEL BOX SN 2500816"
            serial="4K7JP9LD2XN638472"
            value="$299,679.00"
            serialHL={shl("4K7JP9LD2XN638472")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $7,500 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 2: Decap Tridem Clam Dumps */}
          <EquipLine
            text="2021 Decap Tridem 44' Clam Dump s/n"
            serial={isApproved ? "3F7KT2B91MN638471" : "3F7KT2B91MN638472"}
            value="$60,942"
            serialHL={shl(isApproved ? "3F7KT2B91MN638471" : "3F7KT2B91MN638472")} hlO={hl}
          />
          <EquipLine
            text="2021 Decap Tridem 44' Clam Dump s/n"
            serial={isApproved ? "3F7KT2B91MN638473" : "3F7KT2B91MN638474"}
            value="$60,942"
            serialHL={shl(isApproved ? "3F7KT2B91MN638473" : "3F7KT2B91MN638474")} hlO={hl}
          />
          <EquipLine
            text="2021 Decap Tridem 44' Clam Dump s/n"
            serial={isApproved ? "3F7KT2B91MN638477" : "3F7KT2B91MN638478"}
            value="$60,942"
            serialHL={shl(isApproved ? "3F7KT2B91MN638477" : "3F7KT2B91MN638478")} hlO={hl}
          />

          {/* Equipment Group 3: Midland Trailers */}
          <EquipLine
            text="2024 MIDLAND SK8100 PONY PUP TUB STYLE TRI AXLE TRAILER"
            serial="7N2WD6K18HR873521"
            value="$77,368.00"
            serialHL={shl("7N2WD6K18HR873521")} hlO={hl}
          />
          <EquipLine
            text="2024 MIDLAND SK8100 PONY PUP TUB STYLE TRI AXLE TRAILER"
            serial="7N2WD6K18HR873522"
            value="$77,368.00"
            serialHL={shl("7N2WD6K18HR873522")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $2,500 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 4: CAT Excavators */}
          <EquipLine
            text="2023 CAT 320 GC HYDRAULIC EXCAVATOR"
            serial="ZBK10284"
            value="$385,500.00"
            serialHL={shl("ZBK10284")} hlO={hl}
          />
          <EquipLine
            text="2023 CAT 320 GC HYDRAULIC EXCAVATOR"
            serial="ZBK10291"
            value={isApproved ? "$385,500.00" : "$395,500.00"}
            serialHL={shl("ZBK10291")}
            valueHL={hl > 0 ? RED : undefined}
            hlO={hl}
          />
          <EquipLine
            text="2022 CAT 950 GC WHEEL LOADER"
            serial="J5T02814"
            value="$412,250.00"
            serialHL={shl("J5T02814")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $10,000 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 5: Kenworth trucks */}
          <EquipLine
            text="2024 KENWORTH T880 TRI-DRIVE DUMP TRUCK"
            serial="1NKZL70X5RJ438216"
            value="$265,400.00"
            serialHL={shl("1NKZL70X5RJ438216")} hlO={hl}
          />
          <EquipLine
            text="2024 KENWORTH T880 TRI-DRIVE DUMP TRUCK"
            serial="1NKZL70X7RJ438217"
            value="$265,400.00"
            serialHL={shl("1NKZL70X7RJ438217")} hlO={hl}
          />
          <EquipLine
            text="2023 KENWORTH T880 TANDEM DUMP TRUCK"
            serial="1NKZL70X9PJ435892"
            value="$248,750.00"
            serialHL={shl("1NKZL70X9PJ435892")} hlO={hl}
          />
          <EquipLine
            text="2023 KENWORTH T880 TANDEM DUMP TRUCK"
            serial="1NKZL70X0PJ435893"
            value="$248,750.00"
            serialHL={shl("1NKZL70X0PJ435893")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $7,500 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 6: John Deere */}
          <EquipLine
            text="2024 JOHN DEERE 310SL BACKHOE LOADER"
            serial="1T0310SLXPE283647"
            value="$178,900.00"
            serialHL={shl("1T0310SLXPE283647")} hlO={hl}
          />
          <EquipLine
            text="2024 JOHN DEERE 310SL BACKHOE LOADER"
            serial="1T0310SLXPE283651"
            value="$178,900.00"
            serialHL={shl("1T0310SLXPE283651")} hlO={hl}
          />
          <EquipLine
            text="2022 JOHN DEERE 544P WHEEL LOADER"
            serial="1DW544PZXNE680124"
            value="$295,600.00"
            serialHL={shl("1DW544PZXNE680124")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $5,000 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 7: Trailers & misc */}
          <EquipLine
            text="2025 LOAD KING STINGER 50-TON TRI AXLE LOWBED TRAILER"
            serial="5LKLA5036RS102847"
            value="$142,800.00"
            serialHL={shl("5LKLA5036RS102847")} hlO={hl}
          />
          <EquipLine
            text="2024 PITTS TA-LB51-18KS TRI AXLE LOG TRAILER"
            serial="5JYLB5320RC105629"
            value="$95,750.00"
            serialHL={shl("5JYLB5320RC105629")} hlO={hl}
          />
          <EquipLine
            text="2024 DOEPKER 53FT TRI AXLE BULKER TRAILER"
            serial="2DEGN5333R1048372"
            value="$118,400.00"
            serialHL={shl("2DEGN5333R1048372")} hlO={hl}
          />
          <EquipLine
            text="2023 FRONTIER FT1180-40 TANDEM FLOAT TRAILER"
            serial="2F9FT4027PN012853"
            value="$89,200.00"
            serialHL={shl("2F9FT4027PN012853")} hlO={hl}
          />
          <EquipLine
            text="2023 BWS EQ-24GN TANDEM EQUIPMENT TRAILER"
            serial="4B2BW2424P1003847"
            value="$52,450.00"
            serialHL={shl("4B2BW2424P1003847")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $2,500 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 8: Bobcat & compact */}
          <EquipLine
            text="2024 BOBCAT T870 COMPACT TRACK LOADER"
            serial="B4FH13762"
            value="$98,750.00"
            serialHL={shl("B4FH13762")} hlO={hl}
          />
          <EquipLine
            text="2024 BOBCAT T870 COMPACT TRACK LOADER"
            serial="B4FH13778"
            value="$98,750.00"
            serialHL={shl("B4FH13778")} hlO={hl}
          />
          <EquipLine
            text="2023 BOBCAT E85 COMPACT EXCAVATOR"
            serial="B4S812456"
            value="$124,300.00"
            serialHL={shl("B4S812456")} hlO={hl}
          />
          <EquipLine
            text="2025 KUBOTA SVL97-2 COMPACT TRACK LOADER"
            serial="20718"
            value="$87,650.00"
            serialHL={shl("20718")} hlO={hl}
          />
          <EquipLine
            text="2024 WACKER NEUSON EZ80 EXCAVATOR"
            serial="WNCE0080PK0024815"
            value="$135,200.00"
            serialHL={shl("WNCE0080PK0024815")} hlO={hl}
          />
          <div style={{ marginTop: 2, marginBottom: 6, fontWeight: 500 }}>
            Deductibles: $2,500 All Perils, Includes SEF 5
          </div>

          {/* Equipment Group 9: Gensets & pumps */}
          <EquipLine
            text="2024 ATLAS COPCO QAS 150 GENERATOR SET 150KVA"
            serial="QAS150-2024-08172"
            value="$68,400.00"
            serialHL={shl("QAS150-2024-08172")} hlO={hl}
          />
          <EquipLine
            text="2023 MULTIQUIP MQ62TDD TRASH PUMP 6 INCH"
            serial="5294638"
            value="$24,800.00"
            serialHL={shl("5294638")} hlO={hl}
          />
          <EquipLine
            text="2024 WACKER NEUSON HI1000D INDIRECT HEATER"
            serial="20523271"
            value="$42,900.00"
            serialHL={shl("20523271")} hlO={hl}
          />
          <EquipLine
            text="2024 LINCOLN ELECTRIC RANGER 330MPX WELDER/GENERATOR"
            serial="U1240203652"
            value="$18,500.00"
            serialHL={shl("U1240203652")} hlO={hl}
          />
          <div style={{ marginTop: 2, fontWeight: 500 }}>
            Deductibles: $1,000 All Perils, Includes SEF 5
          </div>
        </div>
      </div>
    </div>
  );
};

// Section header bar (black background with white numbered badge)
const SectionHeader: React.FC<{ num: string; text: string; f: number; small?: boolean }> = ({
  num,
  text,
  f,
  small,
}) => (
  <div
    style={{
      backgroundColor: "#1a1a1a",
      color: "white",
      fontSize: small ? f - 1.5 : f - 0.5,
      fontWeight: 700,
      padding: "1px 4px",
      display: "flex",
      alignItems: "center",
      gap: 4,
    }}
  >
    <span
      style={{
        backgroundColor: "white",
        color: "#1a1a1a",
        padding: "0 3px",
        fontSize: f - 1,
        fontWeight: 700,
        borderRadius: 1,
      }}
    >
      {num}.
    </span>
    {text}
  </div>
);

// Equipment line in the descriptions continued section
const EquipLine: React.FC<{
  text: string;
  serial: string;
  value: string;
  serialHL?: string;
  valueHL?: string;
  hlO?: number;
}> = ({ text, serial, value, serialHL, valueHL, hlO = 0 }) => {
  const hs = (rgb: string): React.CSSProperties => ({
    backgroundColor: `rgba(${rgb}, ${0.18 * hlO})`,
    outline: `1.5px solid rgba(${rgb}, ${0.5 * hlO})`,
    borderRadius: 1,
    padding: "0 1px",
  });
  return (
    <div style={{ fontSize: 5.5, lineHeight: 1.4, marginBottom: 1 }}>
      {text}{" "}
      <span style={{ fontWeight: 600, ...(serialHL && hlO > 0 ? hs(serialHL) : {}) }}>
        {serial}
      </span>{" "}
      Value: {valueHL && hlO > 0 ? <span style={hs(valueHL)}>{value}</span> : value}
    </div>
  );
};

// Limit row in the coverage table
const LR: React.FC<{
  label: string;
  ded?: string;
  amount?: string;
  bold?: boolean;
  amountHL?: string;
  dedHL?: string;
  hlO?: number;
}> = ({ label, ded, amount, bold, amountHL, dedHL, hlO = 0 }) => {
  const hs = (rgb: string): React.CSSProperties => ({
    backgroundColor: `rgba(${rgb}, ${0.18 * hlO})`,
    outline: `1.5px solid rgba(${rgb}, ${0.5 * hlO})`,
    borderRadius: 1,
    padding: "0 1px",
  });
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #aaa",
        fontSize: 5,
        minHeight: 9,
      }}
    >
      <div
        style={{
          flex: 3,
          padding: "1px 2px",
          borderRight: "1px solid #aaa",
          fontWeight: bold ? 600 : 400,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </div>
      <div style={{ flex: 1, padding: "1px 2px", borderRight: "1px solid #aaa", textAlign: "right" }}>
        {dedHL && hlO > 0 && ded ? <span style={hs(dedHL)}>{ded}</span> : ded}
      </div>
      <div style={{ flex: 1.5, padding: "1px 2px", textAlign: "right" }}>
        {amountHL && hlO > 0 && amount ? <span style={hs(amountHL)}>{amount}</span> : amount}
      </div>
    </div>
  );
};

// Analysis Panel
const AnalysisPanel: React.FC<{
  frame: number;
  fps: number;
  resultsStart: number;
  exceptionsStart: number;
  compliantCount: number;
  ncCount: number;
  advisoryCount: number;
}> = ({
  frame,
  fps,
  resultsStart,
  exceptionsStart,
  compliantCount,
  ncCount,
  advisoryCount,
}) => {
  const exceptions = [
    {
      icon: "circle",
      title: "12345678 + AUT0482079 + BHU1017547",
      subtitle: "Certificate Holder Address Mismatch",
      color: colors.status.noncompliant,
    },
    {
      icon: "circle",
      title: "ZBK10291",
      subtitle: "Value Mismatch ($385,500 → $395,500)",
      color: colors.status.noncompliant,
    },
    {
      icon: "circle",
      title: "1NKZL70X9PJ435892",
      subtitle: "Deductible Out of Range",
      color: colors.status.noncompliant,
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638472",
      subtitle: "Unmatched Serial (Incoming)",
      color: colors.status.advisory,
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638474",
      subtitle: "Unmatched Serial (Incoming)",
      color: colors.status.advisory,
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638478",
      subtitle: "Unmatched Serial (Incoming)",
      color: colors.status.advisory,
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638471",
      subtitle: "Unmatched Serial (Comparison)",
      color: "#9333EA",
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638473",
      subtitle: "Unmatched Serial (Comparison)",
      color: "#9333EA",
    },
    {
      icon: "wrench",
      title: "3F7KT2B91MN638477",
      subtitle: "Unmatched Serial (Comparison)",
      color: "#9333EA",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 16,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.text.primary,
            margin: "0 0 12px",
          }}
        >
          Analysis Summary
        </h3>

        {/* Metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <MetaRow label="Document type:" value="Standard" />
          <MetaRow label="Lender:" value="Maple Leaf Financing" />
          <MetaRow label="Endorsements:" value="SEF 5" />
        </div>

        {/* Deal type toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
          }}
        >
          <span
            style={{ fontSize: 12, color: colors.text.secondary }}
          >
            Deal type:
          </span>
          <div
            style={{
              display: "flex",
              border: `1px solid ${colors.border.strong}`,
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: colors.accent.blue,
                color: "white",
              }}
            >
              Lease
            </div>
            <div
              style={{
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: "white",
                color: colors.text.secondary,
              }}
            >
              Loan
            </div>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <StatusRow
          icon="check"
          label="Compliant"
          count={compliantCount}
          color={colors.status.compliant}
        />
        <StatusRow
          icon="x"
          label="Non-compliant"
          count={ncCount}
          color={colors.status.noncompliant}
        />
        <StatusRow
          icon="alert"
          label="Advisory"
          count={advisoryCount}
          color={colors.status.advisory}
        />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${colors.border.default}`,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            color: colors.text.primary,
            borderBottom: `3px solid ${colors.accent.blue}`,
          }}
        >
          Exceptions ({ncCount + advisoryCount})
        </div>
        <div
          style={{
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 500,
            color: colors.text.tertiary,
          }}
        >
          Compliant ({compliantCount})
        </div>
      </div>

      {/* Exception Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
          overflow: "hidden",
        }}
      >
        {exceptions.map((item, i) => {
          const itemDelay = i * Math.round(0.15 * fps);
          const itemOpacity = interpolate(
            frame,
            [exceptionsStart + itemDelay, exceptionsStart + itemDelay + 0.3 * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const itemY = interpolate(
            frame,
            [exceptionsStart + itemDelay, exceptionsStart + itemDelay + 0.3 * fps],
            [12, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.quad),
            }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 8px",
                borderRadius: 6,
                backgroundColor: "transparent",
                borderLeft: `3px solid ${item.color}`,
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
              }}
            >
              {/* Status icon */}
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: item.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {item.icon === "circle" ? (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: item.color,
                    }}
                  />
                ) : (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="2.5"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: colors.text.primary,
                    marginBottom: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: item.color,
                    fontWeight: 500,
                  }}
                >
                  {item.subtitle}
                </div>
              </div>

              {/* Expand chevron */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.text.tertiary}
                strokeWidth="2"
                style={{ flexShrink: 0, marginTop: 2 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Export button */}
      <div
        style={{
          borderTop: `1px solid ${colors.border.default}`,
          paddingTop: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{
            height: 32,
            padding: "0 12px",
            border: `1px solid ${colors.border.strong}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            backgroundColor: "white",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.text.secondary}
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: colors.text.secondary }}>
            Export
          </span>
        </div>
      </div>
    </div>
  );
};

const MetaRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontSize: 12, color: colors.text.tertiary }}>{label}</span>
    <span style={{ fontSize: 12, fontWeight: 500, color: colors.text.primary }}>
      {value}
    </span>
  </div>
);

const StatusRow: React.FC<{
  icon: "check" | "x" | "alert";
  label: string;
  count: number;
  color: string;
}> = ({ icon, label, count, color }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon === "check" && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {icon === "x" && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
        {icon === "alert" && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="12" y1="9" x2="12" y2="13" />
            <circle cx="12" cy="17" r="0.5" fill={color} />
          </svg>
        )}
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: colors.text.primary,
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{
        minWidth: 28,
        height: 22,
        borderRadius: 11,
        backgroundColor: color + "15",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, color }}>{count}</span>
    </div>
  </div>
);
