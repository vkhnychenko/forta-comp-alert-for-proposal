import { keccak256 } from "forta-agent/dist/sdk/utils";
export const COMPOUND_GOVERNANCE_ADDRESS = '0xc0da02939e1441f497fd74f78ce7decb17b66529'
export const VOTE_CAST_SIGNATURE = 'VoteCast(address,uint256,uint8,uint256,string)'
export const ALERT_ID = 'COMPOUND-4'
export const AGENT_NAME = 'Compound Governance Alert'
export const PROTOCOL_NAME = 'Compound'
export const AGENT_DESCRIPTION = 'Vote cast'
export const PROPOSAL_CREATED_EVENT_SIG = 'ProposalCreated(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,string)'
export const PROPOSAL_CANCELED_EVENT_SIG = 'ProposalCanceled(uint256)'
export const PROPOSAL_EXECUTED_EVENT_SIG = 'ProposalExecuted(uint256)'
export const PROPOSAL_QUEUED_EVENT_SIG = 'ProposalQueued(uint256,uint256)'
export const VOTE_CAST_EVENT_SIG = 'VoteCast(address,uint256,uint8,uint256,string)'
export const PROPOSAL_NEW_IMPLEMENTATION = 'NewImplementation(address,address)'
export const AGENT_DESCRIPTIONS = {
    [keccak256(PROPOSAL_CREATED_EVENT_SIG)]: 'Proposal created event',
    [keccak256(PROPOSAL_CANCELED_EVENT_SIG)]: 'Proposal canceled event',
    [keccak256(PROPOSAL_EXECUTED_EVENT_SIG)]: 'Proposal executed event',
    [keccak256(PROPOSAL_QUEUED_EVENT_SIG)]: 'Proposal queued event',
  }