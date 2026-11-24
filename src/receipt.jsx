import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Click } from '@animate-ui/react/primitives/effects/click'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import content from './content.json'
import ReceiptCollage from './ReceiptCollage'
import { getVisitNumber } from './visits'
import './style.css'
import './receipt.css'

const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })
const digitPatterns = ['11221', '21112', '12112', '22111', '11212', '21211', '12211', '11122', '21121', '12121']

function receiptDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return [month, day, date.getFullYear()].join(' ')
}

function Barcode({ date }) {
  const widths = [1, 1, 1, 1]
  for (const [bars, spaces] of date.match(/\d{2}/g)) {
    for (let i = 0; i < 5; i += 1) {
      widths.push(Number(digitPatterns[bars][i]), Number(digitPatterns[spaces][i]))
    }
  }
  widths.push(2, 1, 1)

  return (
    <div className="receipt-barcode">
      <div className="barcode-bars" aria-hidden="true">
        {widths.map((width, i) => <span key={i} style={{ flexGrow: width }} />)}
      </div>
      <span>{date}</span>
    </div>
  )
}

function Receipt({ printedAt, orderNumber }) {
  return (
    <article className="receipt-paper">
      <header className="receipt-heading">
        <h1>ABOUT KHLOE SAKAI</h1>
        <p>bay area, california &amp; upstate new york.</p>
        <p className="receipt-meta">
          <span>order #{orderNumber ?? '—'}</span>
          <time dateTime={printedAt.toISOString()}>{timeFormat.format(printedAt).toLowerCase()}</time>
        </p>
      </header>
      <section className="receipt-group">
        <h2>what i use:</h2>
        <ul>
          <li>adobe creative suite</li>
          <li>figma, canva, davinci resolve</li>
          <li>cinema4d, blender</li>
        </ul>
      </section>
      <section className="receipt-group">
        <h2>when i’m not designing:</h2>
        <ul>
          <li><a href="https://open.spotify.com/user/9n7o35e91l272fnouizjp1wyy?si=28c47c7d962a4ae6">listening to music</a></li>
          <li>making a matcha latte</li>
          <li>creative writing</li>
          <li>playing minecraft</li>
        </ul>
      </section>
      <dl className="receipt-totals">
        <div><dt>subtotal</dt><dd><a href="https://www.linkedin.com/in/khloe-sakai/">linkedin</a></dd></div>
        <div><dt>tax</dt><dd><a href="https://github.com/7kairos">github</a></dd></div>
      </dl>
      <Barcode date={receiptDate(printedAt)} />
      <footer className="receipt-footer">
        <a href="mailto:sakaik@rpi.edu">come say hi.</a>
      </footer>
    </article>
  )
}

const visit = getVisitNumber()

function PrinterPage() {
  const [copies, setCopies] = useState(0)
  const [printedAt, setPrintedAt] = useState(null)
  const [orderNumber, setOrderNumber] = useState(null)

  function printReceipt() {
    setPrintedAt(new Date())
    setCopies((previous) => previous + 1)
    visit.then(async (number) => setOrderNumber(number ?? await getVisitNumber()))
  }

  return (
    <div className="page">
      <Click variant="ring" color="rgb(73 98 69 / 45%)" size={40} />
      <header className="masthead">
        <a className="home-link" href="../">back home</a>
        <span className="year">{content.year}</span>
      </header>
      <main className="printer-page" aria-label="About receipt">
        <div className="receipt-machine">
          <div className="receipt-printer">
            <button type="button" onClick={printReceipt} aria-expanded={Boolean(printedAt)} aria-controls="paper-feed">
              {printedAt ? 'print again' : 'ready to print?'}
            </button>
            <div className="printer-slot" aria-hidden="true" />
          </div>
          <div id="paper-feed">
            {printedAt && (
              <div className="receipt-feed" key={copies}>
                <div className="receipt-clip">
                  <Receipt printedAt={printedAt} orderNumber={orderNumber} />
                </div>
              </div>
            )}
          </div>
        </div>
        <ReceiptCollage side="left" />
        <ReceiptCollage side="right" />
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<PrinterPage />)
