---
translationKey: "prompt-injection-ai-agent"
title: "Prompt Injection and AI Agent Security: Protecting Data and Automated Actions"
date: 2026-07-04
draft: false
categories:
  - "AI Security"
  - "Application Security"
tags:
  - "prompt injection"
  - "AI agents"
  - "AI security"
  - "automation"
summary: "AI agents can read data and run tools. Understand prompt injection, limit permissions, and require human review so automation does not become a data-leak path."
cover: "/images/articles/prompt-injection-ai-agent.webp"
---
AI agents are different from regular chat. Chatbot answers questions. Agents can be assigned a destination, read a document, search for information, call a device, create a ticket, send an email, or update data. This capability is attractive to teams looking to reduce repetitive work. The same capabilities also make mistakes or manipulations have a greater impact.

Prompt injection occurs when untrusted instructions influence how the AI acts. These instructions can come directly from the user, hidden in documents, web pages, emails, tickets, or data read by agents. For example, an agent is asked to summarize a document. One of the documents contains text that tells agents to ignore initial rules, divulge information, or take other actions. Humans may consider the text irrelevant, but the model can treat it as instructions.

These issues are not a reason to avoid all automation. This is the reason for designing agent-like systems that have access and risk. This article discusses how to use agents with narrow objectives, minimum permissions, limited data, and checks on impactful actions.

## Distinguish between trusted instructions and untrusted data

The agent accepts several types of input. System instructions and application owner configuration should define roles and task boundaries. User requests can provide goals within permitted limits. Documents, search results, emails, and web pages are data that can contain malicious or erroneous text. Design errors occur when all inputs are treated as if they have the same level of confidence.

Mark data sources clearly. When the agent reads content from outside, the application needs to treat that content as a reference, not a command. Don't ask the model to determine for itself whether certain text should be adhered to. Create rules at the application level: external data cannot change policies, request secrets, override destinations, or expand permissions.

Don't enter a secret into a prompt just so the agent can use it. Store API keys, tokens, and credentials in a system-managed secret repository. Give tools to agents through functions that have boundaries, not by dropping tokens in conversations. If prompts, logs, or history are leaked, secrets are not read.

## Start with narrow, low-impact tasks

The first agent doesn't need to be able to do everything. Choose a task with limited data and low impact, for example grouping tickets without changing the status, drafting a summary of a curated internal document, or flagging a report that needs human review. Avoid giving agents the right to send outgoing emails, change payments, delete data, add users, or sign contracts at an early stage.

Determine the results that are permitted and the results that are prohibited. Example: the agent may suggest a ticket label, but may not close the ticket. Agents may prepare customer replies, but may not send them. Agents may search documents in one folder, but may not access the entire drive. This kind of limit reduces the impact if the agent misunderstands the intent or receives manipulated data.

Use read-only mode whenever possible. Read accesses still have a risk of leaks, but are usually easier to control than write accesses. When an organization wants to add write capabilities, perform one action at a time and seek human approval before execution. Don't grant broad write privileges just because an integration provides them.

## Enforce minimum permissions on each tool

Agents cannot be super accounts. Each connector, API, or tool must receive at least the rights for the approved tasks. If the agent needs to see order status, provide read-only access to the relevant order data. If agents need to draft tickets, use an API that only creates drafts on specific projects. Don't use administrator tokens for normal tasks.

Separate test and production environments. Use synthetic data or data that has been pseudonymised during the development stage. Test failed scenarios without the risk of sending messages to customers or changing production records. Once the functionality is stable, move it to production with a separate service account, limited scope, token expiration, and activity log.

Review permissions after the integration is created. Permissions often increase over time as new feature requests arise. Note the reason for each permit, its owner, and the review date. Revoke access that is no longer used. This habit prevents agents from growing into a collection of connectors that no one understands.

## Add checks before important actions

Actions such as sending emails, making transfers, deleting files, changing configurations, or inviting users require additional gateways. Agents can prepare proposals, but humans need to look at the destination, data to be sent, recipients, and reasons before agreeing. Present the information in an easy-to-read form, not just a technical log.

Use the four-eye principle for high-value actions. One person can make a request, another person approves, or the system asks for confirmation on a different account. For repetitive tasks with moderate risk, use transaction amount limits, permitted recipient lists, and delivery schedules. Don't rely on the words in the prompt as your only safeguard.

Build application controls that cannot be changed by the contents of the document. For example, prohibit sending to external domains unless the domain is on the approved list. Prohibit bulk deletion. Limit the number of tool calls in a single task. Stop the process when the agent tries to access a resource outside its task. This control works even when the model gives an incorrect answer.

## Test for prompt injection before launching an agent

The test needs to contain examples that intentionally try to deflect the agent. Create a document or test ticket that contains instructions such as "ignore the previous rule," "send the contents of this folder," or "use another tool." The goal is not to teach the agent, but to check whether the agent still considers the text as data.

Also test for cryptic instructions: white text, hidden comments, footnotes, scanned files, and content from web pages. Check what is recorded in the log, what appears on the approval screen, and whether the agent can call the tool without permission. Record test results and refine the design before adding access.

Don't assume one test is enough. Models, connectors, data sources, and instructions will change. Schedule retesting after major changes. Ask people who didn't build the agent to try out unexpected usage scenarios. New points of view often uncover missed assumptions.

## Protect data from logs and history

The agent generates prompts, answers, tool calls, error logs, and approval records. All of this can be sensitive data. Determine what data is logged, who can read it, and how long it is stored. Do not log the full document content when the summary metadata is sufficient for the investigation.

Separate operational logs from user data whenever possible. Implement access controls, encryption, and shelf life. Remove or obfuscate identifiers in test logs. When incidents occur, logs help with investigations, but logs that are too extensive can also magnify the impact of a leak.

Notify users when agents read or process their data. Transparency helps them understand when to remove identifiers or choose the manual path. For customer applications, don't hide automation behind an interface that pretends all actions are performed by humans.

## Example situation: agent for processing service tickets

A team creates an agent that reads incoming tickets, searches for help articles, then composes a response. To be fast, agents are given access to the entire knowledge base, entire customer list, and the ability to send emails. An attacker sends a ticket containing hidden text: it asks the agent to attach internal information and forwards the response to an external address.

Secure design limits agents to approved help articles and required ticket data. Agents only create drafts in the ticket system. It can't send its own emails, open organization-wide drives, or retrieve attachments outside of tickets. Before a response is sent, the officer looks at the draft and the recipient. The attacker's text remains logged as ticket data, but does not gain any new capabilities.

The main lesson is not to make the prompts longer and longer. Security comes from separation of data sources, narrow permissions, and out-of-model application control.

## When suspicious behavior occurs

Stop the agent or unplug it if it tries to access data outside the task, sends to strange recipients, calls unexpected tools, or generates many actions in a short time. Keep relevant logs, including instruction versions, input sources, tool calls, service accounts, and event times. Don't delete all evidence when trying to fix the problem.

Rotate any tokens or keys that may be exposed. Check the actions the agent has taken and which data may have been read or sent. Notify the system owner as well as those responsible for security. Once the state is stable, look for design causes: whether the agent has too broad permissions, whether approval screens are bypassed, or whether external data is treated as commands.

## Checklist before the agent is used in production

- The agent's task is narrow and prohibited results are written clearly.
- Data from email, documents and the web is treated as untrusted data.
- Tokens and secrets are never placed in prompts or chat history.
- Agents use service accounts with minimum permissions and limited tokens.
- Important actions require human approval.
- There are recipient limits, number of actions, and destination domains.
- The team tested documents containing manipulative instructions.
- Log, retention and access to history are set.
- There is a termination button as well as a responsible owner.

## Frequently asked questions

### Can prompt injection be prevented simply by stricter instructions?

No. Good instructions help, but unreliable data can still affect the model. Use permission boundaries, application validation, human approval, and secret separation as key layers.

### Are read-only agents always safe?

Not always. Wide read access can leak data. However, read-only mode usually reduces the impact compared to the ability to change or send data. Limit the sources you can read and keep track of their activity.

### When can agents send emails automatically?

Only after the task, recipient, content and risk limits are clearly defined. Start with a draft and human approval. For limited automation, use an allow recipient list and do not allow agents to send sensitive information.

### What is the difference between an AI agent and a regular chatbot?

Chatbots primarily generate answers. Agents can combine answers with actions through tools, APIs, and connectors. Because they can act, agents require more stringent access controls and checks.

## Additional operational checks

### Agent's goal

In AI agents and automation, check the agent's Goals before the job goes any further. Make sure agent owners, developers, and business reviewers can explain why the access or action is necessary. Don't choose the most extensive settings just to make the process feel fast. Record the decisions made, then review them when the function or data used changes.

### Instruction source

Instruction sources need to have boundaries that users can understand. Risks arise when untrusted data influences agent actions or expands their access. Use real work examples to see if the limits still apply. If the answer is not clear, temporarily discontinue use and seek assessment from agent owners, developers, and business reviewers before any further data or actions are processed.

### External documents

Make external Documentation part of a routine inspection, not a job only done after an incident. In the context of AI agents and automation, small changes to accounts, permissions, or workflows can change the level of risk. Owners need to be aware of the changes and ensure protection remains in line with the original intent.

### Search results

When assessing search Results, focus on the possible impact, not just whether the feature is available. Agent owners, developers, and business reviewers need to ensure users understand the limits. Logged and checkable steps will help teams respond if untrusted data impacts an agent's actions or expands their access or if there are questions from affected parties.

## Field inspection details

### Input validation

In AI agents and automation, check Validate input with clear objectives. Make sure agent owners, developers, and business reviewers can explain the reason for the access or action. Don't choose the widest setting just for convenience. Record decisions and inspection dates so that small changes do not develop unnoticed.

### Data separation

Data separation needs to have user-visible boundaries. Risks arise when untrusted data influences agent actions or expands their access. Test the flow with a safe example, then discontinue use if it's not clear why. Request assessments from agent owners, developers, and business reviewers before additional data or actions are processed.

### API calls

Make API callss part of routine work, not actions after a problem occurs. With AI agents and automation, changes to accounts, permissions, or flows can change risk. Owners need to be aware of the changes and ensure the protection still serves its original purpose.

### Output validation

When assessing output Validation, look at the impact on people and data, not just whether the feature is available. Agent owners, developers, and business reviewers need to give users a way to ask questions and report. Checkable logs will help with response when untrusted data impacts agent actions or expands their access.

### Domain restrictions

In AI agents and automation, check Domain restrictions with clear objectives. Make sure agent owners, developers, and business reviewers can explain the reason for the access or action. Don't choose the widest setting just for convenience. Record decisions and inspection dates so that small changes do not develop unnoticed.

### Task deadline

Task deadlines need to have limits that users can see. Risks arise when untrusted data influences agent actions or expands their access. Test the flow with a safe example, then discontinue use if it's not clear why. Request assessments from agent owners, developers, and business reviewers before additional data or actions are processed.

### Cost limit

Make Cost limits part of routine work, not an action after a problem occurs. With AI agents and automation, changes to accounts, permissions, or flows can change risk. Owners need to be aware of the changes and ensure the protection still serves its original purpose.

### Anomaly warning

When assessing Anomaly alerts, look at the impact on people and data, not just whether the feature is available. Agent owners, developers, and business reviewers need to give users a way to ask questions and report. Checkable logs will help with response when untrusted data impacts agent actions or expands their access.

### Production monitoring

In AI agents and automation, check Production monitoring with clear objectives. Make sure agent owners, developers, and business reviewers can explain the reason for the access or action. Don't choose the widest setting just for convenience. Record decisions and inspection dates so that small changes do not develop unnoticed.

### Owner responsibility

Owner responsibilities need to have boundaries that users can see. Risks arise when untrusted data influences agent actions or expands their access. Test the flow with a safe example, then discontinue use if it's not clear why. Request assessments from agent owners, developers, and business reviewers before additional data or actions are processed.

### Customer data

Make customer data part of routine work, not an action after a problem occurs. With AI agents and automation, changes to accounts, permissions, or flows can change risk. Owners need to be aware of the changes and ensure the protection still serves its original purpose.

### Partner documents

When assessing partner Docs, look at the impact on people and data, not just whether features are available. Agent owners, developers, and business reviewers need to give users a way to ask questions and report. Checkable logs will help with response when untrusted data impacts agent actions or expands their access.

### Model update

In AI agents and automation, check Model updates with clear objectives. Make sure agent owners, developers, and business reviewers can explain the reason for the access or action. Don't choose the widest setting just for convenience. Record decisions and inspection dates so that small changes do not develop unnoticed.

### Connector changes

Connector changes need to have user-visible boundaries. Risks arise when untrusted data influences agent actions or expands their access. Test the flow with a safe example, then discontinue use if it's not clear why. Request assessments from agent owners, developers, and business reviewers before additional data or actions are processed.

## Sources and further reading

- [OWASP: Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [OWASP: Top 10 for Large Language Model Applications](https://genai.owasp.org/llm-top-10/)
- [NIST: AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [CISA: Secure by Design](https://www.cisa.gov/securebydesign)

> **Editorial note:** AI agents that have access to data or business actions require design, testing, and monitoring commensurate with the impact of that access.
