/**
 * Controller providing tactical definitions, educational taxonomy,
 * psychological mechanisms, and defensive indicators for all 5 tactics.
 */

const TACTICS_METADATA = [
  {
    id: 'urgency',
    name: 'Artificial Urgency & Time Pressure',
    category: 'urgency',
    description: 'Imposing strict, arbitrary deadlines or limited availability to bypass deliberative rational evaluation.',
    psychologicalMechanism: 'Exploits the cognitive stress response and Fear of Missing Out (FOMO), forcing victims to act before consulting trusted peers or advisors.',
    commonExamples: [
      'Offer expires in 15 minutes!',
      'Only 2 slots remaining in this private round.',
      'Deposit funds today before the window closes permanently.'
    ],
    redFlags: [
      'Short countdown timers or arbitrary deadlines.',
      'High pressure to transfer funds via non-reversible rails (crypto, UPI, wire).',
      'Refusal to allow 24-48 hours for contract review.'
    ],
    defensiveRule: 'Never rush a financial transaction. Legitimate market investments do not vanish in minutes.'
  },
  {
    id: 'authority',
    name: 'Authority Impersonation & Fictitious Backing',
    category: 'authority',
    description: 'Falsely claiming endorsement, oversight, or direct affiliation with respected regulators, banks, or security agencies.',
    psychologicalMechanism: 'Exploits obedience to authority heuristics (Milgram effect), creating perceived legitimacy and fear of legal consequences.',
    commonExamples: [
      'I am an official investigator from the central bank cyber division.',
      'Our platform is directly certified and risk-free under SEBI/SEC charter.',
      'Your funds are held under anti-money-laundering review by federal order.'
    ],
    redFlags: [
      'Officials reaching out via Telegram, WhatsApp, or unsolicited phone calls.',
      'Demands to deposit fines or clearance fees to personal or third-party accounts.',
      'Threats of imminent arrest or asset seizure unless funds are sent instantly.'
    ],
    defensiveRule: 'Real regulators and banks never initiate personal messaging app chats or solicit crypto deposits.'
  },
  {
    id: 'guaranteed_returns',
    name: 'Guaranteed Returns & Zero-Risk Claims',
    category: 'guaranteed_returns',
    description: 'Promising mathematically impossible or legally prohibited guaranteed profits with zero risk to capital.',
    psychologicalMechanism: 'Exploits greed and financial insecurity by eliminating perceived downside risk, appealing to wishful thinking.',
    commonExamples: [
      '100% guaranteed 10% daily ROI.',
      'Double your capital in 48 hours without risk.',
      'Zero-risk algorithmic trading bot with assured payouts.'
    ],
    redFlags: [
      'Promises of double-digit weekly or monthly returns.',
      'Claims that capital is 100% loss-proof or insured against market drops.',
      'Vague explanations about proprietary AI or insider trading algorithms.'
    ],
    defensiveRule: 'Risk and return are inseparable in economics. Any promise of guaranteed high return is fraudulent.'
  },
  {
    id: 'social_proof',
    name: 'Social Proof & Herd Manipulation',
    category: 'social_proof',
    description: 'Fabricating crowd consensus, member counts, and fake testimonials to make an unverified scheme seem universally trusted.',
    psychologicalMechanism: 'Exploits informational social influence and bandwagon bias: "If thousands of others are doing it, it must be safe."',
    commonExamples: [
      'Over 5,000 members are already earning daily profits in our group.',
      'See our channel screenshot proofs of happy members withdrawing funds.',
      'Everyone is investing in this token right now!'
    ],
    redFlags: [
      'Telegram/WhatsApp groups where dozens of accounts post identical praises.',
      'Screenshots of banking apps or crypto wallets used as evidence.',
      'Claims that "even non-experts and students" are getting wealthy effortlessly.'
    ],
    defensiveRule: 'Screenshots, group accounts, and online reviews are effortless to forge and automate with bots.'
  },
  {
    id: 'escalation',
    name: 'Escalation & Sunk-Cost Extortion',
    category: 'escalation',
    description: 'Trapping victims in escalating commitments by demanding additional fees, taxes, or upgrades to release their money.',
    psychologicalMechanism: 'Exploits the sunk cost fallacy: victims invest additional money hoping to salvage what they have already committed.',
    commonExamples: [
      'Your account reached $20,000! Pay a 10% liquidity fee to unlock withdrawal.',
      'Deposit another $500 to upgrade to Gold VIP tier so profits can be wired.',
      'Transfer tax clearance fees upfront before our system releases your capital.'
    ],
    redFlags: [
      'Inability to withdraw original principal without paying new fees first.',
      'Demands that taxes or commissions be paid as separate deposits rather than deducted from profits.',
      'Successive excuses for failed withdrawals accompanied by fresh deposit demands.'
    ],
    defensiveRule: 'Never pay fees to withdraw your own money. Legitimate brokers always deduct fees from existing balances.'
  }
];

function getTactics(req, res) {
  res.status(200).json({
    success: true,
    count: TACTICS_METADATA.length,
    data: TACTICS_METADATA
  });
}

function getTacticById(req, res) {
  const { id } = req.params;
  const tactic = TACTICS_METADATA.find(t => t.id === id);

  if (!tactic) {
    return res.status(404).json({
      success: false,
      error: `Tactic with id "${id}" not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: tactic
  });
}

module.exports = {
  getTactics,
  getTacticById,
  TACTICS_METADATA
};
