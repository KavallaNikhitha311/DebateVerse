export const analyzeArgumentWithEngine = async ({ topic, side, content }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert academic debate judge and rhetoric coach. Analyze this debate argument:
Topic: "${topic}"
Stance: "${side}"
Argument: "${content}"

Provide your evaluation in pure JSON format with these exact keys:
{
  "clarityScore": 85,
  "clarityFeedback": "string",
  "relevanceScore": 90,
  "relevanceFeedback": "string",
  "logicalStructure": "string",
  "potentialCounterarguments": ["counter 1", "counter 2"],
  "reasoningImprovement": "string",
  "sourceVerificationTip": "string",
  "summary": "string"
}`
            }]
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
              engine: 'Gemini 1.5 Flash AI Engine',
              isFallback: false,
              ...parsed
            };
          }
        }
      }
    } catch (err) {
      console.warn('[AI Service] Gemini API call failed or timed out. Falling back to rule-based engine:', err.message);
    }
  }

  // --- Sophisticated Rule-Based Rhetorical Analyzer Fallback ---
  return runRuleBasedAnalyzer({ topic, side, content });
};

const runRuleBasedAnalyzer = ({ topic, side, content }) => {
  const words = content.trim().split(/\s+/);
  const wordCount = words.length;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const avgSentenceLength = (wordCount / sentenceCount).toFixed(1);

  // Evidence and logical connectors
  const evidenceKeywords = ['study', 'research', 'data', 'percent', '%', 'evidence', 'statistics', 'report', 'survey', 'according to', 'historically', 'proven'];
  const logicConnectors = ['therefore', 'consequently', 'furthermore', 'because', 'moreover', 'since', 'as a result', 'thus', 'leading to'];
  const counterKeywords = ['however', 'although', 'despite', 'nevertheless', 'on the other hand', 'while it is true'];

  const lowerContent = content.toLowerCase();
  const lowerTopic = topic.toLowerCase();
  const topicWords = lowerTopic.split(/\s+/).filter(w => w.length > 3);

  let relevantMatches = 0;
  topicWords.forEach(w => {
    if (lowerContent.includes(w)) relevantMatches++;
  });

  const hasEvidence = evidenceKeywords.some(k => lowerContent.includes(k));
  const hasLogicConnectors = logicConnectors.some(k => lowerContent.includes(k));
  const hasRebuttalAwareness = counterKeywords.some(k => lowerContent.includes(k));

  // Compute scores
  let clarityScore = 70;
  if (wordCount >= 30 && wordCount <= 250) clarityScore += 15;
  if (avgSentenceLength >= 8 && avgSentenceLength <= 24) clarityScore += 10;
  clarityScore = Math.min(95, clarityScore);

  let relevanceScore = 65;
  if (relevantMatches >= 2) relevanceScore += 20;
  else if (relevantMatches === 1) relevanceScore += 10;
  if (lowerContent.includes(side.toLowerCase())) relevanceScore += 5;
  relevanceScore = Math.min(98, relevanceScore);

  // Clarity Feedback
  let clarityFeedback = `Your argument contains ${wordCount} words across ${sentenceCount} sentences (averaging ${avgSentenceLength} words per sentence). `;
  if (avgSentenceLength > 30) {
    clarityFeedback += 'Sentences are rather long; consider breaking complex thoughts into shorter, punchier declarative points.';
  } else if (wordCount < 25) {
    clarityFeedback += 'The argument is very brief. Elaborate on the core premise to enhance persuasion.';
  } else {
    clarityFeedback += 'The flow of ideas is coherent and articulate, with well-balanced sentence lengths.';
  }

  // Relevance Feedback
  let relevanceFeedback = `Direct topic engagement is strong. Matched key concepts from the proposition ("${topic}"). `;
  if (relevantMatches === 0) {
    relevanceFeedback = `Make sure to explicitly mention and connect your reasoning to the key terms in "${topic}".`;
  }

  // Logical Structure
  let logicalStructure = '';
  if (hasLogicConnectors && hasEvidence) {
    logicalStructure = 'Excellent structure: you establish a claim, support it with empirical/logical grounding, and link outcomes with clear connective reasoning.';
  } else if (hasLogicConnectors) {
    logicalStructure = 'Good deductive flow, but relies predominantly on assertion. Strengthening the premise with tangible factual data would elevate your case.';
  } else {
    logicalStructure = 'The argument presents valid intuitions, but would benefit from explicit transition phrases (e.g., "Consequently", "Therefore", "Because") to guide the listener.';
  }

  // Potential Counterarguments
  const potentialCounterarguments = [];
  if (side.toLowerCase() === 'support') {
    potentialCounterarguments.push(
      `Opponents may argue that implementing this proposal incurs unintended secondary costs, logistical friction, or administrative overhead.`,
      `The opposition could cite edge cases or minority impacts where the general principle fails to deliver fair outcomes.`
    );
  } else {
    potentialCounterarguments.push(
      `Proponents may contend that the benefits of reform far outweigh temporary transitional difficulties.`,
      `Supporters could demonstrate that existing safety nets or regulatory frameworks adequately resolve your stated objections.`
    );
  }

  // Reasoning Improvement
  let reasoningImprovement = 'Adopt the standard PEEL framework (Point, Evidence, Explanation, Link back to topic). ';
  if (!hasEvidence) {
    reasoningImprovement += 'Integrate a specific verifiable case study, statistic, or peer-reviewed finding to substantiate subjective claims.';
  } else if (!hasRebuttalAwareness) {
    reasoningImprovement += 'Acknowledge an opponent counter-premise upfront and pre-emptively neutralize it to demonstrate intellectual mastery.';
  } else {
    reasoningImprovement += 'Maintain this high standard by continuing to connect moral arguments to measurable practical impacts.';
  }

  const sourceVerificationTip = 'Always verify quotes and statistical figures against reputable academic journals, government publications, or reputable statistical organizations.';

  const summary = `Overall, this is a ${relevanceScore > 80 ? 'compelling' : 'developing'} argument for the ${side.toUpperCase()} stance, demonstrating ${hasEvidence ? 'strong evidence-backed' : 'promising intuitive'} argumentation.`;

  return {
    engine: 'Built-in Rule-Based Rhetorical Engine (Deterministic Academic Fallback)',
    isFallback: true,
    clarityScore,
    clarityFeedback,
    relevanceScore,
    relevanceFeedback,
    logicalStructure,
    potentialCounterarguments,
    reasoningImprovement,
    sourceVerificationTip,
    summary
  };
};