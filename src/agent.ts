import BigNumber from 'bignumber.js'
import {  
  Finding, 
  HandleTransaction, 
  TransactionEvent, 
  FindingSeverity, 
  FindingType 
} from 'forta-agent'
import {
  COMPOUND_GOVERNANCE_ADDRESS,
  PROPOSAL_CREATED_EVENT_SIG,
  PROPOSAL_CANCELED_EVENT_SIG,
  PROPOSAL_EXECUTED_EVENT_SIG,
  PROPOSAL_QUEUED_EVENT_SIG,
  VOTE_CAST_EVENT_SIG,
  AGENT_DESCRIPTIONS,
  PROTOCOL_NAME,
  AGENT_NAME,
  ALERT_ID,
} from './constants'


const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = []

  if (txEvent.to !== COMPOUND_GOVERNANCE_ADDRESS) return findings;

  const VoteCastEvents = txEvent.filterEvent(VOTE_CAST_EVENT_SIG, COMPOUND_GOVERNANCE_ADDRESS)

  const OtherGovernanceProposalEvents = txEvent
    .filterEvent(PROPOSAL_CREATED_EVENT_SIG, COMPOUND_GOVERNANCE_ADDRESS)
    .concat(txEvent.filterEvent(PROPOSAL_CANCELED_EVENT_SIG, COMPOUND_GOVERNANCE_ADDRESS))
    .concat(txEvent.filterEvent(PROPOSAL_EXECUTED_EVENT_SIG, COMPOUND_GOVERNANCE_ADDRESS))
    .concat(txEvent.filterEvent(PROPOSAL_QUEUED_EVENT_SIG, COMPOUND_GOVERNANCE_ADDRESS));


  if (!VoteCastEvents.length && !OtherGovernanceProposalEvents.length) return findings

  if (VoteCastEvents.length) {
    const [log] = VoteCastEvents
    const voter = `0x${log.topics[1].slice(26, 66)}`
    const proposalId = `${parseInt(log.data.slice(2, 66), 16)}`
    const support = `${parseInt(log.data.slice(66, 130), 16)}`
    const votes = (new BigNumber(log.data.slice(130, 194), 16)).toString();
    findings.push(Finding.fromObject({
      name: AGENT_NAME,
      description: `Vote Cast Event`,
      alertId: ALERT_ID,
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      protocol: PROTOCOL_NAME,
      metadata: {
        proposalId,
        voter,
        support,
        votes,
      }
    }))

  } else if (OtherGovernanceProposalEvents.length) {
    const [log] = OtherGovernanceProposalEvents
    const proposalId = `${parseInt(log.data.slice(2, 66), 16)}`
    findings.push(Finding.fromObject({
      name: AGENT_NAME,
      description: `${AGENT_DESCRIPTIONS[log.topics[0]]}`,
      alertId: ALERT_ID,
      severity: FindingSeverity.Info,
      type: FindingType.Info,
      protocol: PROTOCOL_NAME,
      metadata: {
        proposalId,
      }
    }))
  }

  return findings
}


export default {
  handleTransaction,
}