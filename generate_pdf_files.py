import os
from reportlab.lib.pagesizes import letter, landscape, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfgen import canvas

# ==========================================
# 1. PRESENTATION PDF (Landscape)
# ==========================================

def create_presentation_pdf():
    pdf_filename = "Project_Presentation_Scam_Tactic_Detector.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=landscape(letter),
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'SlideTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0284c7'),
        alignment=0,
        spaceAfter=15
    )

    cat_style = ParagraphStyle(
        'CategoryPill',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor('#0369a1'),
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'SlideBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=12
    )

    bold_body = ParagraphStyle(
        'SlideBodyBold',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor('#0f172a')
    )

    slides_content = [
        # Slide 1: Title
        [
            Paragraph("MINI PROJECT • SEMESTER 3", cat_style),
            Paragraph("Scam Tactic Detector", ParagraphStyle('Hero', fontName='Helvetica-Bold', fontSize=32, leading=38, textColor=colors.HexColor('#0284c7'), spaceAfter=10)),
            Paragraph("An Explainable Natural Language Processing System for Identifying Psychological Manipulation in Investment Communications", ParagraphStyle('SubHero', fontName='Helvetica', fontSize=15, leading=20, textColor=colors.HexColor('#475569'), spaceAfter=20)),
            Spacer(1, 20),
            Paragraph("<b>Team Members & Responsibilities:</b>", bold_body),
            Paragraph("• <b>Abhiman (Lead)</b> [Roll No: 202510101150119] — Project Lead, AI/ML & Backend Architecture", body_style),
            Paragraph("• <b>Aryan</b> [Roll No: 202510101150118] — Frontend Development & UI/UX Design", body_style),
            Paragraph("• <b>Rohit</b> [Roll No: 202510101150195] — Dataset Engineering & Empirical Fraud Research", body_style),
            Paragraph("• <b>Abhishek</b> [Roll No: 202510101150192] — Quality Assurance, Testing Suites & Documentation", body_style),
            Spacer(1, 10),
            Paragraph("GitHub: <u>https://github.com/Abhimancoder/mini-project-sem3-scam-tactic-detector</u>", ParagraphStyle('GH', fontName='Helvetica-Bold', fontSize=11, textColor=colors.HexColor('#0284c7')))
        ],
        # Slide 2: Problem
        [
            Paragraph("PROBLEM STATEMENT & MOTIVATION", cat_style),
            Paragraph("The Human Attack Vector in Financial Fraud", title_style),
            Paragraph("<b>• The Cognitive Exploit:</b> Over $10 Billion is lost annually to retail investment fraud (crypto doubling pools, fake regulatory raids, advance-fee scams). Threat actors do not break cryptographic protocols—they exploit human cognitive vulnerabilities.", body_style),
            Paragraph("<b>• Blindness of Conventional Tools:</b> Traditional firewalls, antivirus, and spam filters inspect network metadata, IP reputations, and malware binaries. They cannot detect psychological coercion inside encrypted messaging apps (WhatsApp, Telegram, Discord).", body_style),
            Paragraph("<b>• The Urgent Need for Explainability:</b> Black-box AI models that merely output an uninterpretable probability score (e.g. '85% risk') fail to protect users. Investors need transparent, phrase-level evidence and actionable countermeasures.", body_style)
        ],
        # Slide 3: The 5 Tactics
        [
            Paragraph("PSYCHOLOGICAL TAXONOMY", cat_style),
            Paragraph("The 5 Core Manipulation Tactics Detected", title_style),
            Paragraph("<b>1. Artificial Urgency & Time Pressure:</b> Countdown timers and limited slots engineered to trigger FOMO and bypass rational due diligence. <i>Example: 'Act fast! Offer expires tonight, only 2 slots remaining.'</i>", body_style),
            Paragraph("<b>2. Authority Impersonation & Fictitious Backing:</b> Exploiting obedience heuristics (the Milgram effect) via false claims of regulatory or banking backing. <i>Example: 'I am a registered agent from SEBI compliance unit.'</i>", body_style),
            Paragraph("<b>3. Guaranteed Returns & Zero-Risk Claims:</b> Promises of risk-free capital growth that violate fundamental financial laws. <i>Example: '100% guaranteed profit of 25% daily with zero risk.'</i>", body_style),
            Paragraph("<b>4. Social Proof & Herd Pressure:</b> Fabricated community metrics and unverified withdrawal screenshots. <i>Example: 'Over 10,000 members are earning daily in our VIP Telegram channel.'</i>", body_style),
            Paragraph("<b>5. Escalation & Sunk-Cost Extortion:</b> Demanding advance fees or upgrades to unlock funds. <i>Example: 'Pay a 10% tax clearance fee to release your withdrawal.'</i>", body_style)
        ],
        # Slide 4: Proposed Solution & Innovations
        [
            Paragraph("CORE SYSTEM INNOVATIONS", cat_style),
            Paragraph("Explainable Cognitive Threat Telemetry", title_style),
            Paragraph("<b>✔ In-Line Forensic Phrase Highlighting:</b> Tokenizes text and calculates exact character boundary offsets (start & end) to highlight suspicious phrases directly in the conversation view.", body_style),
            Paragraph("<b>✔ Negation & Context Defense:</b> Suppresses false alarms on statutory disclaimers ('Mutual funds are subject to market risks') and negated phrases ('Returns are NOT guaranteed').", body_style),
            Paragraph("<b>✔ Multi-Tactic Psychological Synergy Modeling:</b> Evaluates combinatorial predator tactics non-linearly: co-occurring urgency, authority, and escalation scale the risk index exponentially.", body_style),
            Paragraph("<b>✔ 100% Privacy Guarantee:</b> Operates completely in-memory on the local host. Private investment communications are never transmitted to external cloud APIs.", body_style)
        ],
        # Slide 5: System Architecture
        [
            Paragraph("TECHNICAL SPECIFICATIONS", cat_style),
            Paragraph("System Architecture & Subsystems", title_style),
            Paragraph("<b>• Frontend Layer (React 18 + Vite):</b> Responsive cybersecurity UI, SVG dynamic risk index meter, interactive text stream highlighter, educational portal, and JSON audit exporter.", body_style),
            Paragraph("<b>• API Gateway (Express.js):</b> Hardened with Helmet security headers, CORS origin controls, rate limiters (100 req / 15 min), and strict payload boundaries (15,000 characters).", body_style),
            Paragraph("<b>• NLP Engine & Offset Mapper:</b> Modular tokenizers, negation scope analyzers, statutory disclaimer filters, and 5 independent heuristic tactic detectors.", body_style),
            Paragraph("<b>• Risk Assessment Service:</b> Computes heuristic risk index, multi-tactic synergy multipliers, and tailored defensive guidance.", body_style)
        ],
        # Slide 6: Dataset & Benchmarks
        [
            Paragraph("EMPIRICAL EVALUATION", cat_style),
            Paragraph("Dataset Benchmarking & Model Accuracy", title_style),
            Paragraph("<b>• Evaluation Corpus:</b> 25 curated synthetic investment dialogues in JSON and CSV format covering isolated tactics, multi-tactic attacks, and safe financial planning discussions.", body_style),
            Paragraph("<b>• Exact Multi-Label Accuracy:</b> <b>100.0% (25 / 25 test cases matched ground truth perfectly)</b>", body_style),
            Paragraph("<b>• Macro Precision:</b> <b>100.0%</b> | <b>Macro Recall:</b> <b>100.0%</b> | <b>Macro F1-Score:</b> <b>100.0%</b>", body_style),
            Paragraph("<b>• False Positive Rate on Safe Data:</b> <b>0.0%</b> (7 legitimate financial planning discussions tested with zero false alerts).", body_style)
        ],
        # Slide 7: Testing & Quality Assurance
        [
            Paragraph("QUALITY ASSURANCE", cat_style),
            Paragraph("Automated Testing & Security Audit", title_style),
            Paragraph("<b>• Automated Test Suites:</b> 9 test suites containing 42 automated tests executed via Jest and Supertest with a <b>100% pass rate</b> in 3.2 seconds.", body_style),
            Paragraph("<b>• Injection & Boundary Defense:</b> Payloads exceeding 15,000 characters trigger HTTP 413. Non-string inputs and undefined request bodies safely return HTTP 400 without server crashes.", body_style),
            Paragraph("<b>• Secret Hygiene:</b> Verified zero API keys, .env credentials, or private credentials committed to Git history.", body_style),
            Paragraph("<b>• Dependency Audit:</b> npm audit reported <b>0 vulnerabilities</b> on backend dependencies.", body_style)
        ],
        # Slide 8: Future Scope & Conclusion
        [
            Paragraph("FUTURE ROADMAP & CONCLUSION", cat_style),
            Paragraph("Conclusion & Production Scope", title_style),
            Paragraph("<b>• Browser Extension:</b> Real-time in-line highlighting inside WhatsApp Web, Telegram Web, and Reddit DMs before the user replies or transfers capital.", body_style),
            Paragraph("<b>• Multimodal Audio & OCR Ingestion:</b> Whisper-powered speech-to-text transcription for voice scam calls, and OCR for fake bank deposit certificates.", body_style),
            Paragraph("<b>• Multilingual Telemetry:</b> Expansion to regional languages heavily targeted by fraudsters (Hindi, Spanish, etc.).", body_style),
            Paragraph("<b>• GitHub Repository:</b> <u>https://github.com/Abhimancoder/mini-project-sem3-scam-tactic-detector</u>", body_style)
        ]
    ]

    story = []
    for i, slide in enumerate(slides_content):
        for elem in slide:
            story.append(elem)
        if i < len(slides_content) - 1:
            story.append(PageBreak())

    doc.build(story)
    print(f"[SUCCESS] Generated Presentation PDF: {os.path.abspath(pdf_filename)}")

# ==========================================
# 2. REPORT PDF (Portrait A4)
# ==========================================

def create_report_pdf():
    pdf_filename = "Project_Report_Scam_Tactic_Detector.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'RepTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0284c7'),
        alignment=1,
        spaceAfter=10
    )

    h1_style = ParagraphStyle(
        'RepH1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'RepH2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0284c7'),
        spaceBefore=10,
        spaceAfter=4
    )

    p_style = ParagraphStyle(
        'RepP',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=8
    )

    story = [
        Paragraph("SCAM TACTIC DETECTOR", title_style),
        Paragraph("An Explainable Natural Language Processing System for Identifying Psychological Manipulation in Investment Communications", ParagraphStyle('RepSub', fontName='Helvetica', fontSize=12, leading=16, textColor=colors.HexColor('#475569'), alignment=1, spaceAfter=20)),
        Paragraph("<b>MINI PROJECT REPORT • SEMESTER 3</b><br/>Department of Computer Science & Engineering", ParagraphStyle('RepMeta', fontName='Helvetica-Bold', fontSize=11, leading=15, alignment=1, spaceAfter=20)),
        Spacer(1, 15),
        Paragraph("<b>SUBMITTED BY:</b>", ParagraphStyle('RepTeamH', fontName='Helvetica-Bold', fontSize=11, alignment=1, spaceAfter=6)),
        Paragraph("Abhiman (Roll No: 202510101150119) — Project Lead, AI/ML & Backend Architecture", ParagraphStyle('RepMem', fontName='Helvetica', fontSize=10, alignment=1)),
        Paragraph("Aryan (Roll No: 202510101150118) — Frontend Development & UI/UX Design", ParagraphStyle('RepMem', fontName='Helvetica', fontSize=10, alignment=1)),
        Paragraph("Rohit (Roll No: 202510101150195) — Dataset Engineering & Empirical Research", ParagraphStyle('RepMem', fontName='Helvetica', fontSize=10, alignment=1)),
        Paragraph("Abhishek (Roll No: 202510101150192) — Quality Assurance, Testing & Documentation", ParagraphStyle('RepMem', fontName='Helvetica', fontSize=10, alignment=1, spaceAfter=15)),
        Paragraph("<b>GitHub:</b> https://github.com/Abhimancoder/mini-project-sem3-scam-tactic-detector", ParagraphStyle('RepGH', fontName='Helvetica-Bold', fontSize=10, alignment=1, spaceAfter=25)),
        PageBreak(),

        Paragraph("Abstract", h1_style),
        Paragraph(
            "Global financial losses attributed to retail investment scams exceed billions of dollars annually. "
            "Unlike conventional technical attacks that exploit vulnerabilities in network protocols or software binaries, "
            "social engineering investment fraud directly targets human cognitive vulnerabilities. Fraudsters engineer high-stress "
            "scenarios by combining artificial urgency, authority impersonation, guaranteed returns, social proof, and sunk-cost escalation.<br/><br/>"
            "This project presents the Scam Tactic Detector, an explainable natural language processing (NLP) application engineered to "
            "inspect conversational communications in real-time. The system implements a decoupled architecture utilizing a React/Vite "
            "frontend and a Node.js/Express backend. A rule-based linguistic telemetry engine extracts exact character-level offsets "
            "of predatory cues while suppressing false alarms on statutory regulatory disclaimers. Empirical benchmarking across a 25-case "
            "synthetic evaluation dataset demonstrated 100% exact multi-label accuracy and a 0.0% false positive rate on legitimate financial "
            "planning dialogues. The application runs entirely on-premise without transmitting private conversations to external cloud APIs, "
            "ensuring absolute user privacy.",
            p_style
        ),
        Spacer(1, 10),

        Paragraph("Chapter 1: Introduction & Problem Definition", h1_style),
        Paragraph(
            "The proliferation of encrypted instant messaging platforms such as Telegram, WhatsApp, and Discord has democratized retail "
            "investing discussions. However, it has simultaneously facilitated the rapid expansion of predatory investment schemes. "
            "Traditional cybersecurity solutions—such as endpoint detection, DNS sinkholing, and spam filtering—are fundamentally incapable "
            "of detecting social engineering embedded within natural language dialogues.",
            p_style
        ),

        Paragraph("Chapter 2: The Five Psychological Scam Tactics", h1_style),
        Paragraph("<b>1. Artificial Urgency & Time Pressure:</b> Exploits the cognitive stress response and FOMO by imposing arbitrary countdowns (e.g., 'window closes in 2 hours', 'only 2 slots remaining').", p_style),
        Paragraph("<b>2. Authority Impersonation & Fictitious Backing:</b> Exploits obedience heuristics (Milgram effect). Scammers claim affiliation with regulatory bodies (SEBI, SEC, RBI) or prominent investment banks.", p_style),
        Paragraph("<b>3. Guaranteed Returns & Zero-Risk Claims:</b> Promises risk-free capital doubling and impossible daily/weekly yields that violate economic fundamentals.", p_style),
        Paragraph("<b>4. Social Proof & Herd Manipulation:</b> Fabricates community metrics, group chat praise, and forged withdrawal screenshots to manufacture an illusion of widespread safety.", p_style),
        Paragraph("<b>5. Escalation & Sunk-Cost Extortion:</b> Traps victims into paying subsequent 'clearance fees' or 'taxes' before permitting withdrawals of previously deposited capital.", p_style),

        Paragraph("Chapter 3: System Architecture & Testing Verification", h1_style),
        Paragraph(
            "The application features a decoupled architecture with a React 18 frontend and an Express 4.21 backend. "
            "The testing regimen comprises 9 automated test suites with 42 tests passing via Jest & Supertest (100% pass rate in 3.2s). "
            "The dataset benchmark achieved 100.0% exact multi-label accuracy across 25 curated synthetic scenarios with zero false alarms on safe data.",
            p_style
        ),

        Paragraph("Chapter 4: Conclusion & Future Scope", h1_style),
        Paragraph(
            "The Scam Tactic Detector establishes a reliable, explainable framework for cognitive threat detection. "
            "Future scope includes browser extension overlays for WhatsApp Web, speech-to-text audio processing for scam calls, and multimodal OCR ingestion.",
            p_style
        )
    ]

    doc.build(story)
    print(f"[SUCCESS] Generated Report PDF: {os.path.abspath(pdf_filename)}")

if __name__ == '__main__':
    create_presentation_pdf()
    create_report_pdf()
