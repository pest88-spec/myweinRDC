/**
 * Renderer for the Illinois State Educator Preparation and Licensure Board
 * certificate. Faithfully reproduces the original scanned document based on
 * precise coordinate and proportion analysis.
 *
 * Structure:
 *   Red number (top-right, outside border) →
 *   Double-border frame (outer micro-text + inner thick black line) wrapping:
 *     Upper section ~32% (header/info/signatures) →
 *     Divider line →
 *     Lower section ~48% (endorsements) →
 *   Footer ~17% (additional info, outside border)
 *
 * Border system:
 *   Outer layer: decorative micro-text border (~3mm) with repeated official
 *     phrases at ~3px font size, simulating anti-forgery micro-printing.
 *   Inner layer: thick solid black line (~4px), providing formal visual weight.
 *   Micro-text width ≈ 30-40% of total border; black line ≈ 60-70%.
 *
 * Font system: Arial Black headers + Times New Roman body + cursive signatures.
 *
 * @param {Object} props
 * @param {Object} props.state - Application state with educatorLicense section
 */

// Single-line micro-text string for the decorative outer border.
// Continuous chain of official phrases simulates anti-forgery micro-printing.
const MICRO_LINE = ('STATE OF ILLINOIS · CERTIFICATE · OFFICIAL · ' +
  'EDUCATOR PREPARATION AND LICENSURE BOARD · SPRINGFIELD · ' +
  'DEPARTMENT OF EDUCATION · REGISTERED · AUTHORIZED · VERIFIED · ').repeat(30);

const EducatorLicenseRenderer = ({ state }) => {
  const license = state.educatorLicense || {};

  const {
    stateName = '',
    departmentName = '',
    licenseType = '',
    licenseeName = '',
    issuedToId = '',
    licenseNumber = '',
    issueDate = '',
    validFor = '',
    teachingAreas = [],
    renewalRequirements = '',
    certificateNumber = '',
    signatories = [],
  } = license;

  const sig1 = signatories[0] || { name: '', title: '' };
  const sig2 = signatories[1] || { name: '', title: '' };
  const sig3 = signatories[2] || { name: '', title: '' };

  // Format ISO date string to MM/DD/YYYY display format
  const fmt = (d) => {
    if (!d || !d.includes('-')) return d;
    const [y, m, dd] = d.split('-');
    return `${m}/${dd}/${y}`;
  };

  return (
    <div style={{ margin: '-40px -50px', padding: 0 }}>
      {/* Page — Letter size, matches .payslip-container width */}
      <div style={{
        width: '210mm',
        minHeight: '279mm',
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: '13px',
        lineHeight: 1.4,
        boxSizing: 'border-box',
        padding: '3mm 5mm 5mm',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* ── RED CERTIFICATE NUMBER ──
            Position: top-right, y≈1.9%, outside main border.
            Sans-serif, red, medium weight. */}
        <div style={{
          textAlign: 'right',
          color: '#cc0000',
          fontFamily: "'Unica One', 'Franklin Gothic Medium', Tahoma, Arial, sans-serif",
          fontWeight: '400',
          fontSize: '26px',
          letterSpacing: '0.6px',
          marginBottom: '3mm',
          paddingRight: '1mm',
        }}>
          {certificateNumber}
        </div>

        {/* ════════════════════════════════════════════════════
            DOUBLE-BORDER FRAME
            Outer: four single-line micro-text strips forming a
              continuous ring (top/right/bottom/left). Each strip
              is one line of tiny repeated official phrases.
              Left & right strips are rotated 90°.
              Corners transition naturally.
            Gap: ~1mm white space between micro-text and inner line.
            Inner: thick solid black line (3.5px border).
            ════════════════════════════════════════════════════ */}
        {/* Shared micro-text style for all four border strips */}
        <div style={{
          position: 'relative',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          /* Reserve space for micro-text strip + gap + thick border */
          padding: '0',
        }}>

          {/* ── TOP micro-text strip ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4.5px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '3.5px',
              lineHeight: '4.5px',
              color: '#333',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.4px',
              userSelect: 'none',
              backgroundColor: '#ece8e4',
              filter: 'blur(0.6px)',
            }}
          >
            {MICRO_LINE}
          </div>

          {/* ── BOTTOM micro-text strip ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4.5px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '3.5px',
              lineHeight: '4.5px',
              color: '#333',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.4px',
              userSelect: 'none',
              backgroundColor: '#ece8e4',
              filter: 'blur(0.6px)',
            }}
          >
            {MICRO_LINE}
          </div>

          {/* ── LEFT micro-text strip (rotated 90° CCW) ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '4.5px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '3.5px',
              lineHeight: '4.5px',
              color: '#333',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.4px',
              userSelect: 'none',
              backgroundColor: '#ece8e4',
              writingMode: 'vertical-lr',
              textOrientation: 'mixed',
              filter: 'blur(0.6px)',
            }}
          >
            {MICRO_LINE}
          </div>

          {/* ── RIGHT micro-text strip (rotated 90° CW) ── */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '4.5px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '3.5px',
              lineHeight: '4.5px',
              color: '#333',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: '400',
              letterSpacing: '0.4px',
              userSelect: 'none',
              backgroundColor: '#ece8e4',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              filter: 'blur(0.6px)',
            }}
          >
            {MICRO_LINE}
          </div>

          {/* Inner content area — offset inward past the micro-text
              strips + tiny gap, then thick black border around content. */}
          <div style={{
            margin: '4.5px',
            padding: '2px',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
          }}>

            {/* Inner frame — thick black border.
                Contains both upper and lower certificate sections. */}
            <div style={{
              border: '3.5px solid #000',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
            }}>

            {/* ── UPPER SECTION (~32%): Header + Info + Signatures ── */}
            <div style={{
              padding: '4mm 5mm 3mm',
              borderBottom: '1px solid #000',
            }}>

          {/* ── THREE-LINE CENTERED HEADER ──
              Title area spans y≈6.6% to y≈12.2% (~5.6% of page) */}
          <div style={{ textAlign: 'center', marginBottom: '5mm' }}>
            {/* Line 1: Board name — heavy sans-serif, ALL CAPS
                ~18-20pt, bold, tight to normal letter-spacing */}
            <div style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: '900',
              fontSize: '19px',
              textTransform: 'uppercase',
              letterSpacing: '-0.2px',
              lineHeight: 1.2,
            }}>
              {departmentName}
            </div>
            {/* Line 2: State name — same heavy family, ~20-22pt */}
            <div style={{
              fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: '900',
              fontSize: '21px',
              textTransform: 'uppercase',
              letterSpacing: '0px',
              lineHeight: 1.2,
              marginTop: '1mm',
            }}>
              State of {stateName}
            </div>
            {/* Line 3: CERTIFICATE — visual anchor, ~36-40pt
                Chivo Bold: grotesque sans-serif, bold weight.
                Normal to slightly wide letter-spacing. */}
            <div style={{
              fontFamily: "'Chivo', 'Arial Black', Impact, sans-serif",
              fontWeight: '700',
              fontSize: '38px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              lineHeight: 1.1,
              marginTop: '1.5mm',
            }}>
              Certificate
            </div>
          </div>

          {/* ── TWO-COLUMN INFO SECTION ──
              Left x≈7.3% (Issued To), Right x≈52.2% (params).
              ~50/50 split. Body text ~11pt serif. */}
          <div style={{
            display: 'flex',
            marginBottom: '2mm',
            lineHeight: 1.7,
            fontSize: '11px',
          }}>
            <div style={{ width: '50%' }}>
              <div>Issued To:</div>
              <div>{issuedToId}</div>
              <div>{licenseeName}</div>
            </div>
            <div style={{ width: '50%' }}>
              <table style={{
                borderCollapse: 'collapse',
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}>
                <tbody>
                  {[
                    ['Number:', licenseNumber],
                    ['Type:', licenseType],
                    ['Issued:', fmt(issueDate)],
                    ['Valid For:', validFor],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={{
                        textAlign: 'right',
                        paddingRight: '3mm',
                        whiteSpace: 'nowrap',
                        verticalAlign: 'top',
                      }}>{label}</td>
                      <td style={{ verticalAlign: 'top' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── ITALIC ISSUED-BY LINE ── ~11-12pt */}
          <div style={{
            fontStyle: 'italic',
            fontSize: '11px',
            marginBottom: '5mm',
          }}>
            Issued by the State Teacher Certification Board at Springfield, {stateName}
          </div>

          {/* ── THREE SIGNATURES ──
              Three-point distribution: x≈16%, 50%, 79%.
              Each signature uses a distinct cursive font.
              No underline beneath signatures. */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            {[
              {
                sig: sig1, align: 'left',
                // Left: flowing cursive, connected strokes
                font: "'Great Vibes', 'Segoe Script', cursive",
                skew: '-2deg', size: '18px',
              },
              {
                sig: sig2, align: 'center',
                // Center: neater cursive, more legible
                font: "'Dancing Script', 'Lucida Handwriting', cursive",
                skew: '0deg', size: '16px',
              },
              {
                sig: sig3, align: 'right',
                // Right: quick, dashing cursive
                font: "'Sacramento', 'Brush Script MT', cursive",
                skew: '-1deg', size: '20px',
              },
            ].map(({ sig, align, font, skew, size }, i) => (
              <div key={i} style={{ width: '30%', textAlign: align }}>
                <div style={{
                  fontFamily: font,
                  fontSize: size,
                  color: '#1a1a1a',
                  minHeight: '7mm',
                  lineHeight: 1.1,
                  textAlign: align,
                  transform: `skewX(${skew})`,
                  fontWeight: '400',
                }}>
                  {sig.name}
                </div>
                <div style={{
                  paddingTop: '0.5mm',
                  fontFamily: "'Times New Roman', Times, serif",
                  fontStyle: 'italic',
                  fontSize: '9px',
                  textAlign: align,
                }}>
                  {sig.title}
                </div>
              </div>
            ))}
          </div>

            </div>
            {/* END upper section */}

            {/* ── LOWER SECTION (~48%): ENDORSEMENTS ── */}
            <div style={{
              padding: '2.5mm 5mm 2mm',
              flex: '1 1 auto',
              minHeight: '134mm',
              display: 'flex',
              flexDirection: 'column',
              fontSize: '12px',
              lineHeight: 1.5,
            }}>
          {/* ENDORSEMENTS header + description — same line */}
          <div style={{ marginBottom: '8mm', fontSize: '12px' }}>
            <span style={{ fontWeight: 'bold' }}>ENDORSEMENTS:</span>
            {' '}The Certificate holder is qualified to teach the subjects,
            to perform the school services or to serve in the field of
            administrative endorsement listed below.
          </div>

          {/* Teaching areas + endorsement rows */}
          {teachingAreas.map((ta) => (
            <div key={ta.id}>
              <div style={{ marginTop: '8mm' }}>Completed State Approved Program In:</div>
              <div style={{ paddingLeft: '5mm' }}>{ta.area}</div>

              {ta.endorsements && ta.endorsements.length > 0 && (
                <div style={{ marginTop: '2mm' }}>
                  <div>Certificate Endorsements:</div>
                  {ta.endorsements.map((end, idx) => {
                    const subject = typeof end === 'string' ? end : (end.subject || '');
                    const gradeLevel = typeof end === 'object' ? (end.gradeLevel || '') : '';
                    const date = typeof end === 'object' ? (end.date || '') : '';
                    return (
                      <div key={idx} style={{
                        display: 'flex',
                        paddingLeft: '5mm',
                        lineHeight: 1.65,
                      }}>
                        <span style={{ flex: '1 1 55%' }}>{subject}</span>
                        <span style={{ flex: '0 0 25%' }}>{gradeLevel}</span>
                        <span style={{ flex: '0 0 20%', textAlign: 'right' }}>{fmt(date)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Spacer — pushes termination mark to y≈68% position */}
          <div style={{ flex: '1 1 auto', minHeight: '15mm' }} />

          {/* Termination mark — centered, ratio ≈ 1.2× */}
          <div style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px',
          }}>
            *** No Further Valid Entries ***
          </div>

          {/* Bottom whitespace */}
          <div style={{ flex: '0.8 1 auto', minHeight: '15mm' }} />
            </div>
            {/* END lower section */}

            </div>
            {/* END inner frame (thick black border) */}

          </div>
          {/* END inner content area */}

        </div>
        {/* END double-border frame */}

        {/* ════════════════════════════════════════════════════
            FOOTER (~17% of page): ADDITIONAL INFORMATION
            Outside borders, no border. "Footnote clauses" style.
            ════════════════════════════════════════════════════ */}
        {renewalRequirements && (
          <div style={{ flexShrink: 0, marginTop: '4mm' }}>
            <div style={{
              fontFamily: "'Arial Black', Arial, Helvetica, sans-serif",
              fontWeight: 'bold',
              fontSize: '12px',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              marginBottom: '2mm',
            }}>
              Additional Information:
            </div>
            <div style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '11px',
              lineHeight: 1.5,
              whiteSpace: 'pre-line',
            }}>
              {renewalRequirements}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EducatorLicenseRenderer;
