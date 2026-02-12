import { useState, useRef, useEffect } from 'react'
import { INITIAL_STATE } from './constants/initialState'
import { generateRandomData } from './utils/randomData'
import { exportPayslipToPdf, exportToPng, exportToZip, exportTeacherCardToPdf, getTeacherCardPdfBase64 } from './utils/pdfExport'
import usePersistentState from './hooks/usePersistentState'
import Editor from './components/Editor'
import Preview from './components/Preview'
import './index.css'

function App() {
  const [state, setState, resetState] = usePersistentState(INITIAL_STATE)
  const [docType, setDocType] = useState('payslip') // 'payslip', 'tax', 'w2', 'employment', 'offer', 'faculty', 'teacherCard', 'educatorLicense'
  const [mode, setMode] = useState('employee') // 'employee' or 'contractor'
  const [cardStyle, setCardStyle] = useState('original') // 'original', 'modern', 'simple'
  const [companyLogo, setCompanyLogo] = useState(null)
  const [photoBase64, setPhotoBase64] = useState(null)
  const [exportProgress, setExportProgress] = useState(null) // { current, total, docType } or null
  const logoInputRef = useRef(null)

  // Cloudflare Worker URL for photo proxying
  const WORKER_URL = 'https://student-photo-proxy.thanhnguyentuan2007.workers.dev';

  const fetchPhoto = async (gender = 'male') => {
    try {
      const response = await fetch(`${WORKER_URL}?gender=${gender}`);
      if (!response.ok) throw new Error('Photo fetch failed');

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Failed to fetch photo:', error);
      // Fallback to Dicebear if worker fails
      const seed = Math.random().toString(36).substring(7);
      setPhotoBase64(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
    }
  };

  // Fetch initial photo
  useEffect(() => {
    fetchPhoto();
  }, []);

  const handleChange = (section, field, value) => {
    setState(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Specific handler for arrays (earnings/deductions)
  const handleArrayChange = (section, id, field, value) => {
    setState(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const addArrayItem = (section, newItem) => {
    setState(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }))
  }

  const removeArrayItem = (section, id) => {
    setState(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCompanyLogo(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Expose PDF generation to window for Puppeteer
  useEffect(() => {
    window.getTeacherCardPdfBase64 = () => getTeacherCardPdfBase64(state);
  }, [state]);

  return (
    <div className="app-container">
      {/* Modern Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-left">
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginRight: '1rem' }}>
            💼 Payslip Generator
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`tab-btn ${mode === 'employee' ? 'active' : ''}`}
              onClick={() => setMode('employee')}
            >
              Employee
            </button>
            <button
              className={`tab-btn ${mode === 'contractor' ? 'active' : ''}`}
              onClick={() => setMode('contractor')}
            >
              Contractor
            </button>
          </div>
        </div>

        <div className="nav-center">
          <button
            className={`tab-btn ${docType === 'payslip' ? 'active' : ''}`}
            onClick={() => setDocType('payslip')}
            aria-current={docType === 'payslip' ? 'page' : undefined}
          >
            Payslip
          </button>
          <button
            className={`tab-btn ${docType === 'tax' ? 'active' : ''}`}
            onClick={() => setDocType('tax')}
            aria-current={docType === 'tax' ? 'page' : undefined}
          >
            Tax Form
          </button>
          <button
            className={`tab-btn ${docType === 'w2' ? 'active' : ''}`}
            onClick={() => setDocType('w2')}
            aria-current={docType === 'w2' ? 'page' : undefined}
          >
            W-2
          </button>
          <button
            className={`tab-btn ${docType === 'employment' ? 'active' : ''}`}
            onClick={() => setDocType('employment')}
            aria-current={docType === 'employment' ? 'page' : undefined}
          >
            Employment
          </button>
          <button
            className={`tab-btn ${docType === 'offer' ? 'active' : ''}`}
            onClick={() => setDocType('offer')}
            aria-current={docType === 'offer' ? 'page' : undefined}
          >
            Offer Letter
          </button>
          <button
            className={`tab-btn ${docType === 'faculty' ? 'active' : ''}`}
            onClick={() => setDocType('faculty')}
            aria-current={docType === 'faculty' ? 'page' : undefined}
          >
            Faculty Listing
          </button>
          <button
            className={`tab-btn ${docType === 'teacherCard' ? 'active' : ''}`}
            onClick={() => setDocType('teacherCard')}
            aria-current={docType === 'teacherCard' ? 'page' : undefined}
          >
            Teacher ID
          </button>
          <button
            className={`tab-btn ${docType === 'educatorLicense' ? 'active' : ''}`}
            onClick={() => setDocType('educatorLicense')}
            aria-current={docType === 'educatorLicense' ? 'page' : undefined}
          >
            Educator License
          </button>

          {/* Style Selector */}
          {(docType === 'teacherCard') && (
            <select
              value={cardStyle}
              onChange={(e) => setCardStyle(e.target.value)}
              style={{
                marginLeft: '1rem',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <option value="original" style={{ color: '#333' }}>🎨 Original</option>
              <option value="modern" style={{ color: '#333' }}>✨ Modern</option>
              <option value="simple" style={{ color: '#333' }}>📄 Simple</option>
            </select>
          )}
        </div>

        <div className="nav-right">
          <button
            className="action-btn"
            onClick={() => {
              if (confirm('Reset all data to defaults?')) resetState();
            }}
            title="Reset all data to default values"
          >
            🔄 Reset
          </button>
          <button
            className="action-btn primary"
            onClick={() => {
              setState(generateRandomData());
              fetchPhoto(Math.random() > 0.5 ? 'male' : 'female');
            }}
          >
            🎲 Random
          </button>
          <button
            className="action-btn secondary"
            onClick={() => docType === 'teacherCard' ? exportTeacherCardToPdf(state) : exportPayslipToPdf(state)}
            title="Download current document as PDF"
          >
            📄 PDF
          </button>
          <button
            className="action-btn secondary"
            onClick={() => exportToPng(state, docType)}
            title="Download current document as PNG"
          >
            🖼️ PNG
          </button>
          <button
            className="action-btn secondary"
            onClick={async () => {
              setExportProgress({ current: 0, total: 6, docType: 'starting' });
              await exportToZip(state, setDocType, docType, setExportProgress);
              setExportProgress(null);
            }}
            disabled={!!exportProgress}
            title="Download ALL documents as ZIP"
            style={{
              background: exportProgress
                ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                : 'linear-gradient(135deg, #10b981, #059669)',
              opacity: exportProgress ? 0.7 : 1,
              cursor: exportProgress ? 'not-allowed' : 'pointer',
            }}
          >
            {exportProgress ? '⏳ Exporting...' : '📦 ZIP All'}
          </button>
          {exportProgress && (
            <span style={{
              color: 'white',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '0.25rem',
              whiteSpace: 'nowrap',
            }}>
              {exportProgress.current}/{exportProgress.total}
            </span>
          )}
          <a
            href="https://thanhnguyxn.github.io/student-card-generator/"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', textDecoration: 'none' }}
          >
            🎓 Student
          </a>
        </div>
      </nav>

      <main className="main-content">
        <Editor
          state={state}
          onChange={handleChange}
          onArrayChange={handleArrayChange}
          onAdd={addArrayItem}
          onRemove={removeArrayItem}
          companyLogo={companyLogo}
          onLogoUpload={handleLogoUpload}
          logoInputRef={logoInputRef}
          docType={docType}
          photoBase64={photoBase64}
          onPhotoChange={setPhotoBase64}
          onFetchRandom={() => fetchPhoto(Math.random() > 0.5 ? 'male' : 'female')}
        />
        <Preview
          state={state}
          docType={docType}
          mode={mode}
          companyLogo={companyLogo}
          cardStyle={cardStyle}
          photoBase64={photoBase64}
        />
      </main>
    </div>
  )
}

export default App
