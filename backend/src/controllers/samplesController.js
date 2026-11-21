/**
 * Controller providing curated synthetic test conversations
 * for interactive exploration and instant frontend testing.
 */

const SAMPLE_CONVERSATIONS = [
  {
    id: 'sample-multi-tactic-crypto',
    title: 'High-Yield Crypto Investment Offer',
    description: 'Demonstrates Urgency, Guaranteed Returns, and Social Proof.',
    category: 'SCAM_HIGH_RISK',
    conversation: 'Hello! I am offering an exclusive opportunity to join our elite alpha trading network. We provide a 100% guaranteed profit of 25% daily return with zero risk to your capital. Act now because we only have 3 slots remaining before this round closes tonight! Over 4,500 members have already joined our Telegram community and made millions. See the withdrawal proofs attached. Do not miss out!'
  },
  {
    id: 'sample-authority-impersonation',
    title: 'Official Regulatory Clearance & Audit',
    description: 'Demonstrates Authority Impersonation and Artificial Urgency.',
    category: 'SCAM_CRITICAL_RISK',
    conversation: 'Good day. I am a senior compliance officer speaking directly on behalf of SEBI and the central bank cyber division. Our inspection has detected an unverified foreign transfer under your name. By mandate of regulatory audit, your account will be frozen within 2 hours unless you send clearance fees to our official escrow account immediately.'
  },
  {
    id: 'sample-escalation-sunk-cost',
    title: 'Withdrawal Lock & Advance Fee Trap',
    description: 'Demonstrates Escalation, Advance-Fee Traps, and Urgency.',
    category: 'SCAM_CRITICAL_RISK',
    conversation: 'Congratulations! Your initial trading balance has grown to $14,850. However, to withdraw your profits, our platform compliance requires you to pay a 15% clearance fee first. You must deposit another $2,200 to unlock your funds. If you do not pay within 24 hours, your account is frozen permanently.'
  },
  {
    id: 'sample-social-proof-bandwagon',
    title: 'VIP Community Wealth Showcase',
    description: 'Demonstrates Social Proof and Unrealistic Gains.',
    category: 'SCAM_MODERATE_RISK',
    conversation: 'Everyone is joining our VIP trading desk! Check out what our members are saying about our automated signals. Even beginners and housewives are making $500 every day without trading experience. Hundreds of users have already profited this week alone. See all the payout receipts in our chat!'
  },
  {
    id: 'sample-safe-financial-planning',
    title: 'Legitimate Financial Planning Discussion',
    description: 'Safe baseline: Long-term index investing and asset allocation.',
    category: 'SAFE',
    conversation: 'When planning for retirement, it is wise to maintain a diversified portfolio of low-cost broad market index funds and bonds. Remember that all equity investments are subject to market risks, and past performance is not indicative of future results. Consult your certified financial advisor and take your time to read the scheme information documents before allocating capital.'
  },
  {
    id: 'sample-safe-bank-alert',
    title: 'Legitimate Bank Security Warning',
    description: 'Safe baseline: Legitimate educational advisory warning against fraud.',
    category: 'SAFE',
    conversation: 'Dear customer, please be aware of fraudulent callers pretending to represent our bank or regulatory authorities. Remember that our bank staff will never ask you to transfer funds to external accounts, share your OTP, or pay fees to unfreeze your online banking. Report any suspicious caller immediately to our official customer care helpline.'
  }
];

function getSampleConversations(req, res) {
  res.status(200).json({
    success: true,
    count: SAMPLE_CONVERSATIONS.length,
    data: SAMPLE_CONVERSATIONS
  });
}

function getSampleById(req, res) {
  const { id } = req.params;
  const sample = SAMPLE_CONVERSATIONS.find(s => s.id === id);

  if (!sample) {
    return res.status(404).json({
      success: false,
      error: `Sample conversation with id "${id}" not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: sample
  });
}

module.exports = {
  getSampleConversations,
  getSampleById,
  SAMPLE_CONVERSATIONS
};
