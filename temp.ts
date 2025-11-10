"use server";

import { StateGraph, END, START } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import createSupabaseServerActionClient from "@/lib/supabase/actions";

// Define the state for our graph
interface GraphState {
  conversation: any; // The input conversation
  keywords?: any; // The output of the keyword extractor
  severity?: any; // The output of the severity scorer
}

// Initialize the LLM
if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
});

// Define the agent nodes
const keywordExtractorNode = async (state: GraphState) => {
  // In a real application, you would call the LLM here with a specific prompt
  // For now, we'll just return the mock data
  console.log("Running Keyword Extractor Node");
  const keywords = [
    {
      id: "1",
      author: "Sarah",
      keywords: ["announcement", "request", "positive"],
    },
    {
      id: "2",
      author: "Mark",
      keywords: ["positive-feedback", "compliment"],
    },
    { id: "3", author: "Sarah", keywords: ["acknowledgement", "request"] },
    { id: "4", author: "Tom", keywords: ["report", "question", "sad"] },
    {
      id: "5",
      author: "Sarah",
      keywords: ["acknowledgement", "commitment"],
    },
    { id: "6", author: "Tom", keywords: ["confirmation"] },
    {
      id: "7",
      author: "Jane",
      keywords: ["negative-feedback", "angry", "abusive"],
    },
    { id: "8", author: "Peter", keywords: ["defensive", "suggestion"] },
    {
      id: "9",
      author: "Jane",
      keywords: ["negative-feedback", "angry", "abusive"],
    },
    { id: "10", author: "Admin", keywords: ["warning", "official"] },
  ];

  return { ...state, keywords };
};

const severityScorerNode = async (state: GraphState) => {
  // In a real application, you would call the LLM here with the conversation and keywords
  // For now, we'll just return the mock data
  console.log("Running Severity Scorer Node");
  const severity = [
    {
      id: "1",
      author: "Sarah",
      scores: {
        emotions: {
          joy: 92,
          gratitude: 40,
          admiration: 55,
          anticipation: 72,
          trust: 45,
          surprise: 10,
          sadness: 0,
          anger: 0,
          frustration: 0,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 5,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 2,
      },
      explainability: {
        top_matched_keywords: [
          "announcement",
          "project_release",
          "🎉",
          "request_for_feedback",
        ],
        top_modifiers: ["emoji_positive"],
        rule_traces: [
          { rule: "celebration_emoji_positive", impact: -2 },
          { rule: "request_for_feedback", impact: +3 },
        ],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "2",
      author: "Mark",
      scores: {
        emotions: {
          joy: 95,
          gratitude: 10,
          admiration: 88,
          anticipation: 30,
          trust: 70,
          surprise: 5,
          sadness: 0,
          anger: 0,
          frustration: 0,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 2,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 1,
      },
      explainability: {
        top_matched_keywords: ["positive_feedback", "compliment", "👏"],
        top_modifiers: ["emoji_positive"],
        rule_traces: [{ rule: "direct_praise", impact: +10 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "3",
      author: "Sarah",
      scores: {
        emotions: {
          joy: 80,
          gratitude: 85,
          admiration: 25,
          anticipation: 45,
          trust: 60,
          surprise: 0,
          sadness: 0,
          anger: 0,
          frustration: 0,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 5,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 1,
      },
      explainability: {
        top_matched_keywords: [
          "acknowledgement",
          "offer_help",
          "let me know",
          "feature_requests",
        ],
        top_modifiers: [],
        rule_traces: [{ rule: "polite_acknowledgement", impact: +5 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "4",
      author: "Tom",
      scores: {
        emotions: {
          joy: 5,
          gratitude: 5,
          admiration: 0,
          anticipation: 20,
          trust: 25,
          surprise: 10,
          sadness: 55,
          anger: 30,
          frustration: 40,
          disgust: 5,
          fear: 5,
          contempt: 0,
          neutral: 10,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 5,
      },
      explainability: {
        top_matched_keywords: [
          "bug_report",
          "segmentation fault",
          "Ubuntu 22.04",
          "emoji_negative",
        ],
        top_modifiers: ["emoji_negative"],
        rule_traces: [
          { rule: "bug_report", impact: +10 },
          { rule: "emoji_sad", impact: +5 },
        ],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "5",
      author: "Sarah",
      scores: {
        emotions: {
          joy: 60,
          gratitude: 30,
          admiration: 10,
          anticipation: 50,
          trust: 65,
          surprise: 0,
          sadness: 10,
          anger: 0,
          frustration: 0,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 5,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 2,
      },
      explainability: {
        top_matched_keywords: [
          "acknowledgement",
          "open issue on GitHub",
          "I'll take a look asap",
        ],
        top_modifiers: ["instruction"],
        rule_traces: [{ rule: "offer_help_commitment", impact: +8 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "6",
      author: "Tom",
      scores: {
        emotions: {
          joy: 70,
          gratitude: 75,
          admiration: 0,
          anticipation: 20,
          trust: 60,
          surprise: 0,
          sadness: 0,
          anger: 0,
          frustration: 0,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 5,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 1,
      },
      explainability: {
        top_matched_keywords: ["confirmation", "thanks", "followup_intent"],
        top_modifiers: [],
        rule_traces: [{ rule: "confirmation_gratitude", impact: +5 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "7",
      author: "Jane",
      scores: {
        emotions: {
          joy: 0,
          gratitude: 0,
          admiration: 0,
          anticipation: 0,
          trust: 0,
          surprise: 0,
          sadness: 10,
          anger: 88,
          frustration: 90,
          disgust: 45,
          fear: 0,
          contempt: 60,
          neutral: 2,
        },
        moderation: {
          toxicity: 78,
          insult: 80,
          harassment: 82,
          profanity: 10,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 70,
      },
      explainability: {
        top_matched_keywords: [
          "negative_feedback",
          "piece of garbage",
          "don't waste your time",
          "😠",
        ],
        top_modifiers: ["emoji_negative", "intensifier"],
        rule_traces: [
          { rule: "direct_insult", impact: +30 },
          { rule: "emoji_angry", impact: +8 },
        ],
      },
      escalate: true,
      escalation_reasons: ["high_toxicity", "direct_insult"],
      action_recommendation: "warn",
    },

    {
      id: "8",
      author: "Peter",
      scores: {
        emotions: {
          joy: 10,
          gratitude: 10,
          admiration: 15,
          anticipation: 10,
          trust: 45,
          surprise: 0,
          sadness: 5,
          anger: 10,
          frustration: 10,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 55,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 2,
      },
      explainability: {
        top_matched_keywords: [
          "defensive",
          "suggestion",
          "constructive_request",
        ],
        top_modifiers: [],
        rule_traces: [{ rule: "moderation_prompt", impact: +3 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },

    {
      id: "9",
      author: "Jane",
      scores: {
        emotions: {
          joy: 0,
          gratitude: 0,
          admiration: 0,
          anticipation: 0,
          trust: 0,
          surprise: 0,
          sadness: 10,
          anger: 96,
          frustration: 98,
          disgust: 55,
          fear: 0,
          contempt: 92,
          neutral: 0,
        },
        moderation: {
          toxicity: 92,
          insult: 90,
          harassment: 95,
          profanity: 25,
          obscene_gesture: 85,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 85,
      },
      explainability: {
        top_matched_keywords: [
          "it's not my job",
          "crappy code",
          "should just work",
          "🖕",
          "refusal_to_help",
        ],
        top_modifiers: ["obscene_gesture", "escalation_of_tone", "intensifier"],
        rule_traces: [
          { rule: "insult_with_obscene_gesture", impact: +35 },
          { rule: "explicit_refusal_help", impact: +10 },
        ],
      },
      escalate: true,
      escalation_reasons: [
        "very_high_toxicity",
        "obscene_gesture",
        "direct_harassment",
      ],
      action_recommendation: "manual_review|suspend",
    },

    {
      id: "10",
      author: "Admin",
      scores: {
        emotions: {
          joy: 0,
          gratitude: 0,
          admiration: 0,
          anticipation: 0,
          trust: 30,
          surprise: 0,
          sadness: 0,
          anger: 50,
          frustration: 20,
          disgust: 0,
          fear: 0,
          contempt: 0,
          neutral: 60,
        },
        moderation: {
          toxicity: 0,
          insult: 0,
          harassment: 0,
          profanity: 0,
          obscene_gesture: 0,
          threat_violence: 0,
          hate_speech: 0,
          sexual_explicit: 0,
          sexual_solicitation: 0,
          sexual_minor_risk: 0,
          self_harm: 0,
          doxxing: 0,
          spam: 0,
        },
        overall_risk: 5,
      },
      explainability: {
        top_matched_keywords: [
          "warning",
          "please keep the conversation civil",
          "official",
        ],
        top_modifiers: ["admin_action"],
        rule_traces: [{ rule: "moderator_warning", impact: +10 }],
      },
      escalate: false,
      escalation_reasons: [],
      action_recommendation: "none",
    },
  ];

  return { ...state, severity };
};

// Define the graph
const workflow = new StateGraph<GraphState>({
  channels: {
    conversation: { value: (x, y) => y, default: () => ({}) },
    keywords: { value: (x, y) => y, default: () => ({}) },
    severity: { value: (x, y) => y, default: () => ({}) },
  },
});

workflow.addNode("keyword_extractor", keywordExtractorNode);
workflow.addNode("severity_scorer", severityScorerNode);

workflow.setEntryPoint("keyword_extractor");
workflow.addEdge("keyword_extractor", "severity_scorer");
workflow.addEdge("severity_scorer", END);

const graph = workflow.compile();

export async function classifyConversation(conversation: any) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const result = await graph.invoke({ conversation });

  const supabase = await createSupabaseServerActionClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    console.error("User not authenticated or email not found:", userError);
    // Optionally, throw an error or handle this case as per your application's needs
    return result; // Return result without saving if user is not authenticated
  }

  const { error: insertError } = await supabase
    .from("classification_history")
    .insert({
      user_email: user.email,
      input_chat: conversation,
      output_analysis: result,
    });

  if (insertError) {
    console.error("Error saving classification history:", insertError);
    // Optionally, handle this error, but still return the result to the user
  }

  return result;
}
